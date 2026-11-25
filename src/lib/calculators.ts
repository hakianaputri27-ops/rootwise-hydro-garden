export type PpmScale = "500" | "700";

const nonNegative = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0);
const roundTo = (value: number, places = 2) => Number(value.toFixed(places));

export function calculateNutrientMix(volumeLiters: number, doseAmlPerLiter: number, doseBmlPerLiter: number) {
  const volume = nonNegative(volumeLiters);
  return {
    nutrientAml: roundTo(volume * nonNegative(doseAmlPerLiter)),
    nutrientBml: roundTo(volume * nonNegative(doseBmlPerLiter)),
  };
}

export function ecToPpm(ec: number, scale: PpmScale) {
  return Math.round(nonNegative(ec) * Number(scale));
}

export function ppmToEc(ppm: number, scale: PpmScale) {
  return roundTo(nonNegative(ppm) / Number(scale), 3);
}

export function estimateHarvest(plantingDate: string, durationDays: number, today = new Date()) {
  const planted = new Date(`${plantingDate}T12:00:00`);
  if (!plantingDate || Number.isNaN(planted.getTime())) return null;
  const duration = Math.max(1, Math.floor(nonNegative(durationDays)));
  const harvest = new Date(planted);
  harvest.setDate(harvest.getDate() + duration);
  const daysElapsed = Math.max(0, Math.floor((today.getTime() - planted.getTime()) / 86_400_000));
  const daysRemaining = Math.ceil((harvest.getTime() - today.getTime()) / 86_400_000);
  return {
    harvestDate: harvest.toISOString().slice(0, 10),
    daysRemaining,
    daysElapsed,
    progressPercent: Math.min(100, Math.round((daysElapsed / duration) * 100)),
  };
}

export function estimatePlantCapacity(lengthMeters: number, widthMeters: number, spacingCm: number) {
  if (spacingCm <= 0) return 0;
  const plantsAlongLength = Math.floor((nonNegative(lengthMeters) * 100) / spacingCm);
  const plantsAlongWidth = Math.floor((nonNegative(widthMeters) * 100) / spacingCm);
  return plantsAlongLength * plantsAlongWidth;
}
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(plantingDate)) return null;
  const [year, month, day] = plantingDate.split("-").map(Number);
  if (year === undefined || month === undefined || day === undefined) return null;
  const plantedAt = Date.UTC(year, month - 1, day);
  const validatedDate = new Date(plantedAt);
  if (validatedDate.getUTCFullYear() !== year || validatedDate.getUTCMonth() !== month - 1 || validatedDate.getUTCDate() !== day) return null;
  const duration = Math.max(1, Math.floor(nonNegative(durationDays)));
  const todayAt = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const harvestAt = plantedAt + duration * 86_400_000;
  const harvest = new Date(harvestAt);
  const daysElapsed = Math.max(0, Math.floor((todayAt - plantedAt) / 86_400_000));
  const daysRemaining = Math.ceil((harvestAt - todayAt) / 86_400_000);
  return {
    harvestDate: harvest.toISOString().slice(0, 10),
    daysRemaining,
    daysElapsed,
    progressPercent: Math.min(100, Math.round((daysElapsed / duration) * 100)),
  };
}

export function estimatePlantCapacity(lengthMeters: number, widthMeters: number, spacingCm: number) {
  if (!Number.isFinite(spacingCm) || spacingCm <= 0) return 0;
  const plantsAlongLength = Math.floor((nonNegative(lengthMeters) * 100) / spacingCm);
  const plantsAlongWidth = Math.floor((nonNegative(widthMeters) * 100) / spacingCm);
  return plantsAlongLength * plantsAlongWidth;
}
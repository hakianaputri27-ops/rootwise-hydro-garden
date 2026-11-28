import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Beaker, CalendarDays, Calculator, Droplets, Ruler } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateNutrientMix, ecToPpm, estimateHarvest, estimatePlantCapacity, ppmToEc, type PpmScale } from "@/lib/calculators";
import { plants } from "@/lib/hydroponics-data";
import { formatLength } from "@/lib/formatters";
import { useAppState } from "@/lib/app-context";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: pageMeta("Grow School | Hydroponic Tools", "Calculate nutrient mixes, compare pH and EC references, estimate harvest dates, and plan plant spacing.") }),
  component: ToolsPage,
});

function ToolsPage() {
  const { settings } = useAppState();
  const [volume, setVolume] = useState(10);
  const [doseA, setDoseA] = useState(5);
  const [doseB, setDoseB] = useState(5);
  const [plantId, setPlantId] = useState(plants[0]?.id ?? "");
  const [measurementType, setMeasurementType] = useState<"ec" | "ppm">("ec");
  const [measurement, setMeasurement] = useState("1.2");
  const [ppmScale, setPpmScale] = useState<PpmScale>("500");
  const [plantingDate, setPlantingDate] = useState("");
  const [durationDays, setDurationDays] = useState(plants[0]?.days ?? 35);
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(0.6);

  const selectedPlant = plants.find((plant) => plant.id === plantId) ?? plants[0];
  const mix = calculateNutrientMix(volume, doseA, doseB);
  const measuredValue = Number(measurement) || 0;
  const ecValue = measurementType === "ec" ? Math.max(0, measuredValue) : ppmToEc(measuredValue, ppmScale);
  const ppmValue = ecToPpm(ecValue, ppmScale);
  const ecRange = selectedPlant?.ec.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)/);
  const lowerEc = ecRange?.[1] ? Number(ecRange[1]) : null;
  const upperEc = ecRange?.[2] ? Number(ecRange[2]) : null;
  const ecIsInRange = lowerEc !== null && upperEc !== null && ecValue >= lowerEc && ecValue <= upperEc;
  const harvest = plantingDate ? estimateHarvest(plantingDate, durationDays) : null;
  const plantCapacity = selectedPlant ? estimatePlantCapacity(length, width, selectedPlant.spacingCm) : 0;

  function choosePlant(nextId: string) {
    setPlantId(nextId);
    const nextPlant = plants.find((plant) => plant.id === nextId);
    if (nextPlant) setDurationDays(nextPlant.days);
  }

  return (
    <AppShell>
      <PageIntro eyebrow="Growing tools" title="Practical growing tools" description="Use simple local calculators and crop references while you plan, mix, and monitor a grow." />
      <Tabs defaultValue="nutrients" className="space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-5">
          <TabsTrigger value="nutrients" className="min-h-10 whitespace-normal"><Droplets className="mr-1 size-4" />Nutrients</TabsTrigger>
          <TabsTrigger value="ph" className="min-h-10 whitespace-normal">pH guide</TabsTrigger>
          <TabsTrigger value="ec" className="min-h-10 whitespace-normal">EC / PPM</TabsTrigger>
          <TabsTrigger value="harvest" className="min-h-10 whitespace-normal">Harvest</TabsTrigger>
          <TabsTrigger value="planner" className="min-h-10 whitespace-normal">Plant planner</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrients" className="max-w-3xl space-y-6">
          <div className="border-t border-border pt-5">
            <h2 className="flex items-center gap-2 font-display text-2xl"><Beaker className="size-5 text-primary" />Nutrient mixing calculator</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Enter the dose printed on your fertilizer label. Add each concentrated part to the water separately and mix well between additions.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2"><Label htmlFor="volume">Water volume (L)</Label><Input id="volume" type="number" min="0" step="0.1" value={volume} onChange={(event) => setVolume(Number(event.target.value) || 0)} /></div>
              <div className="space-y-2"><Label htmlFor="dose-a">Nutrient A (ml/L)</Label><Input id="dose-a" type="number" min="0" step="0.1" value={doseA} onChange={(event) => setDoseA(Number(event.target.value) || 0)} /></div>
              <div className="space-y-2"><Label htmlFor="dose-b">Nutrient B (ml/L)</Label><Input id="dose-b" type="number" min="0" step="0.1" value={doseB} onChange={(event) => setDoseB(Number(event.target.value) || 0)} /></div>
            </div>
            <Card className="mt-6"><CardContent className="grid gap-4 p-5 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Total Nutrient A</p><p className="mt-1 text-3xl font-semibold">{mix.nutrientAml} ml</p></div>
              <div><p className="text-sm text-muted-foreground">Total Nutrient B</p><p className="mt-1 text-3xl font-semibold">{mix.nutrientBml} ml</p></div>
            </CardContent></Card>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">For example, 10 L at 5 ml/L uses 50 ml of each part. This is a calculation, not a fertilizer recipe; product labels take priority.</p>
            <Button className="mt-4" variant="outline" onClick={() => { setVolume(10); setDoseA(5); setDoseB(5); }}>Reset example</Button>
          </div>
        </TabsContent>

        <TabsContent value="ph" className="max-w-4xl space-y-6">
          <section className="border-t border-border pt-5">
            <h2 className="font-display text-2xl">pH reference guide</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">pH describes how acidic or alkaline a solution is. Most hydroponic vegetables prefer a mildly acidic root zone, but each crop has its own useful range.</p>
            <div className="mt-5 grid grid-cols-5 gap-1 sm:grid-cols-15" aria-label="pH scale from acidic to alkaline">
              {Array.from({ length: 15 }, (_, value) => (
                <div key={value} className="min-w-0 text-center">
                  <div className={`h-3 rounded-sm ${value < 6 ? "bg-destructive" : value === 6 || value === 7 ? "bg-secondary" : value < 10 ? "bg-primary" : "bg-accent"}`} />
                  <span className="mt-1 block text-xs text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Acidic</span><span>7 · Neutral</span><span>Alkaline</span></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-border pt-4"><h3 className="font-semibold">Measure consistently</h3><ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Calibrate a meter with fresh buffer solution, or use suitable test drops.</li><li>Mix nutrients first, wait for the reading to settle, then measure.</li><li>Rinse the probe between samples and record the result.</li></ol></div>
              <div className="border-t border-border pt-4"><h3 className="font-semibold">Adjust carefully</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use a product made for hydroponics. Add a small amount, mix thoroughly, wait, and measure again. Never mix concentrated pH adjusters directly with concentrated nutrients.</p></div>
            </div>
            <div className="mt-7 border-t border-border pt-5">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className="font-display text-xl">Crop pH references</h3><p className="mt-1 text-sm text-muted-foreground">Use these ranges as starting references, not strict targets.</p></div><div className="w-full sm:w-64"><Label htmlFor="ph-crop">Selected crop</Label><Select value={plantId} onValueChange={choosePlant}><SelectTrigger id="ph-crop" className="mt-2"><SelectValue placeholder="Choose a crop" /></SelectTrigger><SelectContent>{plants.map((plant) => <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>)}</SelectContent></Select></div></div>
              <p className="mt-3 font-semibold">{selectedPlant?.name ?? "Selected crop"}: pH {selectedPlant?.pH ?? "—"}</p>
              <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">{plants.map((plant) => <li key={plant.id} className="flex justify-between gap-3 border-b border-border py-2 text-sm"><span>{plant.name}</span><span className="text-muted-foreground">{plant.pH}</span></li>)}</ul>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="ec" className="max-w-3xl space-y-6">
          <section className="border-t border-border pt-5">
            <h2 className="font-display text-2xl">EC and PPM reference</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">EC measures the solution’s ability to conduct electricity and estimates total dissolved ions. PPM is a conversion of EC, not a nutrient-by-nutrient measurement.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="reading-type">Enter a reading</Label><Select value={measurementType} onValueChange={(value) => setMeasurementType(value as "ec" | "ppm")}><SelectTrigger id="reading-type"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ec">EC (mS/cm)</SelectItem><SelectItem value="ppm">PPM</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="reading-value">Measured value</Label><Input id="reading-value" type="number" min="0" step="0.1" value={measurement} onChange={(event) => setMeasurement(event.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="ppm-scale">PPM conversion scale</Label><Select value={ppmScale} onValueChange={(value) => setPpmScale(value as PpmScale)}><SelectTrigger id="ppm-scale"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="500">500 scale (EC × 500)</SelectItem><SelectItem value="700">700 scale (EC × 700)</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="ec-crop">Compare with crop</Label><Select value={plantId} onValueChange={setPlantId}><SelectTrigger id="ec-crop"><SelectValue placeholder="Choose a crop" /></SelectTrigger><SelectContent>{plants.map((plant) => <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <Card className="mt-6"><CardContent className="grid gap-4 p-5 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Converted EC</p><p className="mt-1 text-2xl font-semibold">{ecValue.toFixed(3)} mS/cm</p></div>
              <div><p className="text-sm text-muted-foreground">Converted PPM ({ppmScale} scale)</p><p className="mt-1 text-2xl font-semibold">{ppmValue} ppm</p></div>
            </CardContent></Card>
            <p className="mt-4 text-sm leading-6" role="status">{selectedPlant ? `${selectedPlant.name} reference: ${selectedPlant.ec}. ${lowerEc === null || upperEc === null ? "Compare your meter reading with the crop reference." : ecIsInRange ? "This reading is within the reference range." : "This reading is outside the reference range; check your source water, crop stage, and meter before making changes."}` : "Choose a crop to compare its reference range."}</p>
            <p className="mt-3 text-sm text-muted-foreground">At EC 1.0 mS/cm, a 500-scale meter reads about 500 ppm; a 700-scale meter reads about 700 ppm. Always compare readings on the same scale.</p>
          </section>
        </TabsContent>

        <TabsContent value="harvest" className="max-w-3xl space-y-6">
          <section className="border-t border-border pt-5">
            <h2 className="flex items-center gap-2 font-display text-2xl"><CalendarDays className="size-5 text-primary" />Harvest estimator</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Estimate a harvest window from the planting date and typical crop duration. Weather, variety, and growing conditions can change the timeline.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2"><Label htmlFor="harvest-crop">Plant type</Label><Select value={plantId} onValueChange={choosePlant}><SelectTrigger id="harvest-crop"><SelectValue /></SelectTrigger><SelectContent>{plants.map((plant) => <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="planting-date">Planting date</Label><Input id="planting-date" type="date" value={plantingDate} onChange={(event) => setPlantingDate(event.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="crop-duration">Estimated duration (days)</Label><Input id="crop-duration" type="number" min="1" step="1" value={durationDays} onChange={(event) => setDurationDays(Number(event.target.value) || 1)} /></div>
            </div>
            {harvest ? <div className="mt-6 border-t border-border pt-5"><div className="grid gap-4 sm:grid-cols-3"><div><p className="text-sm text-muted-foreground">Estimated harvest date</p><p className="mt-1 text-lg font-semibold">{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${harvest.harvestDate}T00:00:00Z`))}</p></div><div><p className="text-sm text-muted-foreground">Days since planting</p><p className="mt-1 text-lg font-semibold">{harvest.daysElapsed}</p></div><div><p className="text-sm text-muted-foreground">Timeline remaining</p><p className="mt-1 text-lg font-semibold">{harvest.daysRemaining <= 0 ? "Harvest window reached" : `${harvest.daysRemaining} days`}</p></div></div><progress className="mt-5 h-3 w-full accent-primary" value={harvest.progressPercent} max={100} aria-label={`Crop timeline ${harvest.progressPercent}% complete`} /><p className="mt-1 text-right text-xs text-muted-foreground">{harvest.progressPercent}% of estimated duration</p></div> : <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">Choose a planting date to see the estimated harvest timeline.</p>}
          </section>
        </TabsContent>

        <TabsContent value="planner" className="max-w-3xl space-y-6">
          <section className="border-t border-border pt-5">
            <h2 className="flex items-center gap-2 font-display text-2xl"><Ruler className="size-5 text-primary" />Hydroponic system planner</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Estimate how many plants fit in a rectangular growing area using the selected crop’s recommended spacing in both directions.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2"><Label htmlFor="planner-crop">Plant type</Label><Select value={plantId} onValueChange={setPlantId}><SelectTrigger id="planner-crop"><SelectValue /></SelectTrigger><SelectContent>{plants.map((plant) => <SelectItem key={plant.id} value={plant.id}>{plant.name}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="area-length">Area length (m)</Label><Input id="area-length" type="number" min="0" step="0.1" value={length} onChange={(event) => setLength(Number(event.target.value) || 0)} /></div>
              <div className="space-y-2"><Label htmlFor="area-width">Area width (m)</Label><Input id="area-width" type="number" min="0" step="0.1" value={width} onChange={(event) => setWidth(Number(event.target.value) || 0)} /></div>
            </div>
            <Card className="mt-6"><CardContent className="flex flex-wrap items-end justify-between gap-4 p-5"><div><p className="text-sm text-muted-foreground">Estimated capacity</p><p className="mt-1 text-3xl font-semibold">{plantCapacity} plants</p></div><div className="text-sm text-muted-foreground"><p>{selectedPlant?.name ?? "Crop"} spacing: {selectedPlant ? formatLength(selectedPlant.spacingCm, settings.units) : "—"}</p><p>Area: {Math.max(0, length * width).toFixed(2)} m²</p></div></CardContent></Card>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">This is a simple spacing estimate. Leave room for channels, access, airflow, supports, and mature plant size.</p>
          </section>
        </TabsContent>
      </Tabs>
      <p className="mt-8 flex items-center gap-2 border-t border-border pt-5 text-sm text-muted-foreground"><Calculator className="size-4" />All calculations run on this device. Crop ranges are general references; product labels and local growing conditions take priority.</p>
    </AppShell>
  );
}
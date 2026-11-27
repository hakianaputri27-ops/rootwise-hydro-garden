import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateNutrientMix } from "@/lib/calculators";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: pageMeta("Grow School | Tools", "Calculate nutrient mix amounts for your hydroponic reservoir.") }),
  component: ToolsPage,
});

function ToolsPage() {
  const [volume, setVolume] = useState(10);
  const [doseA, setDoseA] = useState(5);
  const [doseB, setDoseB] = useState(5);
  const result = calculateNutrientMix(volume, doseA, doseB);

  return (
    <AppShell>
      <PageIntro eyebrow="Growing tools" title="Nutrient mixing" description="Work out how much of each nutrient part to add. Always follow the fertilizer maker’s instructions for your crop and water." />
      <section className="max-w-3xl border-t border-border pt-6">
        <h2 className="font-display text-2xl">Reservoir mix</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div className="space-y-2"><Label htmlFor="volume">Water volume (L)</Label><Input id="volume" type="number" min="0" step="0.1" value={volume} onChange={(event) => setVolume(Number(event.target.value) || 0)} /></div>
          <div className="space-y-2"><Label htmlFor="dose-a">Nutrient A (ml/L)</Label><Input id="dose-a" type="number" min="0" step="0.1" value={doseA} onChange={(event) => setDoseA(Number(event.target.value) || 0)} /></div>
          <div className="space-y-2"><Label htmlFor="dose-b">Nutrient B (ml/L)</Label><Input id="dose-b" type="number" min="0" step="0.1" value={doseB} onChange={(event) => setDoseB(Number(event.target.value) || 0)} /></div>
        </div>
        <Card className="mt-6"><CardContent className="grid gap-4 p-5 sm:grid-cols-2">
          <div><p className="text-sm text-muted-foreground">Nutrient A</p><p className="mt-1 text-3xl font-semibold">{result.nutrientAml} ml</p></div>
          <div><p className="text-sm text-muted-foreground">Nutrient B</p><p className="mt-1 text-3xl font-semibold">{result.nutrientBml} ml</p></div>
        </CardContent></Card>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">For example, 10 L at 5 ml/L uses 50 ml of each part. This is a calculation, not a fertilizer recipe; product labels take priority.</p>
        <Button className="mt-5" variant="outline" onClick={() => { setVolume(10); setDoseA(5); setDoseB(5); }}>Reset example</Button>
      </section>
    </AppShell>
  );
}
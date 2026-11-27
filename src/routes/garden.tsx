import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppState } from "@/lib/app-context";
import { plants, systems } from "@/lib/hydroponics-data";
import { pageMeta } from "@/lib/seo";
import type { GardenProject } from "@/lib/garden-db";

export const Route = createFileRoute("/garden")({
  head: () => ({ meta: pageMeta("Grow School | My Garden", "Keep your hydroponic growing projects organized on this device.") }),
  component: GardenPage,
});

function GardenPage() {
  const { projects, gardenReady, gardenError, persistProject, removeProject } = useAppState();
  const [saving, setSaving] = useState(false);

  async function addProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSaving(true);
    const project: GardenProject = {
      id: crypto.randomUUID(),
      name: String(data.get("name") ?? ""),
      plant: String(data.get("plant") ?? "Lettuce"),
      system: String(data.get("system") ?? "Kratky method"),
      plantedAt: String(data.get("plantedAt") ?? new Date().toISOString().slice(0, 10)),
      plantCount: Number(data.get("plantCount")) || 1,
      durationDays: plants.find((plant) => plant.name === data.get("plant"))?.days ?? 35,
      notes: String(data.get("notes") ?? ""),
      stage: 0,
    };
    try {
      await persistProject(project);
      form.reset();
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <PageIntro eyebrow="Your growing space" title="My garden" description="Keep the plants you’re tending close at hand. Your garden records stay on this device." />
      <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={addProject} className="space-y-4 border-t border-border pt-5">
          <h2 className="font-display text-2xl">Start a project</h2>
          <div className="space-y-2"><Label htmlFor="project-name">Project name</Label><Input id="project-name" name="name" required placeholder="Balcony lettuce" /></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="plant">Plant</Label><select id="plant" name="plant" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{plants.map((plant) => <option key={plant.id}>{plant.name}</option>)}</select></div>
            <div className="space-y-2"><Label htmlFor="system">System</Label><select id="system" name="system" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{systems.map((system) => <option key={system.id}>{system.name}</option>)}</select></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="plantedAt">Planting date</Label><Input id="plantedAt" name="plantedAt" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></div>
            <div className="space-y-2"><Label htmlFor="plantCount">Number of plants</Label><Input id="plantCount" name="plantCount" type="number" min="1" step="1" defaultValue="1" required /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="notes">Notes</Label><textarea id="notes" name="notes" rows={3} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Anything to remember about this grow" /></div>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Add project"}</Button>
          {gardenError ? <p className="text-sm text-destructive">{gardenError}</p> : null}
        </form>
        <section aria-labelledby="projects-title" className="border-t border-border pt-5">
          <div className="flex items-baseline justify-between gap-3"><h2 id="projects-title" className="font-display text-2xl">Growing projects</h2><span className="text-sm text-muted-foreground">{projects.length} total</span></div>
          {!gardenReady ? <p className="mt-5 text-sm text-muted-foreground">Loading your garden…</p> : projects.length === 0 ? <p className="mt-5 text-sm leading-6 text-muted-foreground">Your garden is empty for now. Add a project to begin tracking a crop.</p> : <ul className="mt-4 divide-y divide-border">{projects.map((project) => <li key={project.id} className="flex flex-wrap items-center justify-between gap-4 py-4"><div><h3 className="font-semibold">{project.name}</h3><p className="mt-1 text-sm text-muted-foreground">{project.plant} · {project.plantCount} plants · {project.system}</p><p className="mt-1 text-xs text-muted-foreground">Planted {project.plantedAt}</p></div><Button variant="outline" size="sm" onClick={() => { if (window.confirm(`Delete ${project.name} and its garden records?`)) void removeProject(project.id); }}>Remove</Button></li>)}</ul>}
        </section>
      </section>
    </AppShell>
  );
}
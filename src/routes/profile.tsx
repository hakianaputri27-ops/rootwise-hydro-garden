import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppState } from "@/lib/app-context";
import { modules } from "@/lib/hydroponics-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: pageMeta("Grow School | Profile", "Manage your local learning preferences and garden data.") }),
  component: ProfilePage,
});

function ProfilePage() {
  const { settings, updateSettings, projects, makeBackup } = useAppState();
  const [message, setMessage] = useState("");
  const completedLessons = modules.flatMap((module) => module.lessons).filter((lesson) => settings.completedLessonIds.includes(lesson.id)).length;

  function exportData() {
    const file = new Blob([JSON.stringify(makeBackup(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "grow-school-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Your backup file has been downloaded.");
  }

  return (
    <AppShell>
      <PageIntro eyebrow="Your preferences" title="Profile & settings" description="Personalize Grow School and review the learning and garden activity saved on this device." />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="space-y-5 border-t border-border pt-5">
          <h2 className="font-display text-2xl">Your details</h2>
          <div className="space-y-2"><Label htmlFor="display-name">Display name</Label><Input id="display-name" value={settings.displayName} onChange={(event) => updateSettings({ displayName: event.target.value })} placeholder="Optional" /></div>
          <div className="flex items-center justify-between gap-4 border-y border-border py-4"><div><p className="font-medium">Dark mode</p><p className="text-sm text-muted-foreground">Change the app’s appearance.</p></div><Switch checked={settings.darkMode} onCheckedChange={(checked) => updateSettings({ darkMode: checked })} aria-label="Dark mode" /></div>
          <div className="flex flex-wrap gap-3"><Button variant={settings.units === "metric" ? "default" : "outline"} onClick={() => updateSettings({ units: "metric" })}>Metric</Button><Button variant={settings.units === "imperial" ? "default" : "outline"} onClick={() => updateSettings({ units: "imperial" })}>Imperial</Button></div>
        </section>
        <section className="space-y-6 border-t border-border pt-5">
          <div><h2 className="font-display text-2xl">Your activity</h2><dl className="mt-4 grid grid-cols-2 gap-3"><div className="border-b border-border py-3"><dt className="text-sm text-muted-foreground">Lessons completed</dt><dd className="mt-1 text-2xl font-semibold">{completedLessons}</dd></div><div className="border-b border-border py-3"><dt className="text-sm text-muted-foreground">Garden projects</dt><dd className="mt-1 text-2xl font-semibold">{projects.length}</dd></div><div className="border-b border-border py-3"><dt className="text-sm text-muted-foreground">DIY projects completed</dt><dd className="mt-1 text-2xl font-semibold">{settings.completedDiyIds.length}</dd></div></dl></div>
          <div><h2 className="font-display text-xl">Your data</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Keep a copy of your progress and garden records. The backup is stored as a JSON file on your device.</p><Button className="mt-4" onClick={exportData}>Export backup</Button>{message ? <p className="mt-2 text-sm text-primary" role="status">{message}</p> : null}</div>
          <div className="border-t border-border pt-5"><h2 className="font-display text-xl">About Grow School</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">A beginner-friendly guide to growing food without soil. Use crop ranges as references, follow product labels, and make measured changes as plants respond.</p></div>
        </section>
      </div>
    </AppShell>
  );
}
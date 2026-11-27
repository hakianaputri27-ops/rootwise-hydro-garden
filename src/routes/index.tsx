import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calculator, Droplets, Leaf, Sprout } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/app-context";
import { modules, plants } from "@/lib/hydroponics-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta("Grow School | Home", "Track hydroponics learning, garden projects, and growing tasks in one offline-first app."),
  }),
  component: Index,
});

function Index() {
  const { settings, projects, gardenReady } = useAppState();
  const lessons = modules.flatMap((module) => module.lessons);
  const completedCount = lessons.filter((item) => settings.completedLessonIds.includes(item.id)).length;
  const progress = lessons.length === 0 ? 0 : Math.round((completedCount / lessons.length) * 100);
  const nextLesson = lessons.find((item) => !settings.completedLessonIds.includes(item.id)) ?? lessons[0];
  const activeProjects = projects.filter((project) => project.stage < 4);
  const featuredPlant = plants[4];

  return (
    <AppShell>
      <div className="pb-6">
        <PageIntro eyebrow="Your growing space" title={`Welcome${settings.displayName ? `, ${settings.displayName}` : ", gardener"}`} description="Learn hydroponics. Grow your own food." />
        <section aria-label="Home hydroponic garden" className="relative mb-7 h-48 overflow-hidden rounded-md sm:h-64">
          <img src="/images/hydroponic-garden.jpg" alt="Leafy greens growing in a bright home hydroponic garden" className="absolute inset-0 size-full object-cover object-center" />
          <div className="absolute inset-0 bg-foreground/40" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-background sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">A little progress, every day</p>
            <p className="mt-2 max-w-xl font-display text-2xl leading-tight sm:text-3xl">Grow with curiosity. Harvest with confidence.</p>
          </div>
        </section>

        <section aria-label="Your progress" className="mb-9 grid gap-3 sm:grid-cols-3">
          <Card><CardContent className="flex items-center justify-between gap-4 p-4">
            <div><p className="text-xs text-muted-foreground">Learning progress</p><p className="mt-1 text-2xl font-semibold">{progress}%</p><p className="text-xs text-muted-foreground">{completedCount} of {lessons.length} lessons</p></div>
            <BookOpen className="size-6 text-primary" aria-hidden="true" />
          </CardContent></Card>
          <Card><CardContent className="flex items-center justify-between gap-4 p-4">
            <div><p className="text-xs text-muted-foreground">Active projects</p><p className="mt-1 text-2xl font-semibold">{gardenReady ? activeProjects.length : "—"}</p><p className="text-xs text-muted-foreground">Growing in your garden</p></div>
            <Sprout className="size-6 text-primary" aria-hidden="true" />
          </CardContent></Card>
          <Card><CardContent className="flex items-center justify-between gap-4 p-4">
            <div><p className="text-xs text-muted-foreground">Plant of the day</p><p className="mt-1 text-xl font-semibold">{featuredPlant?.name ?? "Lettuce"}</p><p className="text-xs text-muted-foreground">About {featuredPlant?.days ?? 35} days to harvest</p></div>
            <Leaf className="size-6 text-primary" aria-hidden="true" />
          </CardContent></Card>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section aria-labelledby="continue-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Pick up where you left off</p><h2 id="continue-title" className="mt-1 font-display text-2xl">Continue learning</h2></div>
              <Button variant="ghost" size="sm" asChild><Link to="/learn">All lessons <ArrowRight /></Link></Button>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl"><p className="text-xs text-muted-foreground">{nextLesson ? modules.find((module) => module.lessons.some((item) => item.id === nextLesson.id))?.title : "Learning path"}</p><h3 className="mt-2 text-lg font-semibold">{nextLesson?.title ?? "You’ve completed every lesson"}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{nextLesson?.summary ?? "Revisit a guide or explore a practical project."}</p></div>
                <Button asChild><Link to="/learn">{nextLesson ? "Continue" : "Explore lessons"}<ArrowRight /></Link></Button>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="quick-tools-title">
            <div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Ready when you are</p><h2 id="quick-tools-title" className="mt-1 font-display text-2xl">Quick tools</h2></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Card><CardContent className="flex items-center justify-between gap-4 p-4"><div><h3 className="font-semibold">Nutrient calculator</h3><p className="mt-1 text-sm text-muted-foreground">Mix the amount your label recommends.</p></div><Button variant="outline" size="icon" asChild aria-label="Open nutrient calculator"><Link to="/tools"><Calculator /></Link></Button></CardContent></Card>
              <Card><CardContent className="flex items-center justify-between gap-4 p-4"><div><h3 className="font-semibold">Today's garden check</h3><p className="mt-1 text-sm text-muted-foreground">Review plants, water, and roots.</p></div><Button variant="outline" size="icon" asChild aria-label="Open my garden"><Link to="/garden"><Droplets /></Link></Button></CardContent></Card>
            </div>
          </section>
        </div>

        <section className="mt-10 border-t border-border pt-7" aria-labelledby="garden-tasks-title">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Small habits make strong roots</p><h2 id="garden-tasks-title" className="mt-1 font-display text-2xl">Today's garden tasks</h2></div><Button variant="outline" asChild><Link to="/garden">Open my garden</Link></Button></div>
          {activeProjects.length > 0 ? <ul className="grid gap-3 sm:grid-cols-2">{activeProjects.slice(0, 4).map((project) => <li key={project.id} className="flex items-start gap-3 border-b border-border py-3"><span className="mt-1 size-2 rounded-full bg-secondary" aria-hidden="true" /><div><p className="font-medium">Check {project.name}</p><p className="text-sm text-muted-foreground">Look at the water level, root color, and new growth.</p></div></li>)}</ul> : <p className="max-w-xl text-sm leading-6 text-muted-foreground">Your garden is ready for its first project. Start with a single leafy crop, then add a short note each time you check it.</p>}
          <div className="mt-5 flex flex-wrap gap-3"><Button variant="secondary" asChild><Link to="/learn" hash="diy">Explore DIY projects</Link></Button><Button variant="ghost" asChild><Link to="/profile">Your learning stats <ArrowRight /></Link></Button></div>
        </section>
      </div>
    </AppShell>
  );
}

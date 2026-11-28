import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-context";
import { modules } from "@/lib/hydroponics-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/learn")({
  head: () => ({ meta: pageMeta("Grow School | Learn", "Beginner hydroponics lessons, system guides, plant references, and practical growing advice.") }),
  component: LearnPage,
});

function LearnPage() {
  const { settings, toggleLesson } = useAppState();
  const lessons = modules.flatMap((module) => module.lessons);
  const completed = lessons.filter((lesson) => settings.completedLessonIds.includes(lesson.id)).length;

  return (
    <AppShell>
      <PageIntro eyebrow="Learning center" title="Learn hydroponics" description={`${completed} of ${lessons.length} lessons completed. Start with the fundamentals, then explore systems, nutrients, crops, and care.`} />
      <div className="divide-y divide-border">
        {modules.map((module, index) => (
          <section key={module.id} className="py-5">
            <h2 className="font-display text-xl">{String(index + 1).padStart(2, "0")} · {module.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{module.subtitle}</p>
            <div className="mt-3 divide-y divide-border/70">
              {module.lessons.map((lesson) => {
                const isComplete = settings.completedLessonIds.includes(lesson.id);
                return (
                  <article key={lesson.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                    <details className="min-w-0 flex-1">
                      <summary className="cursor-pointer list-none font-medium marker:hidden">
                        <span className="flex items-center gap-2"><Circle className="size-3 text-secondary" aria-hidden="true" />{lesson.title}</span>
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground">{lesson.summary}</p>
                      <ul className="mt-3 space-y-2 text-sm leading-6">
                        {lesson.body.map((paragraph) => <li key={paragraph}>{paragraph}</li>)}
                      </ul>
                      <p className="mt-3 text-sm font-medium text-primary">Key takeaways</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {lesson.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
                      </ul>
                    </details>
                    <Button variant={isComplete ? "secondary" : "outline"} size="sm" onClick={() => toggleLesson(lesson.id)}>
                      <Check aria-hidden="true" />{isComplete ? "Completed" : "Mark complete"}
                    </Button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
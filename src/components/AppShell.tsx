import { Link } from "@tanstack/react-router";
import { BookOpen, Calculator, HardDrive, House, Leaf, Sprout, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navigation: { to: "/" | "/learn" | "/tools" | "/garden" | "/profile"; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/tools", label: "Tools", icon: Calculator },
  { to: "/garden", label: "My garden", icon: Sprout },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Grow School home">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg leading-tight">Grow School</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Learn Hydroponics. Grow Your Own Food.</span>
          </span>
        </Link>
        <span className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
          <HardDrive className="size-4" aria-hidden="true" />
          Saved on this device
        </span>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-8">{children}</main>
      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-md">
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
          {navigation.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted"
              activeProps={{ className: "bg-accent text-primary" }}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
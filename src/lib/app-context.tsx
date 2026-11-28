import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  clearSettings,
  defaultSettings,
  isAppSettings,
  readSettings,
  saveSettings,
  type AppSettings,
} from "@/lib/app-storage";
import {
  deleteJournalEntry,
  getGardenSnapshot,
  replaceGardenSnapshot,
  saveJournalEntry,
  saveProject,
  type GardenProject,
  type GardenSnapshot,
  type JournalEntry,
} from "@/lib/garden-db";

type BackupFile = {
  application: "Grow School";
  version: 1;
  exportedAt: string;
  settings: AppSettings;
  garden: GardenSnapshot;
};

type AppContextValue = {
  settings: AppSettings;
  updateSettings: (patch: Partial<AppSettings>) => void;
  toggleLesson: (lessonId: string) => void;
  toggleDiyStep: (projectId: string, step: number) => void;
  toggleDiyCompleted: (projectId: string) => void;
  projects: GardenProject[];
  entries: JournalEntry[];
  gardenReady: boolean;
  gardenError: string | null;
  persistProject: (project: GardenProject) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
  persistEntry: (entry: JournalEntry) => Promise<void>;
  removeEntry: (entryId: string) => Promise<void>;
  makeBackup: () => BackupFile;
  restoreBackup: (backup: unknown) => Promise<void>;
  resetAllData: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

function isGardenSnapshot(value: unknown): value is GardenSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const snapshot = value as Partial<GardenSnapshot>;
  return Array.isArray(snapshot.projects) && Array.isArray(snapshot.entries) &&
    snapshot.projects.every((project) => typeof project === "object" && project !== null &&
      typeof project.id === "string" && typeof project.name === "string" && typeof project.plant === "string" &&
      typeof project.system === "string" && typeof project.plantedAt === "string" &&
      typeof project.plantCount === "number" && Number.isFinite(project.plantCount) && project.plantCount >= 1 &&
      typeof project.durationDays === "number" && Number.isFinite(project.durationDays) && project.durationDays >= 1 &&
      typeof project.notes === "string" && typeof project.stage === "number" &&
      Number.isInteger(project.stage) && project.stage >= 0 && project.stage < 5) &&
    snapshot.entries.every((entry) => typeof entry === "object" && entry !== null &&
      typeof entry.id === "string" && typeof entry.projectId === "string" && typeof entry.date === "string" &&
      (entry.heightCm === null || (typeof entry.heightCm === "number" && Number.isFinite(entry.heightCm) && entry.heightCm >= 0)) &&
      typeof entry.waterChanged === "boolean" &&
      (entry.ph === null || (typeof entry.ph === "number" && Number.isFinite(entry.ph) && entry.ph >= 0 && entry.ph <= 14)) &&
      (entry.ec === null || (typeof entry.ec === "number" && Number.isFinite(entry.ec) && entry.ec >= 0)) &&
      typeof entry.observations === "string" &&
      (entry.photoDataUrl === null || (typeof entry.photoDataUrl === "string" && entry.photoDataUrl.startsWith("data:image/"))));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [settingsReady, setSettingsReady] = useState(false);
  const [garden, setGarden] = useState<GardenSnapshot>({ projects: [], entries: [] });
  const [gardenReady, setGardenReady] = useState(false);
  const [gardenError, setGardenError] = useState<string | null>(null);

  useEffect(() => {
    setSettings(readSettings());
    setSettingsReady(true);
    void getGardenSnapshot().then((snapshot) => {
      setGarden(snapshot);
      setGardenError(null);
    }).catch((error: unknown) => {
      setGardenError(error instanceof Error ? error.message : "Local garden storage is unavailable.");
    }).finally(() => setGardenReady(true));
  }, []);

  useEffect(() => {
    if (!settingsReady) return;
    saveSettings(settings);
    document.documentElement.classList.toggle("dark", settings.darkMode);
    document.documentElement.style.colorScheme = settings.darkMode ? "dark" : "light";
  }, [settings, settingsReady]);

  const updateSettings = (patch: Partial<AppSettings>) => setSettings((current) => ({ ...current, ...patch }));
  const toggleLesson = (lessonId: string) => setSettings((current) => {
    const completed = new Set(current.completedLessonIds);
    if (completed.has(lessonId)) completed.delete(lessonId);
    else completed.add(lessonId);
    return { ...current, completedLessonIds: [...completed] };
  });
  const toggleDiyStep = (projectId: string, step: number) => setSettings((current) => {
    const checked = new Set(current.diyChecklists[projectId] ?? []);
    if (checked.has(step)) checked.delete(step);
    else checked.add(step);
    return { ...current, diyChecklists: { ...current.diyChecklists, [projectId]: [...checked] } };
  });
  const toggleDiyCompleted = (projectId: string) => setSettings((current) => ({
    ...current,
    completedDiyIds: current.completedDiyIds.includes(projectId)
      ? current.completedDiyIds.filter((id) => id !== projectId)
      : [...current.completedDiyIds, projectId],
  }));

  const persistProject = async (project: GardenProject) => {
    await saveProject(project);
    setGarden((current) => ({ ...current, projects: [project, ...current.projects.filter((item) => item.id !== project.id)] }));
    setGardenError(null);
  };
  const removeProject = async (projectId: string) => {
    const next = { projects: garden.projects.filter((project) => project.id !== projectId), entries: garden.entries.filter((entry) => entry.projectId !== projectId) };
    await replaceGardenSnapshot(next);
    setGarden(next);
    setGardenError(null);
  };
  const persistEntry = async (entry: JournalEntry) => {
    await saveJournalEntry(entry);
    setGarden((current) => ({ ...current, entries: [entry, ...current.entries.filter((item) => item.id !== entry.id)] }));
    setGardenError(null);
  };
  const removeEntry = async (entryId: string) => {
    await deleteJournalEntry(entryId);
    setGarden((current) => ({ ...current, entries: current.entries.filter((entry) => entry.id !== entryId) }));
    setGardenError(null);
  };

  const makeBackup = (): BackupFile => ({
    application: "Grow School",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings,
    garden,
  });

  const restoreBackup = async (backup: unknown) => {
    if (typeof backup !== "object" || backup === null) throw new Error("That file is not a Grow School backup.");
    const candidate = backup as Partial<BackupFile>;
    if (candidate.application !== "Grow School" || candidate.version !== 1 || !isAppSettings(candidate.settings) || !isGardenSnapshot(candidate.garden)) {
      throw new Error("The backup file is incomplete or from an unsupported version.");
    }
    await replaceGardenSnapshot(candidate.garden);
    saveSettings(candidate.settings);
    setSettings(candidate.settings);
    setGarden(candidate.garden);
    setGardenError(null);
  };

  const resetAllData = async () => {
    const empty = { projects: [], entries: [] };
    await replaceGardenSnapshot(empty);
    clearSettings();
    setSettings(defaultSettings);
    setGarden(empty);
    setGardenError(null);
  };

  const value = useMemo<AppContextValue>(() => ({
    settings, updateSettings, toggleLesson, toggleDiyStep, toggleDiyCompleted,
    projects: garden.projects, entries: garden.entries, gardenReady, gardenError,
    persistProject, removeProject, persistEntry, removeEntry, makeBackup, restoreBackup, resetAllData,
  }), [settings, garden, gardenReady, gardenError]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useAppState must be used inside AppProvider.");
  return value;
}
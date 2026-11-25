export type AppSettings = {
  displayName: string;
  darkMode: boolean;
  units: "metric" | "imperial";
  currency: "IDR" | "USD" | "EUR";
  completedLessonIds: string[];
  completedDiyIds: string[];
  diyChecklists: Record<string, number[]>;
};

export const defaultSettings: AppSettings = {
  displayName: "",
  darkMode: false,
  units: "metric",
  currency: "IDR",
  completedLessonIds: [],
  completedDiyIds: [],
  diyChecklists: {},
};

const SETTINGS_KEY = "grow-school-settings-v1";

export function readSettings(): AppSettings {
  if (typeof localStorage === "undefined") return defaultSettings;
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null");
    if (typeof saved !== "object" || saved === null) return defaultSettings;
    const value = saved as Partial<AppSettings>;
    return {
      ...defaultSettings,
      ...value,
      completedLessonIds: Array.isArray(value.completedLessonIds) ? value.completedLessonIds.filter((id): id is string => typeof id === "string") : [],
      completedDiyIds: Array.isArray(value.completedDiyIds) ? value.completedDiyIds.filter((id): id is string => typeof id === "string") : [],
      diyChecklists: typeof value.diyChecklists === "object" && value.diyChecklists !== null ? value.diyChecklists : {},
      units: value.units === "imperial" ? "imperial" : "metric",
      currency: value.currency === "USD" || value.currency === "EUR" ? value.currency : "IDR",
      displayName: typeof value.displayName === "string" ? value.displayName : "",
      darkMode: value.darkMode === true,
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings) {
  if (typeof localStorage !== "undefined") localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearSettings() {
  if (typeof localStorage !== "undefined") localStorage.removeItem(SETTINGS_KEY);
}

export function isAppSettings(value: unknown): value is AppSettings {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<AppSettings>;
  return typeof candidate.displayName === "string" && typeof candidate.darkMode === "boolean" &&
    (candidate.units === "metric" || candidate.units === "imperial") &&
    (candidate.currency === "IDR" || candidate.currency === "USD" || candidate.currency === "EUR") &&
    Array.isArray(candidate.completedLessonIds) && Array.isArray(candidate.completedDiyIds) &&
    typeof candidate.diyChecklists === "object" && candidate.diyChecklists !== null;
}
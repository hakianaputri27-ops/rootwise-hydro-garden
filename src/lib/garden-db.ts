export type GardenProject = {
  id: string;
  name: string;
  plant: string;
  system: string;
  plantedAt: string;
  plantCount: number;
  durationDays: number;
  notes: string;
  stage: number;
};

export type JournalEntry = {
  id: string;
  projectId: string;
  date: string;
  heightCm: number | null;
  waterChanged: boolean;
  ph: number | null;
  ec: number | null;
  observations: string;
  photoDataUrl: string | null;
};

export type GardenSnapshot = { projects: GardenProject[]; entries: JournalEntry[] };

const DATABASE_NAME = "grow-school-garden";
const DATABASE_VERSION = 1;

function requestValue<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("The garden record could not be read."));
  });
}

function openDatabase() {
  if (typeof indexedDB === "undefined") return Promise.reject(new Error("This browser does not support local garden storage."));
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("projects")) database.createObjectStore("projects", { keyPath: "id" });
      if (!database.objectStoreNames.contains("entries")) database.createObjectStore("entries", { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Local garden storage could not be opened."));
  });
}

async function writeRecord(storeName: "projects" | "entries", value: GardenProject | JournalEntry) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(value);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("The garden record could not be saved."));
      transaction.onabort = () => reject(transaction.error ?? new Error("The garden record could not be saved."));
    });
  } finally {
    database.close();
  }
}

async function deleteRecord(storeName: "projects" | "entries", id: string) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).delete(id);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("The garden record could not be deleted."));
      transaction.onabort = () => reject(transaction.error ?? new Error("The garden record could not be deleted."));
    });
  } finally {
    database.close();
  }
}

export async function getGardenSnapshot(): Promise<GardenSnapshot> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(["projects", "entries"], "readonly");
    const [projects, entries] = await Promise.all([
      requestValue<GardenProject[]>(transaction.objectStore("projects").getAll()),
      requestValue<JournalEntry[]>(transaction.objectStore("entries").getAll()),
    ]);
    return { projects, entries };
  } finally {
    database.close();
  }
}

export const saveProject = (project: GardenProject) => writeRecord("projects", project);
export const saveJournalEntry = (entry: JournalEntry) => writeRecord("entries", entry);
export const deleteProject = (id: string) => deleteRecord("projects", id);
export const deleteJournalEntry = (id: string) => deleteRecord("entries", id);

export async function replaceGardenSnapshot(snapshot: GardenSnapshot) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(["projects", "entries"], "readwrite");
    const projectsStore = transaction.objectStore("projects");
    const entriesStore = transaction.objectStore("entries");
    projectsStore.clear();
    entriesStore.clear();
    for (const project of snapshot.projects) projectsStore.put(project);
    for (const entry of snapshot.entries) entriesStore.put(entry);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("The garden backup could not be restored."));
      transaction.onabort = () => reject(transaction.error ?? new Error("The garden backup could not be restored."));
    });
  } finally {
    database.close();
  }
}
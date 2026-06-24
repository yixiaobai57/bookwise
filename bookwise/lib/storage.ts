import { UserVocabulary } from "./types";

const STORAGE_KEY = "bookwise_vocabulary";

export function saveVocabulary(data: UserVocabulary): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadVocabulary(): UserVocabulary | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserVocabulary;
  } catch {
    return null;
  }
}

export function clearVocabulary(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

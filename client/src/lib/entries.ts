import type { Entry } from "../types";
import { api } from "./api";

export type EntryCreate = {
  date: string;
  title: string;
  content?: string;
  tags?: string[];
  mood?: number;
  links?: string[];
  timeSpent?: number;
};

export type EntryUpdate = Partial<EntryCreate>;

export function listEntries(q?: string) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return api<Entry[]>(`/api/entries${qs}`);
}

export function getEntry(id: string) {
  return api<Entry>(`/api/entries/${id}`);
}

export function createEntry(payload: EntryCreate) {
  return api<Entry>(`/api/entries`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateEntry(id: string, payload: EntryUpdate) {
  return api<Entry>(`/api/entries/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteEntry(id: string) {
  return api<{ message: string }>(`/api/entries/${id}`, {
    method: "DELETE",
  });
}
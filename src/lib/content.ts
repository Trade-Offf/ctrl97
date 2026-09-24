import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";

export type WorkEntry = CollectionEntry<"works">;
export type NoteEntry = CollectionEntry<"notes">;

export function entrySlug(id: string): string {
  const name = id.split("/").pop() ?? id;
  return name.replace(/\.mdx$/, "");
}

export function entryLocale(id: string): Locale | undefined {
  if (id.startsWith("zh/")) return "zh";
  if (id.startsWith("en/")) return "en";
  return undefined;
}

function isListed(draft: boolean): boolean {
  return !draft;
}

function isRenderable(draft: boolean): boolean {
  return import.meta.env.DEV || !draft;
}

export function readingMinutes(text: string): number {
  const cjk = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const words = text
    .replace(/[\u3400-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

export async function getWorks(locale: Locale): Promise<WorkEntry[]> {
  const works = await getCollection("works");
  return works
    .filter(
      (work) => entryLocale(work.id) === locale && isListed(work.data.draft),
    )
    .sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export async function getWork(
  locale: Locale,
  slug: string,
): Promise<WorkEntry | undefined> {
  const works = await getCollection("works");
  return works.find(
    (work) =>
      entryLocale(work.id) === locale &&
      entrySlug(work.id) === slug &&
      isRenderable(work.data.draft),
  );
}

export async function getNotes(locale: Locale): Promise<NoteEntry[]> {
  const notes = await getCollection("notes");
  return notes
    .filter(
      (note) => entryLocale(note.id) === locale && isListed(note.data.draft),
    )
    .sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export async function getNote(
  locale: Locale,
  slug: string,
): Promise<NoteEntry | undefined> {
  const notes = await getCollection("notes");
  return notes.find(
    (note) =>
      entryLocale(note.id) === locale &&
      entrySlug(note.id) === slug &&
      isRenderable(note.data.draft),
  );
}

export async function workPaths(locale: Locale) {
  const works = await getCollection("works");
  return works
    .filter(
      (work) =>
        entryLocale(work.id) === locale && isRenderable(work.data.draft),
    )
    .map((work) => ({ params: { slug: entrySlug(work.id) } }));
}

export async function notePaths(locale: Locale) {
  const notes = await getCollection("notes");
  return notes
    .filter(
      (note) =>
        entryLocale(note.id) === locale && isRenderable(note.data.draft),
    )
    .map((note) => ({ params: { slug: entrySlug(note.id) } }));
}

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import type { Locale } from "../i18n/ui";
import { useTranslations } from "../i18n/ui";
import { entrySlug, getNotes } from "./content";

export async function notesFeed(
  context: APIContext,
  locale: Locale,
): Promise<Response> {
  if (!context.site) {
    throw new Error("Missing site URL");
  }

  const t = useTranslations(locale);
  const notes = await getNotes(locale);

  return rss({
    title: "Ctrl97",
    description: t.description,
    site: context.site,
    trailingSlash: true,
    customData: `<language>${locale === "zh" ? "zh-Hans" : "en"}</language>`,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishedAt,
      link:
        locale === "zh"
          ? `/notes/${entrySlug(note.id)}`
          : `/en/notes/${entrySlug(note.id)}`,
    })),
  });
}

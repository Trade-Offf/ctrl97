import { getRelativeLocaleUrl } from "astro:i18n";
import { githubUrl } from "../data/site";
import { useTranslations, type Locale } from "../i18n/ui";
import { entrySlug, getNotes, getWorks } from "./content";

export type CommandAction =
  | "navigate"
  | "theme-light"
  | "theme-dark"
  | "theme-system"
  | "github"
  | "copy";

export type CommandGroup = "go" | "work" | "note" | "action";

export type CommandItem = {
  id: string;
  group: CommandGroup;
  label: string;
  hint: string;
  href: string;
  action: CommandAction;
};

export async function buildCommands(locale: Locale): Promise<CommandItem[]> {
  const t = useTranslations(locale);
  const [works, notes] = await Promise.all([
    getWorks(locale),
    getNotes(locale),
  ]);

  return [
    {
      id: "home",
      group: "go",
      label: t.home,
      hint: "",
      href: getRelativeLocaleUrl(locale, "/"),
      action: "navigate",
    },
    {
      id: "works",
      group: "go",
      label: t.works,
      hint: "",
      href: getRelativeLocaleUrl(locale, "/works"),
      action: "navigate",
    },
    {
      id: "notes",
      group: "go",
      label: t.notes,
      hint: "",
      href: getRelativeLocaleUrl(locale, "/notes"),
      action: "navigate",
    },
    ...works.map((work) => ({
      id: `work-${entrySlug(work.id)}`,
      group: "work" as const,
      label: work.data.title,
      hint: work.data.description,
      href: getRelativeLocaleUrl(locale, `/works/${entrySlug(work.id)}`),
      action: "navigate" as const,
    })),
    ...notes.map((note) => ({
      id: `note-${entrySlug(note.id)}`,
      group: "note" as const,
      label: note.data.title,
      hint: note.data.description,
      href: getRelativeLocaleUrl(locale, `/notes/${entrySlug(note.id)}`),
      action: "navigate" as const,
    })),
    {
      id: "theme-light",
      group: "action",
      label: t.themeLightAction,
      hint: "",
      href: "",
      action: "theme-light",
    },
    {
      id: "theme-dark",
      group: "action",
      label: t.themeDarkAction,
      hint: "",
      href: "",
      action: "theme-dark",
    },
    {
      id: "theme-system",
      group: "action",
      label: t.themeSystemAction,
      hint: "",
      href: "",
      action: "theme-system",
    },
    {
      id: "github",
      group: "action",
      label: t.openGithub,
      hint: "",
      href: githubUrl,
      action: "github",
    },
    {
      id: "copy",
      group: "action",
      label: t.copyLink,
      hint: "",
      href: "",
      action: "copy",
    },
  ];
}

export function serializeCommands(commands: CommandItem[]): string {
  return JSON.stringify(commands).replace(/</g, "\\u003c");
}

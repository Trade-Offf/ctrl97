import type { Locale } from "../i18n/ui";

export type NowLaneId = "building" | "shipping" | "writing" | "learning";

export type NowLane = {
  id: NowLaneId;
  label: string;
  text: string;
};

/** 手写快照日期。改文案时一起改，不要换成构建时间。 */
export const nowUpdated = "2026-09-28";

if (!/^\d{4}-\d{2}-\d{2}$/.test(nowUpdated)) {
  throw new Error("Now updated date must be YYYY-MM-DD");
}

export function nowUpdatedDate(): Date {
  return new Date(`${nowUpdated}T00:00:00+08:00`);
}

const nowLanes = {
  zh: [
    {
      id: "building",
      label: "Building",
      text: "在做汪汪简报，每天从 AI 和 Crypto 的信源里选出几条，各写一句判断。",
    },
    {
      id: "shipping",
      label: "Shipping",
      text: "汪汪简报已经公开在 pupbrief.com。",
    },
    {
      id: "writing",
      label: "Writing",
      text: "掘金上的文章同步在这个站的笔记里。",
    },
    { id: "learning", label: "Learning", text: "待补充" },
  ],
  en: [
    {
      id: "building",
      label: "Building",
      text: "Pupbrief, picking a few AI and Crypto items each day and adding one judgment to each.",
    },
    {
      id: "shipping",
      label: "Shipping",
      text: "Pupbrief is public at pupbrief.com.",
    },
    {
      id: "writing",
      label: "Writing",
      text: "The Juejin articles are synced into the notes on this site.",
    },
    { id: "learning", label: "Learning", text: "To be added" },
  ],
} as const satisfies Record<Locale, readonly NowLane[]>;

export function getNowLanes(locale: Locale): readonly NowLane[] {
  return nowLanes[locale];
}

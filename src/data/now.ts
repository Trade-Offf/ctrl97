import type { Locale } from "../i18n/ui";

export type NowLaneId = "building" | "shipping" | "writing" | "learning";

export type NowLane = {
  id: NowLaneId;
  label: string;
  text: string;
};

/** 手写快照日期。改文案时一起改，不要换成构建时间。 */
export const nowUpdated = "2026-09-24";

if (!/^\d{4}-\d{2}-\d{2}$/.test(nowUpdated)) {
  throw new Error("Now updated date must be YYYY-MM-DD");
}

export function nowUpdatedDate(): Date {
  return new Date(`${nowUpdated}T00:00:00+08:00`);
}

const nowLanes = {
  zh: [
    { id: "building", label: "Building", text: "待补充" },
    { id: "shipping", label: "Shipping", text: "待补充" },
    { id: "writing", label: "Writing", text: "待补充" },
    { id: "learning", label: "Learning", text: "待补充" },
  ],
  en: [
    { id: "building", label: "Building", text: "To be added" },
    { id: "shipping", label: "Shipping", text: "To be added" },
    { id: "writing", label: "Writing", text: "To be added" },
    { id: "learning", label: "Learning", text: "To be added" },
  ],
} as const satisfies Record<Locale, readonly NowLane[]>;

export function getNowLanes(locale: Locale): readonly NowLane[] {
  return nowLanes[locale];
}

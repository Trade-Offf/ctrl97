import type { Locale } from "../i18n/ui";

export type NowLaneId = "building" | "shipping" | "writing" | "learning";

export type NowLane = {
  id: NowLaneId;
  label: string;
  text: string;
};

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

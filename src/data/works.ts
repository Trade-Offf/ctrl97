export const workStatuses = [
  "shipped",
  "building",
  "experimental",
  "paused",
  "archived",
] as const;

export type WorkStatus = (typeof workStatuses)[number];

export type Work = {
  title: string;
  summary: string;
  status: WorkStatus;
  year: number;
  href?: string;
};

export const featuredWorks: Work[] = [];

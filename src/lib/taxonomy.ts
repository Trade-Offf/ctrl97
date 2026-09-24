export const workStatusOrder = [
  "building",
  "shipped",
  "paused",
  "archived",
] as const;

export type WorkStatus = (typeof workStatusOrder)[number];

export const noteCategoryOrder = ["enter", "undo", "save", "find"] as const;

export type NoteCategory = (typeof noteCategoryOrder)[number];

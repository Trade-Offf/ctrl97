import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { noteCategoryOrder, workStatusOrder } from "./lib/taxonomy";

const works = defineCollection({
  loader: glob({ base: "./src/content/works", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    status: z.enum(workStatusOrder),
    featured: z.boolean().default(false),
    role: z.string().min(1).optional(),
    stack: z.array(z.string().min(1)).default([]),
    cover: z.string().min(1).optional(),
    website: z.string().url().optional(),
    repository: z.string().url().optional(),
    note: z.string().min(1).optional(),
    metrics: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          source: z.string().url(),
          asOf: z.coerce.date(),
        }),
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(noteCategoryOrder),
    tags: z.array(z.string().min(1)).default([]),
    cover: z.string().min(1).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, notes };

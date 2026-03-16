import { z } from "zod";

export const createEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  title: z.string().min(1).max(120),
  content: z.string().optional().default(""),
  tags: z.array(z.string().min(1).max(30)).optional().default([]),
  mood: z.number().min(1).max(5).optional().default(3),
  links: z.array(z.string().url()).optional().default([]),
  timeSpent: z.number().min(0).optional().default(0)
});

export const updateEntrySchema = createEntrySchema.partial();
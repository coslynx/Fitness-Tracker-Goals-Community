import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(1, "Goal name is required").required(),
  targetValue: z
    .number()
    .int()
    .min(1, "Target value must be at least 1")
    .required(),
  targetDate: z
    .date()
    .min(new Date(), "Target date must be in the future")
    .required(),
});

export const progressSchema = z.object({
  value: z.number().int().optional(),
  date: z.date().optional(),
});

export const postSchema = z.object({
  content: z.string().min(1, "Post content is required").required(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment content is required").required(),
});
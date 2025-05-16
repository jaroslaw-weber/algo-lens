import { z } from 'zod';

export const problemListQuerySchema = z.object({
  tag: z.string().optional(),
});

export const problemIdParamSchema = z.object({
  id: z.string().min(1, "Problem ID is required"),
});

export const problemStateParamsSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  step: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().nonnegative("Step must be a non-negative integer")
  ),
});

export const problemSizeParamsSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
});
import { z } from "zod";

export const problemListQuerySchema = z.object({
  tag: z.string().optional(),
  filter: z.string().optional(),
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

export const problemStateWithTestcaseParamsSchema =
  problemStateParamsSchema.extend({
    testcaseNumber: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().positive("Test case number must be a positive integer")
    ),
  });

export const problemSizeParamsSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
});

export const problemSizeWithTestcaseParamsSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  testcaseNumber: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().positive("Test case number must be a positive integer")
  ),
});

export const problemSchema = z.object({
  id: z.string(),
  title: z.string(),
  emoji: z.string().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.string().optional(),
  tags: z.array(z.string()),
  isBookmarked: z.boolean().default(false),
  repl: z
    .object({
      args: z.array(
        z.object({
          name: z.string(),
          type: z.string(),
        })
      ),
      returns: z.object({
        type: z.string(),
      }),
    })
    .optional(),
  tests: z
    .array(
      z.object({
        id: z.string(),
        argValues: z.array(z.any()),
        expectedResult: z.any(),
      })
    )
    .optional(),
  generateSteps: z.any().optional(), // Function type, can be refined
  testcases: z.any().optional(), // Array of test cases, can be refined
  explanation: z.any().optional(), // Markdown content
  variables: z.any().optional(), // Problem-specific variables
  groups: z.any().optional(), // Problem-specific groups
  codeGenerationSignature: z
    .object({
      signature: z.string(),
      name: z.string(),
    })
    .optional(),
});

export type Problem = z.infer<typeof problemSchema>;

export const problemListSchema = z.array(problemSchema);

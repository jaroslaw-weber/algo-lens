import { z } from "zod";

// Re-export existing schemas from backend
export const problemListQuerySchema = z.object({
  tag: z.string().optional(),
  filter: z.string().optional(),
  plan: z.string().optional(),
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

export const problemStatesParamsSchema = z.object({
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
  plan: z.enum(["free", "premium"]).optional(),
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
  generateSteps: z.any().optional(),
  testcases: z.any().optional(),
  explanation: z.any().optional(),
  variables: z.any().optional(),
  groups: z.any().optional(),
  codeGenerationSignature: z
    .object({
      signature: z.string(),
      name: z.string(),
    })
    .optional(),
});

export const problemListSchema = z.array(problemSchema);

// Database entity schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  name: z.string().optional(),
  avatar: z.string().optional(),
  paddle_customer_id: z.string().optional(),
  created: z.string(),
  updated: z.string(),
});

export const bookmarkSchema = z.object({
  id: z.string(),
  user: z.string(),
  problem: z.string(),
  created: z.string(),
  updated: z.string(),
});

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
    username: z.string().optional(),
    name: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

// Environment configuration schemas
export const databaseConfigSchema = z.object({
  url: z.string().url(),
  adminUsername: z.string().optional(),
  adminPassword: z.string().optional(),
});

// Query schemas for database operations
export const bookmarkQuerySchema = z.object({
  user: z.string().optional(),
  problem: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  filter: z.string().optional(),
});

// Database entity schemas
export const paddleEventSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  event_type: z.string(),
  occurred_at: z.string(),
  notification_id: z.string(),
  data: z.any(),
  signature: z.string().optional(),
  processing_status: z.string(),
  created: z.string(),
  updated: z.string(),
});

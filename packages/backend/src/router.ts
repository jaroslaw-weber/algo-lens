import { Hono, Context } from "hono";
import { pick, sample } from "lodash";
import { cors } from "hono/cors";
import { authMiddleware, AuthEnv } from "./auth/middleware";
import { z } from "zod";

import {
  getAllProblemsService,
  getProblemByIdService,
  getProblemStateService,
  getProblemSizeService,
  preserialize,
} from "./problem/services/problemService";

import {
  problemListQuerySchema,
  problemIdParamSchema,
  problemStateParamsSchema,
  problemSizeParamsSchema, // Keep this for now, might be used elsewhere or can be removed later if not needed
  problemStateWithTestcaseParamsSchema,
  problemSizeWithTestcaseParamsSchema,
} from "./problem/schemas";
import { TestCase } from "algo-lens-core";

const app = new Hono<{ Variables: AuthEnv["Variables"] }>();

app.use(cors());
app.use(authMiddleware);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/problem", async (c: Context<{ Variables: AuthEnv["Variables"] }>) => {
  const { tag, filter } = problemListQuerySchema.parse(c.req.query());
  const user = c.get("user"); // Get user object from authMiddleware context
  const userId = user?.id; // Get user ID if user is authenticated
  console.log("user", userId);

  const all = await getAllProblemsService(userId, filter);

  // The service now returns objects with isBookmarked, so we don't need to pick
  // We should ensure the returned data conforms to problemListSchema
  const list = all.map((problem) => ({
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    emoji: problem.emoji,
    bookmark: problem.bookmark,
  }));

  return c.json(list);
});

app.get("/problem/random", async (c) => {
  const all = await getAllProblemsService();
  if (!all || all.length === 0) {
    console.error("No problems found when fetching for /problem/random");
    return c.json({ error: "No problems available" }, 500);
  }

  const randomProblemId = sample(all)!.id;

  const problem = await getProblemByIdService(randomProblemId);

  return c.json(problem);
});

app.get("/problem/:id", async (c) => {
  const { id } = problemIdParamSchema.parse(c.req.param());

  const problem = await getProblemByIdService(id);
  if (!problem) {
    return c.json(
      {
        error: "Problem not found",
      },
      404
    );
  }
  const rendered = pick(problem, [
    "id",
    "title",
    "difficulty",
    "code",
    "url",
    "tags",
    "metadata",
    "description",
    "explanation",
  ]);
  //@ts-expect-error
  rendered.testcases = cleanTestcases(problem.testcases);
  if (Object.keys(rendered).length === 0) {
    throw new Error("invalid problem: " + problem);
  }
  return c.json(rendered);
});

function cleanTestcases(testcases: TestCase<any, any>[]) {
  return testcases.map((tc) => ({
    name: tc.name,
    description: tc.description,
    isDefault: tc.isDefault,
  }));
}

app.get(
  "/problem/:problemId/testcase/:testcaseNumber/state/:step",
  async (c) => {
    const { problemId, testcaseNumber, step } =
      problemStateWithTestcaseParamsSchema.parse(c.req.param());

    // Convert 1-based testcaseNumber to 0-based index
    const testcaseIndex = testcaseNumber - 1;

    console.log("getting state");
    const state = await getProblemStateService(problemId, testcaseIndex, step);
    console.log("got state");

    const preserialized = preserialize(state!);
    return c.json(preserialized);
  }
);

app.get("/problem/:problemId/testcase/:testcaseNumber/size", async (c) => {
  const { problemId, testcaseNumber } =
    problemSizeWithTestcaseParamsSchema.parse(c.req.param());

  // Convert 1-based testcaseNumber to 0-based index
  const testcaseIndex = testcaseNumber - 1;

  const size = await getProblemSizeService(problemId, testcaseIndex);

  return c.json({ size });
});

export default app;

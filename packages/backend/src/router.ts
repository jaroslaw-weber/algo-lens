import { Hono, Context } from "hono";
import { pick, sample } from "lodash";
import { cors } from "hono/cors";
import { authMiddleware, AuthEnv } from "./auth/middleware";
import premiumRouter from "backend-premium/src/router";
import { errorMiddleware } from "./errorMiddleware";

import {
  getAllProblemsService,
  getProblemByIdService,
  getProblemStateService,
  getProblemSizeService,
  getAllProblemStatesService, // Add this import
  preserialize,
} from "./problem/services/problemService";

import {
  problemListQuerySchema,
  problemIdParamSchema,
  problemStateWithTestcaseParamsSchema,
  problemSizeWithTestcaseParamsSchema,
  problemStatesParamsSchema, // Add this import
} from "./problem/schemas";
import {  TestCase } from "algo-lens-core/src/types";
import { problemAccessCheck } from "backend-premium/src/access";

const app = new Hono<{ Variables: AuthEnv["Variables"] }>();

app.use(cors());
app.use(authMiddleware);
app.onError(errorMiddleware);

app.get("/", (c: Context) => {
  return c.text("Hello Hono!");
});

app.get("/health", (c: Context) => {
  return c.json({ status: "ok" });
});

app.route("/premium", premiumRouter);

app.get("/problem", async (c: Context<{ Variables: AuthEnv["Variables"] }>) => {
  const { tag, filter, plan } = problemListQuerySchema.parse(c.req.query());
  const user = c.get("user"); // Get user object from authMiddleware context
  const userId = user?.id; // Get user ID if user is authenticated
  console.log("user", userId);

  const all = await getAllProblemsService({ userId, filter, tag, plan });
  // The service now returns objects with isBookmarked, so we don't need to pick
  // We should ensure the returned data conforms to problemListSchema
  const list = all.map((problem) => ({
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    emoji: problem.emoji,
    bookmark: problem.bookmark,
    plan: problem.plan,
    tags: problem.tags,
  }));

  return c.json(list);
});

app.get("/problem/random", async (c: Context) => {
  const all = await getAllProblemsService({ plan: "free" });
  if (!all || all.length === 0) {
    console.error("No problems found when fetching for /problem/random");
    return c.json({ error: "No problems available" }, 500);
  }

  const randomProblemId = sample(all)!.id;

  const problem = await getProblemByIdService(randomProblemId);

  return c.json(problem);
});

app.get("/problem/:id", async (c: Context) => {
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
  const user = {
    plan: "premium",
  };

  problemAccessCheck({ user: user, problem });

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
    "plan",
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

  async (c: Context) => {
    const { problemId, testcaseNumber, step } =
      problemStateWithTestcaseParamsSchema.parse(c.req.param());

    // Convert 1-based testcaseNumber to 0-based index
    const testcaseIndex = testcaseNumber - 1;

    console.log("getting state");
    const subscription = c.get("user");
    const state = await getProblemStateService(
      problemId,
      testcaseIndex,
      step,
      subscription
    );
    console.log("got state", state);

    const preserialized = preserialize(state!);
    return c.json(preserialized);
  }
);

app.get(
  "/problem/:problemId/testcase/:testcaseNumber/size",

  async (c: Context) => {
    const { problemId, testcaseNumber } =
      problemSizeWithTestcaseParamsSchema.parse(c.req.param());

    // Convert 1-based testcaseNumber to 0-based index
    const testcaseIndex = testcaseNumber - 1;

    const size = await getProblemSizeService(problemId, testcaseIndex);

    return c.json({ size });
  }
);

app.get(
  "/problem/:problemId/testcase/:testcaseNumber/states",
  async (c: Context) => {
    const { problemId, testcaseNumber } = problemStatesParamsSchema.parse(
      c.req.param()
    );

    const query = c.req.query();
    const from = query.from ? parseInt(query.from, 10) : undefined;
    const to = query.to ? parseInt(query.to, 10) : undefined;

    const testcaseIndex = testcaseNumber - 1;
    const subscription = c.get("user");

    // Default values for from and to
    const start = from ?? 1;
    const end = to ?? start;

    if (end - start + 1 > 10) {
      //allow for now
      /*
      return c.json(
        { error: "Cannot request more than 10 states at once" },
        400
      );*/
    }

    const allStates = await getAllProblemStatesService(
      problemId,
      testcaseIndex,
      subscription,
      start,
      end
    );
    if (!allStates) {
      return c.json({ error: "States not found" }, 404);
    }
    return c.json(allStates.map(preserialize));
  }
);

export default app;

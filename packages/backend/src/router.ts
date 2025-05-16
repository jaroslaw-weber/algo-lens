import { Hono } from "hono";
import { pick, sample } from "lodash";
import { cors } from "hono/cors";
import { authMiddleware } from './auth/middleware';
import { z } from 'zod';

import {
  getAllProblemsService,
  getProblemByIdService,
  getProblemStateService,
  getProblemSizeService,
  preserialize
} from "./problem/services/problemService";

import { problemListQuerySchema, problemIdParamSchema, problemStateParamsSchema, problemSizeParamsSchema } from "./problem/schemas";

const app = new Hono();

app.use(cors());
app.use(authMiddleware);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/problem", async (c) => {
  try {
    const { tag } = problemListQuerySchema.parse(c.req.query());
    const all = await getAllProblemsService();

    const filteredProblems = tag
      ? all.filter((p) => p.tags && p.tags.includes(tag))
      : all;

    const list = filteredProblems.map((x) =>
      pick(x, ["id", "title", "difficulty", "emoji"])
    );
    return c.json(list);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Error fetching problems:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get("/problem/random", async (c) => {
  try {
    const all = await getAllProblemsService();
    if (!all || all.length === 0) {
      console.error("No problems found when fetching for /problem/random");
      return c.json({ error: "No problems available" }, 500);
    }

    const randomProblemId = sample(all)!.id;

    const problem = await getProblemByIdService(randomProblemId);

    const rendered = pick(problem, [
      "id",
      "title",
      "difficulty",
      "code",
      "url",
      "tags",
      "metadata",
    ]);

    return c.json(rendered);
  } catch (error) {
    console.error("Error fetching random problem:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get("/problem/:id", async (c) => {
  try {
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
    if (Object.keys(rendered).length === 0) {
      throw new Error("invalid problem: " + problem);
    }
    return c.json(rendered);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Error fetching problem by ID:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get("/problem/:problemId/state/:step", async (c) => {
  try {
    const { problemId, step } = problemStateParamsSchema.parse(c.req.param());

    const state = await getProblemStateService(problemId, step);

    const preserialized = preserialize(state!);
    return c.json(preserialized);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Error fetching problem state:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get("/problem/:problemId/size", async (c) => {
  try {
    const { problemId } = problemSizeParamsSchema.parse(c.req.param());

    const size = await getProblemSizeService(problemId);

    return c.json({ size });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Error fetching problem size:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;
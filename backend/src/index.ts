import { Hono } from "hono";
import { allProblems, getAllProblems } from "./problem/core/list";
import { pick, pickBy } from "lodash";
import { getProblemById } from "./problem/core/utils";

const app = new Hono();
import { cors } from 'hono/cors'

app.use(cors())
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/problem", (c) => {
  const list = getAllProblems().map((x) =>
    pick(x, ["id", "title", "difficulty"])
  );
  return c.json(list);
});

app.get("/problem/:id", (c) => {
  const id = c.req.param("id");

  if(!id){
    return c.json(
      {
        error: "No id provided",
      },
      400
    );
  }
  const problem = getProblemById(id!)
  if (!problem) {
    return c.json(
      {
        error: "Problem not found",
      },
      404
    );
  }
  const rendered = pick(problem, ["id", "title", "difficulty", "code", "url", "tags"])
  return c.json(rendered);
});

export default app;

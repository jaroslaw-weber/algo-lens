import { Context, Next } from "hono";
import { AlgolensError } from "algo-lens-core/src";

export const errorMiddleware = async (err: Error, c: Context) => {
  if (err instanceof AlgolensError) {
    return c.json({ error: err.message, code: err.code }, 400);
  }
  console.error(`${err}`);
  return c.json({ error: err.message }, 500);
};

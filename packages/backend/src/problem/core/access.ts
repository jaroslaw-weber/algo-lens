import { Problem } from "algo-lens-core/src/types";
import { AlgolensError } from "algo-lens-core/src";

export function problemAccessCheck(p: {
  subscription: { plan: string };
  problem: Problem<any, any>;
}) {
  const { subscription: user, problem } = p;
  if (!problem.plan) {
    throw new Error(`problem 'plan' is missing`);
  }
  if (problem.plan == "premium") {
    if (!user) {
      throw new AlgolensError({
        message: "This is a premium problem but you are not logged in.",
        code: "NEED_PREMIUM_ACCESS",
      });
    }

    if (user?.plan !== "premium") {
      throw new AlgolensError({
        message: "This is a premium problem but you are using a free plan.",
        code: "NEED_PREMIUM_ACCESS",
      });
    }
  }
}

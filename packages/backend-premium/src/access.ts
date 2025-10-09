import { Problem } from "algo-lens-core/src/types";
import { AlgolensError } from "algo-lens-core/src";

export function problemAccessCheck(p: {
  user: { plan: string };
  problem: Problem<any, any>;
}) {
  return;
}

export function checkUserPremiumStatus() {
  return true;
}

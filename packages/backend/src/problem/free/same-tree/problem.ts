import { Problem, ProblemState } from "algo-lens-core/src/types";

import { sameTree } from "./steps"; // Assuming steps.ts will export sameTree function
import { SameTreeInput } from "./types"; // Assuming types.ts will export SameTreeInput
import { testcases } from "./testcase";
import { groups } from "./groups";
import { variables } from "./variables";

const title = "Same Tree Check";

export const problem: Problem<SameTreeInput, ProblemState> = {
  title,
  emoji: "🌲",
  func: (i) => sameTree(...i), // This function generates the steps
  testcases,
  id: "same-tree",
  difficulty: "easy",
  tags: ["tree"],
  metadata: {
    groups,
    variables,
  },
  codegen: {
    signature: "isSameTree(p: TreeNode | null, q: TreeNode | null): boolean",
  },
};

import { Problem, ProblemState } from "algo-lens-core";
import { sameTree } from "./steps"; // Assuming steps.ts will export sameTree function
import { SameTreeInput } from "./types"; // Assuming types.ts will export SameTreeInput
import { code } from "./code/typescript"; // Assuming code/typescript.ts will export the code string

const title = "Same Tree Check";

export const problem: Problem<SameTreeInput, ProblemState> = {
  title,
  emoji: '🌲',
  code,
  func: sameTree, // This function generates the steps
  id: "same-tree",
  tags: ["tree"],
};

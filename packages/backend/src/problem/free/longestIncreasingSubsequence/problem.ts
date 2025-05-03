import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps";
import { LISInput } from "./types";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Longest Increasing Subsequence";

export const problem: Problem<LISInput, ProblemState> = {
    title: title,
    emoji: '📈',
    func: generateSteps,
    testcases,
    id: "longestIncreasingSubsequence",
    tags: ["dynamic programming", "array", "binary search"],
    metadata: {
        variables,
        groups,
    },
};

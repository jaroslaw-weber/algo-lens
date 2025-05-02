import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { LISInput } from "./types"; // Import input type from types.ts

const title = "Longest Increasing Subsequence";
const getInput = () => ({ nums: [10, 9, 2, 5, 3, 7, 101, 18] });

export const problem: Problem<LISInput, ProblemState> = {
    title: title,
    emoji: '📈',
    code: code,
    func: generateSteps, // Use the renamed function
    id: "longest-increasing-subsequence",
    tags: ["dynamic programming"],
};

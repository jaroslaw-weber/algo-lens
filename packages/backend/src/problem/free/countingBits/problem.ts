import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { CountBitsInput } from "./types";

const title = "Counting Bits";
const getInput = () => ({
  n: 15, // Using the same example input as the original file
});

export const problem: Problem<CountBitsInput, ProblemState> = {
  title: title,
  emoji: '💻',
  code: code,
  func: generateSteps, // Use the new step generator function
  id: "counting-bits", // Keep the original ID
  tags: ["bit manipulation"], // Keep the original tags
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};

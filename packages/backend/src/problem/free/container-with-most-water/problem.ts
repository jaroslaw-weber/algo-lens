import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Import only generateSteps from steps
import { code } from "./code";
import { ContainerInput } from "./types"; // Import ContainerInput from types
import { testcases } from "./testcase";

const title = "Container With Most Water";
export const problem: Problem<ContainerInput, any> = {
  title,
  emoji: '🌊',
  code,
  testcases:testcases,
  func: generateSteps, // Use the renamed function
  id: "container-with-most-water",
  tags: ["array", "two pointers"],
  metadata: {
    variables: [],
    groups: [],
  },
};

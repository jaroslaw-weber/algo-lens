import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Import only generateSteps from steps
import { code } from "./code";
import { ContainerInput } from "./types"; // Import ContainerInput from types

const title = "Container With Most Water";
const getInput = () => ({
  height: [1, 8, 6, 2, 5, 4, 8, 3, 7],
});

export const problem: Problem<ContainerInput, ProblemState> = {
  title,
  emoji: '🌊',
  code,
  getInput,
  func: generateSteps, // Use the renamed function
  id: "container-with-most-water",
  tags: ["array", "two pointers"],
};

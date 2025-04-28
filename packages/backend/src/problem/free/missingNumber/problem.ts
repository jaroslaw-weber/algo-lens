import { Problem } from "algo-lens-core";
import { MissingNumberInput } from "./types";
import { generateSteps } from "./steps";
import { code } from "./code";
import { variableMetadata } from "./variables";
import { groups } from "./groups";

// Define the title
const title = "Missing Number";

// Define the input generation function (copied from original file)
const getInput = () => ({
  nums: [0, 1, 3], // Example input
});

// Export the complete problem setup
export const problem: Problem<MissingNumberInput> = {
  title,
  id: "missing-number",
  tags: ["math", "array"],
  getInput,
  code, // Imported from ./code
  func: generateSteps, // Imported from ./steps
  metadata: {
    variables: variableMetadata, // Imported from ./variables
    groups, // Imported from ./groups
  },
};

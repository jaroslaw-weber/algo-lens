// Placeholder function - DOES NOT IMPLEMENT ACTUAL WORD BREAK LOGIC
import { WordBreakInput } from "../types";
import { generateSteps } from "../steps"; // Import the step generator
import { ProblemState } from "@algolens/core/src/types";

export const wordBreak = (p: WordBreakInput): ProblemState[] => {
  // Just call the step generator which has placeholder logic for now
  return generateSteps(p);
};

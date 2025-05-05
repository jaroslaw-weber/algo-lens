// Placeholder function - DOES NOT IMPLEMENT ACTUAL WORD BREAK LOGIC
import { WordBreakInput, WordBreakProblemState } from "../types";
import { generateSteps } from "../steps"; // Import the step generator

export const wordBreak = (p: WordBreakInput): WordBreakProblemState[] => {
    // Just call the step generator which has placeholder logic for now
    return generateSteps(p);
}

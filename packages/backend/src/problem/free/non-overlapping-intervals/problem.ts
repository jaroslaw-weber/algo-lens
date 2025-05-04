import { Problem, ProblemState, ProblemMetadata } from "algo-lens-core"; // Added ProblemMetadata
import { generateSteps } from "./steps";
import { code } from "./code/typescript";
import { EraseOverlapIntervalsInput } from "./types"; // Import input type from types.ts

const title = "Non-overlapping Intervals";
const getInput = () => ({
  intervals: [
    [17, 20],
    [2, 6],
    [8, 10],
    [12, 15],
    [5, 9],
    [1, 3],
    [14, 18],
    [19, 22],
  ],
});

// Define metadata
const metadata: ProblemMetadata = {
  variables: [
    {
      name: "intervals",
      label: "Intervals",
      emoji: "📊",
      description: "Input array of intervals",
    },
    {
      name: "remainingIntervals",
      label: "Remaining Intervals",
      emoji: "✅",
      description: "Intervals remaining after removing overlaps",
    },
    {
      name: "removalCount",
      label: "Removal Count",
      emoji: "🗑️",
      description: "Number of intervals removed",
    },
  ],
  // groups: [] // Optional: Can add groups later if needed
};


export const problem: Problem<
  EraseOverlapIntervalsInput,
  ProblemState
> = {
  title,
  emoji: '✂️',
  code,
  func: generateSteps,
  id: "non-overlapping-intervals",
  tags: ["interval"],
  metadata, // Add the metadata property here
  testcases: [], // Add placeholder testcases
  difficulty: "easy" // Add placeholder difficulty
};

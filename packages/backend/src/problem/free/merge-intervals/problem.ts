import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { MergeIntervalsInput } from "./types"; // Import input type from types.ts

const title = "Merge Intervals";
const getInput = () => ({
  intervals: [
    [21, 23], // No overlap
    [2, 5],   // Overlaps with [1, 4]
    [14, 16], // No overlap
    [17, 20], // No overlap
    [8, 12],  // Overlaps with [6, 10], [11, 13]
    [11, 13], // Overlaps with [8, 12]
    [22, 25], // Overlaps with [21, 23]
    [6, 10],  // Overlaps with [8, 12]
    [1, 4],   // Overlaps with [2, 5]
  ],
});

export const problem: Problem<
  MergeIntervalsInput,
  ProblemState
> = {
  title,
  emoji: '🤝',
  code,
  getInput,
  func: generateSteps, // Use the renamed function
  id: "merge-intervals",
  tested: true, // Keep tested flag if present
  tags: ["interval"]
};

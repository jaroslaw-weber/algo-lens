import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
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

export const problem: Problem<
  EraseOverlapIntervalsInput,
  ProblemState
> = {
  title,
  emoji: '✂️',
  code,
  func: generateSteps, // Use the renamed function
  id: "non-overlapping-intervals",
  tags: ["interval"],
  metadata: { // Added metadata field
    variables: [
      {
        name: "intervals",
        label: "Intervals",
        emoji: "📊",
        description: "Input array of intervals"
      }
    ]
  },
  testcases: [ // Added testcases field
    {
      input: { // Result from calling getInput()
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
      },
      expected: null // Placeholder value
    }
  ],
  difficulty: "medium" // Added difficulty field
};

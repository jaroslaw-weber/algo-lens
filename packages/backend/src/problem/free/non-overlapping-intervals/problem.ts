// Placeholder for the main problem definition
import { Problem } from "algo-lens-core";
import { NonOverlappingIntervalsParams } from "./types";
import { codeRaw } from "./code";
import { generateSteps } from "./steps";
import { variableMetadata } from "./variables";
import { variableGroups } from "./groups";

const title = "Non-overlapping Intervals";

const getInput = (): NonOverlappingIntervalsParams => ({
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

export const nonOverlappingIntervalsProblem: Problem<NonOverlappingIntervalsParams> = {
  id: "non-overlapping-intervals",
  title: title,
  codeRaw: codeRaw,
  getInput: getInput,
  generateSteps: generateSteps,
  variableMetadata: variableMetadata,
  variableGroups: variableGroups,
  tags: ["interval"],
  tested: true, // Preserving the original tested status
};

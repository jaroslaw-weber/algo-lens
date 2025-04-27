import { VariableGroup } from "algo-lens-core";

export const variableGroups: VariableGroup[] = [
  {
    id: "intervals",
    label: "Intervals",
    variables: ["intervals", "remainingIntervals"], // Group input and output intervals
  },
  {
    id: "state",
    label: "State",
    variables: ["i", "lastEnd", "removalCount"], // Group loop index and state counters
  },
];

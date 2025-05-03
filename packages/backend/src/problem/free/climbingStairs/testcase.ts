
import { ProblemState, TestCase } from "algo-lens-core";
import { ClimbingStairsInput } from "./types"; // Assuming ClimbingStairsInput is defined in types.ts
export const testcases: TestCase<ClimbingStairsInput, ProblemState>[] = [
  { input: { n: 5 }, expected: { variables: [{ label: "result", type: "number", value: 8 }] } },
  { input: { n: 1 }, expected: { variables: [{ label: "result", type: "number", value: 1 }] } },
  { input: { n: 2 }, expected: { variables: [{ label: "result", type: "number", value: 2 }] } },
  { input: { n: 3 }, expected: { variables: [{ label: "result", type: "number", value: 3 }] } },
  { input: { n: 8 }, expected: { variables: [{ label: "result", type: "number", value: 34 }] } },
];

import { ProblemState, TestCase } from "algo-lens-core";
import { CoinChangeInput } from "./types"; // Assuming CoinChangeInput is defined in types.ts

export const testcases: TestCase<CoinChangeInput, ProblemState>[] = [
  { input: { coins: [1, 2, 5], target: 11 }, expected: { variables: [{ label: "result", type: "number", value: 3 }] } },
  { input: { coins: [2], target: 3 }, expected: { variables: [{ label: "result", type: "number", value: -1 }] } },
  { input: { coins: [1], target: 0 }, expected: { variables: [{ label: "result", type: "number", value: 0 }] } },
  { input: { coins: [1], target: 1 }, expected: { variables: [{ label: "result", type: "number", value: 1 }] } },
  { input: { coins: [1], target: 2 }, expected: { variables: [{ label: "result", type: "number", value: 2 }] } },
  { input: { coins: [186, 419, 83, 408], target: 6249 }, expected: { variables: [{ label: "result", type: "number", value: 20 }] } },
];

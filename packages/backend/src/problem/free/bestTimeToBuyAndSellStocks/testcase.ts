import { ProblemState, TestCase } from "algo-lens-core";
import { MaxProfitInput } from "./types"; // Assuming MaxProfitInput is defined in types.ts

export const testcases: TestCase<MaxProfitInput, ProblemState>[] = [
  {
    name: "Example 1",
    description: "Basic example with profit.",
    input: [2, 1, 2, 0, 1, 2],
    expected: 2,
  },
  {
    name: "Example 2",
    description: "Another basic example with profit.",
    input: [7, 1, 5, 3, 6, 4],
    expected: 5,
  },
  {
    name: "No Profit",
    description: "Prices are decreasing, no profit can be made.",
    input: [7, 6, 4, 3, 1],
    expected: 0,
  },
  {
    name: "Increasing Prices",
    description: "Prices are strictly increasing, maximum profit at the end.",
    input: [1, 2, 3, 4, 5],
    expected: 4,
  },
  {
    name: "Single Day",
    description: "Only one day, no transaction possible.",
    input: [1],
    expected: 0,
  },
  {
    name: "Short Array",
    description: "Short array with profit.",
    input: [2, 4, 1],
    expected: 2,
  },
  {
    name: "Default Case",
    description: "Default test case with profit.",
    input: [3, 2, 6, 5, 0, 3],
    expected: 4,
    isDefault: true,
  },
  {
    name: "Constant Prices",
    description: "Prices are constant, no profit.",
    input: [1, 1, 1, 1],
    expected: 0,
  },
  {
    name: "Decreasing Prices",
    description: "Prices are strictly decreasing, no profit.",
    input: [5, 4, 3, 2, 1],
    expected: 0,
  },
  {
    name: "Mixed Prices",
    description: "Mixed prices with multiple potential transactions.",
    input: [2, 7, 1, 8, 2, 8],
    expected: 7,
  },
];

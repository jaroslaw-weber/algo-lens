import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";
import { Problem } from "algo-lens-core";

export const problem: Problem<SpiralMatrixInput, SpiralMatrixOutput> = {
  id: "spiral-matrix",
  title: "Spiral Matrix",
  emoji: "🌀",
  difficulty: "medium",
  tags: ["Array", "Matrix"],
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "function spiralOrder(matrix: number[][]): number[]",
  },
};

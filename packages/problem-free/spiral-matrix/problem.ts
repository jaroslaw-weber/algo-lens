import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";
import { Problem } from "@algolens/core/src/types";

export const problem: Problem<SpiralMatrixInput, SpiralMatrixOutput> = {
  id: "spiral-matrix",
  title: "Spiral Matrix",
  emoji: "🌀",
  difficulty: "medium",
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "spiralOrder(matrix: number[][]): number[]",
  },
};

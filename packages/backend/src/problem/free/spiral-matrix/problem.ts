import { Problem } from "../../types/problem";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { explanation } from "./explanation.md";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";

export const problem: Problem<SpiralMatrixInput, SpiralMatrixOutput> = {
  id: "spiral-matrix",
  title: "Spiral Matrix",
  emoji: "🌀",
  difficulty: "medium",
  tags: ["Array", "Matrix"],
  generateSteps,
  testcases,
  explanation,
  variables,
  groups,
  codeGenerationSignature: {
    signature: "function spiralOrder(matrix: number[][]): number[]",
    name: "spiralOrder",
  },
};

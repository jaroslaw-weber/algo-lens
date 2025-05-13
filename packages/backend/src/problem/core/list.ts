import * as fs from "fs";
import * as path from "path";
import { Problem, ProblemGroup } from "algo-lens-core";
import { generateCodeFromSteps } from "./codeGenerator";

// Public API
import { loadProblemWithId } from "./loadProblemWithId";

export async function getAllProblems(): Promise<Problem<any, any>[]> {
  const problems: Problem<any, any>[] = [];
  const problemFiles = fs.readdirSync(path.join(__dirname, "../free"));

  for (const problemFile of problemFiles) {
    const problem = await loadProblemWithId(problemFile);
    if (problem) {
      problems.push(problem);
    }
  }

  return problems;
}

export const other: ProblemGroup[] = [];


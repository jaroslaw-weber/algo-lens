import * as fs from "fs/promises";
import * as path from "path";
import { Problem, ProblemGroup } from "algo-lens-core";
import { generateCodeFromSteps } from "./codeGenerator";

// Public API
import { loadProblemWithId } from "./loadProblemWithId";

//cache problem list
let problemFiles: string[] = [];

async function getProblemFiles() {
  if (!problemFiles?.length) {
    problemFiles = await fs.readdir(path.join(__dirname, "../free"), 'utf8');
  }
  return problemFiles
}

export async function getAllProblems(): Promise<Problem<any, any>[]> {
  const problems: Problem<any, any>[] = [];
  const files = await getProblemFiles();

  for (const problemFile of files) {
    const problem = await loadProblemWithId(problemFile);
    if (problem) {
      problems.push(problem);
    }
  }

  return problems;
}

export const other: ProblemGroup[] = [];

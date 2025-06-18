
import { Problem, ProblemGroup } from "algo-lens-core/src/types";


// Public API
import { loadProblemWithId } from "./load";
import { problemPaths } from "./ProblemPaths";


export async function getAllProblems(): Promise<Problem<any, any>[]> {
  
  const problems: Problem<any, any>[] = [];

  const list = await problemPaths.getList()

  for (const info of list) {
    const problem = await loadProblemWithId(info.problemId);
    if (problem) {
      problems.push(problem);
    }
  }

  return problems;
}

export const other: ProblemGroup[] = [];



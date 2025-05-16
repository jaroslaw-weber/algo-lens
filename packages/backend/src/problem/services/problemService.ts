import { getAllProblems as coreGetAllProblems } from "../core/list";
import { getProblemById as coreGetProblemById } from "../core/utils";
import { loadProblemWithId as coreLoadProblemWithId } from "../core/load";
import { ProblemState, HashmapVariable, HashsetVariable } from "algo-lens-core";
import { cloneDeep } from "lodash";
import { ProblemStateCache } from "../../cache/ProblemStateCache";

const stateCache = new ProblemStateCache();

export async function getAllProblemsService() {
  return coreGetAllProblems();
}

export async function getProblemByIdService(id: string) {
  return coreGetProblemById(id);
}

export async function loadProblemWithIdService(problemId: string) {
  return coreLoadProblemWithId(problemId);
}

export async function getProblemStateService(problemId: string, step: number) {
  const problem = await coreLoadProblemWithId(problemId);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }
  return stateCache.get(problem, step);
}

export async function getProblemSizeService(problemId: string) {
  const problem = await coreGetProblemById(problemId);
   if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }
  return stateCache.getSize(problem);
}


export function preserialize(state: ProblemState): any {
  const result = cloneDeep(state);
  for (const v of result.variables) {
    //convert Map variable to Record
    const hm = v as HashmapVariable;
    if (hm.value instanceof Map) {
      hm.value = Array.from(hm.value.entries());
    }
    //convert Set variable to Array
    const set = v as HashsetVariable;
    if (set.value instanceof Set) {
      set.value = Array.from(set?.value);
    }
  }

  return result;
}
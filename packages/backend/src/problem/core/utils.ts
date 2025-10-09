import { sample } from "lodash";
import { getAllProblems } from "./list";
import { loadProblemWithId } from "./load";
import * as core from "@algolens/core/src/types";

import { Problem } from "@algolens/core/src/types";

export async function getRandomProblem() {
  const all = await getAllProblems();
  return sample(all);
}

export async function getProblemById(id: string) {
  ////
  console.log("get problem by id");
  // Load the full problem instead of using lightweight metadata
  const problem = await loadProblemWithId(id);
  if (!problem) {
    throw new Error(`Problem not found: ${id}`);
  }
  console.log("validating");
  validate(problem);
  console.log("validated");
  return problem;
}

function validate(problem?: Problem<any, any>) {
  if (!problem) throw new Error("Problem not found");
  if (!problem.code)
    throw new Error("Problem code not found in problem: " + problem.id);
}

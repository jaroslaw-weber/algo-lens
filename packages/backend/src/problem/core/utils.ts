import { sample } from "lodash";
import { getAllProblems } from "./list";
import * as core from "algo-lens-core";
import { Problem } from "algo-lens-core";

export async function getRandomProblem() {
  const all = await getAllProblems();
  return sample(all);
}

export async function getProblemById(id: string) {
  ////
  console.log("get problem by id");
  const all = await getAllProblems();
  console.log("all problems read");

  const problems = all.filter((p) => p.id === id);
  if (problems.length > 1) {
    throw new Error("duplicate!");
  }
  const problem = problems[0];
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

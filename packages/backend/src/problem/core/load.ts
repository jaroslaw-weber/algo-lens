import * as fs from "fs/promises";
import * as path from "path";
import { Problem } from "algo-lens-core/src/types";

import { generateCodeFromSteps } from "algo-lens-core/src/codegen/generate";
import { problemPaths } from "./ProblemPaths";

const problemCache: { [id: string]: Problem<any, any> } = {};


export async function loadProblemWithId(
  id: string
): Promise<Problem<any, any> | null> {
  if (problemCache[id]) {
    return problemCache[id];
  }

  const directory = await problemPaths.getProblemFolderInfo(id)
  if(!directory?.path){
    throw new Error("directory for problem "+id+" not found")
  }

  const problemFilePath = path.join(directory.path, "problem.ts")


  try {
    const exists = await fs.exists(problemFilePath);
    if (!exists) {
      return null; // Problem file not found
    }

    // Dynamically import the problem module
    const mod = await import(problemFilePath);
    const problem: Problem<any, any> = mod.problem;

    if (!problem) {
      return null;
    }

    problem.code = await getProblemCode(problem, directory.path);
    //serialize testcases if necessary

    problemCache[id] = problem; // Cache the loaded problem

    return problem;
  } catch (error) {
    console.error(`Error loading problem with ID ${id}:`, error);
    return null;
  }
}
// Get the code: use codegen if configured, else fallback to file
export async function getProblemCode(
  problem: Problem<any, any>,
  dir: string
): Promise<string> {
  ////
  if (problem.codegen) {
    const stepsPath = path.join(dir, "steps.ts");
    const exists = await fs.exists(stepsPath);
    ////
    if (exists) {
      try {
        const steps = await fs.readFile(stepsPath, "utf-8");
        const generated = await generateCodeFromSteps({
          stepsFileContent: steps,
          targetFunctionSignature: problem.codegen.signature,
          problemName: problem.id,
        });
        const { content } = generated;
        ////
        return content;
      } catch (e: any) {
        console.error(e.message);
        return `FORMATTING ERROR: 
generated`;
      }
    } else {
      throw new Error("no steps.ts at path: " + stepsPath);
    }
    return "// codegen config present, but steps.ts not found.";
  } else {
    console.error("problem.codegen missing for problem: " + problem.id);
  }

  return "// CODEGEN FAILED";
}

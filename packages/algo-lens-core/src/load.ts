import * as fs from "fs/promises";
import * as path from "path";
import { Problem } from "../types/core";
import { generateCodeFromSteps } from "./codegen/generate";

export async function loadProblemFromPath(problemFolderPath: string) {
  const exists = await fs.exists(problemFolderPath);
  if (!exists) {
    return null; // Problem file not found
  }

  // Dynamically import the problem module
  const mod = await import(problemFolderPath + "/problem.ts");
  const problem: Problem<any, any> = mod.problem;

  if (!problem) {
    return null;
  }

  problem.code = await getProblemCode(problem, problemFolderPath);
  //serialize testcases if necessary

  return problem;
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

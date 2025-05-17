import * as fs from "fs/promises";
import * as path from "path";
import { Problem } from "algo-lens-core";
import { generateCodeFromSteps } from "../../codegen/generate";

const problemCache: { [id: string]: Problem<any, any> } = {};

export async function loadProblemWithId(
  id: string
): Promise<Problem<any, any> | null> {
  if (problemCache[id]) {
    return problemCache[id];
  }

  // Assuming the problem ID corresponds to the directory name
  const problemDir = path.join(__dirname, "../free", id);
  const problemFilePath = path.join(problemDir, "problem.ts");

  try {
    const exists = await fs.exists(problemFilePath);
    if (!exists) {
      return null; // Problem file not found
    }

    // Dynamically import the problem module
    const mod = await import(problemFilePath);
    const problem = mod.problem;

    if (!problem) {
      return null;
    }

    problem.code = await getProblemCode(problem, problemDir);
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

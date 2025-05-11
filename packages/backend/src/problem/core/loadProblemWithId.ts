import * as fs from "fs";
import * as path from "path";
import { Problem } from "algo-lens-core";
import { generateCodeFromSteps } from "./codeGenerator";

export async function loadProblemWithId(id: string): Promise<Problem<any, any> | null> {
  // Assuming the problem ID corresponds to the directory name
  const problemDir = path.join(__dirname, "../free", id);
  const problemFilePath = path.join(problemDir, "problem.ts");

  try {
    if (!fs.existsSync(problemFilePath)) {
      return null; // Problem file not found
    }

    // Dynamically import the problem module
    const mod = await import(problemFilePath);
    const problem = mod.problem;

    if (!problem) {
      return null;
    }

	problem.code = await getProblemCode(problem, problemDir)

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
  //console.log("problem.codegen", problem.codegen);
  if (problem.codegen) {
    const stepsPath = path.join(dir, "steps.ts");
    //console.log("steps path: " + stepsPath);
    if (fs.existsSync(stepsPath)) {
      try {
        const steps = fs.readFileSync(stepsPath, "utf-8");
        const generated = await generateCodeFromSteps({
          stepsFileContent: steps,
          targetFunctionSignature: problem.codegen.signature,
          problemName: problem.id,
        });
        const { content } = generated;
        //console.log("content", content);
        return content;
      } catch (e: any) {
        return `// Error generating code: ${e.message}`;
      }
    } else {
      throw new Error("no steps.ts at path: " + stepsPath);
    }
    return "// codegen config present, but steps.ts not found.";
  } else {
    console.error("problem.codegen missing for problem: " + problem.id);
  }

  const fallbackPath = path.join(dir, "code/typescript.ts");
  if (fs.existsSync(fallbackPath)) {
    return fs.readFileSync(fallbackPath, "utf-8");
  }

  return "// CODEGEN FAILED";
}

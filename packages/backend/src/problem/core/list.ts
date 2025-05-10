import * as fs from "fs";
import * as path from "path";
import { Problem, ProblemGroup } from "algo-lens-core";
import { generateCodeFromSteps } from "./codeGenerator"; // Added import

// Helper function to check if an object is a Problem instance
// Extended Problem type to include optional codeGenConfig
interface ProblemWithCodeGen<TInput, TOutput> extends Problem<TInput, TOutput> {
  codeGenConfig?: {
    targetFunctionSignature: string;
    // returnVariable: string; // Removed
  };
}

function isProblem(obj: any): obj is ProblemWithCodeGen<any, any> {
  return (
    obj &&
    typeof obj === "object" &&
    "title" in obj &&
    "description" in obj &&
    "tags" in obj &&
    "testCases" in obj
  );
}

export async function getAllProblemInternal(): Promise<Problem<any, any>[]> {
  const freeDirPath = path.join(__dirname, "../free");
  //console.log("loading problems from", freeDirPath);
  const dirEntries = fs.readdirSync(freeDirPath, { withFileTypes: true });
  //console.log(dirEntries);

  const dynamicallyLoadedProblems: Problem<any, any>[] = [];
  const loadedProblemTitles = new Set<string>();

  for (const entry of dirEntries) {
    const entryPath = path.join(freeDirPath, entry.name);
    const modulePath = entry.isDirectory()
      ? path.join(entryPath, "problem.ts")
      : entry.isFile() &&
        entry.name.endsWith(".ts") &&
        !entry.name.endsWith(".d.ts")
      ? entryPath
      : null;

    if (modulePath && fs.existsSync(modulePath)) {
      try {
        const relativePath = path
          .relative(__dirname, modulePath)
          .replace(/\\/g, "/");
        const module = await import(`./${relativePath}`);

        const foundProblem = Object.values(module)[0] as
          | ProblemWithCodeGen<any, any> // Use extended type
          | undefined;

        if (foundProblem && !loadedProblemTitles.has(foundProblem.id)) {
          if (foundProblem.codeGenConfig) {
            const stepsFilePath = path.join(entryPath, "steps.ts");
            if (fs.existsSync(stepsFilePath)) {
              try {
                const stepsFileContent = fs.readFileSync(stepsFilePath, "utf-8");
                const generatedCode = generateCodeFromSteps({
                  stepsFileContent,
                  targetFunctionSignature: foundProblem.codeGenConfig.targetFunctionSignature,
                  // returnVariable: foundProblem.codeGenConfig.returnVariable, // Removed
                });
                foundProblem.code = generatedCode.content;
                // Optionally log success or generatedCode.logs
                console.log(`Code generated for problem: ${foundProblem.title} using steps.ts. Logs: ${JSON.stringify(generatedCode.logs)}`);
              } catch (error) {
                console.error(`Error generating code for problem ${foundProblem.title} from steps.ts:`, error);
                foundProblem.code = `// Error generating code from steps.ts: ${error.message}`;
              }
            } else {
              console.warn(`steps.ts file not found for problem: ${foundProblem.title}, though codeGenConfig is present.`);
              foundProblem.code = "// steps.ts not found, code generation skipped.";
            }
          } else {
            // Fallback to old logic: Load the code from code/typescript.ts file
            const codeFilePath = path.join(entryPath, "/code/typescript.ts");
            if (fs.existsSync(codeFilePath)) {
              foundProblem.code = fs.readFileSync(codeFilePath, "utf-8");
              console.log(`Code loaded from code/typescript.ts for problem: ${foundProblem.title} (no codeGenConfig).`);
            } else {
              console.warn(
                `Code file (code/typescript.ts) not found for problem: ${foundProblem.title}`
              );
              foundProblem.code = "// Code file not found.";
            }
          }

          dynamicallyLoadedProblems.push(foundProblem);
          loadedProblemTitles.add(foundProblem.title);
        } else if (foundProblem) {
          console.warn(`Duplicate problem found: ${foundProblem.title}`);
        } else {
          console.warn(`No Problem export found in module: ${relativePath}`);
        }
      } catch (error) {
        console.error(`Error importing module ${modulePath}:`, error);
      }
    }
  }
  return dynamicallyLoadedProblems;
}

export const other: ProblemGroup[] = [];

function groupByTags(problems: Problem<any, any>[]) {
  // Changed parameter name
  const groupedBlind = new Map();
  for (const problem of problems) {
    // Use the parameter
    if (problem.tags) {
      for (const tag of problem.tags) {
        if (!groupedBlind.has(tag)) {
          groupedBlind.set(tag, []);
        }
        groupedBlind.get(tag).push(problem);
      }
    }
  }
  return groupedBlind;
}

export async function getAllProblems(): Promise<Problem<any, any>[]> {
  return getAllProblemInternal();
}

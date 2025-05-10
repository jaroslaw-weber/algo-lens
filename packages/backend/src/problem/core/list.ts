import * as fs from "fs";
import * as path from "path";
import { Problem, ProblemGroup } from "algo-lens-core";
import { generateCodeFromSteps } from "./codeGenerator";

// Public API
export async function getAllProblems(): Promise<Problem<any, any>[]> {
  return loadProblemsFromDir(path.join(__dirname, "../free"));
}

export const other: ProblemGroup[] = [];

// Load all problems from a directory
async function loadProblemsFromDir(
  dirPath: string
): Promise<Problem<any, any>[]> {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const problems: Problem<any, any>[] = [];
  const seenTitles = new Set<string>();

  for (const entry of entries) {
    const filePath = resolveProblemFilePath(dirPath, entry);
    if (!filePath) continue;

    const problem = await loadProblem(filePath, path.join(dirPath, entry.name));
    if (problem && !seenTitles.has(problem.title)) {
      problems.push(problem);
      seenTitles.add(problem.title);
    }
  }

  return problems;
}

// Determine the correct file to load
function resolveProblemFilePath(
  baseDir: string,
  entry: fs.Dirent
): string | null {
  const entryPath = path.join(baseDir, entry.name);
  if (entry.isDirectory()) return path.join(entryPath, "problem.ts");
  if (
    entry.isFile() &&
    entry.name.endsWith(".ts") &&
    !entry.name.endsWith(".d.ts")
  )
    return entryPath;
  return null;
}

// Load and process a single problem
async function loadProblem(
  filePath: string,
  entryDir: string
): Promise<Problem<any, any> | null> {
  try {
    const relPath = path.relative(__dirname, filePath).replace(/\\/g, "/");
    //console.log("path", relPath);
    const mod = await import(`./${relPath}`);
    const problem = mod.problem;
    if (!problem) return null;

    problem.code = await getProblemCode(problem, entryDir);
    // if (filePath.includes("3sum")) console.log("problem code: ", problem.code);
    return problem;
  } catch (e) {
    console.error(`Error loading ${filePath}:`, e);
    return null;
  }
}

// Get the code: use codegen if configured, else fallback to file
async function getProblemCode(
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
    }
    return "// codegen config present, but steps.ts not found.";
  }

  const fallbackPath = path.join(dir, "code/typescript.ts");
  if (fs.existsSync(fallbackPath)) {
    return fs.readFileSync(fallbackPath, "utf-8");
  }

  return "// Code file not found.";
}

import * as fs from "fs";
import * as path from "path";
// Removed specific problem imports as they will be loaded dynamically
import { Problem, ProblemGroup } from "algo-lens-core";

// Helper function to check if an object is a Problem instance
function isProblem(obj: any): obj is Problem<any, any> {
  return (
    obj &&
    typeof obj === "object" &&
    "title" in obj &&
    "description" in obj &&
    "tags" in obj &&
    "testCases" in obj
  );
}

export async function getAllProblemGroups(): Promise<ProblemGroup[]> {
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
          | Problem<any, any>
          | undefined;

        if (foundProblem && !loadedProblemTitles.has(foundProblem.id)) {
          // Load the code from typescript.ts file
          const codeFilePath = path.join(entryPath, "/code/typescript.ts");
          if (fs.existsSync(codeFilePath)) {
            //@ts-expect-error
            foundProblem.code = fs.readFileSync(codeFilePath, "utf-8");
          } else {
            console.warn(
              `Code file not found for problem: ${foundProblem.title}`
            );
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

  // Removed console.log for dynamically loaded problems

  const groupedBlind = groupByTags(dynamicallyLoadedProblems); // Use dynamically loaded problems

  return Array.from(groupedBlind.entries()).map(([tag, problems]) => ({
    label: tag,
    problems,
  }));
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
  const groups = await getAllProblemGroups();
  return groups.flatMap((group) => group.problems);
}

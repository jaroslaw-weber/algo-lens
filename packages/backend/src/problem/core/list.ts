import * as fs from 'fs';
import * as path from 'path';
// Removed specific problem imports as they will be loaded dynamically
import { Problem, ProblemGroup } from "algo-lens-core";

// Helper function to check if an object is a Problem instance
function isProblem(obj: any): obj is Problem<any, any> {
  return obj && typeof obj === 'object' && 'title' in obj && 'description' in obj && 'tags' in obj && 'testCases' in obj;
}

export async function getBlind75Problems(): Promise<ProblemGroup[]> {
  const freeDirPath = path.join(__dirname, '../free');
  const dirEntries = fs.readdirSync(freeDirPath, { withFileTypes: true });
  // Removed console.log(dirEntries);

  const dynamicallyLoadedProblems: Problem<any, any>[] = [];

  for (const entry of dirEntries) {
    const entryPath = path.join(freeDirPath, entry.name);

    let modulePath: string | null = null;

    if (entry.isDirectory()) {
      const problemFilePath = path.join(entryPath, 'problem.ts');
      if (fs.existsSync(problemFilePath)) {
        modulePath = problemFilePath;
      }
    } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
      modulePath = entryPath;
    }

    if (modulePath) {
      try {
        // Convert file path to a relative path suitable for dynamic import
        const relativePath = path.relative(__dirname, modulePath).replace(/\\/g, '/');
        const module = await import(`./${relativePath}`); // Use relative path for import

        // Find the exported Problem object
        let foundProblem: Problem<any, any> | null = null;
        for (const key in module) {
          if (Object.prototype.hasOwnProperty.call(module, key)) {
            const exportedItem = module[key];
            if (isProblem(exportedItem)) {
              foundProblem = exportedItem;
              break; // Assume first found Problem is the one we want
            }
            // Fallback check by name convention if type check fails
            if (!foundProblem && typeof exportedItem === 'object' && key.toLowerCase().endsWith('problem')) {
               // Basic check if it looks like a problem object based on convention
               if(exportedItem && 'title' in exportedItem && 'testCases' in exportedItem) {
                  console.warn(`Found potential problem by name convention (${key}) in ${relativePath}, but type check failed. Attempting to use it.`);
                  foundProblem = exportedItem as Problem<any, any>; // Cast needed here
                  break;
               }
            }
          }
        }

        if (foundProblem) {
          dynamicallyLoadedProblems.push(foundProblem);
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

  const blind75: ProblemGroup[] = [];
  for (const tag of Array.from(groupedBlind.keys())) {
    blind75.push({
      label: tag,
      problems: groupedBlind.get(tag),
    });
  }
  return blind75;
}

export const other: ProblemGroup[] = [];

// Initialize allProblems asynchronously
let allProblems: ProblemGroup[] = [];
export async function initializeProblems() {
  const blind75 = await getBlind75Problems();
  allProblems = [...blind75, ...other];
  console.log("Problems initialized.");
}

// Ensure problems are initialized before they are accessed
// This might require changes in how/when getAllProblems is called in the application startup
initializeProblems(); // Call initialization


function groupByTags(problems: Problem<any, any>[]) { // Changed parameter name
  const groupedBlind = new Map();
  for (const problem of problems) { // Use the parameter
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


// getAllProblems now needs to ensure initialization is complete,
// but since initialization is called above, we assume it's done.
// A more robust solution might involve returning a promise or using a flag.
export function getAllProblems(): Problem<any, any>[] {
  if (allProblems.length === 0) {
      console.warn("getAllProblems called before problems were initialized!");
      // Depending on requirements, could throw error, return empty, or wait.
      // Returning empty for now.
      return [];
  }
  return allProblems.flatMap((group) => group.problems);
}
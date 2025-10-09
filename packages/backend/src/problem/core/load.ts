import * as fs from "fs/promises";
import * as path from "path";
import { Problem } from "@algolens/core/src/types";

import { generateCodeFromSteps } from "@algolens/core/src/codegen/generate";
import { problemPaths } from "./ProblemPaths";
import { blind75Slugs } from "./blind75";

const problemCache: { [id: string]: Problem<any, any> } = {};

function normalizeSlug(slug: string): string {
  return slug.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export async function loadProblemWithId(
  id: string
): Promise<Problem<any, any> | null> {
  if (problemCache[id]) {
    return problemCache[id];
  }

  const directory = await problemPaths.getProblemFolderInfo(id);
  if (!directory?.path) {
    throw new Error("directory for problem " + id + " not found");
  }

  const problemFilePath = path.join(directory.path, "problem.ts");

  try {
    const exists = await fs.exists(problemFilePath);
    if (!exists) {
      return null; // Problem file not found
    }

    // Load metadata.json first
    let metadataV2: any = null;
    try {
      const metadataPath = path.join(directory.path, "metadata.json");
      if (await fs.exists(metadataPath)) {
        const metadataContent = await fs.readFile(metadataPath, "utf-8");
        const metadata = JSON.parse(metadataContent);
        metadataV2 = metadata;
      }
    } catch (e) {
      console.warn(`Failed to load metadata.json for ${id}:`, e);
    }

    // Dynamically import the problem module
    const mod = await import(problemFilePath);
    const problem: Problem<any, any> = mod.problem;

    if (!problem) {
      return null;
    }

    // Assign metadataV2 from metadata.json
    if (metadataV2) {
      // Add blind75 tag if problem is in Blind75 list
      const normalizedId = normalizeSlug(id);
      if (blind75Slugs.has(normalizedId) || blind75Slugs.has(metadataV2.id)) {
        if (!metadataV2.tags.includes("blind75")) {
          metadataV2.tags.push("blind75");
        }
      }
      problem.metadataV2 = metadataV2;
    }

    problem.code = await getProblemCode(problem, directory.path);
    problem.plan = directory.plan;
    console.log("problem plan: ", problem.plan);

    // Dynamically load description.md
    try {
      const descriptionPath = path.join(directory.path, "description.md");
      if (await fs.exists(descriptionPath)) {
        (problem as any).description = await fs.readFile(
          descriptionPath,
          "utf-8"
        );
      } else {
        (problem as any).description = "No description available."; // Default placeholder
      }
    } catch (e) {
      console.error(`Error loading description.md for ${id}:`, e);
      (problem as any).description = "Error loading description.";
    }

    // Dynamically load explanation.md
    try {
      const explanationPath = path.join(directory.path, "explanation.md");
      if (await fs.exists(explanationPath)) {
        (problem as any).explanation = await fs.readFile(
          explanationPath,
          "utf-8"
        );
      } else {
        (problem as any).explanation = "No explanation available."; // Default placeholder
      }
    } catch (e) {
      console.error(`Error loading explanation.md for ${id}:`, e);
      (problem as any).explanation = "Error loading explanation.";
    }

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

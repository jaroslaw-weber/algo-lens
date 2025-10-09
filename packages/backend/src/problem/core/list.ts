import {
  Problem,
  ProblemGroup,
  Difficulty,
  Plan,
} from "@algolens/core/src/types";
import * as fs from "fs/promises";
import * as path from "path";

// Public API
import { loadProblemWithId } from "./load";
import { problemPaths } from "./ProblemPaths";
import { blind75Slugs } from "./blind75";

interface ProblemMetadata {
  id: string;
  title: string;
  emoji: string;
  difficulty: Difficulty;
  tags: string[];
  plan: Plan;
}

export async function getAllProblems(): Promise<Problem<any, any>[]> {
  const problems: Problem<any, any>[] = [];

  const list = await problemPaths.getList();

  for (const info of list) {
    try {
      const metadataPath = path.join(info.path, "metadata.json");
      const metadataContent = await fs.readFile(metadataPath, "utf-8");
      const metadata: ProblemMetadata = JSON.parse(metadataContent);

      // Create a lightweight problem object with just the metadata
      const problem: Problem<any, any> = {
        id: metadata.id,
        title: metadata.title,
        emoji: metadata.emoji,
        difficulty: metadata.difficulty,
        metadataV2: metadata,
        plan: metadata.plan,
        // These will be loaded on demand when needed
        func: null as any,
        testcases: [],
        metadata: { variables: [], groups: [] },
      };
      if (blind75Slugs.has(metadata.id)) {
        const tags = metadata?.tags ?? [];
        tags.push("blind75");
      }

      problems.push(problem);
    } catch (error) {
      console.warn(
        `Failed to load metadata for ${info.problemId}, falling back to full load:`,
        error
      );
      // Fallback to full loading if metadata.json is missing or invalid
      const problem = await loadProblemWithId(info.problemId);
      if (problem) {
        problems.push(problem);
      }
    }
  }

  return problems;
}

export const other: ProblemGroup[] = [];

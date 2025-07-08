import * as fs from "fs/promises";
import * as path from "path";
import { FREE_PROBLEMS_FOLDER } from "algolens-problem-free/const";
import { PREMIUM_PROBLEMS_FOLDER } from "algolens-problem-premium/const";
import { Plan } from "algo-lens-core/src/types";

interface ProblemFolderInfo {
  problemId: string;
  path: string;
  plan: Plan;
}

export class ProblemPaths {
  initialized = false;

  private paths = new Map<string, ProblemFolderInfo>();

  async getProblemFolderInfo(problemId: string) {
    await this.init();
    return this.paths.get(problemId);
  }

  private async loadProblemsFromDirectory(
    dir: string,
    plan: Plan
  ): Promise<ProblemFolderInfo[]> {
    const problemFolders = await fs.readdir(dir, { withFileTypes: true });
    return problemFolders
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        problemId: dirent.name,
        path: path.join(dir, dirent.name),
        plan,
      }));
  }

  async getList() {
    await this.init();
    return Array.from(this.paths.values());
  }

  async init() {
    if (this.initialized) {
      return;
    }
    {
      const dir = FREE_PROBLEMS_FOLDER;
      console.log("dir2", dir);
      const info = await this.loadProblemsFromDirectory(dir, "free");
      this.add(info);
    }
    {
      const dir = PREMIUM_PROBLEMS_FOLDER;
      console.log("dir", dir);
      const info = await this.loadProblemsFromDirectory(dir, "premium");
      this.add(info);
    }

    this.initialized = true;
  }

  add(arr: ProblemFolderInfo[]) {
    for (const info of arr) {
      this.paths.set(info.problemId, info);
    }
  }
}

export const problemPaths = new ProblemPaths();

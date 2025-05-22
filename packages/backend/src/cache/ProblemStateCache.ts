import { ProblemState, Problem } from "algo-lens-core";
import { cloneDeep } from "lodash";

export class ProblemStateCache {
  private cache = new Map<string, ProblemState>();

  // Store size per test case
  private size = new Map<string, number[]>();

  getKey(problemId: string, testcaseIndex: number, step: number): string {
    return `${problemId}-${testcaseIndex}-${step}`;
  }

  get(
    problem: Problem<any, any>,
    testcaseIndex: number,
    step: number
  ): ProblemState | undefined {
    const key = this.getKey(problem.id!, testcaseIndex, step);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    // If not cached, cache all test cases for this problem
    this.cacheProblem(problem);
    return this.cache.get(key);
  }

  private cacheProblem(problem: Problem<any, any>) {
    const { testcases } = problem;
    if (!testcases || testcases.length === 0) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }

    const sizes: number[] = [];
    for (
      let testcaseIndex = 0;
      testcaseIndex < testcases.length;
      testcaseIndex++
    ) {
      const testcase = testcases[testcaseIndex];
      const input = cloneDeep(testcase.input);
      const states = problem.func(input);
      sizes.push(states.length);
      for (let i = 0; i < states.length; i++) {
        const state = states[i];
        const key = this.getKey(problem.id!, testcaseIndex, i + 1);
        this.cache.set(key, state);
      }
    }
    this.size.set(problem.id!, sizes);
  }

  getSize(
    problem: Problem<any, any>,
    testcaseIndex: number
  ): number | undefined {
    const sizes = this.size.get(problem.id!);
    if (!sizes) {
      this.cacheProblem(problem);
      const updatedSizes = this.size.get(problem.id!);
      return updatedSizes ? updatedSizes[testcaseIndex] : undefined;
    }
    return sizes[testcaseIndex];
  }
}

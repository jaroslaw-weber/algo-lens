import { ProblemState, Problem } from "algo-lens-core";


export class ProblemStateCache {
  private cache = new Map<string, ProblemState>();

  private size = new Map<string, number>();

  getKey(problem: Problem<any, any>, step: number): string {
    return problem.id + "-" + step;
  }

  get(problem: Problem<any, any>, step: number): ProblemState | undefined {
    const key = this.getKey(problem, step);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    this.cacheProblem(problem);
    return this.cache.get(key);
  }

  private cacheProblem(problem: Problem<any, any>) {
    const { testcases } = problem;
    if (!testcases) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    if (testcases.length === 0) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    const testcase = testcases.find((x) => x.isDefault);
    if (!testcase) {
      throw new Error("no default testcase found for problem: " + problem.id!);
    }
    // // 
    const states = problem.func(testcase.input);
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const key2 = this.getKey(problem, i + 1);
      this.cache.set(key2, state);
    }
    this.size.set(problem.id!, states.length);
  }

  getSize(problem: Problem<any, any>): number | undefined {
    const size = this.size.get(problem.id!);
    if (!size) {
      this.cacheProblem(problem);
    }
    return this.size.get(problem.id!);
  }
}

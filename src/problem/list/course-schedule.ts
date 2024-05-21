import { Problem, ProblemState, ThemeColor } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asValueGroup,
  asHashset,
  asBooleanGroup,
  asHashmap,
} from "../utils";

interface CourseScheduleInput {
  numCourses: number;
  prerequisites: number[][];
}

export function courseSchedule(p: CourseScheduleInput): ProblemState[] {
  const { numCourses, prerequisites } = p;
  const steps: ProblemState[] = [];
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const visited: number[] = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }

  for (let i = 0; i < prerequisites.length; i++) {
    graph[prerequisites[i][0]].push(prerequisites[i][1]);
  }

  function dfs(i: number): boolean {
    if (visited[i] === -1) {
      return false;
    }
    if (visited[i] === 1) {
      return true;
    }
    visited[i] = -1;
    for (const j of graph[i]) {
      if (!dfs(j)) {
        return false;
      }
    }
    visited[i] = 1;
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return steps;
    }
  }

  return steps;
}

const code = `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const visit: number[] = new Array(numCourses).fill(0);

  for (let i = 0; i < prerequisites.length; i++) {
    graph[prerequisites[i][0]].push(prerequisites[i][1]);
  }

  function dfs(i: number): boolean {
    if (visit[i] === -1) {
      return false;
    }
    if (visit[i] === 1) {
      return true;
    }
    visit[i] = -1;
    for (const j of graph[i]) {
      if (!dfs(j)) {
        return false;
      }
    }
    visit[i] = 1;
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return false;
    }
  }

  return true;
}`;

const title = "Course Schedule";
const getInput = () => ({
  numCourses: 4,
  prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
});

export const courseScheduleProblem: Problem<CourseScheduleInput, ProblemState> = {
  title,
  code,
  getInput,
  func: courseSchedule,
  id: "course-schedule",
};

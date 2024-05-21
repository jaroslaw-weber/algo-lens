import { Problem, ProblemState, ThemeColor, Variable } from "../types";
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

  // Helper function to create and log each step's computational state
  function log(
    point: number,
    p?: {
      course?: number;
      prerequisiteCourse?: number;
      visitedIndex?: number;
      graphIndex?: number;
    }
  ) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(as2dArray("graph", graph, []));
    v.push(asArray("visited", visited));
    v.push(...asSimpleValue({ numCourses }));
    v.push(as2dArray("prerequisites", prerequisites, []));
    if (p) {
      const { course, prerequisiteCourse } = p;
      if (course) {
        v.push(...asSimpleValue({ course }));
      }
      if (prerequisiteCourse) {
        v.push(...asSimpleValue({ prerequisiteCourse }));
      }
    }
    steps.push(step);
  }

  log(1);
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }
  log(2);

  for (let i = 0; i < prerequisites.length; i++) {
    const prerequisite = prerequisites[i];
    const course = prerequisite[0];
    const prerequisiteCourse = prerequisite[1];
    log(3, {
      course,
      prerequisiteCourse,
    });
    graph[course].push(prerequisiteCourse);
  }

  function dfs(i: number): boolean {
    if (visited[i] === -1) {
      log(4, { visitedIndex: i });
      return false;
    }
    if (visited[i] === 1) {
      log(5, { visitedIndex: i });
      return true;
    }
    visited[i] = -1;
    log(6, { visitedIndex: i });
    for (const j of graph[i]) {
      log(7, { graphIndex: j });
      if (!dfs(j)) {
        log(8, { graphIndex: j });
        return false;
      }
    }
    log(9, { visitedIndex: i });
    visited[i] = 1;
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      log(10);
      return steps;
    }
  }

  log(11);
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
  prerequisites: [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ],
});

export const courseScheduleProblem: Problem<CourseScheduleInput, ProblemState> =
  {
    title,
    code,
    getInput,
    func: courseSchedule,
    id: "course-schedule",
  };

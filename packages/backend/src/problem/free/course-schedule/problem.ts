import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps";
import { CourseScheduleInput } from "./types";
import { groups } from "./groups";
import { variables } from "./variables";
import { testcases } from "./testcase";

const title = "Course Schedule";

// Define the problem structure
export const problem: Problem<CourseScheduleInput, ProblemState> = {
  title: title,
  emoji: "📚",
  difficulty: "medium",
  func: (i) => generateSteps(...i),
  testcases,
  id: "207",
  tags: ["graph", "topological sort", "dfs", "bfs"],
  metadata: {
    variables,
    groups,
  },
};

import { defineProblem } from "@problem/types/problem";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { SearchRotatedInput } from "./types";

export const problem = defineProblem<SearchRotatedInput>({
  id: "search-in-rotated-sorted-array", // From original file
  title: "Search in Rotated Sorted Array", // From original file
  emoji: "🔍", // From original file
  tags: ["Binary Search", "Array"], // Updated tags, aligned with common classifications
  difficulty: "Medium", // Common difficulty rating
  generateSteps: generateSteps,
  metadata: {
    variables: variables,
    groups: groups,
  },
  testcases: testcases,
});

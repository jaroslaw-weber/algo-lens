import { Problem } from "algo-lens-core/types/core";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { GroupAnagramsInput, GroupAnagramsOutput } from "./types";

export const problem: Problem<GroupAnagramsInput, GroupAnagramsOutput> = {
  id: "group-anagrams",
  title: "Group Anagrams",
  emoji: "🔤",
  difficulty: "medium",
  tags: ["Array", "Hash Map", "String", "Sorting"],
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "groupAnagrams(strs: string[]): string[][]",
  },
};

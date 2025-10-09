import { Problem } from "@algolens/core/src/types";

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

import { TestCase } from "algo-lens-core/src/types";

import { GroupAnagramsInput, GroupAnagramsOutput } from "./types";

export const testcases: TestCase<GroupAnagramsInput, GroupAnagramsOutput>[] = [
  {
    name: "Example 1",
    description: "Basic example from problem description.",
    input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
    expected: [["bat"], ["ate", "eat", "tea"], ["nat", "tan"]],
  },
  {
    name: "Example 2",
    description: "Input with an empty string.",
    input: { strs: [""] },
    expected: [[""]],
  },
  {
    name: "Example 3",
    description: "Input with a single character string.",
    input: { strs: ["a"] },
    expected: [["a"]],
  },
  {
    name: "No Anagrams",
    description: "No anagrams in the input array.",
    input: { strs: ["abc", "def", "ghi"] },
    expected: [["abc"], ["def"], ["ghi"]],
  },
  {
    name: "All Anagrams",
    description: "All strings are anagrams of each other.",
    input: { strs: ["listen", "silent", "enlist"] },
    expected: [["enlist", "listen", "silent"]],
  },
  {
    name: "Mixed Case and Empty Strings",
    description:
      "Mixed case and empty strings (assuming lowercase English letters only as per constraints, but testing robustness).",
    input: { strs: ["", "b", "", "a", "b"] },
    expected: [["", ""], ["a"], ["b", "b"]],
  },
  {
    name: "Long Strings",
    description: "Long strings with many characters.",
    input: {
      strs: [
        "abcdefghijklmnopqrstuvwxyz",
        "zyxwuvtsrqponmlkjihgfedcba",
        "abc",
        "bca",
        "acb",
      ],
    },
    expected: [
      ["abc", "acb", "bca"],
      ["abcdefghijklmnopqrstuvwxyz", "zyxwuvtsrqponmlkjihgfedcba"],
    ],
  },
];

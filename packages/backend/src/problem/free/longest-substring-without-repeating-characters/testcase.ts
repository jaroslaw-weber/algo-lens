import { TestCase } from "algo-lens-core";
import { LongestSubstringInput } from "./types";

export const testcases: TestCase<LongestSubstringInput, number>[] = [
  {
    name: "Example 1",
    description: "Standard example with repeating characters.",
    input: { s: "abcabcbb" },
    expected: 3,
    isDefault: true,
  },
  {
    name: "Example 2",
    description: "String with all repeating characters.",
    input: { s: "bbbbbbbbbb" },
    expected: 1,
  },
  {
    name: "Example 3",
    description: "String with repeating characters and unique substring.",
    input: { s: "pwwkewabc" },
    expected: 6,
  },
  {
    name: "Long String",
    description:
      "Test case with a long string containing many unique characters.",
    input: {
      s: "abcdefghij",
    },
    expected: 10,
  },
  {
    name: "Repeating at start",
    description: "Test case with repeating characters at the beginning.",
    input: { s: "dvdfabcdef" },
    expected: 6,
  },
];

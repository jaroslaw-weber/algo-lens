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
    input: { s: "bbbbb" },
    expected: 1,
  },
  {
    name: "Example 3",
    description: "String with repeating characters and unique substring.",
    input: { s: "pwwkew" },
    expected: 3,
  },
  {
    name: "Empty String",
    description: "Test case with an empty string.",
    input: { s: "" },
    expected: 0,
  },
  {
    name: "Single Character",
    description: "Test case with a single character string.",
    input: { s: "a" },
    expected: 1,
  },
  {
    name: "Long String",
    description:
      "Test case with a long string containing many unique characters.",
    input: {
      s: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
    },
    expected: 72,
  },
  {
    name: "Repeating at start",
    description: "Test case with repeating characters at the beginning.",
    input: { s: "dvdf" },
    expected: 3,
  },
];

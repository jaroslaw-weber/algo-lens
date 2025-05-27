import { TestCase } from "algo-lens-core";
import { LongestSubstringInput } from "./types";

export const testcases: TestCase<LongestSubstringInput, number>[] = [
  {
    name: "Example 1",
    input: { s: "abcabcbb" },
    expected: 3,
    isDefault: true,
  },
  {
    name: "Example 2",
    input: { s: "bbbbb" },
    expected: 1,
  },
  {
    name: "Example 3",
    input: { s: "pwwkew" },
    expected: 3,
  },
  {
    name: "Empty String",
    input: { s: "" },
    expected: 0,
  },
  {
    name: "Single Character",
    input: { s: "a" },
    expected: 1,
  },
  {
    name: "Long String",
    input: {
      s: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
    },
    expected: 72,
  },
  {
    name: "Repeating at start",
    input: { s: "dvdf" },
    expected: 3,
  },
];

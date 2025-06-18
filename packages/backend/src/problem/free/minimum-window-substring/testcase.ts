import { TestCase } from "algo-lens-core/src/types";

import { MinimumWindowSubstringInput } from "./types";

export const testcases: TestCase<MinimumWindowSubstringInput, string>[] = [
  {
    name: "Example 1",
    description: "Basic case with a clear minimum window.",
    input: { s: "ADOBECODEBANC", t: "ABC" },
    expected: "BANC",
    isDefault: true,
  },
  {
    name: "Example 2",
    description: "String s is the minimum window.",
    input: { s: "a", t: "a" },
    expected: "a",
  },
  {
    name: "Example 3",
    description:
      "Character 'a' in t occurs twice, but in s it occurs only once.",
    input: { s: "a", t: "aa" },
    expected: "",
  },
  {
    name: "No Window",
    description: "No substring in s contains all characters of t.",
    input: { s: "AA", t: "ABC" },
    expected: "",
  },
  {
    name: "T with Duplicates",
    description:
      "T contains duplicate characters, requiring all to be matched.",
    input: { s: "ABCA", t: "AAB" },
    expected: "ABCA",
  },
  {
    name: "Longer S, Shorter T",
    description: "S is much longer than T.",
    input: { s: "ADOBECODEBANCWXYZ", t: "ABC" },
    expected: "BANC",
  },
  {
    name: "T not found",
    description: "T is not found in S",
    input: { s: "ADOBECODEBANC", t: "XYZ" },
    expected: "",
  },
];

import { TestCase } from "algo-lens-core/types/core";
import { ValidAnagramInput, ValidAnagramOutput } from "./types";

export const testcases: TestCase<ValidAnagramInput, ValidAnagramOutput>[] = [
  {
    name: "Basic Anagram",
    description: "Basic anagram case",
    input: { s: "anagram", t: "nagaram" },
    expected: true,
  },
  {
    name: "Basic Non-Anagram (Different Characters)",
    description: "Basic non-anagram case (different characters)",
    input: { s: "rat", t: "car" },
    expected: false,
  },
  {
    name: "Non-Anagram (Different Lengths)",
    description: "Non-anagram case (different lengths)",
    input: { s: "a", t: "ab" },
    expected: false,
  },
  {
    name: "Non-Anagram (Different Character Counts)",
    description: "Non-anagram case (same length, different character counts)",
    input: { s: "aacc", t: "ccac" },
    expected: false,
  },
  {
    name: "Empty Strings",
    description:
      "Empty strings (though constraints say length >= 1, good for robustness)",
    input: { s: "", t: "" },
    expected: true,
  },
  {
    name: "Single Character Anagram",
    description: "Single character anagram",
    input: { s: "a", t: "a" },
    expected: true,
  },
  {
    name: "Single Character Non-Anagram",
    description: "Single character non-anagram",
    input: { s: "a", t: "b" },
    expected: false,
  },
  {
    name: "Strings with Spaces",
    description:
      "Strings with spaces (assuming spaces are characters to be counted)",
    input: { s: "anag ram", t: "nag aram" },
    expected: true,
  },
  {
    name: "Case Sensitivity",
    description:
      "Case sensitivity (assuming lowercase English letters only as per constraints)",
    input: { s: "Anagram", t: "nagaram" },
    expected: false,
  },
  {
    name: "Long Strings",
    description: "Long strings with many characters",
    input: {
      s: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      t: "zyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcba",
    },
    expected: true,
  },
];

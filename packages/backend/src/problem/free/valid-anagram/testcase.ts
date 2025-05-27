import { TestCase } from "algo-lens-core/types/core";
import { ValidAnagramInput, ValidAnagramOutput } from "./types";

export const testcases: TestCase<ValidAnagramInput, ValidAnagramOutput>[] = [
  {
    description: "Basic anagram case",
    input: { s: "anagram", t: "nagaram" },
    expected: true,
  },
  {
    description: "Basic non-anagram case (different characters)",
    input: { s: "rat", t: "car" },
    expected: false,
  },
  {
    description: "Non-anagram case (different lengths)",
    input: { s: "a", t: "ab" },
    expected: false,
  },
  {
    description: "Non-anagram case (same length, different character counts)",
    input: { s: "aacc", t: "ccac" },
    expected: false,
  },
  {
    description:
      "Empty strings (though constraints say length >= 1, good for robustness)",
    input: { s: "", t: "" },
    expected: true,
  },
  {
    description: "Single character anagram",
    input: { s: "a", t: "a" },
    expected: true,
  },
  {
    description: "Single character non-anagram",
    input: { s: "a", t: "b" },
    expected: false,
  },
  {
    description:
      "Strings with spaces (assuming spaces are characters to be counted)",
    input: { s: "anag ram", t: "nag aram" },
    expected: true,
  },
  {
    description:
      "Case sensitivity (assuming lowercase English letters only as per constraints)",
    input: { s: "Anagram", t: "nagaram" },
    expected: false,
  },
  {
    description: "Long strings with many characters",
    input: {
      s: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      t: "zyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcba",
    },
    expected: true,
  },
];

import { ProblemState } from "algo-lens-core/types/core";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import { ValidAnagramInput } from "./types";

export function generateSteps(input: ValidAnagramInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { s, t } = input;

  l.simple({ s, t });
  l.comment = "Start: Check if strings s and t are anagrams.";
  l.breakpoint(1);

  // Early exit if lengths differ
  if (s.length !== t.length) {
    l.simple({ s, t });
    l.comment = "Lengths differ, so they cannot be anagrams.";
    l.breakpoint(2);
    l.simple({ result: false });
    l.comment = "Result: false (lengths are different).";
    l.breakpoint(3);
    return l.getSteps();
  }

  // Build character counts for s
  const sCharCounts = new Map<string, number>();
  for (const char of s) {
    sCharCounts.set(char, (sCharCounts.get(char) || 0) + 1);
    l.simple({ s, t, char });
    l.hashmap("sCharCounts", sCharCounts, { key: char, color: "primary" });
    l.comment = `Count character '${char}' in s.`;
    l.breakpoint(4);
  }

  // Build character counts for t and compare
  const tCharCounts = new Map<string, number>();
  for (const char of t) {
    tCharCounts.set(char, (tCharCounts.get(char) || 0) + 1);
    l.simple({ s, t, char });
    l.hashmap("tCharCounts", tCharCounts, { key: char, color: "primary" });
    l.comment = `Count character '${char}' in t.`;
    l.breakpoint(5);
  }

  // Compare the two maps
  for (const [char, count] of sCharCounts.entries()) {
    l.simple({ s, t, char });
    l.hashmap("sCharCounts", sCharCounts, { key: char, color: "primary" });
    l.hashmap("tCharCounts", tCharCounts, { key: char, color: "primary" });
    l.comment = `Compare count of '${char}' in s and t.`;
    l.breakpoint(6);

    if (tCharCounts.get(char) !== count) {
      l.simple({ s, t, char });
      l.hashmap("sCharCounts", sCharCounts, { key: char, color: "error" });
      l.hashmap("tCharCounts", tCharCounts, { key: char, color: "error" });
      l.comment = `Counts for '${char}' do not match. Not an anagram.`;
      l.breakpoint(7);
      l.simple({ result: false });
      l.comment = "Result: false (character counts mismatch).";
      l.breakpoint(8);
      return l.getSteps();
    }
  }

  l.simple({ s, t });
  l.comment = "All character counts match. They are anagrams.";
  l.breakpoint(9);
  l.simple({ result: true });
  l.comment = "Result: true (all character counts match).";
  l.breakpoint(10);

  return l.getSteps();
}

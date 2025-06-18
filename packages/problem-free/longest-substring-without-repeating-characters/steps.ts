import { ProblemState } from "algo-lens-core/src/types";

import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";

import { LongestSubstringInput } from "./types";

export function generateSteps({ s }: LongestSubstringInput): ProblemState[] {
  const l = new StepLoggerV2();
  let left = 0;
  let right = 0;
  let maxLength = 0;
  const charSet = new Set<string>();

  // 1. Initialization
  l.comment = "Initialize variables: left=0, right=0, maxLength=0, charSet={}";
  l.string({ s: s }, [
    { value: left, color: "error", label: "left", dir: "top" },
    { value: right, color: "primary", label: "right", dir: "bottom" },
  ]);
  l.hashset("Current Window Characters", charSet, {
    color: "neutral",
    value: "",
  });
  l.simple({ maxLength: maxLength });
  l.breakpoint(1);

  while (right < s.length) {
    const currentChar = s[right];

    if (!charSet.has(currentChar)) {
      // Character not in set, expand window
      charSet.add(currentChar);
      maxLength = Math.max(maxLength, right - left + 1);

      l.comment = `Character '${currentChar}' is not in charSet. Add it and expand window.`;
      l.string({ s: s }, [
        { value: left, color: "error", label: "left", dir: "top" },
        { value: right, color: "success", label: "right", dir: "bottom" },
        { value: right, color: "info", label: "currentChar", dir: "bottom" },
      ]);
      l.hashset("Current Window Characters", charSet, {
        color: "success",
        value: currentChar,
      });
      l.simple({ maxLength: maxLength });
      l.breakpoint(2);
      right++;
    } else {
      // Character already in set, contract window
      const charToRemove = s[left];
      charSet.delete(charToRemove);
      left++;

      l.comment = `Character '${currentChar}' is already in charSet. Remove '${charToRemove}' and contract window.`;

      l.hashset("Current Window Characters", charSet, {
        color: "error",
        label: "new unique character",
        value: currentChar,
      });
      l.breakpoint(3); // Highlight the set when duplicate is found

      l.string({ s: s }, [
        { value: left, color: "error", label: "left", dir: "top" },
        { value: right, color: "success", label: "right", dir: "bottom" },
        { value: right, color: "info", label: "currentChar", dir: "bottom" },
      ]);
      l.hashset("Current Window Characters", charSet, {
        color: "error",
        label: "found duplicate",

        value: charToRemove,
      });
      l.simple({ maxLength: maxLength });
      l.breakpoint(4); // Highlight the character being removed
    }
  }

  // Final state
  l.comment = `Algorithm finished. Final maxLength is ${maxLength}.`;
  l.string({ s: s }, [
    { value: left, color: "error", label: "left", dir: "top" },
    { value: right, color: "success", label: "right", dir: "bottom" },
  ]);
  l.hashset("Current Window Characters", charSet, {
    color: "neutral",
    value: "",
  });
  const result = maxLength;
  l.simple({ maxLength: maxLength });
  l.simple({ result });
  l.breakpoint(5); // Final breakpoint

  return l.getSteps();
}

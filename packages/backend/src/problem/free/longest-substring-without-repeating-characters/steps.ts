import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";

import { LongestSubstringInput } from "./types";

export function generateSteps({ s }: LongestSubstringInput): ProblemState[] {
  const l = new StepLoggerV2();
  let i = 0;
  let j = 0;
  let maxLength = 0;
  const charSet = new Set<string>();

  // 1. Initialization
  l.comment = "Initialize variables: i=0, j=0, maxLength=0, charSet={}";
  l.arrayV3({ s: s.split("") }, [
    { value: i, color: "error", label: "i", dir: "top" },
    { value: j, color: "primary", label: "j", dir: "bottom" },
  ]);
  l.hashset("Current Window Characters", charSet, {
    color: "neutral",
    value: "",
  });
  l.simple({ maxLength: maxLength });
  l.breakpoint(1);

  while (j < s.length) {
    const currentChar = s[j];

    if (!charSet.has(currentChar)) {
      // Character not in set, expand window
      charSet.add(currentChar);
      maxLength = Math.max(maxLength, j - i + 1);

      l.comment = `Character '${currentChar}' is not in charSet. Add it and expand window.`;
      l.arrayV3({ s: s.split("") }, [
        { value: i, color: "error", label: "i", dir: "top" },
        { value: j, color: "primary", label: "j", dir: "bottom" },
      ]);
      l.intervalsV2({
        label: "Window",
        arr: [{ interval: [i, j], label: "window" }],
        highlight: [],
        min: 0,
        max: s.length - 1,
      });
      l.hashset("Current Window Characters", charSet, {
        color: "success",
        value: currentChar,
      });
      l.simple({ maxLength: maxLength });
      l.breakpoint(2);
      j++;
    } else {
      // Character already in set, contract window
      const charToRemove = s[i];
      charSet.delete(charToRemove);
      i++;

      l.comment = `Character '${currentChar}' is already in charSet. Remove '${charToRemove}' and contract window.`;

      l.arrayV3({ s: s.split("") }, [
        { value: i, color: "error", label: "i", dir: "top" },
        { value: j, color: "primary", label: "j", dir: "bottom" },
      ]);
      l.intervalsV2({
        label: "Window",
        arr: [{ interval: [i, j], label: "window" }],
        highlight: [],
        min: 0,
        max: s.length - 1,
      });
      l.hashset("Current Window Characters", charSet, {
        color: "error",
        value: charToRemove,
      });
      l.simple({ maxLength: maxLength });
      l.breakpoint(3);
    }
  }

  // Final state
  l.comment = `Algorithm finished. Final maxLength is ${maxLength}.`;
  l.arrayV3({ s: s.split("") }, [
    { value: i, color: "error", label: "i", dir: "top" },
    { value: j, color: "primary", label: "j", dir: "bottom" },
  ]);
  l.hashset("Current Window Characters", charSet, {
    color: "neutral",
    value: "",
  });
  const result = maxLength;
  l.simple({ maxLength: maxLength });
  l.simple({ result });
  l.breakpoint(4);

  //

  return l.getSteps();
}

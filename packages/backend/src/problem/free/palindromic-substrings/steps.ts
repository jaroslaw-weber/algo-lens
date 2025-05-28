import { ProblemState, Pointer } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import _ = require("lodash");

export function generateSteps(s: string): ProblemState[] {
  const l = new StepLoggerV2();
  let count = 0;
  const n = s.length;

  l.groupOptions.set("palindromeCount", {});
  l.groupOptions.set("currentSubstring", {});

  l.arrayV3({ s: s.split("") }, []);
  l.group("palindromeCount", { count });
  l.comment = "Initial state: The input string and palindrome count.";
  l.breakpoint(1);

  for (let i = 0; i < n; i++) {
    // Odd length palindromes (center is s[i])
    l.arrayV3({ s: s.split("") }, [
      { value: i, color: "primary", label: "center" } as Pointer,
    ]);
    l.group("palindromeCount", { count });
    l.comment = `Expanding for odd length palindromes around center at index ${i}.`;
    l.breakpoint(2);
    count += expandAroundCenter(s, i, i, l, count);

    // Even length palindromes (center is s[i] and s[i+1])
    if (i + 1 < n) {
      l.arrayV3({ s: s.split("") }, [
        { value: i, color: "primary", label: "center1" } as Pointer,
        { value: i + 1, color: "primary", label: "center2" } as Pointer,
      ]);
      l.group("palindromeCount", { count });
      l.comment = `Expanding for even length palindromes around centers at indices ${i} and ${i + 1}.`;
      l.breakpoint(3);
      count += expandAroundCenter(s, i, i + 1, l, count);
    }
  }

  l.arrayV3({ s: s.split("") }, []);
  l.group("palindromeCount", { count });
  l.comment =
    "All possible centers processed. Total palindromic substrings found.";
  l.breakpoint(4);

  // Log the final count as "result" for testing purposes
  l.simple({ result: count });
  l.comment = "Final result: The total number of palindromic substrings.";
  l.breakpoint(6); // Use a new breakpoint for the final result

  return l.getSteps();
}

function expandAroundCenter(
  s: string,
  left: number,
  right: number,
  l: StepLoggerV2,
  initialCount: number
): number {
  let currentCount = 0;
  let tempLeft = left;
  let tempRight = right;

  while (
    tempLeft >= 0 &&
    tempRight < s.length &&
    s[tempLeft] === s[tempRight]
  ) {
    const substring = s.substring(tempLeft, tempRight + 1);
    l.arrayV3({ s: s.split("") }, [
      { value: tempLeft, color: "neutral", label: "left" } as Pointer,
      { value: tempRight, color: "neutral", label: "right" } as Pointer,
    ]);
    l.group("currentSubstring", { substring });
    l.group("palindromeCount", { count: initialCount + currentCount + 1 });
    l.comment = `Checking substring "${substring}". It is a palindrome.`;
    l.breakpoint(5);

    currentCount++;
    tempLeft--;
    tempRight++;
  }
  return currentCount;
}

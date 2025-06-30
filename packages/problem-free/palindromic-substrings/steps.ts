import { ProblemState, Pointer } from "algo-lens-core/src/types";

import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import _ = require("lodash");

export function generateSteps(s: string): ProblemState[] {
  const l = new StepLoggerV2();
  let count = 0;
  const n = s.length;

  l.groupOptions.set("count", {
    max: n * 3,
    min: 0,
  });
  l.simple({ substring: "" });

  l.string({ s: s }, []);
  l.group("count", { count });
  l.comment = "Initial state: The input string and palindrome count.";
  l.breakpoint(1);

  for (let i = 0; i < n; i++) {
    // Odd length palindromes (center is s[i])
    l.string({ s: s }, [
      { value: i, color: "primary", label: "center", dir: "top" } as Pointer,
    ]);
    l.group("count", { count });
    l.comment = `Expanding for odd length palindromes around center at index ${i}.`;
    l.breakpoint(2);

    expandAroundCenter(s, i, i);

    // Even length palindromes (center is s[i] and s[i+1])
    if (i + 1 < n) {
      l.string({ s: s }, [
        { value: i, color: "primary", label: "center1", dir: "top" } as Pointer,
        {
          value: i + 1,
          color: "primary",
          label: "center2",
          dir: "bottom",
        } as Pointer,
      ]);
      l.group("count", { count });
      l.comment = `Expanding for even length palindromes around centers at indices ${i} and ${i + 1}.`;
      l.breakpoint(3);
      expandAroundCenter(s, i, i + 1);
    }
  }

  function expandAroundCenter(s: string, left: number, right: number): void {
    let left2 = left;
    let right2 = right;

    while (left2 >= 0 && right2 < s.length && s[left2] === s[right2]) {
      // HIDE_START
      const substring = s.substring(left2, right2 + 1);
      //
      // HIDE_END
      l.string({ s: s }, [
        {
          value: left2,
          color: "neutral",
          label: "left",
          dir: "top",
        } as Pointer,
        {
          value: right2,
          color: "neutral",
          label: "right",
          dir: "bottom",
        } as Pointer,
      ]);
      l.simple({ substring, isPalindrome: true });

      l.group("count", { count }); // Directly use count from outer scope
      l.comment = `Checking substring "${substring}". It is a palindrome.`;
      l.breakpoint(4);

      count++; // Directly modify count from outer scope
      left2--;
      right2++;
    }
  }

  l.string({ s: s }, []);
  l.group("count", { count });
  l.comment =
    "All possible centers processed. Total palindromic substrings found.";
  l.breakpoint(5);

  // Log the final count as "result" for testing purposes
  l.simple({ result: count });
  l.comment = "Final result: The total number of palindromic substrings.";
  l.breakpoint(6); // Use a new breakpoint for the final result

  return l.getSteps();
}

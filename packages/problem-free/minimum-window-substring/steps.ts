import { ProblemState } from "algo-lens-core/src/types";

import { MinimumWindowSubstringInput } from "./types";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";

export function generateSteps(p: MinimumWindowSubstringInput): ProblemState[] {
  // HIDE_START
  const { s, t } = p;
  // HIDE_END
  const l = new StepLoggerV2();

  // Initialize character counts for t
  const tCharCount: Map<string, number> = new Map();
  for (const char of t) {
    tCharCount.set(char, (tCharCount.get(char) || 0) + 1);
  }

  // Initialize sliding window variables
  let windowStart = 0;
  let minLen = Infinity;
  let minWindow = "";
  let matchedChars = 0; // Number of characters in t matched in the current window

  const windowCharCount: Map<string, number> = new Map();

  l.string({ s }, []);
  l.string({ t }, []);
  l.hashmapV2({
    map: tCharCount,
    label: "T Character Count",
    highlights: [],
  });
  l.simple({ minLen, minWindow, matchedChars });
  l.hashmapV2({
    map: windowCharCount,
    label: "Window Character Count",
    highlights: [],
  });
  l.comment = "Initialize character counts for t and sliding window variables.";
  l.breakpoint(1);

  // Expand the window
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const char = s[windowEnd];

    l.string({ s }, [{ value: windowEnd, label: "windowEnd" }]);
    l.comment = `Expand window to include character '${char}' at index ${windowEnd}.`;
    l.breakpoint(2); // Unique breakpoint for each expansion

    if (tCharCount.has(char)) {
      windowCharCount.set(char, (windowCharCount.get(char) || 0) + 1);
      l.hashmapV2({
        map: windowCharCount,
        label: "Window Character Count",
        highlights: [{ key: char, color: "primary" }],
      });
      l.comment = `Character '${char}' is in t. Increment its count in windowCharCount.`;
      l.breakpoint(3);

      if (windowCharCount.get(char)! === tCharCount.get(char)!) {
        matchedChars++;
        l.simple({ matchedChars });
        l.comment = `Matched a required character. matchedChars: ${matchedChars}.`;
        l.breakpoint(4);
      }
    }

    // Shrink the window
    while (matchedChars === tCharCount.size) {
      const currentWindowLength = windowEnd - windowStart + 1;
      l.simple({ currentWindowLength });
      l.comment = `Current window is valid. Length: ${currentWindowLength}.`;
      l.breakpoint(5);

      if (currentWindowLength < minLen) {
        minLen = currentWindowLength;
        minWindow = s.substring(windowStart, windowEnd + 1);
        l.simple({ minLen, minWindow });
        l.comment = `Found a new minimum window: "${minWindow}" with length ${minLen}.`;
        l.breakpoint(6);
      }

      const leftChar = s[windowStart];
      l.string({ s }, [
        { value: windowStart, label: "windowStart" },
        { value: windowEnd, label: "windowEnd" },
      ]);
      l.comment = `Shrink window from left. Character at windowStart (${windowStart}): '${leftChar}'.`;
      l.breakpoint(7);

      if (tCharCount.has(leftChar)) {
        if (windowCharCount.get(leftChar)! === tCharCount.get(leftChar)!) {
          matchedChars--;
          l.simple({ matchedChars });
          l.comment = `Removing '${leftChar}' will break a match. Decrement matchedChars.`;
          l.breakpoint(8);
        }
        windowCharCount.set(leftChar, windowCharCount.get(leftChar)! - 1);
        l.hashmapV2({
          map: windowCharCount,
          label: "Window Character Count",
          highlights: [{ key: leftChar, color: "warning" }],
        });
        l.comment = `Decrement count of '${leftChar}' in windowCharCount.`;
        l.breakpoint(9);
      }
      windowStart++;
      l.simple({ windowStart });
      l.comment = `Move windowStart to ${windowStart}.`;
      l.breakpoint(10);
    }
  }

  l.simple({ result: minWindow });
  l.comment = `Final minimum window substring: "${minWindow}".`;
  l.breakpoint(11); // Final breakpoint

  return l.getSteps();
}

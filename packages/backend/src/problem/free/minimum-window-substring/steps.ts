import { ProblemState } from "../../../algo-lens-core/types/core";
import { StepLoggerV2 } from "../core/StepLoggerV2";
import { MinimumWindowSubstringTypes } from "./types";

export function generateSteps(s: string, t: string): ProblemState[] {
  const l = new StepLoggerV2<MinimumWindowSubstringTypes>();

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

  l.simple({ s, t });
  l.hashmapV2({
    name: "tCharCount",
    map: tCharCount,
    label: "T Character Count",
    emoji: "🎯",
    group: "input",
  });
  l.simple({ windowStart, minLen, minWindow, matchedChars });
  l.hashmapV2({
    name: "windowCharCount",
    map: windowCharCount,
    label: "Window Character Count",
    emoji: "📈",
    group: "window_state",
  });
  l.comment = "Initialize character counts for t and sliding window variables.";
  l.breakpoint(1);

  // Expand the window
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const char = s[windowEnd];

    l.simple({ windowEnd });
    l.comment = `Expand window to include character '${char}' at index ${windowEnd}.`;
    l.breakpoint(2 + windowEnd * 10); // Unique breakpoint for each expansion

    if (tCharCount.has(char)) {
      windowCharCount.set(char, (windowCharCount.get(char) || 0) + 1);
      l.hashmapV2({
        name: "windowCharCount",
        map: windowCharCount,
        label: "Window Character Count",
        emoji: "📈",
        group: "window_state",
        highlight: { key: char, color: "primary" },
      });
      l.comment = `Character '${char}' is in t. Increment its count in windowCharCount.`;
      l.breakpoint(3 + windowEnd * 10);

      if (windowCharCount.get(char)! <= tCharCount.get(char)!) {
        matchedChars++;
        l.simple({ matchedChars });
        l.comment = `Matched a required character. matchedChars: ${matchedChars}.`;
        l.breakpoint(4 + windowEnd * 10);
      }
    }

    // Shrink the window
    while (matchedChars === t.length) {
      const currentWindowLength = windowEnd - windowStart + 1;
      l.simple({ currentWindowLength });
      l.comment = `Current window is valid. Length: ${currentWindowLength}.`;
      l.breakpoint(5 + windowEnd * 10);

      if (currentWindowLength < minLen) {
        minLen = currentWindowLength;
        minWindow = s.substring(windowStart, windowEnd + 1);
        l.simple({ minLen, minWindow });
        l.comment = `Found a new minimum window: "${minWindow}" with length ${minLen}.`;
        l.breakpoint(6 + windowEnd * 10);
      }

      const leftChar = s[windowStart];
      l.simple({ windowStart });
      l.comment = `Shrink window from left. Character at windowStart (${windowStart}): '${leftChar}'.`;
      l.breakpoint(7 + windowEnd * 10);

      if (tCharCount.has(leftChar)) {
        if (windowCharCount.get(leftChar)! === tCharCount.get(leftChar)!) {
          matchedChars--;
          l.simple({ matchedChars });
          l.comment = `Removing '${leftChar}' will break a match. Decrement matchedChars.`;
          l.breakpoint(8 + windowEnd * 10);
        }
        windowCharCount.set(leftChar, windowCharCount.get(leftChar)! - 1);
        l.hashmapV2({
          name: "windowCharCount",
          map: windowCharCount,
          label: "Window Character Count",
          emoji: "📈",
          group: "window_state",
          highlight: { key: leftChar, color: "warning" },
        });
        l.comment = `Decrement count of '${leftChar}' in windowCharCount.`;
        l.breakpoint(9 + windowEnd * 10);
      }
      windowStart++;
      l.simple({ windowStart });
      l.comment = `Move windowStart to ${windowStart}.`;
      l.breakpoint(10 + windowEnd * 10);
    }
  }

  l.simple({ result: minWindow });
  l.comment = `Final minimum window substring: "${minWindow}".`;
  l.breakpoint(999); // Final breakpoint

  return l.getSteps();
}

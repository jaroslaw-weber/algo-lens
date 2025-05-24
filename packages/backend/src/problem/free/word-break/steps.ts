import { ProblemState, Pointer } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { WordBreakInput } from "./types"; // Assuming types.ts defines these

/**
 * Generates steps for visualizing the Word Break algorithm.
 * @param p - The input containing the string 's' and the word dictionary 'wordDict'.
 * @returns An array of problem states representing the algorithm's execution steps.
 */
export function generateSteps(p: WordBreakInput): ProblemState[] {
  const { s, wordDict } = p;
  const l = new StepLoggerV2();

  // Log initial state
  l.simple({ s: s });
  l.simple({ suffix: undefined });
  //l.arrayV3({ wordDict });
  l.groupOptions.set("loop", { min: 0, max: s.length });
  //

  // Create a Set from the dictionary for efficient word lookup
  const wordSet = new Set(wordDict);
  l.hashset("wordSet", wordSet, undefined!); // Log the set
  l.comment =
    "Convert the word dictionary into a Set for faster lookups. Checking if a word exists in a Set is very quick (average O(1) time).";
  l.breakpoint(1);

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  l.arrayV3({ dp }, []);
  l.comment =
    "Initialize a boolean array 'dp' to keep track of whether a prefix of the string 's' can be segmented into words. 'dp[i]' will be true if the first 'i' characters of 's' can be segmented. We set dp[0] to true because an empty string (0 characters) can always be segmented.";
  l.breakpoint(2);

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    l.group("loop", { i, j: 0 }); // Log current outer loop index 'i'
    l.comment = `Outer loop: prefix length 'i' = ${i}.`;
    l.breakpoint(3);

    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      l.group("loop", { i, j }); // Log current outer loop index 'i'
      l.comment = `Inner loop: split point 'j' = ${j}.`;
      l.breakpoint(4);

      // Extract the suffix s[j...i-1]
      const suffix = s.substring(j, i);
      l.simple({ suffix }); // Log the extracted suffix

      const canSegmentPrefix = dp[j];
      const isWordInDict = wordSet.has(suffix);
      l.simple({ canSegmentPrefix }); // Log dp[j] value
      l.simple({ isWordInDict }); // Log if suffix is in wordSet
      l.comment = `Check if prefix dp[j] and suffix "${suffix}" are valid.`;
      l.breakpoint(5);

      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(suffix))
      if (canSegmentPrefix && isWordInDict) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        l.hashset("wordSet", wordSet, { value: suffix, color: "primary" });
        l.arrayV3({ dp }, [
          {
            value: i,
            label: "current prefix length",
            color: "primary",
            dir: "top",
            dimension: "column",
          } as Pointer,
          {
            value: j,
            label: "can segment?",
            color: "primary",
            dir: "bottom",
            dimension: "column",
          } as Pointer,
        ]); // Log the updated dp array
        l.comment = `Prefix and suffix valid. Set dp[i] to true.`;
        l.breakpoint(6);
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break; // #7 Break inner loop (optimization) - Breakpoint 7 is conceptually here, but adding
      } else {
        l.comment = `Conditions not met. Continue to next split point.`;
        l.breakpoint(8);
      }
      // l.hide("suffix")
    }

    //
    //l.simple({ suffix: undefined }); // Clear suffix for the next outer loop iteration
    l.arrayV3({ dp }, [
      {
        value: i,
        label: "current prefix length",
        color: "primary",
        dir: "top",
        dimension: "column",
      } as Pointer,
    ]); // Log dp state at the end of inner loop checks for i
    l.comment = `Finished split points for length ${i}. dp[i] is ${dp[i]}.`;
    l.breakpoint(9);
  }
  l.hide("loop");
  l.comment =
    "Finished checking all prefixes of the string 's'. The final result is determined by whether the entire string (prefix of length n) can be segmented.";
  l.breakpoint(10);

  // The final result is dp[n]
  const result = dp[n];
  l.simple({ result: result }); // Log the final result
  l.arrayV3({ dp }, [
    {
      value: n,
      label: "final result",
      color: "primary",
      dir: "top",
      dimension: "column",
    } as Pointer,
  ]); // Log the final dp array state
  l.comment = `Final result: dp[n] is ${result}.`;
  l.breakpoint(11);

  return l.getSteps();
}

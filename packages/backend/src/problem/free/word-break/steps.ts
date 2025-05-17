import { ProblemState } from "algo-lens-core";
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
  //l.arrayV2({ wordDict });
  l.groupOptions.set("loop", { min: 0, max: s.length });
  //

  // Create a Set from the dictionary for efficient word lookup
  const wordSet = new Set(wordDict);
  l.hashset("wordSet", wordSet, undefined!); // Log the set
  l.comment = "Convert the word dictionary into a Set for faster lookups. Checking if a word exists in a Set is very quick (average O(1) time).";
  l.breakpoint(1);

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  l.arrayV2({ dp });
  l.comment = "Initialize a boolean array 'dp' to keep track of whether a prefix of the string 's' can be segmented into words. 'dp[i]' will be true if the first 'i' characters of 's' can be segmented. We set dp[0] to true because an empty string (0 characters) can always be segmented.";
  l.breakpoint(2);

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    l.group("loop", { i, j: 0 }); // Log current outer loop index 'i'
    l.comment = `Start the outer loop. 'i' represents the length of the current prefix of the string 's' we are considering. We want to determine if the prefix of length ${i} can be segmented.`;
    l.breakpoint(3);

    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      l.group("loop", { i, j }); // Log current outer loop index 'i'
      l.comment = `Start the inner loop. 'j' represents a potential split point for the current prefix of length ${i}. We are checking if the prefix of length 'j' can be segmented AND if the remaining suffix is a valid word.`;
      l.breakpoint(4);

      // Extract the suffix s[j...i-1]
      const suffix = s.substring(j, i);
      l.simple({ suffix }); // Log the extracted suffix

      const canSegmentPrefix = dp[j];
      const isWordInDict = wordSet.has(suffix);
      l.simple({ canSegmentPrefix }); // Log dp[j] value
      l.simple({ isWordInDict }); // Log if suffix is in wordSet
      l.comment = `Extract the suffix "${suffix}". Check if the prefix ending at index 'j' can be segmented (this is stored in dp[j], which is ${canSegmentPrefix}) and if the suffix "${suffix}" is a valid word in the dictionary (${isWordInDict}).`;
      l.breakpoint(5);

      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(suffix))
      if (canSegmentPrefix && isWordInDict) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        l.hashset("wordSet", wordSet, { value: suffix, color: "accent" });
        l.arrayV2({ dp }, { i, "can segment?":j }); // Log the updated dp array
        l.comment = `Both conditions are true: the prefix ending at index 'j' can be segmented (${canSegmentPrefix}) AND the suffix "${suffix}" is a valid word (${isWordInDict}). This means the prefix of length ${i} can be segmented. Set dp[i] to true. We can stop checking other split points for this prefix length.`;
        l.breakpoint(6);
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break; // #7 Break inner loop (optimization) - Breakpoint 7 is conceptually here, but adding
      } else {
l.comment = `The conditions are not met: either the prefix ending at index 'j' cannot be segmented (${canSegmentPrefix}) or the suffix "${suffix}" is not a valid word (${isWordInDict}). Continue to the next possible split point 'j'.`;
        l.breakpoint(8);
      }
     // l.hide("suffix")
    }

    //
    //l.simple({ suffix: undefined }); // Clear suffix for the next outer loop iteration
    l.arrayV2({ dp }, { i }); // Log dp state at the end of inner loop checks for i
    l.comment = `Finished checking all possible split points for the prefix of length ${i}. dp[i] is now ${dp[i]}, indicating whether this prefix can be segmented.`;
    l.breakpoint(9);
  }
  l.hide("loop");
  l.comment = "Finished checking all prefixes of the string 's'. The final result is determined by whether the entire string (prefix of length n) can be segmented.";
  l.breakpoint(10);

  // The final result is dp[n]
  const result = dp[n];
  l.simple({ result: result }); // Log the final result
  l.arrayV2({ dp }, { n }); // Log the final dp array state
  l.comment = `The final result is dp[n], which is ${result}. This tells us if the entire string 's' can be segmented into words from the dictionary.`;
  l.breakpoint(11);

  return l.getSteps();
}

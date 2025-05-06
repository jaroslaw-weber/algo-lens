import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { WordBreakInput, WordBreakProblemState } from "./types"; // Assuming types.ts defines these

/**
 * Generates steps for visualizing the Word Break algorithm.
 * @param p - The input containing the string 's' and the word dictionary 'wordDict'.
 * @returns An array of problem states representing the algorithm's execution steps.
 */
export function generateSteps(p: WordBreakInput): WordBreakProblemState[] {
  const { s, wordDict } = p;
  const logger = new StepLoggerV2();
  let currentBreakpoint = 0; // Keep track of breakpoint IDs

  // Log initial state
  logger.simple({ s: s });
  logger.arrayV2("wordDict", wordDict);
  logger.breakpoint(currentBreakpoint++); // Breakpoint 0: Initial state

  // Create a Set from the dictionary for efficient word lookup
  const wordSet = new Set(wordDict);
  logger.hashset("wordSet", wordSet, {}); // Log the set

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  logger.arrayV2("dp", dp);
  logger.breakpoint(currentBreakpoint++); // Breakpoint 1: DP initialized

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    logger.simple({ i: i }); // Log current outer loop index 'i'
    logger.breakpoint(currentBreakpoint++); // Breakpoint: Start of outer loop iteration i

    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      logger.simple({ j: j }); // Log current inner loop index 'j'

      // Extract the suffix s[j...i-1]
      const suffix = s.substring(j, i);
      logger.simple({ suffix: suffix }); // Log the extracted suffix

      const canSegmentPrefix = dp[j];
      const isWordInDict = wordSet.has(suffix);
      logger.simple({ "dp[j]": canSegmentPrefix }); // Log dp[j] value
      logger.simple({ "wordSet.has(suffix)": isWordInDict }); // Log if suffix is in wordSet

      logger.breakpoint(currentBreakpoint++); // Breakpoint: Before check inside inner loop

      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(suffix))
      if (canSegmentPrefix && isWordInDict) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        logger.simple({ "dp[i] updated": true }); // Log that dp[i] is updated
         logger.arrayV2("dp", dp); // Log the updated dp array
        logger.breakpoint(currentBreakpoint++); // Breakpoint: Found valid segmentation, dp[i] updated
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break;
      } else {
          logger.simple({ "dp[i] updated": false }); // Log that dp[i] was not updated
          logger.breakpoint(currentBreakpoint++); // Breakpoint: Segmentation using split point j didn't work
      }
    }
     // Reset j after inner loop finishes or breaks
     logger.simple({ j: undefined });
     logger.simple({ suffix: undefined });
     logger.arrayV2("dp", dp); // Log dp state at the end of outer loop iteration i
     logger.breakpoint(currentBreakpoint++); // Breakpoint: End of outer loop iteration i
  }

  // Reset i after outer loop finishes
  logger.simple({ i: undefined });

  // The final result is dp[n]
  const result = dp[n];
  logger.simple({ result: result }); // Log the final result
  logger.arrayV2("dp", dp); // Log the final dp array state
  logger.breakpoint(currentBreakpoint++); // Breakpoint: Final result

  return logger.getSteps();
}

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

  // Log initial state
  logger.simple({ s: s });
  logger.arrayV2({ wordDict });
  // logger.breakpoint(0); // No marker for initial state

  // Create a Set from the dictionary for efficient word lookup
  const wordSet = new Set(wordDict);
  logger.hashset("wordSet", wordSet, undefined!); // Log the set
  logger.comment = "Initialized wordSet from wordDict.";
  logger.breakpoint(1); // #1 Initialize word set

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  logger.arrayV2({ dp });
  logger.comment =
    "Initialized DP array. dp[0] = true (base case for empty string).";
  logger.breakpoint(2); // #2 Initialize DP array and base case

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    logger.simple({ i: i }); // Log current outer loop index 'i'
    logger.comment = `Outer loop: Checking for segmentation up to index i = ${i}.`;
    logger.breakpoint(3); // #3 Start outer loop

    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      logger.simple({ j: j }); // Log current inner loop index 'j'
      logger.comment = `Inner loop: Trying split point j = ${j} for prefix s[0...${
        i - 1
      }].`;
      logger.breakpoint(4); // #4 Start inner loop

      // Extract the suffix s[j...i-1]
      const suffix = s.substring(j, i);
      logger.simple({ suffix: suffix }); // Log the extracted suffix

      const canSegmentPrefix = dp[j];
      const isWordInDict = wordSet.has(suffix);
      logger.simple({ "dp[j]": canSegmentPrefix }); // Log dp[j] value
      logger.simple({ "wordSet.has(suffix)": isWordInDict }); // Log if suffix is in wordSet
      logger.comment = `Extracted suffix = "${suffix}". Checked dp[${j}] (${canSegmentPrefix}) and if suffix is in wordSet (${isWordInDict}).`;
      logger.breakpoint(5); // #5 Extract suffix and check conditions

      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(suffix))
      if (canSegmentPrefix && isWordInDict) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        logger.simple({ "dp[i] updated": true }); // Log that dp[i] is updated
        logger.arrayV2({ dp }, { i }); // Log the updated dp array
        logger.comment = `Found valid segmentation for s[0...${
          i - 1
        }] using split point j = ${j}. dp[${i}] = true. Breaking inner loop.`;
        logger.breakpoint(6); // #6 Found valid segmentation, dp[i] updated
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break; // #7 Break inner loop (optimization) - Breakpoint 7 is conceptually here, but adding logger.breakpoint(7) after break is unreachable.
      } else {
        logger.simple({ "dp[i] updated": false }); // Log that dp[i] was not updated
        logger.comment = `Segmentation using current split point j = ${j} did not work (dp[${j}] is ${canSegmentPrefix} or suffix "${suffix}" not in wordSet). Current i = ${i}.`;
        logger.breakpoint(8); // #8 Segmentation using split point j didn't work
      }
    }
    // logger.breakpoint(7) could be placed here if we want a breakpoint specifically after a break, but #9 seems more logical for the end of the inner loop.
    logger.simple({ suffix: undefined }); // Clear suffix for the next outer loop iteration
    logger.arrayV2({ dp }, { i }); // Log dp state at the end of inner loop checks for i
    logger.comment = `Finished checking all split points j for prefix s[0...${
      i - 1
    }]. Current dp[${i}] = ${dp[i]}.`;
    logger.breakpoint(9); // #9 Finished checking all split points for prefix s[0...i-1]
  }
  logger.comment = "Finished outer loop.";
  logger.breakpoint(10); // #10 Finished outer loop

  // The final result is dp[n]
  const result = dp[n];
  logger.simple({ result: result }); // Log the final result
  logger.arrayV2({ dp }, { n }); // Log the final dp array state
  logger.comment = `Final result: dp[${n}] is ${result}.`;
  logger.breakpoint(11); // #11 Return final result dp[n]

  return logger.getSteps();
}

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
  logger.comment = "Convert the word dictionary 'wordDict' into a Set called 'wordSet'. Using a Set allows for efficient O(1) average time complexity lookups to check if a substring is a valid word in the dictionary.";
  logger.breakpoint(1); // #1 Initialize word set

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  logger.arrayV2({ dp });
  logger.comment = "Initialize a boolean DP array 'dp' of size n + 1, where n is the length of the input string 's'. dp[i] will store whether the first i characters of 's' (s[0...i-1]) can be segmented into words from the dictionary. Set dp[0] to true as the base case, representing that an empty string can always be segmented.";
  logger.breakpoint(2); // #2 Initialize DP array and base case

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    logger.simple({ i: i }); // Log current outer loop index 'i'
    logger.comment = `Start the outer loop, iterating from i = 1 to n (the length of the string). In each iteration, we consider the prefix of the string s[0...i-1] and check if it can be segmented into words.`;
    logger.breakpoint(3); // #3 Start outer loop

    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      logger.simple({ j: j }); // Log current inner loop index 'j'
      logger.comment = `Start the inner loop, iterating through all possible split points j from 0 to i-1. The split point j divides the prefix s[0...i-1] into two parts: a prefix s[0...j-1] and a suffix s[j...i-1].`;
      logger.breakpoint(4); // #4 Start inner loop

      // Extract the suffix s[j...i-1]
      const suffix = s.substring(j, i);
      logger.simple({ suffix: suffix }); // Log the extracted suffix

      const canSegmentPrefix = dp[j];
      const isWordInDict = wordSet.has(suffix);
      logger.simple({ "dp[j]": canSegmentPrefix }); // Log dp[j] value
      logger.simple({ "wordSet.has(suffix)": isWordInDict }); // Log if suffix is in wordSet
      logger.comment = `Extract the suffix substring s[j...i-1], which is "${suffix}". Check if the prefix s[0...j-1] can be segmented (by looking up dp[j], which is ${canSegmentPrefix}) and if the extracted suffix "${suffix}" is a valid word in the 'wordSet' (${isWordInDict}).`;
      logger.breakpoint(5); // #5 Extract suffix and check conditions

      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(suffix))
      if (canSegmentPrefix && isWordInDict) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        logger.simple({ "dp[i] updated": true }); // Log that dp[i] is updated
        logger.arrayV2({ dp }, { i }); // Log the updated dp array
        logger.comment = `Both conditions are true: the prefix s[0...j-1] can be segmented (dp[${j}] is true) and the suffix "${suffix}" is a valid word in the dictionary. This means the prefix s[0...i-1] can be segmented. Set dp[${i}] to true and break the inner loop because we've found at least one way to segment this prefix.`;
        logger.breakpoint(6); // #6 Found valid segmentation, dp[i] updated
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break; // #7 Break inner loop (optimization) - Breakpoint 7 is conceptually here, but adding logger.breakpoint(7) after break is unreachable.
      } else {
        logger.simple({ "dp[i] updated": false }); // Log that dp[i] was not updated
        logger.comment = `The conditions for a valid segmentation using split point j = ${j} are not met (either dp[${j}] is ${canSegmentPrefix} or the suffix "${suffix}" is not in the wordSet). Continue to the next possible split point.`;
        logger.breakpoint(8); // #8 Segmentation using split point j didn't work
      }
    }
    // logger.breakpoint(7) could be placed here if we want a breakpoint specifically after a break, but #9 seems more logical for the end of the inner loop.
    logger.simple({ suffix: undefined }); // Clear suffix for the next outer loop iteration
    logger.arrayV2({ dp }, { i }); // Log dp state at the end of inner loop checks for i
    logger.comment = `Finished checking all possible split points j for the prefix s[0...${ i - 1 }]. The value of dp[${i}] (${dp[i]}) indicates whether this prefix can be segmented into words from the dictionary.`;
    logger.breakpoint(9); // #9 Finished checking all split points for prefix s[0...i-1]
  }
  logger.comment = "Finished the outer loop, having checked all prefixes of the string s up to length n.";
  logger.breakpoint(10); // #10 Finished outer loop

  // The final result is dp[n]
  const result = dp[n];
  logger.simple({ result: result }); // Log the final result
  logger.arrayV2({ dp }, { n }); // Log the final dp array state
  logger.comment = `The final result of the word break problem for the string s is stored in dp[n] (dp[${n}]), which is ${result}. If dp[n] is true, the entire string s can be segmented into words from the dictionary; otherwise, it cannot.`;
  logger.breakpoint(11); // #11 Return final result dp[n]

  return logger.getSteps();
}

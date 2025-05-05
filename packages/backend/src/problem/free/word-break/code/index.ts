import { ProblemState } from "algo-lens-core"; // Import ProblemState
import { StepLoggerV2 } from "../../../core/StepLoggerV2"; // Import StepLoggerV2
import { WordBreakInput } from "../types"; // Import from ../types

export function wordBreak(p: WordBreakInput): ProblemState[] {
  const logger = new StepLoggerV2();
  const { s: strInput, wordDict } = p; // Renamed s to strInput to avoid conflict
  const str = strInput.split(''); // Convert string to char array for logger
  const n = str.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Empty string can always be segmented.
  logger.arrayV2({ str: str.split('') }); // Corrected str arrayV2
  logger.arrayV2({ dp: dp }); // Corrected dp arrayV2
  logger.breakpoint(1); //#1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = strInput.substring(j, i); // Use original string for substring
      logger.arrayV2({ str: str.split('') }, { head: i - 1, tail: j }); // Corrected str arrayV2
      logger.group("loops", { i, j }, { min: 0, max: n }); // Corrected group
      logger.simple({ word });
      logger.arrayV2({ dp: dp }, { head: i, tail: j }); // Corrected dp arrayV2
      logger.breakpoint(2); //#2
      if (dp[j] && wordDict.includes(word)) {
        dp[i] = true;
        logger.arrayV2({ str: str.split('') }, { head: i - 1, tail: j }); // Corrected str arrayV2
        logger.simple({ word });
        logger.group("loops", { i, j }, { min: 0, max: n }); // Corrected group
        logger.arrayV2({ dp: dp }, { head: i, tail: j }); // Corrected dp arrayV2
        logger.breakpoint(3); //#3
        break;
      }
    }
  }

  const result = dp[n];
  logger.arrayV2({ str: str.split('') }); // Corrected str arrayV2
  logger.simple({ result });
  logger.arrayV2({ dp: dp }, { head: n }); // Corrected dp arrayV2
  logger.breakpoint(4); //#4
  return logger.getSteps();
}

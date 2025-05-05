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
  logger.arrayV2({ name: "str", state: str });
  logger.arrayV2({ name: "dp", state: dp });
  logger.breakpoint(1); //#1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = strInput.substring(j, i); // Use original string for substring
      logger.arrayV2({ name: "str", state: str }, { head: i - 1, tail: j });
      logger.group("loops", { i, j }, { meta: { min: 0, max: n } });
      logger.simple({ word });
      logger.arrayV2({ name: "dp", state: dp }, { head: i, tail: j });
      logger.breakpoint(2); //#2
      if (dp[j] && wordDict.includes(word)) {
        dp[i] = true;
        logger.arrayV2({ name: "str", state: str }, { head: i - 1, tail: j });
        logger.simple({ word });
        logger.group("loops", { i, j }, { meta: { min: 0, max: n } });
        logger.arrayV2({ name: "dp", state: dp }, { head: i, tail: j });
        logger.breakpoint(3); //#3
        break;
      }
    }
  }

  const result = dp[n];
  logger.arrayV2({ name: "str", state: str });
  logger.simple({ result });
  logger.arrayV2({ name: "dp", state: dp }, { head: n });
  logger.breakpoint(4); //#4
  return logger.getSteps();
}

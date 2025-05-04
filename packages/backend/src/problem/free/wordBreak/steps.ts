import { defineStep } from "@problem/types/step";
import { Log } from "@problem/types/log";
import { variables } from "./variables";
import { WordBreakInput } from "./types";

export const generateSteps = (input: WordBreakInput) => {
  const log = new Log();
  const s = input.s;
  const wordDict = new Set(input.wordDict); // Use Set for efficient lookup
  const n = s.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Base case: empty string

  log.addStep(defineStep({
    label: "Initialization",
    description: "Initialize DP table. `dp[i]` means `s[0...i-1]` can be segmented. `dp[0]` is true (empty string).",
    state: {
      [variables.s.id]: { value: s },
      [variables.wordDict.id]: { value: input.wordDict }, // Show original array for clarity
      [variables.dp.id]: { value: [...dp] },
    },
  }));

  for (let i = 1; i <= n; i++) {
    log.addStep(defineStep({
        label: "Outer Loop Iteration",
        description: `Checking if substring ending at index ${i-1} (s[0...${i-1}]) can be segmented.`,
        state: {
            [variables.i.id]: { value: i },
            [variables.dp.id]: { value: [...dp] }, // Show current dp state
        }
    }));

    for (let j = 0; j < i; j++) {
      const currentSubstring = s.substring(j, i);
      const wordFound = wordDict.has(currentSubstring);

      log.addStep(defineStep({
        label: "Inner Loop Check",
        description: `Checking substring s[${j}...${i-1}] = "${currentSubstring}". Is it in wordDict? ${wordFound}. Is dp[${j}] (${dp[j]}) true?`,
        state: {
          [variables.i.id]: { value: i },
          [variables.j.id]: { value: j },
          [variables.substring.id]: { value: currentSubstring },
          [variables.wordFound.id]: { value: wordFound },
          [variables.dp.id]: { value: [...dp] }, // Highlight dp[j]
        },
        highlights: { // Optional: Highlight relevant parts for visualization
             [variables.dp.id]: { indices: [j] }
        }
      }));

      if (dp[j] && wordFound) {
        dp[i] = true;
        log.addStep(defineStep({
          label: "DP Table Update",
          description: `Since dp[${j}] is true and "${currentSubstring}" is in wordDict, set dp[${i}] to true. Break inner loop for index i=${i}.`,
          state: {
            [variables.i.id]: { value: i },
            [variables.j.id]: { value: j },
            [variables.substring.id]: { value: currentSubstring },
            [variables.wordFound.id]: { value: wordFound },
            [variables.dp.id]: { value: [...dp] }, // Show updated dp table
          },
          highlights: {
            [variables.dp.id]: { indices: [i] }
          }
        }));
        break; // Optimization: Once dp[i] is true, no need to check further for this i
      }
    }
     // Add step after inner loop completes (or breaks) for current 'i'
     if (!dp[i]) {
         log.addStep(defineStep({
            label: "Outer Loop End (No Match)",
            description: `Finished inner loop for i=${i}. No valid segmentation found ending at this index. dp[${i}] remains false.`,
            state: {
                [variables.i.id]: { value: i },
                [variables.dp.id]: { value: [...dp] },
            },
             highlights: {
                 [variables.dp.id]: { indices: [i] }
            }
        }));
     } else {
         // This case is covered by the "DP Table Update" step when break occurs
     }
  }

  const finalResult = dp[n];
  log.addStep(defineStep({
    label: "Final Result",
    description: `Finished all iterations. The result is dp[${n}], which indicates if the entire string can be segmented.`,
    state: {
      [variables.s.id]: { value: s },
      [variables.dp.id]: { value: [...dp] },
      [variables.result.id]: { value: finalResult }, // Include the final result variable
    },
    highlights: {
        [variables.dp.id]: { indices: [n] }
    }
  }));

  return log.getSteps();
};

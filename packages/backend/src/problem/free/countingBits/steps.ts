import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(n: number): ProblemState[] {
  const l = new StepLoggerV2();
  // Initialize the bitCounts array with size n + 1 and fill with 0s
  let bitCounts: number[] = new Array(n + 1).fill(0);

  // Log the initial state of the bitCounts array
  l.arrayV2({ bitCounts }, {});
  l.breakpoint(1, "Initialize bitCounts array with zeros."); // Refined message

  // Iterate from 1 to n to compute the bit counts using dynamic programming
  for (let i = 1; i <= n; i++) {
    // The number of set bits in i is the number of set bits in i/2 (integer division)
    // plus 1 if the last bit of i is set.
    // i >> 1 is equivalent to floor(i / 2)
    // i & 1 checks if the last bit is 1
    const prevCountIndex = i >> 1;
    const lastBit = i & 1;
    const prevCount = bitCounts[prevCountIndex];

    // --- Step 1: Log state BEFORE calculation ---
    // Highlight the index (i >> 1) we are reading from in bitCounts
    l.arrayV2({ bitCounts }, { [prevCountIndex]: prevCountIndex });
    // Show binary of i, highlight the last bit (i & 1)
    l.binary({ i }, { highlightLast: true });
    // Group variables involved in the upcoming calculation
    l.group(
      "DP Calculation Step",
      {
        "Current Number (i)": i,
        "Index for Previous Count (i >> 1)": prevCountIndex,
        "Previous Count (bitCounts[i >> 1])": prevCount,
        "Last Bit (i & 1)": lastBit,
      },
      { showLabel: true } // Use labels for clarity
    );
    l.breakpoint(
      2,
      `Calculating bitCounts[${i}] = bitCounts[${prevCountIndex}] + (i & 1)` // Clearer formula representation
    );

    // --- Step 2: Perform the DP calculation ---
    bitCounts[i] = prevCount + lastBit;
    const currentCount = bitCounts[i]; // Store result for logging

    // --- Step 3: Log state AFTER calculation and update ---
    // Highlight the index i where the new count is stored
    l.arrayV2({ bitCounts }, { i: i });
    // Show binary of i, no highlight needed now
    l.binary({ i }, { highlightLast: false });
    // Group variables showing the result of the calculation
    l.group(
      "DP Calculation Result",
      {
        "Current Number (i)": i,
        "Index for Previous Count (i >> 1)": prevCountIndex,
        "Previous Count (bitCounts[i >> 1])": prevCount,
        "Last Bit (i & 1)": lastBit,
        "Calculated Count (bitCounts[i])": currentCount, // Show the final result
      },
      { showLabel: true } // Use labels for clarity
    );
    l.breakpoint(3, `Stored bitCounts[${i}] = ${currentCount}.`); // Updated message
  }

  // Log the final state of the bitCounts array
  l.arrayV2({ bitCounts }, {}); // Show the final array
  l.breakpoint(4, "Finished computing bit counts for all numbers."); // Consistent message

  return l.getSteps();
}

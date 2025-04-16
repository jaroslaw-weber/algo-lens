// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  asBinary,
} from "algo-lens-core/src/utils";

// Defines the interface for the input expected by the countBits function
interface CountBitsInput {
  n: number;
}

/**
 * Implements the counting bits algorithm which counts the number of 1 bits in each integer from 0 to n.
 * @param p - The input parameter including a number n.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function countBits(p: CountBitsInput): ProblemState[] {
  const { n } = p;
  const steps: ProblemState[] = [];
  let result: number[] = new Array(n + 1).fill(0);

  // Helper function to create and log each step's computational state
  function log(p: {
    breakpoint: number;
    count?: number;
    i?: number;
    num?: number;
  }) {
    
    const { breakpoint, count, i, num } = p;
    //console.log(`Step ${breakpoint}`);
    const variables: Variable[] = [];
    const step: ProblemState = {
      variables,
      breakpoint,
    };
    variables.push(asArray("result", result, i - 1));
    if (num !== undefined) {
      variables.push(asBinary({ num }, { highlightLast: true }));
    }

    if (i !== undefined) {
      // Split count and i into separate variables within the asValueGroup function
      variables.push(asValueGroup("loop", { i }, { min: 0, max: n }));
    }
    if (count !== undefined) {
      variables.push(
        asValueGroup("count", { count }, { min: 0, max: i })
      );
    }

    steps.push(step);
  }

  // Initial state log before the loop starts
  log({ breakpoint: 1 });


  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i
    log({ breakpoint: 2, i , num});
    //#2 Calculate the number of 1 bits in the current integer
    while (num > 0) {
      log({ breakpoint: 3, num, count, i });
      //#3 Use a bitwise AND operation to check the least significant bit
      if (num & 1) {
        //#4 If the least significant bit is 1, increment the count
        log({ breakpoint: 4, num, count, i });
        count++;
        //#5
        
        log({ breakpoint: 5, num, count, i });
      }
      //#6 Shift the number to the right to move to the next bit
      num >>= 1;
      log({ breakpoint: 6, num, count, i });
    }

    //#7 Store the count in the result array
    log({
      breakpoint: 7,
      count,
      num: i,
      i,
    });
    result[i] = count;
  }
  //#8
  log({
    breakpoint: 8,
  });
  return steps;
}

// Example implementation of the countBits function for demonstration and testing
const code = `function countBits(n: number): number[] {
  const result = new Array(n + 1).fill(0);

  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i;
    //#2 Calculate the number of 1 bits in the current integer
    while (num > 0) {
      //#3 Use a bitwise AND operation to check the least significant bit
      if (num & 1) {
        //#4 If the least significant bit is 1, increment the count
        count++;
        //#5 If the least significant bit is 1, increment the count
      }
      num >>= 1;
      //#6 Shift the number to the right to move to the next bit
    }
    //#7 Store the count in the result array
    result[i] = count;
  }
  //#8
  return result;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Counting Bits";
const getInput = () => ({
  n: 15,
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const countBitsProblem: Problem<CountBitsInput, ProblemState> = {
  title,
  code,
  getInput,
  func: countBits,
  id: "counting-bits",
  tags: ["bit manipulation"],
};

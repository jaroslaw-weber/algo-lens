import { Problem, ProblemState, Variable, BinaryVariable } from "algo-lens-core";
// import { asBinary } from "../core/utils"; // Assuming visualization handled by StepLoggerV2

// Defines the interface for the input expected by the sumOfTwoIntegers function (will be in types.ts)
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

// Core algorithm - breakpoints will be added here
export function getSumAlgorithm(a: number, b: number): number {
  //#1 Start loop. Continue while b (carry) is not 0.
  while (b !== 0) {
    //#2 Calculate carry: find bits set in both a and b.
    const carry = a & b;
    //#3 Calculate sum without carry: XOR finds bits set in either a or b but not both.
    a = a ^ b;
    //#4 Shift carry left by 1 to prepare for next addition position. Assign to b.
    b = carry << 1;
  }
  //#5 Loop finished. b is 0. The sum is in a. Return a.
  return a;
}


// Old step generation function (for reference) - Includes asBinary helper
export function sumOfTwoIntegers_OldSteps(p: SumOfTwoIntegersInput): ProblemState[] {
  const s: ProblemState[] = [];
  let { a, b } = p;
  let carry: number | undefined = undefined; // Initialize carry

  // Local asBinary definition (might be replaced by StepLoggerV2 features)
  function asBinary(
    o: Record<string, number>,
    options?: {
      highlightLast?: boolean;
      pointersLeft?: number[];
      pointersRight?: number[];
    }
  ): BinaryVariable {
    const keys = Object.keys(o);
    if (keys.length != 1) {
      throw new Error("asBinary only supports one key");
    }
    const [label] = keys;
    const value = o[label];

    const result: BinaryVariable = {
      label,
      type: "binary",
      value: value,
      pointers: [],
    };
    const asBinaryString = value.toString(2);
    if (options?.highlightLast) {
      const lastIndex = asBinaryString.length - 1;
      result.pointers.push({
        value: lastIndex,
        dimension: "column",
      });
    }
    for (const pointer in options?.pointersLeft ?? []) {
      result.pointers.push({
        value: options?.pointersLeft[pointer],
        dimension: "column",
      });
    }

    for (const pointer in options?.pointersRight ?? []) {
      result.pointers.push({
        value: asBinaryString.length - 1 - options?.pointersRight[pointer],
        dimension: "column",
      });
    }
    return result;
  }

  function log(point: number) {
    const v: Variable[] = [
      asBinary({ a }), // Simplified call for clarity
      asBinary({ b }),
    ];
    if (carry !== undefined) {
      v.push(asBinary({ carry }));
    }
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    s.push(step);
  }

  log(1); // BP 1: Initial state
  while (b !== 0) {
    carry = a & b;
    log(2); // BP 2: Calculated carry
    a = a ^ b;
    log(3); // BP 3: Calculated sum without carry
    b = carry << 1;
    log(4); // BP 4: Shifted carry assigned to b
  }

  log(5); // BP 5: Final state

  return s;
}

// Code string for display - updated with breakpoints
const code = `function getSum(a: number, b: number): number {
  //#1 Start loop. Continue while b (carry) is not 0.
  while (b !== 0) {
    //#2 Calculate carry: find bits set in both a and b.
    const carry = a & b;
    //#3 Calculate sum without carry: XOR finds bits set in either a or b but not both.
    a = a ^ b;
    //#4 Shift carry left by 1 to prepare for next addition position. Assign to b.
    b = carry << 1;
  }
  //#5 Loop finished. b is 0. The sum is in a. Return a.
  return a;
}`;

// Problem definition will be moved to problem.ts
export const problem: Problem<SumOfTwoIntegersInput /*, number removed */ > = {
  title: "Sum of Two Integers",
  emoji: '➕',
  code, // Reference the code string defined above
  // func: sumOfTwoIntegers_OldSteps, // func is usually removed, rely on generateSteps
  id: "sum-of-two-integers",
  tags: ["Bit Manipulation", "Math"], // Added Math tag
};

import { Problem, ProblemState, Variable, BinaryVariable } from "algo-lens-core";

// Defines the interface for the input expected by the sumOfTwoIntegers function
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

export function asBinary(
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

/**
 * Implements the sum of two integers algorithm using bitwise operations.
 * @param p - The input parameters including two integers.
 * @returns The states showing the steps of the computation.
 */
export function sumOfTwoIntegers(p: SumOfTwoIntegersInput): ProblemState[] {
  const s: ProblemState[] = [];
  let { a, b } = p;
  let carry: number;

  function log(point: number) {
    const v: Variable[] = [
      asBinary({ a }, { highlightLast: true }),
      asBinary({ b }, { highlightLast: true }),
    ];
    if (carry !== undefined) {
      v.push(asBinary({ carry }, { highlightLast: true }));
    }
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    s.push(step);
  }

  log(1); // Initial state
  while (b !== 0) {
    carry = a & b;
    log(2);
    a = a ^ b;
    log(3);
    b = carry << 1;
    log(4);
  }

  log(5); // Final state

  return s;
}

// Example implementation of the sumOfTwoIntegers function for demonstration and testing
const code = `function sumOfTwoIntegers(a: number, b: number): number {
  //#1
  while (b !== 0) {
    let carry = a & b;
    //#2 Calculate carry
    
    a = a ^ b;
    //#3 Calculate sum without carry
    
    b = carry << 1;
    //#4 Shift carry
  }
  //#5 Return the result
  return a;
}`;

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<SumOfTwoIntegersInput, number> = {
  title: "Sum of Two Integers",
  emoji: '➕',
  code,
  func: sumOfTwoIntegers,
  id: "371",
  tags: ["bit manipulation"],
};

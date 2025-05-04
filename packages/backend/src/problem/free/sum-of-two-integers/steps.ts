import { defineStep } from "@problem/types/step";
import { variables } from "./variables";
import { SumOfTwoIntegersInput } from "./types";
import { Log } from "@problem/types/log";

// Helper function to represent numbers in binary format for visualization
const asBinary = (n: number): string => (n >>> 0).toString(2).padStart(32, '0');

export const generateSteps = (input: SumOfTwoIntegersInput) => {
  const log = new Log();
  let a = input.a;
  let b = input.b;
  let result = 0; // Initialize result

  log.addStep(defineStep({
    label: "Initial State",
    description: "Initialize the input values.",
    state: {
      [variables.a.id]: { value: a, binary: asBinary(a) },
      [variables.b.id]: { value: b, binary: asBinary(b) },
    },
  }));

  while (b !== 0) {
    const carry = a & b;
    log.addStep(defineStep({
      label: "Calculate Carry",
      description: "Calculate the carry bit using bitwise AND (a & b).",
      state: {
        [variables.a.id]: { value: a, binary: asBinary(a) },
        [variables.b.id]: { value: b, binary: asBinary(b) },
        [variables.carry.id]: { value: carry, binary: asBinary(carry) },
      },
    }));

    a = a ^ b; // Sum without carry
    log.addStep(defineStep({
      label: "Calculate Sum (XOR)",
      description: "Calculate the sum of bits without carry using bitwise XOR (a ^ b). Update 'a' with this sum.",
      state: {
        [variables.a.id]: { value: a, binary: asBinary(a) },
        [variables.b.id]: { value: b, binary: asBinary(b) }, // b still holds previous value before shift
        [variables.carry.id]: { value: carry, binary: asBinary(carry) },
      },
    }));


    b = carry << 1; // Shift carry to the left
    log.addStep(defineStep({
      label: "Shift Carry",
      description: "Shift the carry bit left by one position (carry << 1). Update 'b' with this shifted carry for the next iteration.",
      state: {
        [variables.a.id]: { value: a, binary: asBinary(a) },
        [variables.b.id]: { value: b, binary: asBinary(b) }, // b now holds the shifted carry
        [variables.carry.id]: { value: carry, binary: asBinary(carry) }, // carry still holds pre-shift value for context
      },
    }));
  }

  result = a; // When b becomes 0, a holds the final sum

  log.addStep(defineStep({
    label: "Final Result",
    description: "The loop terminates when 'b' (shifted carry) becomes 0. The final sum is stored in 'a'.",
    state: {
      [variables.a.id]: { value: a, binary: asBinary(a) },
      [variables.b.id]: { value: b, binary: asBinary(b) }, // b is 0 here
      [variables.result.id]: { value: result, binary: asBinary(result) }, // Add result to final state
    },
  }));


  return log.getSteps();
};

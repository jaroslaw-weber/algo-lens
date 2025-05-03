import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { SumOfTwoIntegersInput } from './types';

// Helper to format number as binary string (optional, for logging clarity)
function toBinaryString(num: number): string {
    // Basic binary string, might need padding or handling for negative numbers
    // depending on visualization requirements (e.g., using 32 bits)
    if (num >= 0) {
        return num.toString(2);
    } else {
        // Simple representation for negatives, might not show full two's complement
        return '-' + Math.abs(num).toString(2);
    }
}


export function generateSteps(p: SumOfTwoIntegersInput) {
  const l = new StepLoggerV2();
  let { a, b } = p; // Use let as 'a' and 'b' will be modified

  // Initial state logging
  l.simple('a', a);
  l.simple('b', b);
  // Log binary representations using the helper or assuming logger support
  l.binary('a_bin', a); // Assuming l.binary exists
  l.binary('b_bin', b); // Assuming l.binary exists
  l.snapshot(`Initial state: a = ${a} (${toBinaryString(a)}), b = ${b} (${toBinaryString(b)})`);

  // Breakpoint #1: Start loop. Continue while b (current carry) is not 0.
  l.breakpoint(1);

  while (b !== 0) {
    l.snapshot(`Loop start: a = ${a} (${toBinaryString(a)}), b = ${b} (${toBinaryString(b)}) != 0`);

    // Breakpoint #2: Calculate carry: find bits set in both a and b.
    l.snapshot(`Calculating carry = a & b = ${a} & ${b}`);
    l.breakpoint(2);
    const carry_step = a & b; // Use temporary variable for logging carry before shift
    l.simple('carry_step', carry_step);
    l.binary('carry_bin', carry_step);
    l.snapshot(`Carry calculated: ${carry_step} (${toBinaryString(carry_step)})`);

    // Breakpoint #3: Calculate sum without carry: XOR finds bits set in either a or b but not both.
    l.snapshot(`Calculating sum without carry: a = a ^ b = ${a} ^ ${b}`);
    l.breakpoint(3);
    a = a ^ b;
    l.simple('a', a);
    l.binary('a_bin', a);
    l.snapshot(`Sum without carry (a): ${a} (${toBinaryString(a)})`);


    // Breakpoint #4: Shift carry left by 1 to prepare for next addition position. Assign to b.
    l.snapshot(`Shifting carry left: b = carry << 1 = ${carry_step} << 1`);
    l.breakpoint(4);
    b = carry_step << 1;
    l.simple('b', b);
    l.binary('b_bin', b);
    l.snapshot(`Shifted carry (b): ${b} (${toBinaryString(b)})`);

    l.snapshot(`End of loop iteration. Current sum (a) = ${a}, Next carry (b) = ${b}`);
  }

  // Breakpoint #5: Loop finished. b is 0. The sum is in a. Return a.
  l.snapshot(`Loop finished: b = ${b} == 0`);
  l.simple('sum', a); // Log final sum in 'a'
  l.snapshot(`Final sum (a): ${a} (${toBinaryString(a)})`);
  l.breakpoint(5);

  return l.getSteps();
}

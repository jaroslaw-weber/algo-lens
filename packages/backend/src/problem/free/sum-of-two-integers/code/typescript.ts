// Calculates the sum of two integers without using the '+' or '-' operators, using bit manipulation.
export function getSum(a: number, b: number): number {
  let carry: number;
  //#1 Initialize carry

  // Loop continues as long as there is a carry (represented by b != 0)
  while (b !== 0) {
    //#2 Start loop iteration (while carry exists)
    // Calculate carry: bits that are 1 in both a and b.
    carry = (a & b);
    //#3 Calculate carry bits
    // Calculate sum without carry: bits that are 1 in either a or b but not both (XOR).
    a = a ^ b;
    //#4 Calculate sum bits (without carry)
    // Shift carry left by 1 bit to prepare for addition in the next iteration.
    b = carry << 1;
    //#5 Shift carry left for next iteration
  }
  //#6 Loop finished (no more carry)

  // Final result is in 'a' when 'b' (carry) becomes 0.
  //#7 Return final sum
  return a;
}

export const code = `function sumOfTwoIntegers(a: number, b: number): number {
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

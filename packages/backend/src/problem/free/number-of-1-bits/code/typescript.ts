export const code = `function hammingWeight(n: number): number {
  let count = 0;
  let maskingBit = 1;

  //#1 Start the loop to count the number of 1-bits
  while (maskingBit <= n) {
    //#2 Check if the least significant bit is 1
    if (n & maskingBit) {
      count++;
      //#3 Increment the count
    }
    //#4 Shift the masking bit to the right
    maskingBit <<= 1;
  }

  //#5 Return the count of 1-bits
  return count;
}

}`;

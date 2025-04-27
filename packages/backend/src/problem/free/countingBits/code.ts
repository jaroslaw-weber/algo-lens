export const code = `function countBits(n: number): number[] {
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

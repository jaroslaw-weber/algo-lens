## Approach: Bit Manipulation

We can count the number of '1' bits in a number by checking each bit individually. A simple way to do this is by using a "mask" that we move across the bits of the number.

1.  **Initialize:** Start with a `count` of 0 (this will store the number of '1' bits we find). Also, create a `maskingBit` and set it to 1. This `maskingBit` will help us look at each bit of the number one by one.
2.  **Check Each Bit:** We'll use a loop that continues as long as our `maskingBit` is less than or equal to the number we are checking (`n`).
3.  **Bitwise AND:** Inside the loop, we perform a bitwise AND operation between the number `n` and the `maskingBit`. The bitwise AND (`&`) compares the bits of two numbers at each position. If both bits are 1, the result for that position is 1; otherwise, it's 0.
    *   **Why Bitwise AND?** When we `AND` `n` with `maskingBit` (which has only one '1' bit at a specific position), the result will be non-zero *only if* the corresponding bit in `n` is also a '1'. If the corresponding bit in `n` is '0', the result of the `AND` operation will be 0.
4.  **Increment Count:** If the result of the bitwise AND operation is non-zero, it means we found a '1' bit at the position where the `maskingBit` has a '1'. We increment our `count`.
5.  **Move the Mask:** After checking the current bit position, we need to move our `maskingBit` to check the next bit. We do this by left-shifting the `maskingBit` by 1 position (`maskingBit <<= 1`). This moves the single '1' bit in `maskingBit` one position to the left.
6.  **Repeat:** The loop continues, checking the next bit position with the shifted `maskingBit`.
7.  **Result:** Once the loop finishes (when `maskingBit` becomes larger than `n`, meaning we've checked all relevant bit positions), the final `count` will be the total number of '1' bits in the original number.

## Data Structures

-   None explicitly used beyond the input integer.

## Complexity

-   Time: O(1), as the number of bits in an integer is fixed (usually 32 for a standard integer type). We perform a fixed number of operations for each bit.
-   Space: O(1), as we only use a few extra variables.

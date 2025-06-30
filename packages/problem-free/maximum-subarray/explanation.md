## Approach

We use Kadane's algorithm, a dynamic programming approach, to find the maximum sum of a contiguous subarray. The algorithm iterates through the array, keeping track of the maximum sum ending at the current position (`maxEndingHere`) and the overall maximum sum found so far (`maxSoFar`).

1.  **Initialization:** Initialize `maxEndingHere` and `maxSoFar` to the first element of the array.
2.  **Iteration:** Iterate through the array starting from the second element. For each element `num`:
    *   Calculate the maximum sum ending at the current position: `maxEndingHere = Math.max(num, maxEndingHere + num)`. This means the maximum sum ending at the current position is either the current number itself (starting a new subarray) or the current number added to the maximum sum ending at the previous position (extending the current subarray).
    *   Update the overall maximum sum found so far: `maxSoFar = Math.max(maxSoFar, maxEndingHere)`.
3.  **Result:** After iterating through the entire array, `maxSoFar` will hold the maximum sum of any contiguous subarray.

## Data Structures

-   Array: The input is an array of numbers.

## Complexity

-   Time: O(N), where N is the number of elements in the input array, as we iterate through the array once.
-   Space: O(1), as we only use a few extra variables to store the maximum sums.

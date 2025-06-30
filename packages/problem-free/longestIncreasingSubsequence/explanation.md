## Approach

We use dynamic programming to solve the Longest Increasing Subsequence problem. We define a `dp` array where `dp[i]` represents the length of the longest increasing subsequence ending at index `i`.

1.  **Initialization:** Create a `dp` array of the same length as the input array `nums`, and initialize all elements to 1 (as each element itself is an increasing subsequence of length 1).
2.  **Dynamic Programming:** Iterate through the `nums` array starting from the second element (index 1). For each element `nums[i]`, iterate through all previous elements `nums[j]` (where `j < i`). If `nums[i]` is greater than `nums[j]`, it means `nums[i]` can extend the increasing subsequence ending at `nums[j]`. Update `dp[i]` to be the maximum of its current value and `dp[j] + 1`.
3.  **Result:** The length of the longest increasing subsequence in the entire array is the maximum value in the `dp` array.

## Data Structures

-   Array: Used for the `dp` array to store the lengths of increasing subsequences.

## Complexity

-   Time: O(N^2), where N is the number of elements in the input array. This is due to the nested loops used to compute the `dp` array.
-   Space: O(N), where N is the number of elements in the input array, to store the `dp` array.

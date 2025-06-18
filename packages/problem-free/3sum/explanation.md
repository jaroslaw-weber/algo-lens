# 3Sum Problem Explanation (LeetCode #15)

## 1. Problem Statement

Given an integer array `nums`, the goal is to find all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and their sum equals zero (`nums[i] + nums[j] + nums[k] == 0`). The solution set must not contain duplicate triplets.

## 2. Initial Thoughts

A straightforward approach is to use three nested loops to iterate through all possible combinations of three distinct elements `(i, j, k)` and check if their sum is zero.

```
for i from 0 to n-3:
  for j from i+1 to n-2:
    for k from j+1 to n-1:
      if nums[i] + nums[j] + nums[k] == 0:
        Add sorted triplet (nums[i], nums[j], nums[k]) to result set
```

This brute-force method has a time complexity of O(n^3), which is likely too slow for typical competitive programming constraints where n can be up to several thousands. We need a more efficient approach.

## 3. Core Idea: Sorting

The key insight to optimize the solution is to **sort the input array `nums` first**. Sorting allows us to use more efficient searching techniques and helps in handling duplicate triplets easily. Once sorted, we can iterate through the array and, for each element, efficiently search for the other two elements that sum up to the required target.

## 4. Two-Pointers Approach

After sorting the array, we can iterate through it with a single pointer, `i`, from the beginning up to `n-2` (since we need at least two more elements for a triplet). For each `nums[i]`, our target sum for the remaining two elements becomes `-nums[i]`.

We can find these two elements using the **two-pointers technique** on the subarray to the right of `i`.

*   Initialize a `left` pointer to `i + 1`.
*   Initialize a `right` pointer to `n - 1` (the end of the array).

Now, we move these pointers inwards based on the sum `nums[i] + nums[left] + nums[right]`:

*   **Case 1: `sum == 0`**: We found a triplet! Add `[nums[i], nums[left], nums[right]]` to our result list. To avoid duplicate triplets involving `nums[i]`, we need to move both `left` and `right` pointers while skipping over any duplicate values. Increment `left` while `nums[left]` equals `nums[left + 1]`. Decrement `right` while `nums[right]` equals `nums[right - 1]`. After skipping duplicates, increment `left` and decrement `right` once more to continue searching for other potential triplets involving `nums[i]`.
*   **Case 2: `sum < 0`**: The sum is too small. Since the array is sorted, we need a larger value to reach zero. Increment the `left` pointer (`left++`) to consider a potentially larger number.
*   **Case 3: `sum > 0`**: The sum is too large. We need a smaller value. Decrement the `right` pointer (`right--`) to consider a potentially smaller number.

We repeat this process until `left` crosses `right` (`left >= right`), meaning we've checked all possible pairs for the current `nums[i]`.

## 5. Handling Duplicates

Sorting is crucial for handling duplicates effectively.

*   **Outer Loop (`i`):** If we encounter the same value for `nums[i]` as the previous iteration (`nums[i] == nums[i-1]`), we skip the current iteration (`continue`). This ensures that we don't generate triplets starting with the same first element multiple times. We only need to check this condition if `i > 0`.
*   **Inner Loop (`left`, `right`):** As described in Case 1 above, after finding a valid triplet, we increment `left` and decrement `right` while they point to duplicate values. This prevents adding identical triplets like `[-1, 0, 1]` multiple times if the array contains duplicates like `[..., 0, 0, ..., 1, 1, ...]`.

## 6. Complexity Analysis

*   **Time Complexity:** O(n^2).
    *   Sorting the array takes O(n log n).
    *   The main loop iterates `n` times. Inside the main loop, the two-pointer approach takes O(n) time in the worst case (as `left` and `right` together traverse the remaining part of the array once).
    *   Therefore, the nested loop structure results in O(n * n) = O(n^2) complexity.
    *   The overall time complexity is dominated by the O(n^2) part, so it's O(n log n + n^2) which simplifies to O(n^2).
*   **Space Complexity:**
    *   O(log n) or O(n): This depends on the sorting algorithm used. Python's Timsort and JavaScript's `sort` typically use O(n) or O(log n) space.
    *   O(m): Where `m` is the number of triplets found. If we consider the space required to store the result triplets, the space complexity is O(m). If the result storage is not counted as extra space, the space complexity is primarily determined by the sort, making it O(log n) or O(n). Often, it's stated as O(1) extra space if the result list isn't counted.

## 7. Code Snippet (TypeScript)

```typescript
export function threeSum(nums: number[]): number[][] {
  //#1
  const target = 0;
  nums.sort((a, b) => a - b); // Sort the array
  const seen = new Set(); // To track unique triplets (alternative to duplicate skipping)
  const result = [];
  //#2
  for (let i = 0; i < nums.length - 2; i++) {
    //#3
    // Skip duplicate 'i' elements
    if (i > 0 && nums[i] === nums[i - 1]) {
      //#4
      continue; 
    }
    let left = i + 1;
    let right = nums.length - 1;
    //#5
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      //#6
      if (sum === target) {
        const triplet = [nums[i], nums[left], nums[right]];
        // const tripletKey = triplet.join(","); // Using Set is an alternative
        // //#7
        // if (!seen.has(tripletKey)) {
        //   seen.add(tripletKey);
        //   result.push(triplet); 
        //   //#8
        // }

        result.push(triplet); // Add triplet

        // Skip duplicate 'left' elements
        //#9
        while (left < right && nums[left] === nums[left + 1]) {
          left++; 
        }
        // Skip duplicate 'right' elements
        //#10
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        } 
        //#11
        // Move pointers inward after finding a triplet and skipping duplicates
        left++;
        right--;
        //#12
      } else if (sum < target) {
        // Need a larger sum
        left++; 
        //#13
      } else {
        // Need a smaller sum
        right--; 
        //#14
      }
    }
  }
  //#15
  return result;
}
```

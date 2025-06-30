## Approach: Greedy with Sorting

To find the minimum number of intervals to remove to make the remaining intervals non-overlapping, we can use a greedy approach. The strategy is to sort the intervals based on their end times. By doing this, when we iterate through the sorted intervals, we can select the interval that finishes earliest, leaving the maximum room for subsequent intervals.

1.  **Sort Intervals:** Sort the input array of intervals based on their end times in ascending order. If two intervals have the same end time, their relative order doesn't matter for this greedy approach.
2.  **Initialize:** Initialize a `removalCount` to 0 and `lastEnd` to negative infinity (or the end time of the first interval if the array is not empty). `lastEnd` will keep track of the end time of the last selected non-overlapping interval.
3.  **Iterate and Count Removals:** Iterate through the sorted intervals. For each `currentInterval`:
    *   **Check for Overlap:** If the start time of the `currentInterval` is less than `lastEnd` (`currentInterval[0] < lastEnd`), it means the current interval overlaps with the previously selected non-overlapping interval. To resolve this overlap and maximize the remaining non-overlapping intervals, we must remove the current interval. Increment `removalCount`.
    *   **Select Non-overlapping Interval:** If the start time of the `currentInterval` is greater than or equal to `lastEnd` (`currentInterval[0] >= lastEnd`), it means the current interval does not overlap with the previously selected non-overlapping interval. We can keep this interval and update `lastEnd` to the end time of the `currentInterval`.
4.  **Result:** After iterating through all the intervals, `removalCount` will hold the minimum number of intervals that need to be removed.

## Data Structures

-   Array: Used to store the input intervals.

## Complexity

-   Time: O(N log N), where N is the number of intervals. This is dominated by the sorting step. The iteration and counting process takes O(N) time.
-   Space: O(1) if sorting is done in-place, or O(N) if a new sorted array is created, depending on the sorting algorithm implementation.

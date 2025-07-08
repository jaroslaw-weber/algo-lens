## Approach

We use a greedy approach combined with sorting to merge overlapping intervals. The key idea is that if we sort the intervals by their start times, we can iterate through them and merge an interval with the previous one if they overlap.

1.  **Sort Intervals:** Sort the input array of intervals based on the start time of each interval in ascending order. This is a crucial step as it allows us to process intervals in a way that makes merging straightforward.
2.  **Initialize Merged List:** Create a new list called `merged` and add the first interval from the sorted list to it. This first interval will be the starting point for our merging process.
3.  **Iterate and Merge:** Iterate through the sorted intervals starting from the second interval. For each `currentInterval`, compare it with the `lastMerged` interval in the `merged` list.
    *   **Check for Overlap:** If the start time of the `currentInterval` is less than or equal to the end time of the `lastMerged` interval (`currentInterval[0] <= lastMerged[1]`), it means the intervals overlap.
    *   **Merge Overlapping Intervals:** If there is an overlap, update the end time of the `lastMerged` interval to be the maximum of the end times of the `lastMerged` interval and the `currentInterval` (`lastMerged[1] = Math.max(lastMerged[1], currentInterval[1])`). This effectively merges the two intervals into a single, larger interval.
    *   **Add Non-overlapping Interval:** If there is no overlap (`currentInterval[0] > lastMerged[1]`), it means the `currentInterval` does not overlap with the `lastMerged` interval. In this case, add the `currentInterval` as a new interval to the `merged` list.
4.  **Result:** After iterating through all the intervals, the `merged` list will contain the set of non-overlapping intervals that cover all the original intervals.

## Data Structures

-   Array: Used to store the input intervals and the resulting merged intervals.

## Complexity

-   Time: O(N log N), where N is the number of intervals. This is dominated by the sorting step. The iteration and merging process takes O(N) time.
-   Space: O(N) in the worst case, to store the merged intervals. If no intervals overlap, the merged list will contain all N original intervals.

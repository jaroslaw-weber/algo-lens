# Meeting Rooms Explanation

## Approach

To determine if a person could attend all meetings, we can sort the intervals by their start times. After sorting, we iterate through the sorted intervals and check if any meeting's start time is less than or equal to the previous meeting's end time. If such an overlap is found, it means a person cannot attend all meetings, and we return `false`. If no overlaps are found after checking all intervals, it means all meetings can be attended, and we return `true`.

## Detailed Steps

1.  **Sort Intervals**: Sort the `intervals` array based on the start times of the meetings. If two meetings have the same start time, their relative order doesn't matter for this problem.
2.  **Iterate and Check for Overlaps**:
    *   Initialize a loop from the second interval (index 1) up to the end of the `intervals` array.
    *   In each iteration, compare the start time of the current meeting (`intervals[i][0]`) with the end time of the previous meeting (`intervals[i-1][1]`).
    *   If `intervals[i][0] < intervals[i-1][1]`, it means there is an overlap, and a person cannot attend all meetings. Return `false`.
3.  **No Overlaps**: If the loop completes without returning `false`, it means no overlaps were found. Return `true`.

## Example Walkthrough

Let's consider `intervals = [[0,30],[5,10],[15,20]]`

1.  **Sort Intervals**:
    The sorted intervals are `[[0,30],[5,10],[15,20]]` (already sorted by start time).

2.  **Iterate and Check for Overlaps**:

    *   **i = 1**:
        *   Current interval: `[5,10]`
        *   Previous interval: `[0,30]`
        *   `intervals[1][0]` (5) vs `intervals[0][1]` (30)
        *   Is `5 < 30`? Yes.
        *   Overlap detected. Return `false`.

Therefore, the output is `false`.

Let's consider `intervals = [[7,10],[2,4]]`

1.  **Sort Intervals**:
    The sorted intervals are `[[2,4],[7,10]]`.

2.  **Iterate and Check for Overlaps**:

    *   **i = 1**:
        *   Current interval: `[7,10]`
        *   Previous interval: `[2,4]`
        *   `intervals[1][0]` (7) vs `intervals[0][1]` (4)
        *   Is `7 < 4`? No.
        *   No overlap. Continue.

3.  **No Overlaps**: The loop completes. Return `true`.

Therefore, the output is `true`.
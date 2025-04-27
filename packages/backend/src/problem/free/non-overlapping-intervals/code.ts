export const codeRaw = `function eraseOverlapIntervals(intervals: number[][]): number {
  let removalCount = 0;
  const remainingIntervals: number[][] = []; // Keep track for visualization
  // @breakpoint 1 - Initial state, before sort

  if (intervals.length === 0) {
    // @breakpoint 6 - Final state (handles empty input edge case)
    return 0;
  }

  // Sort intervals based on their end times
  intervals.sort((a, b) => a[1] - b[1]);
  // @breakpoint 2 - After sorting

  let lastEnd = Number.MIN_SAFE_INTEGER; // Initialize to allow the first interval

  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    // @breakpoint 3 - Considering interval i

    if (currentStart < lastEnd) {
      // Overlap detected, increment removal count
      removalCount++;
      // @breakpoint 4 - Overlap found, removalCount incremented
    } else {
      // No overlap, update lastEnd and add to remaining (for visualization)
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      // @breakpoint 5 - No overlap, interval added, lastEnd updated
    }
  }

  // @breakpoint 6 - Final state after loop
  // Note: The function returns removalCount, but visualization tracks remainingIntervals
  return removalCount;
}`;

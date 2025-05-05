export function eraseOverlapIntervals(intervals: number[][]): number {
  //#1 Sort intervals by their end points
  intervals.sort((a, b) => a[1] - b[1]);
  let lastEnd = Number.MIN_SAFE_INTEGER;
  let removalCount = 0;

  //#2 Iterate through the intervals
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];

    //#3 Check for overlap
    if (currentStart < lastEnd) {
      //#4 Increment removal count on overlap
      removalCount++;
    } else {
      //#5 Update lastEnd if no overlap
      lastEnd = intervals[i][1];
    }
  }

  //#6 Return the count of removed intervals
  return removalCount;
}

function merge(intervals: number[][]): number[][] {
  //#1 Sort intervals by their start points
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];

  //#2 Start iterating through the intervals
  for (let i = 1; i < intervals.length; i++) {
    //#3 Check if the current interval starts before the last merged interval ends
    if (intervals[i][0] <= merged[merged.length - 1][1]) {
      //#4 If there is overlap, merge the current interval with the last one in merged
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], intervals[i][1]);
    } else {
      //#5 If no overlap, add the current interval to merged
      merged.push(intervals[i]);
    }
  }

  //#6 All intervals processed, return the merged intervals
  return merged;
}

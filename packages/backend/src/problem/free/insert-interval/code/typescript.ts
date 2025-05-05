export function insertInterval(intervals: number[][], newInterval: number[]) {
  //#1 Initialize the result array to store the merged intervals
  let result = [];

  // Initialize index 'i' to iterate through intervals
  let i = 0;

  //#2 Add all intervals that come before the 'newInterval'
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  //#3 Merge all overlapping intervals with 'newInterval'
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    // Update 'newInterval' to be the union of the current interval and 'newInterval'
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  //#4 Insert the merged or original 'newInterval'
  result.push(newInterval);

  //#5 Add all remaining intervals to the output
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  //#6 Return the final result array
  return result;
}

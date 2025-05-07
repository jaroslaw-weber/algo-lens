export function insertInterval(intervals: number[][], newInterval: number[]) {
  //#1 Initialize the result array to store the merged intervals
  let result = [];

  // Initialize index 'i' to iterate through intervals
  let i = 0;

   // Loop 1: Add intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
     //#2 State after adding non-overlapping interval before newInterval
  }

   //#3 State before merge loop
   // Loop 2: Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    // Update 'newInterval' to be the union of the current interval and 'newInterval'
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
     //#4 State after merging an overlapping interval
  }

   //#5 State before inserting merged/original newInterval
  result.push(newInterval);
   //#6 State after inserting newInterval

   //#7 State before adding remaining intervals loop
   // Loop 3: Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
     //#8 State after adding non-overlapping interval after newInterval
  }

   //#9 State before final return
  return result;
}

// Define the type for an interval
export type Interval = [number, number]; // Using a tuple for clarity

// Defines the interface for the input expected by the insertInterval function
export interface InsertIntervalInput {
  intervals: Interval[]; // Array of intervals
  newInterval: Interval; // New interval to be inserted
}

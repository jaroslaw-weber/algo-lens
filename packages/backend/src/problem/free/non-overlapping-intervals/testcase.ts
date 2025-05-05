import { TestCase } from 'algo-lens-core'; // Assuming TestCase type exists and path is correct
import { EraseOverlapIntervalsInput } from './types'; // Assuming types file exists here

export const testcases: TestCase<EraseOverlapIntervalsInput, number>[] = [
  // Basic overlap combined with touching intervals
  { input: { intervals: [[1,2], [2,3], [3,4], [1,3]] }, output: 1 },
  // No overlap
  { input: { intervals: [[1,2], [3,4], [5,6]] }, output: 0 },
  // Edge case: Empty input array
  { input: { intervals: [] }, output: 0 },
  // Edge case: Single interval
  { input: { intervals: [[1,10]] }, output: 0 },
  // More complex overlap scenario
  { input: { intervals: [[1,100], [11,22], [1,11], [2,12]] }, output: 2 },
  // Added one more touching case for good measure
  { input: { intervals: [[1, 2], [2, 3], [3, 4]] }, output: 0 },
];

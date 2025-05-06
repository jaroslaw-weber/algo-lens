import { TestCase } from 'algo-lens-core'; // Assuming TestCase type exists and path is correct
import { EraseOverlapIntervalsInput } from './types'; // Assuming types file exists here

export const testcases = [
  { input: { intervals: [[1,2], [2,3], [3,4], [1,3]] }, expected: 1 },
  { input: { intervals: [[1,2], [3,4], [5,6]] }, expected: 0 },
  { input: { intervals: [] }, expected: 0 },
   // Changed from [[1,10]] (single interval) to a more complex case
   { input: { intervals: [[1,2], [2,3], [3,4], [1,3]] }, expected: 1,
    isDefault: true},
  { input: { intervals: [[1,100], [11,22], [1,11], [2,12]] }, expected: 2 },
  { input: { intervals: [[1, 2], [2, 3], [3, 4]] }, expected: 0 }
];

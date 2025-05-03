import { TestCase } from 'algo-lens-core';

export const testcases: TestCase<[number, number[][]], boolean>[] = [
  { // Original test case (assuming it's possible)
    input: [
      10,
      [ [1, 0], [2, 0], [3, 1], [3, 2], [4, 2], [5, 3], [5, 4], [6, 0], [7, 6], [8, 7], [9, 8] ],
    ],
    expected: true // Expecting true (schedule possible)
  },
  { // Simple possible schedule
    input: [ 2, [[1, 0]] ],
    expected: true // Expecting true
  },
  { // Simple impossible schedule (cycle)
    input: [ 2, [[1, 0], [0, 1]] ],
    expected: false // Expecting false
  },
  { // No prerequisites
    input: [ 3, [] ],
    expected: true // Expecting true
  },
  { // More complex impossible schedule
     input: [ 4, [[1,0],[2,1],[3,2],[1,3]] ],
     expected: false // Expecting false (cycle 1->2->3->1)
  }
];

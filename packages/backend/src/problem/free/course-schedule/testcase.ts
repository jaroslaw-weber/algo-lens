import { CourseScheduleInput } from './types';

// Define test cases using the input interface and expecting a boolean output
export const testcases: { input: CourseScheduleInput; output: boolean }[] = [
  { // Original test case (assuming it's possible)
    input: {
      numCourses: 10,
      prerequisites: [ [1, 0], [2, 0], [3, 1], [3, 2], [4, 2], [5, 3], [5, 4], [6, 0], [7, 6], [8, 7], [9, 8] ],
    },
    output: true // Schedule is possible
  },
  { // Simple possible schedule
    input: { numCourses: 2, prerequisites: [[1, 0]] },
    output: true
  },
  { // Simple impossible schedule (cycle)
    input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] },
    output: false
  },
  { // No prerequisites
    input: { numCourses: 3, prerequisites: [] },
    output: true
  },
  { // More complex impossible schedule
     input: { numCourses: 4, prerequisites: [[1,0],[2,1],[3,2],[1,3]] },
     output: false // Cycle 1->2->3->1
  },
  { // Disconnected graph, possible
    input: { numCourses: 4, prerequisites: [[1,0],[3,2]] },
    output: true
  },
   { // Single course
    input: { numCourses: 1, prerequisites: [] },
    output: true
   }
];

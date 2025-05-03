import { ProblemState, TestCase, BooleanVariable } from 'algo-lens-core';
import { CourseScheduleInput } from './types';

export const testcases: TestCase<CourseScheduleInput, ProblemState>[] = [
  { // Original test case (assuming it's possible)
    input: {
      numCourses: 10,
      prerequisites: [ [1, 0], [2, 0], [3, 1], [3, 2], [4, 2], [5, 3], [5, 4], [6, 0], [7, 6], [8, 7], [9, 8] ],
    },
    expected: { // Expecting true (schedule possible)
      variables: [ { label: "result", type: "boolean", value: true } as BooleanVariable ]
    }
  },
  { // Simple possible schedule
    input: { numCourses: 2, prerequisites: [[1, 0]] },
    expected: { // Expecting true
      variables: [ { label: "result", type: "boolean", value: true } as BooleanVariable ]
    }
  },
  { // Simple impossible schedule (cycle)
    input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] },
    expected: { // Expecting false
      variables: [ { label: "result", type: "boolean", value: false } as BooleanVariable ]
    }
  },
  { // No prerequisites
    input: { numCourses: 3, prerequisites: [] },
    expected: { // Expecting true
      variables: [ { label: "result", type: "boolean", value: true } as BooleanVariable ]
    }
  },
  { // More complex impossible schedule
     input: { numCourses: 4, prerequisites: [[1,0],[2,1],[3,2],[1,3]] },
     expected: { // Expecting false (cycle 1->2->3->1)
         variables: [ { label: "result", type: "boolean", value: false } as BooleanVariable ]
     }
  }
];

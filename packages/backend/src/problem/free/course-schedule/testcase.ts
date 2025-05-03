import { TestCase } from 'algo-lens-core';
import { CourseScheduleInput } from './types'; // Assuming type { numCourses: number; prerequisites: number[][]; }

export const testcases: TestCase<CourseScheduleInput, boolean>[] = [
  // Existing cases (refactored format)
  {
    input: {
      numCourses: 10,
      prerequisites: [ [1, 0], [2, 0], [3, 1], [3, 2], [4, 2], [5, 3], [5, 4], [6, 0], [7, 6], [8, 7], [9, 8] ],
    },
    expected: true
  },
  {
    input: { numCourses: 2, prerequisites: [[1, 0]] },
    expected: true
  },
  {
    input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] },
    expected: false
  },
  {
    input: { numCourses: 3, prerequisites: [] },
    expected: true
  },
  {
     input: { numCourses: 4, prerequisites: [[1,0],[2,1],[3,2],[1,3]] }, // Cycle 1->3 ? No, 1->2->3 and 1->3. Let's check... 1->0 no cycle. 1->2->3 no cycle. 1->3 no cycle. Wait, the original comment said cycle 1->3, but the prereq is [1,3] meaning 1 depends on 3. The cycle is 1->2->3, then 1 depends on 3. So 1->2->3<-1. No cycle here. Let's assume the original intent was a cycle like [3,1]. Original comment: (cycle 1->2->3->1). Let's create that cycle: [[1,0],[2,1],[3,2],[0,3]]. Let's keep the original data but correct the expectation if needed. Prereqs: 1 needs 0; 2 needs 1; 3 needs 2; 1 needs 3. Yes, this is a cycle: 1->2->3->1. The original `expected: false` is correct.
     expected: false
  },

  // Added generated cases
  {
    input: { numCourses: 1, prerequisites: [] },
    expected: true
  },
  {
    input: { numCourses: 3, prerequisites: [[0, 1], [0, 2], [1, 2]] }, // 0 needs 1, 0 needs 2, 1 needs 2. Order: 2, 1, 0.
    expected: true
  },
  {
    input: { numCourses: 5, prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3]] }, // Linear: 0, 1, 2, 3, 4
    expected: true
  },
  {
    input: { numCourses: 3, prerequisites: [[0, 1], [1, 2], [2, 0]] }, // Cycle: 0->1->2->0
    expected: false
  },
  {
    input: { numCourses: 6, prerequisites: [[1, 0], [2, 1], [3, 1], [4, 2], [4, 3], [5, 4], [5, 0]] }, // Complex DAG
    expected: true
  },
  {
    input: { numCourses: 4, prerequisites: [[0, 1], [2, 3], [1, 2], [3, 0]] }, // Cycle: 0->1->2->3->0
    expected: false
  }
];

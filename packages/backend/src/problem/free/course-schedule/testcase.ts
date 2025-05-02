import { TestCase } from "algo-lens-core";
import { CourseScheduleInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type CourseScheduleOutput = boolean;

// Define the test cases for the canFinish function
export const testcases: Array<TestCase<CourseScheduleInput, CourseScheduleOutput>> = [
  {
    input: {
      numCourses: 2,
      prerequisites: [[1, 0]],
    },
    expected: true,
    description: "Simple case: Course 1 requires Course 0"
  },
  {
    input: {
      numCourses: 2,
      prerequisites: [[1, 0], [0, 1]],
    },
    expected: false,
    description: "Cyclic dependency: Courses 0 and 1 require each other"
  },
  {
    input: {
      numCourses: 5,
      prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3]],
    },
    expected: true,
    description: "Linear dependency chain"
  },
   {
    input: {
      numCourses: 3,
      prerequisites: [[0, 1], [0, 2], [1, 2]],
    },
    expected: true,
    description: "Multiple prerequisites for one course, no cycle"
   },
   {
    input: {
       numCourses: 1,
       prerequisites: [],
    },
    expected: true,
    description: "Edge case: Single course, no prerequisites"
   },
   {
     input: {
        numCourses: 4,
        prerequisites: [],
     },
     expected: true,
     description: "Multiple courses, no prerequisites"
   }
];

import { Problem, ProblemState } from "algo-lens-core";
import { courseSchedule, code } from "./code"; // Import the algorithm function and code string
import { CourseScheduleInput } from "./types"; // Import the input type
import { courseScheduleGroups } from "./groups"; // Import group definitions
import { courseScheduleVariables } from "./variables"; // Import variable definitions

const title = "Course Schedule";

// Define the input generation function
const getInput = (): CourseScheduleInput => ({
  numCourses: 10,
  prerequisites: [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [5, 4],
    [6, 0],
    [7, 6],
    [8, 7],
    [9, 8],
  ],
});

// Define the problem structure
export const problem: Problem<CourseScheduleInput, ProblemState> =
  {
    title: title,
    emoji: '📚',
    code: code, // Use the imported code string
    getInput: getInput,
    func: courseSchedule, // Use the imported algorithm function
    id: "course-schedule",
    tags: ["graph", "bfs", "topological-sort"],
    groupDefinition: courseScheduleGroups, // Add group definitions
    variableDefinition: courseScheduleVariables, // Add variable definitions
  };

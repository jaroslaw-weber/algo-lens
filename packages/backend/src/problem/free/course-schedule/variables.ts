import { VariableDefinition } from "algo-lens-core";

// Define the core variables used in the Course Schedule algorithm
export const courseScheduleVariables: VariableDefinition[] = [
  {
    id: "numCourses",
    name: "Number of Courses",
    type: "simple",
    description: "The total number of courses.",
  },
  {
    id: "prerequisites",
    name: "Prerequisites",
    type: "hashmap", // Representing as a map for visualization
    description: "List of prerequisite pairs [course, prerequisite].",
  },
  {
    id: "graph",
    name: "Adjacency List",
    type: "hashmap", // Representing the graph as a map for visualization
    description: "Graph representation where key is prerequisite and value is list of courses.",
  },
  {
    id: "inDegree",
    name: "In-Degree",
    type: "array",
    description: "Array storing the in-degree of each course.",
  },
  {
    id: "queue",
    name: "Queue",
    type: "array",
    description: "Queue storing courses with zero in-degree, ready to be processed.",
  },
  {
    id: "count",
    name: "Courses Finished",
    type: "value-group", // Part of a value group
    description: "Counter for the number of courses successfully processed.",
  },
  {
    id: "current",
    name: "Current Course",
    type: "simple",
    description: "The course currently being processed from the queue.",
  },
   {
    id: "prev", // Keep 'prev' as used in logStep, maps to neighbors conceptually
    name: "Neighbors",
    type: "array",
    description: "Neighbors of the current course being processed.",
  },
  {
    id: "neighbor",
    name: "Neighbor",
    type: "simple",
    description: "A neighbor of the current course.",
  },
  {
    id: "allCoursesTaken",
    name: "Result",
    type: "boolean-group", // Part of a boolean group
    description: "Indicates if all courses can be finished.",
  },
   {
    id: "course",
    name: "Course (from Prereq)",
    type: "simple",
    description: "Course being processed during graph initialization.",
  },
  {
    id: "prereq",
    name: "Prerequisite (from Prereq)",
    type: "simple",
    description: "Prerequisite being processed during graph initialization.",
  },
  {
    id: "deg",
    name: "Degree (In-Degree Check)",
    type: "simple",
    description: "In-degree value being checked during queue initialization.",
  }
  // Note: Visualization details like pointers (inDegreeIndex, prevIndex, etc.)
  // are handled dynamically in logStep, not defined statically here.
];

import { VariableMetadata } from "algo-lens-core"; // Updated import

// Define the core variables used in the Course Schedule algorithm
export const variables: VariableMetadata[] = [
  // Renamed export
  {
    name: "numCourses",
    label: "Number of Courses",
    description: "The total number of courses.",
    emoji: "📚",
  },
{
    name: "prerequisitesMap",
    label: "Prerequisites Map",
    description: "A list of prerequisite pairs. Each pair [a, b] indicates that course 'a' must be taken before course 'b'.",
    emoji: "🗺️",
  },
  {
    name: "graphMap",
    label: "Graph Map",
    description: "Hashmap representation of the courses. The keys are the courses, and the values are arrays of courses that have the key course as a prerequisite.",
    emoji: "📊",
  },
  {
    name: "inDegree",
    label: "In-Degree",
    description: "Array storing the in-degree of each course. The in-degree of a course is the number of prerequisites it has.",
    emoji: "🔢",
  },
  {
    name: "queue",
    label: "Queue",
    description: "A queue containing courses that have an in-degree of 0, meaning they have no prerequisites and can be taken.",
    emoji: "➡️",
  },
  {
    name: "count",
    label: "Courses Finished",
    description: "Counter for the number of courses successfully processed.",
    emoji: "✅",
  },
  {
    name: "current",
    label: "Current Course",
    description: "The course currently being processed from the queue.",
    emoji: "🎓",
  },
  {
    name: "neighbors",
    label: "Neighbors",
    description: "Neighbors of the current course being processed.",
    emoji: "🧑‍🤝‍🧑",
  },
  {
    name: "neighbor",
    label: "Neighbor",
    description: "A neighbor of the current course.",
    emoji: "👤",
  },
  {
    name: "result",
    label: "Result",
    description: "Indicates if all courses can be finished.",
    emoji: "🏁",
  },
  {
    name: "course",
    label: "Course (from Prereq)",
    description: "Course being processed during graph initialization.",
    emoji: "📖",
  },
  {
    name: "prereq",
    label: "Prerequisite (from Prereq)",
    description: "Prerequisite being processed during graph initialization.",
    emoji: "🔑",
  },
  {
    name: "deg",
    label: "Degree (In-Degree Check)",
    description: "In-degree value being checked during queue initialization.",
    emoji: "🔢",
  },
  // Note: Visualization details like pointers (inDegreeIndex, prevIndex, etc.)
  // are handled dynamically in logStep, not defined statically here.
  // Removed id and type properties
];

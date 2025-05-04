import { VariableMetadata } from "algo-lens-core"; // Updated import

// Define the core variables used in the Course Schedule algorithm
export const variables: VariableMetadata[] = [
  // Renamed export
  {
    name: "Number of Courses", // Kept name
    label: "Number of Courses", // Added label
    description: "The total number of courses.", // Kept description
    emoji: "📚", // Added emoji (example)
  },
  {
    name: "Prerequisites",
    label: "Prerequisites",
    description: "List of prerequisite pairs [course, prerequisite].",
    emoji: "🔗", // Added emoji (example)
  },
  {
    name: "Adjacency List",
    label: "Adjacency List",
    description:
      "Graph representation where key is prerequisite and value is list of courses.",
    emoji: "🗺️", // Added emoji (example)
  },
  {
    name: "In-Degree",
    label: "In-Degree",
    description: "Array storing the in-degree of each course.",
    emoji: "📉", // Added emoji (example)
  },
  {
    name: "Queue",
    label: "Queue",
    description:
      "Queue storing courses with zero in-degree, ready to be processed.",
    emoji: "➡️", // Added emoji (example)
  },
  {
    name: "Courses Finished",
    label: "Courses Finished",
    description: "Counter for the number of courses successfully processed.",
    emoji: "✅", // Added emoji (example)
  },
  {
    name: "Current Course",
    label: "Current Course",
    description: "The course currently being processed from the queue.",
    emoji: "🎓", // Added emoji (example)
  },
  {
    name: "Neighbors",
    label: "Neighbors",
    description: "Neighbors of the current course being processed.",
    emoji: "🧑‍🤝‍🧑", // Added emoji (example)
  },
  {
    name: "Neighbor",
    label: "Neighbor",
    description: "A neighbor of the current course.",
    emoji: "👤", // Added emoji (example)
  },
  {
    name: "Result",
    label: "Result",
    description: "Indicates if all courses can be finished.",
    emoji: "🏁", // Added emoji (example)
  },
  {
    name: "Course (from Prereq)",
    label: "Course (from Prereq)",
    description: "Course being processed during graph initialization.",
    emoji: "📖", // Added emoji (example)
  },
  {
    name: "Prerequisite (from Prereq)",
    label: "Prerequisite (from Prereq)",
    description: "Prerequisite being processed during graph initialization.",
    emoji: "🔑", // Added emoji (example)
  },
  {
    name: "Degree (In-Degree Check)",
    label: "Degree (In-Degree Check)",
    description: "In-degree value being checked during queue initialization.",
    emoji: "🔢", // Added emoji (example)
  },
  // Note: Visualization details like pointers (inDegreeIndex, prevIndex, etc.)
  // are handled dynamically in logStep, not defined statically here.
  // Removed id and type properties
];

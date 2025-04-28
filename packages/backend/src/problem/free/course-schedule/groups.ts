import { GroupDefinition } from "algo-lens-core";

// Define groups for visualizing the Course Schedule problem state
export const courseScheduleGroups: GroupDefinition[] = [
  {
    id: "input",
    title: "Input",
    variables: ["numCourses", "prerequisites"],
    emoji: "📥",
  },
  {
    id: "state",
    title: "Algorithm State",
    variables: ["graph", "inDegree", "queue", "count"],
    emoji: "📊",
  },
  {
    id: "processing",
    title: "Current Processing",
    variables: ["current", "neighbor", "prev"], // Added 'prev' based on logStep usage
    emoji: "⚙️",
  },
  {
    id: "result",
    title: "Result",
    variables: ["allCoursesTaken"],
    emoji: "🏁",
  },
  // Add other potential simple value variables used in logging
  {
      id: "tempValues",
      title: "Temporary Values",
      variables: ["course", "prereq", "deg"],
      emoji: "🧪",
  }
];

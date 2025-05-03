import { GroupMetadata } from "algo-lens-core";

// Define groups for visualizing the Course Schedule problem state
export const courseScheduleGroups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    emoji: "📥",
  },
  {
    name: "state",
    label: "Algorithm State",
    emoji: "📊",
  },
  {
    name: "processing",
    label: "Current Processing",
    // variables: ["current", "neighbor", "prev"], // Added 'prev' based on logStep usage
    emoji: "⚙️",
  },
  {
    name: "result",
    label: "Result",
    emoji: "🏁",
  },
  // Add other potential simple value variables used in logging
  {
      name: "tempValues",
      label: "Temporary Values",
      emoji: "🧪",
  }
];

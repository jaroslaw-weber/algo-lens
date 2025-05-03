import { GroupMetadata } from "algo-lens-core";

// Define groups for visualizing the Course Schedule problem state
export const courseScheduleGroups: GroupMetadata[] = [
  {
    label: "Input",
    emoji: "📥",
  },
  {
    label: "Algorithm State",
    emoji: "📊",
  },
  {
    label: "Current Processing",
    // variables: ["current", "neighbor", "prev"], // Added 'prev' based on logStep usage
    emoji: "⚙️",
  },
  {
    label: "Result",
    emoji: "🏁",
  },
  // Add other potential simple value variables used in logging
  {
      label: "Temporary Values",
      emoji: "🧪",
  }
];

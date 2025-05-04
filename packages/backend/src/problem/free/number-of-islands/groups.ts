
import { GroupMetadata } from "algo-lens-core";

/**
 * Metadata for the visualizer groups used in the Number of Islands problem.
 * This defines how different aspects of the algorithm's state are grouped and displayed.
 */
export const groups: GroupMetadata[] = [
  {
    id: "grid",
    label: "Grid State",
    description: "The input grid showing land ('1') and water ('0').",
    emoji: "🗺️",
  },
  {
    id: "traversal",
    label: "Traversal Pointer",
    description: "Current cell being explored (row, col).",
    emoji: "📍",
  },
  {
    id: "islandCount",
    label: "Island Count",
    description: "Number of distinct islands found.",
    emoji: "🏝️",
  },
];
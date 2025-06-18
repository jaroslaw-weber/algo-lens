import { GroupMetadata } from "algo-lens-core/src/types";


export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "Input intervals and the new interval to insert.",
    emoji: "📥",
  },
  {
    name: "result_array",
    label: "Result Array",
    description: "The array being built with merged intervals.",
    emoji: "📋",
  },
  {
    name: "loop_merging",
    label: "Loop/Merging",
    description: "Variables used during iteration and merging.",
    emoji: "⚙️",
  },
];

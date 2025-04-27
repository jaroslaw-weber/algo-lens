// Define a simple interface for VariableGroup if not available globally
interface VariableGroup {
  name: string;
  label: string;
  description: string;
}

export const groups: VariableGroup[] = [
  {
    name: "input",
    label: "Input",
    description: "Input intervals and the new interval to insert.",
  },
  {
    name: "result_array",
    label: "Result Array",
    description: "The array being built with merged intervals.",
  },
  {
    name: "loop_merging",
    label: "Loop/Merging",
    description: "Variables used during iteration and merging.",
  },
];

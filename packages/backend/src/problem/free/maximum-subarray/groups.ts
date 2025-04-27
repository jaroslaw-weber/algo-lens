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
    description: "Input array for the problem.",
  },
  {
    name: "kadane_vars", // Changed from kandane for consistency
    label: "Kadane's Variables",
    description: "Variables used in Kadane's algorithm.",
  },
  {
    name: "loop",
    label: "Loop",
    description: "Variables related to the iteration.",
  },
];

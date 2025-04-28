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
    description: "Input parameters for the problem.",
    emoji: "📥",
  },
  {
    name: "dp_table",
    label: "DP Table",
    description: "Dynamic programming table storing intermediate results.",
    emoji: "📊",
  },
  {
    name: "loops",
    label: "Loops",
    description: "Variables related to the main loops.",
    emoji: "🔁",
  },
  {
    name: "result",
    label: "Result",
    description: "Final result of the computation.",
    emoji: "🏁",
  },
];

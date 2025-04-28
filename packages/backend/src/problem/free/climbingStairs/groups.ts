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
    description: "Input value for the problem.",
    emoji: "📥",
  },
  {
    name: "computation",
    label: "Computation",
    description: "Variables used during computation.",
    emoji: "⚙️",
  },
];

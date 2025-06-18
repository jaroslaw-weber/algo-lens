# Groups Guidelines

The `groups.ts` file defines logical categories for variables, which are used to organize and display them effectively in the visualization.

---

## 1. Purpose

To define logical groupings for variables (e.g., "Input", "Computation", "Result") that enhance the clarity and organization of the algorithm visualization. These groups help users understand the role of different variables at a glance.

---

## 2. Structure

The `groups.ts` file should export an array of `GroupMetadata` objects. Each `GroupMetadata` object defines a variable group:

- **`name` (string):** A unique identifier for the group (e.g., "input", "computation"). This name is used internally to associate variables with their respective groups.
- **`label` (string):** The display name for the group, shown in the user interface (e.g., "Input", "Computation").
- **`description` (string):** A brief explanation of what variables belong to this group.
- **`emoji` (string, optional):** An emoji to visually represent the group in the UI.

---

## 3. Example Template

```ts
import { GroupMetadata } from "algo-lens-core/src/types";


export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "Variables representing the initial input to the algorithm.",
    emoji: "📥",
  },
  {
    name: "computation",
    label: "Computation",
    description: "Variables that change or are used during the algorithm's execution.",
    emoji: "⚙️",
  },
  {
    name: "result",
    label: "Result",
    description: "Variables holding the final output or result of the algorithm.",
    emoji: "✅",
  },
];
```

---

## 4. Best Practices

- **Clear Naming:** Use `name` and `label` that clearly reflect the purpose of the group.
- **Logical Grouping:** Group variables based on their role in the algorithm (e.g., all input parameters in "Input").
- **Consistency:** Maintain consistent group names and labels across different problems where applicable.
- **Concise Descriptions:** Keep descriptions brief but informative.
- **Use Emojis:** Emojis can enhance visual appeal and quick recognition.

---

## 5. Common Mistakes

- Misinterpreting the purpose of `groups.ts` (it's for variable display, not test cases).
- Using vague or unhelpful group names/labels.
- Not assigning variables to appropriate groups in `variables.ts` (or `StepLoggerV2` calls).
- Overlapping group definitions or redundant groups.

---

By following these guidelines, you will create a well-organized and intuitive visualization experience for users by logically categorizing algorithm variables.
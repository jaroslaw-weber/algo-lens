# Variables Guidelines

The `variables.ts` file provides metadata for individual variables that appear in the algorithm visualization. This metadata includes a display label, a detailed description, and an optional emoji, enhancing clarity for users.

---

## 1. Purpose

To define metadata (display name, description, emoji) for each significant variable used in the algorithm's visualization. This helps users understand the role and meaning of each variable as they follow the step-by-step execution.

---

## 2. Structure

The `variables.ts` file should export an array of `VariableMetadata` objects. Each `VariableMetadata` object describes a single variable:

- **`name` (string):** The exact name of the variable as it appears in the code (e.g., `n`, `dp`, `i`, `result`). This is used for internal mapping.
- **`label` (string):** The display name for the variable, shown in the user interface (e.g., "Target Step", "DP Array", "Loop Counter").
- **`description` (string):** A clear and concise explanation of the variable's purpose, what it represents, and how it's used in the algorithm.
- **`emoji` (string, optional):** An emoji to visually represent the variable in the UI (e.g., "🎯", "🔢", "🔄", "🏁").

---

## 3. Example Template

```ts
import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "n",
    label: "Target Step",
    description: "The target step number for which we want to find the number of ways.",
    emoji: "🎯",
  },
  {
    name: "dp",
    label: "DP Array",
    description: "Dynamic programming array where dp[i] stores the number of ways to reach step i.",
    emoji: "🔢",
  },
  {
    name: "i",
    label: "Loop Counter",
    description: "The current step number being processed in the iteration.",
    emoji: "🔄",
  },
  {
    name: "result",
    label: "Final Result",
    description: "The total number of unique ways to reach the nth step.",
    emoji: "🏁",
  },
];
```

---

## 4. Best Practices

- **Exact `name` Match:** Ensure the `name` property exactly matches the variable name used in `steps.ts` and `problem.ts`.
- **Clear `label`:** The `label` should be user-friendly and descriptive, even if the `name` is a common abbreviation.
- **Comprehensive `description`:** Explain the variable's role, its contents (especially for data structures), and how it contributes to the algorithm.
- **Relevant `emoji`:** Choose emojis that intuitively represent the variable's meaning or type.
- **All Key Variables:** Include metadata for all variables that are logged or are crucial for understanding the algorithm's state.

---

## 5. Common Mistakes

- Mismatch between `name` in `variables.ts` and actual variable names in code.
- Vague or unhelpful `label` or `description`.
- Omitting metadata for important variables.
- Using emojis that don't clearly relate to the variable.
- Confusing `variables.ts` with `groups.ts` (which defines categories for variables, not individual variable metadata).

---

By following these guidelines, you will provide rich, informative metadata for variables, significantly improving the clarity and educational value of algorithm visualizations.
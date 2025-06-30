# Variables Guidelines

The `variables.ts` file provides metadata for individual variables that appear in the algorithm visualization. This metadata includes a display label, a detailed description, and an optional emoji, enhancing clarity for users.

---

## 1. Purpose

To define metadata (display name, description, emoji) for each significant variable used in the algorithm's visualization. This helps users understand the role and meaning of each variable as they follow the step-by-step execution.

---

## 2. Structure

The `variables.ts` file should export an array of `VariableMetadata` objects. Each `VariableMetadata` object describes a single variable:

- **`name` (string):** The exact name of the variable as it appears in the code (e.g., `n`, `dp`, `i`, `result`). This is used for internal mapping and **must** match the code.
- **`label` (string):** The human-readable display name for the variable, shown in the user interface (e.g., "Target Step", "DP Array", "Current Index"). This field is **highly recommended** for all variables to ensure clarity in the UI, even if it's similar to the `name`.
- **`description` (string):** A clear and concise explanation of the variable's purpose, what it represents, and how it's used in the algorithm.
- **`emoji` (string, optional):** An emoji to visually represent the variable in the UI (e.g., "🎯", "🔢", "🔄", "🏁").

---

## 3. Example Template

```ts
import { VariableMetadata } from "algo-lens-core/src/types";


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

- **Exact `name` Match:** Ensure the `name` property exactly matches the variable name used in `steps.ts` when logging (e.g., `l.simple({ myVar: ... })` means `name: "myVar"`).
- **Provide `label`:** Always provide a `label`. While it can be similar to `name` for self-descriptive variable names, it's good practice to define it explicitly for UI consistency.
- **Comprehensive `description`:** Explain the variable's role, its contents (especially for data structures), and how it contributes to the algorithm.
- **Relevant `emoji`:** Choose emojis that intuitively represent the variable's meaning or type.
- **All Logged Variables:** Include metadata for all variables that are logged with `StepLoggerV2` and are intended to be visible and understandable to the user.

---

## 5. Common Mistakes

- Mismatch between `name` in `variables.ts` and actual variable names in code.
- Vague or unhelpful `label` or `description`.
- Omitting metadata for important variables.
- Using emojis that don't clearly relate to the variable.
- Confusing `variables.ts` with `groups.ts` (which defines categories for variables, not individual variable metadata).

---

By following these guidelines, you will provide rich, informative metadata for variables, significantly improving the clarity and educational value of algorithm visualizations.
# Problem Guidelines

The `problem.ts` file defines the core metadata and structure for an algorithmic problem. Adhering to these guidelines ensures consistency and clarity across problem definitions.

---

## 1. Purpose

To define the problem's unique identifier, title, difficulty, associated tags, and references to its primary function logic (`steps.ts`), test cases (`testcase.ts`), variables (`variables.ts`), and types (`types.ts`). It acts as a central hub for all problem-related metadata and links.

---

## 2. Structure

A good `problem.ts` file should define a `Problem` object, typically including:

-   **`id`**: A unique string identifier for the problem (e.g., "two-sum", "3sum").
-   **`title`**: A human-readable title for the problem.
-   **`emoji`**: An emoji representing the problem.
-   **`difficulty`**: The problem's difficulty level (e.g., "easy", "medium", "hard").
-   **`tags`**: An array of strings categorizing the problem (e.g., "Array", "Hash Map", "Two Pointers").
-   **`generateSteps`**: A function imported from `steps.ts` that generates the visualization steps for the problem.
-   **`testcases`**: An array of test cases imported from `testcase.ts`.
-   **`explanation`**: The content of the problem's explanation, typically loaded from `explanation.md`.
-   **`variables`**: Problem-specific variables imported from `variables.ts`.
-   **`groups`**: Problem-specific groups imported from `groups.ts`.
-   **`codeGenerationSignature`**: An object defining the function signature for code generation, referencing the function in `steps.ts`.
-   **Core Imports:** Core problem-related types and utilities (like `Problem`) should be imported from `"algo-lens-core"`.

---

## 3. Example Template

```ts
import { Problem } from '../../types/problem';
import { generateSteps } from './steps';
import { testcases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { explanation } from './explanation.md';
import { ExampleType } from './types'; // Example of importing a type

export const problem: Problem<ExampleType> = {
  id: 'example-problem',
  title: 'Example Problem Title',
  emoji: '💡',
  difficulty: 'medium',
  tags: ['Array', 'Logic'],
  generateSteps,
  testcases,
  explanation,
  variables,
  groups,
  codeGenerationSignature: {
    signature: 'function exampleFunction(input: ExampleType): number[]',
    name: 'exampleFunction',
  },
};
```

---

## 4. Best Practices

-   **Modularity:** Keep the `problem.ts` file focused on defining the problem's metadata and linking to other files. The actual step-by-step logic, types, test cases, and variables should reside in their respective dedicated files (`steps.ts`, `types.ts`, `testcase.ts`, `variables.ts`, `groups.ts`).
-   **Consistency:** Follow established coding conventions and style guides.
-   **Clear Referencing:** Ensure all imported components (steps, testcases, variables, types, explanation) are correctly referenced and aligned with the problem's definition.

---

## 5. Common Mistakes

-   Placing the entire solution logic or function implementation directly in `problem.ts` instead of delegating to `steps.ts` for visualization.
-   Defining problem-specific types, test cases, or variables directly in `problem.ts` instead of importing them from `types.ts`, `testcase.ts`, or `variables.ts` respectively.
-   Missing or incorrect references to required external files (e.g., `steps.ts`, `testcase.ts`).

---

By adhering to these guidelines, you will create well-defined and consistent problem definitions that integrate seamlessly with the visualization system.
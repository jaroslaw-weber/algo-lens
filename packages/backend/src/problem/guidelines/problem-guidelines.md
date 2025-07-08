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
import { Problem, ProblemState } from "algo-lens-core/src/types"; // Adjusted import
import { generateSteps } from './steps';
import { testcases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
// Assuming types.ts defines YourProblemInputType and YourProblemReturnType
import { YourProblemInputType } from './types';

// description.md and explanation.md are now loaded dynamically by the backend.
// They no longer need to be read and included in this file.

export const problem: Problem<YourProblemInputType, ProblemState> = {
  // Core Metadata
  id: 'your-problem-id', // Use kebab-case (e.g., "two-sum", "longest-substring")
  title: 'Your Problem Title',
  emoji: '💡', // Choose a relevant emoji
  difficulty: 'medium', // 'easy', 'medium', or 'hard'
  tags: ['Array', 'Logic', 'YourProblemTag'], // Relevant algorithm tags

  // Core Logic & Test Cases
  func: generateSteps, // Function from steps.ts that generates visualization steps
  testcases,         // Imported from testcase.ts

  // Visualization Metadata
  metadata: {
    variables, // Imported from variables.ts
    groups,    // Imported from groups.ts
  },

  // Code Generation Signature (for potential future use or external tools)
  codeGenerationSignature: {
    // Name of the function users would typically implement
    name: 'yourProblemFunction',
    // Full TypeScript signature of that function
    signature: 'function yourProblemFunction(input: YourProblemInputType): YourProblemReturnType',
  },
};
```

---

## 4. Best Practices

-   **`id` Casing**: Use `kebab-case` for problem `id` strings (e.g., "two-sum", "merge-intervals") for consistency with the plop generator and general URL/file naming conventions.
-   **Markdown Content**:
    -   `description.md` and `explanation.md` files should be present in the problem's directory.
    -   Their content is now dynamically loaded by the backend when a problem is requested. It no longer needs to be manually read in `problem.ts`.
-   **`metadata` Object**: Place `variables` and `groups` inside the `metadata` object as per common practice.
-   **`codeGenerationSignature`**:
    -   Use the property name `codeGenerationSignature`.
    -   Ensure it includes both `name` (the typical function name a user would write, e.g., `twoSum`) and `signature` (the full TypeScript signature of such a function).
-   **Modularity:** Keep the `problem.ts` file focused on defining the problem's metadata and linking to other files. The actual step-by-step logic (`steps.ts`), types (`types.ts`), test cases (`testcase.ts`), variables (`variables.ts`), and groups (`groups.ts`) should reside in their respective dedicated files.
-   **Consistency:** Follow established coding conventions and style guides.
-   **Clear Referencing:** Ensure all imported components are correctly referenced.

---

## 5. Common Mistakes

-   Inconsistent `id` casing.
-   Not including `description` content in the problem object.
-   Placing `variables` or `groups` at the top level instead of within `metadata`.
-   Using `codegen` instead of `codeGenerationSignature`, or omitting the `name` field within it.
-   Typos in the function name within `codeGenerationSignature.name` (e.g., `threeSteps` instead of `threeSum`).
-   Placing the entire solution logic or function implementation directly in `problem.ts`.
-   Defining problem-specific types, test cases, or variables directly in `problem.ts`.

---

By adhering to these guidelines, you will create well-defined and consistent problem definitions that integrate seamlessly with the visualization system.
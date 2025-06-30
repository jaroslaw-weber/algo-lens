# AlgoLens Problem Contribution Guidelines

This directory contains detailed guidelines for contributing new algorithmic problems to AlgoLens. Adhering to these guidelines ensures consistency, clarity, and high quality across all problem definitions and visualizations.

---

## Core Guidelines

These guidelines cover fundamental aspects of problem definition and visualization:

- [**Steps Guidelines**](./steps-guidelines.md): Comprehensive guide for writing algorithm steps and comments for visualization in `steps.ts`, including `StepLoggerV2` usage, examples, and best practices.
- [**Variables Guidelines**](./variables-guidelines.md): Best practices for describing and managing variables in `variables.ts`, crucial for accurate visualization.
- [**Common Issues and Troubleshooting**](./common-issues-guidelines.md): A guide to common errors and their solutions encountered during problem creation and fixing.

---

## Problem Folder File Guidelines

This section provides links to detailed guidelines for the various files found within each problem folder (e.g., `packages/backend/src/problem/free/3sum/`). Each file plays a specific role in defining and supporting a problem.

- [**Description Guidelines**](./description-guidelines.md): Guidelines for crafting clear, concise, and complete problem descriptions in `description.md`, including structure, examples, and constraints.
- [**Explanation Guidelines**](./explanation-guidelines.md): Guidelines for writing insightful explanations of solution logic and approach in `explanation.md`, covering structure, complexity, and best practices.
- [**Groups Guidelines**](./groups-guidelines.md): Guidelines for defining logical groupings of test cases in `groups.ts`, enhancing test organization and coverage.
- [**Index Test Guidelines**](./index-test-guidelines.md): Guidelines for writing comprehensive and well-structured unit tests in `index.test.ts`, ensuring solution correctness.
- [**Problem Guidelines**](./problem-guidelines.md): Guidelines for defining the problem's core structure and function signature in `problem.ts`, including type annotations and JSDoc.
- [**Testcase Guidelines**](./testcase-guidelines.md): Guidelines for defining diverse and effective test cases in `testcase.ts`, critical for thorough problem validation.
- [**Types Guidelines**](./types-guidelines.md): Guidelines for defining custom types and interfaces in `types.ts`, ensuring type safety and clarity.
- [**Code Guidelines (`code/`)**](./code-guidelines.md): Guidelines for the optional `code/` directory, which can house supplementary code like solutions in other languages.
- [**Podcast Script Guidelines (`podcast_script.md`)**](./podcast-script-guidelines.md): Guidelines for creating optional, engaging podcast-style scripts in `podcast_script.md`.

---

## General Coding Style and Practices

Across all files related to a problem contribution, please adhere to the following general practices:

-   **Remove Unused Imports:** Ensure that your TypeScript/JavaScript files do not contain any unused imports. Linters and IDEs can usually help identify these.
-   **Clean Code:** Write clean, readable, and well-commented code, especially within `steps.ts` to make the logic easy to follow.
-   **Follow Specific Guidelines:** Prioritize adherence to the detailed guidelines provided for each specific file type.

---

## Contributing New Problems with the Plop Generator

To streamline the process of adding new problems, a Plop generator has been set up. This generator will create the necessary file structure and basic template files for a new problem.

To use the generator, run the following command from the project root:

```bash
bun plop problem
```

You will be prompted to enter the name of the problem (e.g., `two-sum`). The generator will then create a new directory for the problem in `packages/problem-free/` with all the required files.

After running the generator, you will need to fill in the details in each of the generated files according to the guidelines provided in the sections above.

---

By following these guidelines, contributors can ensure that new problems are well-defined, thoroughly tested, and effectively visualized within the AlgoLens platform.
# Index Test Guidelines

The `index.test.ts` file serves as the standardized entry point for running all defined test cases for a specific problem. It integrates with the testing framework to execute the problem's test suite.

---

## 1. Purpose

To provide a consistent and automated way to run all test cases defined for a problem, leveraging the `runTests` utility from the core testing framework. This file is not for writing individual unit tests for the solution logic, but rather for orchestrating the execution of pre-defined test cases.

---

## 2. Structure

The `index.test.ts` file should be minimal and follow a specific template:

- **Import `it` from `bun:test`:** For defining a test block.
- **Import `problem`:** The problem definition object from `problem.ts`.
- **Import `runTests`:** The utility function from `../../core/test`.
- **Single Test Block:** A single `it` block that calls `runTests` with the `problem` object.

---

## 3. Example Template

```ts
import { it } from "bun:test";
import { problem } from "./problem"; // Import the problem definition
import { runTests } from "algo-lens-core/src/test"; // Import the test runner utility

it(problem.id, async () => {
  await runTests(problem);
});
```

---

## 4. Explanation

- **`problem.id`:** Used as the name for the test block, ensuring unique and identifiable test runs.
- **`runTests(problem)`:** This function takes the `problem` object (which contains references to `testcases.ts` and the solution function) and executes all defined test cases against the problem's solution. It handles assertions and reports results.

---

## 5. Best Practices

- **Adhere to Template:** Always use the provided template to ensure consistency and compatibility with the testing framework.
- **No Custom Logic:** Avoid adding any custom test logic or individual `expect` assertions directly in this file. All test case definitions and expected outputs should reside in `testcase.ts`.
- **Focus on Orchestration:** This file's role is purely to orchestrate the running of the problem's test cases.

---

## 6. Common Mistakes

- Adding custom unit tests directly into `index.test.ts`.
- Modifying the `runTests` call or its parameters.
- Not importing `problem` or `runTests` correctly.

---

By following these guidelines, you ensure that problem test suites are consistently executed and integrated into the overall testing infrastructure.
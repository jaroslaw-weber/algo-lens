# Testcase Guidelines

Test cases are fundamental for validating the correctness of a problem solution. These guidelines ensure that test cases are well-defined, comprehensive, and easy to understand.

---

## 1. Purpose

To define the specific input and expected output for each test case, allowing for automated verification of the problem solution.

---

## 2. Structure

Each test case **must** be an object adhering to the `TestCase` type imported from `algo-lens-core/src/types`. It should have the following properties:

-   **`name` (string):** A unique, descriptive name for the test case (e.g., "Basic positive numbers", "Empty array input").
-   **`description` (string):** A clear and concise explanation of what this specific test case is testing.
-   **`input` (object):**
    -   This **must** be an object where keys are the parameter names of the problem's main function (as defined in `steps.ts` and `types.ts`).
    -   For example, if the function is `twoSum(nums: number[], target: number)`, the input object should be `{ nums: [...], target: ... }`.
    -   Even for functions with a single parameter (e.g., `climbStairs(n: number)`), use an object: `{ n: 5 }`. This consistency is important.
-   **`expected` (any):** The expected output from the problem's function for the given input. The type of this will depend on the problem's return type.
-   **`isDefault` (boolean, optional):** If `true`, this test case might be preferentially shown or used by default in the UI. Only one test case should be marked as default.

---

## 3. Example Template

```ts
import { TestCase } from "algo-lens-core/src/types";
// Assuming YourProblemInputType is defined in ./types.ts
// e.g., interface YourProblemInputType { nums: number[]; target: number; }
// Assuming YourProblemReturnType is the expected output type, e.g., number[] or ProblemState
import { YourProblemInputType, YourProblemReturnType } from "./types";

export const testcases: TestCase<YourProblemInputType, YourProblemReturnType>[] = [
  {
    name: "Example 1: Basic Case",
    description: "A fundamental scenario testing the primary logic.",
    input: { nums: [2, 7, 11, 15], target: 9 }, // Input is an object
    expected: [0, 1],
    isDefault: true,
  },
  {
    name: "Example 2: No Solution",
    description: "Tests behavior when no solution exists.",
    input: { nums: [1, 2, 3], target: 7 },
    expected: [], // Or appropriate "no solution" output
  },
  {
    name: "Edge Case: Empty Array",
    description: "Tests handling of an empty input array.",
    input: { nums: [], target: 5 },
    expected: [],
  },
  // Example for a single argument function like climbStairs(n: number)
  {
    name: "Climbing Stairs: n = 3",
    description: "Test case for 3 stairs.",
    input: { n: 3 }, // Input is still an object
    expected: 3,
  }
];
```

---

## 4. Best Practices

-   **Object Inputs:** Always structure the `input` field as an object, with keys matching the parameter names of your function in `steps.ts`.
-   **Type Safety:**
    -   Always import the `TestCase` type from `algo-lens-core/src/types`.
    -   Explicitly type your `testcases` array: `const testcases: TestCase<MyInputType, MyOutputType>[] = [...]`.
    -   Ensure `MyInputType` (imported from `./types.ts`) correctly defines the structure of your input object.
-   **Variety:**
    Include a diverse set of test cases covering:
    -   Basic/typical scenarios.
    -   Edge cases (e.g., empty inputs, single elements, boundary values).
    -   Cases that test different logical paths in your solution.
    -   Large inputs if performance is a consideration (though step generation limits might apply).
-   **Clarity:**
    Ensure the `name` and `description` clearly explain the purpose and scenario of each test case.
-   **Accuracy:**
    The `expected` output must be precisely correct for the given `input`.
-   **`isDefault`:** Use `isDefault: true` sparingly for one representative test case.

---

## 5. Common Mistakes

- Insufficient number of test cases.
- Not covering edge cases.
- Incorrect `expected` outputs.
- Vague or missing test case descriptions.
- Inconsistent input variable names or types.

---

By following these guidelines, you will create robust and reliable test cases that thoroughly validate the correctness of your problem solutions.
# Testcase Guidelines

Test cases are fundamental for validating the correctness of a problem solution. These guidelines ensure that test cases are well-defined, comprehensive, and easy to understand.

---

## 1. Purpose

To define the specific input and expected output for each test case, allowing for automated verification of the problem solution.

---

## 2. Structure

Each test case should be an object with the following properties:

- **`name` (string):** A unique name for the test case.
- **`description` (string):** A clear and concise description of what this test case is testing (e.g., "basic positive numbers", "empty array", "large input").
- **`input` (object):** An object containing the input variables for the problem's function. The keys should match the parameter names of the problem's function.
- **`expected` (any):** The expected output from the problem's function for the given input.

---

## 3. Example Template

```ts
import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { ThreeSumInput } from "./types";

export const testcases: TestCase<ThreeSumInput, ProblemState>[] = [
  {
    name: "Basic Positive",
    description: "This test case covers a fundamental scenario with an array of positive integers and a target sum that can be achieved by summing two elements within the array. It validates the basic functionality of finding the correct indices.",
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1],
    isDefault: true,
  },
  {
    name: "Negative Numbers",
    description: "This test case evaluates the solution's ability to handle arrays containing negative numbers. The target sum is also negative, requiring the algorithm to correctly identify two negative numbers that sum up to the target.",
    input: { nums: [-1, -2, -3, -4], target: -3 },
    expected: [0, 1],
  },
  {
    name: "Empty Array",
    description: "This test case specifically checks the behavior of the solution when provided with an empty input array. It ensures that the algorithm gracefully handles this edge case and returns an empty result as expected.",
    input: { nums: [], target: 0 },
    expected: [],
  },
  {
    name: "Single Element",
    description: "This test case examines the solution's response to an array containing only a single element. It's crucial for verifying edge case handling where a pair cannot be formed.",
    input: { nums: [5], target: 5 },
    expected: [], // Or appropriate expected output for single element
  },
  {
    name: "Large Input",
    description: "This test case is designed to assess the performance and efficiency of the solution when dealing with a very large input array. It helps identify potential bottlenecks or scalability issues.",
    input: { nums: Array.from({ length: 10000 }, (_, i) => i), target: 19999 },
    expected: [9999, 10000],
  },
];
```

---

## 4. Best Practices

- **Variety:**  
  Include a diverse set of test cases covering:
    - Basic/typical scenarios.
    - Edge cases (e.g., empty inputs, single elements, boundary values, nulls/undefineds if applicable).
    - Large inputs to test performance.
    - Invalid inputs (if the problem specifies how to handle them).

- **Clarity:**  
  Ensure the `description` clearly explains the purpose of each test case.

- **Accuracy:**  
  The `expected` output must be precisely correct for the given `input`.

- **Consistency:**  
  Maintain consistent naming and typing for `input` variables as defined in `problem.ts`.

---

## 5. Common Mistakes

- Insufficient number of test cases.
- Not covering edge cases.
- Incorrect `expected` outputs.
- Vague or missing test case descriptions.
- Inconsistent input variable names or types.

---

By following these guidelines, you will create robust and reliable test cases that thoroughly validate the correctness of your problem solutions.
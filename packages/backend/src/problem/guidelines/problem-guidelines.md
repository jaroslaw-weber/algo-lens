# Problem Guidelines

The `problem.ts` file defines the core function signature and structure for an algorithmic problem. Adhering to these guidelines ensures consistency and clarity.

---

## 1. Purpose

To define the problem's primary function signature, its input/output types, and any related interfaces or classes necessary for the problem's definition.

---

## 2. Structure

A good `problem.ts` file should include:

- **Function Signature:**  
  Clearly define the main function that solves the problem, including type annotations for parameters and return value.

- **JSDoc Comments:**  
  Provide comprehensive JSDoc comments for the main function, explaining its purpose, parameters, and return value.

- **Related Interfaces/Classes:**  
  Define any necessary interfaces or classes that are specific to the problem's input, output, or internal data structures, with clear property descriptions.

---

## 3. Example Template

```ts
/**
 * Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * @param nums - An array of integers.
 * @param target - The target sum.
 * @returns An array of two integers representing the indices.
 */
export function twoSum(nums: number[], target: number): number[] {
  // Problem solution logic goes here
  // This function should typically call the `generateSteps` function from `steps.ts`
  // to produce the visualization steps.
  // Example:
  // const steps = generateSteps(nums, target);
  // return steps[steps.length - 1].result; // Assuming the last step contains the result
  return []; // Placeholder
}

// Example of a related interface if needed
// export interface MyProblemInput {
//   data: number[];
//   config: {
//     mode: string;
//   };
// }
```

---

## 4. Best Practices

- **Type Safety:**  
  Always use explicit type annotations for all function parameters, return values, and any defined interfaces/classes.

- **Clear Naming:**  
  Use descriptive names for functions, parameters, and types.

- **Modularity:**  
  Keep the `problem.ts` file focused on defining the problem's interface. The actual step-by-step logic should reside in `steps.ts`.

- **Consistency:**  
  Follow established coding conventions and style guides.

---

## 5. Common Mistakes

- Missing type annotations.
- Incomplete or unclear JSDoc comments.
- Placing the entire solution logic directly in `problem.ts` instead of delegating to `steps.ts` for visualization.
- Defining problem-specific types in `problem.ts` instead of `types.ts`.

---

By adhering to these guidelines, you will create well-defined and consistent problem interfaces that integrate seamlessly with the visualization system.
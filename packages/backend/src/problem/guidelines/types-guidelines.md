# Types Guidelines

Defining custom TypeScript types and interfaces ensures type safety, improves code readability, and facilitates better understanding of data structures within a problem.

---

## 1. Purpose

To define any custom TypeScript types or interfaces that are specific to the problem's input, output, or internal data structures, promoting type safety and clarity.

---

## 2. Structure

A good `types.ts` file should include:

- **Clear Type Definitions:**  
  Define interfaces or type aliases for complex data structures.

- **Descriptive Names:**  
  Use names that clearly indicate the purpose of the type (e.g., `ListNode`, `TreeNode`, `Interval`).

- **Comments:**  
  Include JSDoc comments explaining the purpose of each type and its properties.

---

## 3. Example Template

```ts
/**
 * Definition for a singly-linked list.
 */
export interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * Definition for a binary tree node.
 */
export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Represents an interval with a start and end value.
 */
export type Interval = [number, number];

/**
 * Custom input type for a problem.
 */
export interface MyProblemInput {
  data: number[];
  config: {
    mode: "strict" | "loose";
    maxItems: number;
  };
}
```

---

## 4. Best Practices

- **Specificity:**  
  Define types as specifically as possible to leverage TypeScript's type-checking capabilities.

- **Reusability:**  
  If a type is used across multiple problems, consider defining it in a shared location (e.g., `algo-lens-core/types`).

- **Consistency:**  
  Ensure type definitions are consistent with their usage in `problem.ts`, `steps.ts`, and `testcase.ts`.

- **Readability:**  
  Organize types logically and use proper indentation.

---

## 5. Common Mistakes

- Missing type definitions for complex inputs or outputs.
- Vague or generic type names.
- Lack of comments explaining complex types or properties.
- Inconsistent type usage across problem files.
- Defining types that are already available in standard libraries or `algo-lens-core`.

---

By following these guidelines, you will create robust and understandable type definitions that enhance the overall quality and maintainability of your problem contributions.
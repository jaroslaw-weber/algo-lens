# Common Issues and Troubleshooting

This document outlines common issues encountered when creating or fixing problems in AlgoLens, along with their solutions.

## 1. "No result found in last state" Error

**Problem:** The test runner throws an error indicating that no "result" variable was found in the last state of the problem's execution.

**Cause:** This typically occurs when the `StepLoggerV2` instance (usually named `l`) does not record the final result in the last `ProblemState` before `l.getSteps()` is called. This can happen if:
- `l.simple({ result: finalResult });` is called, but `l.breakpoint(0);` is not called immediately after to save the state.
- An early return in the `getSteps` function bypasses the final result logging.

**Solution:** Ensure that the final result is always logged using `l.simple({ result: finalResult });` and that `l.breakpoint(0);` is called *after* this logging to save the state. It's best practice to calculate the `finalResult` and then have a single block at the end of `getSteps` to log it and return the steps.

**Example (Incorrect):**
```typescript
if (someCondition) {
  l.simple({ result: true });
  return l.getSteps(); // Result might not be in the *last* saved state
}
// ... other logic ...
l.simple({ result: calculatedResult });
l.breakpoint(0);
return l.getSteps();
```

**Example (Correct):**
```typescript
let finalResult: boolean;
if (someCondition) {
  finalResult = true;
} else {
  // ... calculate finalResult ...
  finalResult = someCalculation;
}
l.comment = `Final result: ${finalResult}`;
l.simple({ result: finalResult });
l.breakpoint(0);
return l.getSteps();
```

## 2. `Property 'result' does not exist on type 'StepLoggerV2'` Error

**Problem:** TypeScript error indicating that `StepLoggerV2` does not have a `result` method.

**Cause:** You are attempting to use `l.result(value)` which is not a valid method on `StepLoggerV2`. The `StepLoggerV2` uses the `simple` method to log simple key-value pair variables, including the final result.

**Solution:** Use `l.simple({ result: yourResultVariable });` to log the final result.

## 3. `problem.codegen missing` Error

**Problem:** The test runner or code generation process reports that `problem.codegen` is missing for a problem.

**Cause:** The `problem.ts` file for the problem is missing the `codegen` property, or it's incorrectly named (e.g., `codeGenerationSignature`). The system expects a `codegen` object to define how the problem's solution code should be generated.

**Solution:** Ensure your `problem.ts` file has a `codegen` property with at least a `signature` property.

**Example:**
```typescript
export const problem: Problem<any, ProblemState> = {
  // ... other properties ...
  codegen: {
    signature: "function yourFunctionName(input: any): any",
  },
};
```

## 4. `Object literal may only specify known properties, and 'name' does not exist in type '{ signature: string; }'` Error

**Problem:** TypeScript error in `problem.ts` when defining the `codegen` object, stating that a property like `name` does not exist.

**Cause:** The `codegen` object is strictly typed to only accept a `signature` property. Other properties (like `name`) that might have been used in older code generation configurations are not allowed.

**Solution:** Remove any properties from the `codegen` object other than `signature`.

**Example (Incorrect):**
```typescript
  codegen: {
    signature: "...",
    name: "...", // Remove this line
  },
```

**Example (Correct):**
```typescript
  codegen: {
    signature: "...",
  },
```

## 5. `use l. instead of logger.` Error

**Problem:** The test runner fails with a message indicating that `logger.` should be replaced with `l.`.

**Cause:** This is a linting/style check for the generated code. The code generation process expects the `StepLoggerV2` instance to be named `l` for consistency and brevity in the generated solution. Your `steps.ts` file is likely using `const logger = new StepLoggerV2();` and then `logger.someMethod()`.

**Solution:** In your `steps.ts` file, change the instantiation of `StepLoggerV2` from `const logger = new StepLoggerV2();` to `const l = new StepLoggerV2();`. Then, replace all occurrences of `logger.` with `l.` throughout the file.

## 6. Incorrect Test Case Expectations

**Problem:** A test case fails, but upon reviewing the problem definition (e.g., on LeetCode) and the expected behavior, the provided `expected` value in `testcase.ts` seems incorrect.

**Cause:** The `testcase.ts` file might have an `expected` value that does not align with the standard interpretation of the problem. This can happen with edge cases, such as how `null` inputs are handled (e.g., whether a `null` tree is considered a subtree of a non-null tree).

**Solution:**
1.  **Verify the problem definition:** Consult the official problem statement (e.g., on LeetCode) and common interpretations.
2.  **Adjust `expected` value:** If the `testcase.ts` `expected` value is indeed incorrect based on the verified problem definition, update it to the correct value. Do *not* modify the problem's logic (`steps.ts`) to match an incorrect test case.
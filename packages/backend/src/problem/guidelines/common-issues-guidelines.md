# Common Issues and Troubleshooting

This document outlines common issues and their solutions when creating or fixing AlgoLens problems.

## 1. "No result found in last state" Error

**Issue:** The test runner reports no "result" variable in the final `ProblemState`.
**Cause:** `StepLoggerV2` (instance `l`) didn't record the final result in the last state before `l.getSteps()` was called. This happens if `l.breakpoint(0);` isn't called immediately after `l.simple({ result: finalResult });`, or an early return bypasses final logging.
**Solution:** Always log the final result with `l.simple({ result: finalResult });` and immediately call `l.breakpoint(0);` afterward. Structure `getSteps` to have a single final logging block.

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

**Issue:** TypeScript error: `l.result(value)` is not a valid method.
**Solution:** Use `l.simple({ result: yourResultVariable });` to log the final result.

## 3. `problem.codegen missing` Error

**Issue:** `problem.codegen` is missing or misnamed in `problem.ts`.
**Solution:** Ensure `problem.ts` has a `codegen` property with at least a `signature`.

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

**Issue:** TypeScript error in `problem.ts` when defining `codegen` with extra properties (e.g., `name`).
**Solution:** Remove all properties from `codegen` except `signature`.

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

**Issue:** Test runner fails, requiring `logger.` to be `l.`.
**Solution:** In `steps.ts`, change `const logger = new StepLoggerV2();` to `const l = new StepLoggerV2();` and replace all `logger.` with `l.`.

## 6. Incorrect Test Case Expectations

**Issue:** A test case fails due to an incorrect `expected` value in `testcase.ts`.
**Solution:**
1.  **Verify problem definition:** Consult the official problem statement.
2.  **Adjust `expected` value:** Update `testcase.ts` with the correct `expected` value. Do *not* modify `steps.ts` to match an incorrect test case.
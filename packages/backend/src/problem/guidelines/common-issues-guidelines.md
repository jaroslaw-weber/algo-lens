# Common Issues and Troubleshooting

This document outlines common issues and their solutions when creating or fixing AlgoLens problems.

## 2. `Property 'result' does not exist on type 'StepLoggerV2'` Error

**Issue:**: Typescript error about result.
**Solution:** Use `l.simple({ result });` to log the final result. And make sure there is a breakpoint after that.

## 5. `use l. instead of logger.` Error

**Issue:** Test runner fails, requiring `logger.` to be `l.`.
**Solution:** In `steps.ts`, change `const logger = new StepLoggerV2();` to `const l = new StepLoggerV2();` and replace all `logger.` with `l.`.

## 6. Incorrect Test Case Expectations

**Issue:** A test case fails due to an incorrect `expected` value in `testcase.ts`.
**Solution:**
1.  **Verify problem definition:** Consult the official problem statement.
2.  **Adjust `expected` value:** Update `testcase.ts` with the correct `expected` value. Do *not* modify `steps.ts` to match an incorrect test case.
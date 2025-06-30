# Steps Guidelines

This guide explains how to write clear `l.comment` entries in `steps.ts` files and use `StepLoggerV2` for generating user-friendly algorithm visualizations.

---

## 1. Writing Comments in `steps.ts`

**Principles for `l.comment`:**
- **Be concise:** Max 7 words or two short sentences.
- **Use plain English:** Avoid jargon.
- **Focus on values:** Refer to values, not indexes (e.g., "current number" not `arr[i]`).
- **Explain logic and purpose:** State what the code does and why.
- **Reference variables:** Use variable names (e.g., `left`, `right`).
- **Target beginners:** Assume the reader is new to algorithms.
- **Add breakpoints:** Use `l.breakpoint()` for key steps. Each breakpoint number must be unique and increasing.

Following these ensures clear, informative visualizations.

---

## 2. Using `StepLoggerV2`

`StepLoggerV2` records variable states and comments for interactive visualizations.

### Basic Workflow

1. **Instantiate:** Import `StepLoggerV2` from `"algo-lens-core/src/StepLoggerV2"` and instantiate it.
   ```js
   import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";

   const l = new StepLoggerV2();
   ```
2. **State Copying:**
   - State is carried over automatically.
   - Only log variables when they change or need highlighting.

3. **Logging Variables:**
   - Use the following methods as needed:
     - `l.arrayV3(arrayContainer, pointers)`
     - `l.binary(o, options?)`
     - `l.binaryOperation(label, values, operator)`
     - `l.grid(name, values, ...pointers)`
     - `l.group(name, values, options?)`
     - `l.hashmap(label, map, highlight?)`
     - `l.hashmapV2(options)`
     - `l.hashset(label, set, highlight)`
     - `l.hide(name)`
     - `l.intervals(label, arr, highlight, min, max)`
     - `l.list(name, node?, highlight?)`
     - `l.simple(value)`
     - `l.setMeta(name, metadata)`
     - `l.tree(label, value, highlight?)`
     - `l.grid(name, values, ...pointers)`: Note that `l.array2d` was used in some older problems but `l.grid` is the preferred method for 2D array/grid visualizations. If you encounter `l.array2d`, consider updating to `l.grid` if appropriate.

4. **Pointer Labels and Colors:**
   - For `l.arrayV3`/`l.hashmapV2`/`l.grid` pointers:
     - Use short, lowercase `label`.
     - Use DaisyUI color names (e.g., "primary", "success") for `color`.

5. **Comments and Breakpoints:**
   - Set a comment before each breakpoint:
     ```js
     l.comment = "Your explanation here";
     l.breakpoint(breakpointNumber);
     ```
   - Breakpoint numbers must be unique and increasing.

6. **Include Result:**
   - Log the `result` variable (usually at the end).

7. **Retrieve Steps:**
   - Use `l.getSteps()` to obtain the `ProblemState[]` for visualization.

---

## 3. Examples & Advanced Usage

### Example: Climbing Stairs

```js
export function generateSteps(n: number): ProblemState[] {
  const l = new StepLoggerV2();

  // Initialize dp array
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Log initial state
  l.simple({ n });
  l.arrayV3({ dp: dp }, []);
  l.comment = "Initialize base cases: dp[0] = 1 (0 steps, 1 way), dp[1] = 1 (1 step, 1 way).";
  l.breakpoint(1);

  // Loop through steps
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    l.simple({ n });
    l.arrayV3({ dp: dp }, [
      { value: i, label: "current step", color: "primary", dir: "right" },
      { value: i - 1, label: "previous step 1", color: "info", dir: "bottom" },
      { value: i - 2, label: "previous step 2", color: "info" },
    ]);
    l.comment = `Ways to reach step ${i}: dp[i-1] + dp[i-2].`;
    l.breakpoint(2);
  }

  // Log final result
  const result = dp[n];
  l.arrayV3({ dp: dp }, [{ value: n, label: "total ways", color: "success" }]);
  l.simple({ result });
  l.comment = `Total ways to reach step ${n} is result.`;
  l.breakpoint(3);

  return l.getSteps();
}
```

**Key points in this example:**
- Log only changed or relevant variables at each step.
- Use meaningful pointer labels and colors.
- Always set `l.comment` before `l.breakpoint`.
- Use concise, beginner-friendly explanations.

---

### Advanced Features

- **Metadata:**  
  Use `l.setMeta(name, metadata)` to attach display options or extra info to a variable (e.g., custom min/max for charts).

- **Group Options:**  
  `l.groupOptions` allows you to set display options for value groups (e.g., min/max/reverse for arrays).

- **Hashmap Options:**  
  `l.hashmapOptions` lets you customize key/value labels for hashmaps.

- **Immutability:**  
  Each call to `l.breakpoint()` deep-clones the current state, ensuring previous steps are never mutated.

---

### Best Practices

- Log variables only when they change or need to be highlighted.
- Use unique, increasing numbers for breakpoints.
- Keep comments short and focused on the current step.
- Use pointer labels and colors to clarify what each pointer represents.
- Use metadata and group/hashmap options for advanced display needs.
- Optionally, for self-documentation within `steps.ts`, you can add comments indicating which logical group a variable might belong to (e.g., `// 'n' belongs to 'input' group`), although the primary definition of groups is in `groups.ts`.

### Common Pitfalls

- Forgetting to set `l.comment` before `l.breakpoint` (results in missing explanations).
- Logging unchanged variables unnecessarily (clutters the visualization).
- Using unclear or overly technical language in comments.
- Reusing breakpoint numbers (causes confusion in step order).

---

By following these guidelines and leveraging the advanced features of `StepLoggerV2`, you can create clear, educational, and visually effective algorithm step visualizations.
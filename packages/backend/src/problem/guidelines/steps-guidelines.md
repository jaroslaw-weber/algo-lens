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

1. **Instantiate:** Import `StepLoggerV2` from `"@algolens/core/src/StepLoggerV2"` and instantiate it.
   ```js
   import { StepLoggerV2 } from "@algolens/core/src/StepLoggerV2";

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
     - `l.hashset(label, set, highlight)`: For set data structures. Use highlight to point to specific elements being processed (e.g., `{ key: elementValue, color: "primary", label: "current" }`).
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
     - **Match variable names:** For educational clarity, use labels that match the variable names being visualized (e.g., if visualizing `currS1Char`, use label "currS1Char").

5. **Comments and Breakpoints:**
    - Set a comment before each breakpoint:
      ```js
      l.comment = "Your explanation here";
      l.breakpoint(breakpointNumber);
      ```
    - Breakpoint numbers must be unique and increasing.
    - **CRITICAL:** Place `l.breakpoint()` calls OUTSIDE `// HIDE_START`/`// HIDE_END` blocks. Breakpoints inside HIDE blocks will be removed during core algorithm code generation, causing missing steps in the visualization.

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
  l.groupOptions.set("input", { min: 0, max: n });

  // Initialize dp array
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // HIDE_START
  // Log initial state
  l.group("input", { n });
  l.arrayV3({ dp: dp }, []);
  l.comment = "Initialize base cases: dp[0] = 1 (0 steps, 1 way), dp[1] = 1 (1 step, 1 way).";
  // HIDE_END
  l.breakpoint(1);

  // Loop through steps
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    // HIDE_START
    l.arrayV3({ dp: dp }, [
      { value: i, label: "current step", color: "primary", dir: "right" },
      { value: i - 1, label: "previous step 1", color: "info", dir: "bottom" },
      { value: i - 2, label: "previous step 2", color: "info" },
    ]);
    l.comment = `Ways to reach step ${i}: dp[i-1] + dp[i-2].`;
    // HIDE_END
    l.breakpoint(2);
  }

  // Log final result
  const result = dp[n];
  // HIDE_START
  l.arrayV3({ dp: dp }, [{ value: n, label: "total ways", color: "success" }]);
  l.simple({ result });
  l.comment = `Total ways to reach step ${n} is result.`;
  // HIDE_END
  l.breakpoint(3);

  return l.getSteps();
}
```

**Key points in this example:**
- Log only changed or relevant variables at each step.
- Use meaningful pointer labels and colors.
- Always set `l.comment` before `l.breakpoint`.
- Use concise, beginner-friendly explanations.
- Prioritize `l.arrayV3` with pointers over `l.simple` for array visualizations.
- Use `l.group` for related input variables with appropriate min/max bounds.
- Place breakpoints OUTSIDE HIDE blocks to preserve them in code generation.
- Wrap visualization code in HIDE blocks while keeping breakpoints outside.

---

### Advanced Features

- **Metadata:**  
  Use `l.setMeta(name, metadata)` to attach display options or extra info to a variable (e.g., custom min/max for charts).

- **Group Options:**
  `l.groupOptions` allows you to set display options for value groups (e.g., min/max/reverse for arrays).
  Set options before using `l.group()`:
  ```js
  l.groupOptions.set("groupName", { min: 0, max: 100, reverse: false });
  ```
  **Dynamic Min/Max:** Calculate bounds based on input data for optimal visualization:
  ```js
  const maxValue = Math.max(...inputArray);
  const minValue = Math.min(...inputArray);
  l.groupOptions.set("values", { min: minValue - 1, max: maxValue + 1 });
  ```

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
- **Define all helper functions inside the main function** to keep the code organized and self-contained.
- Optionally, for self-documentation within `steps.ts`, you can add comments indicating which logical group a variable might belong to (e.g., `// 'n' belongs to 'input' group`), although the primary definition of groups is in `groups.ts`.

**When to Use Each Visualization Method:**
- **`l.arrayV3`/`l.grid` with pointers**: Primary choice for array/matrix visualizations. Use pointers to highlight indices, partitions, current positions, or boundaries. Essential for algorithms involving array traversal, searching, or partitioning.
- **`l.group`**: For related scalar variables that should be displayed together (e.g., length calculations, boundary values, partition values). Always set `l.groupOptions` with appropriate min/max bounds calculated from input data.
- **`l.simple`**: Only for final results or isolated scalar values that don't fit other categories. Avoid for intermediate calculations that could be grouped.
- **`l.hashmap`/`l.hashset`**: For dictionary/set data structures and their operations. Use highlights to point to specific keys/elements being processed, similar to array pointers. For hashset: `l.hashset("seen", seen, { key: currentElement, color: "primary", label: "processing" })`.
- **`l.tree`**: For tree-based algorithms and data structures.
- **`l.binary`**: For binary representation visualizations.

### Visualization Priority and Duplication Avoidance

**Prioritize Rich Visualizations:**
- Prefer structured visualizations over simple ones: `l.arrayV3`/`l.grid` with pointers > `l.group` > `l.simple`
- Use `l.arrayV3` for array visualizations with pointers to show indices, partitions, or key positions
- Use `l.grid` for 2D arrays with pointers for row/column highlighting
- Use `l.group` for related variables that should be displayed together
- Reserve `l.simple` for scalar values or when richer visualizations aren't applicable

**Avoid Unnecessary Duplication:**
- Don't duplicate information already shown by pointers (e.g., avoid `l.simple({ i, j })` if pointers already visualize those indices)
- Only log variables when they provide new information or context
- Use pointers to highlight specific positions rather than logging multiple simple variables
- Combine related information into single rich visualizations instead of multiple simple ones

### Dynamic Group Options Example

For optimal visualization, calculate group bounds dynamically based on input data:

```js
// Example from Median of Two Sorted Arrays
const maxLength = Math.max(nums1.length, nums2.length);
const maxValue = Math.max(...nums1, ...nums2);
const minValue = Math.min(...nums1, ...nums2);

l.groupOptions.set("lengths", { min: 0, max: maxLength });
l.groupOptions.set("bounds", { min: 0, max: nums1.length });
l.groupOptions.set("partition_values", { min: minValue - 1, max: maxValue + 1 });
```

This ensures visualizations scale appropriately for any input size and value range.

---

## 4. Code Organization: Separating Algorithm from Visualization

**Hide Visualization-Only Code:**
- **Wrap visualization code in hide comments:** Use `// HIDE_START` and `// HIDE_END` to mark code that exists only for visualization purposes and should be removed when showing the pure algorithm.
- **Purpose:** This clearly separates the core algorithm logic from the educational visualization code.
- **Example:**
  ```typescript
  // Core algorithm - this stays
  const result = someAlgorithm(input);

  // HIDE_START - Visualization code below
  l.comment = "Algorithm completed successfully.";
  l.simple({ result });
  l.breakpoint(5);
  // HIDE_END - Visualization code above

  return result;
  ```

**What to Hide:**
- All `StepLoggerV2` instantiation and method calls
- Pointer creation and array visualization code
- Logging statements (`l.simple`, `l.arrayV3`, `l.grid`, etc.)
- Comment setting (`l.comment`)
- Breakpoint calls (`l.breakpoint`)
- Helper functions that only exist for visualization
- Any variables created solely for logging purposes

**What NOT to Hide:**
- The core algorithm logic and data structures
- Input validation and preprocessing
- The main computational steps
- Return statements
- Variable assignments that are part of the algorithm

**Benefits:**
- **Clear separation:** Makes it easy to extract the pure algorithm code
- **Code review:** Helps reviewers focus on algorithm correctness vs visualization
- **Maintenance:** Easier to update algorithm without affecting visualization
- **Educational:** Shows students both the algorithm and how to visualize it

### Common Pitfalls

- Forgetting to set `l.comment` before `l.breakpoint` (results in missing explanations).
- Logging unchanged variables unnecessarily (clutters the visualization).
- Using unclear or overly technical language in comments.
- Reusing breakpoint numbers (causes confusion in step order).

---

By following these guidelines and leveraging the advanced features of `StepLoggerV2`, you can create clear, educational, and visually effective algorithm step visualizations.
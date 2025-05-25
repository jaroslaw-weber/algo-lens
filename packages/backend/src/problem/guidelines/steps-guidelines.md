# Steps Guidelines

This document guides writing clear `l.comment` in `steps.ts` files and using `StepLoggerV2`. These comments generate visualizations for users.

## Comment Guidelines for `steps.ts`

Here are the key principles for `l.comment`:

1.  **Be Concise:** Keep comments brief (max 7 words or two short sentences).
2.  **Use Plain English:** Write simply, avoiding jargon.
3.  **Focus on Values:** Refer to values, not array indexes (e.g., "current number" instead of `arr[i]`).
4.  **Explain Logic & Why:** Describe what the code does and its purpose.
5.  **Reference Variables:** Use variable names (e.g., `left`, `right`).
6.  **Target Beginners:** Assume readers are new to algorithms.
7.  **Add Breakpoints:** Use `l.breakpoint()` for important steps. Breakpoints must be unique, increasing natural numbers.

By following these guidelines, visualizations from `steps.ts` will be clear and informative.

## Using `StepLoggerV2`

`StepLoggerV2` records variable states and comments for interactive algorithm visualizations.

Here's how it works:

1.  **Instantiation:** Create `const l = new StepLoggerV2();`.
2.  **State Copying:** Logged state carries over. Only log variables when they change or need highlighting.
3.  **Logging Variables:** Use `l` methods to log different variable types:
    *   `l.arrayV3(arrayContainer: Record<string, any[]>, pointers: (Pointer | Pointer2D)[])`: Logs an array with pointers.
    *   `l.binary(o: Record<string, number>, options?: { highlightLast?: boolean; pointersLeft?: number[]; pointersRight?: number[]; })`: Logs binary representations.
    *   `l.binaryOperation(label: string, values: Record<string, number>, operator: string)`: Logs binary operations.
    *   `l.grid(name: string, values: any[][], ...pointers: Pointer2D[])`: Logs a 2D grid with pointers.
    *   `l.group(name: string, values: Record<string, any>, options?: { min?: number; max?: number; reverse?: any })`: Logs a group of simple values.
    *   `l.hashmap(label: string, map: Map<any, any>, highlight?: HashHighlight)`: Logs a hash map.
    *   `l.hashmapV2(options: { label: string; map: Map<any, any>; highlights?: HashHighlight[]; keyLabel?: string; valueLabel?: string; })`: Logs a hash map with advanced options.
    *   `l.hashset(label: string, set: Set<any>, highlight: HashHighlight)`: Logs a hash set.
    *   `l.hide(name: string)`: Hides a variable from display.
    *   `l.intervals(label: string, arr: number[][], highlight: number[], min: number, max: number)`: Logs an array of intervals.
    *   `l.list(name: string, node?: ListNode | null, highlight?: NodeHighlight[])`: Logs a linked list.
    *   `l.simple(value: Record<string, any>)`: Logs one or more simple key-value pairs.
    *   `l.setMeta(name: string, metadata: VariableMetadata)`: Stores metadata for a variable.
    *   `l.tree(label: string, value: BinaryTreeNode | null, highlight: NodeHighlight[] = [])`: Logs a binary tree.

4. **Pointer Labels and Colors:** For `l.arrayV3` or `l.hashmapV2` pointers, `label` should be short and `lowercase`. `color` uses DaisyUI names (e.g., "primary", "success").

5.  **Adding Comments and Breakpoints:**
    *   `l.comment = "Your explanation here";`: Provide a concise explanation for the current step.
    *   `l.breakpoint(breakpointNumber);`: Mark a step for visualization. Always set `l.comment` *before* `l.breakpoint()`.

6.  **Including Result:** Include a `result` variable in a logging call, typically at the end.

7.  **Retrieving Steps:** Call `l.getSteps()` to get the `ProblemState` array for visualization.
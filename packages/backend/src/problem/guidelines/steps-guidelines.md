# Steps Guidelines

This document provides guidelines for writing clear and understandable comments within the `l.comment` sections of `steps.ts` files and how to use the `StepLoggerV2`. These comments are used to generate visualizations and should be easy for users to follow.

## Comment Guidelines for `steps.ts`

Based on the style in `container-with-most-water/steps.ts`, here are the key principles:

1.  **Focus on Values, Not Indexes:** Avoid mentioning specific array indexes (e.g., `arr[i]`, `dp[j]`) in the comments. Instead, refer to the *values* being processed or stored (e.g., "the current number", "the minimum path sum to this cell").
2.  **Explain the Logic:** Clearly describe what the code is doing at each step.
3.  **Explain the "Why":** Briefly explain *why* a particular action is being taken. What is the purpose of this step in the overall algorithm?
4.  **Be Concise:** Keep comments brief and to the point. Avoid unnecessary jargon or overly technical language.
5.  **Use Clear Language:** Write in simple, straightforward English that is easy for someone unfamiliar with the specific code to understand.
6.  **Reference Variables by Name:** Use the variable names (e.g., `left`, `right`, `maxArea`, `currentInterval`, `complement`) when referring to values or concepts.
7. **Add breakpoints in important places** Use l.breakpoint to explain to the user what's going on and allow them to insepect and learn more about the code. Breakpoints needs to be unique and increasing as the logging goes. Only natural numbers, no fractions.
8. **Assume the people who read comments are beginners** This tool is made for people learning about algorithms. Keep that in mind

**Example (from `container-with-most-water/steps.ts`):**

```typescript
l.comment = `Calculate the area between the lines with heights ${height[left]} and ${height[right]}. Width is ${width}, minimum height is ${minHeight}. Area = ${area}.`;
```

This comment clearly states the values being used (`height[left]`, `height[right]`, `width`, `minHeight`, `area`) and explains what is being calculated (the area).

By following these guidelines, we can ensure that the visualizations generated from the `steps.ts` files are as clear and informative as possible for users.

## Using the StepLoggerV2

The `StepLoggerV2` is a utility used to record the state of variables and provide explanatory comments at different points during the execution of an algorithm. This recorded information is then used by the AlgoLens frontend to generate interactive visualizations of the algorithm's steps.

Here's a breakdown of how it works and how to use it:

1.  **Instantiation:** You create an instance of the logger using `const l = new StepLoggerV2();`. This specific format is necessary for the codegen to work correctly.

2.  **State Copying:** A key feature of `StepLoggerV2` is that the state logged at a particular step is automatically carried over to the next step. This means you only need to explicitly log a variable when its value changes or when you want to highlight it or show its state alongside other changing variables at a specific breakpoint. If a variable remains the same, you don't need to log it repeatedly.

3.  **Logging Variables:** You use various methods on the `l` instance to log different types of variables. The methods available are:
    *   `l.arrayV2({ arrayName: arrayVariable }, { highlightIndex: index })`: Logs an array and can highlight a specific index.
    *   `l.grid({ gridName: gridVariable }, { highlight: { row, col } })`: Logs a grid and can highlight a cell.
    *   `l.simple({ variableName: variableValue })`: Logs a simple value like a number, string, or boolean.
    *   `l.intervals({ intervalsName: intervalsArray })`: Logs an array of intervals.
    *   `l.tree({ treeName: treeNode })`: Logs a tree data structure.
    *   `l.list({ listName: listNode })`: Logs a linked list.

4.  **Adding Comments and Breakpoints:**
    *   `l.comment = "Your explanation here";`: Assign a string to `l.comment` to provide a textual explanation for the current step. Comments should follow the guidelines in this document, focusing on values and explaining the logic and purpose of the step. ALL COMMENTS NEED TO BE IN THIS FIELD. Also comments should be short. if you need extra comment, just add it with another breakpoint.
    *   `l.breakpoint(breakpointNumber);`: Call `l.breakpoint()` with a unique number to mark a specific point in the algorithm's execution where the current state and comment should be recorded as a step in the visualization. **Always set `l.comment` *before* calling `l.breakpoint()`.**

5.  **Including the Result:** For the codegen to work correctly, you must include a variable named `result` in one of your logging calls, typically in the final step after the algorithm has completed. This variable should hold the final output of the algorithm.

6.  **Retrieving Steps:** Finally, you call `l.getSteps()` to get an array of `ProblemState` objects, which represents the complete sequence of steps for the visualization.

## More Examples

To see and example problem, go to `packages/backend/src/problem/free/maximum-subarray/steps.ts` .
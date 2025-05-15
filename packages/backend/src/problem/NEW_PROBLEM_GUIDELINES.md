# Adding New Problem Guidelines

This document provides guidelines for contributing new problems to AlgoLens, including how to write clear comments for visualizations.

## Comment Guidelines for `steps.ts`

This section outlines guidelines for writing clear and understandable comments within the `l.comment` sections of `steps.ts` files. These comments are used to generate visualizations and should be easy for users to follow.

Based on the style in `container-with-most-water/steps.ts`, here are the key principles:

1.  **Focus on Values, Not Indexes:** Avoid mentioning specific array indexes (e.g., `arr[i]`, `dp[j]`) in the comments. Instead, refer to the *values* being processed or stored (e.g., "the current number", "the minimum path sum to this cell").
2.  **Explain the Logic:** Clearly describe what the code is doing at each step.
3.  **Explain the "Why":** Briefly explain *why* a particular action is being taken. What is the purpose of this step in the overall algorithm?
4.  **Be Concise:** Keep comments brief and to the point. Avoid unnecessary jargon or overly technical language.
5.  **Use Clear Language:** Write in simple, straightforward English that is easy for someone unfamiliar with the specific code to understand.
6.  **Reference Variables by Name:** Use the variable names (e.g., `left`, `right`, `maxArea`, `currentInterval`, `complement`) when referring to values or concepts.

**Example (from `container-with-most-water/steps.ts`):**

```typescript
l.comment = `Calculate the area between the lines with heights ${height[left]} and ${height[right]}. Width is ${width}, minimum height is ${minHeight}. Area = ${area}.`;
```

This comment clearly states the values being used (`height[left]`, `height[right]`, `width`, `minHeight`, `area`) and explains what is being calculated (the area).

By following these guidelines, we can ensure that the visualizations generated from the `steps.ts` files are as clear and informative as possible for users.

## Other Guidelines (To be added)

This section will contain other guidelines related to adding new problems, such as file structure, testing, etc.
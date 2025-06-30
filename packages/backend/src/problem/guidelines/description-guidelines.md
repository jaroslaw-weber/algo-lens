# Description Guidelines

A well-written problem description is essential for clarity and user engagement. Follow these guidelines to ensure your algorithmic problem descriptions are effective and easy to understand.

---

## 1. Purpose

To provide a clear, concise, and complete statement of the algorithmic problem, enabling users to quickly grasp what is being asked.

---

## 2. Structure

A good problem description is crucial for user understanding and should clearly include the following sections:

-   **Problem Statement:**
    -   Clearly and succinctly state what the user is required to solve. Avoid ambiguity.
-   **Examples:**
    -   Provide at least one, preferably two, clear input/output examples.
    -   Include a brief explanation for each example showing how the output is derived from the input.
    -   Format examples consistently for readability.
-   **Constraints:**
    -   List all relevant constraints (e.g., input size, value ranges for numbers, character sets for strings, time/space complexity hints if applicable).
    -   This helps users understand the scale of the problem and potential edge cases.
-   **Edge Cases (Optional but Recommended):**
    -   Briefly mention any common or particularly tricky edge cases that users should consider (e.g., empty arrays, single-element inputs, inputs with all same values).
-   **Language:**
    -   Use simple, direct language. Avoid jargon and overly complex sentences.

---

## 3. Markdown Template Example

Use the following markdown structure for clarity and consistency:

```markdown
## Problem Statement

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have **exactly one solution**, and you may **not** use the same element twice.

You can return the answer in any order.

## Examples

**Example 1:**

-   **Input:** `nums = [2,7,11,15]`, `target = 9`
-   **Output:** `[0,1]`
-   **Explanation:** Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

**Example 2:**

-   **Input:** `nums = [3,2,4]`, `target = 6`
-   **Output:** `[1,2]`
-   **Explanation:** `nums[1] + nums[2] == 6`.

## Constraints

-   `2 <= nums.length <= 10^4`
-   `-10^9 <= nums[i] <= 10^9`
-   `-10^9 <= target <= 10^9`
-   Only one valid answer exists.

## Edge Cases (Considerations)

-   What if the array is at its minimum allowed length (e.g., 2 elements)?
-   Input numbers can be negative.
```

---

## 4. Best Practices

- Be as specific as possible in the problem statement.
- Use consistent formatting for examples and constraints.
- Explain examples clearly, especially if the logic is not obvious.
- Anticipate and mention edge cases to guide users.

---

## 5. Common Mistakes

- Leaving out constraints or edge cases.
- Using vague or ambiguous language.
- Providing examples without explanations.
- Making the description too long or too short.

---

By following these guidelines, you will help users understand the problem quickly and avoid common sources of confusion.
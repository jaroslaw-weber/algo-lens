# Explanation Guidelines

A strong explanation helps users understand the reasoning and approach behind a solution. Use these guidelines to write clear, educational, and insightful explanations.

---

## 1. Purpose

To explain the logic, approach, and reasoning behind the provided solution, making it accessible to users of varying backgrounds. The `explanation.md` file is highly recommended for all problems. Even if a problem seems straightforward, a brief explanation of the chosen approach and complexity can be very beneficial for learners.

---

## 2. Structure

A good explanation should include:

- **High-Level Overview:**  
  Start with a summary of the approach before diving into details.

- **Step-by-Step Breakdown:**  
  Divide the solution into logical steps. Explain what happens at each stage and why.

- **Data Structures & Algorithms:**  
  Clearly state which data structures and algorithms are used, and why they are appropriate.

- **Pseudocode or Diagrams (Optional):**  
  Use pseudocode, diagrams, or visual aids if they help clarify the logic.

- **Complexity Analysis:**  
  Briefly discuss time and space complexity, and any trade-offs.

---

## 3. Example Template

```
## Approach

We use dynamic programming to solve this problem efficiently.

1. **Initialization:**  
   Create a dp array where dp[i] represents the answer for input i.

2. **Recurrence:**  
   For each i, compute dp[i] based on previous results.

3. **Result:**  
   Return dp[n] as the final answer.

## Data Structures

- Array for dynamic programming state.

## Complexity

- Time: O(n)
- Space: O(n)
```

---

## 4. Best Practices

- Use clear, simple language, avoiding jargon where possible or explaining it simply. Assume the reader is a beginner.
- Explain the "why" behind each step and the overall approach, not just the "how." Help the reader understand the reasoning.
- Use bullet points or numbered lists for clarity.
- Provide detailed step-by-step explanations, especially for dynamic programming solutions, clearly outlining the state definition, recurrence relation, and base cases, explaining *why* these are chosen.
- Include diagrams or pseudocode if they help clarify the logic for beginners.
- Relate the explanation to the problem statement and examples, showing how the steps apply.

---

## 5. Common Mistakes

- Jumping into details without a high-level overview.
- Failing to explain *why* a particular approach or data structure is chosen and is effective.
- Omitting complexity analysis or explaining it in overly technical terms.
- Using jargon or overly technical language without simple explanations.

---

By following these guidelines, you will create explanations that are accessible and truly help beginners understand not just *what* the solution does, but *why* it works and *how* to think about similar problems.
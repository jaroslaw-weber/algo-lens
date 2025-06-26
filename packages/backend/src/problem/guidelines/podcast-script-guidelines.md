# Podcast Script Guidelines (`podcast_script.md`)

This document outlines guidelines for creating `podcast_script.md` files, which can provide an engaging audio-style explanation for a problem. This is an **optional** file for each problem.

---

## 1. Purpose

The `podcast_script.md` file aims to offer an alternative way for users to understand the problem and its solution through a conversational script format, similar to a podcast episode. It can make complex topics more approachable and engaging.

---

## 2. Structure

A typical podcast script for a problem should include the following sections:

-   **Title/Episode Name:** A catchy title for the "episode."
-   **Hosts (Optional):** You can define 1-2 host names to make the conversation flow naturally.
-   **Introduction:**
    -   Welcome message.
    -   Briefly introduce the problem to be discussed.
-   **Problem Statement:**
    -   Clearly state the problem, what's given, and what needs to be achieved.
-   **Initial Thoughts / Brute-Force Approach:**
    -   Discuss the most straightforward or naive way to solve the problem.
    -   Analyze its drawbacks (usually time complexity).
-   **Optimized Approach / Key Insights:**
    -   Introduce the core idea or technique for a more efficient solution (e.g., sorting, two-pointers, dynamic programming).
    -   Explain how this technique applies to the current problem.
-   **Step-by-Step Breakdown of the Optimized Solution:**
    -   Walk through the algorithm logically.
    -   Explain how data structures are used.
    -   Discuss handling of edge cases or specific conditions (like duplicates in 3Sum).
-   **Complexity Analysis:**
    -   Discuss the time and space complexity of the optimized solution.
-   **Conclusion/Summary:**
    -   Recap the main points of the solution.
    -   Offer encouragement or final thoughts.
-   **Outro:**
    -   Sign-off.

---

## 3. Example Snippet (from 3Sum)

```markdown
# Podcast: Algocast - Visualize algorithms

**Episode:** Solving the 3Sum Problem Efficiently

**Hosts:** Alex & Ben

**Alex:** Hey everyone, and welcome back to "Algolens"! I'm Alex.

**Ben:** And I'm Ben. Today, we're tackling a classic problem often seen in interviews: the 3Sum problem.

**Alex:** Right. The task sounds simple enough: given a list of numbers, find all the unique combinations of three distinct numbers from that list that add up to exactly zero.
...
```

---

## 4. Tone and Style

-   **Conversational:** Write as if two people are naturally discussing the problem.
-   **Clear and Concise:** Avoid overly technical jargon where possible, or explain it clearly.
-   **Engaging:** Make it interesting for someone learning the algorithm.
-   **Target Audience:** Assume the listener has some basic programming knowledge but might be new to the specific algorithm or problem.

---

## 5. Best Practices

-   **Logical Flow:** Ensure the discussion progresses smoothly from understanding the problem to the optimized solution.
-   **Role of Hosts:** If using multiple "hosts," assign them distinct roles or perspectives if it helps the flow (e.g., one asks clarifying questions, the other explains).
-   **Review:** Read the script aloud to check for natural language and flow.
-   **Optionality:** Remember, this file is optional. Only create it if you feel it adds significant value to the problem's explanation.

---

By following these guidelines, you can create informative and engaging podcast scripts that enhance the learning experience on AlgoLens.

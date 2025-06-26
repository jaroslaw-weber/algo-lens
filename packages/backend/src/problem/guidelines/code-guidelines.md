# Code Guidelines (`code/`)

This document provides guidelines for the content and structure of the `code/` directory within a specific problem folder (e.g., `packages/problem-free/problem-name/code/`).

---

## 1. Purpose

The `code/` directory is intended as an **optional** space to store supplementary code related to the problem. This might include:

-   Solutions in other programming languages (e.g., Python, Java, C++).
-   Helper scripts or utility functions used for generating test cases or analyzing the problem, if not part of the main visualization logic.
-   Alternative approaches or deprecated solutions that might still hold some informational value.

**Currently, the usage of this directory is not strictly enforced, and for many problems, it may remain empty or contain only a `.gitkeep` file.**

---

## 2. Structure

-   If providing solutions in other languages, use clear file names (e.g., `solution.py`, `Solution.java`).
-   Organize files logically if multiple supplementary code snippets are included.

---

## 3. Best Practices

-   **Clarity**: Ensure any code included is well-commented and easy to understand.
-   **Relevance**: Only include code that is directly relevant to the problem.
-   **Optionality**: Do not place core logic required for the AlgoLens visualization (which resides in `steps.ts`) in this directory. The visualization platform primarily uses `steps.ts`.

---

## 4. Current Status

The active use of the `code/` directory for providing alternative solutions or extensive helper code is still evolving. As the platform grows, more specific guidelines may be developed if this directory becomes a more integral part of problem contributions. For now, its use is at the contributor's discretion for supplementary materials.

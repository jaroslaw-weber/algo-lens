# Plan: Implement Test Case Selection Dropdown

This plan outlines the steps to implement a dropdown on the frontend to allow users to select a test case for the current problem visualization.

## Objective

Implement a dropdown in the problem visualization view that allows users to switch between different test cases defined for a problem. The visualization should update to reflect the selected test case's execution.

## Detailed Plan

### 1. Backend Modifications

*   **API Endpoint Change:** Modify the backend API endpoint for fetching problem states. The current endpoint is `/problem/:id/state/:step`. Change it to include the test case number (1-based): `/problem/:id/testcase/:testcaseNumber/state/:step`.
*   **Logic Update:** Update the backend logic to:
    *   Extract the `testcaseNumber` from the URL parameters.
    *   Convert the 1-based `testcaseNumber` to a 0-based index to select the correct test case from the problem's `testcases` array.
    *   Use the input from the selected test case when generating the problem states.

### 2. Frontend Modifications

*   **Create `TestCaseSelector` Component:** Create a new React component, `packages/frontend/src/components/TestCaseSelector.tsx`, specifically for the test case dropdown.
*   **Modify `api.ts`:** In `packages/frontend/src/api.ts`, modify the `getProblemState` function to accept a `testcaseNumber` parameter and include it in the API request URL.
*   **Modify `ProblemVisualizer.tsx`:** In `packages/frontend/src/components/ProblemVisualizer.tsx`:
    *   Fetch the problem details including test cases using `getProblem(id)`.
    *   Add a Jotai state variable `selectedTestCaseNumberAtom` initialized to the number of the default test case (if any, or 1 otherwise).
    *   Pass the `problem.testcases` array and the `selectedTestCaseNumberAtom` to the `TestCaseSelector` component.
    *   Modify the `useEffect` that fetches the problem state to use the value from `selectedTestCaseNumberAtom` when calling the modified `getProblemState` function.
    *   Ensure the `stepAtom` is reset to 1 when a new test case is selected (this should be triggered by a change in `selectedTestCaseNumberAtom`).
*   **Implement `TestCaseSelector.tsx`:** In the new `packages/frontend/src/components/TestCaseSelector.tsx` component:
    *   Receive the `testcases` array and the `selectedTestCaseNumberAtom` as props.
    *   Implement a dropdown (`<select>`) to display test cases. Map the `testcases` array to `<option>` elements.
    *   For each option, use the 1-based index (`index + 1`) as the value.
    *   For the displayed text of each option, use the `description` property if available. If not, generate a label like "Test Case X" (where X is the 1-based number).
    *   Add an `onChange` handler to the dropdown to update the `selectedTestCaseNumberAtom` using `useSetAtom`.

## Implementation

Once this plan is approved, the next step is to switch to the `code` mode to implement the described backend and frontend changes.
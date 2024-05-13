
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the reverseLinkedList function
interface ReverseLinkedListInput {
  head: ListNode;
}

/**
 * Implements the reverse linked list algorithm which reverses a singly linked list.
 * @param p - The input parameters including the head of the linked list.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function reverseLinkedList(p: ReverseLinkedListInput): ProblemState[] {
  const { head } = p;
  const steps: ProblemState[] = [];

  // Helper function to create and log each step's computational state
  function logStep(point: number, current?: ListNode, previous?: ListNode, next?: ListNode) {
    const step: ProblemState = {
      variables: [asArray("head", [head], null, null)],
      breakpoint: point,
    };
    if (current !== undefined) {
      step.variables.push(asValueGroup("current", current.val, null));
    }
    if (previous !== undefined) {
      step.variables.push(asValueGroup("previous", previous.val, null));
    }
    if (next !== undefined) {
      step.variables.push(asValueGroup("next", next.val, null));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  let previous: ListNode | null = null;
  let current: ListNode | null = head;

  // Main loop to reverse the linked list
  while (current !== null) {
    const next: ListNode | null = current.next;
    logStep(2, current, previous, next);

    current.next = previous;
    logStep(3, current, previous, next);

    previous = current;
    current = next;
    logStep(4, current, previous, next);
  }

  // Logs the final state after reversing the linked list
  logStep(5, null, previous, null);

  return steps;
}

// Example implementation of the reverseLinkedList function for demonstration and testing
const code = `function reverseList(head: ListNode | null): ListNode | null {
  let previous = null;
  let current = head;

  //#1 Start the loop to reverse the linked list
  while (current !== null) {
    //#2 Store the next node in the list
    const next = current.next;

    //#3 Reverse the next pointer of the current node
    current.next = previous;

    //#4 Move the previous and current pointers one step forward
    previous = current;
    current = next;
  }

  //#5 Return the new head of the reversed linked list
  return previous;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Reverse Linked List";
const getInput = () => ({
  head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))),
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const reverseLinkedListProblem: Problem<ReverseLinkedListInput, ProblemState> = {
  title,
  code,
  getInput,
  func: reverseLinkedList,
  id: "reverse-linked-list",
};

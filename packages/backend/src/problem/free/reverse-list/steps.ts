import {
  ProblemState,
  ListNode,
  Variable,
} from "algo-lens-core";
import { asList, cloneList } from "../../core/utils"; // Correct path
import { ReverseListInput } from "./types";

// Define log function in the module scope
const log = (
  steps: ProblemState[], // Pass steps array to log
  point: number,
  head: ListNode | null, // Keep track of the potentially changing head reference if needed, though head1 is cloned.
  current: ListNode | null,
  prev: ListNode | null = null,
  next: ListNode | null = null,
) => {
  const variables: Variable[] = [
    asList("head", head, []), // Log the cloned head state
    asList("current", current, []),
    asList("prev", prev, []),
    asList("next", next, []),
  ];
  steps.push({ variables, breakpoint: point });
};

export function reverseList(input: ReverseListInput): ProblemState[] {
  const { head } = input;
  const steps: ProblemState[] = [];

  // Clone the input list to avoid modifying the original
  const head1 = cloneList(head);
  let prev: ListNode | null = null;
  let current = head1;
  let next: ListNode | null = null;

  log(steps, 1, head1, current, prev, next); // #1: Initial state
  while (current != null) {
    next = current.next; // Save next node
    log(steps, 2, head1, current, prev, next); // #2: Before reversing pointer
    current.next = prev; // Reverse current node's pointer
    log(steps, 3, head1, current, prev, next); // #3: After reversing pointer
    prev = current; // Move prev pointer
    log(steps, 4, head1, current, prev, next); // #4: After moving prev
    current = next; // Move current pointer
    log(steps, 5, head1, current, prev, next); // #5: After moving current (start of next iteration or end)
  }

  // Note: 'current' is null here, 'prev' is the new head
  log(steps, 6, head1, current, prev, next); // #6: Final state after loop

  // The pure reverseLinkedList function is not called, as logging is intertwined.
  // The function returns the steps, not the reversed list head.
  return steps;
}

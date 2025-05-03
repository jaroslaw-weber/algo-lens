// Import or define necessary types and utilities
import {
  HighlightColor,
  Problem,
  ProblemState,
  ListNode,
  Variable,
  NodeHighlight,
} from "algo-lens-core"; // Keep core ListNode import
import { asList, asBooleanGroup, cloneList } from "../core/utils"; // Keep utils import for now

// Input type will be defined in types.ts
interface ReverseListInput {
  head: ListNode | null;
}

// The main function logic will be adapted for generateSteps
// The exported function here might just contain the core algorithm for reference or direct use if needed
export function reverseListAlgorithm(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  let next: ListNode | null = null;

  //#1 Initialize prev, current, next pointers. Start loop.
  while (current !== null) {
    //#2 Store the next node.
    next = current.next;
    //#3 Reverse the current node's pointer.
    current.next = prev;
    //#4 Move prev pointer one step forward.
    prev = current;
    //#5 Move current pointer one step forward.
    current = next;
  }
  //#6 Loop finished. Return the new head (prev).
  return prev; // Return the new head of the reversed list
}


// The old function that generated steps is kept here for reference, but will be replaced by generateSteps
export function reverseList_OldSteps(input: ReverseListInput): ProblemState[] {
  let { head } = input;
  const steps: ProblemState[] = [];

  function log(
    point: number,
    head: ListNode | null,
    current: ListNode | null,
    prev: ListNode | null = null,
    next: ListNode | null = null,
  ) {
    // This logging approach will be replaced by StepLoggerV2 in steps.ts
    const variables: Variable[] = [
      asList("head", head, []), // Assuming asList works for visualization
      asList("current", current, []),
      asList("prev", prev, []),
      asList("next", next, []),
    ];

    steps.push({ variables, breakpoint: point });
  }

  function reverseLinkedList(head: ListNode | null): ListNode | null {
    const head1 = cloneList(head); // Cloning might be handled differently in generateSteps
    let prev = null;
    let current = head1
    let next = null;

    log(1, head1, current); // Breakpoint 1
    while (current != null) {
      next = current.next;
      log(2, head1,  current, prev, next); // Breakpoint 2
      current.next = prev;
      log(3, head1,  current, prev, next); // Breakpoint 3
      prev = current;
      log(4, head1,  current, prev, next); // Breakpoint 4
      current = next;
      log(5, head1,  current, prev, next); // Breakpoint 5
    }

    log(6, head1, current, prev, next); // Breakpoint 6
    return prev;
  }

  reverseLinkedList(head);
  // console.log("steps: ", steps); // Remove console log
  return steps;
}

// The code string should represent the core algorithm for display
const code = `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  let next: ListNode | null = null;

  //#1 Initialize prev, current, next pointers. Start loop.
  while (current !== null) {
    //#2 Store the next node.
    next = current.next;
    //#3 Reverse the current node's pointer.
    current.next = prev;
    //#4 Move prev pointer one step forward.
    prev = current;
    //#5 Move current pointer one step forward.
    current = next;
  }
  //#6 Loop finished. Return the new head (prev).
  return prev;
}`;

const title = "Reverse Linked List";
// getInput is typically defined in testcase.ts
// const getInput = () => { ... };

// Problem definition will be moved to problem.ts
export const problem: Problem<ReverseListInput /*, ProblemState removed */ > = {
  title,
  emoji: '↩️',
  code, // Reference the code string defined above
  // func: reverseList_OldSteps, // func is usually removed, rely on generateSteps
  id: "reverse-linked-list", // Updated ID
  tags: ["Linked List", "Iteration"], // Updated tags
};

// Import or define necessary types and utilities
import {
  HighlightColor,
  Problem,
  ProblemState,
  ListNode,
  Variable,
  NodeHighlight,
} from "../types";
import { asList, asBooleanGroup, cloneList } from "../utils";

interface ReverseListInput {
  head: ListNode | null;
}

export function reverseList(input: ReverseListInput): ProblemState[] {
  let { head } = input;
  const steps: ProblemState[] = [];

  function log(
    point: number,
    head: ListNode | null,
    current: ListNode | null,
    prev: ListNode | null = null,
    next: ListNode | null = null
  ) {
    const variables: Variable[] = [
      asList("head", head, []),
      asList("current", current, []),
      asList("prev", prev, []),
      asList("next", next, []),
    ];
    steps.push({ variables, breakpoint: point });
  }

  function reverseLinkedList(head: ListNode | null): ListNode | null {
    let prev = null;
    let current = head;
    let next = null;

    log(1, head, current);
    while (current != null) {
      next = current.next; // Save next node
      current.next = prev; // Reverse current node's pointer
      prev = current; // Move pointers one position ahead
      current = next;

      log(2, head,  current, prev, next); // Log the state after updating links
    }

    log(3, head, current, prev, next); // Final state with the reversed list
    return prev;
  }

  reverseLinkedList(head);
  console.log("steps: ", steps);
  return steps;
}

const code = `function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev = null, current = head, next = null;
  //#1
  while (current != null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    //#2
  }
  //#3
  return prev;
}`;

const title = "Reverse Linked List";
const getInput = () => {
  const head: ListNode = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
          next: null,
        },
      },
    },
  };
  return { head:head };
};

export const reverseListProblem: Problem<ReverseListInput, ProblemState> = {
  title,
  code,
  getInput,
  func: reverseList,
  id: "reverse-list",
  tested: false,
  tags: ["linked-list"],
};

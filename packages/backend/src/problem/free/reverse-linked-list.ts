// Import or define necessary types and utilities
import {
  HighlightColor,
  Problem,
  ProblemState,
  ListNode,
  Variable,
  NodeHighlight,
} from "../core/types";
import { asList, asBooleanGroup, cloneList } from "../core/utils";

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
    next: ListNode | null = null,
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
    const head1 = cloneList(head);
    let prev = null;
    let current = head1
    let next = null;

    log(1, head1, current);
    while (current != null) {
      next = current.next; // Save next node
      log(2, head1,  current, prev, next); // Log the state after updating links
      current.next = prev; // Reverse current node's pointer
      log(3, head1,  current, prev, next); // Log the state after updating links
      prev = current; // Move pointers one position ahead
      log(4, head1,  current, prev, next); // Log the state after updating links
      current = next;
      log(5, head1,  current, prev, next); // Log the state after updating links
    }

    log(6, head1, current, prev, next); // Final state with the reversed list
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
    //#2
    current.next = prev;
    //#3
    prev = current;
    //#4
    current = next;
    //#5
  }
  //#6
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
          next: {
            val: 5,
            next: {
              val: 6,
              next: {
                val: 7,
                next: null,
              }
            }
          }
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

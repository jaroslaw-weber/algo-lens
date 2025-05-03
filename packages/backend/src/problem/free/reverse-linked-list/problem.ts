// Import necessary types and functions
import { Problem, ProblemState } from "algo-lens-core";
import { ReverseListInput } from "./types"; // Import from new types file
import { reverseList } from "./steps"; // Import from new steps file
import { getInput } from "./testcase"; // Import from new testcase file

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

export const problem: Problem<ReverseListInput, ProblemState> = {
  title,
  emoji: '↩️',
  code,
  func: reverseList,
  id: "reverse-list",
  tags: ["linked-list"],
  getInput: getInput, // Add getInput here
};

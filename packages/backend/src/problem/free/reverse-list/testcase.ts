import { ListNode } from "algo-lens-core";
import { ReverseListInput } from "./types";
import { TestCase } from "../../core/types"; // Assuming TestCase type location

// Helper to create list nodes easily
const listNodeFromLink = (arr: number[]): ListNode | null => {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
};


export const testcases: TestCase<ReverseListInput, ListNode | null>[] = [
  // Test Case 1: Empty List
  {
    input: { head: null },
    expected: null,
    description: "Empty list",
  },
  // Test Case 2: Single Element List
  {
    input: { head: new ListNode(1) },
    expected: new ListNode(1),
    description: "Single element list",
  },
  // Test Case 3: Multi-element list (1 -> 2 -> 3)
  {
    input: { head: listNodeFromLink([1, 2, 3]) },
    // Expected: 3 -> 2 -> 1
    expected: listNodeFromLink([3, 2, 1]),
    description: "List with multiple elements (1->2->3)",
  },
  // Test Case 4: Multi-element list (5 -> 8)
  {
    input: { head: listNodeFromLink([5, 8]) },
    // Expected: 8 -> 5
    expected: listNodeFromLink([8, 5]),
    description: "List with multiple elements (5->8)",
  },
];

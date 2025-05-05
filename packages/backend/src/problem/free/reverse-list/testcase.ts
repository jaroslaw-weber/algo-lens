import { ListNode, TestCase } from "algo-lens-core";
import { ReverseListInput } from "./types";

// Helper to create list nodes easily - will be defined in algo-lens-core or similar
// For now, assuming listNodeFromLink exists or manually creating nodes
// const listNodeFromLink = (arr: number[]): ListNode | null => { // Removed helper function
//   if (arr.length === 0) return null;
//   let head = new ListNode(arr[0]);
//   let current = head;
//   for (let i = 1; i < arr.length; i++) {
//     current.next = new ListNode(arr[i]);
//     current = current.next;
//   }
//   return head;
// };


export const testcases: TestCase<ReverseListInput, ListNode | null>[] = [ // Use imported TestCase
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
    // Manually create 1 -> 2 -> 3
    input: { head: new ListNode(1, new ListNode(2, new ListNode(3))) },
    // Expected: 3 -> 2 -> 1
    // Manually create 3 -> 2 -> 1
    expected: new ListNode(3, new ListNode(2, new ListNode(1))),
    description: "List with multiple elements (1->2->3)",
  },
  // Test Case 4: Multi-element list (5 -> 8)
  {
    // Manually create 5 -> 8
    input: { head: new ListNode(5, new ListNode(8)) },
    // Expected: 8 -> 5
    // Manually create 8 -> 5
    expected: new ListNode(8, new ListNode(5)),
    description: "List with multiple elements (5->8)",
  },
];

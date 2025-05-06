
import { ListNode, TestCase } from "algo-lens-core";

import { ReverseListInput } from "./types";



export const testcases = [
  {
    input: { head: null },
    expected: null,
    description: "Empty list",
  },
  {
    input: { head: new ListNode(1) },
    expected: new ListNode(1),
    description: "Single element list",
  },
  {
    // Manually create 1 -> 2 -> 3
    input: { head: new ListNode(1, new ListNode(2, new ListNode(3))) },
    // Expected: 3 -> 2 -> 1
    // Manually create 3 -> 2 -> 1
    expected: new ListNode(3, new ListNode(2, new ListNode(1))),
    description: "List with multiple elements (1->2->3)",
  ,
    isDefault: true},
  {
    // Manually create 5 -> 8
    input: { head: new ListNode(5, new ListNode(8)) },
    // Expected: 8 -> 5
    // Manually create 8 -> 5
    expected: new ListNode(8, new ListNode(5)),
    description: "List with multiple elements (5->8)",
  }
];

import { ListNode, TestCase } from "@algolens/core/src/types";

import { ReverseListInput } from "./types";

export const testcases = [
  {
    input: { head: new ListNode(1) },
    expected: [
      {
        next: null,
        value: 1,
      },
    ],
    name: "Single Element List",
    description: "Single element list",
  },
  {
    // Changed from 1->2->3 to 1->2->3->4->5
    // Manually create 1 -> 2 -> 3 -> 4 -> 5
    input: {
      head: new ListNode(
        1,
        new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
      ),
    },
    // Expected: 5 -> 4 -> 3 -> 2 -> 1
    // Manually create 5 -> 4 -> 3 -> 2 -> 1
    expected: [
      { value: 5, next: "node_3" },
      { value: 4, next: "node_2" },
      { value: 3, next: "node_1" },
      { value: 2, next: "node_0" },
      { value: 1, next: null },
    ],
    name: "Default 5 Elements",
    description: "List with 5 elements", // Updated description
    isDefault: true,
  },
  {
    // Manually create 5 -> 8
    input: { head: new ListNode(5, new ListNode(8)) },
    // Expected: 8 -> 5
    // Manually create 8 -> 5
    expected: [
      { value: 8, next: "node_0" },
      { value: 5, next: null },
    ],
    name: "Two Elements",
    description: "List with multiple elements (5->8)",
  },
  {
    // Manually create 1 -> 2 -> 3
    input: { head: new ListNode(1, new ListNode(2, new ListNode(3))) },
    // Expected: 3 -> 2 -> 1
    // Manually create 3 -> 2 -> 1
    expected: [
      { value: 3, next: "node_1" },
      { value: 2, next: "node_0" },
      { value: 1, next: null },
    ],
    name: "Three Elements",
    description: "List with three elements (1->2->3)",
  },
];

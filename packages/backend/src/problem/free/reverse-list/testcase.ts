import { ListNode, TestCase } from "algo-lens-core";

import { ReverseListInput } from "./types";

export const testcases = [
  {
    input: { head: new ListNode(1) },
    expected: (() => {
      const node = new ListNode(1);
      node.id = "1";
      return node;
    })(),
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
    expected: (() => {
      const node1 = new ListNode(1);
      node1.id = "5";
      const node2 = new ListNode(2, node1);
      node2.id = "4";
      const node3 = new ListNode(3, node2);
      node3.id = "3";
      const node4 = new ListNode(4, node3);
      node4.id = "2";
      const node5 = new ListNode(5, node4);
      node5.id = "1";
      return node5;
    })(),
    name: "Default 5 Elements",
    description: "List with 5 elements", // Updated description
    isDefault: true,
  },
  {
    // Manually create 5 -> 8
    input: { head: new ListNode(5, new ListNode(8)) },
    // Expected: 8 -> 5
    // Manually create 8 -> 5
    expected: (() => {
      const node1 = new ListNode(5);
      node1.id = "2";
      const node2 = new ListNode(8, node1);
      node2.id = "1";
      return node2;
    })(),
    name: "Two Elements",
    description: "List with multiple elements (5->8)",
  },
  {
    // Manually create 1 -> 2 -> 3
    input: { head: new ListNode(1, new ListNode(2, new ListNode(3))) },
    // Expected: 3 -> 2 -> 1
    // Manually create 3 -> 2 -> 1
    expected: (() => {
      const node1 = new ListNode(1);
      node1.id = "3";
      const node2 = new ListNode(2, node1);
      node2.id = "2";
      const node3 = new ListNode(3, node2);
      node3.id = "1";
      return node3;
    })(),
    name: "Three Elements",
    description: "List with three elements (1->2->3)",
  },
];

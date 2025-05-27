import { TestCase } from "../../../../algo-lens-core/types/core";
import { ListNode } from "./types";

// Helper function to create a linked list with a cycle
function createLinkedList(arr: number[], pos: number): ListNode | null {
  if (arr.length === 0) {
    return null;
  }

  const nodes: ListNode[] = arr.map((val) => ({ val, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos !== -1 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

export const testcases: TestCase<any, any>[] = [
  {
    id: 0,
    description: "No cycle, single node",
    input: { head: createLinkedList([1], -1) },
    expected: false,
  },
  {
    id: 1,
    description: "No cycle, multiple nodes",
    input: { head: createLinkedList([1, 2, 3, 4, 5], -1) },
    expected: false,
  },
  {
    id: 2,
    description: "Cycle, two nodes, cycle at head",
    input: { head: createLinkedList([1, 2], 0) },
    expected: true,
  },
  {
    id: 3,
    description: "Cycle, multiple nodes, cycle in middle",
    input: { head: createLinkedList([3, 2, 0, -4], 1) },
    expected: true,
  },
  {
    id: 4,
    description: "Cycle, multiple nodes, cycle at tail",
    input: { head: createLinkedList([1, 2, 3, 4], 3) },
    expected: true,
  },
  {
    id: 5,
    description: "Empty list",
    input: { head: createLinkedList([], -1) },
    expected: false,
  },
];

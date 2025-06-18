import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { DetectCycleInput } from "./types";
import { ListNode } from "algo-lens-core/src/types";


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

export const testcases: TestCase<DetectCycleInput, ProblemState>[] = [
  {
    name: "No cycle, single node",
    description: "No cycle, single node",
    input: createLinkedList([1], -1),
    serializer: "linked-list",
    expected: false,
  },
  {
    name: "No cycle, multiple nodes",
    description: "No cycle, multiple nodes",
    input: createLinkedList([1, 2, 3, 4, 5], -1),
    serializer: "linked-list",
    expected: false,
  },
  {
    name: "Cycle, two nodes, cycle at head",
    description: "Cycle, two nodes, cycle at head",
    input: createLinkedList([1, 2], 0),
    serializer: "linked-list",
    expected: true,
  },
  {
    name: "Cycle, multiple nodes, cycle in middle",
    description: "Cycle, multiple nodes, cycle in middle",
    input: createLinkedList([3, 2, 0, -4], 1),
    serializer: "linked-list",
    expected: true,
    isDefault: true,
  },
  {
    name: "Cycle, multiple nodes, cycle at tail",
    description: "Cycle, multiple nodes, cycle at tail",
    input: createLinkedList([1, 2, 3, 4], 3),
    serializer: "linked-list",
    expected: true,
  },
  {
    name: "Empty list",
    description: "Empty list",
    input: createLinkedList([], -1),
    serializer: "linked-list",
    expected: false,
  },
];

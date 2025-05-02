import { TestCase, ListNode } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface ReverseListInput {
  head: ListNode | null;
}

// Define the output type based on the expected return value of the core logic
type ReverseListOutput = ListNode | null;

// Helper function to create a linked list from an array of numbers
function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) {
    return null;
  }
  let head: ListNode = { val: arr[0], next: null };
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i], next: null };
    current = current.next;
  }
  return head;
}

// Define the test cases for the reverseList function
export const testcases: Array<TestCase<ReverseListInput, ReverseListOutput>> = [
  {
    input: {
      head: createLinkedList([1, 2, 3, 4, 5]),
    },
    expected: createLinkedList([5, 4, 3, 2, 1]),
    description: "Standard case with multiple nodes"
  },
  {
    input: {
      head: createLinkedList([1]),
    },
    expected: createLinkedList([1]),
    description: "Edge case with a single node"
  },
  {
    input: {
      head: createLinkedList([]),
    },
    expected: null,
    description: "Edge case with an empty list"
  },
  {
    input: {
      head: createLinkedList([1, 2]),
    },
    expected: createLinkedList([2, 1]),
    description: "Case with two nodes"
  }
];

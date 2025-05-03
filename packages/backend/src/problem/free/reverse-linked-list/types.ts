// Definition for singly-linked list node.
// Replicating the core definition often found in LeetCode or similar problems.
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Input type for the reverse linked list problem
export interface ReverseLinkedListInput {
  head: ListNode | null;
}

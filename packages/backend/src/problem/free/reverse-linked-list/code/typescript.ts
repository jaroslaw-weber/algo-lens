import { ListNode } from "algo-lens-core";

/**
 * Reverses a linked list.
 * This is the pure algorithmic implementation without logging or cloning.
 */
export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  let next: ListNode | null = null;

  while (current != null) {
    next = current.next; // Save next node
    current.next = prev; // Reverse current node's pointer
    prev = current; // Move pointers one position ahead
    current = next; // Move to the next node
  }

  return prev; // `prev` is the new head of the reversed list
}

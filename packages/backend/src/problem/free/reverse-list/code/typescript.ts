import { ListNode } from "algo-lens-core";

/**
 * Reverses a linked list.
 * This is the pure algorithmic implementation without logging or cloning.
 */
export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null; // Initialize previous node to null
  let current = head; // Start with the head of the list
  let next: ListNode | null = null; // Temporary variable to store the next node
  //#1 Initialize pointers

  // Iterate through the list until the end is reached (current becomes null)
  while (current != null) {
    //#2 Start loop iteration
    next = current.next; // Save the next node before changing the pointer
    //#3 Store next node
    current.next = prev; // Reverse the current node's pointer to point to the previous node
    //#4 Reverse pointer
    prev = current; // Move the 'prev' pointer to the current node
    //#5 Move prev pointer forward
    current = next; // Move the 'current' pointer to the next node (stored in 'next')
    //#6 Move current pointer forward
  }
  //#7 Loop finished

  // When the loop ends, 'prev' points to the new head of the reversed list.
  //#8 Return new head
  return prev;
}

import { ListNode } from './types';

/**
 * Clones a singly linked list.
 * @param head The head of the list to clone.
 * @returns The head of the new cloned list, or null if the input is null.
 */
export function cloneList(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  const newHead = new ListNode(head.val);
  let current = head.next;
  let newCurrent = newHead;

  while (current) {
    newCurrent.next = new ListNode(current.val);
    newCurrent = newCurrent.next;
    current = current.next;
  }

  return newHead;
}

/**
 * Creates a linked list from an array of numbers.
 * @param values The array of values.
 * @returns The head of the created linked list, or null if the array is empty.
 */
export function createList(values: number[]): ListNode | null {
  if (values.length === 0) {
    return null;
  }
  const head = new ListNode(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  return head;
}

/**
 * Converts a linked list to an array of numbers.
 * @param head The head of the linked list.
 * @returns An array containing the values of the list nodes in order.
 */
export function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

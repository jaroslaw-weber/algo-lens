function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev = null, current = head, next = null;
  //#1
  while (current != null) {
    next = current.next;
    //#2
    current.next = prev;
    //#3
    prev = current;
    //#4
    current = next;
    //#5
  }
  //#6
  return prev;
}

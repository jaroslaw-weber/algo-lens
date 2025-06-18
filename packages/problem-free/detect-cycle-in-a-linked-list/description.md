## Problem

Given the `head` of a singly linked list, return `true` if there is a cycle in the linked list. Otherwise, return `false`.

A cycle in a linked list means that some node in the list can be reached again by continuously following the `next` pointers. Internally, `pos` is used to denote the index of the node that the tail's `next` pointer is connected to. `pos` is `-1` if there is no cycle. **Note that `pos` is not passed as a parameter to your function.**

## Example

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node (0-indexed).

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

## Constraints

- The number of nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a **valid index** in the linked list.

## Edge Cases

- Empty list (head is null)
- Single node list
- List with no cycle
- List with cycle at the head (pos = 0)
- List with cycle at the tail (pos = last node index)
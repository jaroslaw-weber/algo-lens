import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
// Removed ProblemState, ListNode, Variable, asList, cloneList
import { ReverseListInput, ListNode } from "./types"; // Keep ReverseListInput, Import ListNode if needed for type hints

// Note: Since cloneList is removed, the visualization might show the original list structure
// being modified, which reflects the in-place nature of the algorithm.
// If a pristine 'initial head' view is needed, cloning would be required.

export function generateSteps(input: ReverseListInput) { // Renamed function, Return type inferred
  const { head } = input;
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Initialize pointers
  let prev: ListNode | null = null;
  let current = head; // Use the original head
  let next: ListNode | null = null;

  // Log initial state (#1)
  l.list("head", head, { group: "list" }); // Log original head
  l.list("current", current, { group: "pointers" });
  l.list("prev", prev, { group: "pointers" });
  l.list("next", next, { group: "pointers" });
  l.breakpoint(1);

  while (current != null) {
    // Save next node
    next = current.next;
    // Log state before reversing pointer (#2)
    l.list("head", head, { group: "list" }); // head reference doesn't change
    l.list("current", current, { group: "pointers" });
    l.list("prev", prev, { group: "pointers" });
    l.list("next", next, { group: "pointers" }); // next is now assigned
    l.breakpoint(2);

    // Reverse current node's pointer
    current.next = prev;
    // Log state after reversing pointer (#3)
    // The list structure starting from 'head' might look disconnected here in visualization
    l.list("head", head, { group: "list" }); // This view might be confusing as 'head's structure is being broken
    l.list("current", current, { group: "pointers" }); // current.next points to prev
    l.list("prev", prev, { group: "pointers" });
    l.list("next", next, { group: "pointers" });
    l.breakpoint(3);

    // Move prev pointer one step forward
    prev = current;
    // Log state after moving prev (#4)
    l.list("head", head, { group: "list" });
    l.list("current", current, { group: "pointers" }); // current remains the same here
    l.list("prev", prev, { group: "pointers" }); // prev now points to current
    l.list("next", next, { group: "pointers" });
    l.breakpoint(4);

    // Move current pointer one step forward
    current = next;
    // Log state after moving current (#5: start of next iteration or end)
    l.list("head", head, { group: "list" });
    l.list("current", current, { group: "pointers" }); // current moves to next
    l.list("prev", prev, { group: "pointers" });
    l.list("next", next, { group: "pointers" }); // next remains the same here
    l.breakpoint(5);
  }

  // Log final state (#6)
  // 'current' and 'next' are null, 'prev' is the new head
  l.list("head", head, { group: "list" }); // Original head reference (points to the original first node, now the last)
  l.list("current", current, { group: "pointers" }); // null
  l.list("prev", prev, { group: "pointers", label:"prev (new head)"}); // prev is the actual head of the reversed list
  l.list("next", next, { group: "pointers" }); // null
  l.list("result", prev, { group: "result" }); // Log 'prev' as the result head
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

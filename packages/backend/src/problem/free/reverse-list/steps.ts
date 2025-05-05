import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { ReverseListInput } from "./types"; // Keep ReverseListInput
import { ListNode, NodeHighlight, HighlightColor } from "algo-lens-core"; // Import ListNode, NodeHighlight and HighlightColor

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
  if (head) l.list("head", head, []); // Log original head, no highlight
  else l.simple({ head: null });
  if (current) l.list("current", current, [{ node: current, color: HighlightColor.Neutral }]); // Highlight current
  else l.simple({ current: null });
  // prev and next are null initially
  l.simple({ prev: null });
  l.simple({ next: null });
  l.breakpoint(1);

  while (current != null) {
    // Save next node
    next = current.next;
    // Log state before reversing pointer (#2)
    if (head) l.list("head", head, []); // No highlight
    else l.simple({ head: null });
    l.list("current", current, [{ node: current, color: HighlightColor.Neutral }]); // Highlight current
    if (prev) l.list("prev", prev, [{ node: prev, color: HighlightColor.Neutral }]); // Highlight prev
    else l.simple({ prev: null });
    if (next) l.list("next", next, [{ node: next, color: HighlightColor.Neutral }]); // Highlight next
    else l.simple({ next: null });
    l.breakpoint(2);

    // Reverse current node's pointer
    current.next = prev;
    // Log state after reversing pointer (#3)
    if (head) l.list("head", head, []); // No highlight
    else l.simple({ head: null });
    l.list("current", current, [{ node: current, color: HighlightColor.Neutral }]); // Highlight current (its .next changed)
    if (prev) l.list("prev", prev, [{ node: prev, color: HighlightColor.Neutral }]); // Highlight prev
    else l.simple({ prev: null });
    if (next) l.list("next", next, [{ node: next, color: HighlightColor.Neutral }]); // Highlight next
    else l.simple({ next: null });
    l.breakpoint(3);

    // Move prev pointer one step forward
    prev = current;
    // Log state after moving prev (#4)
    if (head) l.list("head", head, []); // No highlight
    else l.simple({ head: null });
    l.list("current", current, [{ node: current, color: HighlightColor.Neutral }]); // Highlight current
    l.list("prev", prev, [{ node: prev, color: HighlightColor.Neutral }]); // Highlight new prev
    if (next) l.list("next", next, [{ node: next, color: HighlightColor.Neutral }]); // Highlight next
    else l.simple({ next: null });
    l.breakpoint(4);

    // Move current pointer one step forward
    current = next;
    // Log state after moving current (#5: start of next iteration or end)
    if (head) l.list("head", head, []); // No highlight
    else l.simple({ head: null });
    if (current) l.list("current", current, [{ node: current, color: HighlightColor.Neutral }]); // Highlight new current
    else l.simple({ current: null });
    l.list("prev", prev, [{ node: prev, color: HighlightColor.Neutral }]); // Highlight prev
    if (next) l.list("next", next, [{ node: next, color: HighlightColor.Neutral }]); // Highlight next (doesn't change here, but log for consistency)
    else l.simple({ next: null });
    l.breakpoint(5);
  }

  // Log final state (#6)
  // 'current' and 'next' are null, 'prev' is the new head
  if (head) l.list("head", head, []); // Original head reference, no highlight
  else l.simple({ head: null });
  l.simple({ current: null }); // current is null
  if (prev) l.list("prev", prev, [{ node: prev, color: HighlightColor.Good }]); // Highlight prev as new head
  else l.simple({ prev: null });
  l.simple({ next: null }); // next is null
  if (prev) l.list("result", prev, [{ node: prev, color: HighlightColor.Good }]); // Highlight result (same as prev)
  else l.simple({ result: null });
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

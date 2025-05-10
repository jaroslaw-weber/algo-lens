import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { ReverseListInput } from "./types"; // Import only ReverseListInput from local types
import { ListNode, NodeHighlight, ProblemState } from "algo-lens-core"; // Import ListNode and NodeHighlight from core

// Note: This function now generates the detailed steps for the visualization.
// It doesn't call the original solution function directly.
// The original solution function will be called by problem.ts's func.

export function generateSteps(input: ReverseListInput): ProblemState[] {
  // Added return type hint
  const { head } = input;
  const l = new StepLoggerV2();

  // Initialize pointers
  let prev: ListNode | null = null;
  let current = head;
  let next: ListNode | null = null;

  // Log initial state (#1)
  l.list("head", head!, []); // Log original head structure
  if (current)
    l.list("current", current, [{ node: current, color: "neutral" }]);
  // Color: neutral
  else l.simple({ current: null });
  l.simple({ prev: null });
  l.simple({ next: null });
  l.breakpoint_explanation = "Initial state: prev = null, current = head, next = null.";
  l.breakpoint(1);

  while (current != null) {
    // Save next node
    next = current.next;
    // Log state before reversing pointer (#2)
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    if (prev) l.list("prev", prev, [{ node: prev, color: "neutral" }]);
    // Color: neutral
    else l.simple({ prev: null });
    if (next) l.list("next", next, [{ node: next, color: "neutral" }]);
    // Color: neutral
    else l.simple({ next: null });
    l.breakpoint_explanation = `Saved next = current.next. Current: ${current.val}, Next: ${next ? next.val : 'null'}.`;
    l.breakpoint(2);

    // Reverse current node's pointer
    current.next = prev;
    // Log state after reversing pointer (#3)
    // The 'head' variable still points to the original head, but the list structure accessible from it has changed
    // Logging 'head' might be confusing here if not careful. Let's keep logging it to show the detached original list.
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    if (prev) l.list("prev", prev, [{ node: prev, color: "neutral" }]);
    // Color: neutral
    else l.simple({ prev: null });
    if (next) l.list("next", next, [{ node: next, color: "neutral" }]);
    // Color: neutral
    else l.simple({ next: null });
    l.breakpoint_explanation = `Reversed current.next to point to prev. Current: ${current.val}, Prev: ${prev ? prev.val : 'null'}.`;
    l.breakpoint(3);

    // Move prev pointer one step forward
    prev = current;
    // Log state after moving prev (#4)
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    l.list("prev", prev, [{ node: prev, color: "neutral" }]); // Color: neutral (new prev)
    if (next) l.list("next", next, [{ node: next, color: "neutral" }]);
    // Color: neutral
    else l.simple({ next: null });
    l.breakpoint_explanation = `Moved prev to current. Prev: ${prev.val}.`;
    l.breakpoint(4);

    // Move current pointer one step forward
    current = next;
    // Log state after moving current (#5: start of next iteration or end)
    if (head) l.list("head", head, []); // No highlight
    else l.simple({ head: null });
    if (current) l.list("current", current, [{ node: current, color: "good" }]);
    // Highlight new current
    else l.simple({ current: null });
    l.list("prev", prev, [{ node: prev, color: "neutral" }]); // Highlight prev
    if (next) l.list("next", next, [{ node: next, color: "bad" }]);
    // Highlight next (doesn't change here, but log for consistency)
    else l.simple({ next: null });
    l.breakpoint_explanation = `Moved current to next. New Current: ${current ? current.val : 'null'}. This is the new current for the next iteration or null if end.`;
    l.breakpoint(5);
  }

  // Log final state (#6)
  // 'current' and 'next' are null, 'prev' is the new head
  if (head) l.list("head", head, []); // Original head reference, no highlight
  else l.simple({ head: null });
  l.simple({ current: null }); // current is null
  if (prev) l.list("prev", prev, [{ node: prev, color: "neutral" }]);
  // Highlight prev as new head
  else l.simple({ prev: null });
  l.simple({ next: null }); // next is null
  if (prev) l.list("result", prev, [{ node: prev, color: "neutral" }]);
  // Highlight result (same as prev)
  else l.simple({ result: null });
  l.breakpoint_explanation = "Loop finished. current is null. prev is the new head (result).";
  l.breakpoint(6);

  return l.getSteps();
}

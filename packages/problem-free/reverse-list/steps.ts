import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import { ReverseListInput } from "./types"; // Import only ReverseListInput from local types
import { ListNode, NodeHighlight, ProblemState } from "algo-lens-core/src/types";
 // Import ListNode and NodeHighlight from core

// Note: This function now generates the detailed steps for the visualization.
// It doesn't call the original solution function directly.
// The original solution function will be called by problem.ts's func.

export function generateSteps(input: ReverseListInput): ProblemState[] {
  // Added return type hint
  const { head } = input; // HIDE
  const l = new StepLoggerV2();

  // Initialize pointers
  let prev: ListNode | null = null;
  let current = head;
  let next: ListNode | null = null;

  // Log initial state (#1)
  l.list("head", head!, []); // Log original head structure
  l.list("current", current, [{ node: current, color: "neutral" }]);
  l.simple({ prev: null });
  l.simple({ next: null });
  l.comment =
    "Initialize three pointers: 'prev' to null (it will point to the previously reversed node), 'current' to the head of the list (the node being processed), and 'next' to null (it will temporarily store the next node).";
  l.breakpoint(1);

  while (current != null) {
    // Save next node
    next = current.next;
    // Log state before reversing pointer (#2)
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    l.list("prev", prev, [{ node: prev, color: "neutral" }]);
    l.list("next", next, [{ node: next, color: "neutral" }]);
    l.comment = `Save next node. Current: ${current.val}. Next: ${next ? next.val : "null"}.`;
    l.breakpoint(2);

    // Reverse current node's pointer
    current.next = prev;
    // Log state after reversing pointer (#3)
    // The 'head' variable still points to the original head, but the list structure accessible from it has changed
    // Logging 'head' might be confusing here if not careful. Let's keep logging it to show the detached original list.
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    l.list("prev", prev, [{ node: prev, color: "neutral" }]);
    l.list("next", next, [{ node: next, color: "neutral" }]);
    l.comment = `Reverse current node's pointer to prev.`;
    l.breakpoint(3);

    // Move prev pointer one step forward
    prev = current;
    // Log state after moving prev (#4)
    l.list("head", head!, []);
    l.list("current", current, [{ node: current, color: "neutral" }]); // Color: neutral
    l.list("prev", prev, [{ node: prev, color: "neutral" }]); // Color: neutral (new prev)
    l.list("next", next, [{ node: next, color: "neutral" }]);
    l.comment = `Move prev pointer to current. New prev: ${prev.val}.`;
    l.breakpoint(4);

    // Move current pointer one step forward
    current = next;
    // Log state after moving current (#5: start of next iteration or end)
    l.list("head", head, []); // No highlight
    l.list("current", current, [{ node: current, color: "good" }]);
    l.list("prev", prev, [{ node: prev, color: "neutral" }]); // Highlight prev
    l.list("next", next, [{ node: next, color: "bad" }]);
    l.comment = `Move current pointer to next. New current: ${current ? current.val : "null"}.`;
    l.breakpoint(5);
  }

  // Log final state (#6)
  // 'current' and 'next' are null, 'prev' is the new head
  l.list("head", head, []);
  l.simple({ current: null }); // current is null
  l.list("prev", prev, [{ node: prev, color: "neutral" }]);
  // Highlight prev as new head
  l.simple({ next: null }); // next is null
  l.list("result", prev, [{ node: prev, color: "neutral" }]);
  // Highlight result (same as prev)
  l.comment =
    "The loop has finished because 'current' is null, indicating the end of the original list has been reached. The 'prev' pointer now points to the last node of the original list, which is the new head of the reversed list. The 'result' is the new head.";
  l.breakpoint(6);

  return l.getSteps();
}

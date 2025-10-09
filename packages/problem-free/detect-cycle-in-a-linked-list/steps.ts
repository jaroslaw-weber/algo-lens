import { ProblemState } from "@algolens/core/src/types";

import { StepLoggerV2 } from "@algolens/core/src/StepLoggerV2";
import { DetectCycleInput } from "./types";
import { ListNode } from "@algolens/core/src/types";

export function generateSteps(head: DetectCycleInput): ProblemState[] {
  const l = new StepLoggerV2();

  if (head === undefined || head === null) {
    l.list("head", head);
    l.simple({ result: false });
    l.comment = "The linked list is empty, so no cycle can exist.";
    l.breakpoint(1);
    return l.getSteps();
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  l.list("head", head, [
    {
      node: slow,
      color: "good",
      label: "slow",
      tooltip: {
        position: "bottom",
      },
    },
    {
      node: fast,
      color: "neutral",
      label: "fast",
      tooltip: { position: "top" },
    },
  ]);
  l.list("slow", slow, [{ node: slow, color: "neutral" }]);
  l.list("fast", fast, [{ node: fast, color: "neutral" }]);
  l.comment =
    "Initialize slow and fast pointers to the head of the linked list.";
  l.breakpoint(1);

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    l.list("head", head, [
      {
        node: slow,
        color: "good",
        label: "slow",
        tooltip: { position: "bottom" },
      },
      {
        node: fast,
        color: "neutral",
        label: "fast",
        tooltip: { position: "top" },
      },
    ]);
    l.list("slow", slow, [{ node: slow, color: "neutral", label: "slow" }]);
    l.list("fast", fast, [{ node: fast, color: "neutral", label: "fast" }]);
    l.comment = "Move slow pointer one step and fast pointer two steps.";
    l.breakpoint(2);

    if (slow === fast) {
      l.list("head", head, [
        {
          node: slow,
          color: "good",
          label: "slow",
          tooltip: { position: "bottom" },
        },
        {
          node: fast,
          color: "neutral",
          label: "fast",
          tooltip: { position: "top" },
        },
      ]);
      l.list("slow", slow, [{ node: slow, color: "good" }]);
      l.list("fast", fast, [{ node: fast, color: "good" }]);
      l.simple({ result: true });
      l.comment = "Slow and fast pointers met, a cycle is detected.";
      l.breakpoint(3);
      return l.getSteps();
    }
  }

  l.list("head", head);
  l.list("slow", slow, [{ node: slow, color: "bad" }]);
  l.list("fast", fast, [{ node: fast, color: "bad" }]);
  l.simple({ result: false });
  l.comment = "Fast pointer reached the end, no cycle is detected.";
  l.breakpoint(4);

  return l.getSteps();
}

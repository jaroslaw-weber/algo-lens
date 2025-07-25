import { ProblemState } from "algo-lens-core/src/types";

import { TreeNode } from "./types";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";

export function generateSteps(input: {
  root: TreeNode | null;
}): ProblemState[] {
  const { root } = input; // HIDE

  let result = 0;
  const l = new StepLoggerV2();

  l.comment = "Start by initializing the maximum depth to 0.";
  l.simple({ maxDepth: 0 });
  l.breakpoint(1);

  if (!root) {
    l.comment = "The tree is empty, so the maximum depth is 0.";
    l.simple({ result: 0 });
    l.breakpoint(2);
    return l.getSteps();
  }
  l.tree("tree", root);

  l.comment =
    "Initialize a queue for BFS with the root node and its depth (1).";
  const queue: { node: TreeNode; depth: number }[] = [{ node: root, depth: 1 }];
  l.simple({ maxDepth: 1 }); // Initial maxDepth is 1 if root exists
  l.breakpoint(3);

  let maxDepth = 1;

  while (queue.length > 0) {
    l.comment = "Dequeue the current node and its depth.";
    const { node, depth } = queue.shift()!;
    l.simple({ node: node.val, depth: depth });
    l.tree("tree", root, [{ node, color: "bad" }]);
    l.breakpoint(4);

    l.comment = "Update the maximum depth if the current depth is greater.";
    maxDepth = Math.max(maxDepth, depth);
    l.simple({ maxDepth: maxDepth });
    l.breakpoint(5);

    if (node.left) {
      l.comment =
        "If the left child exists, enqueue it with an incremented depth.";
      queue.push({ node: node.left, depth: depth + 1 });
      l.simple({ node: node.left.val, depth: depth + 1 });
      l.tree("tree", root, [{ node: node.left, color: "good" }]);
      l.breakpoint(6);
    }

    if (node.right) {
      l.comment =
        "If the right child exists, enqueue it with an incremented depth.";
      queue.push({ node: node.right, depth: depth + 1 });
      l.simple({ node: node.right.val, depth: depth + 1 });
      l.tree("tree", root, [{ node: node.right, color: "good" }]);
      l.breakpoint(7);
    }
  }
  result = maxDepth;

  l.comment = "All nodes have been visited. The maximum depth is the result.";
  l.simple({ result });
  l.breakpoint(8);

  return l.getSteps();
}

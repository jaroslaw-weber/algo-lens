import { describe, it, expect } from "vitest";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { TreeNode } from "./types";

// Helper function to calculate max depth for verification
function calculateMaxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let maxDepth = 0;
  const queue: { node: TreeNode; depth: number }[] = [{ node: root, depth: 1 }];

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;
    maxDepth = Math.max(maxDepth, depth);

    if (node.left) {
      queue.push({ node: node.left, depth: depth + 1 });
    }
    if (node.right) {
      queue.push({ node: node.right, depth: depth + 1 });
    }
  }
  return maxDepth;
}

describe("Maximum Depth of Binary Tree", () => {
  testcases.forEach((testcase) => {
    it(`Test Case ${testcase.id}: ${testcase.description}`, () => {
      const steps = generateSteps(testcase.input);

      // Ensure steps are generated
      expect(steps.length).toBeGreaterThan(0);

      // Verify the final result from the steps
      const finalStep = steps[steps.length - 1];
      const resultVariable = finalStep.variables.find(
        (v) => "name" in v && v.name === "result"
      );

      expect(resultVariable).toBeDefined();
      if (resultVariable && "value" in resultVariable) {
        expect(resultVariable.value).toEqual(testcase.expected);
      } else {
        throw new Error(
          "Result variable not found or does not have a 'value' property."
        );
      }

      // Optional: Verify the result using a direct calculation
      const directCalculatedDepth = calculateMaxDepth(testcase.input.root);
      expect(directCalculatedDepth).toEqual(testcase.expected);
    });
  });
});

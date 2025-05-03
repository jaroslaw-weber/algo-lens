import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { SameTreeInput, TreeNode } from './types';
// Assuming tree visualization helpers/loggers are available in StepLoggerV2 or imported

export function generateSteps(p: SameTreeInput) {
  const l = new StepLoggerV2();
  const { p: pTree, q: qTree } = p;

  // Initial state logging
  l.binaryTree('pTree', pTree); // Log initial tree P
  l.binaryTree('qTree', qTree); // Log initial tree Q
  l.snapshot('Initial input trees P and Q');

  // Inner recursive function to perform comparison and logging
  function compareNodes(pNode: TreeNode | null, qNode: TreeNode | null): boolean {
      // Log current nodes being compared and highlight them in the trees
      l.nodePointer('currentNodeP', pNode, 'pTree'); // Point to current P node in pTree visual
      l.nodePointer('currentNodeQ', qNode, 'qTree'); // Point to current Q node in qTree visual
      l.snapshot(`Comparing nodes: p = ${pNode?.val ?? 'null'}, q = ${qNode?.val ?? 'null'}`);

      // Breakpoint #1: Entry point for comparing a pair of nodes
      l.breakpoint(1);

      // Base Case 1: Both nodes are null
      if (!pNode && !qNode) {
          l.boolean('comparisonResult', true);
          l.snapshot('Both nodes are null, they are identical.');
          l.breakpoint(2); // Breakpoint #2: Both null -> true
          return true;
      }

      // Base Case 2: One node is null, the other is not
      if (!pNode || !qNode) {
          l.boolean('comparisonResult', false);
          l.snapshot('One node is null, the other is not. Trees are different.');
          l.breakpoint(3); // Breakpoint #3: One null -> false
          return false;
      }

      // Base Case 3: Node values are different
      if (pNode.val !== qNode.val) {
          l.boolean('comparisonResult', false);
          l.snapshot(`Node values differ (${pNode.val} != ${qNode.val}). Trees are different.`);
           l.nodePointer('currentNodeP', pNode, 'pTree', { color: 'error' }); // Highlight differing nodes
           l.nodePointer('currentNodeQ', qNode, 'qTree', { color: 'error' });
          l.breakpoint(4); // Breakpoint #4: Values differ -> false
          return false;
      }

       // If values are the same, highlight as matching for this step
       l.boolean('comparisonResult', true); // Tentatively true for this node
       l.snapshot(`Node values are the same (${pNode.val}). Checking subtrees...`);
       l.nodePointer('currentNodeP', pNode, 'pTree', { color: 'success' }); // Highlight matching nodes
       l.nodePointer('currentNodeQ', qNode, 'qTree', { color: 'success' });


      // Recursive calls - StepLoggerV2 automatically handles call stack visualization if supported
      l.snapshot(`Recursively comparing left children...`);
      const leftSame = compareNodes(pNode.left, qNode.left);

      // Log result of left subtree comparison before proceeding to right
      l.snapshot(`Left subtree comparison result: ${leftSame}`);
       if (!leftSame) {
          l.boolean('finalResult', false); // Log final result early if left fails
          l.snapshot('Left subtrees differ, returning false.');
          l.breakpoint(5); // Breakpoint #5: After recursive calls, before returning combined result (failed left)
          return false; // Early exit if left subtrees are different
       }

      l.snapshot(`Recursively comparing right children...`);
      const rightSame = compareNodes(pNode.right, qNode.right);

       // Log result of right subtree comparison
       l.snapshot(`Right subtree comparison result: ${rightSame}`);
       if (!rightSame) {
          l.boolean('finalResult', false); // Log final result early if right fails
          l.snapshot('Right subtrees differ, returning false.');
          l.breakpoint(5); // Breakpoint #5: After recursive calls, before returning combined result (failed right)
          return false; // Early exit if right subtrees are different
       }

      // If both subtrees are the same
      l.boolean('finalResult', true); // Log final result (true for this path)
      l.snapshot(`Both left and right subtrees are identical. Returning true for this node.`);
      l.breakpoint(5); // Breakpoint #5: After recursive calls, returning combined result (success)
      return true;
  }

  const finalResult = compareNodes(pTree, qTree);

  // Log final overall result
  l.boolean('finalResult', finalResult);
  l.snapshot(`Overall comparison finished. Result: ${finalResult}`);

  return l.getSteps();
}

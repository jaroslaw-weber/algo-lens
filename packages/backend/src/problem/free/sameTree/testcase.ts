import { BinaryTreeNode } from "algo-lens-core";
import { SameTreeInput } from "./types";

// Helper to create a simple node
const N = (val: number, left: BinaryTreeNode | null = null, right: BinaryTreeNode | null = null): BinaryTreeNode => ({ val, left, right });

// 1. Identical Simple Trees
export const getIdenticalSimpleTrees = (): SameTreeInput => ({
  p: N(1, N(2), N(3)),
  q: N(1, N(2), N(3)),
});

// 2. Same Structure, Different Values
export const getDifferentValuesTrees = (): SameTreeInput => ({
  p: N(1, N(2), N(3)),
  q: N(1, N(99), N(3)), // Different value at node 2
});

// 3. Different Structures
export const getDifferentStructureTrees = (): SameTreeInput => ({
  p: N(1, N(2), null),       // p has left child only
  q: N(1, null, N(3)),       // q has right child only
});

// 4. Both Null
export const getBothNullTrees = (): SameTreeInput => ({
  p: null,
  q: null,
});

// 5. One Null (p is null)
export const getOneNullPTrees = (): SameTreeInput => ({
  p: null,
  q: N(1, N(2), N(3)),
});

// 5. One Null (q is null)
export const getOneNullQTrees = (): SameTreeInput => ({
  p: N(1, N(2), N(3)),
  q: null,
});

// 6. Identical Complex Trees
export const getIdenticalComplexTrees = (): SameTreeInput => {
  const p: BinaryTreeNode = N(1,
    N(2, N(4), N(5)),
    N(3, N(6), N(7))
  );
  const q: BinaryTreeNode = N(1,
    N(2, N(4), N(5)),
    N(3, N(6), N(7))
  );
  return { p, q };
};

// 7. Different Complex Trees (Original getInput renamed)
export const getDifferentComplexTrees = (): SameTreeInput => {
 const p: BinaryTreeNode = N(1,
    N(2, N(4), N(5)),
    N(3, N(6), N(7))
  );
  const q: BinaryTreeNode = N(1,
    N(2, N(4), N(5)),
    N(3, N(6), N(8)) // Difference here
  );
  return { p, q };
};

// Keep the original getInput function name for backward compatibility or default test?
// Or rename it to avoid confusion. Let's rename it (done above).
// You can add a default export or a specific function if one case is primary.
export const defaultInput = getDifferentComplexTrees;

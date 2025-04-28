import { TreeNode } from "algo-lens-core";
import { SameTreeInput } from "./types";

// Test Case 1: Trees are the same
const p1: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: null },
  right: { val: 3, left: null, right: null },
};
const q1: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: null },
  right: { val: 3, left: null, right: null },
};
const testcase1: SameTreeInput = { p: p1, q: q1 };

// Test Case 2: Trees have different values
const p2: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: null },
};
const q2: TreeNode = {
  val: 1,
  right: { val: 2, left: null, right: null },
};
const testcase2: SameTreeInput = { p: p2, q: q2 };

// Test Case 3: Trees have different structures (using example from original getInput)
const p3: TreeNode = {
    val: 1,
    left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
    right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } },
};
const q3: TreeNode = {
    val: 1,
    left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
    right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 8, left: null, right: null } }, // Diff value
};
const testcase3: SameTreeInput = { p: p3, q: q3 };

// Test Case 4: One tree is null
const p4: TreeNode = { val: 1, left: null, right: null };
const testcase4: SameTreeInput = { p: p4, q: null };

// Test Case 5: Both trees are null
const testcase5: SameTreeInput = { p: null, q: null };


// Export the test cases
export default [testcase1, testcase2, testcase3, testcase4, testcase5];

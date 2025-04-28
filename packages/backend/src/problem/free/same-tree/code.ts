export const code = `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  //#1
  if (!p && !q) {
    //#2
    return true; 
  }
  if (!p || !q) {
    //#3
    return false; 
  }
  if (p.val !== q.val) {
    //#4
    return false; 
  }
  const result = isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  //#5
  return result; 
}`;

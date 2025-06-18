export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export type BinaryTree = TreeNode | null;

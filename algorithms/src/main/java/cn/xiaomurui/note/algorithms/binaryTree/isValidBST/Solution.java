package cn.xiaomurui.note.algorithms.binaryTree.isValidBST;

class Solution {
    /*
    1.确定返回值和参数，
        1. 因为子树也要是二叉搜索树，返回值为bool
     */
    TreeNode pre = null;

    public boolean isValidBST(TreeNode root) {
        // 2. 确定终止体条件
        if (root == null) return true;

        // 3.单层递归逻辑
        if (!isValidBST(root.left)) {
            return false;
        }

        if (pre != null && pre.val >= root.val) {
            return false;
        }
        pre = root;

        if (!isValidBST(root.right)) {
            return false;
        }

        return true;
    }
}
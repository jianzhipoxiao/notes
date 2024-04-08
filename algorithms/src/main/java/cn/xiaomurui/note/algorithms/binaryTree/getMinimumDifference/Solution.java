package cn.xiaomurui.note.algorithms.binaryTree.getMinimumDifference;


class Solution {

    int min = Integer.MAX_VALUE;

    TreeNode pre = null;

    public int getMinimumDifference(TreeNode root) {
        //
        traversal(root);
        return min;
    }


    // 1.确定参数返回类型和参数
    public void traversal(TreeNode root) {
        if (root == null) return;
        traversal(root.left);
        if (pre != null && root.val - pre.val < min) {
            min = root.val - pre.val;
        }
        pre = root;
        traversal(root.right);
    }
}
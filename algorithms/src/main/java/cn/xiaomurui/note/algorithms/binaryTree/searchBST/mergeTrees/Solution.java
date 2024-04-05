package cn.xiaomurui.note.algorithms.binaryTree.searchBST.mergeTrees;

 class Solution {
    // 1.确定参数类型和返回值
    public TreeNode searchBST(TreeNode root, int val) {
        // 2.确定终止条件
        if (root == null) return null;
        if (root.val == val) {
            return root;
        }

        // 3.确定单层逻辑
        TreeNode result = null;
        if (val > root.val) {
            result = searchBST(root.right, val);
        } else {
            result = searchBST(root.left, val);
        }
        return result;

    }
}
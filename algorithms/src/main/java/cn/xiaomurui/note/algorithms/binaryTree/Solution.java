package cn.xiaomurui.note.algorithms.binaryTree;

import java.util.Deque;
import java.util.LinkedList;

class Solution {
    public int sumOfLeftLeaves(TreeNode root) {
        //递归法，后续遍历
        //2递归终止条件
        if (root == null)
            return 0;
        if (root.left == null && root.right == null)
            return 0;
        //3单层逻辑处理
        int leftValue = sumOfLeftLeaves(root.left);
        //左叶子节点判断，只能在父节点上判断
        if (root.left != null && root.left.left == null && root.left.right == null) {
            leftValue = root.left.val;
        }
        int rightValue = sumOfLeftLeaves(root.right);
        return leftValue + rightValue;
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    public TreeNode() {
    }

    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
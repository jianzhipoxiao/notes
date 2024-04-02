package cn.xiaomurui.note.algorithms.binaryTree.buildTree;

import java.lang.reflect.Array;
import java.util.Arrays;

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    /** 后序和中序
     * public TreeNode buildTree(int[] inorder, int[] postorder) {
     * return traversal(inorder, postorder);
     * }
     */

    /**
     * 前序和中序
     *
     * @param preorder 前序
     * @param inorder  中序
     * @return 二叉树根节点
     */
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return traversal(inorder, preorder);
    }

    //1确定参数类别和返回值
    TreeNode traversal(int[] inorder, int[] postorder) {
        //2确定返回值
        if (postorder.length == 0) return null;

        //3确定单层的逻辑
        //找到根节点
        TreeNode root = new TreeNode(postorder[0]);
        if (postorder.length == 1) return root;

        //切割中序数组
        int index = 0;
        for (index = 0; index < inorder.length; index++) {
            if (inorder[index] == root.val)
                break;
        }
        int[] inorderLeft = Arrays.copyOfRange(inorder, 0, index);
        int[] inorderRight = Arrays.copyOfRange(inorder, (index + 1), inorder.length);

        //切割前序数组

        int[] postorderLeft = Arrays.copyOfRange(postorder, 1, inorderLeft.length+1);
        int[] postorderRight = Arrays.copyOfRange(postorder, inorderLeft.length+1, postorder.length - 1+1);

        root.left = traversal(inorderLeft, postorderLeft);
        root.right = traversal(inorderRight, postorderRight);
        return root;
    }
}
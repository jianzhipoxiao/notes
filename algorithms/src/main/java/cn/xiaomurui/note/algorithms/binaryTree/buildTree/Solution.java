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
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        return null;

    }

    //1确定参数类别和返回值
    TreeNode traversal(int[] inorder, int[] postorder) {
        //2确定返回值
        if (postorder.length == 0) return null;

        //3确定单层的逻辑
        //找到根节点
        TreeNode root = new TreeNode(inorder[inorder.length - 1]);
        if (postorder.length == 1) return root;

        //切割中序数组
        int index = 0;
        for (index = 0; index < inorder.length; index++) {
            if (inorder[index] == root.val)
                break;
        }
        int[] inorderLeft = new int[index];
        Arrays.copyOf(inorderLeft,index);
return null;
    }
}
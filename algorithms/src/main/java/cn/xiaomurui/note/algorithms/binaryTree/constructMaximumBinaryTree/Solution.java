package cn.xiaomurui.note.algorithms.binaryTree.constructMaximumBinaryTree;

import java.util.Arrays;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
    public static void main(String[] args) {
        new Solution().constructMaximumBinaryTree(new int[]{3, 2, 1, 6, 0, 5});
    }

    //1确定参数和返回值
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        //2确定终止条件
        if (nums.length == 0) return null;
        //3确定单层递归逻辑
        //3.1找数组最大值
        int maxValue = Integer.MIN_VALUE;
        int index = 0;
        for (int i = 0; i < nums.length; i++) {
            if (maxValue <= nums[i]) {
                maxValue = nums[i];
                index = i;
            }
        }
        TreeNode root = new TreeNode(maxValue);

        //3.2切分数组
        int[] leftNums = Arrays.copyOfRange(nums, 0, index);
        int[] rightNums = Arrays.copyOfRange(nums, index + 1, nums.length);
        root.left = constructMaximumBinaryTree(leftNums);
        root.right = constructMaximumBinaryTree(rightNums);

        return root;

    }
}
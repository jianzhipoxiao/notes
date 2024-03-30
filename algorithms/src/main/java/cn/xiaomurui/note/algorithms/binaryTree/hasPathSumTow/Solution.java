package cn.xiaomurui.note.algorithms.binaryTree.hasPathSumTow;

import java.util.ArrayList;
import java.util.List;

class Solution {
    public static void main(String[] args) {
        TreeNode node1 = new TreeNode(5, null, null);
        TreeNode node2 = new TreeNode(4, null, null);
        TreeNode node3 = new TreeNode(8, null, null);
        TreeNode node4 = new TreeNode(11, null, null);
        TreeNode node5 = new TreeNode(13, null, null);
        TreeNode node6 = new TreeNode(4, null, null);
        TreeNode node7 = new TreeNode(7, null, null);
        TreeNode node8 = new TreeNode(2, null, null);
        TreeNode node9 = new TreeNode(5, null, null);
        TreeNode node10 = new TreeNode(1, null, null);
        node1.left = node2;
        node1.right = node3;
        node2.left = node4;
        node3.left = node5;
        node3.right = node6;
        node4.left = node7;
        node4.right = node8;
        node6.left = node9;
        node6.right = node10;
        List<List<Integer>> lists = new Solution().pathSum(node1, 22);
        System.out.println(lists);
    }

    //递归法，前序遍历
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        List<Integer> temp = new ArrayList<>();
        temp.add(root.val);
        traversal(root, targetSum - root.val, result, temp);
        return result;
    }


    //1确定参数和返回值
    void traversal(TreeNode root, int count, List<List<Integer>> result, List<Integer> temp) {
        //2确定终止条件
        if (root.left == null && root.right == null && count == 0) {
            List<Integer> res = new ArrayList<>();
            res.addAll(temp);
            result.add(res);
            return;
        }
        if (root.left == null && root.right == null && count != 0) {
            return;
        }


        if (root.left != null) {
            count -= root.left.val;
            temp.add(root.left.val);
            traversal(root.left, count, result, temp);
            //回溯
            temp.remove(temp.size() - 1);
            count += root.left.val;
        }
        if (root.right != null) {
            count -= root.right.val;
            temp.add(root.right.val);
            traversal(root.right, count, result, temp);
            //回溯
            temp.remove(temp.size() - 1);
            count += root.right.val;
        }
    }
}


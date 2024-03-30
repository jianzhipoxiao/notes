package cn.xiaomurui.note.algorithms.binaryTree.hasPathSum;

class Solution {
    //递归法，前序遍历
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        return traversal(root, targetSum - root.val);
    }

    //1确定参数类型返回值，逆向思维，将target直接作为参数传入一路向下减
    boolean traversal(TreeNode root, int count) {
        //2确定终止条件
        if (root.left == null && root.right == null && count == 0)
            return true;
        if (root.left == null && root.right == null && count != 0)
            return false;
        //3单层递归的逻辑 中为空不做处理
        //左
        if (root.left != null) {
            count -= root.left.val;
            if (traversal(root.left, count))
                return true;
            //回溯恢复count的值
            count += root.left.val;
        }
        //右
        if (root.right != null) {
            count -= root.right.val;
            if (traversal(root.right, count))
                return true;
            //回溯恢复count的值
            count += root.right.val;
        }
        return false;

    }
}


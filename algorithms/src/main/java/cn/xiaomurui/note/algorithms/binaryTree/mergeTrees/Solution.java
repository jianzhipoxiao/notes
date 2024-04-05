package cn.xiaomurui.note.algorithms.binaryTree.mergeTrees;

class Solution {
    // 1.参数返回值，参数类型
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        // 2.确定终止体条件
        if (root1 == null) return root2; // root1=null&&root2=null 包含在内
        if (root2 == null) return root1;
        //在root1树上修改
        root1.val += root2.val;

        // 3.单层递归的逻辑
        root1.left = mergeTrees(root1.left, root2.left);
        root1.right = mergeTrees(root1.right, root2.right);
        return root1;
    }
}
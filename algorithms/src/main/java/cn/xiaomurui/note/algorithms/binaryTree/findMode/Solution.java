package cn.xiaomurui.note.algorithms.binaryTree.findMode;

import java.util.*;

class Solution {

    int maxCount = 0;
    int count = 0;
    TreeNode pre;
    List<Integer> result = new ArrayList<>();

    public int[] findMode(TreeNode root) {
        traversal(root);
        int[] res = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            res[i] = result.get(i);
        }
        return res;
    }

    // 1.确定参数类型，返回值
    public void traversal(TreeNode root) {
        // 2.递归结束条件
        if (root == null) return;
        // 3.单层递归逻辑 中序遍历
        traversal(root.left);
        // 处理count计数值
        if (pre == null)
            count = 1;
        else if (pre.val == root.val)
            count++;
        else
            count = 1;

        //更新pre 收割结果
        pre = root;
        if (count == maxCount) {
            result.add(root.val);
        }
        // 更新maxCount result结果集
        if (count > maxCount) {
            maxCount = count;
            result.clear();
            result.add(root.val);
        }
        traversal(root.right);
        return;
    }
}
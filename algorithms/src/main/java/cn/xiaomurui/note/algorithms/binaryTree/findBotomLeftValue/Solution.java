package cn.xiaomurui.note.algorithms.binaryTree.findBotomLeftValue;


import java.util.Deque;
import java.util.LinkedList;

class Solution {
    public int findBottomLeftValue(TreeNode root) {
        //层序遍历 求最下层节点值即可
        Deque<TreeNode> deque = new LinkedList<>();
        int result = 0;
        deque.addLast(root);
        while (!deque.isEmpty()) {
            int size = deque.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = deque.pollFirst();
                if (i == 0)
                    result = node.val;
                if (node.left != null)
                    deque.addLast(node.left);
                if (node.right != null)
                    deque.addLast(node.right);
            }
        }
        return result;
    }
}
package cn.xiaomurui.note.algorithms.binaryTree.findMode;

import java.util.*;

class Solution {
    Map<Integer, Integer> map = new HashMap<>();

    public int[] findMode(TreeNode root) {
        traversal(root);
        int max = -1;
        for (Integer key : map.keySet()) {
            if (map.get(key) >= max) {
                max = map.get(key);
            }
        }
        ArrayList<Integer> list = new ArrayList<>();
        for (Integer key : map.keySet()) {
            if (map.get(key) == max) {
                list.add(key);
            }
        }
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            res[i] = list.get(i);
        }
        return res;
    }

    public void traversal(TreeNode root) {
        if (root == null) return;
        traversal(root.left);
        map.put(root.val, map.getOrDefault(root.val, 0) + 1);
        traversal(root.right);
    }
}
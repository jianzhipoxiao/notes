package cn.xiaomurui.blog;

import java.util.ArrayList;
import java.util.List;

public class UserOperations {
    private static List<String> userList = new ArrayList<>();

    public static void insertUser(String name) {
        userList.add(name);
        System.out.println("Inserted: " + name);
    }

    public static void updateUser(String oldName, String newName) {
        userList.remove(oldName);
        userList.add(newName);
        System.out.println("Updated: " + oldName + " to " + newName);
    }

    public static void deleteUser(String name) {
        userList.remove(name);
        System.out.println("Deleted: " + name);
    }

    public static void printUsers() {
        System.out.println("Current users: " + userList);
    }
}
package cn.xiaomurui.blog;

public class Main {
    public static void main(String[] args) {
        TransactionManager transactionManager = new TransactionManager();

        // 添加操作
        transactionManager.addOperation(new InsertOperation("Alice"));
        transactionManager.addOperation(new UpdateOperation("Alice", "Alice_updated"));

        transactionManager.addOperation(new DeleteOperation("Alice_updated"));

        try {
            // 提交事务
            transactionManager.commit();
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            transactionManager.rollback(); // 回滚事务
        }

        UserOperations.printUsers(); // 打印当前用户
    }
}
package cn.xiaomurui.blog;

public class InsertOperation implements TransactionManager.Operation {
    private final String name;

    public InsertOperation(String name) {
        this.name = name;
    }

    @Override
    public void execute() {
        UserOperations.insertUser(name);
    }

    @Override
    public void undo() {
        UserOperations.deleteUser(name);
    }
}



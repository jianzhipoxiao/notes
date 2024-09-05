package cn.xiaomurui.blog;

public class DeleteOperation implements TransactionManager.Operation {
    private final String name;

    public DeleteOperation(String name) {
        this.name = name;
    }

    @Override
    public void execute() {
        UserOperations.deleteUser(name);
    }

    @Override
    public void undo() {
        UserOperations.insertUser(name);
    }
}

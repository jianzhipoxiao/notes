package cn.xiaomurui.blog;

public class UpdateOperation implements TransactionManager.Operation {
    private final String oldName;
    private final String newName;

    public UpdateOperation(String oldName, String newName) {
        this.oldName = oldName;
        this.newName = newName;
    }

    @Override
    public void execute() {
        UserOperations.updateUser(oldName, newName);
    }

    @Override
    public void undo() {
        UserOperations.updateUser(newName, oldName);
    }
}

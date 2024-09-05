package cn.xiaomurui.blog;

import java.util.ArrayList;
import java.util.List;

public class TransactionManager {
    private List<Operation> operations = new ArrayList<>();
    private boolean isRolledBack = false;

    public void addOperation(Operation operation) {
        operations.add(operation);
    }

    public void commit() {
        if (!isRolledBack) {
            for (Operation operation : operations) {
                operation.execute();
            }
            operations.clear(); // 提交后清空操作
        }
    }

    public void rollback() {
        isRolledBack = true;
        for (int i = operations.size() - 1; i >= 0; i--) {
            operations.get(i).undo(); // 反向执行操作以实现回滚
        }
        operations.clear(); // 清空操作
    }

    public interface Operation {
        void execute();
        void undo();
    }
}
package cn.xiaomurui.blog._synchronized;

import org.junit.Test;
import org.openjdk.jol.info.ClassLayout;
import org.openjdk.jol.vm.VM;

/**
 * @author 小木蕊
 * @address xiaomurui@163.com <a href="https://gitee.com/poxiao02">...</a>
 * @createDate 2024/8/13 14:51
 * @description
 */
public class ApiTest {
    @Test
    public void test_object_header(){
        System.out.println(VM.current().details());
        Object obj = new Object();
        System.out.println(obj + " 十六进制哈希：" + Integer.toHexString(obj.hashCode()));
        System.out.println(ClassLayout.parseInstance(obj).toPrintable());
    }

    private static volatile int counter = 0;
    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(() -> {
                for (int i1 = 0; i1 < 10000; i1++) {
                    add();
                }
            });
            thread.start();
        }
        // 等10个线程运行完毕
        Thread.sleep(1000);
        System.out.println(counter);
    }
    public static void add() {
        synchronized (ApiTest.class) {
            counter++;
        }
    }

}

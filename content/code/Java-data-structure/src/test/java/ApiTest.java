import cn.xiaomurui.blog.dequeue.TestDelayed;
import org.junit.Test;

import java.util.concurrent.DelayQueue;
import java.util.concurrent.TimeUnit;

/**
 * @author 小木蕊
 * @address xiaomurui@163.com <a href="https://gitee.com/poxiao02">...</a>
 * @createDate 2024/8/11 14:29
 * @description
 */
public class ApiTest {

    @Test
    public void test_DelayQueue() throws InterruptedException {
        DelayQueue<TestDelayed> delayQueue = new DelayQueue<TestDelayed>();
        delayQueue.offer(new TestDelayed("aaa", 5, TimeUnit.SECONDS));
        delayQueue.offer(new TestDelayed("ccc", 1, TimeUnit.SECONDS));
        delayQueue.offer(new TestDelayed("bbb", 3, TimeUnit.SECONDS));

        System.out.println(((TestDelayed) delayQueue.take()).getStr());
        System.out.println(((TestDelayed) delayQueue.take()).getStr());
        System.out.println(((TestDelayed) delayQueue.take()).getStr());
    }
}

package cn.xiaomurui.blog.collections;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author 小木蕊
 * @address xiaomurui@163.com <a href="https://gitee.com/poxiao02">...</a>
 * @createDate 2024/8/12 12:53
 * @description collections 工具测试
 */
public class ApiTest {
    @Test
    public void test_binarySearch() {
        List<String> list = new ArrayList<String>();
        list.add("1");
        list.add("2");
        list.add("3");
        list.add("4");
        list.add("5");
        list.add("6");
        list.add("7");
        list.add("8");
        ThreadLocal<String> threadLocal = new ThreadLocal<>();
        threadLocal.set("ok");
        int idx = Collections.binarySearch(list, "5");
        System.out.println("二分查找：" + idx);
    }
}

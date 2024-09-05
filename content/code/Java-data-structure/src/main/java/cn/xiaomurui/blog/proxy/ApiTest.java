package cn.xiaomurui.blog.proxy;

import org.junit.Test;

import java.lang.reflect.Method;

/**
 * @author 小木蕊
 * @address xiaomurui@163.com <a href="https://gitee.com/poxiao02">...</a>
 * @createDate 2024/8/13 13:39
 * @description 单元测试
 */
public class ApiTest {
    @Test
    public void test_reflect() throws Exception {
        Class<UserApi> clazz = UserApi.class;
        Method queryUserInfo = clazz.getMethod("queryUserInfo");
        Object invoke = queryUserInfo.invoke(clazz.newInstance());
        System.out.println(invoke);
    }

    @Test
    public void test_JDKProxy() throws Exception {
        IUserApi userApi = JDKProxy.getProxy(IUserApi.class);
        String invoke = userApi.queryUserInfo();
        System.out.println("测试结果: " + invoke);
    }
    @Test
    public void test_ASMProxy() throws Exception {
        IUserApi userApi = ASMProxy.getProxy(UserApi.class);
        String invoke = userApi.queryUserInfo();
        System.out.println("测试结果："+ invoke);
    }
}

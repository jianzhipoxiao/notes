package cn.xiaomurui.blog.proxy;

public class UserApi implements IUserApi {

    @Override
    public String queryUserInfo() {

        return "小傅哥，公众号：bugstack虫洞栈 | 沉淀、分享、成长，让自己和他人都能有所收获！";
    }

}

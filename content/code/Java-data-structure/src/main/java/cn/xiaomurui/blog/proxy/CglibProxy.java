//package cn.xiaomurui.blog.proxy;
//
//public class CglibProxy implements MethodInterceptor {
//    public Object newInstall(Object object) {
//        return Enhancer.create(object.getClass(), this);
//    }
//    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
//        System.out.println("我被CglibProxy代理了");
//        return methodProxy.invokeSuper(o, objects);
//    }
//}
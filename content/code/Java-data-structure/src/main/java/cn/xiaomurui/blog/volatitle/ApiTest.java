package cn.xiaomurui.blog.volatitle;

public class ApiTest {

    public static void main(String[] args) {
        final VT vt = new VT();

        Thread Thread01 = new Thread(vt);
        Thread Thread02 = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException ignore) {
                }
                vt.sign = true;
                System.out.println("vt.sign = true 通知 while (!sign) 结束！");
            }
        });

        Thread01.start();
        Thread02.start();
    }

}

class VT implements Runnable {

    public boolean sign = false;
//    public volatile boolean sign = false;

    @Override
    public void run() {
        while (!sign) {
            System.out.println("你好");
        }
        System.out.println("你坏");
    }
}

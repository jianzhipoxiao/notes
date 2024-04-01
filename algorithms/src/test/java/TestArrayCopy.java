import java.util.Arrays;

/**
 * @author 小木蕊
 * @version 1.0.0
 * @address xiaomurui@163.com
 * @createDate 2024/4/1 16:23
 * @description
 */
public class TestArrayCopy {
    public static void main(String[] args) {
        int[] ints = new int[10];
        for (int i = 0; i < 10; i++) {
            ints[i] = i;
        }
        int[] ints1 = Arrays.copyOf(ints, 5);
        for (int i = 0; i < ints1.length; i++) {
            System.out.println("ins1: "+ints1[i]);
        }
    }
}

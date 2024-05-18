# GUI编程

## 创建一个图形化界面步骤

1.  创建一个类继承JFrame

2. 实例化一个Container对象

3. 实例化一个JLabel[^ 相当于一个标签]对象

4. 设置Container[^ 容器]属性值[^ 追加组件]和JLabel[^ 内容] 值[^文字对齐方式 ]

5. 设置JFrame [^ 窗口]对象的值[^ 如可视化、大小、关闭方式]

   ~~~java
   import javax.swing.*;
   import java.awt.*;
   
   public class myJFrame extends JFrame {
      public void createJFrame(String title){
          JFrame jf = new JFrame(title);
          Container container =jf.getContentPane();
          JLabel jl = new JLabel("this is a JFrame");
          jl.setHorizontalAlignment(SwingConstants.CENTER);
          container.add(jl);
          container.setBackground(Color.white);
          jf.setVisible(true);
          jf.setSize(200,150);
          jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
      }
   
       public static void main(String[] args) {
           new myJFrame().createJFrame("create JFrame window");
       }
   }
   
   ~~~

   运行效果

![image-20220928213916723](D:\笔记\java\image-20220928213916723.png)



### 1JFram

```java
//方法
setLocation(int x,int y); //设置坐标
setSize(int width,int height); //设置宽度和高度
setVisible(boolean b); //设置是否可见
setDefaultCloseOperation(int operation); //关闭操作
```

| **窗体关闭方式**    | 实现功能           |
| ------------------- | ------------------ |
| DO_NOTHING_ON_CLOSE | 无操作             |
| DISPOSE_ON_CLOSE    | 隐藏并关闭（释放） |
| HIDE_ON_CLOSE       | 隐藏               |
| EXIT_ON_CLOSE       | 退出程序           |

### 2Container

~~~java
//方法
add(); //添加组件
~~~

### 3组件

#### 3.1按钮 JButton

~~~Java
//方法

//属性
~~~

####  3.2标签Jlable

~~~java
//方法
public JLabel();
public JLabel(Icon icon); //带图标
public JLabel(Icon icon,int alignment);//带图标，和水平对齐方式
public JLabel(String text,int alignment);//带文字，和水平对齐方式
public JLabel(String text,Icon icon,int alignment);//带文字、带图标，和水平对齐方式


//图标的使用
public ImageIcon();
public ImageIcon(Image image);
public ImageIcon(Image image,String desciption);
public ImageIcon(URL url); //常用
~~~

#### 3.3JTextArea 文本域

~~~ Java
//方法

//属性
~~~

#### 3.4JTextField 输入框

~~~java
//方法

//属性
~~~

#### 3.5JList 列表

~~~java
//方法

//
~~~

#### 3.6JPasswordFiled 密码框

~~~java
~~~

#### 3.7JDialog 弹窗

~~~java
~~~

#### 3.8JCombox 下拉菜单

~~~java
~~~



### 4布局

#### 4.1绝对布局 null

~~~java
//用法

~~~

#### 4.2网格布局 GridLayout

~~~java
//用法
~~~

#### 4.3 弹性布局 FlowLayout 

~~~ java
//构造方法
public Flowlayout();
public FlowLayout(int alignment); //排列方式
public FlowLayout(int alignment,int horizGap,int vertGap); //行列之间的间隔
~~~

| **alignment参数** | **效果**     |
| ----------------- | ------------ |
| FlowLayout.LEFT   | 左对齐       |
| FLowLayout.CENTER | 居中（默认） |
| FlowLayout.RIGHT  | 右对齐       |



#### 4.4 边界布局 Borderlayout 

| **成员变量**[^ constraints] | **含义** |
| --------------------------- | -------- |
| BorderLayout.NORTH          | 北部     |
| BorderLayout.SOUTH          | 南部     |
| BorderLayout.EAST           | 东部     |
| BorderLayout.WEST           | 西部     |
| BorderLayout.CENTER         | 中间     |

****

~~~java
//用法
public void add(Componet comp, object constraints); //一个区域只能存放一个组件，继续添加，将替换原组件
~~~


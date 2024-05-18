### IO流

#### 1File类

**输出是程序对文件的输出**

![image-20230604125951393](D:\笔记\java\image-20230604125951393.png)

##### 路径写发

1.  项目路径： “word.txt”
2.  包中路径： “src/pack/word.txt”
3.  绝地路径：“”
4.  e:\\\ 也可以 e:/ 这里对写法经行监控方便对Unix和wnidows的区别

##### 文件创建方法

| 常用方法                             | 参数说明                  |      |
| ------------------------------------ | ------------------------- | ---- |
| new File(Straing pathname)           | 根据路径构建一个File对象  |      |
| new File(File parent,String child)   | 根据父目录文件+子路径构建 |      |
| new File(String parent,String child) | 根据父目录+子路径构建     |      |

**代码演示**

~~~java
package file;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestTemplate;

import java.io.File;
import java.io.IOException;

/**
 * @author 刘林
 * @version 1.0
 */
public class FileCreate {
    public static void main(String[] args) {
        System.out.println("你好");
    }

    //方式一
    @Test
    public void create01(){
        String filePath = "e:\\news1.txt";
        File file = new File(filePath);
        try {
            file.createNewFile();
            System.out.println("文件创建成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //方式二
    @Test
    public void create02(){
        File parentFile = new File("e:\\");
        String fileName = "news2.txt";
        File file = new File(parentFile,fileName);
        try {
            file.createNewFile();
            System.out.println("文件创建成功~");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //方式三
    @Test
    public void create03(){
        String parentPath = "e:\\";
        String fileName = "news3.txt";
        File file = new File(parentPath, fileName);

        try {
            file.createNewFile();
            System.out.println("文件创建成功~");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
~~~

new File这是创建File对象并未真正创建文件只是在**内存**中创建，所以磁盘中并没有文件真正创建文件到磁盘的方法是**createNewFile()**

***

##### 文件

| **方法**                                             | **效果**         |
| ---------------------------------------------------- | ---------------- |
| file.getName()                                       | 文件名           |
| f1.getAbsolutePath()                                 | 文件路径         |
| f1.isHidden()                                        | 文件是否隐藏     |
| f1.exists()                                          | 文件是否存在     |
| f1.length()                                          | 文件[^字节]数    |
| f1.lastModified()[^ 需要格式化]                      | 文件上次编辑时间 |
| f1.createNewFile()[^ 需要抛出异常，不能覆盖已有文件] | 文件是否创建成功 |
| f1.delete()                                          | 文件是否删除成功 |

~~~ java

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class file01 {
    public static void main(String[] args) {
        File f1 = new File("word.txt");
        System.out.println("文件名:"+f1.getName());
        System.out.println("文件路径:"+f1.getAbsolutePath());
        System.out.println("文件是否隐藏:"+f1.isHidden());
        System.out.println("文件是否存在:"+f1.exists());
        System.out.println("文件字节数:"+f1.length());
		
        //时间格式化
        Date data = new Date(f1.lastModified());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        System.out.println("文件上次编辑时间:"+sdf.format(data));

        try {
            System.out.println("文件是否创建成功:"+f1.createNewFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
        boolean del = f1.delete();
        System.out.println("文件是否删除成功:"+del);
		
    }
}


~~~

****

效果

![image-20221023151550531](D:\笔记\java\images\构造器.md)

##### 文件夹

文件夹（目录）也是一种File

| **方法**                        | **返回值**  | **效果**                                       |
| ------------------------------- | ----------- | ---------------------------------------------- |
| f.mkdir()[^ 不可覆盖已有文件夹] | boolean     | 创建单个文件夹                                 |
| f.mkdirs()                      | boolean     | 创建文件夹及其子类文件夹                       |
| f.delete()                      | boolean     | 删除单个文件夹                                 |
| f.listFiles()                   | File file[] | 获取目标路径下的所有文件包含文件夹和子类文件夹 |
| f.isFile()                      | boolean     | 是否是文件                                     |
| f.isDirectory                   | boolean     | 是否是文件夹                                   |

~~~java
import java.io.File;

public class file02 {
    public static void main(String[] args) {
//        File f2 = new File("dir");
////        boolean flag =  f2.mkdir();
//        boolean flag = f2.mkdirs();
//        System.out.println("创建文件夹是否成功："+flag);
//
//        boolean del = f2.delete();
//        System.out.println("删除文件夹是否成功："+flag);

        File f = new File("C:\\Windows\\");

        File file[] = f.listFiles();
        for (File tmp: file) {
            if (tmp.isFile()){
                System.out.println("文件："+tmp.getName());
            }

            if (tmp.isDirectory()){
                System.out.println("文件夹"+tmp.getName());
            }
        }

    }
}

~~~

![image-20221023154248364](D:\笔记\java\images\image-20221023154248364.png)

### 节点流

节点流为对一个特定的数据源**读写数据**，如FileReader、FileWriter，是一种**低级**的流，不够灵活，功能单一

![image-20230614112658251](D:\笔记\java\image-20230614112658251.png)

数据源：存放数据的地方

#### 2文件流

Java中具体分为两大类[^字节流] 和[^ 字符流] 字符流不可简单的换算为字节还与编码格式有关JavaIO中有四大顶级子类，字节类**inputStream**、**outputStream**、字符类**Reader**、**Wrtier**，都是**抽象类**不可直接实例化

##### InputStream

![image-20230605144735301](D:\笔记\java\image-20230605144735301.png)

##### 2.1FileOutputStream 文件字节输出流

| **方法**                                  | **返回值**       | **参数**                    | **效果**                       |
| ----------------------------------------- | ---------------- | --------------------------- | ------------------------------ |
| FileOutputStream(Flie file,boolen append) | FileOutputStream | Flie 对象，boolean 是否覆盖 | 创建一个FileOutputStream对象， |
| out.write(byte[] b)                       | 无               | 一个字节数组                | 向指定文件对象中写入内容       |
| out.close()                               | 无               | 无                          | 关闭流                         |

##### 2.2FileInputStream 文件字节输入流

| **方法**                   | **返回值**                 | **效果**                                 |
| -------------------------- | -------------------------- | ---------------------------------------- |
| FileInputStream(File file) | FileInputStream            | 创建一个FileInputStream对象，            |
| in.read(byte[] b2)         | int 读取位置，-1为读取结束 | 向指定文件对象中读出内容，并存到b2数组中 |
| in.close()                 | 无                         | 关闭流                                   |

**效果**

~~~java
import java.io.*;

public class FileOutputStreamTest {
    public static void main(String[] args) {
        File f = new File("word.txt");
        FileOutputStream out = null;
        try {
           out = new FileOutputStream(f,false);

           String str = "你见过洛杉矶凌晨四点的样子吗？" +
                   "世界那么大，我想去看看！" +
                   "你好世界！ ";

           byte b[] = str.getBytes();
           out.write(b);
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out!=null){
                try {
                    out.close();
                } catch (IOException e) {
                   e.printStackTrace();
                }
            }
        }

        FileInputStream in = null;
        try {
            in = new FileInputStream(f);
            byte[] b2 = new byte[1024]; //缓冲区
            int len = in.read(b2);
            System.out.println("文件中的数据是："+new String(b2,0,len));
            System.out.println("文件中的长度是："+len);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
           e.printStackTrace();
        } finally {
            if (in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

~~~

![image-20221026180802790](D:\笔记\java\image-20221026180802790.png)

##### 2.3FileWrite 文件字符输入流

| **方法**           | **参数**                    | **返回值** | **效果**                 |
| ------------------ | --------------------------- | ---------- | ------------------------ |
| FileWriter(f,true) | Flie 对象，boolean 是否覆盖 | FileWriter | 创建FileWriter对象       |
| fw.write(str)      | str字符窜                   | 无         | 向指定文件对象中写入内容 |
| fw.close()         | 无                          | 无         | 关闭流                   |

**写入内容时必须关闭流或者刷新流close(）,flush()**

##### 2.4FileReader 文件字符输出流 

| **方法**      | **参数**  | **返回值** | **效果**                                 |
| ------------- | --------- | ---------- | ---------------------------------------- |
| FileReader(f) | Flie 对象 | FileWriter | 创建FileReader对象                       |
| fr.read(ch)   | 字符数组  | 无         | 向指定文件对象中读出内容，并存到ch数组中 |
| fr.close()    | 无        | 无         | 关闭流                                   |

**效果**

~~~java
import java.io.*;

public class FileWriteTest {
    public static void main(String[] args) {
        File f = new File("word.txt");
        FileWriter fw = null;
        try {
            fw = new FileWriter(f,false);
            String str = "天行健，君子以自强不息！";
            fw.write(str);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if ( fw != null){
                try { 
                    fw.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        FileReader fr =null;

        try {
            fr = new FileReader(f);
            char[] ch =new char[1024];
            int count;
            while( (count = fr.read(ch))!=-1){
                System.out.println("文本内容为："+new String(ch,0,count));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(fr!=null){
                try {
                    fr.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
~~~

![0](D:\笔记\java\image-20221026190801370.png)

**字符流的底层为字节流**

### 包装流

![image-20230615083931969](D:\笔记\java\image-20230615083931969.png)

包装流为一种功能十分强大的Io流，是对其它节点流的封装，可以根据不同的数据源封装不同的节点流

![image-20230615084249137](D:\笔记\java\image-20230615084249137.png)

因其有Wirter属性故可包装JavaIo包下的任何节点流，此种设计模式为**修饰者模式**。



##### 2.5 BufferedOutputStream 缓冲字节输出流

| **方法**                   | **参数**              | **返回值**           | **效果**                           |
| -------------------------- | --------------------- | -------------------- | ---------------------------------- |
| BufferedOutputStream (out) | FileOutputStream 对象 | BufferedOutputStream | 创建BufferedOutputStream 对象      |
| bo.write(b)                | 字节数组              | 无                   | 向指定文件对象中写入bz数组中的内容 |
| bo.close()                 | 无                    | 无                   | 关闭流                             |
| bo.flush();                | 无                    | 无                   | 刷新缓冲区                         |

```java
import java.io.*;

public class BufferedOutputStreamTest {
    public static void main(String[] args) {
        File f =new File("word.txt");
        FileOutputStream out = null;
        BufferedOutputStream bo = null;
        try {
            out = new FileOutputStream(f);
            bo = new BufferedOutputStream(out);
            String str = "错的不是我，是世界！";
            byte[] b = str.getBytes();
            bo.write(b);
            bo.flush(); //刷新缓冲区
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out !=null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if(bo!=null){
                try {
                    bo.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

![image-20221026195537003](D:\笔记\java\image-20221026195537003.png)

##### 2.6BufferedInputStream 缓冲字节输入流

| **方法**                 | **参数**              | **返回值**                 | **效果**                            |
| ------------------------ | --------------------- | -------------------------- | ----------------------------------- |
| BufferedInputStream (in) | FileIntputStream 对象 | BufferedInputStream        | 创建BufferedInputStream 对象        |
| bi.read(b)               | 字节数组              | int 读取位置，-1为读取结束 | 向指定文件对象中读取内容存到b数组中 |
| bi.close()               | 无                    | 无                         | 关闭流                              |
| bi.flush();              | 无                    | 无                         | 刷新缓冲区                          |

~~~java
import java.io.*;

public class BufferedInputStreamTest {
    public static void main(String[] args) {
        File f = new File("D:\\java\\jdk api 1.8_China\\jdk api 1.8_google.CHM");
        FileInputStream in = null;
        BufferedInputStream bi = null;
        long start = System.currentTimeMillis(); //当前毫秒数
        try {
            in = new FileInputStream(f);
            bi = new BufferedInputStream(in);
            byte[] b = new byte[1024];
            while (bi.read(b) != -1){

            }

            long end = System.currentTimeMillis();
            System.out.println("读取一次的时间为："+(end - start));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            if (bi !=null){
                try {
                    bi.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}

~~~

![image-20221026195620839](D:\笔记\java\image-20221026195620839.png)

##### 2.7BUfferedWriter 缓冲字符输出流

##### 

| **方法**           | **参数**       | **返回值**     | **效果**                                          |
| ------------------ | -------------- | -------------- | ------------------------------------------------- |
| BufferedWriter(fw) | FileWriter对象 | BUfferedWriter | 创建BUfferedWriter对象                            |
| bw.write(str)      | 字符串         | 无             | 向指定文件对象中写入str的内容                     |
| bw.writeLine(str)  | 字符串         | 无             | 向指定文件对象中写入str的内容[^写到文件中为一行 ] |
| bw.close()         | 无             | 无             | 关闭流                                            |
| bw.flush();        | 无             | 无             | 刷新缓冲区                                        |

****

##### 2.8BUfferedReader 缓冲字符输入流

##### 

| **方法**          | **参数**       | **返回值**    | **效果**                                          |
| ----------------- | -------------- | ------------- | ------------------------------------------------- |
| BUfferedReade(br) | FileReader对象 | BUfferedReade | 创建BUfferedReade对象                             |
| br.read(str)      | 字符串         | 无            | 向指定文件对象中读取str的内容                     |
| br.readLine(str)  | 字符串         | 无            | 向指定文件对象中读取str的内容[^读取文件中为一行 ] |
| br.close()        | 无             | 无            | 关闭流                                            |
| br.flush();       | 无             | 无            | 刷新缓冲区                                        |

****

~~~java
import java.io.*;

public class BufferedWriterTest {
    public static void main(String[] args) {
        File f = new File("word.txt");
        FileWriter fw = null;
        BufferedWriter bw = null;
        try {
            fw = new FileWriter(f);
            bw = new BufferedWriter(fw);
            String str1 ="错的不是我》";
            String str2 ="是世界》";
            String str3 ="\t\t\t\t\t-----金木研";
            bw.write(str1);
            bw.newLine();
            bw.write(str2);
            bw.newLine();
            bw.write(str3);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bw != null){
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (fw !=null){
                try {
                    fw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        FileReader fr =null;
        BufferedReader br = null;
        try {
            fr = new FileReader(f);
            br = new BufferedReader(fr);
            String tmp = null;
            int i = 1;//计数器
            while ( (tmp = br.readLine()) != null){
                System.out.println("这是第"+i+"行："+tmp);
                i++;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null){
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (fr != null){
                try {
                    fr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

~~~



**效果**

![image-20221029130534973](D:\笔记\java\image-20221029130534973.png)

![image-20221029130544684](D:\笔记\java\image-20221029130544684.png)

**字节流于字符流的区别**

- 字节流读取读取内容时，是以字节为单位，但一个汉字为两个字节，故有可能会出现乱码问题，且字节流更加的底层
- 字符流读取内容时以字符为单位，每个汉字也为一个字符，故不会出现乱码问体
- 字节流可转化为字符流

****

**缓冲流于普通流的区别**

- 缓冲流有缓冲区，所以读取时候能快
- 缓冲流需建立在普通流上

##### 2.9字节流转换为字符流

![image-20221029164707881](D:\笔记\java\image-20221029164707881.png)

| **格式**                      | 参数                             | 效果                           |
| ----------------------------- | -------------------------------- | ------------------------------ |
| OutputStreamWriter(out,"GBK") | FileOutputStream对象，编码字符集 | 创建一个OutputStreamWriter对象 |
| InputStreamReader(in,"UTF-8") | FileInputStream对象，解码字符集  | 创建一个InputStreamReader对象  |

**效果**

~~~java
import java.io.*;

public class OutputStreamWriterTest {
    public static void main(String[] args) {
        File f = new File("word1.txt");
        FileOutputStream out = null;
        OutputStreamWriter ow = null;
        BufferedWriter bw = null;

        try {
            out = new FileOutputStream(f);
            ow = new OutputStreamWriter(out,"UTF-8"); //编码集的设定
            bw = new BufferedWriter(ow);
            String str = "呐，你知道吗？樱花飘落的速度是每秒五厘米。";
            bw.write(str);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bw != null){
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (ow != null){
                try {
                    ow.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        FileInputStream in = null;
        InputStreamReader ir = null;
        BufferedReader br = null;

        try {
            in = new FileInputStream(f);
            ir = new InputStreamReader(in,"UTF-8"); //解码字符集
            br = new BufferedReader(ir);
            String tmp =  br.readLine();
            System.out.println("文件内容为："+tmp);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (br != null){
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (ir != null){
                try {
                    ir.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }


    }
}

~~~

![image-20221030094704899](D:\笔记\java\image-20221030094704899.png)

![image-20221030094713905](D:\笔记\java\image-20221030094713905.png)

##### 序列化与反序列化

1. **序列化**时保存的数据类型是**任意**的，没有任何要求，即**文件后缀名是任意的**
2. **反序列化**时读取的内容顺序必须和**序列化时的一致**
3. 反序列化**自定义对象**时如果要进行向下转型必须将对象的类导入到此文件中
4. 在进行序列化时加入一个属性 **private static final long serialVersionUID = 1L**序列化版本号，提高兼容性，即在加入新的属性值时不会认为是另一个类，而是不同的版本号
5. 在进行序列化时被 **static**和 **transient**修饰的属性不会被序列化，即值为null

#### 3数据流

##### DataOutputStream 数据输出字节流

| 方法                      | 参数                 | 返回值               | 效果               |
| ------------------------- | -------------------- | -------------------- | ------------------ |
| DataOutputStream (out)    | FileOutputStream对象 | DataOutputStream对象 | 包装一个数据输出流 |
| dos.writeUTF(str)         | string 字符串        | 无                   | 写入一个字符串     |
| dos.writeInt(int)         | int                  | 无                   | 写入一个整数       |
| dos.writeBoolean(boolean) | boolean              | 无                   | 写入一个布尔值     |
| dos.writeChar(char)       | char                 | 无                   | 写入一个字符       |
| dos.writeDouble(double)   | double               | 无                   | 写入一个浮点数     |



##### DataInputStream 数据输入字节流

| 方法                     | 参数                | 返回值              | 效果               |
| ------------------------ | ------------------- | ------------------- | ------------------ |
| DataInputStream (out)    | FileInputStream对象 | DataInputStream对象 | 包装一个数据输入流 |
| dis.readUTF(str)         | string 字符串       | 无                  | 读取一个字符串     |
| dis.readInt(int)         | int                 | 无                  | 读取一个整数       |
| dis.readBoolean(boolean) | boolean             | 无                  | 读取一个布尔值     |
| dis.readChar(char)       | char                | 无                  | 读取一个字符       |
| dis.readDouble(double)   | double              | 无                  | 读取一个浮点数     |

**注意事项**

1. 写入int和double时必须隔开，不能连续写入，不然读取时会得到的值不准。
2. 写入时是什么顺序，读取时也要按顺序读取，不然会乱码。

**示例**

~~~java
import java.io.*;

public class DataOutputStreamTest {
    public static void main(String[] args) {
        File f =new File("word2.txt");
        FileOutputStream out =null;
        DataOutputStream dos = null;

        try {
            out = new FileOutputStream(f);
            dos = new DataOutputStream(out);
            dos.writeUTF("恋爱什么的，无聊至极！");
            dos.writeInt(123);
            dos.writeInt(456);
            dos.writeBoolean(true);
            dos.writeChar('A');
            dos.writeDouble(12.5);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (dos != null){
                try {
                    dos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        FileInputStream in =null;
        DataInputStream dis = null;
        try {
            in =new FileInputStream(f);
            dis = new DataInputStream(in);
          System.out.println("readUTF的内容为："+dis.readUTF());
          System.out.println("readInt的内容为："+dis.readInt());
          System.out.println("readInt的内容为："+dis.readInt());
            System.out.println("readBoolean的内容为："+dis.readBoolean());
            System.out.println("readChar的内容为："+dis.readChar());
            System.out.println("readDouble的内容为："+dis.readDouble());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (dis != null){
                try {
                    dis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

~~~

![image-20221030120643509](D:\笔记\java\image-20221030120643509.png)

![image-20221030120651778](D:\笔记\java\image-20221030120651778.png)





#### 流的关闭方式

1. 常规一个一个关闭

   ~~~ java
   import java.io.*;
   
   public class OutputStreamWriterTest {
       public static void main(String[] args) {
           File f = new File("word.txt");
           FileInputStream in = null;
           InputStreamReader ir = null;
           BufferedReader br = null;
   
           try {
               in = new FileInputStream(f);
               ir = new InputStreamReader(in,"UTF-8");
               br = new BufferedReader(ir);
               String tmp =  br.readLine();
               System.out.println("文件内容为："+tmp);
           } catch (FileNotFoundException e) {
               e.printStackTrace();
           } catch (IOException e) {
               throw new RuntimeException(e);
           } finally {
               if (br != null){
                   try {
                       br.close();
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
               }
               if (ir != null){
                   try {
                       ir.close();
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
               }
               if (in != null){
                   try {
                       in.close();
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
               }
           }
       }
   }
   
   ~~~

2. 升级版try语句[^ 推荐使用]

   ~~~java
   import java.io.*;
   
   public class close {
       public static void main(String[] args) {
           File f =new File("word.txt");
           try(FileInputStream in = new FileInputStream(f);
               InputStreamReader ir = new InputStreamReader(in);
               BufferedReader br = new BufferedReader(ir)){
               String tmp = null;
               while ((tmp = br.readLine()) != null){
                   System.out.println(tmp);
               }
   
           }catch (IOException e) {
               e.printStackTrace();
           }
       }
   }
   ~~~

   

![image-20221030160202697](D:\笔记\java\image-20221030160202697.png)

[^ 需要格式化]: SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
[^字节]: 一个汉字占三个字节，数字和字母各占一个字节
[^字节流]: 按字节编码，实用于二进制文件
[^ 字符流]: 按字符编码，实用于文本文件

# php 基本语法

### 变量声明格式

~~~php
$x = 5;	//同其他语言一样命名规则,区分大小写。
$y = 6;	//同其他弱类语言一样，不必声明变量类型
$z = $x +$y //z=11
~~~

***

### 变量类型

- String [^ 字符串]
- Integer [^ 整型]
- Float [^ 浮点型]
- Boolean [^ 布尔型]
- Array [^ 数组]
- Object [^ 对象]
- NULL [^空值]
- Resource [^ 资源类型]

### 常量

~~~php
define("var","常量值");
~~~

***

### 超级全局变量[^ 超级全局变量以数组方式引用，索引为变量名]

- $GLOBALS
- $_SERVER
- $_REQUEST
- $_POST
- $_GET
- $_FILES
- $_ENV
- $_COOKIE
- $-SESSION

#### $GLOBALS

~~~php
$X = 75;
$Y = 25;

function addition(){
    $GLOBALS['Z'] = $GLOBALS['X'] +$GLOBALS['Y'];
}

addition();
echo $Z; //100
//z即为$GLOBALS数组中的超级全局变量
~~~

 ~~~ PHP
 $_REQUEST['name'] //用于收集HTML表单提交的数据
 ~~~



### 作用域

- local [^ 本地变量]
- global [^ 全局变量，其保存在一个数组中即可 这样引用]

~~~php
global $x =5;
echo global[$x]; //等价于 echo $x;
~~~

- static [^栈，不会被释放]

- parameter

  ***

### echo函数

```php
echo "输出内容"; //内容可以是html标签，支持一次输出多个变量用逗号隔开极客
```



***

### 并置运算符[^ 用于字符串拼接]

~~~ php
$str1 = "Hello";
$str2 = "world";
echo $str1 . "" .$str2; //输出Hello world
~~~

***

### php连接MySQL数据库

#### 连接

~~~php
mysqli_connect(host, username, password, dbname, port, socket);
~~~



| **参数** | **描述**                         |
| -------- | -------------------------------- |
| host     | 可选， 主机地址                  |
| username | 可选，MySQL用户名                |
| password | 可选，MySQL密码                  |
| dbname   | 可选，默认使用的数据库           |
| port     | 可选，于MySQL连接的端口号        |
| socket   | 可选，规定socket或使用以命名pipe |

#### 关闭

> mysqli_close(mysql $link) 

***

#### 创建与删除数据库

```php
mysqli_query(connection, query, resultmode); 
//创建数据库sql语句 CREATE DATABASE dbname;
//删除数据库sql语句 DROP DATABASE dbname;
```



| **参数**   | **描述**                                 |
| ---------- | ---------------------------------------- |
| connection | 必需，规定要使用MySQL连接                |
| query      | 必需，规定查询的字符串[^ 即sql语句]      |
| resultmode | 可选 一个常量 可以是下列值中的任意一个： |

- MYSQLI_UER_RESULT(如果需要检索大量数据，请使用这个)
-  MYSQLI_STORE_RESULT(默认)

***

#### 选择数据库

~~~php
mysqli_select_db(connection,dbname); //sql语句 USE dbname;
~~~

| **参数**   | **描述**                     |
| ---------- | ---------------------------- |
| connection | 必需，规定使用的MySQL。      |
| dbname     | 必需，规定使用的默认数据库。 |

****

#### 查询数据库

~~~php
mysqli_num_rows(result);
~~~

| **参数** | **描述**                             |
| -------- | ------------------------------------ |
| result   | 必需，result为mysqli_query()返回的值 |


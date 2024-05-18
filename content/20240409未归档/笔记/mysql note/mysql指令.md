### mysql指令

 ~~~bash
 #启动MySQL服务	net satrt mysql
 #关闭MySQL服务	net stop mysql
 ~~~



[^ 进入mysql]: mysql -u root -p
[^查询数据库]: show databases;
[^创建数据库]: create database databaseName [if not exists]；
[^  使用数据库]: use database;
[^删除数据库]: drop databaseName [if exists];

- ## DDL  表查询

  [^查询表]: show tables;

[^ 查询表结构]: desc 表名;
[^查询表的建表语句]: show create table 表名;
[^创建表]: create 表名(

字段1 类型 [comment 注释],

字段2 类型 [comment 注释],

字段3 类型 [comment 注释]

) [comment 注释];

如下面这样

```mysql
create table tb_user(
    id int comment '编号',
    name varchar(50) comment '姓名',
    age int comment '年龄',
    gender varchar(1) comment '性别'
) comment '用户表';
```

#### 向表中插入数据

~~~sql
insert into tb_name
	("第一个表头名称","第二个","第n个")
	values
	("第一个数据","第二个","第n个");
~~~

****

#### 读取数据表

~~~sql
select * from tb_name; //tb_name相应的表名
~~~




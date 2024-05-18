# Mybatis-Plus

Mybatis-Plus就是mybatis的增强，并不去改变mybatis只不过做了一些开发简化，依然需要mybatis的相关依赖

1. 自动生成单表的CRUD
2. 拥有更丰富的条件拼接方式
3. 全自动的ORM持久层框架

使用方法用mapper接口去继承BaseMapper文件即可



##### CRUD

将所有的需要修改的内容包装成一个pojo类，不修改部分为null即可

- 可更具据常规条件就行crud(id,pojo类)
- 可以经行条件编写将所有的条件放到一个map中（map.put(“age”,20)）

> 在经行CRUD操作时当属性值为null时默认不修改,所以在定义pojo类时使用包装类型而不是使用基本数据类型



mybatis-plus也对service层进行了增强，让service层也具有crud的操作



#### 插件

所有插件都封装为一个插件集合 **MybatisPlusInterceptor **

1. 只需要将此组件加到IOC容器中，需要使用什么插件就使用添加到此容器中即可

~~~java
  //插件集合 如乐观锁和分页插件
    @Bean
    public MybatisPlusInterceptor plusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        //分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }
~~~



##### 分页插件

不再需要自己封装PageInfo，直接new 一个page对象。返回所有的数据会在封装到page中

~~~ java
//(当前页，分页大小)
Page<User> page = new Page<>(1,3);
        userMapper.selectPage(page,null);
~~~





#### Wrapper 对象

wrapper是一些sql语句的条件如order by 升降序等条件。 简而言之就是简化一些sql的编写，不在需要自己编写sql语句，但如果多层嵌套查询不推荐使用，效率低且复杂还不如自己编写sql语句



##### queryWrapper 与 updateWrapper的区别

- queryWrapper不可以将属性值设置为null
- queryWrapper不能携带修改数据只能填充条件
- updateWrapper可以完成以上两点

在不使用update语句时可直接使用queryWrapper



#### 核心注解

@TableName用在pojo类的上方默认不写的话，@TableName为pojo类名，可通过在application.yaml文件中通过

```yaml
global-config:
  db-config:
    table-prefix: #批量表前缀
```

@TableId 用来做主键映射和维护自增长主键，若不使用自增长则默认使用雪花算法来生成一个Long类行的随机数类似UUID，主键需要使用bigInt或者varchar(64)来接收

~~~java
//主键自增长
@TableId(type=IdType.AUTO)
~~~

@TableLogic逻辑删除字段，在删除数据库记录时将delete语句改为update语句，并将逻辑删除字段修改为1，

~~~java
 @TableLogic
    private Integer deleteLogic; //逻辑删除字段
~~~

#### 乐观锁和悲观锁

> 乐观锁和悲观锁是两种解决并发数据的技术解决思路不是具体的技术

**乐观锁：**

- 不对共享的资源进行上锁，而是采取反复尝试去等待的措施，去获取共享资源

**悲观锁**：

- 对共享的资源进行上锁，只到释放锁才可以继续对资源经行访问

 mybatis-plus乐观锁的实现为通过为表添加version字段来保证去修改数据时先检查是否是最新的version如果不是则等待

1. 在表中添加一个version字段用于来确认是否是最新的数据

2. 在pojo类同样添加该字段并添加@Version注解

3. 添加乐观锁插件

	~~~ java
	interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
	
	~~~



全表防删除插件

~~~java
interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());

~~~

mybatis-x插件可自动生成sql语句和mapper文件






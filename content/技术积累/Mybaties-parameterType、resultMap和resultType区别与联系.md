### Mybatis笔记

MyBatis是一种用于Java的持久层框架，用于将数据库操作与Java对象之间的映射进行管理。在MyBatis中，有三个重要的概念：`parameterType`
（参数类型）、`resultMap`（结果映射）和`resultType`（结果类型），它们之间有以下区别：

1. `parameterType`（参数类型）：`parameterType`
   用于指定传递给SQL语句的参数类型。它定义了在执行SQL语句时传递给数据库的参数的类型和结构。参数可以是一个简单的Java基本类型（如整数、字符串等），也可以是一个自定义的Java对象。在SQL语句中，可以使用`#{}`
   占位符来引用参数。

   例如，如果有一个名为`User`的Java对象，其中包含`id`和`name`属性，那么可以将`parameterType`设置为`User`
   ，并在SQL语句中使用`#{id}`和`#{name}`来引用对象的属性。

2. `resultMap`（结果映射）：`resultMap`用于定义将SQL查询结果映射到Java对象的规则。通过`resultMap`
   ，可以指定如何将数据库中的列映射到Java对象的属性。`resultMap`可以定义复杂的映射关系，包括处理继承关系、关联关系等。

   例如，如果有一个名为`User`的Java对象，其中包含`id`和`name`属性，并且数据库表中有相应的`id`和`name`列，可以使用`resultMap`
   来指定将查询结果映射到`User`对象。

3. `resultType`（结果类型）：`resultType`
   用于指定查询结果的类型。它可以是一个简单的Java基本类型（如整数、字符串等），也可以是一个自定义的Java对象。当查询结果只包含一个列时，可以使用`resultType`
   来指定结果的类型。

   例如，如果执行一个查询，只需要返回一个整数值作为结果，可以将`resultType`设置为`int`。

**结论**：
`parameterType`用于指定传递给SQL语句的参数类型，`resultMap`用于定义将查询结果映射到Java对象的规则，而`resultType`
用于指定查询结果的类型。它们各自在MyBatis中扮演着不同的角色，用于处理参数和结果的映射关系。

**注意事项**
parameterType和resultMap是用于不同目的的配置选项，它们通常不会同时在同一个SQL语句中使用

**resultMap 处理关联关系和继承关系**

1. 处理关联关系：

假设有两个表：`users`和`orders`，其中`users`表包含用户信息，`orders`
表包含订单信息，并且每个订单都关联到一个用户。下面是一个使用`resultMap`处理关联关系的示例：

```xml

<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id"/>
    <result property="name" column="user_name"/>
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="amount" column="order_amount"/>
    </collection>
</resultMap>
```

在上面的示例中，定义了一个名为`userResultMap`的`resultMap`，用于将查询结果映射到`User`对象。`User`对象包含`id`、`name`
和`orders`属性，其中`orders`属性是一个包含`Order`对象的集合。

2. 处理继承关系：

假设有一个基类`Vehicle`，有两个子类`Car`和`Motorcycle`，它们分别对应数据库中的不同表。下面是一个使用`resultMap`处理继承关系的示例：

```xml

<resultMap id="vehicleResultMap" type="Vehicle" discriminator="type">
    <id property="id" column="vehicle_id"/>
    <result property="manufacturer" column="manufacturer"/>
    <discriminator javaType="String" column="vehicle_type">
        <case value="car" resultMap="carResultMap"/>
        <case value="motorcycle" resultMap="motorcycleResultMap"/>
    </discriminator>
</resultMap>

<resultMap id="carResultMap" type="Car" extends="vehicleResultMap">
<result property="numberOfDoors" column="number_of_doors"/>
</resultMap>

<resultMap id="motorcycleResultMap" type="Motorcycle" extends="vehicleResultMap">
<result property="engineDisplacement" column="engine_displacement"/>
</resultMap>
```

在上面的示例中，定义了一个名为`vehicleResultMap`的基本`resultMap`，用于将查询结果映射到`Vehicle`对象。使用`discriminator`
标签指定了一个类型列`vehicle_type`，根据不同的类型值，选择不同的`resultMap`进行映射。

然后，定义了`carResultMap`和`motorcycleResultMap`，它们分别用于将查询结果映射到`Car`和`Motorcycle`对象，并通过`extends`
属性继承了`vehicleResultMap`的配置。

通过以上的`resultMap`配置，可以实现将关联关系和继承关系映射到Java对象中，从而提供更复杂的数据处理能力。

#### 1. 多表链接

**对一**

一条新闻对应一种新闻类型

新闻实体

~~~java
/**
 * (NewsHeadline)实体类
 *
 * @author makejava
 * @since 2024-09-11 20:49:56
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsHeadline implements Serializable {
    private static final long serialVersionUID = 335157465297684712L;
    /**
     * 头条id
     */
    private Integer hid;
    /**
     * 头条标题
     */
    private String title;
    /**
     * 头条新闻内容
     */
    private String article;
    /**
     * 头条类型id
     */
    private Integer type;
    /**
     * 头条发布用户id
     */
    private Integer publisher;
    /**
     * 头条浏览量
     */
    private Integer pageViews;
    /**
     * 头条发布时间
     */
    private Date createTime;
    /**
     * 头条最后的修改时间
     */
    private Date updateTime;
    /**
     * 乐观锁
     */
    private Integer version;
    /**
     * 头条是否被删除 1 删除  0 未删除
     */
    private Integer isDeleted;

}

~~~

~~~java
/**
 * (NewsType)实体类
 *
 * @author makejava
 * @since 2024-09-11 20:49:56
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsType implements Serializable {
    private static final long serialVersionUID = -65348693997440145L;
    /**
     * 新闻类型id
     */
    private Integer tid;
    /**
     * 新闻类型描述
     */
    private String tname;
    /**
     * 乐观锁
     */
    private Integer version;
    /**
     * 头条是否被删除 1 删除  0 未删除
     */
    private Integer isDeleted;

}

~~~



1.  在一端修改 PO 类 将 `NewsHeadline`的 `NewsType` 从 `Integer `修改为 `NewsType` ,不需要提起修改，只需要在用到多表链接语句时在做修改，无需提前设计

   ~~~java
   /**
     * 头条类型
     */
   private NewsType type;
   /**
   ~~~

2. 修改 xml文件，增加属于映射 `association`是对一映射，也就是 PO 类的映射是单属性，不是集合，需要放在 所有 `<reslut/>`标签后面

   ~~~xml
    <association property="type" javaType="cn.xiaomurui.blog.infrastructure.persistent.po.NewsType">
               <id property="tid" column="tid" jdbcType="INTEGER"/>
               <result property="tname" column="tname" jdbcType="VARCHAR"/>
   </association>
   ~~~

3. 修改 SQL 语句 写多表链接语句

   ~~~sql
    select t1.hid,
                  t1.title,
                  t1.article,
                  t2.tid,
                  t2.tname,
                  t1.publisher,
                  t1.page_views,
                  t1.create_time,
                  t1.update_time
           from news_headline t1 left join news_type t2 on t1.type = t2.tid
   ~~~

   测试结果

   ![image-20240912094246827](../../../../../AppData/Roaming/Typora/typora-user-images/image-20240912094246827.png)

**对多**

一个作者有多条新闻

1. 修改 PO 类

~~~java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsUserDTO implements Serializable {
    private static final long serialVersionUID = 575014378869990794L;
    /**
     * 用户id
     */
    private Integer uid;
    /**
     * 用户登录名
     */
    private String username;

    /**
     * 用户昵称
     */
    private String nickName;

    /**
     * 用户头条列表
     */
    private List<NewsHeadline> newsHeadlineList;
}
~~~

2. 修改 Mapper.xml 文件：collection 对多映射标签，ofType 映射的集合的类

   ~~~xml
    <resultMap id="NewsUserDTOMap" type="cn.xiaomurui.blog.infrastructure.persistent.po.NewsUserDTO">
           <result property="uid" column="uid" jdbcType="INTEGER"/>
           <result property="username" column="username" jdbcType="VARCHAR"/>
           <result property="nickName" column="nick_name" jdbcType="VARCHAR"/>
           <collection property="newsHeadlineList" ofType="cn.xiaomurui.blog.infrastructure.persistent.po.NewsHeadline">
               <result property="hid" column="hid" jdbcType="INTEGER"/>
               <result property="title" column="title" jdbcType="VARCHAR"/>
               <result property="article" column="article" jdbcType="VARCHAR"/>
               <result property="publisher" column="publisher" jdbcType="INTEGER"/>
               <result property="pageViews" column="page_views" jdbcType="INTEGER"/>
               <result property="createTime" column="create_time" jdbcType="TIMESTAMP"/>
               <result property="updateTime" column="update_time" jdbcType="TIMESTAMP"/>
           </collection>
       </resultMap>
   ~~~

   

#### 2. 分页

分页使用的场景是查询过多的页面如：查询文章列表，但是文章数据非常多，选择分页显示。分页的原理是 SQL语句中使用 limiter 语句分页。现成的开源工具有 [Mybatis-PageHelper](https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/HowToUse.md)

**SpringBoot 集成 分页插件**

1. 引入对应的 stater

   ~~~xml
   <dependency>
       <groupId>com.github.pagehelper</groupId>
       <artifactId>pagehelper-spring-boot-starter</artifactId>
       <version>最新版本</version>
   </dependency>
   ~~~

2. 配置 yaml 

   ~~~yaml
   pagehelper:
     propertyName: propertyValue
     reasonable: false
     defaultCount: true # 分页插件默认参数支持 default-count 形式，自定义扩展的参数，必须大小写一致
   ~~~

3. Service 层编写分页方法

   ~~~java
    /**
        * 分页查询新闻类型列表
        * @param pageNum 页码
        * @param pageSize 每页条数
        * @return 分页信息
        */
       public PageInfo<NewsType> getNewsTypeList(int pageNum, int pageSize) {
           PageHelper.startPage(pageNum, pageSize);
           List<NewsType> newsTypes = newsTypeDao.queryNewsTypeList();
           PageInfo<NewsType> pageInfo = new PageInfo<>(newsTypes,3);
           return pageInfo;
       }
   ~~~

4.  SQL 语句：按照正常的业务编写即可，单不能在最后写”，“号

5. 分页效果

   数据库数据

![image-20240912140101695](../../../../../AppData/Roaming/Typora/typora-user-images/image-20240912140101695.png)

​      单元测试：

~~~java
@Test
    public void test_pageInfo() {
        PageInfo<NewsType> newsTypePageInfo1 = newRepository.getNewsTypeList(1, 2);
        log.info("测试结果:{}", newsTypePageInfo1.getList());
        PageInfo<NewsType> newsTypePageInfo2 = newRepository.getNewsTypeList(2, 2);
        log.info("测试结果:{}", newsTypePageInfo2.getList());

    }
~~~

![image-20240912140625481](https://s2.loli.net/2024/09/12/bpfAromH2zdGvkN.png)

**多表链接分页**

和普通的分页一样没有区别

#### 3. 注解 SQL的使用

[mybatis(五): SQL 注解版_mybatis的注解sql-CSDN博客](https://blog.csdn.net/qq_24583853/article/details/103866228)
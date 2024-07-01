### 知识点

#### 1. 分库分表

**可能的面试题**

1. 什么是分库分表？
   - 分库分表是用来解决数据库并发量巨大一个库无法满足的使用的解决的一种方案。
2. 在项目规模较小的时候是否需要使用分库分表设计？
   - 直接使用分库分表设计，分库分表的技术方案比较成熟了，也经历了双十一等大规模的活动的考验。
   - 项目数据量巨大后再采用分库分表设计将面临巨大的数据迁移成本。
3. 分库分表技术和使用分布式数据库的区别，为什么不使用分布式数据库？
   - 分布式数据库技术目前不是很成熟没有经历过时间的检验，
4. 分库分表的原则？
   - 根据业务规则，在抽奖服务中，如配置表等数据量不大的无需分库分表，在活动订单表、活动账户流水表等数据量巨大的可以去做分库分表
5. 分库分表在小的项目中怎么使用？
   - 将一台物理机虚拟为多台虚拟机，每个项目都使用虚拟机的数据库，未来在数据量上来后再扩容，这样无需修改项目代码，只需将虚拟机和物理机做配置就好。

**使用**

分表分表使用开源的分库分组路由组件`DB-springBoot-stater`,分库分表需要设置分库分表的key,这里使用`userId`,这样不同的key将分散存储在不同的数据库/表中。

每一个库都需要单独配置yaml信息如：

~~~ yaml
mini-db-router:
  jdbc:
    datasource:
      dbCount: 2
      tbCount: 4
      default: db00
      routerKey: userId
      list: db01,db02
      db00:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:13306/big_market?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
      db01:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:13306/big_market_01?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
      db02:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:13306/big_market_02?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
~~~

分库分表存储的方法需要使用自定义的注解标记如：

~~~ java
@Mapper
@DBRouterStrategy(splitTable = true)
public interface IRaffleActivityOrderDao {
    int deleteByPrimaryKey(Long id);

    @DBRouter(key = "userId")
    void insert(RaffleActivityOrderPO record);

    @DBRouter
    List<RaffleActivityOrderPO> queryRaffleActivityOrderByUserId(String userId);
}
~~~


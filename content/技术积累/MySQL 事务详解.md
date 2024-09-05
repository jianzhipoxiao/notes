## MySQL 事务详解



#### 事务的启动方式





#### Count() 函数

Count() 函数为返回不为 null 的 记录总条数。其中 InnoDB 因为事务的特性，每次都会遍历全表拿到所有的条数返回给 Server 层做累加操作，但是 Server 层累加的时候会判断记录是否为空，不为空才累加。MySAM 不会做每次遍历累加操作而是将这个值存储起来，做增量的增加。

> MySAM 仅限于 where 后面不跟条件，不然也要重新计算

**有什么好的解决方案**：

存储一张缓存表记录当前的条数，为什么不使用 Redis 来做缓存呢，因为 Redis 没办法做事务，会导致数据不一致具体分为两个方面：

1. Redis 掉电重启会丢失一次 记录数的更新
2. Redis 正常工作 但并发情况下导致数据的不一致。

![image-20240817161434916](C:\Users\ll159\AppData\Roaming\Typora\typora-user-images\image-20240817161434916.png)

性能排行 count(*) ₌ count(1) > count (主键 ID) > count(字段)


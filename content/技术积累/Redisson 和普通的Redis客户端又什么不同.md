# Redisson 说明

## 一. Redisson 简介

Redisson是一个Java Redis客户端，提供了许多高级的分布式数据结构和服务，能够帮助开发人员更方便地使用Redis来构建分布式应用。它是基于Java的Redis客户端Jedis之上的一个抽象层，提供了比Jedis更高级的功能和更简单的API。对比其他的Ridss客户端来讲，它抽象层次更高，用户不需要再考虑分布式的并发安全问题。

## 二. Redisson 特点

如果只是单条的命令 redisson 和其他的客户端没有什么区别，因为Redis是单线程模型,保证了单条任务的原子性。但是如果使用事务或者是管道处理多条命令的时候就无法保证原子性了。在需要执行一组命令时需要考虑到并发问题。假如使用的是 `RedisTemplate`这类客户端，有一个需求先要获取 某个 key 的值然后，修改也就是`get().set()`,可能存在并发安全问题。

当我们需要执行一组命令时如秒杀场景的时候，需要配合`lua脚本`让一组命令保证原子性，但是`lua脚本 `是比较复杂的，或则需要使用如 `Java`中的  `AstomicInt`等原子类的时候也无法直接使用。

Redisson 帮我们封装了这些操作 分布式的操作。

###  2.1 redisson 看门狗机制

**看门狗是什么？**

看门狗是防止在设置分布式锁过期时间时，当前线程业务代码还未执行完就释放锁，从而使其的线程可以在持有锁，为当前线程持有的锁续约的一个机制。默认为续约30秒，每10秒会检测一下是否需要续约。看门狗会为业务代码续约，那么在业务执行过程中 Tomcat 突然挂掉，看门狗还会续约吗？不会，Redisson 使用心跳机制来维持锁的续约。只要业务逻辑在运行，并且客户端与 Redis 的连接保持活跃，看门狗就会继续续约。



## 三. Redisson 底层实现

### 3.1 如何设计与实现分布式锁

**设计思想**

1. **基于 Redis 的原子操作**：使用 Redis 的 `SET` 命令和 Lua 脚本来保证锁操作的原子性。`SET` 命令可以设置键值对，并且可以指定过期时间和 NX（只有当键不存在时才设置）参数。
2. **锁的唯一标识**：每个锁都有唯一的标识（UUID）+线程ID，确保同一个锁在不同的节点上不会冲突。
3. **可重入性**：通过在 Redis 中存储锁的持有者信息（例如线程 ID 和重入计数），实现锁的可重入性。

**实现细节**

1. **redisson.getLock(lockKey)获取锁**：去获取当前线程 ID key 的 TTL 时间如果为 null 获取锁成功，返回锁，不为空自旋重试。
2. **redisson.lock加锁**：在获取到锁后写入 UUID+当前线程ID值
3. **redisson.unlock释放锁**：只有锁的持有者才能释放锁。通过比较锁的值（UUID）来确认锁的持有者，然后删除锁。

Redisson 为什么能够保证其提供的 分布式锁或则其他原子类，底层也是依靠`Lua脚本`来实现一组命令的原子性。Redis 不是支持事务机制为什么不用Redis 提供的事务来完成？

### **3.2 Redis 事务**

redis 的事务并并不支持如数据库ACID特性，无法做到隔离性和一致性。redis的事务是将需要执行的一组命令 提交到一个队列中，依次执行这些命令，事务开启期间，命令操作的key依然可以其他的客户端修改。并且其中的一条命令执行失败并不会影响到其他的命令。

**redis事务为什么不支持ACID**

redis 是以简单和高性能为设计的初衷，事务回滚机制会影响性能，这与Redis 的设计初衷相悖

**redis事务有什么用处**

redis 事务可以保证一组命令是有序的执行的不会乱序

## 四. Redisson 使用说明

#### 阻塞队列 (`RBlockingQueue`)

Redisson 阻塞队列是一种分布式队列，它基于 Redis 实现，支持多生产者和多消费者的并发操作。与普通的队列不同，阻塞队列在尝试从空队列中获取元素时会阻塞，直到队列中有元素可用为止。

**阻塞操作**：

- `take()`: 如果队列为空，则阻塞直到队列中有元素。
- `poll(long timeout, TimeUnit unit)`: 尝试获取元素，如果队列为空则阻塞指定时间，超时返回 null。

#### 延时队列 (`RDelayedQueue`)

延时队列 (`RDelayedQueue`) 是一个附加在阻塞队列 (`RBlockingQueue`) 之上的特殊队列。元素在被添加到延时队列时，会有一个指定的延时时间。在这段时间内，元素在延时队列中是不可见的，且不会被移到阻塞队列中。只有当延时时间到期后，元素才会被转移到阻塞队列中，从而变得可见并可被消费。

Redisson 延时队列区别于普通队列，延时队列加入的元素需要指定的时间过去后才将元素转移到阻塞队列。元素在延时期间是不可见的，且不会被转移到阻塞队列中。

生成者生产元素加入队列

~~~java
// 使用延时队列
String cacheKey = Constants.RedisKey.ACTIVITY_SKU_COUNT_QUERY_KEY;
RBlockingQueue<ActivitySkuStockKeyVO> blockingQueue = redisService.getBlockingQueue(cacheKey);
RDelayedQueue<ActivitySkuStockKeyVO> delayedQueue = redisService.getDelayedQueue(blockingQueue);
delayedQueue.offer(activitySkuStockKeyVO, 3, TimeUnit.SECONDS);
~~~

消费者消费队列元素

~~~java
// 在阻塞队列中获取消费
String cacheKey = Constants.RedisKey.ACTIVITY_SKU_COUNT_QUERY_KEY;
RBlockingQueue<ActivitySkuStockKeyVO> destinationQueue = redisService.getBlockingQueue(cacheKey);
destinationQueue.poll();
~~~




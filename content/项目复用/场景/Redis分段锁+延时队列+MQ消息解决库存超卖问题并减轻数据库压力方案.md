### 一 问题背景
在 电商、抽奖、外卖等平台中都离不开库存的减扣，在高并发的情况下，如果不处理好同步关系会出现‘超卖问题’。也就是100个库存，结果销售了102份，最后库存为-2。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/43196572/1719651328345-f9df73e3-3bbb-4d6e-a429-cf4190094711.png#averageHue=%23fef8ea&clientId=u10a9af35-9a9b-4&from=paste&height=547&id=uab58bc8d&originHeight=684&originWidth=1143&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=65519&status=done&style=none&taskId=u54d82cb6-0bbe-426d-bb07-34e048ed8d2&title=&width=914.4)
### 二. Redis 分段锁
#### 2.1 为什么加锁可以解决超卖
超卖的原因为当一个线程去扣减库存的时候获取的值不是最新的值，而加锁后保证了同一时间只有一个线程去修改库存。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/43196572/1719652382842-8faa9814-a72b-4488-89c4-3c2610a98f31.png#averageHue=%23fef9ee&clientId=u10a9af35-9a9b-4&from=paste&height=698&id=ua335b491&originHeight=872&originWidth=1143&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=80393&status=done&style=none&taskId=ue8a373c7-98fd-44c4-80f9-3b64a6e084c&title=&width=914.4)
#### 2.2 独占锁和分段锁的区别
独占锁：在线程来减扣库存的时候，先去争夺锁，拿到锁后再去减扣库存。<br />分段锁：在线程来减扣库存的时候,先去减扣库存再去加锁
#### 2.3 分段锁相对于独占锁有什么优势？
先减扣库存，再减扣库存后在加锁，这样同时刻有多分锁，不存在多个线程抢一份锁，这样可以极大的提高系统的效率。
> 为什么可以先减扣库存，Redis decr 命令极快且是原子命令


**分段锁的实现**
```java
public Boolean subtractionAwardStock(String cacheKey) {
long surplus = redisService.decr(cacheKey);
// 库存小于0，恢复为0 减扣库存失败
if (surplus < 0) {
    redisService.setValue(cacheKey, 0);
    return false;
}

// 1. 按照cacheKey decr 后的值，如 99、98、97 和 key 组成为库存锁的key进行使用。
// 2. 加锁为了兜底，如果后续有恢复库存，手动处理等，也不会超卖。因为所有的可用库存key，都被加锁了。
String lockKey = cacheKey + Constants.UNDERLINE + surplus;
Boolean lock = redisService.setNx(lockKey);
if (!lock) {
    log.error("商品加锁失败！{}", lockKey);
}
return lock;
}
```
### 三、延时队列和MQ消息
#### 3.1 延时队列
在 Redis 中处理完库存的后需要保证后数据库保持一致，使用Redis的延时队列或者是其他的延时队列也可以，将商品的实体加入延时队列队列延时3秒
```java
public void awardStockConsumeSendQueue(StrategyAwardStockKeyVO strategyAwardStockKeyVO) {
String cacheKey = Constants.RedisKey.STRATEGY_AWARD_COUNT_QUEUE_KEY;
RBlockingQueue<Object> blockingQueue = redisService.getBlockingQueue(cacheKey);
RDelayedQueue<Object> delayedQueue = redisService.getDelayedQueue(blockingQueue);
delayedQueue.offer(strategyAwardStockKeyVO, 3, TimeUnit.SECONDS);
}
```
> redis 中延时队列是基于阻塞队列实现的，其底层使用的是 Zset


编写 异步的定时任务 更新数据库，这里使用 SpringTask也可以使用其他的定时框架
```java
@Scheduled(cron = "0/5 * * * * ?")
private void exec() {
    try {
        log.info("定时任务，更新奖品消耗库存【延迟队列获取，降低对数据库的更新频次，不要产生竞争】");
        StrategyAwardStockKeyVO strategyAwardStockKeyVO = raffleStock.takeQueueValue();
        if (null == strategyAwardStockKeyVO) return;
        log.info("定时任务，更新奖品消耗库存 strategyId:{} awardId:{}", strategyAwardStockKeyVO.getStrategyId(), strategyAwardStockKeyVO.getAwardId());
        raffleStock.updateStrategyAwardStock(strategyAwardStockKeyVO.getStrategyId(), strategyAwardStockKeyVO.getAwardId());
    } catch (Exception e) {
        log.error("定时任务，更新奖品消耗库存失败", e);
    }
}
```
使用 @Scheduled 注解记得在 Application处开启 @EnableScheduling，并且配置一下线程池，不然可能会出现阻塞的情况。

#### 3.2 MQ 消息
在 Redis 中库存减扣到0后另起一条 MQ 消息直接将数据库库存修改为0，清空延时队列。这样可以防止延时队列消息的积压。

### 四. 总结
1.怎么解决超卖问题，可以对库存加锁<br />2.为什么使用分段锁不使用独占锁，根据业务使用分段锁性能更好<br />3.使用延时队列缓慢更新数据库，减轻数据库压力<br />4.如果使用CAS等无锁方案可不可以，在当前业务下不行，因为在减扣库存后Redis挂掉后重新导入数据会出现重复消费的问题<br />5.如果更新数据库的时候失败怎么办：库存的减扣依据是Redis中的数据，即使数据库和Redis 短时间内数据不一致也没有问题，最终会保证一致的。


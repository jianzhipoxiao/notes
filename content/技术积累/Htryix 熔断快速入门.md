## Htryix 熔断快速入门

 **Hystrix 常用配置**

| 配置项                                             | 描述                                                        |
| -------------------------------------------------- | ----------------------------------------------------------- |
| `execution.isolation.thread.timeoutInMilliseconds` | 设置命令执行的超时时间（毫秒），此处为 1000 毫秒。          |
| `circuitBreaker.requestVolumeThreshold`            | 断路器在决定是否打开之前需要的请求数量阈值，此处为 10。     |
| `circuitBreaker.sleepWindowInMilliseconds`         | 断路器打开状态下的休眠时间（毫秒），此处为 5000 毫秒。      |
| `circuitBreaker.errorThresholdPercentage`          | 错误比例阈值，超过 50% 时断路器将打开。                     |
| `fallback.enabled`                                 | 启用或禁用降级功能，默认为 `true`。                         |
| `circuitBreaker.forceOpen`                         | 强制断路器始终处于打开状态，主要用于测试。                  |
| `circuitBreaker.forceClosed`                       | 强制断路器始终处于关闭状态，忽略错误率。                    |
| `execution.isolation.strategy`                     | 设置执行隔离策略，值可以是 `THREAD`（默认）或 `SEMAPHORE`。 |
| `metrics.rollingStats.timeInMilliseconds`          | 定义滚动统计的时间窗口（毫秒）。                            |
| `metrics.rollingStats.numBuckets`                  | 设置滚动统计中的桶数量。                                    |
| `requestCache.enabled`                             | 启用或禁用请求缓存，默认为 `true`。                         |
| `threadPool.size`                                  | 设置线程池的大小，用于控制并发请求的数量。                  |


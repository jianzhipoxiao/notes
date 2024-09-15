### DDD与MVC区别

#### 1. 服务调用

DDD 当中每个领域都是互相独立的，但是一些业务流程是需要用到多个领域服务，DDD 的处理方式为在 triger 层 进行调用、不在领域内部调用。

列如：目前有这么一个需求用户先参数活动然后抽奖，在大方面上设计到两个领域 Activity 和 Strategy 两个领域

**DDD 调用流程**

![image-20240911153808981](https://s2.loli.net/2024/09/11/7YgPbqWwuj8yB2p.png)

领域之间不做相互调用 DO、VO、PO 对象，做防腐设计，在 trigger 层编排，如果调用链路较为复杂，增加 case 层做编排。

**MVC 调用流程**

![image-20240911154205366](https://s2.loli.net/2024/09/11/IfERtzM2baxBqPi.png)

service 之间存在相互调用 DO、VO、PO 对象的关系，需要做兼容，防腐设计弱。
#### Spring定时任务解决方案`@Scheduled`

> 作者：小木蕊 2024年4月2日

### 情景

系统需要定时去执行扫描任务，看看是否有未支付的订单，如果存在将其改为超时，自动关闭订单

#### 任务

需要做一个定时任务，定期的去查询数据库，检测是否超时，超时推送消息

#### 方案

Spring框架的`@Scheduled`注解是用于在特定时间间隔内执行方法的注解。它允许您在Spring应用程序中轻松地创建计划任务。`@Scheduled`可以用于**方法级别**，指示Spring定时执行方法，也可以用于类级别，指示所有方法都应定期执行。

要使用`@Scheduled`注解，您需要在Spring应用程序中启用任务调度。您可以通过在Spring配置文件中添加`<task:annotation-driven/>`来启用注解驱动的任务执行。

##### 使用步骤

1. 开启@Sheduled注解

   ~~~java
   @SpringBootApplication
   @EnableScheduling
   public class Application {
       public static void main(String[] args){
           SpringApplication.run(Application.class);
       }
   }
   ~~~

   

2. 在业务需要的地方使用

```java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MyScheduledTasks {

    // 每隔5秒执行一次
    @Scheduled(fixedRate = 5000)
    public void task1() {
        System.out.println("Executing Task 1");
    }

    // 每天凌晨1点执行
    @Scheduled(cron = "0 0 1 * * ?")
    public void task2() {
        System.out.println("Executing Task 2");
    }
}
```

在这个例子中，`MyScheduledTasks`类使用`@Component`注解使其成为Spring管理的Bean，并且两个方法都被`@Scheduled`注解标记。`task1()`方法使用`fixedRate`属性指定了执行间隔，而`task2()`方法使用了cron表达式来定义执行时间。

### 结果

Spring将会帮助我们去执行这个定时任务

其他场景

1. **定时任务执行**: 您可以使用`@Scheduled`注解来执行定期的任务，例如定期数据备份、日志清理、缓存刷新等。

2. **轮询外部资源**: 您可以定期轮询外部资源，例如数据库、消息队列、API端点等，以获取更新或执行必要的操作。

3. **定时通知和提醒**: 您可以使用定时任务来发送通知或提醒，例如定时发送电子邮件、短信通知或推送通知。

4. **定时数据处理**: 您可以定时处理数据，例如聚合、转换、清理或计算数据，并将结果存储在数据库或其他存储中。

5. **定时报表生成**: 如果您的应用程序需要定期生成报表或统计数据，您可以使用定时任务来触发报表生成过程。

6. **缓存刷新**: 如果您的应用程序使用缓存，您可以定期刷新缓存以确保数据的及时性和准确性。

7. **资源释放和清理**: 您可以使用定时任务来执行资源释放和清理操作，例如关闭未使用的连接、清理临时文件等。


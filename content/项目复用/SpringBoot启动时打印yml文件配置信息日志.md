### SpringBoot启动时打印yml文件配置信息日志

[TOC]



### 1.情景

docker打包镜像十分的缓慢，在本地调试修改`application.yml`文件后有时候修改了配置文件，但是不知道是否生效。本地调试后，将地址设置为线上后不知是否修改成功

### 2.任务

镜像启动的时候打印配置`applicaton.yml`内容

### 3.方案

在SpringBoot启动时打印日志

#### 3.1. 实现`CommandLineRunner`接口的`run`方法

	~~~java
	 @Override
	 public void run(String... args) throws Exception {}
	~~~
	
	实现该方法后，在启动类启动后会自动执行该方法一次

#### 3.2.实现 `EnvironmentAware`接口，可以获取到配置文件的存储内容

~~~java
 private Environment environment;

    @Autowired
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }
~~~

#### 3.3. 利用反射机制获取到属性名和属性值并打印

~~~java
package cn.xiaomurui.chatglm.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author 小木蕊 xiaomurui@126.com
 * @version 1.0.0
 * @caeateDate 2024/1/26
 * @description 程序启动入口
 */
@Slf4j
@SpringBootApplication
@Configurable
@EnableScheduling
public class Application implements CommandLineRunner, EnvironmentAware {

    private Environment environment;

    @Autowired
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("服务启动系统配置如下：");
        if (environment instanceof ConfigurableEnvironment) {
            ConfigurableEnvironment configurableEnvironment = (ConfigurableEnvironment) environment;
            for (PropertySource<?> propertySource : configurableEnvironment.getPropertySources()) {
                Object source = propertySource.getSource();
                if (source.getClass().getSimpleName().equals("UnmodifiableMap")) {
                    Map configMap = (Map)source;
                    log.info("---------------------------------------");
                    for (Object key:configMap.keySet()){
                        log.info("{}，{}",key,configMap.get(key));
                    }
                }
            }
        }
    }
}

~~~

### 4.结果

在打包为镜像后可以直接看日志文件看配置的地址是否为生产环境

![image-20240407224454803](https://s2.loli.net/2024/04/07/9m1Ou5JVGDzpQS6.png)

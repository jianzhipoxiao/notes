# SpringBoot

> SpringBoot是一个快速创建spring项目的技术框架，无法解决某一层（MVC）的问题，简化sping项目繁琐的配置文件



## springboot工程创建

1. 创建普通的empty项目

2. 在父工程上创建maven model

3. 添加pom

	```xml
	<parent>
	    <!--springboot-->
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-parent</artifactId>
	    <version>3.0.5</version>
	</parent>
	```



项目依赖

~~~xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.0.5</version>
        </dependency>
    </dependencies>
~~~





**启动类** 只要在根包下在可以扫描到，启动类也是一个配置类 

~~~java
//启动类注解
  @SpringBootApplication
public class Main {
    public static void main(String[] args) {
        //自动创建ioc容器 启动tomcat服务器软件
        SpringApplication.run(Main.class, args);
    }
}
~~~



springboot在导入依赖时不需要导入版本因为其父工程（spring-boot-dependencies）已做好版本管理放心使用不存在版本冲突



## 启动器Starter

Starter就是一堆依赖和配置文件的集合，将一系列配置经行捆绑只导入启动器即可，启动器会自动帮我们导入相关的依赖和约定大于配置

启动器有sping提供的也有第三方提供的，也可以以自己编写启动器，和maven的依赖传递有点相似



### 配置类

统一配置类文件

使用 application.properties 或者 application.yml/application.yaml

![image-20231004173048384](SpringBoot.assets/image-20231004173048384.png)

配置文件相关的api文档

https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html?spm=wolai.workspace.0.0.68b62306qAU4I4#appendix.application-properties

也可以写自定义配置使用@Value注解读取即可



application.peoperties不推荐使用，因为key会有很多层次，即前缀名很长，推荐使用yaml/yml类型配置文件

yml是一种层次化的配置文件可读性好，可继承

yaml结构

~~~yml
#key 和值间有一个空格 多个值用 -
server:
  port: 9090
  servlet:
    context-path: /boot
~~~

peoperties结构

~~~properties
#官方配置
server.port=9090
server.servlet.context-path=/ll
~~~

@ConfigurationProperties注解批量注入值方便直接在类上添加但要求属性名称和yaml文件中名称一致

```java
@ConfigurationProperties(prefix = "lwx.user")
```

### active激活不同的测试环境

application-{key}.yaml可声明不同的配置文件，使用active：key来激活不同的测试配置的环境 **当外部的key与主yaml一致时外部优先** 



## 静态资源访问

默认开启静态资源访问的路劲

1. calsspath:/META-INF/resourse/
2. calsspath:/resourse
3. calsspath:/static
4. classpath:/public

> 访问静态资源时无须写静态资源路径，可自定义静态资源路径



## 整合mybatis框架

- 启动类添加注解 @MapperScan手动指定mapper接口所在位置
- 在application.yaml文件中进行相关配置
- 不在需要mapper.xml层级和mapper接口一致

**springBoot3与mybatis不兼容问题**

1. 在resource文件夹下创建META-INF.spring文件夹

	> META-INF.spring

2. 创捷文件org.springframework.boot.autoconfigure.AutoConfiguration.imports

	> org.springframework.boot.autoconfigure.AutoConfiguration.imports

3. 写入内容com.alibaba.druid.spring.boot3.autoconfigure.DruidDataSourceAutoConfigure

	> com.alibaba.druid.spring.boot3.autoconfigure.DruidDataSourceAutoConfigure

	

> springBoot2没有此问题



### springboot项目打包

- 普通web项目打包 –> war -> tomcat
- springboot项目打包 –>jar(内置服务器软件) –>命令行 部署

在maven中添加以下打包插件

~~~xml
<!--    SpringBoot应用打包插件-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
~~~

使用常规的java -jar命令来运行打包后的Spring Boot项目是无法找到应用程序的入口点，因此导致无法运行。



@springBootTest注解可快速的经行测试


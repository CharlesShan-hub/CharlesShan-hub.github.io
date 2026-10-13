---
title:
tags:
date:
comment:
---

# 定制web容器

---

## web服务器切换为jetty

springboot默认嵌入的web服务器是Tomcat，如何切换到jetty服务器？

实现方式：排除Tomcat，添加Jetty依赖

**修改 **`pom.xml`** 文件**：在 `pom.xml` 中，确保你使用 `spring-boot-starter-web` 并排除 Tomcat，然后添加 Jetty 依赖。

```xml
<!-- 排除 Tomcat -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- 添加 Jetty 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>

```

---

## web服务器切换原理

从哪里可以看出springboot是直接将tomcat服务器嵌入到应用中的呢？看这个类：`ServletWebServerFactoryAutoConfiguration`

![1731572949358-481582b6-0e79-4f4c-b556-b1ec3c13882c.png](../assets/1731572949358-481582b6-0e79-4f4c-b556-b1ec3c13882c.png)

以上代码显示嵌入的是3个服务器。但并不是都生效，我们来看一下生效条件：

![1731573044414-b1cb4767-de21-4897-9d38-36e6382a8581.png](../assets/1731573044414-b1cb4767-de21-4897-9d38-36e6382a8581.png)

生效条件是，看类路径当中是否有对应服务器相关的类，如果有则生效。`spring-boot-web-starter`这个web启动器引入的时候，大家都知道，它间接引入的是tomcat服务器的jar包。因此默认Tomcat服务器被嵌入。如果想要切换web服务器，将tomcat相关jar包排除掉，引入jetty的jar包之后，jetty服务器就会生效，这就是切换web服务器的原理。

---

## web服务器优化

通过以下源码得知，web服务器的相关配置和`ServerProperties`有关系：

![1731573299936-414ae5c8-87a8-4810-b448-ac1b67f3cfb2.png](../assets/1731573299936-414ae5c8-87a8-4810-b448-ac1b67f3cfb2.png)

查看`ServerProperties`源码：

![1731573337370-7d40853c-9c5a-4750-a40d-cf00d1528fb4.png](../assets/1731573337370-7d40853c-9c5a-4750-a40d-cf00d1528fb4.png)

得知web服务器的配置都是以`server`开头的。

那么如果要配置tomcat服务器怎么办？要配置jetty服务器怎么办？请看一下源码

![1731573416792-229c5dbb-4a42-4037-934d-bd004bc46a7d.png](../assets/1731573416792-229c5dbb-4a42-4037-934d-bd004bc46a7d.png)

![1731573452454-a150e6b1-6fa0-411c-b2a5-063f5b03be6b.png](../assets/1731573452454-a150e6b1-6fa0-411c-b2a5-063f5b03be6b.png)

通过以上源码得知，如果要对tomcat服务器进行配置，前缀为：`server.tomcat`

如果要对jetty服务器进行配置，前缀为：`server.jetty`。

在以后的开发中关于tomcat服务器的常见优化配置有：

```properties

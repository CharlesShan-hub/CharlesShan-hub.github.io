---
title:
tags:
date:
comment:
---

# MyBatis逆向生成

MyBatis逆向工程：使用IDEA插件可以根据数据库表的设计逆向生成MyBatis的Mapper接口 与 MapperXML文件。

---

## 安装插件`free mybatis tools`

![1729234849712-989025f9-e324-45c0-a126-48ea9186582b.png](../assets/1729234849712-989025f9-e324-45c0-a126-48ea9186582b.png)

---

## 在IDEA中配置数据源

![1729234975933-38892ecf-5c92-4626-904b-223426f8f026.png](../assets/1729234975933-38892ecf-5c92-4626-904b-223426f8f026.png)

---

## 创建数据库，创建表，准备数据

![1729235029429-c3c14165-a775-45e5-a4b8-d9ca303c4a95.png](../assets/1729235029429-c3c14165-a775-45e5-a4b8-d9ca303c4a95.png)

---

## 使用脚手架创建SpringBoot项目

![1764860374189-0473287e-b071-4f15-a30a-39f3cd29f95b.png](../assets/1764860374189-0473287e-b071-4f15-a30a-39f3cd29f95b.png)

添加依赖：mybatis依赖、mysql驱动、Lombok库

![1729235310734-659b79b7-df95-4157-b405-9c0c316f754b.png](../assets/1729235310734-659b79b7-df95-4157-b405-9c0c316f754b.png)

---

## 生成MyBatis代码放到SpringBoot项目中

在表上右键：Mybatis-Generator

![1729235071633-a4d6bd7a-dc80-45c3-bc52-31dfee5789bf.png](../assets/1729235071633-a4d6bd7a-dc80-45c3-bc52-31dfee5789bf.png)

![1729235692907-6637331b-7b98-41d0-9ca2-47ed44c9bab0.png](../assets/1729235692907-6637331b-7b98-41d0-9ca2-47ed44c9bab0.png)

![1764940615491-c49e1478-68ec-4ae7-b7ca-7d340bb750e9.png](../assets/1764940615491-c49e1478-68ec-4ae7-b7ca-7d340bb750e9.png)

代码生成后，如果在IDEA中看不到，这样做（重新从硬盘加载）：

![1729235782802-6c83273c-0b14-405f-a1c8-793fc80c9123.png](../assets/1729235782802-6c83273c-0b14-405f-a1c8-793fc80c9123.png)

---

## 编写mybatis相关配置

application.properties属性文件的配置：

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/springboot
spring.datasource.username=root
spring.datasource.password=123456


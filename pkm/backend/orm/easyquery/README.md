---
title: README
tags:
  - catalog
date: 2026-10-13
comment:
---
# EasyQuery

Java/Kotlin 的强类型 ORM 框架，用代码写 SQL，编译期检查，IDEA 插件智能提示。

## 书籍

- 暂无成体系的纸质书，官方文档是主要学习资料

## 在线文档

- 《EasyQuery 官方文档》：easy-query.com，覆盖单表、Join、隐式查询、分库分表，结构清晰，配合示例代码，适合当字典
- EasyQuery GitHub Wiki / README：dromara/easy-query，快速了解核心特性和版本更新
- Gitee 镜像文档：国内访问更快

## 视频

- B站搜索 "EasyQuery"：作者和社区录制的入门与实战视频，数量不多但足够上手

## 核心概念速查

- Proxy：`@EntityProxy` 注解编译期生成代理类，提供强类型字段方法（如 `topic.id()`）
- EntityQuery：单表 / 简单查询入口
- EasyEntityQuery：复杂查询入口，支持隐式 Join、隐式子查询
- Navigate：`@Navigate` 注解配置对象关系，是隐式查询的基础
- Implicit Query：隐式查询，自动生成 Join / 子查询 / 分组，无需手写
- Lambda DSL：`o -> o.id().eq("3")` 这种写法，编译器检查 + 插件提示

## 与 MyBatis / JPA 的关键差异

- SQL 写法：MyBatis 字符串 XML；JPA 对象关系；EQ 强类型 Lambda DSL
- 错误发现时机：MyBatis 运行时；JPA 部分编译期；EQ 编译期
- 多表 Join：MyBatis 手写；JPA 弱；EQ 隐式 Join 自动生成
- 分库分表：MyBatis/JPA 需引入 ShardingSphere；EQ 内置
- DTO 返回：MyBatis 需手动映射；JPA 需投影接口；EQ 直接返回 DTO/VO
- 依赖：EQ 零依赖，纯 JDBC 实现

## 资源链接

- 官方文档：easy-query.com
- GitHub：github.com/dromara/easy-query
- Gitee：gitee.com/xuejm/easy-query
- IDEA 插件：EasyQueryAssistant
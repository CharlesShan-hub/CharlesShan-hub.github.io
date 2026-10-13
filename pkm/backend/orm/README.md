---
title: README
tags:
  - catalog
date: 2026-10-13
comment:
---
# ORM 框架

对象关系映射（Object-Relational Mapping），用于在面向对象语言中操作关系型数据库。

## 主流框架

- **EasyQuery**：国产强类型 ORM，支持隐式 Join/子查询/分组，零依赖，编译期检查，IDEA 插件智能提示
- **MyBatis**：半自动持久层框架，XML 或注解编写 SQL，灵活但需手写映射
- **MyBatis-Plus**：MyBatis 增强工具，内置 CRUD、条件构造器、分页插件，简化开发
- **jOOQ**：以 SQL 为中心的类型安全框架，从数据库生成代码，适合偏好 SQL 控制的场景
- **Spring Data JPA**：基于 JPA 规范的 Repository 抽象，方法名派生查询，减少样板代码
- **Hibernate**：JPA 规范的主流实现，全自动 ORM，功能全面但偏重

## 核心概念速查

- **Entity**：数据库表的 Java 对象映射
- **Mapper / Repository**：定义数据库操作方法的接口
- **EntityProxy（EasyQuery）**：`@EntityProxy` 注解编译期生成的强类型代理类，提供字段方法链
- **Lambda DSL**：`o -> o.id().eq("3")`，编译器检查 + 插件提示的查询写法
- **隐式查询（EasyQuery）**：配置对象关系后，Join/子查询/分组由框架自动生成

## 关键差异

- SQL 写法：MyBatis 字符串 XML；JPA 对象查询；EasyQuery/jOOQ 强类型 DSL
- 错误发现：MyBatis 运行时；EasyQuery/jOOQ 编译期
- 多表 Join：MyBatis 手写；EasyQuery 隐式 Join 自动生成
- 分库分表：MyBatis/JPA 需额外组件；EasyQuery 内置
- 依赖：EasyQuery 零依赖；其他框架各有依赖生态

## 资源链接

- EasyQuery：easy-query.com / github.com/dromara/easy-query
- MyBatis：mybatis.org
- MyBatis-Plus：baomidou.com
- jOOQ：jooq.org
- Spring Data JPA：spring.io/projects/spring-data-jpa
- Hibernate：hibernate.org

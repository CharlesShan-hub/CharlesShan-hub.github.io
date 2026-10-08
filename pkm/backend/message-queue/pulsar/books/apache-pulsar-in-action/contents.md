---
title: contents
tags:
  - book
date: 2026-10-08
comment:
---
# contents

foreword

前言

preface

序言

acknowledgments

致谢

about this book

关于本书

about the author

关于作者

about the cover illustration

关于封面插图

Part 1 Getting started with Apache Pulsar

第 1 部分　Apache Pulsar 入门

1 Introduction to Apache Pulsar

1　Apache Pulsar 简介

1.1 Enterprise messaging systems

1.1　企业消息系统

Key capabilities

关键能力

1.2 Message consumption patterns

1.2　消息消费模式

Publish-subscribe messaging

发布-订阅消息

Message queuing

消息队列

1.3 The evolution of messaging systems

1.3　消息系统的演进

Generic messaging systems

通用消息系统

Message-oriented middleware

面向消息的中间件

Enterprise service bus

企业服务总线

Distributed messaging systems

分布式消息系统

1.4 Comparison to Apache Kafka

1.4　与 Apache Kafka 的比较

Multilayered architecture

多层架构

Message consumption

消息消费

Data durability

数据持久性

Message acknowledgment

消息确认

Message retention

消息留存

1.5 Why do I need Pulsar?

1.5　我为什么需要 Pulsar？

Guaranteed message delivery

有保证的消息投递

Infinite scalability

无限可扩展性

Resilient to failure

对故障具有韧性

Support for millions of topics

支持数百万个主题

Geo-replication and active failover

异地复制与主动故障转移

1.6 Real-world use cases

1.6　真实世界用例

Unified messaging systems

统一消息系统

Microservices platforms

微服务平台

Connected cars

联网汽车

Fraud detection

欺诈检测

2 Pulsar concepts and architecture

2　Pulsar 的概念与架构

2.1 Pulsar’s physical architecture

2.1　Pulsar 的物理架构

Pulsar’s layered architecture

Pulsar 的分层架构

Stateless serving layer

无状态服务层

Stream storage layer

流存储层

Metadata storage

元数据存储

2.2 Pulsar’s logical architecture

2.2　Pulsar 的逻辑架构

Tenants, namespaces, and topics

租户、命名空间与主题

Addressing topics in Pulsar

在 Pulsar 中寻址主题

Producers, consumers, and subscriptions

生产者、消费者与订阅

Subscription types

订阅类型

2.3 Message retention and expiration

2.3　消息留存与过期

Data retention

数据留存

Backlog quotas

积压配额

Message expiration

消息过期

Message backlog vs. message expiration

消息积压与消息过期的对比

2.4 Tiered storage

2.4　分层存储

3 Interacting with Pulsar

3　与 Pulsar 交互

3.1 Getting started with Pulsar

3.1　Pulsar 上手

3.2 Administering Pulsar

3.2　管理 Pulsar

Creating a tenant, namespace, and topic

创建租户、命名空间与主题

Java Admin API

Java Admin API

3.3 Pulsar clients

3.3　Pulsar 客户端

The Pulsar Java client

Pulsar Java 客户端

The Pulsar Python client

Pulsar Python 客户端

The Pulsar Go client

Pulsar Go 客户端

3.4 Advanced administration

3.4　高级管理

Persistent topic metrics

持久化主题指标

Message inspection

消息检视

Part 2 Apache Pulsar development essentials

第 2 部分　Apache Pulsar 开发要义

4 Pulsar functions

4　Pulsar functions

4.1 Stream processing

4.1　流式处理

Traditional batching

传统批处理

Micro-batching

微批处理

Stream native processing

流式原生处理

4.2 What is Pulsar Functions?

4.2　什么是 Pulsar Functions？

Programming model

编程模型

4.3 Developing Pulsar functions

4.3　开发 Pulsar functions

Language native functions

语言原生函数

The Pulsar SDK

Pulsar SDK

Stateful functions

有状态函数

4.4 Testing Pulsar functions

4.4　测试 Pulsar functions

Unit testing

单元测试

Integration testing

集成测试

4.5 Deploying Pulsar functions

4.5　部署 Pulsar functions

Generating a deployment artifact

生成部署制品

Function configuration

函数配置

Function deployment

函数部署

The function deployment life cycle

函数部署生命周期

Deployment modes

部署模式

Pulsar function data flow

Pulsar function 的数据流

5 Pulsar IO connectors

5　Pulsar IO 连接器

5.1 What are Pulsar IO connectors?

5.1　什么是 Pulsar IO 连接器？

Sink connectors

Sink 连接器

Source connectors

Source 连接器

PushSource connectors

PushSource 连接器

5.2 Developing Pulsar IO connectors

5.2　开发 Pulsar IO 连接器

Developing a sink connector

开发一个 sink 连接器

Developing a PushSource connector

开发一个 PushSource 连接器

5.3 Testing Pulsar IO connectors

5.3　测试 Pulsar IO 连接器

Unit testing

单元测试

Integration testing

集成测试

Packaging Pulsar IO connectors

打包 Pulsar IO 连接器

5.4 Deploying Pulsar IO connectors

5.4　部署 Pulsar IO 连接器

Creating and deleting connectors

创建与删除连接器

Debugging deployed connectors

调试已部署的连接器

5.5 Pulsar’s built-in connectors

5.5　Pulsar 的内置连接器

Launching the MongoDB cluster

启动 MongoDB 集群

Link the Pulsar and MongoDB containers

把 Pulsar 与 MongoDB 容器连接起来

Configure and create the MongoDB sink

配置并创建 MongoDB sink

5.6 Administering Pulsar IO connectors

5.6　管理 Pulsar IO 连接器

Listing connectors

列出连接器

Monitoring connectors

监控连接器

6 Pulsar security

6　Pulsar 安全

6.1 Transport encryption

6.1　传输加密

6.2 Authentication

6.2　认证

TLS authentication

TLS 认证

JSON Web Token authentication

JSON Web Token 认证

6.3 Authorization

6.3　授权

Roles

角色

An example scenario

一个示例场景

6.4 Message encryption

6.4　消息加密

7 Schema registry

7　Schema registry

7.1 Microservice communication

7.1　微服务通信

Microservice APIs

微服务 API

The need for a schema registry

对 schema registry 的需求

7.2 The Pulsar schema registry

7.2　Pulsar 的 schema registry

Architecture

架构

Schema versioning

schema 版本化

Schema compatibility

schema 兼容性

Schema compatibility check strategies

schema 兼容性检查策略

7.3 Using the schema registry

7.3　使用 schema registry

Modelling the food order event in Avro

用 Avro 为餐品订单事件建模

Producing food order events

生产餐品订单事件

Consuming the food order events

消费餐品订单事件

Complete example

完整示例

7.4 Evolving the schema

7.4　演进 schema

Part 3 Hands-on application development with Apache Pulsar

第 3 部分　用 Apache Pulsar 动手开发应用

8 Pulsar Functions patterns

8　Pulsar Functions 模式

8.1 Data pipelines

8.1　数据流水线

Procedural programming

过程式编程

DataFlow programming

DataFlow 编程

8.2 Message routing patterns

8.2　消息路由模式

Splitter

拆分器

Dynamic router

动态路由

Content-based router

基于内容的路由

8.3 Message transformation patterns

8.3　消息转换模式

Message translator

消息翻译器

Content enricher

内容增强器

Content filter

内容过滤器

9 Resiliency patterns

9　韧性模式

9.1 Pulsar Functions resiliency

9.1　Pulsar Functions 的韧性

Adverse events

不利事件

Fault detection

故障检测

9.2 Resiliency design patterns

9.2　韧性设计模式

Retry pattern

重试模式

Circuit breaker

熔断器

Rate limiter

限流器

Time limiter

超时限制器

Cache

缓存

Fallback pattern

回退模式

Credential refresh pattern

凭据刷新模式

9.3 Multiple layers of resiliency

9.3　多层韧性

10 Data access

10　数据访问

10.1 Data sources

10.1　数据源

10.2 Data access use cases

10.2　数据访问用例

Device validation

设备校验

Driver location data

司机位置数据

11 Machine learning in Pulsar

11　Pulsar 中的机器学习

11.1 Deploying ML models

11.1　部署 ML 模型

Batch processing

批处理

Near real-time

近乎实时

11.2 Near real-time model deployment

11.2　近乎实时的模型部署

11.3 Feature vectors

11.3　特征向量

Feature stores

特征存储

Feature calculation

特征计算

11.4 Delivery time estimation

11.4　送达时间预估

ML model export

ML 模型导出

Feature vector mapping

特征向量映射

Model deployment

模型部署

11.5 Neural nets

11.5　神经网络

Neural net training

神经网络训练

Neural net deployment in Java

在 Java 中部署神经网络

12 Edge analytics

12　边缘分析

12.1 IIoT architecture

12.1　IIoT 架构

The perception and reaction layer

感知与反应层

The transportation layer

传输层

The data processing layer

数据处理层

12.2 A Pulsar-based processing layer

12.2　基于 Pulsar 的处理层

12.3 Edge analytics

12.3　边缘分析

Telemetric data

遥测数据

Univariate and multivariate

单变量与多变量

12.4 Univariate analysis

12.4　单变量分析

Noise reduction

降噪

Statistical analysis

统计分析

Approximation

近似计算

12.5 Multivariate analysis

12.5　多变量分析

Creating a bidirectional messaging mesh

创建双向消息网格

Multivariate dataset construction

多变量数据集的构造

12.6 Beyond the book

12.6　书之外

appendix A Running Pulsar on Kubernetes

附录 A　在 Kubernetes 上运行 Pulsar

appendix B Geo-replication

附录 B　异地复制

index

索引

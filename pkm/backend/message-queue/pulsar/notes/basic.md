---
title: basic
tags:
  - note
date: 2026-10-08
comment:
---
# 基础概念

## 云原生

1. DevOps：DevOps 是一种**工作方式**，而不是一个软件，云原生是支撑这种工作方式的技术底座。DevOps = Development（开发）+ Operations（运维）。
2. 持续交付：让软件随时处于“可以发布”的状态，发布这件事从“大事件”变成“日常操作”。
3. 微服务
4. 容器化

## Apache  Pulsar  基本介绍

Apache Pulsar是一个云原生企业级的发布订阅(pub-sub)消息系统，最初由Yahoo开发，并于2016年底开源，现在是Apache软件基金会顶级开源项目。Pulsar在Yahoo的生产环境运行了三年多，助力Yahoo的主要应用，如Yahoo Mail、Yahoo Finance、Yahoo Sports、F1ickr、Gemini广告平台和Yahoo分布式键值存储系统Sherpa。

Apache Pulsar的功能与特性：
1. **多租户**模式
    1. 租户和命名空间(namespace)是Pulsar支持多租户的两个核心概念。
    2. 在租户级别，Pulsar为特定的租户预留合适的存储空间、应用授权与认证机制。
    3. 在命名空间级别，Pulsar有一系列的配置策略(policy),包括存储配额、流控、消息过期策略和命名空间之间的隔离策略。
2. 灵活的**消息系统**
    1. Pulsar做了**队列模型**和**流模型**的统一，在Topic级别只需保存一份数据，同一份数据可多次消费。以流式、队列等方式计算不同的订阅模型大大提升了灵活度。
    2. 同时pulsar通过事务采用Exactly-Once(精准一次)在进行消息传输过程中，可以确保数据不丢不重
3. 云原生架构
4. segmented Sreams(分片流)
5. 支持跨地域复制

## 参考资料

1. 黑马网课： https://www.bilibili.com/video/BV1CF411v7Dh

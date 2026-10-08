---
title: Summary
tags:
  - book
date: 2026-10-08
comment:
---
# Summary
- We discussed the different microservice communication styles and why Pulsar is a perfect fit for asynchronous publish/subscribe-based interservice communication.
  我们讨论了微服务的不同通信风格，以及为什么 Pulsar 非常适合基于发布/订阅的异步服务间通信。

- The Pulsar schema registry enables message producers and consumers to coordinate on the structure of the data at the topic level and enforces schema compatibility for message producers.
  Pulsar schema registry 让消息生产者和消费者能够在主题级别就数据结构达成一致，并对消息生产者强制执行 schema 兼容性。

- The Pulsar schema registry supports eight different compatibility strategies, including forward, backward, and full, and each of the compatibility checks are from the consumer’s perspective.
  Pulsar schema registry 支持八种不同的兼容性策略，其中包括 forward（向前）、backward（向后）和 full（完全），并且每一项兼容性检查都是从消费者的视角出发的。

- The Avro’s interface definition language (IDL) is a great way to model events consumed within Pulsar because it allows you to modularize your types and share them across services easily.
  Avro 的接口定义语言（IDL）是建模 Pulsar 中所消费事件的绝佳方式，因为它让你可以把类型模块化，并轻松地在各个服务之间共享它们。

- The Pulsar schema registry can be configured to enforce forward and/or backward schema compatibility for a Pulsar topic by ensuring that the connecting producer or consumer are using a schema that is compatible with all existing clients.
  Pulsar schema registry 可以被配置为对某个 Pulsar 主题强制实施向前和/或向后的 schema 兼容性——做法是确保正在连接的生产者或消费者所使用的 schema 与所有现有客户端都兼容。

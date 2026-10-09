---
title: 1 Introduction to Apache Pulsar
tags:
  - book
date: 2026-10-09
comment:
---
# 1 Introduction to Apache Pulsar

This chapter covers

- The evolution of the enterprise messaging system

  **企业消息系统的演进**

- A comparison of Apache Pulsar to existing enterprise messaging systems

  **Apache Pulsar 与现有企业消息系统的对比**

- How Pulsar's segment-centric storage differs from the partition-centric storage model used in Apache Kafka

  **Pulsar 以分片为中心的存储，与 Apache Kafka 以分区为中心的存储模型有何不同**

- Real-world use cases where Pulsar is used for stream processing, and why you should consider using Apache Pulsar

  **Pulsar 用于流处理的真实用例，以及你应该考虑使用 Apache Pulsar 的理由**

Developed by Yahoo! in 2013, Pulsar was first open sourced in 2016, and only 15 months after joining the Apache Software Foundation's incubation program, it graduated to top-level project status. Apache Pulsar was designed from the ground up to address the gaps in current open source messaging systems, such as multi-tenancy, geo-replication, and strong durability guarantees.

Pulsar 由 Yahoo! 于 2013 年开发，2016 年首次开源。在加入 Apache 软件基金会孵化计划仅 15 个月后，它就毕业成为顶级项目。Apache Pulsar 从设计之初就着眼于填补当前开源消息系统的空白，例如多租户、跨地域复制以及强持久性保证。

The Apache Pulsar site describes it as a distributed pub-sub messaging system that provides very low publish and end-to-end latency, guaranteed message delivery, zero data loss, and a serverless, lightweight computing framework for stream data processing. Apache Pulsar provides three key capabilities for processing large data sets:

Apache Pulsar 官网将其描述为一个分布式发布-订阅消息系统，具备极低的发布延迟与端到端延迟、有保证的消息投递、零数据丢失，并为流数据处理提供了一个无服务器的轻量级计算框架。Apache Pulsar 为处理大规模数据集提供三项关键能力：

- **Real-time messaging** —Enables geographically distributed applications and systems to communicate with one another in an asynchronous manner by exchanging messages. Pulsar's goal is to provide this capability to the broadest audience of clients via support for multiple programming languages and binary messaging protocols.

  **实时消息** —— 让地理上分散的应用与系统能够通过交换消息，以异步方式相互通信。Pulsar 的目标是通过支持多种编程语言与二进制消息协议，把这项能力提供给最广泛的客户端。

- **Real-time compute** —Provides the ability to perform user-defined computations on these messages inside of Pulsar itself and without the need for an external computational system to perform basic transformational operations, such as data enrichment, filtering, and aggregations.

  **实时计算** —— 能够在 Pulsar 内部对消息执行用户自定义的计算，无需借助外部计算系统即可完成数据补全、过滤、聚合等基础转换操作。

- **Scalable storage** —Pulsar's independent storage layer and support for tiered storage enable the retention of your message data for as long as you need. There is no physical limitation on the amount of data that can be retained and accessed by Pulsar.

  **可扩展存储** —— Pulsar 独立的存储层以及对分层存储的支持，让你可以按需要长期保留消息数据。Pulsar 能够保留和访问的数据量不存在物理上限。


## 子目录

- [1.1 Enterprise messaging systems](<1-introduction-to-apache-pulsar/1.1-enterprise-messaging-systems.md>)

  **1.1 企业消息系统**

- [1.2 Message consumption patterns](<1-introduction-to-apache-pulsar/1.2-message-consumption-patterns.md>)

  **1.2 消息消费模式**

- [1.3 The evolution of messaging systems](<1-introduction-to-apache-pulsar/1.3-the-evolution-of-messaging-systems.md>)

  **1.3 消息系统的演进**

- [1.4 Comparison to Apache Kafka](<1-introduction-to-apache-pulsar/1.4-comparison-to-apache-kafka.md>)

  **1.4 与 Apache Kafka 的对比**

- [1.5 Why do I need Pulsar?](<1-introduction-to-apache-pulsar/1.5-why-do-i-need-pulsar_.md>)

  **1.5 我为什么需要 Pulsar？**

- [1.6 Real-world use cases](<1-introduction-to-apache-pulsar/1.6-real-world-use-cases.md>)

  **1.6 真实世界用例**

- [Additional resources](<1-introduction-to-apache-pulsar/additional-resources.md>)

  **补充资源**

- [Summary](<1-introduction-to-apache-pulsar/summary.md>)

  **小结**
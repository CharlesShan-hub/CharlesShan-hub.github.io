---
title: 5 Pulsar IO connectors
tags:
  - book
date: 2026-10-08
comment:
---
# 5 Pulsar IO connectors

This chapter covers

- An introduction to the Pulsar IO framework

  Pulsar IO 框架简介

- Configuring, deploying, and monitoring Pulsar IO connectors

  配置、部署和监控 Pulsar IO 连接器

- Writing your own Pulsar IO connector in Java

  用 Java 编写你自己的 Pulsar IO 连接器

Messaging systems are much more useful when you can easily use them to move data into and out of other external systems, such as databases, local and distributed filesystems, or other messaging systems. Consider the scenario where you want to ingest log data from external sources, such as applications, platforms, and cloud-based services, and publish it to a search engine for analysis. This could easily be accomplished with a pair of Pulsar IO connectors; the first would be a Pulsar source that collects the application logs, and the second would be a Pulsar sink that writes the formatted records to Elasticsearch.

当消息系统能让你轻松地用它们把数据搬进和搬出其他外部系统（例如数据库、本地与分布式文件系统，或者其他消息系统）时，它们的用处就大得多了。考虑这样一个场景：你希望从应用、平台和云服务等外部来源摄取日志数据，并把它发布到一个搜索引擎用于分析。这可以很容易地用一对 Pulsar IO 连接器来完成；第一个是一个收集应用日志的 Pulsar source，第二个是一个把格式化后的记录写入 Elasticsearch 的 Pulsar sink。

Pulsar provides a collection of pre-built connectors that can be used to interact with external systems, such as Apache Cassandra, Elasticsearch, and HDFS, just to name a few. The Pulsar IO framework is also extensible, which allows you to develop your own connectors to support new or legacy systems as needed.

Pulsar 提供了一组预构建的连接器，可用于与外部系统交互，例如 Apache Cassandra、Elasticsearch 和 HDFS，此处仅举几例。Pulsar IO 框架还是可扩展的，这使你能够按需开发自己的连接器，以支撑新的或遗留的系统。


## 子目录

- [5.1 What are Pulsar IO connectors?](<5-pulsar-io-connectors/5.1-what-are-pulsar-io-connectors_.md>)

  5.1 什么是 Pulsar IO 连接器？

- [5.2 Developing Pulsar IO connectors](<5-pulsar-io-connectors/5.2-developing-pulsar-io-connectors.md>)

  5.2 开发 Pulsar IO 连接器

- [5.3 Testing Pulsar IO connectors](<5-pulsar-io-connectors/5.3-testing-pulsar-io-connectors.md>)

  5.3 测试 Pulsar IO 连接器

- [5.4 Deploying Pulsar IO connectors](<5-pulsar-io-connectors/5.4-deploying-pulsar-io-connectors.md>)

  5.4 部署 Pulsar IO 连接器

- [5.5 Pulsar’s built-in connectors](<5-pulsar-io-connectors/5.5-pulsar’s-built-in-connectors.md>)

  5.5 Pulsar 的内置连接器

- [5.6 Administering Pulsar IO connectors](<5-pulsar-io-connectors/5.6-administering-pulsar-io-connectors.md>)

  5.6 管理 Pulsar IO 连接器

- [Summary](<5-pulsar-io-connectors/summary.md>)

  小结

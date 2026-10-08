---
title: Part 2  Apache  Pulsar  development  essentials
tags:
  - book
date: 2026-10-08
comment:
---
# Part 2  Apache  Pulsar  development  essentials

Part 2 focuses on Pulsar’s built-in serverless computing framework, known as Pulsar Functions, and how it can be used to provide stream processing capabilities without requiring an additional computational framework, such as Apache Flink or Kafka Streams. This type of serverless stream processing is also referred to as *stream-native processing*  and has a broad range of applications—from real-time ETL and event-driven programming to microservices development and real-time machine learning.

第 2 部分聚焦于 Pulsar 内置的无服务器计算框架（即 Pulsar Functions），以及它如何能被用来提供流式处理能力，而无需额外引入一个计算框架，例如 Apache Flink 或 Kafka Streams。这类无服务器流式处理也被称为*流式原生处理*（stream-native processing），它有着广泛的应用——从实时 ETL 和事件驱动编程，一直到微服务开发和实时机器学习。

After covering the basics of the Pulsar Functions framework, I spend a good amount of time focusing on how to properly secure your Pulsar cluster to ensure that all your data is kept safely away from prying eyes. Lastly, I wrap up the section with an introduction to Pulsar’s schema registry, which helps you retain information about the structure of the messages being held inside your Pulsar topics in a central location.

在讲完 Pulsar Functions 框架的基础知识之后，我花了相当的篇幅聚焦于如何妥善地保护你的 Pulsar 集群，以确保你的全部数据都被安全地隔离在窥探的目光之外。最后，我以对 Pulsar 的 schema registry 的介绍来收束这一部分——它帮助你在一個中心位置留存关于 Pulsar 各个主题中所存放消息之结构的信息。

Chapter 4 introduces Pulsar’s stream-native computing framework, called Pulsar Functions, provides some background on its design and configuration, and shows you how to develop, test, and deploy the individual functions. Chapter 5 introduces Pulsar’s connector framework, which is designed to move between Apache Pulsar and external storage systems, such as relational databases, key-value stores, or blob storage. It teaches you how to develop a connector in a step-by-step fashion.

第 4 章介绍 Pulsar 的流式原生计算框架 Pulsar Functions，提供关于其设计与配置的一些背景，并告诉你如何开发、测试和部署各个单独的函数。第 5 章介绍 Pulsar 的连接器框架，它被设计用来在 Apache Pulsar 与外部存储系统之间搬运数据，例如关系数据库、键值存储或对象存储。它一步步地教你如何开发一个连接器。

In chapter 6, I provide step-by-step instructions on how to secure your Pulsar cluster to ensure that your data is safe while it is in transit and at rest. Finally, chapter 7 covers Pulsar’s built-in schema registry, why it is necessary, and how it can help simplify microservice development. We also cover the schema evolution process and how to update the schemas used inside your Pulsar functions.

在第 6 章中，我逐步给出说明，讲述如何保护你的 Pulsar 集群，以确保你的数据在传输过程中和在静态存储时都是安全的。最后，第 7 章讲述 Pulsar 内置的 schema registry、它为何必要，以及它如何帮助简化微服务开发。我们还涵盖 schema 演进的过程，以及如何更新你的 Pulsar 函数内部所使用的那些 schema。

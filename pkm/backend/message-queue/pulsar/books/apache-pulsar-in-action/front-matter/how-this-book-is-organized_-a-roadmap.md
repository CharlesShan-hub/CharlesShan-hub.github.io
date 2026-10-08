---
title: "How this book is organized: A roadmap"
tags:
  - book
date: 2026-10-08
comment:
---
# How this book is organized: A roadmap
This book consists of 12 chapters that are spread across three different parts. Part 1 starts with a basic introduction to Apache Pulsar and where it fits in the 40-year evolution of messaging systems by comparing it to and contrasting it with the various messaging platforms that have come before it:

本书由 12 章构成，分布在三个不同的部分之中。第 1 部分以对 Apache Pulsar 的基础介绍开篇，并通过把它与之前出现过的各种消息平台做比较与对照，说明它在消息系统 40 年演进中的位置：

- Chapter 1 provides a historical perspective on messaging systems and where Apache Pulsar fits into the 40-year evolution of messaging technology. It also previews some of Pulsar’s architectural advantages over other systems and why you should consider using it as your single messaging platform of choice.
  第 1 章提供一个关于消息系统的历史视角，以及 Apache Pulsar 在消息技术 40 年演进中的位置。它还预先展示了 Pulsar 相对于其他系统的一些架构优势，以及你为何应当考虑把它作为自己唯一选定的消息平台。

- Chapter 2 covers the details of Pulsar’s multi-tiered architecture, which allows you to dynamically scale up the storage or serving layers independently. It also describes some of the common message consumption patterns, how they are different from one another, and how Pulsar supports them all.
  第 2 章讲述 Pulsar 多层架构的细节，该架构让你可以独立地动态扩展存储层或服务层。它还描述了若干常见的消息消费模式、它们之间的区别，以及 Pulsar 是如何支持它们全部的。

- Chapter 3 demonstrates how to interact with Apache Pulsar from both the command line as well as by using its programming API. After completing this chapter, you should be comfortable running a local instance of Apache Pulsar and interacting with it.
  第 3 章演示如何既从命令行、又通过使用其编程 API 来与 Apache Pulsar 交互。学完本章后，你应当能够自如地运行一个本地的 Apache Pulsar 实例并与之交互。

Part 2 covers some of the more basic usage and features of Pulsar, including how to perform basic messaging and how to secure your Pulsar cluster, along with more advanced features such as the schema registry. It also introduces the Pulsar Functions framework, including how to build, deploy, and test functions:

第 2 部分涵盖 Pulsar 的一些更基础的用法与特性，包括如何执行基本的消息收发、如何保护你的 Pulsar 集群，以及诸如 schema registry 这样更高级的特性。它还介绍了 Pulsar Functions 框架，包括如何构建、部署和测试各个函数：

- Chapter 4 introduces Pulsar’s stream native computing framework called Pulsar Functions, provides some background on its design and configuration, and show you how to develop, test, and deploy functions.
  第 4 章介绍 Pulsar 的流式原生计算框架 Pulsar Functions，提供关于其设计与配置的一些背景，并告诉你如何开发、测试和部署各个函数。

- Chapter 5 introduces Pulsar’s connector framework that is designed to move between Apache Pulsar and external storage systems, such as relational databases, key-value stores, and blob storage such as S3. It teaches you how to develop a connector in a step-by-step fashion.
  第 5 章介绍 Pulsar 的连接器框架，该框架被设计用来在 Apache Pulsar 与外部存储系统之间搬运数据，例如关系数据库、键值存储，以及诸如 S3 这样的对象存储。它一步步地教你如何开发一个连接器。

- Chapter 6 provides step-by-step details on how to secure your Pulsar cluster to ensure that your data is secured while it is in transit and while it is at rest.
  第 6 章逐步给出细节，说明如何保护你的 Pulsar 集群，以确保你的数据在传输过程中和在静态存储时都是安全的。

- Chapter 7 covers Pulsar’s built-in schema registry, why it is necessary, and how it can help simplify microservice development. We also cover the schema evolution process and how to update the schemas used inside your Pulsar Functions.
  第 7 章讲述 Pulsar 内置的 schema registry、它为何必要，以及它如何帮助简化微服务开发。我们还涵盖了 schema 演进的过程，以及如何更新你的 Pulsar Functions 内部所使用的那些 schema。

Part 3 focuses on the use of Pulsar Functions to implement microservices and demonstrates how to implement various common microservice design patterns within Pulsar Functions. This section focuses on the development of a food delivery application to make the examples more realistic and addresses more-complex use cases including resiliency, data access, and how to use Pulsar Functions to deploy machine learning models that can run against real-time data:

第 3 部分聚焦于用 Pulsar Functions 来实现微服务，并演示如何在 Pulsar Functions 中实现各种常见的微服务设计模式。这一部分聚焦于一个外卖应用的开发，以使示例更加真实，并处理更复杂的用例，包括韧性、数据访问，以及如何用 Pulsar Functions 部署那些能够针对实时数据运行的机器学习模型：

- Chapter 8 demonstrates how to implement common messaging routing patterns such as message splitting, content-based routing, and filtering. It also shows how to implement various message transformation patterns such as value extraction and message translation.
  第 8 章演示如何实现常见的消息路由模式，例如消息拆分、基于内容的路由和过滤。它还展示了如何实现各种消息转换模式，例如值提取和消息翻译。

- Chapter 9 stresses the importance of having resiliency built into your microservices and demonstrates how to implement this inside your Java-based Pulsar Functions with the help of the resiliency4j library. It covers various events that can occur in an event-based program and the different patterns you can use to insulate your services from these failure scenarios to maximize your application uptime.
  第 9 章强调在你的微服务中内建韧性的重要性，并演示如何借助 resiliency4j 库、在你基于 Java 的 Pulsar Functions 中实现这一点。它涵盖了一个基于事件的程序中可能发生的各种事件，以及你可以用来把自己的服务与这些故障场景隔离开来、以最大化应用可用时长的不同模式。

- Chapter 10 focuses on how you can access data from a variety of external systems from inside your Pulsar functions. It demonstrates various ways of acquiring information within your microservices and considerations you should take into account in terms of latency.
  第 10 章聚焦于你如何从自己的 Pulsar 函数内部访问来自各种外部系统的数据。它演示了在你的微服务内部获取信息的各种方式，以及你在延迟方面应当纳入考量的因素。

- Chapter 11 walks you through the process of deploying different machine learning model types inside of a Pulsar function using various ML frameworks. It also covers the very important topic of how to feed the necessary information into the model to get an accurate prediction
  第 11 章带你走完在一个 Pulsar 函数内部、使用各种 ML 框架部署不同类型的机器学习模型的全过程。它还涵盖了一个非常重要的主题：如何把必要的信息喂给模型，以获得准确的预测。

- Chapter 12 covers the use of Pulsar Functions within an edge computing environment to perform real-time analytics on IoT data. It starts with a detailed description of what an edge computing environment looks like and describes the various layers of the architecture before showing how to leverage Pulsar Functions to process the information on the edge and only forward summaries rather than the entire dataset.
  第 12 章讲述在一个边缘计算环境中使用 Pulsar Functions，对 IoT 数据执行实时分析。它先详细描述了一个边缘计算环境是什么样的、并描述了该架构的各级层次，然后展示如何利用 Pulsar Functions 在边缘侧处理信息，并且只向上转发汇总结果、而不是整个数据集。

Finally, two appendices demonstrate more advanced operational scenarios including deployment within a Kubernetes environment and geo-replication:

最后，两个附录演示了更高级的运维场景，包括在 Kubernetes 环境中的部署以及异地复制：

- Appendix A walks you through the steps necessary to deploy Pulsar into a Kubernetes environment using the Helm charts that are provided as part of the open source project. It also covers how to modify these charts to suit your environment.
  附录 A 带你走完把 Pulsar 部署到一个 Kubernetes 环境中所需的各个步骤，使用的是作为开源项目一部分而提供的那些 Helm chart。它还涵盖了如何修改这些 chart 以适配你的环境。

- Appendix B describes Pulsar’s built-in geo-replication mechanism and some of the common replication patterns that are used in production today. It then walks you through the process of implementing one of these geo-replication patterns in Pulsar.
  附录 B 描述 Pulsar 内置的异地复制机制，以及当今生产环境中所用的一些常见复制模式。随后，它带你走完在 Pulsar 中实现其中一种异地复制模式的全过程。

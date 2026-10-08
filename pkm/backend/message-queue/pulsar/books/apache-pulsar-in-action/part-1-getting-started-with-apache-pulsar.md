---
title: Part 1 Getting started with Apache Pulsar
tags:
  - book
date: 2026-10-08
comment:
---
# Part 1 Getting started with Apache Pulsar

Enterprise messaging systems (EMS) are designed to promote loosely coupled architectures that allow geographically distributed systems to communicate with one another by exchanging messages via a simple API that supports two basic operations: publish a message and subscribe to a topic (read messages). Over the course of their 40+ year history, enterprise messaging systems have given rise to several important distributed software architectural styles, including

企业消息系统（EMS）被设计用来促成松耦合的架构，使地理上分散的各个系统能够通过一个简单的 API 相互通信——该 API 支持两个基本操作：发布一条消息，以及订阅一个主题（读取消息）。在其 40 多年的历史进程中，企业消息系统催生了若干重要的分布式软件架构风格，其中包括

- Remote-procedure-call (RPC) programming, using technologies such as COBRA and Amazon Web Services, which enables programs developed in different languages to directly interact with one another.
  远程过程调用（RPC）编程，使用诸如 COBRA 和 Amazon Web Services 这样的技术，它让用不同语言开发出来的程序能够直接相互交互。

- Messaging-oriented middleware (MOM) programming for enterprise application integration, as exemplified by Apache Camel, which allows different systems to exchange information using a common message format using XML or a similar self-describing format.
  面向消息的中间件（MOM）编程，用于企业应用集成，其代表是 Apache Camel——它让不同系统能够使用一种通用的消息格式（XML 或类似的自描述格式）来交换信息。

- Service-oriented-architecture (SOA), which promotes a modular programming-by-contract style that allowed applications to be composed of services that were combined in a specific way to perform the necessary business logic.
  面向服务的架构（SOA），它倡导一种模块化的"按契约编程"风格，使应用得以由若干服务组合而成，而这些服务以特定方式被组合起来，以执行必需的业务逻辑。

- Event-driven-architecture (EDA), which promotes the production and detection of and reaction to individual changes in state, referred to as events, and writing code that detects and reacts to these individual events. This style was adopted in part to address the need to process continuous streams of internet-scale data, such as server logs and digital events like clickstreams.
  事件驱动架构（EDA），它倡导对各个独立的状态变化（即所谓事件）进行生产、检测与响应，并编写检测这些独立事件、对其做出响应的代码。这种风格之所以被采用，部分是为了满足处理持续的互联网规模数据流的需要，例如服务器日志，以及诸如点击流这样的数字事件。

The EMS plays a key role in each of these architectural styles, as it serves as the underlying technology that allows these distributed components to communicate with one another by storing the intermediate messages and distributing to all the intended consumers in a timely manner. The key differentiator between communication via an EMS and some other network-only-based communication mechanisms is that an EMS is designed to guarantee message delivery. If an event is published to an EMS, it will be stored and forwarded to all the intended recipients, as opposed to a HTTP-based inter-microservices call that can be lost in the event of a network failure.

EMS 在这些架构风格中的每一种里都扮演着关键角色，因为它是让这些分布式组件得以相互通信的底层技术——它把中间消息存储下来，并及时分发给所有预期的消费者。通过 EMS 通信与某些其他纯基于网络的通信机制之间的关键区别，在于 EMS 是被设计来保证消息投递的。如果一个事件被发布到 EMS，它就会被存储下来并转发给所有预期的接收方；而这与基于 HTTP 的微服务间调用正好相反——后者在网络发生故障时是可能丢失的。

These retained messages on an EMS have also proven to be valuable sources of information for organizations, which they can analyze to extract more business value. Consider the treasure trove of information on customer behavior that a company’s click stream provides them. Processing these types of data sources is referred to as *stream processing* because you are literally processing an unbounded stream of data. This is why there is great interest in processing these streams with analytical tools, such as Apache Flink or Spark.

这些留存在 EMS 上的消息，也已被证明是各组织宝贵的信息来源——他们可以对其加以分析，以提炼出更多的业务价值。想想看：一家公司的点击流能为他们提供关于客户行为的信息宝库。处理这类数据源被称为*流式处理*（stream processing），因为你实际上就是在处理一条无界的数据流。这正是人们为何对用 Apache Flink 或 Spark 这类分析工具来处理这些数据流抱有浓厚兴趣的原因。

The first part of this book provides an evolutionary overview of the EMS with a focus on the core capabilities that were added at each evolutionary step. Having this background will help you better understand how various messaging systems compare with one another by knowing each generation’s strengths and weaknesses and the capabilities the next generation added along the way. At the end, I hope you understand why Apache Pulsar is an evolutionary step forward in the EMS lineage and worthy of your consideration as a critical piece of your company’s infrastructure.

本书的第 1 部分提供一份关于 EMS 的演进概览，重点关注在每一个演进步骤上被加入的那些核心能力。有了这个背景，你就能通过了解每一代系统的长处与短板、以及下一代沿途增添了哪些能力，更好地理解各种消息系统之间是如何相互比较的。在最后，我希望你能理解：为什么 Apache Pulsar 是 EMS 谱系中向前迈进的演化一步，并值得你把它当作公司基础设施中的关键一环来加以考虑。

Chapter 1 provides a basic introduction to Apache Pulsar and where it fits in the 40-year evolution of messaging systems by comparing it to and contrasting it with the various messaging platforms that have come before it. Next, chapter 2 dives into the details of Pulsar’s physical architecture and how its multitiered architecture allows its storage and computing layers to scale independently of one another. It also describes some of the common message consumption patterns, how they are different from one another, and how Pulsar supports them all. Finally, chapter 3 demonstrates how to interact with Apache Pulsar from both the command line as well as by using its programming API. After completing this chapter, you should be comfortable running a local instance of Apache Pulsar and interacting with it.

第 1 章提供对 Apache Pulsar 的基础介绍，并通过把它与之前出现过的各种消息平台做比较与对照，说明它在消息系统 40 年演进中的位置。接着，第 2 章深入讲述 Pulsar 物理架构的细节，以及它的多层架构如何让存储层与计算层能够彼此独立地扩展。它还描述了若干常见的消息消费模式、它们之间的区别，以及 Pulsar 是如何支持它们全部的。最后，第 3 章演示如何既从命令行、又通过使用其编程 API 来与 Apache Pulsar 交互。学完本章后，你应当能够自如地运行一个本地的 Apache Pulsar 实例并与之交互。

---
title: Summary
tags:
  - book
date: 2026-10-08
comment:
---
# Summary
- The Pulsar Functions framework is a distributed processing framework that is well suited for Dataflow programming, where the data is processed in stages that can be executed in parallel like an assembly line.
  Pulsar Functions 框架是一个分布式处理框架，非常适合数据流编程——在这种编程方式下，数据被分阶段处理，而这些阶段可以像装配线一样并行执行。

- Applications based on Pulsar Functions can be modelled as data pipelines, where the functions perform the computations and direct data, using the input/out topics.
  基于 Pulsar Functions 的应用可以被建模为数据流水线：各个函数执行计算，并借助输入/输出主题来引导数据的流向。

- When designing your message-passing microservice application, it is often to use existing design patterns, such as those found in Gregor Hohpe and Bobby Woolf’s book *Enterprise Integration Patterns* and other sources.
  在设计基于消息传递的微服务应用时，通常应当复用现有的设计模式，例如 Gregor Hohpe 与 Bobby Woolf 所著《Enterprise Integration Patterns》以及其他来源中所收录的那些模式。

- Well-established messaging patterns can be implemented using Pulsar Functions, which allows you to use time-tested solutions inside your applications.
  那些成熟的消息传递模式都可以用 Pulsar Functions 来实现，这让你能够在自己的应用中采用久经考验的解决方案。

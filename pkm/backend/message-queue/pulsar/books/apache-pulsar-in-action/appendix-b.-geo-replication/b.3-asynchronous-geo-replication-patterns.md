---
title: B.3 Asynchronous geo-replication patterns
tags:
  - book
date: 2026-10-08
comment:
---
## B.3 Asynchronous geo-replication patterns

With asynchronous replication, Pulsar provides tenants a great degree of flexibility for customizing their replication strategy. That means that an application is able to set up active-active and full-mesh replication, active-standby replication, and aggregation replication across multiple data centers. Let’s take a quick look at how to implement each of these patterns inside of Pulsar.

借助异步复制，Pulsar 为各个租户提供了极大的灵活性，来定制它们自己的复制策略。这意味着一个应用能够跨多个数据中心建立起双活（active-active）与全网状（full-mesh）复制、主备（active-standby）复制，以及聚合（aggregation）复制。让我们快速看一下如何在 Pulsar 内部实现这些模式中的每一种。


## 子目录

- [B.3.1 Multi-active geo-replication](<b.3-asynchronous-geo-replication-patterns/b.3.1-multi-active-geo-replication.md>)
- [B.3.2 Active-standby geo-replication](<b.3-asynchronous-geo-replication-patterns/b.3.2-active-standby-geo-replication.md>)
- [B.3.3 Aggregation geo-replication](<b.3-asynchronous-geo-replication-patterns/b.3.3-aggregation-geo-replication.md>)

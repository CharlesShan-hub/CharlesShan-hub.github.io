---
title: Summary
tags:
  - book
date: 2026-10-08
comment:
---
## Summary

- Pulsar’s internal state store provides a convenient location for storing infrequently accessed data without having to rely on an external system.
  Pulsar 的内部状态存储提供了一个便捷的去处，用来存放那些不常被访问的数据，而不必依赖某个外部系统。

- You can access a variety of external data sources from inside Pulsar functions, including in-memory data grids, disk-backed caches, relational databases, and many others.
  你可以从 Pulsar 函数内部访问各种各样的外部数据源，其中包括内存数据网格、磁盘支撑型缓存、关系数据库，以及许多其他类型。

- Consider the latency and data storage capabilities when determining the data storage system you want use. Lower-latency systems are typically better for stream processing systems.
  在决定要采用哪种数据存储系统时，要考量其延迟与数据存储能力。对流式处理系统而言，延迟更低的系统通常更合适。

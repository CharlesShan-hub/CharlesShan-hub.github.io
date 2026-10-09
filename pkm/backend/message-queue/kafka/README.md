---
title: README
tags:
  - catalog
date: 2026-10-09
comment:
---
# Kafka

分布式流处理平台，高吞吐、可持久化、分区模型。

## 书籍

- 《Kafka 实战》：Confluent 联合创始人推荐，基于 Kafka 3.1，上手最快
- 《深入理解 Kafka：核心设计与实践原理》：实战与原理结合最好，Java 示例，讲透再均衡、事务
- 《Kafka 权威指南（第2版）》：Kafka PMC 成员编写，偏原理架构，适合深入理解设计
- 《Event Driven Architecture with Spring Boot 4.x and Kafka 4.x》（2026）：最新，基于 Kafka 4.x KRaft 模式 + Spring Boot 4

## 在线教程

- 《跟老卫学 Apache Kafka 开发》：开源教程，覆盖 Kafka 4.x，含 KRaft 模式，图文并茂，适合当字典
- Apache Kafka 官方 Get Started：最权威的入门，快速跑通 Pub/Sub

## 视频

- 马士兵《Kafka 4.X 实战与原理》：49 节，含 Kafka 4.x 安装和 KRaft 原理

## 核心概念速查

- Broker：一个 Kafka 服务进程
- Topic：消息的逻辑分类
- Partition：Topic 的切分单位，分区内有序，只能增不能减
- Replica：分区副本，默认 3 副本，Leader 读写，Follower 同步
- Consumer Group：消费者组，一个分区组内只能被一个消费者消费

## 与 Pulsar 的关键差异

- 存储：Kafka 分区绑定 Broker 本地磁盘；Pulsar 存算分离，数据在 BookKeeper
- 扩容：Kafka 加分区需 Rebalance、搬数据；Pulsar 加节点即生效，不搬数据
- 切分单位：Kafka Partition（固定数量）；Pulsar Segment（可无限创建）
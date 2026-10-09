---
title:
tags:
  - catalog
date: 2026-10-09
comment:
---

# RocketMQ

阿里开源，后捐给 Apache。金融级可靠，经受过双十一考验，国内业务消息场景的首选之一。

## 书籍

- 《Apache RocketMQ 进阶之路》：Apache RocketMQ Committer 林俊杰编写，2024 年出版。近百张手绘图，抛弃枯燥源码解析，通过与 Kafka/RabbitMQ 对比来讲解，入门到架构师都适合 [citation:1][citation:9]
- 《RocketMQ 消息中间件实战派》：2024 年出版，分基础/进阶两篇，篇幅较大（800+ 页），覆盖通信渠道、消息路由、存储、治理等 [citation:5]

## 在线教程

- Apache RocketMQ 官方文档：最权威，含快速开始、架构解析、消息发送示例 [citation:2]
- RocketMQ 官方中文社区（rocketmq-learning.com）：提供架构原理、存储设计、高可用机制等深度文章 [citation:6]

## 视频

- 马士兵《RocketMQ 基础运用 + 源码分析》：基于 RocketMQ 5，含 NameServer、Broker、存储核心、主从同步、消息消费等源码分析 [citation:3]
- 慕课网《RocketMQ 核心技术精讲与高并发抗压实战》：18 小时，含生产者/消费者核心、主从同步、Netty 通信、延迟投递等 [citation:15]

## 核心概念速查

- NameServer：轻量级服务发现和路由，节点间独立，无信息交互 [citation:4]
- Broker：消息存储和转发，单机可支撑上万队列，支持 Push/Pull 模型 [citation:4][citation:20]
- Producer：生产者，支持同步/异步/单向发送 [citation:2]
- Consumer：消费者，支持集群消费和广播消费 [citation:20]
- Topic + MessageQueue：Topic 的逻辑分片，Queue 是物理管理单位，分布在不同的 Broker 上 [citation:12]
- Tag：消息的二级分类，消费端可过滤 [citation:20]

## 与 Pulsar 的关键差异

- 架构：RocketMQ 5.0 引入 Proxy 层实现存算分离，但底层存储仍依赖 Broker 本地 CommitLog；Pulsar 数据在 BookKeeper，Broker 完全无状态 [citation:12]
- 服务发现：RocketMQ 用 NameServer（AP，节点独立）；Pulsar 用 ZooKeeper 或可插拔元数据存储
- 核心优势：RocketMQ 强在事务消息、顺序消息、金融级可靠性；Pulsar 强在存算分离、多租户、分段存储的弹性扩展
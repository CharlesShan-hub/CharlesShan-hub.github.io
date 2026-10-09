---
title: 任务调度
tags:
  - catalog
date: 2026-10-09
comment:
---
# 任务调度

- xxl-job：国产轻量级分布式任务调度平台，自带管理界面，Java 生态常用
- Quartz：老牌 Java 调度框架，功能全但偏重，需自己封装分布式能力
- Elastic-Job：当当开源的分布式调度方案，基于 ZooKeeper 协调，分片弹性好
- PowerJob：新一代分布式调度框架，支持工作流、可视化，功能比 xxl-job 更丰富
- Airflow：Python 生态，DAG 编排，数据管道场景常用
- DolphinScheduler：国产可视化工作流调度，大数据场景常用
- Cron：Linux 原生定时任务，单机够用，不涉及分布式

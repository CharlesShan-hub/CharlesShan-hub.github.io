---
title: 数据库
tags:
  - catalog
date: 2026-10-09
comment:
---
# Database

## 关系型数据库（RDBMS）

### 开源/商业国际主流
- MySQL：最流行的开源关系型数据库，Web 应用标配
- PostgreSQL：功能最强的开源关系型数据库，支持 JSON、GIS、全文检索
- SQLite：嵌入式文件数据库，零配置，适合本地/移动端
- Oracle：商业数据库，金融/电信核心系统常用，贵且重
- SQL Server：微软商业数据库，.NET 生态常用

### 国产信创（集中式）
- 达梦 DM：完全自研内核，Oracle 兼容性最强，党政/金融信创主力
- 人大金仓 KingbaseES：基于 PostgreSQL 内核深度定制，多生态兼容（Oracle/MySQL/PG），党政军领域深耕
- 南大通用 GBase：老四家之一，分析型（8a）和事务型（8s）都有布局
- 神通：老四家之一，航天/工业场景有应用
- 瀚高：基于 PostgreSQL，安全版通过国测认证

### 国产信创（分布式/云原生）
- OceanBase：蚂蚁自研，Paxos 强一致，金融级分布式，TPC-C 世界纪录保持者
- GaussDB：华为自研，鲲鹏+欧拉全栈国产化，电信/金融规模化应用
- TDSQL：腾讯云分布式，MySQL 协议兼容，金融行业服务超千家
- PolarDB：阿里云原生，存储计算分离，100% 兼容 MySQL/PG
- TiDB：PingCAP 开源分布式，MySQL 协议兼容，开发者社区活跃

## NoSQL 数据库
- Redis：内存 KV 数据库，缓存、分布式锁、消息队列都能干
- MongoDB：文档型数据库，JSON 存储，灵活 schema
- ElasticSearch：搜索引擎 + 分析引擎，全文检索、日志分析
- HBase：列式存储，海量数据随机读写，Hadoop 生态
- Cassandra：宽列存储，高可用、去中心化，写多读少场景
- Neo4j：图数据库，社交关系、知识图谱

## 时序数据库（TSDB）
- InfluxDB：时序数据专用，监控、IoT 常用
- Prometheus：监控指标存储，云原生生态标配
- TimescaleDB：基于 PostgreSQL 的时序扩展
- DolphinDB：国产时序数据库，已通过国测认证
- TimechoDB：国产时序数据库，已通过国测认证

## 向量数据库
- Milvus：国产开源向量数据库，AI 检索常用
- Pinecone：托管向量数据库，RAG 场景
- Qdrant：Rust 写的向量数据库，性能好
- Chroma：轻量级向量数据库，适合本地开发


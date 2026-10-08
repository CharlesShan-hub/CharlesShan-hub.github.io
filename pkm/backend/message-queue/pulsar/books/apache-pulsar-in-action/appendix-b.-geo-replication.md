# Appendix B. Geo-replication

*Geo-replication* is a common mechanism used to provide disaster recovery in multi-datacenter deployments. Unlike other pub-sub messaging systems that require additional processes to mirror messages between data centers, geo-replication is automatically performed by Pulsar brokers and can be enabled, disabled, or dynamically changed at runtime. Traditional geo-replication mechanisms typically fall into one of two categories: synchronous or asynchronous. Apache Pulsar comes with multi-datacenter replication as an integrated feature that supports both of these geo-replication strategies. In the following examples, I will assume that we are deploying our Pulsar instance across the three cloud provider regions: US-West, US-Central, and US-East.

*异地复制*（geo-replication）是一种常用机制，用于在多数据中心部署中提供灾难恢复能力。与那些需要额外进程来在数据中心之间镜像消息的其他发布-订阅消息系统不同，异地复制是由 Pulsar 的 broker 自动执行的，并且可以在运行时被启用、禁用或动态变更。传统的异地复制机制通常分为两类之一：同步的或异步的。Apache Pulsar 把多数据中心复制作为一项集成特性提供，同时支持这两种异地复制策略。在下面的示例中，我将假定我们正把自己的 Pulsar 实例部署在三个云厂商区域上：US-West、US-Central 和 US-East。


## 子目录

- [B.1 Synchronous geo-replication](<appendix-b.-geo-replication/b.1-synchronous-geo-replication.md>)
- [B.2 Asynchronous geo-replication](<appendix-b.-geo-replication/b.2-asynchronous-geo-replication.md>)
- [B.3 Asynchronous geo-replication patterns](<appendix-b.-geo-replication/b.3-asynchronous-geo-replication-patterns.md>)

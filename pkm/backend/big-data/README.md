# Big Data

大规模数据的分布式处理技术栈。

## 计算框架
- Hadoop：HDFS + YARN + MapReduce，大数据生态的起点
- Spark：内存计算，比 MapReduce 快，支持批处理和流处理
- Flink：真正的流处理引擎，低延迟，事件驱动

## 存储
- HDFS：分布式文件系统，大文件、多副本、一次写入多次读取
- HBase：列式数据库，海量数据随机读写，构建在 HDFS 之上
- Hive：数据仓库，用 SQL 查询 HDFS 上的数据

## 协调
- ZooKeeper：分布式协调服务，选主、配置管理、分布式锁

## 相关
- [[message queue]]：Kafka / Pulsar 常与大数据生态配合使用
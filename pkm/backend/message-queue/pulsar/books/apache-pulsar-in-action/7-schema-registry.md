# 7 Schema registry

This chapter covers

- Using the Pulsar schema to simplify your microservice development

- Understanding the different schema compatibility types

- Using the LocalRunner class to run and debug your functions inside your IDE

- Evolving a schema without impacting existing consumers

本章内容包括

- 使用 Pulsar schema 来简化微服务开发

- 理解不同的 schema 兼容性类型

- 使用 LocalRunner 类在自己的 IDE 中运行和调试函数

- 在不影响现有消费者的前提下演进 schema

Traditional databases employ a process referred to as schema-on-write, where the table’s columns, rows, and types are all defined before any data can be written into the table. This ensures that the data conforms to a predetermined specification and the consuming clients can access the schema information directly from the database itself, which enables them to determine the basic structure of the records they are processing.

传统数据库采用的是一种被称为“写时模式”（schema-on-write）的处理方式：在往表里写入任何数据之前，表的列、行和类型就都已经定义好了。这确保了数据符合一套预先定好的规范，而且消费方客户端可以直接从数据库本身获取 schema 信息，从而得以确定自己正在处理的那些记录的基本结构。

Apache Pulsar messages are stored as unstructured byte arrays, and the structure is applied to this data only when it’s read. This approach is referred to as schema-on-read and was first popularized by Hadoop and NoSQL databases. While the schema-on-read approach makes it easier to ingest and process new and dynamic data sources on the fly, it does have some drawbacks, including the lack of a metastore that clients can access to determine the schema for the Pulsar topic they are consuming from.

Apache Pulsar 的消息是以无结构的字节数组形式存储的，只有当数据被读取时，结构才被施加到这些数据上。这种方式被称为“读时模式”（schema-on-read），最早由 Hadoop 和 NoSQL 数据库推广开来。虽然读时模式让接入和处理全新且动态的数据源变得更加容易，但它确实也有一些缺点，其中包括缺少一个可供客户端访问的元数据存储——客户端无法借此确定自己正在消费的那个 Pulsar 主题所用的 schema。

Pulsar clients just see a stream of individual records that can be of any type and need an efficient way to determine how to interpret each arriving record. This is where the Pulsar schema registry comes into play. It is a critical component of the Pulsar technology stack that tracks the schema of all the topics inside of Pulsar.

Pulsar 客户端所看到的，只是一股由一条条独立记录组成的流，这些记录可以是任何类型，因此它们需要一种高效的方式来判断该如何解读每一条到达的记录。这正是 Pulsar schema registry（schema 注册表）发挥作用的地方。它是 Pulsar 技术栈中的一个关键组件，负责追踪 Pulsar 内部所有主题的 schema。

As we saw in the last chapter, the development team for the food delivery service company GottaEat has decided to embrace the microservice architectural style in which applications are comprised of a collection of loosely coupled, independently developed services. In such an architecture, different microservices will need to collaborate on the same data, and in order to do that, they will need to know the basic structure of the event, including the fields and their associated types. Otherwise, the event consumers will not be able to perform any meaningful calculations on the event data. In this chapter, I will demonstrate how Pulsar’s schema registry can be used to greatly simplify the sharing of this information across the application teams at GottaEat.

正如我们在上一章中所看到的，外卖服务公司 GottaEat 的开发团队决定采用微服务架构风格——在这种风格下，应用程序由一组松耦合、各自独立开发的服务构成。在这样的架构中，不同的微服务需要围绕同一份数据协同工作，而要做到这一点，它们就必须知道事件的基本结构，包括各个字段及其关联的类型。否则，事件消费方就无法对事件数据做任何有意义的计算。在本章中，我将演示 Pulsar 的 schema registry 如何能极大地简化这类信息在 GottaEat 各个应用团队之间的共享。


## 子目录

- [7.1 Microservice communication](<7-schema-registry/7.1-microservice-communication.md>)
- [7.2 The Pulsar schema registry](<7-schema-registry/7.2-the-pulsar-schema-registry.md>)
- [7.3 Using the schema registry](<7-schema-registry/7.3-using-the-schema-registry.md>)
- [7.4 Evolving the schema](<7-schema-registry/7.4-evolving-the-schema.md>)
- [Summary](<7-schema-registry/summary.md>)

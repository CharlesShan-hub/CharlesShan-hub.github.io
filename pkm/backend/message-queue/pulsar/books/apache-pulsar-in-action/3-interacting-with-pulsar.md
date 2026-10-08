---
title: 3 Interacting with Pulsar
tags:
  - book
date: 2026-10-08
comment:
---
# 3 Interacting with Pulsar

This chapter covers

- Running a local instance of Pulsar on your development machine

  在你的开发机上运行一个本地 Pulsar 实例

- Administering a Pulsar cluster using its command-line tools

  使用命令行工具管理 Pulsar 集群

- Interacting with Pulsar using the Java, Python, and Go client libraries

  使用 Java、Python 和 Go 客户端库与 Pulsar 交互

- Troubleshooting Pulsar with its command-line tools

  使用命令行工具排查 Pulsar 问题

Now that we have covered the overall architecture and terminology of Apache Pulsar, let’s start using it. For local development and testing, I recommend running Pulsar inside a Docker container on your own machine, which provides an easy way to get started with Pulsar with a minimal amount of time, effort, and money. For those of you who would prefer to use a full-size Pulsar cluster, you can refer to appendix A for more details on how to install and run one inside a containerized environment, such as Kubernetes. In this chapter, I will walk you through the process of sending and receiving messages programmatically using the Java API, starting with the process of creating a Pulsar namespace and topic using Pulsar’s administrative tools.

既然我们已经讲完了 Apache Pulsar 的整体架构与术语，那就开始使用它吧。就本地开发与测试而言，我推荐在你自己的机器上用 Docker 容器来运行 Pulsar，这提供了一种上手 Pulsar 的便捷方式，只需极少的时间、精力和金钱。对于那些更希望使用完整规模的 Pulsar 集群的读者，可以参考附录 A，了解如何在 Kubernetes 这类容器化环境中安装和运行一个集群。在本章中，我将带你走完使用 Java API 以编程方式收发消息的全过程，首先从使用 Pulsar 管理工具创建命名空间和主题开始。


## 子目录

- [3.1 Getting started with Pulsar](<3-interacting-with-pulsar/3.1-getting-started-with-pulsar.md>)

  3.1 Pulsar 上手

- [3.2 Administering Pulsar](<3-interacting-with-pulsar/3.2-administering-pulsar.md>)

  3.2 管理 Pulsar

- [3.3 Pulsar clients](<3-interacting-with-pulsar/3.3-pulsar-clients.md>)

  3.3 Pulsar 客户端

- [3.4 Advanced administration](<3-interacting-with-pulsar/3.4-advanced-administration.md>)

  3.4 高级管理

- [Summary](<3-interacting-with-pulsar/summary.md>)

  小结

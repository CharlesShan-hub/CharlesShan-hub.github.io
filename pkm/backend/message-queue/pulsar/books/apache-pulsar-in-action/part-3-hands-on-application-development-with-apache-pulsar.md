# Part 3 Hands-on application development with Apache Pulsar

In this part, we move beyond the theory and simplistic examples and dive into the use of Pulsar Functions as a development framework for microservices applications by walking through a much more realistic use case based on a fictional food delivery service called GottaEat. This section demonstrates how to implement common design patterns from both the enterprise integration world and the microservices world, highlighting the usage of various patterns, such as content-based routing and filtering, resiliency, and data access within a real-world scenario.

在这一部分中，我们超越理论与那些过于简化的示例，通过一个基于一家虚构外卖服务 GottaEat 的、逼真得多的用例，深入探讨如何把 Pulsar Functions 当作微服务应用的开发框架来使用。这一部分演示了如何实现来自企业集成领域和微服务领域的常见设计模式，并突出了各种模式在一个真实场景中的用法，例如基于内容的路由与过滤、韧性，以及数据访问。

Chapter 8 demonstrates how to implement common messaging routing patterns, such as message splitting, content-based routing, and filtering. It also shows how to implement various message transformation patterns, such as value extraction and message translation.

第 8 章演示如何实现常见的消息路由模式，例如消息拆分、基于内容的路由和过滤。它还展示了如何实现各种消息转换模式，例如值提取和消息翻译。

Chapter 9 stresses the importance of having resiliency built into your microservices and demonstrates how to implement this inside your Java-based Pulsar functions with the help of the resiliency4j library. It covers various scenarios that can occur in an event-based program and the patterns you can use to insulate your microservices from these failure scenarios to maximize your application uptime.

第 9 章强调在你的微服务中内建韧性的重要性，并演示如何借助 resiliency4j 库、在你基于 Java 的 Pulsar 函数中实现这一点。它涵盖了一个基于事件的程序中可能发生的各种场景，以及你可以用来把自己的微服务与这些故障场景隔离开来、以最大化应用可用时长的各种模式。

Chapter 10 focuses on how you can access data from a variety of external systems from inside your Pulsar functions. It demonstrates different methods of acquiring information within your microservices and considerations you should take in terms of latency.

第 10 章聚焦于你如何从自己的 Pulsar 函数内部访问来自各种外部系统的数据。它演示了在你的微服务内部获取信息的不同方法，以及你在延迟方面应当纳入考量的因素。

Chapter 11 walks you through the process of deploying different machine learning model types inside of a Pulsar function, using various ML frameworks. It also covers the very important aspect of how to feed the necessary information into the model to get an accurate prediction

第 11 章带你走完在一个 Pulsar 函数内部、使用各种 ML 框架部署不同类型的机器学习模型的全过程。它还涵盖了如何把必要的信息喂给模型、以获得准确预测这一非常重要的方面。

Finally, chapter 12 covers the use of Pulsar Functions within an edge computing environment to perform real-time analytics on IoT data. It starts with a detailed description of what an edge computing environment looks like and describes the various layers of the architecture before showing how to leverage Pulsar Functions to process the information on the edge and only forward summaries, rather than the entire dataset.

最后，第 12 章讲述在一个边缘计算环境中使用 Pulsar Functions，对 IoT 数据执行实时分析。它先详细描述了一个边缘计算环境是什么样的、并描述了该架构的各级层次，然后展示如何利用 Pulsar Functions 在边缘侧处理信息，并且只向上转发汇总结果、而不是整个数据集。

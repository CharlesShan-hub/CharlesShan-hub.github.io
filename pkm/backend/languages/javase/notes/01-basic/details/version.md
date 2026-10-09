---
title: Java版本
tags:
  - note
date: 2026-10-09
comment:
---
 
# Java 版本

## Java语言发展史

- LTS（长期支持）：Java 8、Java 11、Java 17、Java21、Java25
- Java 8、JDK 8、JDK 1.8 是同一个版本

Java语言的发展历程中的重要事件：

1. 1995年：Java语言诞生，由Sun Microsystems的James Gosling等人开发。
2. 1996年：发布Java 1.0版本。
3. 1998年：发布Java 2（也称为Java SE）版本，引入了重要的新特性，如Swing图形界面工具包、JavaBeans组件技术等。
4. 2004年：发布Java SE 5.0版本，引入了自动装箱/拆箱、泛型、枚举、注解等重要特性。
5. 2006年：Sun Microsystems发布Java SE 6版本，引入了更多的新特性，如JDBC 4.0、JAX-WS 2.0等。
6. 2010年：Oracle公司收购了Sun Microsystems，成为Java语言的主要维护者。
7. 2011年：发布Java SE 7版本，引入了重要的新特性，如Switch语句的字符串支持、NIO 2.0等。
8. 2014年：发布Java SE 8版本，引入了Lambda表达式、Stream API、新的日期/时间API等重要特性。
9. 2017年：发布Java SE 9版本，引入了模块化系统、REPL工具等新特性。
10. 2018年3月：发布Java SE 10版本，引入了局部变量类型推断、G1垃圾收集器等新特性。
11. 2018年9月：发布Java SE 11版本，成为长期支持版本，移除了一些过时的API，引入了新的HTTP Client API等新特性。
12. 2019年3月：发布Java SE 12版本，增加了Switch表达式、新的垃圾回收器Shenandoah等特性。
13. 2019年9月：发布Java SE 13版本，增加了文本块、改进的Switch表达式、动态CDS等特性。
14. 2020年3月：发布Java SE 14版本，增加了Switch表达式的模式匹配、Records、改进的垃圾回收器等特性。
15. 2020年9月：发布Java SE 15版本，增加了Sealed类、文本块、ZGC（Z Garbage Collector）等功能。
16. 2021年3月：发布Java SE 16版本，增加了Records、Pattern Matching for instanceof、Vector API等功能。
17. 2021年9月：发布Java SE 17版本，增加了Sealed类、Pattern Matching for switch、Records、Foreign Linker API等功能。
18. 2023 年 9 月：发布 JavaSE21 版本，这也是一个 LTS 版（Long-Term Support，长期支持版）
19. 2024年3月：发布JavaSE22版本，引入了未命名变量和模式、启动多文件源码程序，外部函数与内存API转正等特性。
20. 2024年9月：发布JavaSE23版本，引入了Markdown文档注释、ZGC默认启用分代模式等特性。
21. 2025年3月：发布JavaSE24版本，引入了Stream Gatherers、Class-File API正式版、抗量子加密（ML-KEM/ML-DSA）、虚拟线程在synchronized中不再固定等特性。
22. 2025年9月：发布JavaSE25版本，它也是一个LTS版本。引入了Scoped Values、模块导入声明、紧凑源文件和实例main方法、灵活的构造方法体等正式特性。
23. 2026年3月：发布JavaSE26版本，引入了HTTP/3客户端支持，移除了Applet API等特性。
24. 2026年9月：发布JavaSE27版本，G1成为所有环境下的默认垃圾收集器，紧凑对象头默认启用，引入了TLS 1.3后量子混合密钥交换等特性。

## 研发流程

纵观Java这几年的版本变化，在Java被收入Oracle之后，Java以小步快跑的迭代方式，在功能更新上迈出了更加轻快的步伐。基于时间发布的版本，可以让Java研发团队及时获得开发人员的反馈，因此可以看到最近的Java版本，有很多语法层面简化的特性。同时，Java在支持容器化场景，提供低延迟的GC方面(ZGC等)也取得了巨大的进步。

注意一个新特性的出现通常会经过以下阶段：

1. 孵化器（Incubator）阶段：这是新特性最早的开发和试验阶段，此时新特性只能作为一个单独的模块或库出现，而不会包含在Java SE中。在这个阶段，特性的设计可能会有些不稳定，而且会经常调整和变更。
2. 预览（Preview）阶段：在经过了孵化器阶段的验证和修改后，新特性进入了预览阶段，这是一种在Java SE内部实现的，开发人员可以使用并对其提供反馈的渠道。此时特性可能被包含在Java SE版本中，但是它默认是未开启的，需要通过特定的命令行参数或其他方式进行启用。
3. 正式版（GA）阶段：在经过了预览阶段的反复测试和修复后，新特性最终会在Java SE的稳定版本中发布。此时，特性被默认开启，成为Java SE的一部分，并可以在各个Java应用程序中使用。

需要注意的是，上述阶段并非一成不变，并不是所有JEP（Java Enhancement Proposal：Java增强方案）都需要经过孵化器阶段和预览阶段，这取决于特定的提案和规划。但是，Java SE领导小组通常会遵循这些阶段的流程，以确保新特性可以经过充分的评估和测试，以便能够稳定和可靠地使用在Java应用程序中。

在以下的内容中，我们对Java9到Java27新特性做一个简单的概述。

* [Java8 新特性](java-new-8.md)
* [Java9 新特性](java-new-9.md)
* [Java10 新特性](java-new-10.md)
* [Java11 新特性](java-new-11.md)
* [Java12 新特性](java-new-12.md)
* [Java13 新特性](java-new-13.md)
* [Java14 新特性](java-new-14.md)
* [Java15 新特性](java-new-15.md)
* [Java16 新特性](java-new-16.md)
* [Java17 新特性](java-new-17.md)
* [Java18 新特性](java-new-18.md)
* [Java19 新特性](java-new-19.md)
* [Java20 新特性](java-new-20.md)
* [Java21 新特性](java-new-21.md)
* [Java22 新特性](java-new-22.md)
* [Java23 新特性](java-new-23.md)
* [Java24 新特性](java-new-24.md)
* [Java25 新特性](java-new-25.md)
* [Java26 新特性](java-new-26.md)
* [Java27 新特性](java-new-27.md)

## 参考资料

1. [Java 版本特性总结（官网）](https://www.oracle.com/java/technologies/javase/jdk-relnotes-index.html)

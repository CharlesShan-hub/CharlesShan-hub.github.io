---
title: java-new-11
tags:
  - note
date: 2026-10-09
comment:
---

# Java11新特性

## 功能总览

2018年9月26日，Oracle官方发布JAVA11。这是Java大版本周期变化后的第一个长期支持版本，官方支持到2026年。

- JEP 181：基于 Nest 的访问控制
- JEP 309：动态类文件常量
- JEP 315：改进 Aarch64 内部函数
- JEP 318：Epsilon：无操作垃圾收集器
- JEP 320：删除 Java EE 和 CORBA 模块
- JEP 321：HTTP 客户端（标准）
- JEP 323：本地变量语法LAMBDA参数
- JEP 324：与Curve25519密钥协商和Curve448
- JEP 327：Unicode的10
- JEP 328：飞行记录器
- JEP 329：ChaCha20和Poly1305加密算法
- JEP 330：启动单文件源代码程序
- JEP 331：低开销堆纹
- JEP 332：传输层安全性 (TLS) 1.3
- JEP 333：ZGC：可扩展的低延迟垃圾收集器（实验性）
- JEP 335：弃用 Nashorn JavaScript 引擎
- JEP 336：弃用 Pack200 工具和 API


## 简化编译运行程序

在我们的认知里面，要运行一个Java源代码必须先编译（javac命令），再运行（Java命令），两步执行动作。而在Java 11版本中，通过一个Java命令就直接搞定了。
需要执行的程序：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

执行Java命令进行运行，如下图所示：
![java-new-single-file-run](../assets/java-new-single-file-run.png)


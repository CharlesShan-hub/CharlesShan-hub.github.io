---
title: java-new-10
tags:
  - note
date: 2026-10-09
comment:
---

# Java10新特性

## 功能总览

2018年3月21日，Oracle官方宣布JAVA10正式发布。JAVA10一共定义了109个新特性，其中包含JEP，对开发人员来说，真正的新特性也就一个，还有一些新的API和JVM规范以及Java语言规范上的改动。

- JEP 286：局部变量类型推断
- JEP 296：将 JDK 森林合并到单个存储库中
- JEP 304：垃圾收集器接口
- JEP 307：G1 的并行完整 GC
- JEP 310：应用程序类数据共享
- JEP 312：线程局部握手
- JEP 313：删除本机头生成工具 (javah)
- JEP 314：附加 Unicode 语言标签扩展
- JEP 316：替代内存设备上的堆分配
- JEP 317：基于 Java 的实验性 JIT 编译器
- JEP 319：根证书
- JEP 322：基于时间的发布版本控制


## 局部变量类型判断

在Java10中，新增了局部变量类型判断。在方法体或代码块中，对于可以在编译期确定的类型，可以使用var来定义。这个特性并不意味着Java是弱类型的语言，仅是提供了更简洁的书写方式。对于编译期无法确定的类型，依然要写清楚类型。
【示例】局部变量类型判断案例

```java
// 使用var来作为变量的引用声明
var num = 123;
var str = "hello world";
var arr = new int[] {11, 22, 33};
var arrayList = new ArrayList<String>();
var calendar = Calendar.getInstance();
// 以下为不可以声明为var的情况
// 1.使用var必须要求变量必须初始化
// var userName;
// 2.不能给变量赋null值
// var userName = null;
// 3.lambda表达式不可以声明为var
// var function = (num) -> Math.round(3.51);
// 4.方法引用不可以声明为var
// var method = System.out :: println;
// 5.数组静态初始化不可以声明为var
// var arr = {"aa", "bb", "cc"};
// 6.类的成员变量不可以使用var类型推断
// 7.所有参数声明，返回值类型，构造方法参数都不可以
```

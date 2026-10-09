---
title: java-new-8
tags:
  - note
date: 2026-10-09
comment:
---

# Java8新特性


## Optional API
在Java8以前，Java程序员操作对象时，为了避免错误引用null造成的空指针异常，往往需要一系列繁杂冗余的判空操作，增加了许多重复代码，降低了代码可读性，于是Java 8引入Optional类，优雅简洁的对null值进行处理，从而避免出现空指针异常（NullPointerException）。
本质上，Optional 类是一个包含有可选值的包装类，这意味着 Optional 类中既可以含有对象也可以为null。

### 创建Optional对象
使用Optional类提供的of()和ofNullable() 静态方法来创建包含值的Optioanal实例。
如果将null当作参数传进去of()会抛出空指针异常，如果将null当作参数传进去 ofNullable() 就不会抛出空指针异常。
因此当对象可能存在或者不存在，应该使用 ofNullable()方法来创建Optional实例。
【示例】创建一个Optional实例

```java
// 创建一个包含“null”的Optional示例
Optional<Object> optional1 = Optional.ofNullable(null);
// 创建一个包含“对象”的Optional示例
Optional<String> optional2 = Optional.ofNullable("hello");
```


### Optional类的方法
想要获得Optional实例中包含的值，那么就可以使用以下两个方法来实现。

| **方法名**                    | **描述**                                      |
| -------------------------- | ------------------------------------------- |
| `public T get()`           | 如果值不为null，则直接取出该值；如果值为null，则抛出空指针异常。        |
| `public T orElse(T other)` | 如果值不为null，则直接取出该值；如果值为null，则取出的就是参数other的值。 |

开发中，我们获取Optional中存储的值，一般都是采用`orElse(T other)`方法来实现。
【示例】演示get()方法

```java
// 创建一个包含“null”的Optional示例
Optional<Object> optional1 = Optional.ofNullable(null);
Object obj1 = optional1.get(); // 抛出空指针异常
// 创建一个包含“对象”的Optional示例
Optional<String> optional2 = Optional.ofNullable("hello");
String str = optional2.get();
System.out.println(str); // 输出：hello
```

【示例】演示`orElse(T other)`方法

```java
// 创建一个包含“null”的Optional示例
Optional<Object> optional1 = Optional.ofNullable(null);
Object str1 = optional1.orElse("world");
System.out.println(str1); // 输出：world
// 创建一个包含“对象”的Optional示例
Optional<String> optional2 = Optional.ofNullable("hello");
String str2 = optional2.orElse("world");
System.out.println(str2); // 输出：hello
```


### Optional的使用案例
需求：有一场商业表演，原计划让“刘亦菲”来表演，如果“刘亦菲”不能参加，则就换“佟丽娅”来表演，该需求的实现代码如下：

```java
// 定义一个变量，用于保存表演者的名字
// String name = "刘亦菲"; // 原计划
String name = null; // 刘亦菲不能参加的情况
// 使用Optional来封装表演者的名字
Optional<String> optional = Optional.ofNullable(name);
// 获得实际参与表演对应人的名字
// 如果name的值为null，则就换为“佟丽娅”参与表演
String finalName = optional.orElse("佟丽娅");
// 输出实际表演者的名字
System.out.println(finalName);
```

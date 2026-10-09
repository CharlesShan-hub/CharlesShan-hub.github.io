---
title: java-new-15
tags:
  - note
date: 2026-10-09
comment:
---

# Java15新特性

## 功能总览

- JEP 339：爱德华兹曲线数字签名算法 (EdDSA)
- JEP 360：密封类（预览）
- JEP 371：隐藏类
- JEP 372：删除 Nashorn JavaScript 引擎
- JEP 373：重新实现旧版 DatagramSocket API
- JEP 374：禁用和弃用偏向锁定
- JEP 375：instanceof 的模式匹配（第二次预览，无改动）
- JEP 377：ZGC：可扩展的低延迟垃圾收集器（确定正式版）
- JEP 378：文本块（确定正式版）
- JEP 379：Shenandoah：一个低暂停时间的垃圾收集器（确定正式版）
- JEP 381：删除 Solaris 和 SPARC 端口
- JEP 383：外内存访问API（第二孵化器）
- JEP 384：记录（第二次预览）
- JEP 385：弃用 RMI 激活以进行删除


## Record

早在2019年2月份，Java语言架构师Brian Goetz就吐槽了Java语言，他和很多程序员一样抱怨“Java太啰嗦”或有太多的“繁文缛节”，他提到：开发人员想要创建纯数据载体类，通常都必须编写大量低价值、重复的、容易出错的代码。例如：构造方法、getter/setter、equals()、hashCode()以及toString()等。
以至于很多人选择使用IDE的功能来自动生成这些代码。还有一些开发会选择使用一些第三方类库，如Lombok等来生成这些方法，从而会导致了令人吃惊的表现和糟糕的可调试性。
那么，Brian Goetz大神提到的纯数据载体到底指的是什么呢？我们举了一个简单的例子：

```java
public final class Tiger {
    private final String name;
    private final int age;

    public Tiger(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String name() {
        return name;
    }

    public int age() {
        return age;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Tiger) obj;
        return Objects.equals(this.name, that.name) &&
                this.age == that.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Tiger[" +
                "name=" + name + ", " +
                "age=" + age + ']';
    }
}
```

这里面的Tiger其实就是一个纯数据载体，Tiger类中提供了name和age两个私有常量，并且只提供了全参构造方法和常量名相同的getter方法，以及一些equals、hashCode和toString等方法。于是，BrianGoetz大神提出一种想法，他提到，Java完全可以对于这种纯数据载体通过另外一种方式表示。
在Java14版本中，新增了Record类型。Record是Java的一种新的类型，Record使数据类型变得非常简洁，一般可以帮助我们定义一些简单的用于纯数据载体的实体类。

**Record类的特点：**
状态声明中的每个属性，都是默认采用了private和final修饰，则属性值就不可修改
在Record类中，默认已经重写了Object类提供的equals()，hashcode()，toString()方法
在Record类中，默认提供全参的构造方法，并且提供的getter方法名和属性名保持一致。
Record类采用了final修饰，并且显示的继承于Java.lang.Record类，因此就不能继承别的父类。
【示例】将以上的Tiger类转化为Record类

```java
public record Tiger(String name, int age)  {

}
```

在以上的Record类中，Tiger类默认采用了final修饰，并且显示的继承于Java.lang.Record抽象类，因此Tiger类就不能继承于别的父类。在Tiger类中，提供了name和age两个私有常量，并且还提供了一个public修饰的全参构造方法，提供的getter方法的名字和属性名保持一致，但是并没有提供setter方法。并且，在Tiger类中还重写了Object类提供的equals()，hashcode()，toString()方法。
在Record类中，我们还可以新增静态属性、无参构造方法、成员方法和静态方法，但是创建对象时不能调用无参构造方法，而是通过全参构造方法创建对象的时候，默认就会调用Record类中的无参构造方法。
【示例】在Record类中添加的内容

```java
public record Tiger(String name, int age)  {
    // 新增静态属性
    static double score;
    // 新增无参构造方法
    // 注意：通过全参构造方法创建对象，默认就会调用此处的无参构造方法
    public Tiger {
        System.out.println("无参构造方法");
    }
    // 新增成员方法
    void show() {
        System.out.println("show. ..");
    }
    // 新增静态方法
    static void method() {
        System.out.println("method ...");
    }
}
```


## 密封类

Java中的密封类是一种新的类修饰符，它可以修饰类和接口，可以控制哪些类可以扩展或实现该类或接口。下面是密封类的一些主要用途：

1. 维护类层次结构的封闭性

密封类的一个主要用途是确保类层次结构的封闭性。这意味着，如果您想保护一组类，而不希望其他类继承或实现它们，可以使用密封类来实现这一目标。这对于确保代码的安全性和稳定性非常有用。

1. 预防代码的意外扩展

密封类可以防止其他程序员意外地扩展一个类。在进行类设计时，您可能希望自己或其他程序员只能在特定的类中实现或继承指定的类。在这种情况下，您可以将类标记为“密封”，强制限制其他程序员可以实现或继承的类的范围。

1. 增强代码的可读性和可维护性

密封类可以增强代码的可读性和可维护性。由于密封类明确规定了哪些类可以扩展或实现它，因此其他开发人员可以更清晰地看到代码的结构并理解它们的关系。这使得代码更易于维护和修改。
总之，密封类是一种灵活而有用的类修饰符，可以帮助您维护类的封闭性、预防代码的意外扩展、增强代码的可读性和可维护性。

在Java15版本中，新增了密封类和密封接口（预览）。
使用sealed关键字修饰的类，我们就称之为密封类。密封类必须是一个父类，我们可以使用permits关键字来指定哪些子类可以继承于密封类，并且密封类的子类必须使用sealed、final或non-sealed来修饰。
【示例】密封类的演示

```java
// 密封类必须被继承，并且使用permits来指定哪些子类可以被继承
sealed class Animal permits Dog, Bird, Tiger { }
// 注意：密封类的子类必须使用sealed、final或non-sealed来修饰
// final关键字修饰的子类，则该子类不能被继承
final class Tiger extends Animal { }
// non-sealed修饰的子类，则该子类就是一个普通类
non-sealed class Bird extends Animal { }
// sealed修饰的子类，则该类就必须被继承，否则就会编译错误
sealed class Dog extends Animal {}
non-sealed class SmallDog extends Dog {}
```

使用sealed关键字修饰的接口，我们就称之为密封接口。密封接口必须使用permits关键字来指定实现类或子接口。针对密封接口的实现类，则必须使用sealed、final或non-sealed来修饰；针对密封接口的子接口，则必须使用sealed或non-sealed来修饰。
【示例】密封接口的演示

```java
// 使用sealed修饰的接口，则必须使用permits来指定实现类或子接口。
public sealed interface InterA permits Student, InterB { }
// 密封接口的实现类，必须使用sealed、final或non-sealed来修饰
non-sealed /*final*/ /*sealed*/ class Student implements InterA { }
// 密封接口的子接口，必须使用sealed或non-sealed来修饰
non-sealed /*sealed*/ interface InterB extends InterA {}
```

**sealed与record：**
因为Record类默认采用了final关键字修饰，因此Record类就可以作为密封接口的实现类。
【示例】密封接口和Record类

```java
// 密封接口
sealed interface Flyable permits SuperMan { }
// 让Record类作为密封接口的实现类
record SuperMan(String name, int age) implements Flyable { }
```

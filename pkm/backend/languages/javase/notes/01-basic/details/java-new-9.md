---
title: java-new-9
tags:
  - note
date: 2026-10-09
comment:
---

# Java9新特性

## 功能总览

Java9经过4次推迟，历经曲折的Java9最终在2017年9月21日发布，提供了超过150项新功能特性。

- JEP 261: Module System
    - JDK 9 开始引入的一种全新的模块化编程方式。JPMS 的目的是为了更好地支持大型应用程序的开发和维护，同时也可以使 Java 程序在更为动态、可移植和安全的环境下运行。
- JEP 222: jshell: The Java Shell (Read-Eval-Print Loop)
    - 一种交互式的 Java Shell，可以在命令行上快速地进行 Java 代码的编写、验证和执行，从而提高开发者的生产力。
- JEP 213: Milling Project Coin（细化工程改进，该计划旨在引入小型语言特性来提高代码的简洁性和可读性）
    - 在Java 9中，@SafeVarargs注解可以用于一个私有实例方法上。在Java 7和Java 8中，@SafeVarargs注解只能用于静态方法、final实例方法和构造函数。
    - 在Java 9中，可以将效果等同于final变量作为try-with-resources语句块中的资源来使用。在Java 7/8中，try-with-resources语句块中的资源必须是显式的final或事实上的final（即变量在初始化后未被修改），否则编译器会报错。这个限制限制了Java程序员使用try-with-resources语句块的能力，特别是在涉及lambda表达式、匿名类或其他读取外部变量的代码段时。
    - Java 9允许在匿名类实例化时使用钻石操作符(<>)来简化代码，但参数类型必须是具体的、可推导的类型。
    - 从Java9开始，不能使用一个单一的`_`作为标识符了。
    - 从Java9开始，接口中支持定义私有方法。
- JEP 224: HTML5 Javadoc
    - 从Java9开始，javadoc开始支持HTML5的语法。
- JEP 254: Compact Strings
    - 一种新的字符串表示方式，称为紧凑型字符串，以提高Java应用程序的性能和内存利用率。通过String源码得知：`char[]` 变成了 `byte[]`。
- JEP 269: Convenience Factory Methods for Collections
    - 更加方便的创建只读集合：List.of("abc", "def", "xyz");
- JEP 269：对Stream API进行了增强
    - 其中最显著的是引入了四个新的方法，分别是 `takeWhile()`, `dropWhile()`, `ofNullable()` 和 `iterate()`
- JEP 110：一个新的HTTP客户端API，名为HttpClient，它是一种基于异步和事件驱动的方式，更加高效和灵活的HTTP客户端。

## jShell命令

jShell命令是Java9引进的新特性，像Python和Scala之类的语言早就有交互式编程环境REPL (read-evaluate-print-loop)，以交互式的方式对语句和表达式进行求值。开发者只需要输入一些代码，就可以在编译前获得对程序的反馈。而之前的Java 版本要想执行代码，必须创建文件、声明类、提供测试方法方可实现。
我们打开DOS命令窗口，然后输入jshell，就能进入交互式编程环境REPL，如下图所示：
![java-new-jshell-start](../assets/java-new-jshell-start.png)
通过jShell命令，我们能够定义一些变量，并执行相关的运算操作，如下图所示：
![java-new-jshell-var](../assets/java-new-jshell-var.png)
通过jShell命令，我们能够定义方法，并执行调用方法的操作，如下图所示：
![java-new-jshell-method](../assets/java-new-jshell-method.png)
想要查看JShell提供的所有指令，则直接输入“/help”即可，如下图所示：
![java-new-jshell-help](../assets/java-new-jshell-help.png)
想要查看书写的所有代码，则直接输入“/list”指令即可，如下图所示：
![java-new-jshell-list](../assets/java-new-jshell-list.png)
想要查看定义的所有变量，则直接输入“/vars”指令即可，如下图所示：
![java-new-jshell-vars](../assets/java-new-jshell-vars.png)
想要查看定义的所有方法，则直接输入“/methods”指令即可，如下图所示：
![java-new-jshell-methods](../assets/java-new-jshell-methods.png)
想要将输入的历史代码片段保存到文件中，就需要使用“ /save”指令，如下图所示：
![java-new-jshell-save](../assets/java-new-jshell-save.png)


## try-with-resources

众所周知，所有被打开的系统资源，比如流、文件、Socket连接等，都需要被开发者手动关闭，否则随着程序的不断运行，资源泄露将会累积成重大的生产事故。
在Java7以前，我们想要关闭资源就必须的finally代码块中完成。
【示例】Java7之前资源的关闭的方式

```java
public void copyFile1(File srcFile, File destFile) {
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
        // 实例化IO流（输入流和输出流）
        fis = new FileInputStream(srcFile);
        fos = new FileOutputStream(destFile);
        // 拷贝文件（存储和读取）
        int len = 0;
        byte[] bytes = new byte[1024];
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        // 关闭资源
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

Java7及以后关闭资源的正确姿势：try-with-resource，该语法格式为：

```java
try(/*实例化需要关闭资源的对象或引用需要关闭资源的对象*/){
    // 书写可能出现异常的代码
} catch(Exception e) {
    // 处理异常
}
```

使用try-with-resource来自动关闭资源，则需要关闭资源的对象对应的类就必须实现Java.lang.AutoCloseable接口，该接口中提供了一个close()的抽象方法，而自动关闭资源默认调用的就是实现于Java.lang.AutoCloseable接口中的close()方法。
因为FileInputStream类和FileOutputStream类都属于Java.lang.AutoCloseable接口的实现类，因此此处文件拷贝的操作就可以使用try-with-resource来自动关闭资源。
【示例】Java7之后资源的关闭的方式

```java
public void copyFile(File srcFile, File destFile) {
    // 实例化IO流（输入流和输出流）
    try (FileInputStream fis = new FileInputStream(srcFile);
         FileOutputStream fos = new FileOutputStream(destFile)) {
        // 拷贝文件（存储和读取）
        int len = 0;
        byte[] bytes = new byte[1024];
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

通过try-with-resource来关闭放资源，即使资源很多，代码也可以写的很简洁，如果用Java7之前的方式去关闭资源，那么资源越多，用finally关闭资源时嵌套也就越多。
在Java9之后，为了避免在try后面的小括号中去实例化很多需要关闭资源的对象（复杂），则就可以把需要关闭资源的多个对象在try之前实例化，然后在try后面的小括号中引用需要关闭资源的对象即可，从而提高了代码的可读性。
【示例】Java9之后的使用方式

```java
public void copyFile(File srcFile, File destFile) throws FileNotFoundException {
    // 实例化IO流（输入流和输出流）
    FileInputStream fis = new FileInputStream(srcFile);
    FileOutputStream fos = new FileOutputStream(destFile);
    // 拷贝文件（存储和读取）
    try (fis; fos) {
        int len = 0;
        byte[] bytes = new byte[1024];
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

在以上代码中，表达式中引用了fis和fos，那么在fis和fos就自动变为常量啦，也就意味着在try代码块中不能修改fis和fos的指向，从而保证打开的资源肯定能够关闭。



## String存储结构改变

在Java8及其之前，String底层采用char类型数组来存储字符；在Java9及其以后，String底层采用byte类型的数组来存储字符。将char[]转化为byte[]，其目的就是为了节约存储空间。
![java-new-string-byte](../assets/java-new-string-byte.png)



## 接口支持私有方法

在Java8版本中，接口中支持“公开”的静态方法和公开的默认方法；在Java9版本中，接口中还允许定义“私有”的静态方法和成员方法，但是不能定义私有的默认方法。
【示例】演示接口中的私有静态方法和成员方法

```java
/**
 * 接口（JDK1.9）
 */
public interface Flyable {
    // 私有的静态方法
    private static void staticMethod() {
        System.out.println("static method ...");
    }
    // 私有的成员方法
    private void method() {
        System.out.println("default method ...");
    }
}
```


## 标识符命名的变化

在Java8及其之前，标识符可以独立使用`_`来命名。

```java
String _ = "hello";
System.out.println(_);
```

但是，在Java9中规定`_`不能独立命名标识符了，如果使用就会报错：
![java-new-underscore-error](../assets/java-new-underscore-error.png)


## 创建不可变集合

在Java9版本中，我们可以通过List、Set和Map接口提供的`of(E... elements)`静态方法来创建不可变集合。通过此方式创建的不可变集合，我们不但不能添加或删除元素，并且还不能修改元素。

【示例】创建不可变集合

```java
// 创建不可变List集合
List<Integer> list = List.of(1, 2, 3, 4, 5);
System.out.println(list);
// 创建不可变Set集合
// 注意：如果Set集合中有相同的元素，则就会抛出IllegalArgumentException异常。
Set<Integer> set = Set.of(1, 2, 3, 4, 5, 4);
System.out.println(set);
// 创建不可变Map集合
Map<Integer, String> map = Map.of(123, "武汉", 456, "成都");
System.out.println(map);
```

`Arrays.asList`与`List.of`的区别：
`List.of`：不能向集合中添加或删除元素，也不能修改集合中的元素。
`Arrays.asList`：不能向集合中添加或删除元素，但是可以修改集合中的元素。

【示例】`Arrays.asList`与`List.of`的区别

```java
// 通过Arrays.asList()方法创建不可变集合
List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
// list1.add(6); // 抛出UnsupportedOperationException异常
// list1.remove(2); // 抛出UnsupportedOperationException异常
list1.set(2, 33); // 没有问题
System.out.println(list1); // 输出：[1, 2, 33, 4, 5]

// 通过List.of()方法创建不可变集合
List<Integer> list2 = List.of(1, 2, 3, 4, 5);
// list2.add(6); // 抛出UnsupportedOperationException异常
// list2.remove(2); // 抛出UnsupportedOperationException异常
// list2.set(2, 33); // 抛出UnsupportedOperationException异常
```


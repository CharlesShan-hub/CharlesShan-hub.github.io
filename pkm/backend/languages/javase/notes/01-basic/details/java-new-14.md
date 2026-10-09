---
title: java-new-14
tags:
  - note
date: 2026-10-09
comment:
---
# Java14新特性

## 功能总览

- JEP 305：instanceof 的模式匹配（预览）
- JEP 343：包装工具（孵化器）
- JEP 345：G1 的 NUMA 感知内存分配
- JEP 349：JFR 事件流
- JEP 352：非易失性映射字节缓冲区
- JEP 358：有用的空指针异常
- JEP 359：记录（预览）
- JEP 361： switch表达式（标准）
- JEP 362：弃用 Solaris 和 SPARC 端口
- JEP 363：删除并发标记清除 (CMS) 垃圾收集器
- JEP 364：macOS 上的 ZGC
- JEP 365：Windows 上的 ZGC
- JEP 366：弃用 ParallelScavenge + SerialOld GC 组合
- JEP 367：删除 Pack200 工具和 API
- JEP 368：文本块（第二次预览）
- JEP 370：外部内存访问 API（孵化器）


## instanceof的模式匹配

在JDK14中新增instanceof模式匹配增强(预览)，在JDK16中转正。通过instanceof模式匹配增强，我们就可以直接在模式匹配的括号内声明对应类型的局部变量。
【示例】执行向下转型的操作，从而调用show()方法

```java
/**
 * 以前的代码实现方式
 */
@Test
public void testOld() {
    // 父类引用指向子类对象（多态）
    Animal animal = new Dog();
    // 判断animal是否为Dog类的实例
    if (animal instanceof Dog) {
        // 指向向下转型的操作
        Dog dog = (Dog) animal;
        // 调用Dog类特有的show()方法
        dog.show();
    }
}
/**
 * 使用instanceof模式匹配增强的实现方式
 */
public void testNew() {
    // 父类引用指向子类对象（多态）
    Animal animal = new Dog();
    // 如果animal是Dog类的实例，则向下转型后就命名为dog
    if (animal instanceof Dog dog) {
        // 调用Dog类特有的show()方法
        dog.show();
    }
}
```

【示例】重写equals()，判断成员变量是否相等

```java
public class Tiger {
    String name;
    int age;

    /**
     * 以前的代码实现方式
     */
    /*@Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        // 如果obj属于Tiger类型，则就执行向下转型的操作
        if (obj instanceof Tiger) {
            // 执行向下转型的操作，恢复对象的实际类型
            Tiger tiger = (Tiger) obj;
            // 如果成员变量都相等，则返回true，否则返回false
            return age == tiger.age && Objects.equals(name, tiger.name);
        }
        // 如果obj不属于Tiger类型，则返回false即可
        return false;
    }*/

    /**
     * 使用instanceof模式匹配增强的实现方式
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        // 如果obj属于Tiger类型并且成员变量值都相等，那么返回true
        if (obj instanceof Tiger tiger) {
            return age == tiger.age && Objects.equals(name, tiger.name);
        }
        // 如果obj不属于Tiger类型，则返回false即可
        return false;
    }
}
```



## 文本块

在Java语言中，通常需要使用String类型表达HTML，XML，SQL或JSON等格式的字符串，在进行字符串赋值时需要进行转义和连接操作，然后才能编译该代码，这种表达方式难以阅读并且难以维护。
在Java12版本中，新增了文本块（预览）。文本块就是指多行字符串，例如一段格式化后的xml、json等。而有了文本块以后，用户不需要转义，Java能自动搞定。因此，文本块将提高Java程序的可读性和可写性。
【示例】演示文本块的使用

```java
// 使用以前拼接的方式
String html1 = "<html>\n" +
        "      <body>\n" +
        "            <p>Hello， world</p>\n" +
        "      </body>\n" +
        "</html>";
System.out.println(html1);
// 使用文本块的方式
String html2 = """
        <html>
              <body>
                    <p>Hello， world</p>
              </body>
        </html>
        """;
System.out.println(html2);
```

在Java14版本中，针对文本块又新增两个特性（阅览）。1)在一行的结尾增加“\”可以取消改行的换行符；2)可以通过“\s”增加空格。
【示例】演示文本块新增特性

```java
// 取消换行（\）
String json1 = """
        {
            "username":"ande"，\
            "age":18
        }
        """;
System.out.println(json1);
// 添加空格（\s）
String json2 = """
        {
            "username"\s:\s"ande"，
            "age"\s:\s18
        }
        """;
System.out.println(json2);
```

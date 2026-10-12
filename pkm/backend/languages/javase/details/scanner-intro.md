---
title: scanner-intro
tags:
  - note
date: 2026-10-10
comment:
---

# Scanner 快速入门

```java
import java.util.Scanner;

public class KeyboardInputDemo {
    public static void main(String[] args) {
        // 1. 创建Scanner对象
        Scanner scanner = new Scanner(System.in);
        
        // 2. 接收各种类型输入
        System.out.print("请输入名字: ");
        String name = scanner.next();
        
        System.out.print("请输入性别: ");
        char gender = scanner.next().charAt(0);
        
        System.out.print("请输入年龄: ");
        int age = scanner.nextInt();
        
        System.out.print("请输入薪水: ");
        double salary = scanner.nextDouble();
        
        // 3. 输出结果
        System.out.println("名字: " + name);
        System.out.println("性别: " + gender);
        System.out.println("年龄: " + age);
        System.out.println("薪水: " + salary);
        
        // 4. 关闭Scanner
        scanner.close();
    }
}
```

* 下一步：[Scanner详解](../notes/04-utils/Scanner.md)
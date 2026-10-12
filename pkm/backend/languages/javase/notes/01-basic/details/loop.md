---
title: loop
tags:
  - note
date: 2026-10-12
comment:
---

# 循环结构

## 1. for循环

```java
for (循环变量初始化; 循环条件; 循环变量迭代) {
    语句块;
}
```

**特点**：

- 初始化和变量迭代可以用逗号分隔多个表达式
- `for (;;)` 表示死循环（两个分号不能省略）

## 2. while循环

```java
while (循环条件) {
    循环体;
    循环变量迭代;
}
```

## 3. do-while循环

```java
do {
    循环体;
    循环变量迭代;
} while (循环条件);
```

示例：统计1-200之间能被5整除但不能被3整除的数

```java
public class Demo {
    public static void main(String[] args) {
        int i = 1;
        int count = 0;
        do {
            if (i % 5 == 0 && i % 3 != 0) {
                System.out.println(i);
                count++;
            }
            i++;
        } while (i <= 200);
        System.out.println("count = " + count);
    }
}
```

## 4. 多重循环

建议不要超过三层嵌套。

示例1：九九乘法表

```java
public class Demo {
    public static void main(String[] args) {
        for (int i = 1; i < 10; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " * " + j + " = " + (i * j) + "\t");
            }
            System.out.println();
        }
    }
}
```

示例2：空心金字塔

```java
public class Demo {
    public static void main(String[] args) {
        int height = 5;
        
        // 上半部分（三角形）
        for (int i = 1; i <= height - 1; i++) {
            // 左边空格
            for (int j = 0; j < height - i; j++) {
                System.out.print(" ");
            }
            
            // 左边星号
            System.out.print("*");
            
            // 中间空格
            for (int k = 1; k < 2 * (i - 1); k++) {
                System.out.print(" ");
            }
            
            // 右边星号（第一行除外）
            if (i != 1) {
                System.out.print("*");
            }
            
            // 右边空格
            for (int j = 0; j < height - i; j++) {
                System.out.print(" ");
            }
            
            System.out.println();
        }
        
        // 底部（最后一行）
        for (int i = 0; i < 2 * height - 1; i++) {
            System.out.print("*");
        }
    }
}
```

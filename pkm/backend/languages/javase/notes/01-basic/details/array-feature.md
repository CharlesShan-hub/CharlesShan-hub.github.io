---
title: array-feature
tags:
  - note
date: 2026-10-12
comment:
---

# 数组特性

## 数组默认值

- **整型、浮点型**：`0`
- **char类型**：`\u0000`
- **boolean类型**：`false`
- **String类型**：`null`

## 数组赋值机制

数组在默认情况下是**引用传递**，赋值的是地址。

```java
int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;          // arr2指向arr1的地址
arr2[0] = 4;                // 修改arr2会影响arr1
System.out.println(arr1[0]); // 输出：4
```

## JVM内存模型

- **栈**：保存变量（包括引用类型的地址）
- **堆**：保存数组的具体内容
- **方法区**：保存类信息、常量等

数组变量在栈中保存的是堆中数组内容的地址。

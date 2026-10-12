---
title: loop2
tags:
  - note
date: 2026-10-12
comment:
---

# 循环控制语句

## 1. break

用于跳出当前循环或switch语句。

带标签的break：

```java
label1:
for (int j = 0; j < 4; j++) {
    label2:
    for (int i = 0; i < 10; i++) {
        if (i == 2) break label1;  // 跳出外层循环
        System.out.println("i=" + i + " j=" + j);
    }
}
// 输出：
// i=0 j=0
// i=1 j=0
```

## 2. continue

跳过当前循环的剩余部分，继续下一次迭代。

带标签的continue：

```java
label1:
for (int j = 0; j < 4; j++) {
    label2:
    for (int i = 0; i < 10; i++) {
        if (i == 2) continue label1;  // 跳过外层循环的当前迭代
        System.out.println("i=" + i + " j=" + j);
    }
}
// 输出：
// i=0 j=0
// i=1 j=0
// i=0 j=1
// i=1 j=1
// i=0 j=2
// i=1 j=2
// i=0 j=3
// i=1 j=3
```

## 3. return

跳出所在方法，结束方法的执行。

## 4. 递归

* [Recursion](recursion.md)：递归

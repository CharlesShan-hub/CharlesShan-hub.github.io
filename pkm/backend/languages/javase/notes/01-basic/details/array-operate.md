---
title: array-operate
tags:
  - note
date: 2026-10-12
comment:
---

# 数组操作

## 数组拷贝

需要创建独立的数据空间：

### 方法1：手动拷贝
```java
int[] arr1 = {1, 2, 3};
int[] arr2 = new int[arr1.length];
for (int i = 0; i < arr1.length; i++) {
    arr2[i] = arr1[i];
}
```

### 方法2：使用System.arraycopy()
```java
int[] arr1 = {1, 2, 3};
int[] arr2 = new int[arr1.length * 2];
System.arraycopy(arr1, 0, arr2, 0, arr1.length);
```

## 数组逆序
```java
int[] arr1 = {1, 2, 3, 4, 5, 6};
int[] arr2 = new int[arr1.length];
for (int i = 0; i < arr1.length; i++) {
    arr2[arr1.length - 1 - i] = arr1[i];
}
arr1 = arr2; // 原arr1指向的内存会被垃圾回收
```

## 数组添加元素

需要创建新数组：

```java
// 案例：在数组{1, 2, 3}后添加元素4
int[] arr = {1, 2, 3};
int[] temp = new int[arr.length + 1];
for (int i = 0; i < arr.length; i++) {
    temp[i] = arr[i];
}
temp[temp.length - 1] = 4;
arr = temp;
```


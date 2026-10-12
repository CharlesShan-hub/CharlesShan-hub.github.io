---
title: array-multy
tags:
  - note
date: 2026-10-12
comment:
---

# 多维数组

## 声明方式
```java
int a[][];
int[][] a;
int[] a[];
```

## 二维数组初始化

### 静态初始化
```java
int[][] arr = {
    {1, 2, 3, 4},
    {10, 20, 30, 40},
    {100, 200, 300, 400}
};

// 等价写法
int[][] arr = new int[][]{
    {1, 2, 3, 4},
    {10, 20, 30, 40},
    {100, 200, 300, 400}
};

System.out.println(arr.length); // 输出：3（行数）
```

### 动态初始化
```java
int[][] narr = new int[3][4];
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        narr[i][j] = arr[i][j];
    }
}
```

## 不规则二维数组
每行元素个数可以不同：

```java
// 创建如下结构的二维数组：
// 1
// 1 2
// 1 2 3
int[][] arr = new int[3][];
for (int i = 1; i < 4; i++) {
    arr[i - 1] = new int[i];
    for (int j = 0; j < i; j++) {
        arr[i - 1][j] = j + 1;
    }
}
```

## 案例：杨辉三角
```java
public class YangHuiTriangle {
    public static void main(String[] args) {
        int[][] n = new int[10][];
        
        for (int i = 0; i < n.length; i++) {
            n[i] = new int[i + 1];
            
            if (i == 0) {
                n[0][0] = 1;
                continue;
            }
            
            n[i][0] = 1;
            for (int j = 1; j < i; j++) {
                n[i][j] = n[i - 1][j] + n[i - 1][j - 1];
            }
            n[i][i] = 1;
        }
        
        // 打印杨辉三角
        for (int i = 0; i < n.length; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(n[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

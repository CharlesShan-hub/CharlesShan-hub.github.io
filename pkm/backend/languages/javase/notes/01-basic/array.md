---
title: array
tags:
  - note
date: 2026-10-12
comment:
---

# 专题：Java数组

## 知识点梳理

1. 数组基础：[array-init](details/array-init.md)
    1. 初始化
    2. 入门案例（找最大值）
2. 数组特性：[array-feature](details/array-feature.md)
    1. 默认值
    2. 赋值机制
    3. JVM内存模型
3. 数组操作：[array-operate](details/array-operate.md)
    1. 拷贝（手动拷贝 | `System.arraycopy()`）
    2. 逆序
    3. 添加元素
4. 多维数组：[array-multy](details/array-multy.md)
    1. 声明
    2. 初始化（静态、动态）
    3. 不规则二维数组
    4. 案例：杨辉三角
5. Arrays类库：[Arrays](../04-utils/Arrays.md)

---
## 总结要点

### 数组核心概念

1. **引用类型**：数组是引用类型，赋值传递的是地址
2. **固定长度**：数组一旦创建，长度不可变
3. **索引从0开始**：有效索引范围是0到length-1

### 操作注意事项

1. **拷贝数组**：需要创建新数组并复制元素
2. **添加元素**：需要创建更大的新数组
3. **多维数组**：可以创建不规则数组（每行长度不同）

### 内存管理

- 数组变量在栈中，数组内容在堆中
- 引用赋值不会创建新数组，只是复制地址
- 没有引用的数组会被垃圾回收器回收
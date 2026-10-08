---
title: background
tags:
  - note
date: 2026-10-07
comment:
---
# Fortran 背景与发展

## 定位
- 世界上第一个被广泛使用的高级程序设计语言，诞生于 1954 年 IBM，John Backus 团队 [1] (citation:1, citation:15)
- 初衷：让科学家像写数学公式一样写程序，不用碰汇编。这一概念后来被称为**编译（compilation）** [2] (citation:2) [1] (citation:15)
- 名字：FORmula TRANslation（公式翻译），早期全大写 FORTRAN，Fortran 90 后首字母大写 [1] (citation:1)
- 早期即被移植到多种计算机架构，被公认为**第一个跨平台编程语言** [1] (citation:1)

## 关键时间线
- **1954** — IBM 正式发布 FORTRAN I，一个实验性语言，功能简单但开创性极强 [1] (citation:1)
- **1957** — 第一个 FORTRAN 编译器在 IBM 704 上成功运行，语言从纸面走向实用 [1] (citation:1, citation:5)
- **1958** — IBM 发布 FORTRAN II，引入子程序和函数概念，**属于 IBM 的商业产品版本，并非标准化组织发布的标准** [1] (citation:1)
- **1966** — **ANSI**（美国国家标准协会）发布第一个 Fortran 标准 **FORTRAN 66**（ANSI X3.9-1966），这是 Fortran 标准化进程的起点 [1] (citation:1)
- **1978** — **ANSI** 发布 **FORTRAN 77**（ANSI X3.9-1978），引入结构化特征和字符处理；**1980 年由 ISO 采纳为国际标准 ISO 1539-1980** [1] (citation:1)
- **1991** — **ANSI** 先发布 Fortran 90（ANSI 3.198-1991），随后 **ISO/IEC** 采纳为国际标准 **ISO/IEC 1539-1:1991**，这是 Fortran 现代化的起点：数组编程、模块化、自由格式 [1] (citation:1, citation:17)
- **2003** — **ISO/IEC** 发布 **Fortran 2003**（ISO/IEC 1539-1:2004），引入面向对象和与 C 的互操作（`iso_c_binding`）
- **2008/2018** — **ISO/IEC** 先后发布 **Fortran 2008**（引入 Coarray 分布式内存并行）和 **Fortran 2018**（引入 `do concurrent` 等增强并行特性）
- **2023** — **ISO/IEC** 发布 **Fortran 2023**（ISO/IEC 1539-1:2023），当前正式标准，标准文档 681 页 [1] (citation:4)

**一句话总结**：FORTRAN I / II 是 IBM 的产品版本；FORTRAN 66 / 77 是 ANSI 标准（77 后来被 ISO 采纳）；从 Fortran 90 起，标准由 **ISO/IEC** 主导发布。

## 一个值得记住的转折
- John Backus 本人后来在图灵奖演讲中批评了 Fortran/C 这类命令式语言，转向推崇函数式编程（Lisp 那一脉）
- 这个“创始者背叛自己作品”的细节，是理解命令式与函数式张力的绝佳锚点

## 为什么 Fortran 仍然值得用？（基于《The State of Fortran》）

《The State of Fortran》一文指出，Fortran 常被误认为“古老、缺乏现代特性、语法晦涩”，但这种印象往往来自对 Fortran 77 之后标准的不了解。实际上，现代 Fortran 具备以下核心优势：

### 高层语言特性（Figure 1）
- **原生数组支持**：最高 15 维数组、数组切片、逐元过程、向量化
- **安全内存分配**：allocatable 数组保证无内存泄漏、无别名问题，编译器可高效生成机器码
- **强静态类型**：编译期错误检查，不牺牲运行时性能
- **模块与子模块**：代码组织与复用，自动检查例程签名和类型
- **C 互操作**：`iso_c_binding` 模块（Fortran 2003 引入）支持与 C、Python、C++ 等语言平台无关地交互 [1] (citation:1)

### 原生并行能力
- **共享内存**：`do concurrent` 语法，可自动 offload 到 GPU（如 NVIDIA nvfortran）
- **分布式内存**：Coarray（Fortran 2008）、集合子程序（Fortran 2018）、MPI 标准
- Coarray 抽象掉了 MPI 的繁琐细节，让程序员聚焦应用而非底层进程间数据交换 [1] (citation:1)

### 稳定与长寿
- ISO 标准保证**向后兼容**，大量 1970–80 年代代码至今仍可使用
- 对大型关键项目而言，避免了“代码腐烂”（code rot）和“软件崩溃”（software collapse）的风险 [1] (citation:1)
- 许多用户可能不知道，Python NumPy/SciPy 的底层其实就是 Fortran [1] (citation:1)

## 现状（2026）
- TIOBE 排名第 11 [1] (citation:9, citation:16)
- 仍在气候模拟、流体力学、计算化学、航天、核能等领域作为核心计算引擎 [1] (citation:4, citation:16)
- **社区在活跃更新**：
    - **Fortran-lang**（2019 年成立）：新的开源社区，提供统一网站、论坛（Fortran Discourse，一年超 300 用户）、邮件列表等 [1] (citation:1)
    - **stdlib**（Fortran 标准库）：社区开发、版本化、充分测试的参考实现，涵盖错误处理、I/O、线性代数、统计、排序、字符串等 17 个模块 [1] (citation:1)
    - **fpm**（Fortran Package Manager）：Fortran 专用构建系统与包管理器，灵感来自 Rust 的 Cargo，简化依赖管理和构建流程 [1] (citation:1)
    - **LFortran**：基于 LLVM 的现代开源交互式 Fortran 编译器，支持 Jupyter notebook [1] (citation:1)
    - **Fortran 2028** 在推进中
- **2026 年 SEI 发布了首个 Fortran 安全编码标准（CERT Fortran）** [1] (citation:9)

## 参考文献
1. [《The State of Fortran》IEEE 2022](https://ieeexplore.ieee.org/document/9736688/)
2. [科普中国 - FORTRAN 列表](https://img1.kepuchina.cn/wiki/ct/201804/t20180425_620431.shtml)
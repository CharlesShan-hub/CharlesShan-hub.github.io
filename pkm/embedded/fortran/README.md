---
title: README
tags:
  - catalog
date: 2026-10-07
comment:
---
# Fortran 学习笔记

## Notes

* 背景介绍
    * [background](notes/background.md)
    * [complier](notes/install.md)
    * [fpm](notes/fpm.md): 新型的开源构建系统
* 快速入门（按照）
    * 

## 书

- 《Modern Fortran: Building Efficient Parallel Applications》— Milan Curcic
- 《Modern Fortran Explained》— Metcalf 等

## 精髓（待验证）

- 表达式抽象：代码像数学公式
- 数组即数学对象：索引从 1 开始、列优先、整体运算
- 贴近机器：`do concurrent` 可直接 offload 到 GPU
- 子程序拼装流水线：`SUBROUTINE` 是零件，不是黑盒函数

## 跨语言调用
- `bind(C)` 导出 `.so` / `.dll`
- Python：`f2py` 或 `ctypes`
- Java：JNA / JNI（建议传扁平数组或 JSON）

## 待办
- [ ] 写矩阵乘法，对比 C 版本
- [ ] 读一个真实项目的数值模块
- [ ] 试 `do concurrent` + `-stdpar`

## Reference

- 官网：https://fortran-lang.org
- 快速入门：https://fortran-lang.org/learn/quickstart
- Playground（浏览器直接跑）：https://play.fortran-lang.org
- 包管理器 fpm：https://github.com/fortran-lang/fpm
- 标准库 stdlib：https://github.com/fortran-lang/stdlib
- VS Code 扩展：搜索 `fortran-lang` 的 vscode-fortran-support
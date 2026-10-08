---
title: complier
tags:
  - note
date: 2026-10-07
comment:
---
# 编译器介绍与安装

## 编译器

### 开源编译器
* **GFortran**（生产主力）— GNU 编译器套件里的 Fortran 前端，成熟、跨平台。配套 OpenCoarrays 库可启用 Fortran 2018 的并行特性（BSD-3）。
* **LLVM Flang**（LLVM 生态的未来方向）— LLVM 官方新前端，现代 C++ 实现，使用 Fortran 导向的 MLIR 方言降低到 LLVM IR，活跃开发中（Apache 2.0 with LLVM Exceptions）。
* **Current Flang** — 基于 NVIDIA/PGI 商业编译器开源出来的版本（Apache 2.0 with LLVM Exceptions）。
* **LFortran**（交互式实验）— 现代、交互式、基于 LLVM 的编译器，支持浏览器 WASM 在线运行（dev.lfortran.org），alpha 阶段但已能编译 LAPACK 和 fpm（BSD-3）。

### 商业编译器
* **Intel oneAPI**（Intel HPC/GPU）— 提供两个 Fortran 编译器：`ifx`（新 LLVM 后端，完整 Fortran 2018，支持 OpenMP 5.0/5.1 及 Intel GPU offload，支持 `do concurrent` offload）和 `ifort`（经典成熟版，完整 Fortran 2018，仅 CPU）。当前版本免费，可购买支持。
* **NAG** — 7.0 版对遗留和现代特性支持广泛（coarray、OpenMP），几乎全部 Fortran 2008、完整 Fortran 2003、全部 OpenMP 3.1。附带源码抛光、依赖生成、调用图、接口构建等工具。
* **NVIDIA**（NVIDIA GPU 并行）— 前 PGI 编译器，支持 GPU 加速，OpenACC 指令和 CUDA。支持 Linux 上的 x86_64、ppc64le、aarch64。
* **HPE / Cray** — Cray 编译环境（CCE），优化编译器自动利用 Cray 系统的标量、向量和多线程硬件能力，支持 Fortran/C/C++。
* **IBM** — XL Fortran for Linux，为 POWER9 架构生成代码，支持 Linux 和 AIX，ppc64le。有免费社区版。
* **AMD** — AOCC 编译器套件，面向 32/64 位 Linux 的 x86 应用，高级优化、多线程、向量化，免费。
* **ARM** — Arm Fortran 编译器 for Linux，面向 HPC 和科学计算，基于开源 Flang 前端和 LLVM 后端，随 Arm Compiler for Linux 提供，免费。
* **Oracle / Sun** — 针对 Oracle SPARC 和 x86 系统高度优化，支持 C++14/C++11/C11 和 OpenMP 4.0。
* **Silverfrost FTN95** — 完整 Fortran 95 标准，面向 Win32 和 .NET，支持 Fortran 77/90/95 混合，部分 2003/2008 特性。有免费个人版。
* **NEC** — 符合 Fortran 2003，支持许多 Fortran 2008 特性，面向 SX-Aurora TSUBASA，免费。
* **LCC** — MCST C/C++/Fortran 编译器，完整 Fortran 95，部分 2003/2008/2018，用于俄罗斯 Elbrus (e2k) 和 SPARC (MCST-R)，有 x86_64 交叉编译器。
* **Fujitsu** — 支持 Fortran 2018/2008 及更早标准，面向 A64FX 处理器（用于 Fugaku 超算），Linux 上以 `frt` 调用。
* **VSI Fortran for OpenVMS** — 支持 Fortran 95/90/77/66，面向 OpenVMS 的 Alpha、Integrity、x86-64。

### 已停产
Absoft、Apogee、Edinburgh Portable Compilers、Hewlett Packard、Lahey、Watcom、PathScale、G95、Open64、Unisys

## 安装

* mac：`brew install gfortran`

## References

1. https://fortran-lang.org/compilers/
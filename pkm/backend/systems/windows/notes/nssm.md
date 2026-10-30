---
title: nssm
tags:
  - note
date: 2026-10-29
comment:
---

# NSSM 简介

**NSSM**（Non-Sucking Service Manager）是一个轻量级 Windows 工具，用于将普通 `.exe` 程序或脚本封装成系统服务，实现开机自启与崩溃自动重启。

**官网**：<https://nssm.cc/>

---

## 最常用命令

> 所有命令需在**管理员权限**的终端中执行。

| 命令                          | 作用           |
| --------------------------- | ------------ |
| `nssm install <服务名>`        | 创建服务（弹出配置界面） |
| `nssm start <服务名>`          | 启动服务         |
| `nssm stop <服务名>`           | 停止服务         |
| `nssm restart <服务名>`        | 重启服务         |
| `nssm edit <服务名>`           | 修改服务配置（弹出界面） |
| `nssm remove <服务名> confirm` | 删除服务（免二次确认）  |
| `nssm status <服务名>`         | 查看服务运行状态     |

**安装示例**：
```cmd
nssm install MyService "C:\path\to\app.exe"
```

执行后会弹出 GUI，确认路径、启动目录、参数后点击 “Install service” 即可。
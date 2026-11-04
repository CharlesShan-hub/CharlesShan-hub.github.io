---
title: chapter3-n
tags:
  - note
date: 2026-11-04
comment: 3.n的模板
---

# 01 CONNECT · 连接请求

> **一句话心智模型**：Client 建好连接后发出的第一个包，用来「报身份 + 谈能力 + 定会话」。
> （只写一句，不写定义；定义在第 2 章）

## 身份卡
| 项 | 值 |
|---|---|
| type / 小节 | 1 / 3.1 |
| 方向 | C → S |
| byte 1 | `0x10`，低 4 位 `0000`（Reserved，**必须为 0**，否则 Malformed Packet） |
| 触发条件 | 网络连接建立之后；一条 Network Connection 上只能发一次 |
| 前驱 / 后继 | 4.2 建立连接 → **CONNACK**；失败则断连 |
| 关联状态 | Session、Clean Start、Will Message、Keep Alive |

## 结构三段（只列字段名与顺序，编码统一链 1.5 / 2.1.4）
- **Fixed Header**：type + flags + Remaining Length（VBI）
- **Variable Header**：Protocol Name → Protocol Version → Connect Flags → Keep Alive → Properties
- **Payload**：ClientID（必）／Will Properties／Will Topic／Will Payload／User Name／Password

> 不解释「VBI 怎么编码」——那是第 2 章的事，这里只写「有这个字段、排第几」。

## 字段速查（本篇正文）
| 字段 | 位/类型 | 缺省 | 约束 | 语句编号 |
|---|---|---|---|---|
| Clean Start | bit 1 | — | =1 丢弃旧 Session | `[MQTT-3.1.2-4]` |
| Will Flag | bit 2 | — | =1 时 Will 三字段必现 | `[MQTT-3.1.2-9]` |

## 条件区块 A：Properties　※ 2.2.2 列入时开启
| ID | 名称 | 类型 | 次数 | 缺省 | 本报文作用 |
|---|---|---|---|---|---|
| 0x11 | Session Expiry Interval | Four Byte Integer | 1 | 0 | 断连后会话保留多久 |

规则：
- 只列**本报文允许**的 ID，全表见 2.2.2 表 2-4
- 重复出现 → **Protocol Error**；非法 ID / 类型不符 → **Malformed Packet** → 4.13
- CONNECT 额外注意：Payload 里还有一份独立的 **Will Properties**（3.1.3），别和 VH 的混
- 无此区块时写一句：`无（2.2.2 未列入；本报文仅有 Fixed Header）`

## 条件区块 B：Reason Code　※ 三选一，别复制表 2-6
- **单值 / VH**：CONNACK、PUBACK、PUBREC、PUBREL、PUBCOMP、DISCONNECT、AUTH
- **列表 / Payload**（每个订阅项一个）：SUBACK、UNSUBACK
- **无**：CONNECT、PUBLISH、SUBSCRIBE、UNSUBSCRIBE、PINGREQ、PINGRESP

| 值 | 在**本报文**中的名称 | 含义 | 后续动作 |
|---|---|---|---|
| 0x00 | Success | … | 继续 / 断连 / 释放 Packet ID / 影响 Session |

> 同一个 `0x00` 在不同报文叫 Success、Normal disconnection、Granted QoS 0——**按本报文写名**，不要统一抄成「成功」。

## 条件区块 C：Packet Identifier　※ 仅 9 个报文开启
有无 ／ 何时分配（非零且未占用）／ **何时可复用**（QoS1 收 PUBACK、QoS2 收 PUBCOMP 或 ≥0x80 的 PUBREC、订阅类收对应 ACK）／ QoS 0 PUBLISH 禁止 ／ 双向可同号（2.2.1）

## 时序与配对
- 正常：`C ──CONNECT──▶ S ──CONNACK──▶ C`
- 异常分支：第二个 CONNECT = Protocol Error → close（3.1.0-2 / 4.13）
- 反链：[[02_CONNACK]]　·　所属组：连接握手

## 最小合法报文（手算即可）


10 00 ... # byte1 / Remaining Length / …

C0 00 # 例：PINGREQ 全文就这两个字节


逐段标注 byte1 → Remaining Length → VH → Payload。
只有 PUBLISH / CONNECT 这类复杂报文才贴真实抓包，并补一句「这段 hex 在验什么」。

## 约束与坑
- MUST / MUST NOT / SHOULD，逐条带语句编号
- 区分 **Malformed Packet**（解析不了）与 **Protocol Error**（解析通但不允许）→ 4.13
- 与第 4 章划界：本篇只讲「长什么样」，状态迁移、重试、错误处理一律链出去

## v5 新增 / 与 3.1.1 差异
## 实测记录
## 待确认

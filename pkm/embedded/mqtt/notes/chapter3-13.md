---
title: chapter3-13
tags:
  - note
date: 2026-11-03
comment:
---
# PINGRESP

> **连接组**　[1](chapter3-1.md) CONNECT · [2](chapter3-2.md) CONNACK · [14](chapter3-14.md) DISCONNECT · [15](chapter3-15.md) AUTH · [12](chapter3-12.md) PINGREQ · [13] PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **PINGRESP**：服务端对 PINGREQ 的应答，全文就 `C0 00` 两个字节，收到即代表连接还通。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 13（PINGRESP），标志位 Reserved 固定 0000
    * [1 byte] 剩余长度（Remaining Length）：固定 0，无可变头无载荷

## 参考资料

1. [3.13 PINGRESP – 心跳响应（MQTT 5.0 中文译文）](../assets/mqtt-pingresp-0313.md)

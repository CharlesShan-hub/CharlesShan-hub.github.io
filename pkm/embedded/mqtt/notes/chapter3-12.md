---
title: chapter3-12
tags:
  - note
date: 2026-11-03
comment:
---
# PINGREQ

> **连接组**　[1](chapter3-1.md) CONNECT · [2](chapter3-2.md) CONNACK · [14](chapter3-14.md) DISCONNECT · [15](chapter3-15.md) AUTH · [12] PINGREQ · [13](chapter3-13.md) PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **PINGREQ**：Keep Alive 期间没有别的报文要发时，客户端发的心跳，就为告诉服务端「我还活着」。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 12（PINGREQ），标志位 Reserved 固定 0000
    * [1 byte] 剩余长度（Remaining Length）：固定 0，无可变头无载荷

## 参考资料

1. [3.12 PINGREQ – 心跳请求（MQTT 5.0 中文译文）](../assets/mqtt-pingreq-0312.md)

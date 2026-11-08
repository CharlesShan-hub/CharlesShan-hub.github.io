---
title: chapter3-15
tags:
  - note
date: 2026-11-03
comment:
---
# AUTH

> **连接组**　[1](chapter3-1.md) CONNECT · [2](chapter3-2.md) CONNACK · [14](chapter3-14.md) DISCONNECT · [15] AUTH · [12](chapter3-12.md) PINGREQ · [13](chapter3-13.md) PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **AUTH**：v5.0 新增的增强认证报文，供 CONNECT 握手阶段做多轮质询-应答式认证。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 15（AUTH），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头的字节数，VBI 编码
* 可变头（Variable Header）
    * [1 byte] 认证原因码（Authentication Reason Code）：0x00 认证成功 / 0x18 继续认证 / 0x19 重新认证；可省略，剩余长度 0 时隐含 0x00
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [2 + n byte] 认证方法（Authentication Method）
        * [2 + n byte] 认证数据（Authentication Data）
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个

## 参考资料

1. [3.15 AUTH – 认证交换（MQTT 5.0 中文译文）](../assets/mqtt-auth-0315.md)

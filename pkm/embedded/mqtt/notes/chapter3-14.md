---
title: chapter3-14
tags:
  - note
date: 2026-11-03
comment:
---
# DISCONNECT

> **连接组**　[1](chapter3-1.md) CONNECT · [2](chapter3-2.md) CONNACK · [14] DISCONNECT · [15](chapter3-15.md) AUTH · [12](chapter3-12.md) PINGREQ · [13](chapter3-13.md) PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **DISCONNECT**：主动结束连接——客户端、服务端都能发，带 Reason Code 说明断开原因。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 14（DISCONNECT），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头的字节数，VBI 编码
* 可变头（Variable Header）
    * [1 byte] 原因码（Reason Code）：断开原因，0x00 正常断开；可省略，剩余长度 0 时隐含 0x00
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [4 byte] 会话过期（Session Expiry Interval）
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
        * [2 + n byte] 服务端参考（Server Reference）

## 通俗理解

到底什么时候发Will：
* “告老还乡，遁入空门”：客户端正常退出，不发Will；
* “皇上驾崩，天下吊唁”：客户端异常退出，发Will；
* “午时斩首，以儆效尤”：服务器踢客户端，仍然需要发Will；

## 参考资料

1. [3.14 DISCONNECT – 断开通知（MQTT 5.0 中文译文）](../assets/mqtt-disconnect-0314.md)

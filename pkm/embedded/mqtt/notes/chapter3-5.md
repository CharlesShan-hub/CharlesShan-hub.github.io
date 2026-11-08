---
title: chapter3-5
tags:
  - note
date: 2026-11-03
comment:
---
# PUBREC

> **发布组**　[3](chapter3-3.md) PUBLISH · [4](chapter3-4.md) PUBACK · [5] PUBREC · [6](chapter3-6.md) PUBREL · [7](chapter3-7.md) PUBCOMP
> 管一条消息从发出到确认的全流程：PUBLISH 发消息，QoS 1 靠 PUBACK 确认，QoS 2 靠 PUBREC/PUBREL/PUBCOMP 三次握手，QoS 0 不需要确认。
> **PUBREC**：QoS 2 握手第一步——接收方确认已收到 PUBLISH，开始交接消息所有权。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 5（PUBREC），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头的字节数，VBI 编码
* 可变头（Variable Header）
    * [2 byte] 报文标识符（Packet Identifier）：被确认的 PUBLISH 报文标识符
    * [1 byte] 原因码（Reason Code）：0x00 成功；可省略，剩余长度 2 时隐含 0x00
    * [可变] 属性（Properties）：Property Length + 若干属性；可随原因码一并省略
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个

## 参考资料

1. [3.5 PUBREC – 发布已接收（QoS 2，第一步）（MQTT 5.0 中文译文）](../assets/mqtt-pubrec-0305.md)

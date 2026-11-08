---
title: chapter3-6
tags:
  - note
date: 2026-11-03
comment:
---
# PUBREL

> **发布组**　[3](chapter3-3.md) PUBLISH · [4](chapter3-4.md) PUBACK · [5](chapter3-5.md) PUBREC · [6] PUBREL · [7](chapter3-7.md) PUBCOMP
> 管一条消息从发出到确认的全流程：PUBLISH 发消息，QoS 1 靠 PUBACK 确认，QoS 2 靠 PUBREC/PUBREL/PUBCOMP 三次握手，QoS 0 不需要确认。
> **PUBREL**：QoS 2 握手第二步——发送方回应 PUBREC，通知接收方「可以放行了」。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 6（PUBREL），标志位 Reserved 固定 0010（其余取值按畸形报文处理）
    * [1–4 byte] 剩余长度（Remaining Length）：可变头的字节数，VBI 编码
* 可变头（Variable Header）
    * [2 byte] 报文标识符（Packet Identifier）：被放行的 PUBREC 报文标识符
    * [1 byte] 原因码（Reason Code）：0x00 成功；可省略，剩余长度 2 时隐含 0x00
    * [可变] 属性（Properties）：Property Length + 若干属性；可随原因码一并省略
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个

## 参考资料

1. [3.6 PUBREL – 发布释放（QoS 2，第二步）（MQTT 5.0 中文译文）](../assets/mqtt-pubrel-0306.md)

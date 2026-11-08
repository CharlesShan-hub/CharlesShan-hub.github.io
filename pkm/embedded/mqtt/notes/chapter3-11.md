---
title: chapter3-11
tags:
  - note
date: 2026-11-03
comment:
---
# UNSUBACK

> **订阅组**　[8](chapter3-8.md) SUBSCRIBE · [9](chapter3-9.md) SUBACK · [10](chapter3-10.md) UNSUBSCRIBE · [11] UNSUBACK
> 管订阅关系的建立与解除：SUBSCRIBE/SUBACK 订阅，UNSUBSCRIBE/UNSUBACK 退订，一一配对。
> **UNSUBACK**：对 UNSUBSCRIBE 的逐条应答，确认每个主题都已退订。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 11（UNSUBACK），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头 + 载荷的字节数，VBI 编码
* 可变头（Variable Header）
    * [2 byte] 报文标识符（Packet Identifier）：与被应答的 UNSUBSCRIBE 相同
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
* 载荷（Payload）
    * [1 byte] 原因码（Reason Code）：每项对应 UNSUBSCRIBE 的一个主题过滤器，顺序一致，0x00 成功、0x11 无此订阅、其余为失败原因

## 参考资料

1. [3.11 UNSUBACK – 取消订阅确认（MQTT 5.0 中文译文）](../assets/mqtt-unsuback-0311.md)

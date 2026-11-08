---
title: chapter3-10
tags:
  - note
date: 2026-11-03
comment:
---
# UNSUBSCRIBE

> **订阅组**　[8](chapter3-8.md) SUBSCRIBE · [9](chapter3-9.md) SUBACK · [10] UNSUBSCRIBE · [11](chapter3-11.md) UNSUBACK
> 管订阅关系的建立与解除：SUBSCRIBE/SUBACK 订阅，UNSUBSCRIBE/UNSUBACK 退订，一一配对。
> **UNSUBSCRIBE**：退订请求，列出要取消订阅的一批主题。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 10（UNSUBSCRIBE），标志位 Reserved 固定 0010（其余取值按畸形报文处理）
    * [1–4 byte] 剩余长度（Remaining Length）：可变头 + 载荷的字节数，VBI 编码
* 可变头（Variable Header）
    * [2 byte] 报文标识符（Packet Identifier）：标识本次退订，UNSUBACK 用同一值应答
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
* 载荷（Payload）
    * [2 + n byte] 主题过滤器（Topic Filter）：UTF-8 字符串，连续排列，至少一个

## 参考资料

1. [3.10 UNSUBSCRIBE – 取消订阅请求（MQTT 5.0 中文译文）](../assets/mqtt-unsubscribe-0310.md)

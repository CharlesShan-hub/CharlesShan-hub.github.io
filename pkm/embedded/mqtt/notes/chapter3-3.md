---
title: chapter3-3
tags:
  - note
date: 2026-11-03
comment:
---
 # PUBLISH

> **发布组**　[3] PUBLISH · [4](chapter3-4.md) PUBACK · [5](chapter3-5.md) PUBREC · [6](chapter3-6.md) PUBREL · [7](chapter3-7.md) PUBCOMP
> 管一条消息从发出到确认的全流程：PUBLISH 发消息，QoS 1 靠 PUBACK 确认，QoS 2 靠 PUBREC/PUBREL/PUBCOMP 三次握手，QoS 0 不需要确认。
> **PUBLISH**：发消息的报文，带主题、载荷和 QoS；QoS 1/2 的消息要靠后面的 ACK 流程确认送达。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 3（PUBLISH），标志位 DUP·QoS·RETAIN（bit3 DUP、bit2–1 QoS、bit0 RETAIN，随重发与服务质量变化）
    * [1–4 byte] 剩余长度（Remaining Length）：可变头 + 载荷的字节数，VBI 编码
* 可变头（Variable Header）
    * [2 + n byte] 主题名（Topic Name）：UTF-8 字符串，不得含通配符，可用 Topic Alias 代替
    * [2 byte] 报文标识符（Packet Identifier）：仅 QoS 1/2 时存在，QoS 0 无此字段
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [1 byte] 载荷格式指示（Payload Format Indicator）：0 任意字节 / 1 UTF-8
        * [4 byte] 消息过期（Message Expiry Interval）：缺省不过期
        * [2 byte] 主题别名（Topic Alias）
        * [2 + n byte] 响应主题（Response Topic）
        * [2 + n byte] 关联数据（Correlation Data）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
        * [可变] 订阅标识符（Subscription Identifier）：VBI
        * [2 + n byte] 内容类型（Content Type）
* 载荷（Payload）
    * [n byte] 应用消息（Application Message）：可选，内容应用自定义，可为 0 长度

## 参考资料

1. [3.3 PUBLISH – 发布消息（MQTT 5.0 中文译文）](../assets/mqtt-publish-0303.md)

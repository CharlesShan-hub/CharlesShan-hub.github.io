---
title: chapter3-2
tags:
  - note
date: 2026-11-03
comment:
---
# CONNACK

> **连接组**　[1](chapter3-1.md) CONNECT · [2] CONNACK · [14](chapter3-14.md) DISCONNECT · [15](chapter3-15.md) AUTH · [12](chapter3-12.md) PINGREQ · [13](chapter3-13.md) PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **CONNACK**：服务端对 CONNECT 的应答——连没连上（Reason Code）、旧会话是否延续（Session Present），外加服务端能力与限制。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 2（CONNACK），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头的字节数，VBI 编码
* 可变头（Variable Header）
    * [1 byte] 连接确认标志（Connect Acknowledge Flags）：bit0 是 Session Present，bit7–1 Reserved 必须为 0
    * [1 byte] 原因码（Reason Code）：连接结果，0x00 成功、非零拒绝（≥128 时服务端随后关闭连接）
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [4 byte] 会话过期（Session Expiry Interval）
        * [2 byte] 接收最大值（Receive Maximum）
        * [1 byte] 最大服务质量（Maximum QoS）
        * [1 byte] 保留可用（Retain Available）
        * [4 byte] 最大报文大小（Maximum Packet Size）
        * [2 + n byte] 分配客户标识符（Assigned Client Identifier）
        * [2 byte] 主题别名最大值（Topic Alias Maximum）
        * [2 + n byte] 原因字符串（Reason String）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
        * [1 byte] 通配符订阅可用（Wildcard Subscription Available）
        * [1 byte] 订阅标识符可用（Subscription Identifier Available）
        * [1 byte] 共享订阅可用（Shared Subscription Available）
        * [2 byte] 服务端保持连接（Server Keep Alive）
        * [2 + n byte] 响应信息（Response Information）
        * [2 + n byte] 服务端参考（Server Reference）
        * [2 + n byte] 认证方法（Authentication Method）
        * [2 + n byte] 认证数据（Authentication Data）

## 通俗理解

### 3.2.2.3.4 最大服务质量 Maximum QoS

该属性占用 1 个字节，但规范目前仅定义了三种合法取值：`0`（至多一次）、`1`（至少一次）、`2`（恰一次）。其余取值均为保留值。

**设计考量**：

1. **字节对齐**：MQTT 5.0 属性采用固定的 TLV（标识符+值）字节结构，摒弃了复杂的位运算，降低了解析成本。
    
2. **演进空间**：保留其余数值，为未来可能增加的 QoS 级别（如讨论中的 QoS 3）预留了扩展位，未来升级无需重构底层报文格式。

关于 **Maximum QoS（最大服务质量）**，这个属性在 `CONNACK` 里由**服务端发给客户端**。它的作用是告诉客户端：“**我这边的最高能力只到 QoS 1/2，你以后发给我的 PUBLISH 报文，别超过这个级别。**”

如果在某个系统里，服务端声明了 `Maximum QoS = 1`，客户端却非要发 `QoS = 2` 的报文，这就会被服务端判定为协议错误，直接断开连接。

### 3.2.2.3.5 保留可用 (Retain Available)

客户端只会在 **CONNECT（遗嘱消息）** 和 **PUBLISH（发布消息）** 这两个报文中使用 `Retain` 标志。

*   **CONNECT 阶段的处理**：
    如果客户端在 `CONNECT` 报文的遗嘱消息中设置了 `Retain=1`，但服务端不支持保留消息功能，服务端会**拒绝该连接请求**，并在返回的 `CONNACK` 报文中附带原因码 `0x9A（不支持保留）`，随后关闭网络连接。

*   **PUBLISH 阶段的处理**：
    如果客户端在成功建立连接后，发送了带有 `Retain=1` 的 `PUBLISH` 报文，而服务端不支持保留消息，服务端将视其为协议错误（Protocol Error）。此时，服务端会发送包含原因码 `0x9A` 的 `DISCONNECT` 报文，并强制断开连接。

*   **服务端的能力声明（CONNACK）**：
    为了避免上述连接被拒或后续发送报文被踢下线的情况，服务端必须在连接建立时（即发送 `CONNACK` 报文时）主动声明 `Retain Available` 字段。该字段用单字节表示（`1` 代表支持，`0` 代表不支持，缺省默认支持）。服务端借此提前向客户端亮明“能力底牌”，约束客户端后续的报文发送行为。


## 参考资料

1. [3.2 CONNACK – 确认连接请求（MQTT 5.0 中文译文）](../assets/mqtt-connack-0302.md)

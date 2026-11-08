---
title: chapter3-1
tags:
  - note
date: 2026-11-07
comment:
---
# CONNECT

> **连接组**　[1] CONNECT · [2](chapter3-2.md) CONNACK · [14](chapter3-14.md) DISCONNECT · [15](chapter3-15.md) AUTH · [12](chapter3-12.md) PINGREQ · [13](chapter3-13.md) PINGRESP
> 管一条连接从生到死的全部环节：握手建连、心跳保活、断开、增强认证。
> **CONNECT**：建连后客户端发的第一个包，报身份（ClientID）+ 谈能力（协议版本、Properties）+ 定会话（Clean Start、Keep Alive、遗嘱）。

## 报文结构
* 固定头（Fixed Header）
    * [1 byte] 报文类型与标志位：类型 1（CONNECT），标志位 Reserved 固定 0000
    * [1–4 byte] 剩余长度（Remaining Length）：可变头 + 载荷的字节数，VBI 编码
* 可变头（Variable Header）
    * [6 byte] 协议名（Protocol Name）：UTF-8 字符串，固定 "MQTT"（2 字节长度 + 4 字节内容）
    * [1 byte] 协议级别（Protocol Level）：v5.0 填 5
    * [1 byte] 连接标志（Connect Flags）：bit0 Reserved / bit1 Clean Start / bit2 Will Flag / bit3–4 Will QoS / bit5 Will Retain / bit6 Password Flag / bit7 User Name Flag
    * [2 byte] 保持连接（Keep Alive）：单位秒，客户端两次发报文的最大间隔
    * [可变] 属性（Properties）：Property Length + 若干属性（按标准顺序）
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [4 byte] 会话过期（Session Expiry Interval）
        * [2 byte] 接收最大值（Receive Maximum）
        * [4 byte] 最大报文大小（Maximum Packet Size）
        * [2 byte] 主题别名最大值（Topic Alias Maximum）
        * [1 byte] 请求响应信息（Request Response Information）
        * [1 byte] 请求问题信息（Request Problem Information）
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
        * [2 + n byte] 认证方法（Authentication Method）：UTF-8 字符串
        * [2 + n byte] 认证数据（Authentication Data）：二进制数据
* 载荷（Payload）
    * [2 + n byte] 客户端标识符（Client Identifier）：必填，UTF-8 字符串
    * [可变] 遗嘱属性（Will Properties）：Will Flag = 1 时才出现
        * [可变] 属性长度（Property Length）：VBI，后面所有属性的总字节数
        * [4 byte] 遗嘱延迟（Will Delay Interval）：缺省 0，连接关闭后延迟 N 秒再发遗嘱
        * [1 byte] 载荷格式（Payload Format Indicator）：0 任意字节 / 1 UTF-8
        * [4 byte] 消息过期（Message Expiry Interval）：缺省不过期
        * [2 + n byte] 内容类型（Content Type）：UTF-8 字符串，描述载荷格式
        * [2 + n byte] 响应主题（Response Topic）：UTF-8 字符串，供接收方回消息用
        * [2 + n byte] 关联数据（Correlation Data）：二进制，与 Response Topic 配套
        * [2 + n byte] 用户属性（User Property）：UTF-8 键值对，可多个
    * [2 + n byte] 遗嘱主题（Will Topic）：Will Flag = 1 时才出现
    * [2 + n byte] 遗嘱载荷（Will Payload）：Will Flag = 1 时才出现
    * [2 + n byte] 用户名（User Name）：User Name Flag = 1 时出现
    * [2 + n byte] 密码（Password）：Password Flag = 1 时出现

## 通俗理解

### 3.1.2.2 协议版本 (Protocol Version)

在 MQTT 5.0 的 `CONNECT` 报文中，协议版本字段的取值统一为 `5`。

*   **为什么跳过了版本 4？**
    早期 MQTT 3.1 的协议级号为 `3`，在推出 MQTT 3.1.1 时，协议级号更新为了 `4`。这导致协议名（3.1.1）和协议版本号（4）之间产生了令人困惑的错位。
    
*   **消除歧义的架构设计**：
    为了避免这种命名和版本号不一致带来的混乱，OASIS 委员会在制定新标准时，直接跳过了 4，采用了 `5`。这就意味着：**MQTT 5.0 的协议名，和报文中指定的协议级别 5 实现了完美对齐**。后续的版本迭代（如未来的 6），也会遵循这个统一的规则。
    
*   **不匹配的后果**：
    如果客户端在 `CONNECT` 中发送了错误的协议版本号，服务端将直接拒绝连接，并在 `CONNACK` 报文中返回原因码 `0x84 (Unsupported Protocol Version)`，随后断开网络连接。

### 3.1.2.4 新开始 Clean Start

代表客户端断线重连之后，要不要继续之前的会话：

1. **客户端给 `1`（清空）**：服务器直接删掉这个客户端所有的旧记录（订阅、没发完的消息），**开个新会话**。回给客户端的 `CONNACK` 里，会话存在标志写 `0`。
    
2. **客户端给 `0`，且服务器有旧记录**：服务器把以前存的东西捞出来，**接着上次的进度继续干**。`CONNACK` 里会话存在标志写 `1`。
    
3. **客户端给 `0`，但服务器找不到旧记录**：没办法，服务器只能**新建一个会话**。`CONNACK` 里会话存在标志写 `0`。

可以引出服务器保存记录的位置对该行为的影响：

- **内存**：如果存档只在内存里，那服务器一断电重启，存档就灰飞烟灭了（此时客户端 `Clean Start=0` 连上来，也会变成情况 3，即新建会话）。
    
- **硬盘**：为了真正实现高可用的“断点续传”，像 EMQX、HiveMQ 这种高级 MQTT 服务器，会把会话状态持久化到磁盘。这样就算服务器宕机重启，客户端重连后依然能拿回会话。

### 遗嘱（Will）全家桶

通俗理解：把“失联”当成一种消息

* 一般来说，发消息都需要建立连接，断开连接就没办法发消息了。但是，我们可以把**客户端异常失联的状态**，看作是一种特殊的消息。
* 消息的具体内容，在建立连接的时候，通过 `Will` 报文发送并暂存到服务器。等服务器检测到该客户端异常失联时，再替它把这条消息发出去。
* 就好像，**特朗普在任上提前赦免自己下台后（失联时）的马斯克。**

3.1.2.5 遗嘱标志 (Will Flag)

遗嘱标志（Will Flag）的内容只能是 `0` 或 `1`（尽管长度占用 1 个字节）。如果遗嘱标志（Will Flag）被设置为 `1`，那么以下三个字段**必须（MUST）** 存在于报文有效载荷中：
- **遗嘱属性**（3.1.3.2 Will Property）
- **遗嘱主题**（3.1.3.3 Will Topic）
- **遗嘱载荷**（3.1.3.4 Will Payload）

另外因为Will时一个消息，配套的可变头中就不可避免地要有：
* **遗嘱 QoS** （Will QoS）
* **遗嘱保留** （Will Retain）

3.1.3.2.2 遗嘱延时间隔 Property Length

就是已经确认掉线之后，间隔多久发送遗嘱信息。为什么有了1.5倍容忍时间，还要再等一个遗嘱延时间隔 Property Length，考虑两种情况：
1. 偏远山区的冷链药品运输车，网络不通畅，温度监控设备经常掉线重启，不能频繁的发送遗嘱消息扰乱视听，可以设置比较长的Property Length，
2. 对于工厂的电路或者某种检测装置，一检测到有问题了，就要赶紧启动应急电源，这就要把Property Length设置成0；
### 3.1.2.10 保持连接 (Keep Alive)

什么是 MSB 和 LSB？

在网络传输（大端模式）中，一个 16 位的整数需要拆成两个字节发送：
- **MSB (Most Significant Byte)**：**最高有效字节**（也就是数字的“大头”，高位）。
- **LSB (Least Significant Byte)**：**最低有效字节**（也就是数字的“小头”，低位）。
*(比如 Keep Alive = 60 秒，传输时 MSB 是 0，LSB 是 60。这俩拼起来才是一个完整的时间。)*

Keep Alive 的保活算法

* **开启机制**：Keep Alive 的值不为 0 代表开启该机制（最大值约 18 小时 12 分 15 秒）。
* **客户端的义务**：从客户端传输完成一个 MQTT 控制报文的时刻起，到发送下一个报文，两者之间允许空闲的最大时间间隔内，客户端**必须**发送一个报文。如果没有业务数据，就必须发送 `PINGREQ` 报文来保活。
* **服务端的无情**：如果超过了 `Keep Alive × 1.5` 的时间，服务器依然没有收到客户端的任何信息，服务器就会**直接断开连接**。
* **单向的保活**：**服务器永远不主动 PING 客户端**，它只负责默默地倒计时，以及对客户端发来的 `PINGREQ` 进行回复（`PINGRESP`）。

### 3.1.2.11.2 会话过期间隔 Session Expiry Interval

乍一看怎么又是一个时间。其实这个可以理解成“聊天记录”的保存时间。之前的keep alive 是判断客户端在不在线，这个Session Expiry Interval 是判断会话信息存多久。具体而言：

* 如果会话过期间隔（Session Expiry Interval）值未指定，则使用0。会话将在网络连接（Network Connection）关闭时结束。 
* 如果会话过期间隔（Session Expiry Interval）为0xFFFFFFFF (UINT_MAX)，则会话永不过期。
* 如果网络连接关闭时会话过期间隔（Session Expiry Interval）大于0，则客户端与服务端**必须**存储会话状态

### 防止挂机三件套

* 3.1.2.11.3 **接收最大值** （Receive Maximum）：客户端使用此值限制客户端愿意同时处理的**QoS为1和QoS为2**的发布消息最大数量。没有机制可以限制服务端试图发送的QoS为0的发布消息。
* 3.1.2.11.4 **最大报文长度** （Maximum Packet Size）：客户端愿意接收的最大报文长度（Maximum Packet Size），如果没有设置则按照协议由固定报头中的剩余长度可编码最大值和协议报头对数据包的大小做限制。
* 3.1.2.11.5 **主题别名最大值** （Topic Alias Maximum）：此值指示了客户端能够接收的来自服务端的主题别名（Topic Alias）最大数量。没有设置主题别名最大值属性的情况下，主题别名最大值默认为零，服务端**不能**向此客户端发送任何主题别名（Topic Alias）。


### 3.1.2.11.7 请求问题信息 Request Problem Information

报错是否返回详细信息的开关：
*   **填 `1`（默认）**：服务端报错时，可以附带原因字符串（Reason String）和用户属性（User Properties），把错误解释得清清楚楚。
*   **填 `0`（极简模式）**：服务端**不能**在一般的报文（如 PUBACK）里附带废话。如果硬塞，客户端直接报错（0x82）并断开连接。只有 `PUBLISH`、`CONNACK`、`DISCONNECT` 三个报文例外，允许带。

## 参考资料

1. [3.1 CONNECT – 连接请求（MQTT 5.0 中文译文）](../assets/mqtt-connect-0301.md)
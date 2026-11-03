---
title: chapter3-1
tags:
  - note
date: 2026-11-03
comment:
---
# CONNECT

1. 建连规则：客户端建连后第一条报文必须是 CONNECT，同一连接只能发一次，第二个 CONNECT 按协议错误处理并关闭连接。
2. 固定头：报文类型 1，标志位 Reserved 固定 0000，剩余长度 = 可变头 + 载荷。
3. 可变头字段顺序：Protocol Name → Protocol Level → Connect Flags → Keep Alive → Properties。
4. Protocol Name：UTF-8 字符串，固定 "MQTT"，未来版本不改偏移和长度。
5. Protocol Level：1 字节，v5.0 填 5；不是 5 且服务端不接受时，可回 CONNACK 0x84 并关闭连接。
6. Connect Flags 位序：bit0 Reserved（必须 0，否则 Malformed Packet）、bit1 Clean Start、bit2 Will Flag、bit3–4 Will QoS、bit5 Will Retain、bit6 Password Flag、bit7 User Name Flag。
7. Clean Start = 1：丢弃旧会话，新建会话，CONNACK 的 Session Present 必为 0；= 0：有旧会话就恢复，没有就新建。
8. Will Flag = 1：遗嘱消息必须存到服务端，Will Properties / Will Topic / Will Payload 必须出现在载荷中。
9. 遗嘱发布时机：网络连接关闭且 Will Delay 到期，或会话结束，以先到者为准；期间用同一 ClientID 重连则不发。
10. 遗嘱不发布的情况：收到 Reason Code 0x00 的 DISCONNECT；Will Delay 到期前重连成功。
11. Will QoS：Will Flag = 0 时必须为 0；Will Flag = 1 时可为 0、1、2，值 3 是 Malformed Packet。
12. Will Retain：Will Flag = 0 时必须为 0；= 1 时按该位决定遗嘱是否作为保留消息发布。
13. User Name Flag：0 则载荷不得有 User Name，1 则必须有。
14. Password Flag：0 则载荷不得有 Password，1 则必须有；v5.0 允许只有 Password 没有 User Name。
15. Keep Alive：2 字节整数，秒，是客户端两次发报文之间的最大间隔；非零且无其他报文要发时必须发 PINGREQ。
16. Keep Alive 服务端侧：非零且 1.5 倍时间内没收到客户端任何报文，按网络故障关闭连接；值为 0 关闭保活机制。
17. Keep Alive 覆盖：CONNACK 返回 Server Keep Alive 时，客户端必须改用该值。
18. CONNECT 属性：Session Expiry Interval、Receive Maximum、Maximum Packet Size、Topic Alias Maximum、Request Response Information、Request Problem Information、User Property、Authentication Method、Authentication Data。
19. Session Expiry Interval：缺省或 0 表示连接关闭即会话结束；0xFFFFFFFF 表示不过期；大于 0 时连接关闭后双方都必须保存会话状态。
20. Receive Maximum：限制客户端愿意并发处理的 QoS 1/2 消息数，缺省 65535，0 是协议错误，仅对当前连接有效。
21. Maximum Packet Size：客户端愿意接收的最大报文总字节数，缺省不限，0 是协议错误；服务端不得发送超限报文。
22. Topic Alias Maximum：客户端愿意接受的 Topic Alias 上限，缺省 0，0 表示不接受任何别名。
23. Request Response Information：0 或 1，缺省 0；为 1 时服务端可在 CONNACK 返回 Response Information。
24. Request Problem Information：0 或 1，缺省 1；为 0 时服务端除 PUBLISH、CONNACK、DISCONNECT 外不得发送 Reason String 或 User Property。
25. Authentication Method / Data：出现 Method 才进行扩展认证；有 Data 必须有 Method；设置了 Method 后，收到 CONNACK 前只能发 AUTH 或 DISCONNECT。
26. 载荷字段顺序：Client Identifier → Will Properties → Will Topic → Will Payload → User Name → Password，是否出现由 Connect Flags 决定。
27. Client Identifier：必需，UTF-8 字符串；服务端至少支持 1–23 字节且限定的字符集；可允许更长或零长度，零长度时服务端分配唯一 ID 并通过 CONNACK 的 Assigned Client Identifier 返回。
28. Will Properties：Will Flag = 1 时出现，包括 Will Delay Interval、Payload Format Indicator、Message Expiry Interval、Content Type、Response Topic、Correlation Data、User Property。
29. Will Delay Interval：缺省 0，表示不延迟；到期前重连成功则不发遗嘱；与服务端会话结束取先到者。
30. 服务端处理顺序：等 CONNECT（超时关闭）→ 校验格式 → 认证授权 → 同 ClientID 已连接则给旧连接发 DISCONNECT 0x8E 并关闭 → 处理 Clean Start → 回 CONNACK 0x00 → 开始投递和保活监控。
31. 客户端发完 CONNECT 不必等 CONNACK 就可以继续发报文；服务端拒绝连接时，除 AUTH 外不处理 CONNECT 之后的数据。
32. CONNACK：服务端对 CONNECT 的响应，必须在发任何非 AUTH 报文之前先发 Reason Code 0x00 的 CONNACK，同一连接不得发多于一个。
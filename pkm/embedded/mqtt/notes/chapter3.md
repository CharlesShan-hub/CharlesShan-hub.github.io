---
title: chapter3
tags:
  - note
date: 2026-11-03
comment:
---
# MQTT5 第三章 控制包

| 3.x | 报文（链接）                                                | 方向  | 低 4 位          | Properties          | Reason Code       | Packet Identifier | Payload |
| --- | ----------------------------------------------------- | --- | -------------- | ------------------- | ----------------- | ----------------- | ------- |
| 1   | [CONNECT](https://tencent.yuanbao/chapter3-1.md)      | C→S | 0000           | ✓ + Will Properties | —                 | —                 | 必       |
| 2   | [CONNACK](https://tencent.yuanbao/chapter3-2.md)      | S→C | 0000           | ✓                   | 单值 / VH           | —                 | —       |
| 3   | [PUBLISH](https://tencent.yuanbao/chapter3-3.md)      | 双向  | DUP·QoS·RETAIN | ✓                   | —                 | QoS > 0           | 可选      |
| 4   | [PUBACK](https://tencent.yuanbao/chapter3-4.md)       | 双向  | 0000           | ✓                   | 单值 / VH           | ✓                 | —       |
| 5   | [PUBREC](https://tencent.yuanbao/chapter3-5.md)       | 双向  | 0000           | ✓                   | 单值 / VH           | ✓                 | —       |
| 6   | [PUBREL](https://tencent.yuanbao/chapter3-6.md)       | 双向  | **0010**​      | ✓                   | 单值 / VH           | ✓                 | —       |
| 7   | [PUBCOMP](https://tencent.yuanbao/chapter3-7.md)      | 双向  | 0000           | ✓                   | 单值 / VH           | ✓                 | —       |
| 8   | [SUBSCRIBE](https://tencent.yuanbao/chapter3-8.md)    | C→S | **0010**​      | ✓                   | —                 | ✓                 | 必       |
| 9   | [SUBACK](https://tencent.yuanbao/chapter3-9.md)       | S→C | 0000           | ✓                   | **列表 / Payload**​ | ✓                 | 必       |
| 10  | [UNSUBSCRIBE](https://tencent.yuanbao/chapter3-10.md) | C→S | **0010**​      | ✓                   | —                 | ✓                 | 必       |
| 11  | [UNSUBACK](https://tencent.yuanbao/chapter3-11.md)    | S→C | 0000           | ✓                   | **列表 / Payload**​ | ✓                 | 必       |
| 12  | [PINGREQ](https://tencent.yuanbao/chapter3-12.md)     | C→S | 0000           | —                   | —                 | —                 | —       |
| 13  | [PINGRESP](https://tencent.yuanbao/chapter3-13.md)    | S→C | 0000           | —                   | —                 | —                 | —       |
| 14  | [DISCONNECT](https://tencent.yuanbao/chapter3-14.md)  | 双向  | 0000           | ✓                   | 单值 / VH           | —                 | —       |
| 15  | [AUTH](https://tencent.yuanbao/chapter3-15.md)        | 双向  | 0000           | ✓                   | 单值 / VH           | —                 | —       |

> 一眼能看出的三件事：只有 **12、13**​ 是纯 Fixed Header；**6、8、10**​ 的低 4 位非零，写错就是 Malformed；**9、11**​ 的 Reason Code 在 Payload 里且是列表，最容易和单值搞混。

1. **公共底座只写一次**：1.5 数据表示、2.1.4 Remaining Length、2.2.1 Packet Identifier、2.2.2 Properties 编码、2.4 共用码表——15 篇全部链过去，不重抄。
2. **每篇只写差异**：本报文允许清单、缺省值、约束、时序位置。规范原句最多引一两句。
3. **表格承担查询价值**，段落只写「为什么这么设计」和自己踩过的坑。
4. **薄报文允许半页**，不补字数；`12`、`13` 写完身份卡和 `C0 00` 就能收。
5. 术语保留英文原名，别沿用 v3 的 Message ID。

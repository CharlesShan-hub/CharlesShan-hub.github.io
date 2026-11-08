---
title: mqtt-pingreq-0312
tags:
  - note
date: 2026-11-06
comment: https://iot.mushuwei.cn/mqtt5/mqtt-pingreq-0312.md
---
# 3.12 PINGREQ – 心跳请求

客户端发送PINGREQ报文给服务端的。用于：

1.  在没有任何其它控制报文从客户端发给服务的时，告知服务端客户端还活着。
2.  请求服务端发送 响应确认它还活着。
3.  使用网络以确认网络连接没有断开。

保持连接（Keep Alive）处理中用到这个报文，详细信息请查看 3.1.2.10节。

## 3.12.1 固定报头

**图例 3.33 – PINGREQ报文固定报头**

| **Bit** | **7**                 | **6**  | **5** | **4** | **3** | **2** | **1** | **0** |
|---------|-----------------------|--------|-------|-------|-------|-------|-------|-------|
| byte 1  | MQTT控制报文类型 (12) | 保留位 |
|         | 1                     | 1      | 0     | 0     | 0     | 0     | 0     | 0     |
| byte 2  | 剩余长度 (0)          |
|         | 0                     | 0      | 0     | 0     | 0     | 0     | 0     | 0     |

<table style="text-align:center">
   <tr>
     <td align="center"><strong>Bit</strong></td>
     <td align="center"><strong>7</strong></td>
     <td align="center"><strong>6</strong></td>
     <td align="center"><strong>5</strong></td>
     <td align="center"><strong>4</strong></td>
     <td align="center"><strong>3</strong></td>
     <td align="center"><strong>2</strong></td>
     <td align="center"><strong>1</strong></td>
     <td align="center"><strong>0</strong></td>
   </tr>
   <tr>
     <td>byte 1</td>
     <td colspan="4" align="center">MQTT控制报文类型 (12)</td>
     <td colspan="4" align="center">保留位</td>
   </tr>
   <tr>
       <td></td>
       <td align="center">1</td>
       <td align="center">1</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
     </tr>
   <tr>
     <td>byte 2</td>
     <td colspan="8" align="center">剩余长度 (0)</td>
   </tr>
   <tr>
       <td></td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
     </tr>
</table>

## 3.12.2 可变报头

PINGREQ报文没有可变报头。

## 3.12.3 有效载荷

PINGREQ报文没有有效载荷。

## 3.12.4 响应

服务端**必须**发送 PINGRESP报文响应客户端的PINGREQ报文 \[MQTT-3.12.4-1\]。




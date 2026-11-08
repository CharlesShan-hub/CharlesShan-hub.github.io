---
title: mqtt-pingresp-0313
tags:
  - note
date: 2026-11-06
comment: https://iot.mushuwei.cn/mqtt5/mqtt-pingresp-0313.md
---
# 3.13 PINGRESP – 心跳响应

服务端发送PINGRESP报文响应客户端的PINGREQ报文。表示服务端还活着。

保持连接（Keep Alive）处理中用到这个报文，详情请查看 3.1.2.10节。

## 3.13.1 固定报头

**图例 3.34 – PINGRESP报文固定报头**

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
     <td colspan="4" align="center">MQTT控制报文类型 (13)</td>
     <td colspan="4" align="center">保留位</td>
   </tr>
   <tr>
       <td></td>
       <td align="center">1</td>
       <td align="center">1</td>
       <td align="center">0</td>
       <td align="center">1</td>
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

## 3.13.2 可变报头

PINGRESP报文没有可变报头。

## 3.13.3 有效载荷

PINGRESP报文没有有效载荷。

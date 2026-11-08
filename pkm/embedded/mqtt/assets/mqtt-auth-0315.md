---
title: mqtt-auth-0315
tags:
  - note
date: 2026-11-06
comment: https://iot.mushuwei.cn/mqtt5/mqtt-auth-0315.md
---
# 3.15 AUTH – 认证交换

AUTH报文被从客户端发送给服务端，或从服务端发送给客户端，作为扩展认证交换的一部分，比如质询/响应认证。如果CONNECT报文不包含相同的认证方法，则客户端或服务端发送AUTH报文将造成协议错误（Protocol Error）。

## 3.15.1 AUTH 固定报头 AUTH Fixed Header

##### 图例 3-35 – AUTH 报文固定报头 AUTH packet Fixed Header

<table style="text-align:center">
   <tr>
     <th width="95">Bit</th>
     <th width="55">7</th>
     <th width="55">6</th>
     <th width="55">5</th>
     <th width="55">4</th>
     <th width="55">3</th>
     <th width="55">2</th>
     <th width="55">1</th>
     <th width="55">0</th>
   </tr>
   <tr>
     <td>byte 1</td>
     <td colspan="4" align="center">MQTT控制报文类型 (15)</td>
     <td colspan="4" align="center">保留位</td>
   </tr>
   <tr>
       <td></td>
       <td align="center">1</td>
       <td align="center">1</td>
       <td align="center">1</td>
       <td align="center">1</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
       <td align="center">0</td>
     </tr>
   <tr>
     <td>byte 2</td>
     <td colspan="8" align="center">剩余长度</td>
   </tr>
 </table>

AUTH报文固定报头第3，2，1，0位是保留位，**必须**全设置为0。客户端或服务端**必须**把其他值当做无效值并关闭网络连接 [MQTT-3.15.1-1]。

**剩余长度字段**  
等于可变报头的长度，编码为变长字节整数。

## 3.15.2 AUTH 可变报头 AUTH Variable Header

AUTH报文可变报头按顺序包含以下字段：认证原因码（Authentication Reason Code），属性（Properties）。属性的编码规则，如2.2.2节所述。

### 3.15.2.1 认证原因码 Authenticate Reason Code

可变报头第0字节是认证原因码（Authenticate Reason Code）。单字节无符号认证原因码字段的值如下所示。AUTH报文的发送端**必须**使用一种认证原因码 \[MQTT-3.15.2-1\]。

表 3-11 – 认证原因码 Authenticate Reason Codes

<table>
  <tr>
    <th>值</th>
    <th width="80">16进制</th>
	<th width="150">原因码名称</th>
	<th>发送端</th>
	<th>说明</th>
  </tr>
  <tr>
    <td>0</td>
    <td>0x00</td>
	<td>成功</td>
	<td>服务端</td>
	<td>认证成功。</td>
  </tr>
  <tr>
    <td>24</td>
    <td>0x18</td>
	<td>继续认证</td>
	<td>客户端或服务端</td>
	<td>继续下一步认证。</td>
  </tr>
  <tr>
    <td>25</td>
    <td>0x19</td>
	<td>重新认证</td>
	<td>客户端</td>
	<td>开始重新认证。</td>
  </tr>
</table>

如果原因码为0x00（成功）并且没有属性字段，则可以省略原因码和属性长度。这种情况下，AUTH报文剩余长度为0。

### 3.15.2.2 AUTH 属性 AUTH Properties

#### 3.15.2.2.1 属性长度 Property Length

AUTH报文可变报头中的属性的长度被编码为变长字节整数。

#### 3.15.2.2.2 认证方法 Authentication Method

**21 (0x15)** ，认证方法（Authentication Method）标识符。  
跟随其后的是一个UTF-8编码字符串，包含认证方法名称。省略认证方法或者包含多个认证方法都将造成协议错误（Protocol Error）。更多关于扩展认证的信息，参考4.12节。

#### 3.15.2.2.3 认证数据 Authentication Data

**22 (0x16)** ，认证数据（Authentication Data）标识符。  
跟随其后的是二进制数据，包含认证数据。包含多个认证数据将造成协议错误（Protocol Error）。此数据的内容由认证方法定义。更多关于扩展认证的信息，参考4.12节。

#### 3.15.2.2.4 原因字符串 Reason String

**31 (0x1F)** ，原因字符串（Reason String）标识符。  
跟随其后的是UTF-8编码字符串，表示断开原因。此原因字符串是为诊断而设计的可读字符串，**不应该**被接收端所解析。

如果加上原因字符串之后的AUTH报文长度超出了接收端所指定的最大报文长度，则发送端不能发送此属性 [MQTT-3.15.2-2]。包含多个原因字符串将造成协议错误（Protocol Error）。

#### 3.15.2.2.5 用户属性 User Property

**38 (0x26)** ，用户属性（User Property）标识符。  
跟随其后的是UTF-8字符串对。此属性可用于向客户端提供包括诊断信息在内的附加信息。如果加上用户属性之后的AUTH报文长度超出了接收端指定的最大报文长度，则服务端**不能**发送此属性 \[MQTT-3.15.2-3\]。用户属性（User Property）允许出现多次，以表示多个名字/值对，且相同的名字可以多次出现。

## 3.15.3 AUTH 载荷 AUTH Payload

AUTH报文没有有效载荷。

更多关于扩展认证的信息，参考4.12节。



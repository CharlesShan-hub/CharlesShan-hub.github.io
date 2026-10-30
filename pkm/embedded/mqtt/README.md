---
title: README
tags:
  - note
date: 2026-10-30
comment:
---

# MQTT

### MQTT 3.1.1 标准

这是目前部署最广泛的版本。

- **官方网址**：<https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html>
- **说明**：该页面是 OASIS 标准的 HTML 在线版本，你可以直接在里面查阅 CONNECT、PUBLISH 等报文的详细字段定义。

### MQTT 5.0 标准

这是最新版本，增加了原因码、用户属性、共享订阅等大量新特性。

- **官方网址**：<https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html>
- **说明**：同样是 OASIS 官方发布的 HTML 版本。5.0 规范在文档开头就明确说明它取代了 3.1.1 版本，建议新项目优先参考此文档 。

## MQTT Broker（消息代理服务器）

### 开源/国际主流
- **Mosquitto**：轻量级 C 语言实现，资源占用极低，边缘网关和嵌入式场景的事实标准，单机性能好但不擅长集群
- **EMQX**：Erlang 编写，单节点百万级连接，原生集群、规则引擎、数据桥接齐全，国内 IoT 平台常用。注意：5.9 起转向 BSL 1.1，单节点免费，集群需商业授权
- **VerneMQ**：Erlang 编写，高可用分布式架构，水平扩展能力强，Apache 2.0 许可
- **BroMQ**：Apache 2.0 全开源，内置 Web UI、REST API、数据库认证、JS 脚本引擎，无功能付费墙，适合想“开箱即用”又不想被许可限制的场景

### 商业/企业级
- **HiveMQ**：Java 实现，企业级集群管理和监控完善，商业授权费用较高，适合停机损失大的高可用场景
- **Solace PubSub+**：事件代理平台，支持 MQTT 及其他协议，提供云托管、软件、硬件多种形态

### 国产/信创
- **NewLife.MQTT**：纯国产 .NET 实现，MIT 开源，客户端+服务端一体，零第三方依赖，内置集群/桥接/规则引擎，支持信创合规
- **TMQP（TiOMQ Platform）**：基于 t-io 框架，宣称单节点百万连接、集群亿级，支持 MQTT/HTTP/CoAP 多协议，华为云商店上架

### 通用消息队列的 MQTT 支持
- **RabbitMQ**：通过插件支持 MQTT，适合已有 RabbitMQ 存量的团队复用，但 MQTT 不是核心，海量连接场景不如专用 Broker

## MQTT 客户端库

### C / 嵌入式
- **Eclipse Paho**：最老牌、覆盖面最广的客户端家族，提供 C、C++、Java、Python、JS 等多语言绑定
- **wolfMQTT**：wolfSSL 出品，小巧快速可移植，支持 TLS 1.3，适合资源受限设备
- **MQTT_Library（RICCIARDI）**：面向 32 位微控制器的精简 C 库

### Java
- **Eclipse Paho Java**：标准选择，HiveMQ 的桌面工具 MQTT.fx 也基于它
- **HiveMQ MQTT Client**：Apache 2.0 开源，API 设计现代，支持 MQTT 5.0

### Python
- **Eclipse Paho Python**：最常用，源自 Mosquitto Python 客户端
- **gmqtt**：异步 Python MQTT 客户端，基于 asyncio

### Go
- **pascaldekloe/mqtt**：轻量 Go 客户端
- **goqtt**：MQTT 3.1.1 实现

### Rust
- **rumqttc**：纯 Rust，健壮高效，支持 3.1.1 和 5.0
- **mqttrs**：异步编解码器

### .NET
- **NewLife.MQTT**：纯国产，MIT 开源，客户端+服务端一体，自动重连重订阅
- **MQTTnet**：社区活跃的 .NET MQTT 库

### 移动端 / 前端
- **CocoaMQTT**：iOS/macOS 的 Swift 客户端
- **MQTT.js**：JavaScript 生态的事实标准，浏览器和 Node.js 通用
- **php-mqtt/client**：PHP 客户端

## MQTT 开发/调试工具

### 桌面客户端
- **MQTTX**：EMQ 开源，跨平台（Win/Mac/Linux），聊天式界面，支持 MQTT 5.0，国内开发者首选
- **MQTT Explorer**：主题层级可视化，适合排查主题结构和订阅关系
- **MQTT.fx**：老牌 Java 客户端，基于 Paho
- **mqtt-spy**：开源监控工具，基于 Paho Java

### 命令行
- **mosquitto_pub / mosquitto_sub**：Mosquitto 自带，最经典的命令行发布/订阅工具

### 测试/压测
- **MQTT X**：内置脚本和压测功能
- **pytest-mqtt**：Python 测试框架插件

**总结一下**：HiveMQ 在 MQTT 社区有影响力，尤其在入门内容和商业 Broker 领域，但它远不是唯一选择。如果你做**边缘轻量部署**，看 Mosquitto；做**大规模国内 IoT 平台**，看 EMQX；做 **.NET/信创项目**，看 NewLife.MQTT；做**开发调试**，用 MQTTX。生态足够多元，完全可以根据场景选型，不必绑定在某一家身上。
---
title: RPC
tags:
  - catalog
date: 2026-10-09
comment:
---
# RPC
## 协议与风格
- SOAP：基于 XML 的老一代 Web 服务协议，重、复杂，基本退场
- REST：基于 HTTP 的轻量级 API 风格，主流 Web API 标准
- gRPC：Google 出品，HTTP/2 + Protobuf，高性能跨语言 RPC
- JSON-RPC：轻量级远程调用协议，请求和响应都是 JSON
- XML-RPC：比 SOAP 更早的 XML 远程调用协议，基本被取代
- Thrift：Facebook 出品，跨语言 RPC 框架，自带 IDL 和序列化

## 主流框架
- gRPC：跨语言首选，云原生生态核心
- Dubbo：阿里出品，Java 生态微服务事实标准，治理能力强
- Feign / Spring Cloud OpenFeign：声明式 HTTP 客户端，Spring Cloud 体系内使用
- Thrift：跨语言，但生态和治理不如 gRPC/Dubbo
---
title: README
tags:
  - catalog
date: 2026-10-13
comment:
---
# 微服务

微服务架构的支撑组件与技术选型速查。

## 框架

| 技术           | 定位          | 特点                                      |
| ------------ | ----------- | --------------------------------------- |
| Spring Cloud | Java 微服务全家桶 | 生态最全，配置中心/网关/熔断/负载均衡一站式，国内主流            |
| Dubbo        | 高性能 RPC 框架  | 常与 Spring Cloud 配合，服务间通信更高效（详见 [[rpc]]） |
| Micronaut    | 云原生框架       | 启动快、内存低，编译期 DI，适合 Serverless            |
| Quarkus      | 云原生框架       | GraalVM 原生镜像友好，启动毫秒级                    |

## 服务网格（Service Mesh）

| 技术 | 定位 | 特点 |
|------|------|------|
| Istio | 功能最全的服务网格 | 基于 Envoy，流量治理/mTLS/可观测性齐全，较重，学习曲线陡 |
| Linkerd | 轻量级服务网格 | Rust 微代理，资源占用低，上手快，适合中小规模 |
| Consul Connect | 服务网格 | 与 Consul 服务发现深度集成，HashiCorp 生态 |

## 服务注册与发现（Service Registry）

| 技术 | 一致性模型 | 特点 |
|------|-----------|------|
| Nacos | AP/CP 可切换 | 服务发现 + 配置管理一体，国内主流 |
| Eureka | AP | Netflix 开源，Spring Cloud 早期默认，已维护模式 |
| Consul | CP | 服务发现 + 健康检查 + KV + 多数据中心 |
| ZooKeeper | CP | Dubbo 早期常用，配置运维复杂（详见 [[big data]]） |
| etcd | CP | Kubernetes 底层存储，轻量高效 |

## API 网关

| 技术 | 定位 | 特点 |
|------|------|------|
| Spring Cloud Gateway | Spring 生态网关 | 响应式，与 Spring Cloud 集成好 |
| Kong | 云原生网关 | 基于 Nginx/OpenResty，插件生态丰富 |
| APISIX | 国产云原生网关 | 高性能，动态路由，插件热加载 |
| Zuul | Netflix 网关 | 早期方案，已逐渐被 Gateway 取代 |

## 熔断与容错

| 技术 | 定位 | 特点 |
|------|------|------|
| Sentinel | 阿里流量治理 | 熔断/限流/降级，控制台可视化，国内主流 |
| Resilience4j | 轻量容错库 | Spring Cloud 官方推荐，函数式，替代 Hystrix |
| Hystrix | Netflix 熔断 | 已停止维护，新项目不建议 |

## 配置中心

| 技术 | 定位 | 特点 |
|------|------|------|
| Nacos | 配置 + 注册一体 | 动态刷新，国内主流 |
| Apollo | 携程配置中心 | 功能强大，权限/灰度/审计完善 |
| Spring Cloud Config | Spring 原生 | 基于 Git，轻量但功能相对简单 |

## 链路追踪

| 技术 | 定位 | 特点 |
|------|------|------|
| SkyWalking | 国产 APM | 无侵入，可视化强，国内常用 |
| Zipkin | 轻量追踪 | Twitter 开源，简单易用 |
| Jaeger | CNCF 追踪 | Uber 开源，云原生生态 |
| OpenTelemetry | 可观测性标准 | 统一 Trace/Metrics/Logs，未来趋势 |

## 相关

- [[rpc]]：Dubbo、gRPC 是服务间通信方案
- [[big data]]：ZooKeeper 可做注册中心，主体归属大数据
- [[message queue]]：异步通信与解耦
- [[orm]]：服务内数据访问层

## 资源链接

- Spring Cloud：spring.io/projects/spring-cloud
- Istio：istio.io
- Linkerd：linkerd.io
- Nacos：nacos.io
- Consul：developer.hashicorp.com/consul
- Sentinel：sentinelguard.io
- SkyWalking：skywalking.apache.org
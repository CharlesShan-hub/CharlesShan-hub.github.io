---
title: A.3.2 Configuring clients
tags:
  - book
date: 2026-10-08
comment:
---
# A.3.2 Configuring clients
The main challenge with connecting to a Pulsar cluster inside a K8s environment is finding the ports that the cluster is listening on. The default binary port, 6650 and HTTP admin port, 8080 are not exposed outside of the K8s environment. Therefore, you first need to determine where these node ports are mapped to.

连接到一个位于 K8s 环境中的 Pulsar 集群时，主要的挑战在于找出该集群正在监听的那些端口。默认的二进制端口 6650 和 HTTP 管理端口 8080，并不会被暴露到 K8s 环境之外。因此，你首先需要确定这些节点端口被映射到了哪里。

By default, the Pulsar Helm chart exposes the Pulsar cluster through a Kubernetes load balancer. In minikube, you can use the command shown in listing A.14 to check the proxy service. The output from this command will tell us which node ports the Pulsar cluster’s binary port and HTTP port are mapped to. The port after 80: is the HTTP port, while the port after 6650: is the binary port.

默认情况下，Pulsar Helm chart 通过一个 Kubernetes 负载均衡器把这个 Pulsar 集群暴露出来。在 minikube 中，你可以用清单 A.14 中所示的命令来查看那个 proxy 服务。这条命令的输出会告诉我们：该 Pulsar 集群的二进制端口和 HTTP 端口分别被映射到了哪些节点端口。`80:` 之后的那个端口是 HTTP 端口，而 `6650:` 之后的那个端口是二进制端口。

Listing A.14 Determining the Pulsar Client ports

```bash
$kubectl get services -n pulsar | grep pulsar-mini-proxy             ❶
 
pulsar-mini-proxy            LoadBalancer   10.110.67.72     <pending>     
 80:30210/TCP,6650:32208/TCP   4h16m                                 ❷
 
$minikube service pulsar-mini-proxy -n pulsar --url                  ❸
http://192.168.64.3:30210                                            ❹
http://192.168.64.3:32208                                            ❺
```

❶ Command to determine port mappings

❶ 用于确定端口映射的命令。

❷ The output tells us port 80 is mapped to port 30210, and port 6650 is mapped to port 32208.

❷ 该输出告诉我们：80 端口被映射到了 30210 端口，而 6650 端口被映射到了 32208 端口。

❸ Command to find the IP address of the exposed ports inside minikube

❸ 用于在 minikube 内部查找这些已暴露端口的 IP 地址的命令。

❹ The proxy’s HTTP URL

❹ 该 proxy 的 HTTP URL。

❺ The proxy’s binary URL

❺ 该 proxy 的二进制 URL。

At this point, you have service URLs you need to connect your clients to the Pulsar cluster running inside minikube, and you can use them, along with required security tokens that we generated earlier when configuring your Pulsar clients to interact with the cluster.

至此，你就拿到了把客户端连接到运行在 minikube 内部那个 Pulsar 集群所需的服务 URL；你可以用它们，连同我们先前在配置你的 Pulsar 客户端与集群交互时所生成的那些必需的安全令牌，一起来完成连接。

---
title: A.3.1 Administering Pulsar on Kubernetes
tags:
  - book
date: 2026-10-08
comment:
---
# A.3.1 Administering Pulsar on Kubernetes
Once you have deployed a Pulsar cluster to a Kubernetes environment, one of your first concerns will be deciding how to administer the pulsar cluster. Fortunately, the Pulsar Helm chart creates a pod named pulsar-mini-toolset-0 that contains the pulsar-admin CLI tool, which is already configured to interact with the deployed Pulsar cluster. Consequently, all that is required to administer the cluster is to use the kubectl exec command to access the pod and execute the commands directly against the cluster, as shown in the following listing.

一旦你把 Pulsar 集群部署到了一个 Kubernetes 环境中，你最先关心的问题之一，就是决定该如何管理这个 Pulsar 集群。所幸，Pulsar 的 Helm chart 会创建一个名为 pulsar-mini-toolset-0 的 pod，其中包含 pulsar-admin 这个 CLI 工具——它已经被配置为可以与那个已部署的 Pulsar 集群交互。因此，要管理这个集群，所需做的一切就是用 `kubectl exec` 命令进入该 pod，然后直接对集群执行命令，如下面这份清单所示。

Listing A.13 Administering Pulsar on Kubernetes

```bash
kubectl exec -it -n pulsar pulsar-mini-toolset-0 /bin/bash
 
bin/pulsar-admin tenants create manning  
 
bin/pulsar-admin tenants list   
  
"manning"
"public"
"pulsar"
```

Since the pulsar-admin CLI tool is the same for both the Kubernetes cluster and the Docker standalone container, the docker exec and kubectl exec commands can be used interchangeably throughout this book if you choose to follow the examples using Kubernetes rather than Docker. For more details on the pulsar-admin CLI, please refer to the documentation.

由于 pulsar-admin 这个 CLI 工具在 Kubernetes 集群中和在 Docker 独立容器中是完全相同的，因此如果你选择用 Kubernetes 而不是 Docker 来跟着本书的示例走，那么 `docker exec` 和 `kubectl exec` 这两个命令在全书范围内是可以互换使用的。有关 pulsar-admin CLI 的更多细节，请参阅相关文档。

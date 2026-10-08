---
title: A.3 Using the Pulsar Helm chart
tags:
  - book
date: 2026-10-08
comment:
---
## A.3 Using the Pulsar Helm chart

Now that we have downloaded and examined the Pulsar Helm chart, the next step is to use it to provide our Pulsar cluster. The first step in this process is to add the Pulsar Helm chart to your local Helm repository and initialize it, as shown in the following listing. This will allow your local Helm client to locate and download the Pulsar Helm chart.

既然我们已经下载并查看过那个 Pulsar Helm chart，下一步就是用它来提供我们的 Pulsar 集群。这个过程的第一步，是把 Pulsar Helm chart 添加到你本地的 Helm 仓库并初始化它，如下面这份清单所示。这将让你本地的 Helm 客户端能够定位并下载这个 Pulsar Helm chart。

Listing A.11 Adding the Pulsar Helm chart to your Helm repository

```bash
helm repo add apache https://pulsar.apache.org/charts            ❶
 
./scripts/pulsar/prepare_helm_release.sh \
 --create-namespace \                                            ❷
 --namepsace pulsar \                                            ❸
 --release pulsar-mini                                           ❹
 
namespace/pulsar created
generate the token keys for the pulsar cluster                   ❺
The private key and public key are generated to /var/folders/zw/
x39hv0dd7133w9v9cgnt1lvr0000gn/T/tmp.QT3EjywR and 
/var/folders/zw/x39hv0dd7133w9v9cgnt1lvr0000gn/T/tmp.YkhhbAyG 
successfully.
secret/pulsar-mini-token-asymmetric-key created
generate the tokens for the super-users: proxy-admin,broker-admin,admin
generate the token for proxy-admin
secret/pulsar-mini-token-proxy-admin created
generate the token for broker-admin
secret/pulsar-mini-token-broker-admin created
generate the token for admin
secret/pulsar-mini-token-admin created                            ❻
-------------------------------------
 
The jwt token secret keys are generated under:                    ❼
    - 'pulsar-mini-token-asymmetric-key'
 
The jwt tokens for superusers are generated and stored as below:   ❽
    - 'proxy-admin':secret('pulsar-mini-token-proxy-admin')
    - 'broker-admin':secret('pulsar-mini-token-broker-admin')
    - 'admin':secret('pulsar-mini-token-admin')
```

❶ Add the Pulsar Helm repo to your local Helm repo.

❶ 把 Pulsar 的 Helm 仓库添加到你本地的 Helm 仓库。

❷ Instruct Helm to create the Kubernetes namespace.

❷ 指示 Helm 创建那个 Kubernetes 命名空间。

❸ The name of the Kubernetes namespace to create

❸ 要创建的 Kubernetes 命名空间的名称。

❹ The Pulsar release name

❹ 这个 Pulsar release 的名称。

❺ Generating the public and private token files

❺ 生成公钥与私钥文件。

❻ Generating the tokens for the various admin users

❻ 为各个管理员用户生成令牌。

❼ Generating the JWT secret

❼ 生成 JWT 密钥。

❽ Generating the JWT access tokens

❽ 生成各个 JWT 访问令牌。

The final step in the process is to use Helm to install the Pulsar cluster, as shown in the following listing. It is important to specify initialize=true when installing a Pulsar release for the first time because it will ensure that the cluster metadata for both BookKeeper and Pulsar is properly initialized.

这个过程的最后一步，是用 Helm 来安装那个 Pulsar 集群，如下面这份清单所示。在第一次安装一个 Pulsar release 时，指定 `initialize=true` 是很重要的，因为它会确保 BookKeeper 与 Pulsar 两者的集群元数据都被妥善初始化。

Listing A.12 Install Pulsar using the Helm chart

```bash
helm install \
--set initialize=true \                 ❶
--values examples/values-minikube.yaml \ ❷
pulsar-mini \                            ❸
apache/pulsar                            ❹
 
kubectl get pods -n pulsar -o name       ❺
pod/pulsar-mini-bookie-0
pod/pulsar-mini-bookie-init-94r5z
pod/pulsar-mini-broker-0
pod/pulsar-mini-grafana-6746b4bf69-bjtff
pod/pulsar-mini-prometheus-5556dbb8b8-m8287
pod/pulsar-mini-proxy-0
pod/pulsar-mini-pulsar-init-dmztl
pod/pulsar-mini-pulsar-manager-6c6889dff-q9t5q
pod/pulsar-mini-toolset-0
pod/pulsar-mini-zookeeper-0
```

❶ Request that the cluster metadata be initialized.

❶ 请求初始化集群元数据。

❷ The values file to use

❷ 要使用的 values 文件。

❸ The unique name for this cluster

❸ 这个集群的唯一名称。

❹ The Helm chart to use

❹ 要使用的 Helm chart。

❺ List all the pods created for the Pulsar cluster.

❺ 列出为这个 Pulsar 集群所创建的全部 pod。

After Helm has completed the installation process, you can use the kubectl tool to list all of the pods created for the Pulsar cluster and validate that the necessary services are up and running, get the IP addresses, etc.

在 Helm 完成安装过程之后，你可以用 kubectl 这个工具列出为该 Pulsar 集群所创建的全部 pod，并验证各项必需的服务是否已启动并正常运行、获取它们的 IP 地址等等。


## 子目录

- [A.3.1 Administering Pulsar on Kubernetes](<a.3-using-the-pulsar-helm-chart/a.3.1-administering-pulsar-on-kubernetes.md>)
- [A.3.2 Configuring clients](<a.3-using-the-pulsar-helm-chart/a.3.2-configuring-clients.md>)

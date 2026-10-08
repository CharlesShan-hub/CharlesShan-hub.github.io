---
title: A.1.2 Minikube
tags:
  - book
date: 2026-10-08
comment:
---
# A.1.2 Minikube
Once kubectl has been installed, the next step is to create a Kubernetes cluster to host the Pulsar cluster. While all of the major cloud vendors provide Kubernetes environments that are well-suited for production use, in this appendix I will use a more cost-effective alternative known as minikube, which allows me to run a Kubernetes cluster on my development machine.

一旦 kubectl 安装完毕，下一步就是创建一个 Kubernetes 集群来托管那个 Pulsar 集群。虽然所有主流云厂商都提供很适合生产使用的 Kubernetes 环境，但在本附录中，我将使用一种更具成本效益的替代方案，即 minikube——它让我能够在自己的开发机上运行一个 Kubernetes 集群。

minikube is a tool that runs a single-node Kubernetes cluster on your personal computer. It is well suited for day-to-day development tasks that require access to a containerized application, such as Pulsar. It is a good choice if you want to develop and test your application inside a Kubernetes environment to familiarize yourself with the Kubernetes API.

minikube 是一个能让你在个人电脑上运行单节点 Kubernetes 集群的工具。它非常适合那些需要访问某个容器化应用（例如 Pulsar）的日常开发任务。如果你想在一个 Kubernetes 环境内开发和测试自己的应用，以便熟悉 Kubernetes 的 API，那么它是一个不错的选择。

Listing A.2 Installing minikube on a MacBook

```bash
brew install minikube                                                ❶
. . .
==> Downloading https://homebrew.bintray.com/bottles/minikube-
    1.13.0.catalina.bottle.tar.gz                                    ❷
Already downloaded: /Users/david/Library/Caches/Homebrew/downloads/
b4e7b1579cd54deea3070d595b60b315ff7244ada9358412c87ecfd061819d9b--
minikube-1.13.0.catalina.bottle.tar.gz
==> Pouring minikube-1.13.0.catalina.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
 
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
![](assets/cup1.png)  /usr/local/Cellar/minikube/1.13.0: 8 files, 62.2MB
```

❶ Using Homebrew to install minikube

❶ 使用 Homebrew 安装 minikube。

❷ Downloading and installing version 1.13.0

❷ 下载并安装 1.13.0 版本。

If you don’t already have minikube installed, you should download it (https://minikube.sigs.k8s.io/docs/start/) and follow the instructions for your operating system. If you have a Mac, you can use the Homebrew package manager to install it using a single line, as shown in listing A.2. If you are using a different operating system, please consult the online documentation for installation instructions specific to your OS. After minikube has been installed, the next step is to create a Kubernetes cluster using the commands shown in the following listing. The first command creates the cluster itself and specifies the resources it will claim from my laptop for its resource pool.

如果你还没有安装 minikube，应当去下载它（https://minikube.sigs.k8s.io/docs/start/），并按照针对你操作系统的说明操作。如果你用的是 Mac，那么可以使用 Homebrew 这个包管理器，只用一行命令就把它装上，如清单 A.2 所示。如果你用的是其他操作系统，请查阅在线文档，以获取针对你所使用操作系统的安装说明。minikube 安装完毕之后，下一步就是用下面这份清单中所示的命令来创建一个 Kubernetes 集群。第一条命令创建集群本身，并指定它将从我的笔记本电脑上为它自己的资源池认领哪些资源。

Listing A.3 Creating a Kubernetes cluster using minikube

```bash
    minikube start \
  --memory=8192 \                           ❶
  --cpus=4 \                                ❷
  --kubernetes-version=v1.19.0              ❸
 
kubectl config use-context minikube         ❹
```

❶ Reserve 8 GB of RAM for the cluster.

❶ 为这个集群预留 8 GB 内存。

❷ Reserve four cores for the cluster.

❷ 为这个集群预留四个核。

❸ Specify the version of Kubernetes we will be using.

❸ 指定我们将要使用的 Kubernetes 版本。

❹ Set kubectl to use minikube.

❹ 把 kubectl 设置为使用 minikube。

In order for the kubectl tool to find and access a Kubernetes cluster, it must first be configured to point to the Kubernetes cluster you wish to interact with. This association is controlled by a kubeconfig file, which is created automatically when you deploy a minikube cluster and is located at ~/.kube/config. You can use the kubectl config use-context <cluster-name> command, as shown in listing A.3, to configure the kubectl tool to point to the newly created minikube cluster. You can confirm that the kubectl is properly configured by running the kubectl cluster-info command, which will return basic information about the Kubernetes cluster.

为了让 kubectl 这个工具能找到并访问一个 Kubernetes 集群，必须先把配置为指向你所希望交互的那个 Kubernetes 集群。这种关联关系由一个 kubeconfig 文件控制；当你部署一个 minikube 集群时，该文件会被自动创建，并位于 ~/.kube/config。你可以使用 `kubectl config use-context <cluster-name>` 命令（如清单 A.3 所示），把 kubectl 工具配置为指向那个新建的 minikube 集群。你可以运行 `kubectl cluster-info` 命令来确认 kubectl 已被正确配置——该命令会返回关于这个 Kubernetes 集群的基本信息。

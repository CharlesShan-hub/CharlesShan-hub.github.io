---
title: A.2 The Pulsar Helm chart
tags:
  - book
date: 2026-10-08
comment:
---
## A.2 The Pulsar Helm chart

Now that we have a Kubernetes cluster up and running, we can deploy containerized applications on top of it. This can be accomplished with a deployment configuration file that contains all the information needed to create all the containers required by your application. These deployment configuration files are simple YAML files that conform to a specific structure, as shown in the following listing, which shows the configuration for a single Ngnix-based web server that listens on port 80 for incoming requests.

既然我们已经有一个 Kubernetes 集群在正常运行了，就可以在它之上部署容器化应用了。这可以借助一个部署配置文件来完成——该文件包含了创建你的应用所需的全部容器所需要的全部信息。这些部署配置文件就是遵循某种特定结构的简单 YAML 文件，如下面这份清单所示；该清单展示了一个基于 Ngnix 的单一 Web 服务器的配置，它监听 80 端口以接收 incoming 的请求。

Listing A.4 A Kubernetes deployment configuration file

```yaml
apiVersion: apps/v1               ❶
kind: Deployment                  ❷
metadata:
  name: mysite                    ❸
  labels:
    name: mysite
spec:
  replicas: 1                     ❹
  template:
    metadata:
      labels:
        app: mysite
    spec:
      containers:                 ❺
        - name: mysite
          image: ngnix            ❻
          resources:              ❼
            limits: 
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 80   ❽
```

❶ Specifies the API version of the configuration file

❶ 指定该配置文件的 API 版本。

❷ Specifies the resource type defined in the configuration file

❷ 指定该配置文件中所定义的资源类型。

❸ The application name

❸ 应用的名称。

❹ The number of pods to create

❹ 要创建的 pod 数量。

❺ Specifies all of the containers inside each pod

❺ 指定每个 pod 内部的全部容器。

❻ The Docker image name to use

❻ 要使用的 Docker 镜像名称。

❼ The resources required for the nginx container

❼ nginx 容器所需的各项资源。

❽ The exposed port for the container

❽ 该容器暴露出来的端口。

Once you have created this file, you can then use the kubectl apply -f filename command to deploy it to your Kubernetes cluster. While this approach is relatively straightforward, it is a bit tedious to have to create and edit all of these verbose files manually. As you can see, the deployment file for a simple, single-container application requires 22 lines of YAML. You can just image how big and complex the deployment file is going to be for an application as complex as Pulsar, which requires multiple instances of multiple containers (brokers, bookies, ZooKeeper, etc.).

一旦你创建好了这个文件，就可以用 `kubectl apply -f filename` 命令把它部署到你的 Kubernetes 集群上。虽然这种做法相对直截了当，但不得不手动创建和编辑所有这些冗长的文件，是有点乏味的。正如你所看到的，一个简单、单容器应用的部署文件就需要 22 行 YAML。你可以想象一下：对于像 Pulsar 这样复杂的应用，它的部署文件会有多大、多复杂——Pulsar 需要多个容器的多个实例（broker、bookie、ZooKeeper 等等）。

Kubernetes-orchestrated container applications can be complex to deploy. Developers can use incorrect inputs for configuration files or not have the expertise to roll out these apps from YAML templates. Therefore, a deployment tool known as Helm was created to simplify the deployment of containerized applications to Kubernetes.

由 Kubernetes 编排的容器化应用，部署起来可能很复杂。开发人员可能会为配置文件填入不正确的输入，或者并不具备从 YAML 模板推出这些应用的专业知识。因此，人们创建了一个名为 Helm 的部署工具，用以简化把容器化应用部署到 Kubernetes 的过程。


## 子目录

- [A.2.1 What is Helm?](<a.2-the-pulsar-helm-chart/a.2.1-what-is-helm_.md>)
- [A.2.2 The Pulsar Helm chart](<a.2-the-pulsar-helm-chart/a.2.2-the-pulsar-helm-chart.md>)

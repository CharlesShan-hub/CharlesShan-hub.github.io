---
title: A.2.1 What is Helm?
tags:
  - book
date: 2026-10-08
comment:
---
# A.2.1 What is Helm?
Helm is a package manager for Kubernetes that allows developers to easily package, configure, and deploy applications and services onto Kubernetes clusters. It is analogous to Linux package managers such as *YUM* or *APT* because they all allow you to deploy a software package, along with all its dependencies, with a simple command.

Helm 是 Kubernetes 的一个包管理器，它让开发人员能够轻松地把应用和服务打包、配置并部署到 Kubernetes 集群上。它类似于 Linux 上的那些包管理器，例如 *YUM* 或 *APT*——因为它们都允许你用一条简单的命令，就部署一个软件包连同它的全部依赖项。

We will be using Helm to install our Pulsar cluster, so if you don’t already have Helm installed, you should install it now. If you have a Mac, you can use the Homebrew package manager to install it using a single line, as shown in the following listing. If you are using a different operating system, please consult the online documentation (https://helm.sh/docs/intro/install/) for installation instructions specific to your OS.

我们将使用 Helm 来安装自己的 Pulsar 集群，因此如果你还没有安装 Helm，现在就应该把它装上。如果你用的是 Mac，那么可以使用 Homebrew 这个包管理器，只用一行命令就把它装上，如下面这份清单所示。如果你用的是其他操作系统，请查阅在线文档（https://helm.sh/docs/intro/install/），以获取针对你所使用操作系统的安装说明。

Listing A.5 Installing Helm on a MacBook

```bash
brew install helm                                     ❶
. . .
==> Downloading https://homebrew.bintray.com/bottles/
    helm-3.3.1.catalina.bottle.tar.gz                 ❷
Already downloaded: /Users/david/Library/Caches/Homebrew/downloads/
77e13146a8989356ceaba3a19f6ee6a342427d88975394c91a263ae1c35a3eb6--helm-
3.3.1.catalina.bottle.tar.gz
==> Pouring helm-3.3.1.catalina.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
 
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
![](assets/cup1.png)  /usr/local/Cellar/helm/3.3.1: 56 files, 40.3MB
```

❶ Using Homebrew to install Helm

❶ 使用 Homebrew 安装 Helm。

❷ Downloading and installing version 3.3.1

❷ 下载并安装 3.3.1 版本。

Helm allows us to package Kubernetes applications into packages of preconfigured Kubernetes resources, known as *charts*. Helm charts provide push button deployment and deletion of apps, making development and deployment of Kubernetes applications easier for those with little or no container or microservices experience.

Helm 让我们能够把 Kubernetes 应用打包成由预先配置好的 Kubernetes 资源所构成的包，即所谓的 *chart*。Helm chart 提供了"一键式"的应用部署与删除，让那些几乎没有或完全没有容器、微服务经验的人，也能更轻松地开发和部署 Kubernetes 应用。

Anatomy of a Helm chart

一个 Helm chart 的构造

A Helm chart is basically a collection of files inside a directory. The directory name is used as the name of the chart. Within this directory, the Helm chart directory contains a self-descriptor file named chart.yaml, a values.yaml file, and one or more manifest files that are stored in the chart’s template folder, as shown in the following listing.

一个 Helm chart 基本上就是一个目录内的一组文件。这个目录名被用作该 chart 的名称。在这个目录内部，Helm chart 目录包含一个名为 chart.yaml 的自描述文件、一个 values.yaml 文件，以及一个或多个存放在该 chart 的 template 文件夹中的清单文件，如下面这份清单所示。

Listing A.6 The Helm chart directory layout

```text
package-name/
   charts/
   templates/          ❶
   Chart.yaml          ❷
   values.yaml         ❸
   requirements.yaml   ❹
```

❶ Folder of manifest files

❶ 存放清单文件的文件夹。

❷ The self-descriptor file

❷ 那个自描述文件。

❸ Default values used in the templates

❸ 各个模板中所使用的默认值。

❹ Optional list of dependencies

❹ 可选的依赖列表。

The Helm chart uses the YAML templates for application configuration with a separate value.yaml file to store all the values, which are injected into the template YAML at the time of installation. Essentially, Helm charts can be thought of as Kubernetes files that can be parameterized.

Helm chart 使用这些 YAML 模板来做应用配置，并配以一个单独的 value.yaml 文件来存放全部取值——这些值会在安装时被注入到那些模板 YAML 中。本质上，Helm chart 可以被理解为一些可被参数化的 Kubernetes 文件。

When your chart is ready for deployment, you can use the helm package <chartname> command to create a tar-gzipped file containing all the files. Once all this is packaged into a Helm chart, anyone can use it, using the helm install command and providing custom values to the configurations via an external values file or as an argument to the helm install command, and those values are used while creating the Kubernetes application by running the helm install <chartname> command.

当你的 chart 准备好可以部署时，你可以用 `helm package <chartname>` 命令来创建一个包含全部文件的 tar.gz 压缩包。一旦所有这些被打包进一个 Helm chart，任何人都可以使用它——办法是使用 `helm install` 命令，并通过一个外部 values 文件、或作为 `helm install` 命令的一个参数，来为各项配置提供自定义取值；而通过运行 `helm install <chartname>` 命令来创建那个 Kubernetes 应用时，就会用到这些值。

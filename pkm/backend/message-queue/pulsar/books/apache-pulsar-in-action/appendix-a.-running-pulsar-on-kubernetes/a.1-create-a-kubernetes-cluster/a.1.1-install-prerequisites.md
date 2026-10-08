---
title: A.1.1 Install prerequisites
tags:
  - book
date: 2026-10-08
comment:
---
# A.1.1 Install prerequisites
As a prerequisite for working with Kubernetes, you will need to install the Kubernetes command-line tool called kubectl, which allows you to run commands against Kubernetes clusters. You will need this tool to deploy applications, inspect and manage cluster resources, and view logs. If you don’t already have kubectl installed, you should download it (https://kubernetes.io/docs/tasks/tools/#before-you-begin) and follow the instructions for your operating system.

作为使用 Kubernetes 的一项前置条件，你需要安装那个名为 kubectl 的 Kubernetes 命令行工具，它让你能够对 Kubernetes 集群执行命令。你将需要这个工具来部署应用、检视和管理集群资源，以及查看日志。如果你还没有安装 kubectl，应当去下载它（https://kubernetes.io/docs/tasks/tools/#before-you-begin），并按照针对你操作系统的说明操作。

Listing A.1 Installing kubectl on a MacBook

```bash
brew install kubectl                                        ❶
. . .
==> Downloading https://homebrew.bintray.com/bottles/
    kubernetes-cli-1.19.1.catalina.bottle.tar.gz            ❷
==> Pouring kubernetes-cli-1.19.1.catalina.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
 
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
    /usr/local/Cellar/kubernetes-cli/1.19.1: 231 files, 49MB
```

❶ Using Homebrew to install kubectl

❶ 使用 Homebrew 安装 kubectl。

❷ Downloading and installing version 1.19.1

❷ 下载并安装 1.19.1 版本。

If you have a Mac, you can use the Homebrew package manager to install it using a single line, as shown in listing A.1. If you are using a different operating system, please consult the online documentation for installation instructions specific to your OS. You must use a kubectl version that is within one minor version difference of your cluster. Therefore, it is best to use the latest version of kubectl to avoid any compatibility issues.

如果你用的是 Mac，那么可以使用 Homebrew 这个包管理器，只用一行命令就把它装上，如清单 A.1 所示。如果你用的是其他操作系统，请查阅在线文档，以获取针对你所使用操作系统的安装说明。你所使用 kubectl 的版本，与你集群的版本之间必须相差在一个次版本号之内。因此，最好使用最新版本的 kubectl，以避免任何兼容性问题。

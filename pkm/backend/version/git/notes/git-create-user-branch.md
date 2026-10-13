---
title:
tags:
date:
comment:
---

# 创建user分支

git branch user

```

可以从硬盘文件中查看分支：`.git\refs\heads`

![1766971499676-9b5d1c0c-c139-4c56-b665-d31574cfb8dc.png](../assets/1766971499676-9b5d1c0c-c139-4c56-b665-d31574cfb8dc.png)

### 查看当前分支状态

```shell

git branch -v

```

![1766971595334-f61d0b53-aaf7-4ac6-911d-1c2c5900594c.png](../assets/1766971595334-f61d0b53-aaf7-4ac6-911d-1c2c5900594c.png)

上图表示当前正在 master 分支上。

### 切换分支

```shell

git checkout user
git branch -v

```

![1766971708381-a710c49c-6648-48f1-8733-d37d86cc1b0b.png](../assets/1766971708381-a710c49c-6648-48f1-8733-d37d86cc1b0b.png)

### 创建分支的同时切换分支

```shell

git checkout -b order

```

![1766971858926-eeb81773-4c5d-4d70-a835-644c10bb89ab.png](../assets/1766971858926-eeb81773-4c5d-4d70-a835-644c10bb89ab.png)

### 删除分支

```shell

git branch -d user

```

![1766971875628-5cf1e48f-4b51-42a9-a29c-82d84d8e02c0.png](../assets/1766971875628-5cf1e48f-4b51-42a9-a29c-82d84d8e02c0.png)

### 基于某个历史记录创建分支

```shell

git checkout -b <新分支名> <历史提交id>


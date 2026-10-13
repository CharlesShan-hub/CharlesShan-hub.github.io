---
title:
tags:
date:
comment:
---

# 提交当前目录下所有被git跟踪的文件

git commit -m 新增文件

```

![1766967501244-19c99616-f517-4e5c-b042-4fc484f8e05f.png](../assets/1766967501244-19c99616-f517-4e5c-b042-4fc484f8e05f.png)

### 查看当前仓库的历史提交记录

我们再创建一个 b.txt 文件，让后提交该文件到仓库。

```shell

touch b.txt
git add b.txt
git commit -m 新增b文件 b.txt

```

通过这个命令可以查看当前仓库的历史提交记录。

```shell

git log

```

**将提交历史**以一行的紧凑格式**显示，每条提交只显示**提交哈希的前7位**和**提交信息**。**

![1766967896899-29fc2799-a29e-4125-b6f0-2db7f87ade62.png](../assets/1766967896899-29fc2799-a29e-4125-b6f0-2db7f87ade62.png)

### 修改文件并提交

修改 `a.txt`文件，内容随便写。然后再查看仓库的状态。

```shell

git status

```

将修改后的文件添加到暂存区。

```shell

git add a.txt

```

将修改后的文件提交到仓库。

```shell

git commit -m 修改a文件 a.txt

```

查看仓库的历史提交记录。

```shell

git log

```

![1766968337827-d4260e93-79a4-4478-b257-5855bec36df8.png](../assets/1766968337827-d4260e93-79a4-4478-b257-5855bec36df8.png)

### 删除文件并提交

**删除 b.txt 文件，查看仓库当前状态**

```shell

rm -rf b.txt
git status

```

![1766968459527-653be6bb-4510-45cd-8534-40e48c8fd795.png](../assets/1766968459527-653be6bb-4510-45cd-8534-40e48c8fd795.png)

**将删除操作提交到暂存区：**

```shell

git add b.txt
git status

```

![1766968515551-67f4a9ab-6b09-49da-827d-87a652d559b7.png](../assets/1766968515551-67f4a9ab-6b09-49da-827d-87a652d559b7.png)

**将删除操作提交到仓库：**

```shell

git commit -m 删除b文件

```

### 误删除的第一种恢复

新建文件，添加到暂存区，添加到仓库。然后删除该文件。如何恢复？使用 `git restore`命令即可。

```shell

touch Hello.java
git add Hello.java
git commit -m 新增Hello文件
rm -rf Hello.java
git restore Hello.java

```

你需要知道的是：删除其实并不会真正的删除文件，历史操作中还有。

### 误删除的第二种恢复

有一种特殊情况，上面的删除操作之后，并没有将删除操作提交，如果删除后并且提交了删除操作会怎样？

```shell

rm -rf Hello.java
git add Hello.java
git commit -m 删除Hello

```

这个时候再按照上面的恢复方式就无法恢复了：

```shell

git restore Hello.java

```

![1766969550776-39e9079d-f0d1-4f11-9917-184297965073.png](../assets/1766969550776-39e9079d-f0d1-4f11-9917-184297965073.png)

那怎么办呢？可以通过重新到上一个版本来实现这个功能：

```shell

git log --oneline

```

![1766969691174-8c19abad-96cb-4690-856a-1ddc57715dc5.png](../assets/1766969691174-8c19abad-96cb-4690-856a-1ddc57715dc5.png)

重置到指定版本：

```shell

git reset --hard 733c3fa

```

![1766969786374-05ec10a9-223d-42ac-bdca-9e7b3cf03fe8.png](../assets/1766969786374-05ec10a9-223d-42ac-bdca-9e7b3cf03fe8.png)

可以看到文件恢复了：

![1766969803938-0dcebce9-6660-482c-ac4a-21476db6a005.png](../assets/1766969803938-0dcebce9-6660-482c-ac4a-21476db6a005.png)

不过这种重置方式会导致历史提交丢失，通过 `git log --oneline`可以清楚的看到，上一次的历史提交丢失了：

```shell

git log --oneline

```

以前是这样的：

![1766970060299-4679db88-65ee-4331-a1db-6284b09aaafe.png](../assets/1766970060299-4679db88-65ee-4331-a1db-6284b09aaafe.png)

现在是这样的：

![1766970082750-aa3a10f6-6064-4fbd-8902-fa51b9dcb54e.png](../assets/1766970082750-aa3a10f6-6064-4fbd-8902-fa51b9dcb54e.png)

### 误删除的第三种恢复

下面这种方式可以实现，恢复删除的内容，并且之前的历史提交不丢失，底层会对你这一次的恢复动作单独创建一个提交记录：

```shell

rm -rf Hello.java
git add Hello.java
git commit -m 删除Hello

```

此时查看仓库以及仓库历史操作记录：

```shell

ls


---
title: redis
tags:
  - note
date: 2026-10-29
comment:
---
# Redis on Windows

## 安装
使用scoop安装redis:
```powershell
scoop install redis
```

安装后可以验证版本：
```powershell
redis-server --version
```

## 局域网访问
`scoop update redis` 会覆盖`current\redis.conf` ，所以先复制到稳定位置：
```powershell
# 复制 redis 安装路径
$redis = scoop prefix redis
# 新建 data 文件夹
New-Item -ItemType Directory -Force "$redis\..\data" | Out-Null
# 复制配置文件 redis.conf 到稳定的文件夹
Copy-Item "$redis\redis.conf" "$redis\..\data\redis.conf" -Force
```

不需要密码，ip放开：
```powershell
# 复制新配置文件 redis.conf 目录
$conf = "$redis\..\data\redis.conf"
# 修改配置（可重复执行）
(Get-Content $conf) -replace '^bind 127\.0\.0\.1 -::1$','bind 0.0.0.0' -replace '^protected-mode (yes|no)$','protected-mode no' -replace '^requirepass\s+\S+$','# requirepass foobared' | Set-Content $conf
# 验证配置内容
Select-String '^bind |^protected-mode |^requirepass ' $conf
```

需要密码，ip放开：
```powershell
# 复制新配置文件 redis.conf 目录
$conf = "$redis\..\data\redis.conf"
# 密码（改这里）
$redisPass = "123456"
# 修改配置（可重复执行）
(Get-Content $conf) -replace '^bind 127\.0\.0\.1 -::1$','bind 0.0.0.0' -replace '^protected-mode (yes|no)$','protected-mode yes' -replace '^#?\s*requirepass\s+\S+$',"requirepass $redisPass" | Set-Content $conf
# 验证配置内容
Select-String '^bind |^protected-mode |^requirepass ' $conf
```

## 开机自启

需要安装[nssm](nssm.md)
```powershell
scoop install nssm
```

设置开机自启（请使用管理员窗口，不要一口气粘贴，需要一条一条执行）
```powershell
$redis = scoop prefix redis
$conf  = (Resolve-Path "$redis\..\data\redis.conf").Path
$msys  = "/cygdrive/" + $conf[0].ToString().ToLower() + (($conf.Substring(2)) -replace '\\','/')

nssm install Redis "$redis\redis-server.exe" $msys
nssm set Redis Start SERVICE_AUTO_START
Start-Service Redis
```

验证是否生效
```powershell
Get-Service Redis | Select-Object Status,StartType
# Status StartType
# ------ ---------
#Running Automatic
```

删掉这个自动启动可以使用
```powershell
nssm remove Redis confirm
```
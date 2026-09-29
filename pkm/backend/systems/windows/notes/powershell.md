# CMD ↔ PowerShell 对照表

## 核心差异（先记这个）

| 维度 | CMD | PowerShell |
|------|-----|------------|
| 本质 | 字符串流 | 对象流 |
| 参数符号 | `/`（`/all`、`/?`） | `-`（`-Force`、`-?`） |
| 帮助 | `命令 /?` | `Get-Help 命令` |
| 大小写 | 不敏感 | 不敏感 |
| 跨盘切换 | `cd /D D:\foo` | `cd D:\foo` |
| 脚本 | `.bat` / `.cmd` | `.ps1` |

> 命令名通用 ≠ 参数通用。带参数时，用 PowerShell 原生写法。

---

## 目录操作

| CMD | PowerShell | 说明 |
|-----|------------|------|
| `dir` | `Get-ChildItem`（别名 `ls`/`gci`） | 列目录 |
| `dir /a` | `Get-ChildItem -Force` | 含隐藏项 |
| `cd D:\foo` | `Set-Location D:\foo`（别名 `cd`/`sl`） | 切目录 |
| `cd /D D:\foo` | `Set-Location D:\foo` | PowerShell 跨盘无需 `/D` |
| `D:` | `Set-Location D:\` | 切盘 |
| `md foo` | `New-Item -ItemType Directory foo`（别名 `mkdir`） | 建目录 |
| `rd foo` | `Remove-Item foo`（别名 `rm`/`del`） | 删目录 |
| `rd /s /q foo` | `Remove-Item -Recurse -Force foo` | 递归强删 |
| `tree` | `tree`（调 exe）或 `Get-ChildItem -Recurse` | 目录树 |
| `tree /F` | `tree /F` 或 `Get-ChildItem -Recurse -Name` | 含文件 |

---

## 文件操作

| CMD | PowerShell | 说明 |
|-----|------------|------|
| `copy a b` | `Copy-Item a b`（别名 `cp`） | 复制 |
| `xcopy a b /E` | `Copy-Item a b -Recurse` | 递归复制 |
| `move a b` | `Move-Item a b`（别名 `mv`） | 移动 |
| `del a` | `Remove-Item a`（别名 `rm`） | 删除 |
| `type a.txt` | `Get-Content a.txt`（别名 `cat`） | 看内容 |
| `echo hi > a.txt` | `"hi" > a.txt` 或 `Set-Content a.txt "hi"` | 写文件 |
| `echo hi >> a.txt` | `"hi" >> a.txt` 或 `Add-Content a.txt "hi"` | 追加 |
| `findstr "x" a.txt` | `Select-String "x" a.txt` | 文本搜索 |
| `fc a b` | `Compare-Object (Get-Content a) (Get-Content b)` | 比较 |

---

## 系统 / 网络

| CMD | PowerShell | 说明 |
|-----|------------|------|
| `cls` | `Clear-Host`（别名 `cls`） | 清屏 |
| `exit` | `exit` | 退出 |
| `ipconfig` | `ipconfig`（调 exe）或 `Get-NetIPConfiguration` | 网络配置 |
| `ipconfig /all` | `Get-NetIPConfiguration -Detailed` | 详细 |
| `ping x` | `ping x` 或 `Test-Connection x` | 连通性 |
| `shutdown /s /t 3600` | `Stop-Computer`（无延时参数，需配合 `Start-Sleep`） | 关机 |
| `shutdown /r /t 0` | `Restart-Computer` | 重启 |
| `shutdown /a` | ❌ 无直接对应 | 取消关机仍用 `shutdown /a` |
| `tasklist` | `Get-Process` | 进程列表 |
| `taskkill /PID 123` | `Stop-Process -Id 123` | 杀进程 |
| `sc query` | `Get-Service` | 服务 |
| `net start x` | `Start-Service x` | 启服务 |
| `net stop x` | `Stop-Service x` | 停服务 |

---

## 管道与过滤（最大区别）

| 场景 | CMD | PowerShell |
|------|-----|------------|
| 文本过滤 | `dir \| findstr ".exe"` | `Get-ChildItem \| Where-Object { $_.Extension -eq ".exe" }` |
| 简写 | — | `Get-ChildItem \| ? { $_.Extension -eq ".exe" }` |
| 取前 N | — | `Get-ChildItem \| Select-Object -First 5` |
| 排序 | `dir /O:N` | `Get-ChildItem \| Sort-Object Name` |
| 取属性 | 需解析文本 | `(Get-ChildItem a.txt).Length` |
| 遍历 | `for %f in (*) do ...` | `Get-ChildItem \| ForEach-Object { ... }` |

> **核心**：CMD 管道传字符串，得靠 `findstr` 解析；PowerShell 管道传对象，直接访问属性。

---

## 帮助 / 发现命令

| 目的 | CMD | PowerShell |
|------|-----|------------|
| 看帮助 | `dir /?` | `Get-Help Get-ChildItem` |
| 看示例 | — | `Get-Help Get-ChildItem -Examples` |
| 看别名 | — | `Get-Alias dir` |
| 查命令 | `where x` | `Get-Command x` |
| 查命令来源 | — | `Get-Command dir \| Select-Object CommandType, Source` |
| 查可执行文件 | `where python` | `where.exe python` 或 `Get-Command python` |

> 判断一个命令是「PowerShell 别名」还是「外部 exe」：
> ```powershell
> Get-Command dir
> ```
> - `CommandType: Alias` → PowerShell 别名
> - `CommandType: Application` → 外部 exe

---

## 常用别名速查（PowerShell）

| 别名 | 真身 |
|------|------|
| `ls` / `dir` / `gci` | `Get-ChildItem` |
| `cd` / `sl` | `Set-Location` |
| `cat` / `type` | `Get-Content` |
| `cp` / `copy` | `Copy-Item` |
| `mv` / `move` | `Move-Item` |
| `rm` / `del` / `rd` | `Remove-Item` |
| `mkdir` / `md` | `New-Item -ItemType Directory` |
| `ps` | `Get-Process` |
| `kill` | `Stop-Process` |
| `cls` | `Clear-Host` |
| `echo` / `write` | `Write-Output` |
| `?` | `Where-Object` |
| `%` | `ForEach-Object` |
| `select` | `Select-Object` |
| `sort` | `Sort-Object` |
| `measure` | `Measure-Object` |

---

## 避坑清单

1. **参数符号**：PowerShell 用 `-`，不是 `/`。`dir /a` 在 PowerShell 里不认，要 `Get-ChildItem -Force`。
2. **`ifconfig` 不存在**：Windows 用 `ipconfig`。
3. **`shutdown` 参数**：Windows 用 `/s /t /r /a`，不是 `-s -t`。
4. **跨盘切换**：PowerShell 直接 `cd D:\foo`，不用 `/D`。
5. **别名参数不通用**：`dir` 能用，但 `dir /a` 不行，得用原生参数。
6. **管道语义不同**：CMD 传文本，PowerShell 传对象，`findstr` 那套在 PowerShell 里换成 `Where-Object`。
7. **`where` 在 PowerShell 里是 `Where-Object` 的别名**，查可执行文件要用 `where.exe`。
---
title: hello-world
tags:
  - note
date: 2026-10-07
comment:
---
# Hello World
## 教程

查看版本：`gfortran --version`

```bash
charles@Charless-MacBook-Pro ~> gfortran --version
GNU Fortran (Homebrew GCC 16.2.0) 16.2.0
Copyright (C) 2026 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

`hello.f90`

```fortran
program hello
    ! This is a command
    print *, 'Hello, World!'
end program hello
```

编译：`gfortran hello.f90 -o hello`

运行：`./hello`


## 参考资料

1. [官网教程](https://fortran-lang.org/zh_CN/learn/quickstart/hello_world/
)

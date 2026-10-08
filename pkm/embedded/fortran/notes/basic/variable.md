---
title: variable
tags:
  - note
date: 2026-10-07
comment:
---
# 变量
## 直觉

Fortran 是一种**强类型**语言，这意味着每个变量都必须有一个类型。

Fortran 是一种**静态类型**语言，这意味着每个变量的类型在程序编译时是固定的——变量类型在程序运行时不能改变。

Fortran 中有 5 种**内置数据类型**：

- `integer` —— 表示整数的数据，正数或负数
- `real` —— 用于浮点数据（不是整数）
- `complex` —— 由实部和虚部组成的对
- `character` —— 用于文本数据
- `logical` —— 用于表示布尔值（真或假）值的数据

## 声明

声明变量的语法是：

```fortran
<variable_type> :: <variable_name>, <variable_name>, ...
```

* Fortran 代码**不区分大小写**；你不必担心变量名的大小写，但保持一致是一种很好的做法。

案例：

```fortran
program variables
    implicit none
    
    integer :: amount
    real :: pi, e ! two `real` variables declared
    complex :: frequency
    character :: initial
    logical :: isOkay
    
end program variables
```

* 程序开头的附加语句：`implicit none`。该语句告诉编译器所有变量都将被显式声明；如果没有此语句，变量将根据它们开头的字母隐式键入。
* 始终在每个程序和过程的开头使用 `implicit none` 语句。隐式类型在现代编程中被认为是不好的做法，因为它隐藏了导致更多程序错误的信息。
* 一旦我们声明了一个变量，我们就可以使用赋值运算符 `=` 对其进行赋值和重新赋值。

## 赋值

赋值案例：

```fortran
amount = 10
pi = 3.1415927
frequency = (1.0, -0.5)
initial = 'A'
isOkay = .false.
```

* 字符由单引号 (`'`) 或双引号 (`"`) 包围。
* 逻辑或布尔值可以是 `.true.` 或 `.false.`。

## `save`属性的坑

`save` 属性是 Fortran 里的一个存储期概念，意思是：这个变量的值在程序整个运行期间一直存在，不会因为所在过程（函数/子程序）返回而消失。

Fortran 特有的“坑”：**在声明时直接赋值，会隐含 `save` 属性**

```fortran
integer :: n = 0
```

等价于

```fortran
integer, save :: n = 0
```

而不是

```fortran
integer :: n
n = 0
```

比如下面这个`counter`是里面的`n`每次不会随着方法结束而销毁，所以可以实现计数器的效果：

```fortran
subroutine counter()
    integer, save :: n = 0
    n = n + 1
    print *, n
end subroutine counter

program main
    call counter()   ! 输出 1
    call counter()   ! 输出 2
    call counter()   ! 输出 3
end program main
```

## 标准输入输出

### print

`print *` 其实就是 `write(*,*)` 的简写，把第一个 `*`（写到屏幕）省掉了。

```fortran
print 格式, 值1, 值2, 值3, ...

print *, isOkay
      │  └── 要输出的值
      └───── *：默认格式
```

`write` 是 `print` 的完整版，多了一个参数用来指定“写到哪”。

```fortran
write(单元, 格式) 值1, 值2, 值3, ...

write(*,*) isOkay
      │  │  └── 要输出的值
      │  └───── 第二个 *：默认格式
      └──────── 第一个 *：输出到标准输出（屏幕）
```


```Fortran
read(单元, 格式) 变量1, 变量2, 变量3, ...

read(*,*) isOkay
     │  │  └── 要读入的变量
     │  └───── 第二个 *：默认格式
     └──────── 第一个 *：从标准输入读
     
read(*,*) x, y
     │  │  └── 要读入的变量列表（两个变量）
     │  └───── 第二个 *：默认格式
     └──────── 第一个 *：从标准输入（键盘）读
```

输入`logical`的，可以支持多种输入方法：

```fortran
program test_logical
    implicit none
    logical :: isOkay
    
    print *, 'Enter T or F:'
    read(*,*) isOkay
    print *, 'You entered: ', isOkay
end program test_logical
```

```shell
charles@192 ~/w/p/l/temp (master)> ./test
 Enter T or F:
T
 You entered:  T
charles@192 ~/w/p/l/temp (master)> ./test
 Enter T or F:
t
 You entered:  T
charles@192 ~/w/p/l/temp (master)> ./test
 Enter T or F:
true
 You entered:  T
charles@192 ~/w/p/l/temp (master)> ./test
 Enter T or F:
.true.
 You entered:  T
```

## 参考资料

1. [官网教程](https://fortran-lang.org/zh_CN/learn/quickstart/variables/)


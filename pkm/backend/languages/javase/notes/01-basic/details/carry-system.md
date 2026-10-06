---
title: 进制转换
tags:
  - note
date: 2026-10-06
comment:
---
# 进制转换


| 进制   | 前缀        | 举例      |
| ---- | --------- | ------- |
| 二进制  | `0b`，`0B` | `0b111` |
| 十进制  | 没有前缀      | `7`     |
| 八进制  | `0`       | `07`    |
| 十六进制 | `0x`，`0X` | `0x7`   |

```java
public class Hello{
  public static void main(String[] args){
    int num1 = 0b111;
    int num2 = 111;
    int num3 = 0111;
    int num4 = 0x111;
    System.out.println("num1:"+num1);//num1:7
    System.out.println("num2:"+num2);//num2:111
    System.out.println("num3:"+num3);//num3:73
    System.out.println("num4:"+num4);//num4:273
  }
}
```

* 进制转换工具：[在线转换工具](https://www.sojson.com/hexconvert.html)

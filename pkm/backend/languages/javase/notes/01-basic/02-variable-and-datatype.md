---
title: 变量与数据类型
tags:
  - note
date: 2026-10-06
comment: 变量、基本类型、进制，自动与强制类型转换规则
---

# 专题：变量与数据类型

* 基础
    * 👉 [keywords](details/keywords.md): 关键字(官方预留的)
    * 👉 [identifier](details/identifier.md): 标识符(用户可写的)
    * 👉 [literal](details/literal.md): 字面量
    * 👉 [variable](details/variable.md): 变量
    * 👉 [carry-system](details/carry-system.md): 进制
* 类型
    * 👉 [var-type](details/var-type.md): 数据类型概述
    * 👉 [intenger](details/intenger.md): 整型
    * 👉 [float](details/float.md): 浮点型
    * 👉 [char](details/char.md): 字符型
    * 👉 [boolean](details/boolean.md): 布尔型
    * 👉 [convert](details/convert.md): 类型转换
* 运算符
    * 👉 [operator](operator.md): 运算符概述
    * 👉 [operator-basic](details/operator-basic.md): 基础运算符
    * 👉 [operator-compare](details/operator-compare.md): 比较运算符
    * 👉 [operator-logic](details/operator-logic.md): 逻辑运算符
    * 👉 [operator-assign](details/operator-assign.md): 赋值运算符、三目运算符
* 后续扩展
    * 👉 [WrapperClass](../04-utils/WrapperClass.md): 包装类

---

## 总结要点
1. **变量命名**：作用域内不能重名，Java不支持变量遮蔽
2. **类型选择**：
   * 整数默认用 `int`，大数用 `long`
   * 浮点数默认用 `double`，`float` 必须加 `F` 后缀
3. **类型转换**：
   * 小范围类型可自动转大范围类型
   * 大范围转小范围需要强制转换
   * `boolean` 不参与类型转换
4. **浮点数陷阱**：避免直接比较，使用容差法
5. **字符串操作**：使用 `equals()` 比较字符串，注意空指针问题
6. **字符特性**：`char` 可参与数值运算，本质是Unicode编码

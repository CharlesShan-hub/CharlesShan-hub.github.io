---
title: branch
tags:
  - note
date: 2026-10-12
comment:
---

# 分支结构

## 1. 单分支 if

```java
if (condition) {
    // 代码块
}
```

**注意**：如果只有一行代码，可以不写大括号（但不推荐）。

## 2. 双分支 if-else

```java
if (condition) {
    // 代码块1
} else {
    // 代码块2
}
```

示例：判断闰年

```java
int year = 2024;
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    System.out.println("闰年");
} else {
    System.out.println("平年");
}
```

## 3. 多分支 if-else if

```java
if (condition1) {
    // 代码块1
} else if (condition2) {
    // 代码块2
} else if (condition_n) {
    // 代码块n
} else {
    // 默认代码块
}
```

## 4. 嵌套分支

if语句可以嵌套使用，但建议不要超过三层嵌套。

**减少嵌套的方法**：

```java
while (condition) {
    if (flag) continue;  // 跳过当前迭代
    // 其他代码
}
```

## 5. switch语句

```java
switch (表达式) {
    case 常量1:
        语句块1;
        break;
    case 常量2:
        语句块2;
        break;
    // ...
    case 常量n:
        语句块n;
        break;
    default:
        默认语句块;
        break;
}
```

#### switch注意事项

1. **break作用**：只退出switch，不退出外层循环
2. **穿透现象**：如果case后没有break，会继续执行下一个case
3. **表达式类型限制**（重要‼️）：
    - 整型：**byte、short、int、long**
    - 枚举类型（**enum**）
    - 字符串（**Java 7+**）
    - **不支持**：浮点型、布尔型

    ```java
    // 错误示例：不支持double
    double num = 1.1;
    switch (num) {  // 编译错误
        case 1.1:
            // ...
    }

    // 正确示例：char可以，但要注意类型匹配
    char c = 'a';
    switch (c) {
        case "a":  // 错误：字符串不能匹配char
        case 20:   // 正确：char可以匹配整型常量
    }
    ```

4. **case值限制**：必须是常量或常量表达式，不能是变量

```java
int j = 2;
switch (n) {
    case j:      // 错误：不能是变量
    case 1 + 1:  // 正确：常量表达式
}
```

### 6. switch vs if 选择建议

- **使用switch**：判断的具体数值不多，且符合**byte、short、int、char、enum、String**六种类型
  - 最原始：byte，short，int，char，以及对应的包装类。
  - java5：enum
  - java7：String
- **使用if**：区间判断、结果为boolean类型、复杂条件判断

## 7. Java 12+ 新特性

#### 箭头语法（->）

```java
int month = 4;
String season = switch (month) {
    case 12, 1, 2 -> "冬季";
    case 3, 4, 5 -> "春季";
    case 6, 7, 8 -> "夏季";
    case 9, 10, 11 -> "秋季";
    default -> "无效月份";
};
```

#### 作为表达式返回值

```java
int dayNumber = switch (day) {
    case "MON" -> 1;
    case "TUE" -> 2;
    case "WED" -> 3;
    case "THU" -> 4;
    case "FRI" -> 5;
    case "SAT" -> 6;
    case "SUN" -> 7;
    default -> 0;
};
```

#### 使用yield返回值（Java 13+）

```java
String day = "MON";
String dayDescription = switch (day) {
    case "MON" -> {
        System.out.println("一周的开始");
        yield "星期一";
    }
    case "TUE" -> "星期二";
    // ... 其他cases
    default -> "未知";
};
```

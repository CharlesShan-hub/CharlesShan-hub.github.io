
# Chapter 2 - Types, Operators and Expressions

Variables and constants are the basic data objects manipulated in a program. Declarations list the variables to be used, and state what type they have and perhaps what their initial values are. Operators specify what is to be done to them. Expressions combine variables and constants to produce new values. The type of an object determines the set of values it can have and what operations can be performed on it. These building blocks are the topics of this chapter. 

变量和常量是程序所处理的基本数据对象。声明（declaration）列出将要使用的变量，并说明它们的类型，或许还有初始值。运算符（operator）指定要对它们进行的操作。表达式（expression）则把变量和常量组合起来产生新值。一个对象的类型决定了它能取的值的集合以及可以对其执行的操作。这些构件就是本章的主题。

The ANSI standard has made many small changes and additions to basic types and expressions. There are now signed and unsigned forms of all integer types, and notations for unsigned constants and hexadecimal character constants. Floating-point operations may be done in single precision; there is also a long double type for extended precision. String constants may be concatenated at compile time. Enumerations have become part of the language, formalizing a feature of long standing. Objects may be declared const, which prevents them from being changed. The rules for automatic coercions among arithmetic types have been augmented to handle the richer set of types. 

ANSI 标准对基本类型与表达式做了许多小的修改和补充。现在所有整型类型都有带符号（signed）和无符号（unsigned）两种形式，并增加了无符号常量和十六进制字符常量的记法。浮点运算可以用单精度进行；还有用于扩展精度的 long double 类型。字符串常量可以在编译时拼接（concatenate）。枚举（enumeration）已成为语言的一部分，将这一由来已久的特性正式化了。对象可以声明为 const，以防止被修改。算术类型之间自动强制转换（coercion）的规则也得到了扩充，以处理更丰富的类型集合。

## 2.1 Variable Names

Although we didn't say so in Chapter 1, there are some restrictions on the names of variables and symbolic constants. Names are made up of letters and digits; the first character must be a letter. The underscore ``_'' counts as a letter; it is sometimes useful for improving the readability of long variable names. Don't begin variable names with underscore, however, since library routines often use such names. Upper and lower case letters are distinct, so x and X are two different names. Traditional C practice is to use lower case for variable names, and all upper case for symbolic constants. 

尽管第 1 章没有明说，但变量和符号常量的名字存在一些限制。名字由字母和数字组成，第一个字符必须是字母。下划线 ``_'' 也算作字母；它有时可用于提高长变量名的可读性。不过不要以下划线开头来命名变量，因为库例程常常使用这种名字。大写字母和小写字母是不同的，所以 x 和 X 是两个不同的名字。传统的 C 习惯做法是：变量名用小写字母，符号常量全用大写字母。

At least the first 31 characters of an internal name are significant. For function names and external variables, the number may be less than 31, because external names may be used by assemblers and loaders over which the language has no control. For external names, the standard guarantees uniqueness only for 6 characters and a single case. Keywords like if, else, int, float, etc., are reserved: you can't use them as variable names. They must be in lower case. 

内部名字至少前 31 个字符是有效的。对于函数名和外部变量，这个数目可能小于 31，因为外部名字可能被汇编器和加载器使用，而语言对它们无法控制。对于外部名字，标准只保证前 6 个字符且单一大小写的唯一性。像 if、else、int、float 等关键字是保留的：不能用它们作变量名，而且必须小写。

It's wise to choose variable names that are related to the purpose of the variable, and that are unlikely to get mixed up typographically. We tend to use short names for local variables, especially loop indices, and longer names for external variables. 

明智的做法是选择与变量用途相关、且不易在排版上混淆的名字。我们倾向于对局部变量（尤其是循环下标）用短名字，而对外部变量用较长的名字。

## 2.2 Data Types and Sizes

There are only a few basic data types in C: 

C 中只有几种基本数据类型：

char a single byte, capable of holding one character in the local character set 

char —— 一个字节，可以保存本地字符集中的一个字符

int an integer, typically reflecting the natural size of integers on the host machine 

int —— 一个整数，通常反映宿主机上整数的自然大小

float single-precision floating point 

float —— 单精度浮点数

In addition, there are a number of qualifiers that can be applied to these basic types. short and long apply to integers: 

此外，还有一些限定符（qualifier）可以应用于这些基本类型。short 和 long 适用于整数：

```c
short int sh;
long int counter; 
```

The word int can be omitted in such declarations, and typically it is. 

在这类声明中，单词 int 可以省略，而且通常也省略。

The intent is that short and long should provide different lengths of integers where practical; int will normally be the natural size for a particular machine. short is often 16 bits long, and int either 16 or 32 bits. Each compiler is free to choose appropriate sizes for its own hardware, subject only to the the restriction that shorts and ints are at least 16 bits, longs are at least 32 bits, and short is no longer than int, which is no longer than long. 

其意图是：short 和 long 应在实际可行时提供不同长度的整数；int 通常是特定机器的自然大小。short 通常为 16 位，int 为 16 位或 32 位。各编译器可以自由地为其硬件选择合适的尺寸，只需满足：short 和 int 至少 16 位，long 至少 32 位，且 short 不长于 int，int 不长于 long。

The qualifier signed or unsigned may be applied to char or any integer. unsigned numbers are always positive or zero, and obey the laws of arithmetic modulo 2<sup>n</sup>, where n is the number of bits in the type. So, for instance, if chars are 8 bits, unsigned char variables have values between 0 and 255, while signed chars have values between -128 and 127 (in a two's complement machine.) Whether plain chars are signed or unsigned is machine-dependent, but printable characters are always positive. 

限定符 signed 或 unsigned 可以应用于 char 或任何整数。unsigned 数总是正数或零，并服从模 2<sup>n</sup> 的算术法则，其中 n 是该类型的位数。例如，如果 char 是 8 位，则 unsigned char 变量的取值范围是 0 到 255，而 signed char 的取值范围是 -128 到 127（在二进制补码机器上）。普通 char 是带符号还是无符号取决于机器，但可打印字符总是正的。

The type long double specifies extended-precision floating point. As with integers, the sizes of floating-point objects are implementation-defined; float, double and long double could represent one, two or three distinct sizes. 

long double 类型表示扩展精度的浮点数。与整数一样，浮点对象的尺寸是由实现定义的；float、double 和 long double 可以表示一种、两种或三种不同的尺寸。

The standard headers <limits.h> and <float.h> contain symbolic constants for all of these sizes, along with other properties of the machine and compiler. These are discussed in Appendix B. 

标准头文件 &lt;limits.h&gt; 与 &lt;float.h&gt; 包含所有这些尺寸的符号常量，以及机器和编译器的其他属性。它们将在附录 B 中讨论。

Exercise 2-1. Write a program to determine the ranges of char, short, int, and long variables, both signed and unsigned, by printing appropriate values from standard headers and by direct computation. Harder if you compute them: determine the ranges of the various floating-point types. 

练习 2-1. 编写一个程序，通过从标准头文件中打印合适的值并通过直接计算，来确定 signed 和 unsigned 两种形式的 char、short、int 和 long 变量的取值范围。如果用直接计算来求，会更难一些：请确定各种浮点类型的取值范围。

## 2.3 Constants

An integer constant like 1234 is an int. A long constant is written with a terminal l (ell) or L, as in 123456789L; an integer constant too big to fit into an int will also be taken as a long. Unsigned constants are written with a terminal u or U, and the suffix ul or UL indicates unsigned long. 

像 1234 这样的整型常量是 int。long 常量以结尾的 l（ell）或 L 书写，如 123456789L；一个装不进 int 的整型常量也会被当作 long。无符号常量以结尾的 u 或 U 书写，后缀 ul 或 UL 表示 unsigned long。

Floating-point constants contain a decimal point (123.4) or an exponent (1e-2) or both; their type is double, unless suffixed. The suffixes f or F indicate a float constant; l or L indicate a long double. 

浮点常量含有小数点（123.4）或指数（1e-2）或两者兼有；除非加了后缀，它们的类型是 double。后缀 f 或 F 表示 float 常量；l 或 L 表示 long double。

The value of an integer can be specified in octal or hexadecimal instead of decimal. A leading 0 (zero) on an integer constant means octal; a leading 0x or 0X means hexadecimal. For example, decimal 31 can be written as 037 in octal and 0x1f or 0x1F in hex. Octal and hexadecimal constants may also be followed by L to make them long and U to make them unsigned: 0XFUL is an unsigned long constant with value 15 decimal. 

整数的值可以用八进制或十六进制而不是十进制来指定。整型常量开头的 0（零）表示八进制；开头的 0x 或 0X 表示十六进制。例如，十进制 31 可以写成八进制的 037，也可以写成十六进制的 0x1f 或 0x1F。八进制和十六进制常量也可以跟 L 使其成为 long，跟 U 使其成为 unsigned：0XFUL 是一个值为十进制 15 的 unsigned long 常量。

A character constant is an integer, written as one character within single quotes, such as 'x'. The value of a character constant is the numeric value of the character in the machine's character set. For example, in the ASCII character set the character constant '0' has the value 48, which is unrelated to the numeric value 0. If we write '0' instead of a numeric value like 48 that depends on the character set, the program is independent of the particular value and easier to read. Character constants participate in numeric operations just as any other integers, although they are most often used in comparisons with other characters. 

字符常量是一个整数，写成一个由单引号括起来的单个字符，如 'x'。字符常量的值是该字符在机器字符集中的数值。例如，在 ASCII 字符集中，字符常量 '0' 的值是 48，它与数值 0 无关。如果我们写 '0' 而不是像 48 这样依赖于字符集的数值，程序就不依赖于特定的值，也更易读。字符常量像其他任何整数一样参与数值运算，不过它们最常用于与其他字符进行比较。

Certain characters can be represented in character and string constants by escape sequences like \n (newline); these sequences look like two characters, but represent only one. In addition, an arbitrary byte-sized bit pattern can be specified by 

某些字符可以在字符常量和字符串常量中用像 \n（换行符）这样的转义序列（escape sequence）来表示；这些序列看起来像两个字符，但只代表一个。此外，可以用下面的形式指定任意字节大小的位模式：

```c
'\ooo'
```

where ooo is one to three octal digits (0...7) or by 

其中 ooo 是一至三个八进制数字（0...7）；或者用

```c
'\xhh'
```

where hh is one or more hexadecimal digits (0...9, a...f, A...F). So we might write 

其中 hh 是一个或多个十六进制数字（0...9，a...f，A...F）。所以我们可以写

```c
#define VTAB '\013' /* ASCII vertical tab */
#define BELL '\007' /* ASCII bell character */
```

or, in hexadecimal,

或者，用十六进制表示，

```c
#define VTAB '\xb' /* ASCII vertical tab */
#define BELL '\x7' /* ASCII bell character */
```

The complete set of escape sequences is 

转义序列的完整集合如下：

<table><tr><td>\a</td><td>alert (bell) character</td><td>\\</td><td>backslash</td></tr><tr><td>\b</td><td>backspace</td><td>\?</td><td>question mark</td></tr><tr><td>\f</td><td>formfeed</td><td>\&#x27;</td><td>single quote</td></tr><tr><td>\n</td><td>newline</td><td>\&quot;</td><td>double quote</td></tr><tr><td>\r</td><td>carriage return</td><td>\ooo</td><td>octal number</td></tr><tr><td>\t</td><td>horizontal tab</td><td>\xhh</td><td>hexadecimal number</td></tr><tr><td>\v</td><td>vertical tab</td><td colspan="2"></td></tr></table>

The character constant '\0' represents the character with value zero, the null character. '\0' is often written instead of 0 to emphasize the character nature of some expression, but the numeric value is just 0. 

字符常量 '\0' 表示值为零的字符，即空字符（null character）。'\0' 常常用来代替 0 书写，以强调某些表达式的字符性质，但其数值就是 0。

A constant expression is an expression that involves only constants. Such expressions may be evaluated at during compilation rather than run-time, and accordingly may be used in any place that a constant can occur, as in 

常量表达式（constant expression）是只包含常量的表达式。这类表达式可以在编译时而非运行时求值，因此可以用于任何能出现常量的地方，如下所示：

```c
#define MAXLINE 1000
char line[MAXLINE+1];
```

or

或者

```c
#define LEAP 1 /* in leap years */
int days[31+28+LEAP+31+30+31+30+31+31+30+31+30+31]; 
```

A string constant, or string literal, is a sequence of zero or more characters surrounded by double quotes, as in 

字符串常量（string constant），也叫字符串字面值（string literal），是由双引号括起来的零个或多个字符组成的序列，如下所示：

```c
"I am a string"
```

or 

或者

```c
"" /* the empty string */ 
```

The quotes are not part of the string, but serve only to delimit it. The same escape sequences used in character constants apply in strings; \" represents the double-quote character. String constants can be concatenated at compile time: 

引号不是字符串的一部分，它们只用于限定字符串。字符常量中使用的同样的转义序列也适用于字符串；\" 表示双引号字符。字符串常量可以在编译时拼接：

```c
"hello, " "world" 
```

is equivalent to 

等价于

```c
"hello, world" 
```

This is useful for splitting up long strings across several source lines. 

这对于把长字符串拆分到几个源代码行上很有用。

Technically, a string constant is an array of characters. The internal representation of a string has a null character '\0' at the end, so the physical storage required is one more than the number of characters written between the quotes. This representation means that there is no limit to how long a string can be, but programs must scan a string completely to determine its length. The standard library function strlen(s) returns the length of its character string argument s, excluding the terminal '\0'. Here is our version: 

严格说来，字符串常量是一个字符数组。字符串的内部表示在结尾有一个空字符 '\0'，所以其物理存储所需的空间比引号之间写出的字符数多一。这种表示意味着字符串的长度没有限制，但程序必须完整地扫描一个字符串才能确定其长度。标准库函数 strlen(s) 返回其字符串参数 s 的长度，不包括结尾的 '\0'。下面是我们的版本：

```c
/* strlen: return length of s */
int strlen(char s[])
{
    int i;

    while (s[i] != '\0')
    ++i;
    return i;
} 
```

strlen and other string functions are declared in the standard header <string.h>. 

strlen 和其他字符串函数在标准头文件 <string.h> 中声明。

Be careful to distinguish between a character constant and a string that contains a single character: 'x' is not the same as "x". The former is an integer, used to produce the numeric value of the letter x in the machine's character set. The latter is an array of characters that contains one character (the letter x) and a '\0'. 

请务必区分字符常量与只含一个字符的字符串：'x' 与 "x" 并不相同。前者是一个整数，用于产生字母 x 在机器字符集中的数值；后者是一个字符数组，包含一个字符（字母 x）和一个 '\0'。

There is one other kind of constant, the enumeration constant. An enumeration is a list of constant integer values, as in 

还有另一种常量：枚举常量（enumeration constant）。枚举（enumeration）是一个常量整数值的列表，如下所示：

```c
enum colors { RED, GREEN, BLUE };
```

The first name in an enum has value 0, the next 1, and so on, unless explicit values are specified. If not all values are specified, unspecified values continue the progression from the last specified value, as the second of these examples: 

enum 中的第一个名字的值为 0，第二个为 1，依此类推，除非显式指定了值。如果没有指定所有值，未指定的值将从最后一个指定值继续递增，如下面第二个例子：

```c
enum escapes { BELL = '\a', BACKSPACE = '\b', TAB = '\t', NEWLINE = '\n', VTAB = '\v', RETURN = '\r' }; 
```

```c
enum months { JAN = 1, FEB, MAR, APR, MAY, JUN,
    JUL, AUG, SEP, OCT, NOV, DEC };
    /* FEB = 2, MAR = 3, etc. */ 
```

Names in different enumerations must be distinct. Values need not be distinct in the same enumeration. 

不同枚举中的名字必须互不相同。同一枚举中的值则不必不同。

Enumerations provide a convenient way to associate constant values with names, an alternative to #define with the advantage that the values can be generated for you. Although variables of enum types may be declared, compilers need not check that what you store in such a variable is a valid value for the enumeration. Nevertheless, enumeration variables offer the chance of checking and so are often better than #defines. In addition, a debugger may be able to print values of enumeration variables in their symbolic form. 

枚举提供了一种把常量值与名字关联起来的便利方式，是 #define 的一种替代，其优点是这些值可以自动生成。虽然可以声明 enum 类型的变量，但编译器不必检查你存入这类变量的值是否是该枚举的有效值。尽管如此，枚举变量提供了检查的机会，因此常常比 #define 更好。此外，调试器也许能够以符号形式打印枚举变量的值。

## 2.4 Declarations

All variables must be declared before use, although certain declarations can be made implicitly by content. A declaration specifies a type, and contains a list of one or more variables of that type, as in 

所有变量都必须先声明后使用，尽管某些声明可以通过上下文隐式进行。声明指定一个类型，并包含该类型的一个或多个变量的列表，如下所示：

```c
int lower, upper, step;
char c, line[1000]; 
```

Variables can be distributed among declarations in any fashion; the lists above could well be written as 

变量可以以任意方式分布在多个声明中；上面的列表也完全可以写成：

```c
int lower;
int upper;
int step;
char c;
char line[1000]; 
```

The latter form takes more space, but is convenient for adding a comment to each declaration for subsequent modifications. 

后一种形式占用更多空间，但便于为每个声明加注释，方便后续修改。

A variable may also be initialized in its declaration. If the name is followed by an equals sign and an expression, the expression serves as an initializer, as in 

变量也可以在声明时初始化。如果名字后面跟一个等号和一个表达式，该表达式就作为初始化表达式（initializer），如下所示：

```c
char esc = '\\'';
int i = 0;
int limit = MAXLINE + 1;
float eps = 1.0e-5; 
```

If the variable in question is not automatic, the initialization is done once only, conceptionally before the program starts executing, and the initializer must be a constant expression. An explicitly initialized automatic variable is initialized each time the function or block it is in is entered; the initializer may be any expression. External and static variables are initialized to zero by default. Automatic variables for which is no explicit initializer have undefined (i.e., garbage) values. 

如果所讨论的变量不是自动变量，则初始化只进行一次，从概念上讲是在程序开始执行之前完成，且初始化表达式必须是常量表达式。显式初始化的自动变量在每次进入其所在的函数或块时都要被初始化；初始化表达式可以是任意表达式。外部变量和静态变量默认初始化为零。没有显式初始化表达式的自动变量的值是未定义的（即垃圾值）。

The qualifier const can be applied to the declaration of any variable to specify that its value will not be changed. For an array, the const qualifier says that the elements will not be altered. 

限定符 const 可以应用于任何变量的声明，以指定其值不会被改变。对于数组，const 限定符说明其元素不会被修改。

```c
const double e = 2.71828182845905;
const char msg[] = "warning: "; 
```

The const declaration can also be used with array arguments, to indicate that the function does not change that array: 

const 声明也可以用于数组参数，以表明该函数不会改变这个数组：

```c
int strlen(const char[]); 
```

The result is implementation-defined if an attempt is made to change a const. 

如果试图改变一个 const，其结果是实现定义的。

## 2.5 Arithmetic Operators

The binary arithmetic operators are +, -, *, /, and the modulus operator %. Integer division truncates any fractional part. The expression 

二元算术运算符有 +、-、*、/，以及取模运算符 %。整数除法会截去小数部分。表达式

```c
x % y
```

produces the remainder when x is divided by y, and thus is zero when y divides x exactly. For example, a year is a leap year if it is divisible by 4 but not by 100, except that years divisible by 400 are leap years. Therefore 

产生 x 除以 y 的余数，因此当 y 恰好整除 x 时其值为零。例如，一个年份如果能被 4 整除但不能被 100 整除，就是闰年；但能被 400 整除的年份也是闰年。因此

```c
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
    printf("%d is a leap year\n", year);
else
    printf("%d is not a leap year\n", year); 
```

The % operator cannot be applied to a float or double. The direction of truncation for / and the sign of the result for % are machine-dependent for negative operands, as is the action taken on overflow or underflow. 

% 运算符不能应用于 float 或 double。对于负的操作数，/ 的截断方向以及 % 的结果的符号取决于机器，发生上溢或下溢时所采取的动作也是如此。

The binary + and - operators have the same precedence, which is lower than the precedence of *, / and %, which is in turn lower than unary + and -. Arithmetic operators associate left to right. 

二元 + 和 - 运算符具有相同的优先级，低于 *、/ 和 % 的优先级，而后者的优先级又低于一元 + 和 -。算术运算符从左到右结合。

Table 2.1 at the end of this chapter summarizes precedence and associativity for all operators. 

本章末尾的表 2.1 总结了所有运算符的优先级和结合性。

## 2.6 Relational and Logical Operators

The relational operators are 

关系运算符是

```txt
> >= < <= 
```

They all have the same precedence. Just below them in precedence are the equality operators: 

```txt
== != 
```

They all have the same precedence. Just below them in precedence are the equality operators: 

它们具有相同的优先级。比它们低一级的是相等运算符（equality operators）：

```c
== != 
```

Relational operators have lower precedence than arithmetic operators, so an expression like i < lim-1 is taken as i < (lim-1), as would be expected. 

关系运算符的优先级低于算术运算符，因此像 i < lim-1 这样的表达式被理解为 i < (lim-1)，正如所期望的那样。

More interesting are the logical operators && and ||. Expressions connected by && or || are evaluated left to right, and evaluation stops as soon as the truth or falsehood of the result is known. Most C programs rely on these properties. For example, here is a loop from the input function getline that we wrote in Chapter 1: 

更有趣的是逻辑运算符 && 和 ||。由 && 或 || 连接的表达式从左到右求值，一旦结果的真假已确定，求值就会停止。大多数 C 程序都依赖这些性质。例如，下面这个循环来自第 1 章中我们编写的输入函数 getline：

```c
for (i=0; i < lim-1 && (c=getchar()) != '\n' && c != EOF; ++i)
    s[i] = c; 
```

Before reading a new character it is necessary to check that there is room to store it in the array s, so the test i < lim-1 must be made first. Moreover, if this test fails, we must not go on and read another character. 

在读取一个新字符之前，必须先检查数组 s 中是否有空间存放它，所以必须先进行 i < lim-1 这个测试。而且，如果这个测试失败，我们就不能继续去读另一个字符。

Similarly, it would be unfortunate if c were tested against EOF before getchar is called; therefore the call and assignment must occur before the character in c is tested. 

类似地，如果在调用 getchar 之前就用 EOF 去测试 c，那将是不幸的；因此调用和赋值必须发生在测试 c 中的字符之前。

The precedence of && is higher than that of ||, and both are lower than relational and equality operators, so expressions like 

&& 的优先级高于 ||，而这两者又都低于关系运算符和相等运算符，因此像下面这样的表达式

```c
i < lim-1 && (c=getchar()) != '\n' && c != EOF 
```

need no extra parentheses. But since the precedence of != is higher than assignment, parentheses are needed in 

不需要额外的括号。但由于 != 的优先级高于赋值，在下面这个式子里需要括号

```c
(c=getchar()) != '\n' 
```

to achieve the desired result of assignment to c and then comparison with '\n'. 

以达到先把值赋给 c、然后再与 '\n' 比较的预期结果。

By definition, the numeric value of a relational or logical expression is 1 if the relation is true, and 0 if the relation is false. 

根据定义，关系表达式或逻辑表达式的数值为：关系为真时是 1，为假时是 0。

The unary negation operator ! converts a non-zero operand into 0, and a zero operand in 1. A common use of ! is in constructions like 

一元取反运算符 ! 把非零操作数转换为 0，把零操作数转换为 1。! 的一个常见用法是像下面这样的结构：

```c
if (!valid)
```

It's hard to generalize about which form is better. Constructions like !valid read nicely (``if not valid''), but more complicated ones can be hard to understand. 

很难一概而论哪种形式更好。像 !valid 这样的结构读起来很顺（"如果不合法"），但更复杂的结构可能就难以理解了。

Exercise 2-2. Write a loop equivalent to the for loop above without using && or ||. 

练习 2-2. 编写一个与上面的 for 循环等价的循环，但不使用 && 或 ||。

## 2.7 Type Conversions

When an operator has operands of different types, they are converted to a common type according to a small number of rules. In general, the only automatic conversions are those that convert a ``narrower'' operand into a ``wider'' one without losing information, such as converting an integer into floating point in an expression like f + i. Expressions that don't make sense, like using a float as a subscript, are disallowed. Expressions that might lose information, like assigning a longer integer type to a shorter, or a floating-point type to an integer, may draw a warning, but they are not illegal. 

当一个运算符的操作数类型不同时，它们会按照少数几条规则被转换为某个共同的类型。一般说来，唯一的自动转换是把"较窄"操作数转换为"较宽"而不丢失信息的转换，比如在 f + i 这样的表达式中把整数转换为浮点数。没有意义的表达式是不允许的，比如把 float 用作下标。可能丢失信息的表达式，比如把较长的整型赋给较短的整型，或把浮点型赋给整型，可能会引发警告，但并不非法。

A char is just a small integer, so chars may be freely used in arithmetic expressions. This permits considerable flexibility in certain kinds of character transformations. One is exemplified by this naive implementation of the function atoi, which converts a string of digits into its numeric equivalent. 

char 只是一个小整数，因此 char 可以在算术表达式中自由使用。这使得某些种类的字符变换具有相当的灵活性。其中一个例子是 atoi 函数的朴素实现，它把一串数字转换为其等价的数值。

```c
/* atoi: convert s to integer */
int atoi(char s[])
{
    int i, n;

    n = 0;
    for (i = 0; s[i] >= '0' && s[i] <= '9'; ++i)
    n = 10 * n + (s[i] - '0');
    return n;
}
```

s we discussed in Chapter 1, the expression 

正如第 1 章讨论过的，表达式

```c
s[i] - '0' 
```

gives the numeric value of the character stored in s[i], because the values of '0', '1', etc., form a contiguous increasing sequence. 

给出存放在 s[i] 中的字符的数值，因为 '0'、'1' 等的值构成一个连续递增的序列。

Another example of char to int conversion is the function lower, which maps a single character to lower case for the ASCII character set. If the character is not an upper case letter, lower returns it unchanged. 

char 转换为 int 的另一个例子是 lower 函数，它把单个字符映射为 ASCII 字符集中的小写。如果字符不是大写字母，lower 就原样返回。

```c
/* lower: convert c to lower case; ASCII only */
int lower(int c)
{
    if (c >= 'A' && c <= 'Z')
    return c + 'a' - 'A';
    else 
    return c;
} 
```

This works for ASCII because corresponding upper case and lower case letters are a fixed distance apart as numeric values and each alphabet is contiguous -- there is nothing but letters between A and Z. This latter observation is not true of the EBCDIC character set, however, so this code would convert more than just letters in EBCDIC. 

这对 ASCII 有效，因为对应的大写字母和小写字母作为数值相距固定的距离，且每个字母表都是连续的——A 和 Z 之间除了字母没有别的字符。然而后面这一观察对 EBCDIC 字符集并不成立，所以这段代码在 EBCDIC 中转换的就不仅仅是字母了。

The standard header <ctype.h>, described in Appendix B, defines a family of functions that provide tests and conversions that are independent of character set. For example, the function tolower is a portable replacement for the function lower shown above. Similarly, the test 

标准头文件 <ctype.h>（在附录 B 中描述）定义了一族提供与字符集无关的测试和转换的函数。例如，tolower 函数就是上面所示的 lower 函数的可移植替代。类似地，测试

```c
c >= '0' && c <= '9'
```

can be replaced by 

可以替换为

```c
isdigit(c)
```

We will use the <ctype.h> functions from now on. 

从现在起我们将使用 <ctype.h> 中的函数。

There is one subtle point about the conversion of characters to integers. The language does not specify whether variables of type char are signed or unsigned quantities. When a char is converted to an int, can it ever produce a negative integer? The answer varies from machine to machine, reflecting differences in architecture. On some machines a char whose leftmost bit is 1 will be converted to a negative integer (``sign extension''). On others, a char is promoted to an int by adding zeros at the left end, and thus is always positive. 

关于字符到整数的转换有一个微妙之处。语言没有说明 char 类型的变量是带符号的还是无符号的量。当把一个 char 转换为 int 时，会不会产生负整数？答案因机器而异，反映了不同体系结构的差异。在某些机器上，最左位为 1 的 char 会被转换成负整数（"符号扩展"）。在另一些机器上，char 通过在左端加零提升为 int，因此总是正的。

The definition of C guarantees that any character in the machine's standard printing character set will never be negative, so these characters will always be positive quantities in expressions. But arbitrary bit patterns stored in character variables may appear to be negative on some machines, yet positive on others. For portability, specify signed or unsigned if noncharacter data is to be stored in char variables. 

C 的定义保证机器的标准打印字符集中的任何字符永远不会是负的，所以这些字符在表达式中总是正的量。但存放在字符变量中的任意位模式在某些机器上可能表现为负，而在另一些机器上则为正。为了可移植性，如果要在 char 变量中存放非字符数据，就指定 signed 或 unsigned。

Relational expressions like i > j and logical expressions connected by && and || are defined to have value 1 if true, and 0 if false. Thus the assignment 

像 i > j 这样的关系表达式以及由 && 和 || 连接的逻辑表达式被定义为：为真时值为 1，为假时值为 0。因此赋值

```c
d = c >= '0' && c <= '9' 
```

sets d to 1 if c is a digit, and 0 if not. However, functions like isdigit may return any nonzero value for true. In the test part of if, while, for, etc., ``true'' just means ``non-zero'', so this makes no difference. 

在 c 是数字时把 d 置为 1，否则置为 0。然而，像 isdigit 这样的函数对"真"可以返回任何非零值。在 if、while、for 等的测试部分，"真"只意味着"非零"，所以这没有什么差别。

Implicit arithmetic conversions work much as expected. In general, if an operator like + or * that takes two operands (a binary operator) has operands of different types, the ``lower'' type is promoted to the ``higher'' type before the operation proceeds. The result is of the integer type. Section 6 of Appendix A states the conversion rules precisely. If there are no unsigned operands, however, the following informal set of rules will suffice: 

隐式算术转换的工作方式基本如人所料。一般说来，如果一个接收两个操作数的运算符（二元运算符，如 + 或 *）的操作数类型不同，那么在运算进行之前，"较低"的类型会被提升为"较高"的类型。结果是整数类型。附录 A 的第 6 节精确地陈述了转换规则。不过，如果没有 unsigned 操作数，下面这套非正式的规则就足够了：

• 如果其中一个操作数是 long double，就把另一个转换为 long double。 

• 否则，如果其中一个操作数是 double，就把另一个转换为 double。 

• 否则，如果其中一个操作数是 float，就把另一个转换为 float。 

• 否则，把 char 和 short 转换为 int。 

• 然后，如果其中一个操作数是 long，就把另一个转换为 long。 

Notice that floats in an expression are not automatically converted to double; this is a change from the original definition. In general, mathematical functions like those in <math.h> will use double precision. The main reason for using float is to save storage in large arrays, or, less often, to save time on machines where double-precision arithmetic is particularly expensive. 

注意，表达式中的 float 不会自动转换为 double；这是对最初定义的一个改变。一般说来，像 <math.h> 中的那些数学函数都会使用双精度。使用 float 的主要原因是在大型数组中节省存储空间，其次（较少见）是在双精度运算特别昂贵的机器上节省时间。

Conversion rules are more complicated when unsigned operands are involved. The problem is that comparisons between signed and unsigned values are machine-dependent, because they depend on the sizes of the various integer types. For example, suppose that int is 16 bits and long is 32 bits. Then -1L < 1U, because 1U, which is an unsigned int, is promoted to a signed long. But -1L > 1UL because -1L is promoted to unsigned long and thus appears to be a large positive number. 

当涉及 unsigned 操作数时，转换规则更为复杂。问题在于带符号值与无符号值之间的比较取决于机器，因为它们依赖于各种整型类型的尺寸。例如，假设 int 是 16 位而 long 是 32 位，那么 -1L < 1U，因为 1U（它是 unsigned int）被提升为带符号的 long。但 -1L > 1UL，因为 -1L 被提升为 unsigned long，从而看起来是一个很大的正数。

Conversions take place across assignments; the value of the right side is converted to the type of the left, which is the type of the result. 

转换也发生在赋值中；右边的值被转换为左边的类型，也就是结果的类型。

A character is converted to an integer, either by sign extension or not, as described above. 

字符被转换为整数时，如上所述，可能进行符号扩展，也可能不进行。

Longer integers are converted to shorter ones or to chars by dropping the excess high-order bits. Thus in 

较长的整数被转换为较短的整数或 char 时，是通过舍弃多余的高位实现的。因此在

```c
int i;
char c; 

i = c;
c = i; 
```

the value of c is unchanged. This is true whether or not sign extension is involved. Reversing the order of assignments might lose information, however. 

c 的值不变。无论是否涉及符号扩展，这都是成立的。然而，颠倒赋值的顺序可能会丢失信息。

If x is float and i is int, then x = i and i = x both cause conversions; float to int causes truncation of any fractional part. When a double is converted to float, whether the value is rounded or truncated is implementation dependent. 

如果 x 是 float 而 i 是 int，那么 x = i 和 i = x 都会引起转换；float 转换为 int 会截去小数部分。当 double 转换为 float 时，值是舍入还是截断取决于实现。

Since an argument of a function call is an expression, type conversion also takes place when arguments are passed to functions. In the absence of a function prototype, char and short become int, and float becomes double. This is why we have declared function arguments to be int and double even when the function is called with char and float. 

由于函数调用的实参是一个表达式，所以参数传递给函数时也会发生类型转换。在没有函数原型的情况下，char 和 short 变成 int，float 变成 double。这就是为什么即使函数以 char 和 float 实参调用，我们仍把函数参数声明为 int 和 double。

Finally, explicit type conversions can be forced (``coerced'') in any expression, with a unary operator called a cast. In the construction 

最后，可以在任何表达式中用称为强制类型转换（cast）的一元运算符显式地进行类型转换（"强制"）。在如下构造中

```c
(type name) expression
```

the expression is converted to the named type by the conversion rules above. The precise meaning of a cast is as if the expression were assigned to a variable of the specified type, which is then used in place of the whole construction. For example, the library routine sqrt expects a double argument, and will produce nonsense if inadvertently handled something else. (sqrt is declared in <math.h>.) So if n is an integer, we can use 

按照上述转换规则，该表达式被转换为指定的类型。强制类型转换的精确含义是：如同把表达式赋给一个指定类型的变量，然后用这个变量代替整个构造。例如，库例程 sqrt 期望一个 double 参数，如果不小心给了它别的东西，就会产生无意义的结果。（sqrt 在 <math.h> 中声明。）所以如果 n 是整数，我们可以用

```c
sqrt((double) n)
```

to convert the value of n to double before passing it to sqrt. Note that the cast produces the value of n in the proper type; n itself is not altered. The cast operator has the same high precedence as other unary operators, as summarized in the table at the end of this chapter. 

在把 n 传给 sqrt 之前先把 n 的值转换为 double。注意，强制类型转换只是以正确的类型产生 n 的值；n 本身并没有改变。强制转换运算符与其他一元运算符具有同样高的优先级，如本章末尾的表格所总结。

If arguments are declared by a function prototype, as the normally should be, the declaration causes automatic coercion of any arguments when the function is called. Thus, given a function prototype for sqrt: 

如果参数是由函数原型声明的（通常也应该这样做），那么该声明会在函数被调用时引起对实参的自动强制转换。于是，给定 sqrt 的函数原型：

```c
double sqrt(double)
```

the call

调用

```c
root2 = sqrt(2)
```

coerces the integer 2 into the double value 2.0 without any need for a cast. 

会把整数 2 强制转换为 double 值 2.0，而不需要任何强制转换。

The standard library includes a portable implementation of a pseudo-random number generator and a function for initializing the seed; the former illustrates a cast: 

标准库包含一个伪随机数生成器的可移植实现和一个用于初始化种子的函数；前者演示了强制转换的用法：

```c
unsigned long int next = 1;

/* rand: return pseudo-random integer on 0..32767 */
int rand(void)
{
    next = next * 1103515245 + 12345;
    return (unsigned int)(next/65536) % 32768;
}

/* srand: set seed for rand() */
void srand(unsigned int seed)
{
    next = seed;
} 
```

Exercise 2-3. Write a function htoi(s), which converts a string of hexadecimal digits (including an optional 0x or 0X) into its equivalent integer value. The allowable digits are 0 through 9, a through f, and A through F. 

练习 2-3. 编写函数 htoi(s)，把一个由十六进制数字组成的字符串（包括可选的 0x 或 0X 前缀）转换为等价的整数值。允许的数字包括 0 到 9、a 到 f 以及 A 到 F。

## 2.8 Increment and Decrement Operators

C provides two unusual operators for incrementing and decrementing variables. The increment operator ++ adds 1 to its operand, while the decrement operator -- subtracts 1. We have frequently used ++ to increment variables, as in 

C 提供了两个不寻常的运算符用于变量的递增和递减。递增运算符 ++ 给操作数加 1，而递减运算符 -- 减 1。我们已经多次用 ++ 使变量递增，如下所示：

```c
if (c == '\n')
    ++nl; 
```

and in

以及

```c
if (c == '\n') {
    s[i] = c;
    ++i;
} 
```

The unusual aspect is that ++ and -- may be used either as prefix operators (before the variable, as in ++n), or postfix operators (after the variable: n++). In both cases, the effect is to increment n. But the expression ++n increments n before its value is used, while n++ increments n after its value has been used. This means that in a context where the value is being used, not just the effect, ++n and n++ are different. If n is 5, then 

不寻常之处在于，++ 和 -- 既可以用作前缀运算符（在变量之前，如 ++n），也可以用作后缀运算符（在变量之后：n++）。在这两种情况下，效果都是使 n 递增。但表达式 ++n 在使用 n 的值之前递增 n，而 n++ 在用过 n 的值之后再递增 n。这意味着，在用到值而不仅仅是效果的上下文中，++n 和 n++ 是不同的。如果 n 是 5，那么

```c
x = n++;
```

sets x to 5, but 

把 x 置为 5，而

```c
x = ++n; 
```

sets x to 6. In both cases, n becomes 6. The increment and decrement operators can only be applied to variables; an expression like (i+j)++ is illegal. 

把 x 置为 6。两种情况下 n 都变成 6。递增和递减运算符只能应用于变量；像 (i+j)++ 这样的表达式是非法的。

In a context where no value is wanted, just the incrementing effect, as in 

在不需要值、只需要递增效果的上下文中，如下所示：

```c
if (c == '\n')
    nl++; 
```

prefix and postfix are the same. But there are situations where one or the other is specifically called for. For instance, consider the function squeeze(s,c), which removes all occurrences of the character c from the string s. 

在这些情况下，前缀和后缀是相同的。但有些情况却明确要求使用其中之一。例如，考虑函数 squeeze(s,c)，它从字符串 s 中删除所有出现的字符 c。

```c
/* squeeze: delete all c from s */
void squeeze(char s[], int c)
{
    int i, j;

    for (i = j = 0; s[i] != '\0'; i++)
    if (s[i] != c)
    s[j++] = s[i];
    s[j] = '\0';
} 
```

Each time a non-c occurs, it is copied into the current j position, and only then is j incremented to be ready for the next character. This is exactly equivalent to 

每当出现一个非 c 的字符时，就把它复制到当前 j 的位置，然后才递增 j，为下一个字符做好准备。这恰好等价于

```c
if (s[i] != c) {
    s[j] = s[i];
    j++;
} 
```

Another example of a similar construction comes from the getline function that we wrote in Chapter 1, where we can replace 

另一个类似结构的例子来自我们在第 1 章编写的 getline 函数，其中我们可以把

```c
if (c == '\n') {
    s[i] = c;
    ++i;
} 
```

by the more compact 

替换为更紧凑的

```c
if (c == '\n')
    s[i++] = c; 
```

As a third example, consider the standard function strcat(s,t), which concatenates the string t to the end of string s. strcat assumes that there is enough space in s to hold the combination. As we have written it, strcat returns no value; the standard library version returns a pointer to the resulting string. 

作为第三个例子，考虑标准函数 strcat(s,t)，它把字符串 t 连接到字符串 s 的末尾。strcat 假定 s 中有足够的空间存放合并后的结果。按我们所写的方式，strcat 不返回值；标准库的版本返回一个指向结果字符串的指针。

```c
/* strcat: concatenate t to end of s; s must be big enough */
void strcat(char s[], char t[])
{ 
    int i, j;
    i = j = 0;
    while (s[i] != '\0') /* find end of s */
        i++;
    while ((s[i++] = t[j++] ) != '\0') /* copy t */
    ; 
}
```

As each member is copied from t to s, the postfix ++ is applied to both i and j to make sure that they are in position for the next pass through the loop. 

当每个字符从 t 复制到 s 时，后缀 ++ 同时作用于 i 和 j，以确保它们在下一轮循环时处于正确的位置。

Exercise 2-4. Write an alternative version of squeeze(s1,s2) that deletes each character in s1 that matches any character in the string s2. 

练习 2-4. 编写 squeeze(s1,s2) 的另一个版本，它删除 s1 中与字符串 s2 中任何字符相匹配的每个字符。

Exercise 2-5. Write the function any(s1,s2), which returns the first location in a string s1 where any character from the string s2 occurs, or -1 if s1 contains no characters from s2. (The standard library function strpbrk does the same job but returns a pointer to the location.) 

练习 2-5. 编写函数 any(s1,s2)，它返回字符串 s1 中第一个出现 s2 中任何字符的位置；如果 s1 不包含 s2 中的字符，则返回 -1。（标准库函数 strpbrk 完成同样的工作，但返回指向该位置的指针。）

## 2.9 Bitwise Operators

C provides six operators for bit manipulation; these may only be applied to integral operands, that is, char, short, int, and long, whether signed or unsigned. 

C 提供了六个用于位操作的运算符；它们只能应用于整型操作数，即 char、short、int 和 long，无论带符号还是无符号。

```txt
& bitwise AND
| bitwise inclusive OR
^ bitwise exclusive OR
<< left shift
>> right shift
~ one's complement (unary) 
```

The bitwise AND operator & is often used to mask off some set of bits, for example 

按位与运算符 & 常用于屏蔽某些位，例如

```c
n = n & 0177;
```

sets to zero all but the low-order 7 bits of n. 

把 n 中除低 7 位以外的所有位都置为零。

The bitwise OR operator | is used to turn bits on: 

按位或运算符 | 用于把位打开：

```c
x = x | SET_ON;
```

sets to one in x the bits that are set to one in SET_ON. 

把 x 中与 SET_ON 中为 1 的位相对应的位都置为 1。

The bitwise exclusive OR operator ^ sets a one in each bit position where its operands have different bits, and zero where they are the same. 

按位异或运算符 ^ 在两个操作数的对应位不同的每个位位置上置 1，在相同的位置上置 0。

One must distinguish the bitwise operators & and | from the logical operators && and ||, which imply left-to-right evaluation of a truth value. For example, if x is 1 and y is 2, then x & y is zero while x && y is one. 

必须把位运算符 & 和 | 与逻辑运算符 && 和 || 区分开，后者意味着从左到右对真值进行求值。例如，如果 x 是 1 而 y 是 2，那么 x & y 为零，而 x && y 为一。

The shift operators << and >> perform left and right shifts of their left operand by the number of bit positions given by the right operand, which must be non-negative. Thus x << 2 shifts the value of x by two positions, filling vacated bits with zero; this is equivalent to multiplication by 4. Right shifting an unsigned quantity always fits the vacated bits with zero. Right shifting a signed quantity will fill with bit signs (``arithmetic shift'') on some machines and with 0-bits (``logical shift'') on others. 

移位运算符 << 和 >> 把左操作数按右操作数给出的位数进行左移或右移，右操作数必须是非负的。因此 x << 2 把 x 的值左移两位，空出的位用零填充；这等价于乘以 4。对无符号量右移时，空出的位总是用零填充。对带符号量右移时，在某些机器上用符号位填充（"算术移位"），在另一些机器上用 0 位填充（"逻辑移位"）。

The unary operator ~ yields the one's complement of an integer; that is, it converts each 1-bit into a 0-bit and vice versa. For example 

一元运算符 ~ 求整数的反码（one's complement）；也就是说，它把每个 1 位变成 0 位，反之亦然。例如

```c
x = x & ~077 
```

sets the last six bits of x to zero. Note that x & ~077 is independent of word length, and is thus preferable to, for example, x & 0177700, which assumes that x is a 16-bit quantity. The portable form involves no extra cost, since ~077 is a constant expression that can be evaluated at compile time. 

把 x 的最后六位置为零。注意，x & ~077 与字长无关，因此比例如 x & 0177700 这样假定 x 是 16 位量的写法更好。可移植的形式并不增加额外开销，因为 ~077 是可以在编译时求值的常量表达式。

As an illustration of some of the bit operators, consider the function getbits(x,p,n) that returns the (right adjusted) n-bit field of x that begins at position p. We assume that bit position 0 is at the right end and that n and p are sensible positive values. For example, getbits(x,4,3) returns the three bits in positions 4, 3 and 2, right-adjusted. 

作为对一些位运算符的示例说明，考虑函数 getbits(x,p,n)，它返回 x 中从位置 p 开始的（右对齐的）n 位字段。我们假定位位置 0 位于右端，且 n 和 p 是合理的正值。例如，getbits(x,4,3) 返回位置 4、3 和 2 的三位，右对齐。

```c
/* getbits: get n bits from position p */
unsigned getbits(unsigned x, int p, int n)
{
    return (x >> (p+1-n)) & ~(~0 << n);
} 
```

The expression x >> (p+1-n) moves the desired field to the right end of the word. ~0 is all 1-bits; shifting it left n positions with ~0<<n places zeros in the rightmost n bits; complementing that with ~ makes a mask with ones in the rightmost n bits. 

表达式 x >> (p+1-n) 把所需的字段移动到字的右端。~0 是全 1 位；用 ~0<<n 把它左移 n 位，就把最右边的 n 位置成了零；再用 ~ 求补，就得到一个最右边 n 位为 1 的掩码。

Exercise 2-6. Write a function setbits(x,p,n,y) that returns x with the n bits that begin at position p set to the rightmost n bits of y, leaving the other bits unchanged. 

练习 2-6. 编写函数 setbits(x,p,n,y)，它返回把 x 中从位置 p 开始的 n 个位设置为 y 最右边 n 位之后的值，其余各位不变。

Exercise 2-7. Write a function invert(x,p,n) that returns x with the n bits that begin at position p inverted (i.e., 1 changed into 0 and vice versa), leaving the others unchanged. 

练习 2-7. 编写函数 invert(x,p,n)，它返回把 x 中从位置 p 开始的 n 个位取反（即 1 变成 0，反之亦然）之后的值，其余各位不变。

Exercise 2-8. Write a function rightrot(x,n) that returns the value of the integer x rotated to the right by n positions. 

练习 2-8. 编写函数 rightrot(x,n)，它返回整数 x 向右旋转 n 个位置后的值。

## 2.10 Assignment Operators and Expressions

An expression such as 

像下面这样的表达式

```c
i = i + 2 
```

in which the variable on the left side is repeated immediately on the right, can be written in the compressed form 

其中左边的变量在右边紧邻处重复出现，它可以写成压缩形式

```c
i += 2 
```

The operator += is called an assignment operator. 

运算符 += 称为赋值运算符（assignment operator）。

Most binary operators (operators like + that have a left and right operand) have a corresponding assignment operator op=, where op is one of 

大多数二元运算符（像 + 这样有左、右操作数的运算符）都有一个对应的赋值运算符 op=，其中 op 可以是

```c
+ - * / % << >> & ^ |
```

If expr1 and expr2 are expressions, then 

如果 expr1 和 expr2 是表达式，那么

```c
expr1 op= expr2
```

is equivalent to 

等价于

```c
expr1 = (expr1) op (expr2)
```

except that expr1 is computed only once. Notice the parentheses around expr2: 

只是 expr1 只计算一次。注意 expr2 两边的圆括号：

```c
x *= y + 1
```

means 

表示

```c
x = x * (y + 1)
```

rather than 

而不是

```c
x = x * y + 1 
```

As an example, the function bitcount counts the number of 1-bits in its integer argument. 

例如，函数 bitcount 统计其整型参数中值为 1 的位的数目。

```c
/* bitcount: count 1 bits in x */
int bitcount(unsigned x)
{
    int b;

    for (b = 0; x != 0; x >>= 1)
    if (x & 01)
    b++;
    return b;
} 
```

Declaring the argument x to be an unsigned ensures that when it is right-shifted, vacated bits will be filled with zeros, not sign bits, regardless of the machine the program is run on. 

把参数 x 声明为 unsigned 确保了当它右移时，空出的位用零而不是符号位填充，而与程序运行的机器无关。

Quite apart from conciseness, assignment operators have the advantage that they correspond better to the way people think. We say ``add 2 to i'' or ``increment i by 2'', not ``take i, add 2, then put the result back in i''. Thus the expression i += 2 is preferable to i = i+2. In addition, for a complicated expression like 

除了简洁之外，赋值运算符还有一个优点：它们更符合人们的思维方式。我们说"把 2 加到 i 上"或"把 i 增加 2"，而不是"取 i，加 2，然后把结果放回 i"。因此表达式 i += 2 比 i = i+2 更好。此外，对于像下面这样的复杂表达式

```c
yyval[ypv[p3+p4] + yypv[p1]] += 2 
```

the assignment operator makes the code easier to understand, since the reader doesn't have to check painstakingly that two long expressions are indeed the same, or to wonder why they're not. And an assignment operator may even help a compiler to produce efficient code. 

赋值运算符使代码更易于理解，因为读者不必费力检查两个长表达式是否确实相同，也不必纳闷为什么它们不同。而且赋值运算符甚至可能有助于编译器产生更高效的代码。

We have already seen that the assignment statement has a value and can occur in expressions; the most common example is 

我们已经看到赋值语句有值并且可以出现在表达式中；最常见的例子是

```c
while ((c = getchar()) != EOF)
... 
```

The other assignment operators (+=, -=, etc.) can also occur in expressions, although this is less frequent. 

其他赋值运算符（+=、-= 等）也可以出现在表达式中，尽管这不太常见。

In all such expressions, the type of an assignment expression is the type of its left operand, and the value is the value after the assignment. 

在所有这类表达式中，赋值表达式的类型是其左操作数的类型，其值是赋值之后的值。

Exercise 2-9. In a two's complement number system, x &= (x-1) deletes the rightmost 1-bit in x. Explain why. Use this observation to write a faster version of bitcount. 

练习 2-9. 在二进制补码数系统中，x &= (x-1) 删除 x 中最右边的值为 1 的位。请解释原因。利用这一观察写一个更快的 bitcount 版本。

## 2.11 Conditional Expressions

The statements 

下面的语句

```c
if (a > b)
    z = a;
else
    z = b; 
```

compute in z the maximum of a and b. The conditional expression, written with the ternary operator ``?:'', provides an alternate way to write this and similar constructions. In the expression 

在 z 中计算出 a 和 b 的最大值。用三元运算符 ``?:'' 书写的条件表达式提供了编写此类及类似构造的另一种方式。在表达式

```c
expr1 ? expr2 : expr3
```

the expression expr1 is evaluated first. If it is non-zero (true), then the expression expr2 is evaluated, and that is the value of the conditional expression. Otherwise expr3 is evaluated, and that is the value. Only one of expr2 and expr3 is evaluated. Thus to set z to the maximum of a and b, 

中，先计算表达式 expr1。如果它非零（真），则计算表达式 expr2，其值就是该条件表达式的值。否则计算 expr3，其值就是表达式的值。expr2 和 expr3 中只有一个会被计算。因此，要把 z 置为 a 和 b 的最大值，

```c
z = (a > b) ? a : b; /* z = max(a, b) */
```

It should be noted that the conditional expression is indeed an expression, and it can be used wherever any other expression can be. If expr2 and expr3 are of different types, the type of the result is determined by the conversion rules discussed earlier in this chapter. For example, if f is a float and n an int, then the expression 

应当注意，条件表达式确实是一个表达式，它可以用于任何其他表达式可以出现的地方。如果 expr2 和 expr3 的类型不同，结果的类型就由本章前面讨论的转换规则确定。例如，如果 f 是 float 而 n 是 int，那么表达式

```c
(n > 0) ? f : n 
```

is of type float regardless of whether n is positive. 

的类型是 float，而不管 n 是否为正。

Parentheses are not necessary around the first expression of a conditional expression, since the precedence of ?: is very low, just above assignment. They are advisable anyway, however, since they make the condition part of the expression easier to see. 

条件表达式的第一个表达式周围不需要圆括号，因为 ?: 的优先级非常低，仅高于赋值。不过还是建议加圆括号，因为这样使表达式的条件部分更容易看清。

The conditional expression often leads to succinct code. For example, this loop prints n elements of an array, 10 per line, with each column separated by one blank, and with each line (including the last) terminated by a newline. 

条件表达式常常能写出简洁的代码。例如，下面这个循环打印数组的 n 个元素，每行 10 个，每列之间用一个空格分隔，每行（包括最后一行）以换行符结束。

```c
for (i = 0; i < n; i++)
    printf("%6d%c", a[i], (i%10==9 || i==n-1) ? '\n' : ''); 
```

A newline is printed after every tenth element, and after the n-th. All other elements are followed by one blank. This might look tricky, but it's more compact than the equivalent ifelse. Another good example is 

每第十个元素之后以及第 n 个元素之后打印一个换行符。所有其他元素后面跟一个空格。这看起来可能有些难懂，但它比等价的 if-else 结构更紧凑。另一个好例子是

```c
printf("You have %d items%s.\n", n, n==1 ? "" : "s"); 
```

Exercise 2-10. Rewrite the function lower, which converts upper case letters to lower case, with a conditional expression instead of if-else. 

练习 2-10. 重写 lower 函数（它把大写字母转换为小写），用条件表达式代替 if-else。

## 2.12 Precedence and Order of Evaluation

Table 2.1 summarizes the rules for precedence and associativity of all operators, including those that we have not yet discussed. Operators on the same line have the same precedence; rows are in order of decreasing precedence, so, for example, *, /, and % all have the same precedence, which is higher than that of binary + and -. The ``operator'' () refers to function call. The operators -> and . are used to access members of structures; they will be covered in Chapter 6, along with sizeof (size of an object). Chapter 5 discusses * (indirection through a pointer) and & (address of an object), and Chapter 3 discusses the comma operator.

表 2.1 总结了所有运算符的优先级和结合性规则，其中包括我们尚未讨论的那些。同一行上的运算符具有相同的优先级；各行按优先级递减的顺序排列，因此，比如 *、/ 和 % 的优先级相同，且高于二元 + 和 -。"运算符" () 指函数调用。运算符 -> 和 . 用于访问结构的成员；它们将与 sizeof（对象的大小）一起在第 6 章讲述。第 5 章讨论 *（通过指针的间接访问）和 &（对象的地址），第 3 章讨论逗号运算符。

<table><tr><td>Operators</td><td>Associativity</td></tr><tr><td>() [] -&gt; .</td><td>left to right</td></tr><tr><td>! ~ ++ -- + - * (type) sizeof</td><td>right to left</td></tr><tr><td>* / %</td><td>left to right</td></tr><tr><td>+ -</td><td>left to right</td></tr><tr><td>&lt;&lt; &gt;&gt;</td><td>left to right</td></tr><tr><td>&lt; &lt;= &gt; &gt;=</td><td>left to right</td></tr><tr><td>== !=</td><td>left to right</td></tr><tr><td>&amp;</td><td>left to right</td></tr><tr><td>^</td><td>left to right</td></tr><tr><td>|</td><td>left to right</td></tr><tr><td>&amp;&amp;</td><td>left to right</td></tr><tr><td>| |</td><td>left to right</td></tr><tr><td>?:</td><td>right to left</td></tr><tr><td>= += -= *= /= %= &amp;= ^= |= &lt;&lt;= &gt;&gt;=</td><td>right to left</td></tr><tr><td>,</td><td>left to right</td></tr></table>

Unary & +, -, and * have higher precedence than the binary forms.

一元的 &、+、- 和 * 比相应的二元形式具有更高的优先级。

Table 2.1: Precedence and Associativity of Operators

表 2.1：运算符的优先级与结合性

Note that the precedence of the bitwise operators &, ^, and | falls below == and !=. This implies that bit-testing expressions like 

注意，位运算符 &、^ 和 | 的优先级低于 == 和 !=。这意味着像下面这样的位测试表达式

```c
if ((x & MASK) == 0) ... 
```

must be fully parenthesized to give proper results. 

必须完全加上圆括号才能得到正确的结果。

C, like most languages, does not specify the order in which the operands of an operator are evaluated. (The exceptions are &&, ||, ?:, and `,'.) For example, in a statement like 

C 同大多数语言一样，不规定运算符各操作数的求值顺序。（例外是 &&、||、?: 和 `,'。）例如，在像下面这样的语句中

```c
x = f() + g();
```

f may be evaluated before g or vice versa; thus if either f or g alters a variable on which the other depends, x can depend on the order of evaluation. Intermediate results can be stored in temporary variables to ensure a particular sequence. 

f 可能先于 g 求值，也可能相反；因此，如果 f 或 g 任何一个改变了另一个所依赖的变量，x 的值就可能取决于求值顺序。可以把中间结果存放到临时变量中，以确保特定的顺序。

Similarly, the order in which function arguments are evaluated is not specified, so the statement 

类似地，函数参数的求值顺序也没有规定，因此语句

```c
printf("%d %d\n", ++n, power(2, n)); /* WRONG */
```

can produce different results with different compilers, depending on whether n is incremented before power is called. The solution, of course, is to write 

在不同的编译器上可能产生不同的结果，取决于在调用 power 之前 n 是否被递增。解决办法当然是写成

```c
printf("%d %d\n", n, power(2, n));
```

Function calls, nested assignment statements, and increment and decrement operators cause ``side effects'' - some variable is changed as a by-product of the evaluation of an expression. In any expression involving side effects, there can be subtle dependencies on the order in which variables taking part in the expression are updated. One unhappy situation is typified by the statement 

函数调用、嵌套的赋值语句、以及递增和递减运算符都会产生"副作用"——某些变量作为表达式求值的副产品而被改变。在任何涉及副作用的表达式中，都可能出现对表达式中各变量更新顺序的微妙依赖。一个令人不快的情形可以用下面的语句作为典型：

```c
a[i] = i++;
```

The question is whether the subscript is the old value of i or the new. Compilers can interpret this in different ways, and generate different answers depending on their interpretation. The standard intentionally leaves most such matters unspecified. When side effects (assignment to variables) take place within an expression is left to the discretion of the compiler, since the best order depends strongly on machine architecture. (The standard does specify that all side effects on arguments take effect before a function is called, but that would not help in the call to printf above.) 

问题是下标是 i 的旧值还是新值。编译器可以对此有不同的解释，并根据各自的解释产生不同的答案。标准有意把这类问题留作未规定。副作用（对变量的赋值）在表达式中何时发生由编译器自行决定，因为最好的顺序在很大程度上取决于机器体系结构。（标准确实规定了参数上的所有副作用都发生在函数被调用之前，但这对上面的 printf 调用没有帮助。）

The moral is that writing code that depends on order of evaluation is a bad programming practice in any language. Naturally, it is necessary to know what things to avoid, but if you don't know how they are done on various machines, you won't be tempted to take advantage of a particular implementation.

其教训是：编写依赖求值顺序的代码，在任何语言中都是不好的编程习惯。当然，有必要知道哪些事情应当避免；但如果你不知道它们在各种机器上是怎样实现的，你就不会想去利用某个特定实现的特性。 

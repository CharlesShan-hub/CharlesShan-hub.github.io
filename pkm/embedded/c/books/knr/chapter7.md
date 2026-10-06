---
title:
tags:
date:
comment:
---


## Chapter 7 - Input and Output

Input and output are not part of the C language itself, so we have not emphasized them in our presentation thus far. Nonetheless, programs interact with their environment in much more complicated ways than those we have shown before. In this chapter we will describe the standard library, a set of functions that provide input and output, string handling, storage management, mathematical routines, and a variety of other services for C programs. We will concentrate on input and output 

输入输出并不是 C 语言本身的组成部分，因此到目前为止我们对它着墨不多。尽管如此，程序与其环境的交互方式远比我们之前展示的复杂得多。本章将描述“标准库”（standard library），即一组为 C 程序提供输入输出、字符串处理、存储管理、数学例程以及多种其他服务的函数。我们将把重点放在输入输出上。

The ANSI standard defines these library functions precisely, so that they can exist in compatible form on any system where C exists. Programs that confine their system interactions to facilities provided by the standard library can be moved from one system to another without change. 

ANSI 标准精确地定义了这些库函数，使它们能够在任何存在 C 的系统上以兼容的形式存在。将系统交互限制在标准库设施之内的程序，可以不加改动地从一个系统移植到另一个系统。

The properties of library functions are specified in more than a dozen headers; we have already seen several of these, including <stdio.h>, <string.h>, and <ctype.h>. We will not present the entire library here, since we are more interested in writing C programs that use it. The library is described in detail in Appendix B. 

库函数的特性在十多个头文件中规定；我们已经见过其中几个，包括 <stdio.h>、<string.h> 和 <ctype.h>。这里不会介绍整个库，因为我们更关心的是编写使用它的 C 程序。该库在附录 B 中有详细描述。

## 7.1 Standard Input and Output

As we said in Chapter 1, the library implements a simple model of text input and output. A text stream consists of a sequence of lines; each line ends with a newline character. If the system doesn't operate that way, the library does whatever necessary to make it appear as if it does. For instance, the library might convert carriage return and linefeed to newline on input and back again on output. 

正如第 1 章所说，标准库实现了一个简单的文本输入输出模型。文本流（text stream）由一系列行组成，每一行以一个换行符结尾。如果系统并非如此运作，库会采取一切必要手段使之看起来像是这样。例如，库可能会在输入时把回车符和换行符转换为换行符，在输出时再转换回去。

The simplest input mechanism is to read one character at a time from the standard input, normally the keyboard, with getchar: 

最简单的输入机制是用 getchar 每次从标准输入（通常是键盘）读取一个字符：

```c
int getchar(void) 
```

getchar returns the next input character each time it is called, or EOF when it encounters end of file. The symbolic constant EOF is defined in <stdio.h>. The value is typically -1, bus tests should be written in terms of EOF so as to be independent of the specific value. 

getchar 每次被调用时返回下一个输入字符，遇到文件末尾时返回 EOF。符号常量 EOF 定义在 <stdio.h> 中，其值通常为 -1，但测试应基于 EOF 来写，以不依赖其具体值。

In many environments, a file may be substituted for the keyboard by using the < convention for input redirection: if a program prog uses getchar, then the command line 

```txt
prog <infile 
```

causes prog to read characters from infile instead. The switching of the input is done in such a way that prog itself is oblivious to the change; in particular, the string ``<infile'' is not included in the command-line arguments in argv. Input switching is also invisible if the input comes from another program via a pipe mechanism: on some systems, the command line 

这样 prog 将从 infile 而不是键盘读取字符。输入的切换以 prog 察觉不到变化的方式进行；特别是，字符串 ``<infile'' 不会包含在 argv 的命令行参数中。如果输入来自通过管道机制连接的另一个程序，输入切换同样是不可见的：在某些系统上，命令行

```txt
otherprog | prog 
```

runs the two programs otherprog and prog, and pipes the standard output of otherprog into the standard input for prog. 

将运行 otherprog 和 prog 这两个程序，并把 otherprog 的标准输出管道连接到 prog 的标准输入。

The function 

```c
int putchar(int c) 
```

is used for output: putchar(c) puts the character c on the standard output, which is by default the screen. putchar returns the character written, or EOF is an error occurs. Again, output can usually be directed to a file with >filename: if prog uses putchar, 

putchar(c) 用于输出：它把字符 c 放到标准输出上，标准输出默认为屏幕。putchar 返回写入的字符，出错时返回 EOF。同样，输出通常可以用 >filename 重定向到文件：如果 prog 使用 putchar，那么命令行

```txt
prog >outfile 
```

will write the standard output to outfile instead. If pipes are supported, 

将把标准输出写到 outfile 而不是屏幕。如果支持管道，那么命令行

```txt
prog | anotherprog 
```

puts the standard output of prog into the standard input of anotherprog. 

将把 prog 的标准输出放到 anotherprog 的标准输入中。

Output produced by printf also finds its way to the standard output. Calls to putchar and printf may be interleaved - output happens in the order in which the calls are made. 

printf 产生的输出也会送往标准输出。对 putchar 和 printf 的调用可以交错进行——输出按调用发生的顺序产生。

Each source file that refers to an input/output library function must contain the line 

每个引用输入/输出库函数的源文件都必须包含下面这一行：

```c
#include <stdio.h> 
```

before the first reference. When the name is bracketed by < and > a search is made for the header in a standard set of places (for example, on UNIX systems, typically in the directory /usr/include). 

且必须在首次引用之前。当名字由 < 和 > 括起来时，将在一组标准位置（例如，UNIX 系统中通常在目录 /usr/include 中）查找该头文件。

Many programs read only one input stream and write only one output stream; for such programs, input and output with getchar, putchar, and printf may be entirely adequate, and is certainly enough to get started. This is particularly true if redirection is used to connect the output of one program to the input of the next. For example, consider the program lower, which converts its input to lower case: 

许多程序只读一个输入流、只写一个输出流；对这类程序而言，用 getchar、putchar 和 printf 进行输入输出可能就完全够了，而且肯定足够用来入门。如果使用重定向把一个程序的输出连接到另一个程序的输入，则尤其如此。例如，考虑程序 lower，它把输入转换为小写：

```c
#include <stdio.h>
#include <ctype.h>

main() /* lower: convert input to lower case */
{
    int c;

    while ((c = getchar()) != EOF)
        putchar(tolower(c));
    return 0;
} 
```

The function tolower is defined in <ctype.h>; it converts an upper case letter to lower case, and returns other characters untouched. As we mentioned earlier, ``functions'' like getchar and putchar in <stdio.h> and tolower in <ctype.h> are often macros, thus avoiding the overhead of a function call per character. We will show how this is done in Section 8.5. Regardless of how the <ctype.h> functions are implemented on a given machine, programs that use them are shielded from knowledge of the character set. 

函数 tolower 定义在 <ctype.h> 中；它把大写字母转换为小写，其他字符原样返回。正如我们前面提到的，<stdio.h> 中像 getchar 和 putchar 这样的“函数”以及 <ctype.h> 中的 tolower 通常都是宏，从而避免了每个字符一次函数调用的开销。我们将在 8.5 节展示这是如何做到的。不管 <ctype.h> 中的函数在给定机器上如何实现，使用它们的程序都不必了解字符集的具体细节。

Exercise 7-1. Write a program that converts upper case to lower or lower case to upper, depending on the name it is invoked with, as found in argv[0]. 

练习 7-1. 编写一个程序，根据它被调用时在 argv[0] 中找到的名字，把大写字母转换为小写，或把小写字母转换为大写。

## 7.2 Formatted Output - printf

The output function printf translates internal values to characters. We have used printf informally in previous chapters. The description here covers most typical uses but is not complete; for the full story, see Appendix B. 

输出函数 printf 把内部数值转换为字符。在前面的章节中我们已经非正式地使用过 printf。这里的描述涵盖了大多数典型用法但并不完整；完整的说明见附录 B。

```c
int printf(char *format, arg1, arg2, ...); 
```

printf converts, formats, and prints its arguments on the standard output under control of the format. It returns the number of characters printed. 

printf 在 format 的控制下对其参数进行转换、格式化，并输出到标准输出。它返回打印的字符数。

The format string contains two types of objects: ordinary characters, which are copied to the output stream, and conversion specifications, each of which causes conversion and printing of the next successive argument to printf. Each conversion specification begins with a % and ends with a conversion character. Between the % and the conversion character there may be, in order: 

格式串包含两类对象：普通字符（直接复制到输出流）和转换说明（conversion specification），每个转换说明对应地转换并打印 printf 的下一个相继参数。每个转换说明以 % 开头、以转换字符结尾。在 % 和转换字符之间可以依次出现：

• A minus sign, which specifies left adjustment of the converted argument. 

• 减号，指定转换后的参数左对齐。

• A number that specifies the minimum field width. The converted argument will be printed in a field at least this wide. If necessary it will be padded on the left (or right, if left adjustment is called for) to make up the field width. 

• 一个数字，指定最小字段宽度。转换后的参数将打印在一个至少这么宽的字段中。如有必要，将在左边（如果要求左对齐则在右边）填充以达到字段宽度。

• A period, which separates the field width from the precision. 

• 一个句点，用于分隔字段宽度和精度。

• A number, the precision, that specifies the maximum number of characters to be printed from a string, or the number of digits after the decimal point of a floating-point value, or the minimum number of digits for an integer. 

• 一个数字，即精度，指定字符串要打印的最大字符数、浮点值小数点后的位数、或整数的最少位数。

• An h if the integer is to be printed as a short, or l (letter ell) if as a long. 

• 如果整数要按 short 打印，则用 h；如果按 long 打印，则用 l（字母 ell）。

Conversion characters are shown in Table 7.1. If the character after the % is not a conversion specification, the behavior is undefined. 

转换字符如表 7.1 所示。如果 % 后面的字符不是转换说明，其行为是未定义的。


Table 7.1 Basic Printf Conversions

表 7.1 printf 的基本转换


<table><tr><td>Character</td><td>Argument type; Printed As</td></tr><tr><td>d,i</td><td>int; decimal number</td></tr><tr><td>o</td><td>int; unsigned octal number (without a leading zero)</td></tr><tr><td>x,X</td><td>int; unsigned hexadecimal number (without a leading 0x or 0X), using abcdef or ABCDEF for 10, ...,15.</td></tr><tr><td>u</td><td>int; unsigned decimal number</td></tr><tr><td>c</td><td>int; single character</td></tr><tr><td>s</td><td>char *; print characters from the string until a &#x27;\0&#x27; or the number of characters given by the precision.</td></tr><tr><td>f</td><td>double; [-]m.dddddd, where the number of d&#x27;s is given by the precision (default 6).</td></tr><tr><td>e,E</td><td>double; [-]m.dddddde+/-xx or [-]m.ddddddE+/-xx, where the number of d&#x27;s is given by the precision (default 6).</td></tr><tr><td>g,G</td><td>double; use %e or %E if the exponent is less than -4 or greater than or equal to the precision; otherwise use %f. Trailing zeros and a trailing decimal point are not printed.</td></tr><tr><td>p</td><td>void *; pointer (implementation-dependent representation).</td></tr><tr><td>%</td><td>no argument is converted; print a %</td></tr></table>

A width or precision may be specified as *, in which case the value is computed by converting the next argument (which must be an int). For example, to print at most max characters from a string s, 

宽度和精度可以用 * 指定，此时该值通过转换下一个参数（必须是 int）计算得到。例如，要打印字符串 s 中至多 max 个字符：

```c
printf("%.*s", max, s); 
```

Most of the format conversions have been illustrated in earlier chapters. One exception is the precision as it relates to strings. The following table shows the effect of a variety of specifications in printing ``hello, world'' (12 characters). We have put colons around each field so you can see it extent. 

大多数格式转换已在前面各章中示例过。一个例外是与字符串相关的精度。下表展示了用各种说明打印 ``hello, world''（12 个字符）的效果。我们在每个字段两侧放上冒号，以便看清其范围。

```txt
:%s: :hello, world:
:%10s: :hello, world:
:%.10s: :hello, wor:
:%-10s: :hello, world:
:%.15s: :hello, world:
:%-15s: :hello, world :
:%15.10s: : hello, wor:
:%-15.10s: :hello, wor : 
```

A warning: printf uses its first argument to decide how many arguments follow and what their type is. It will get confused, and you will get wrong answers, if there are not enough arguments of if they are the wrong type. You should also be aware of the difference between these two calls: 

一个警告：printf 用它的第一个参数来决定后面有多少个参数以及它们的类型。如果参数不足或类型不对，它就会搞混，你会得到错误的结果。你还应该注意下面两个调用的区别：

```c
printf(s);    /* FAILS if s contains % */
printf("%s", s);    /* SAFE */ 
```

The function sprintf does the same conversions as printf does, but stores the output in a string: 

函数 sprintf 执行与 printf 相同的转换，但把输出存放在一个字符串中：

```c
int sprintf(char *string, char *format, arg1, arg2, ...); 
```

sprintf formats the arguments in arg1, arg2, etc., according to format as before, but places the result in string instead of the standard output; string must be big enough to receive the result. 

sprintf 像前面一样根据 format 对 arg1、arg2 等参数进行格式化，但把结果放在 string 中而不是标准输出上；string 必须足够大以容纳结果。

Exercise 7-2. Write a program that will print arbitrary input in a sensible way. As a minimum, it should print non-graphic characters in octal or hexadecimal according to local custom, and break long text lines. 

练习 7-2. 编写一个程序，以合理的方式打印任意输入。至少，它应按照本地习惯以八进制或十六进制打印非图形字符，并折断长文本行。

## 7.3 Variable-length Argument Lists

This section contains an implementation of a minimal version of printf, to show how to write a function that processes a variable-length argument list in a portable way. Since we are mainly interested in the argument processing, minprintf will process the format string and arguments but will call the real printf to do the format conversions. 

本节给出 printf 的一个极简版本的实现，以展示如何以可移植的方式编写处理变长参数表的函数。由于我们主要关心参数处理，minprintf 将处理格式串和参数，但调用真正的 printf 来完成格式转换。

The proper declaration for printf is 

printf 的正确声明是

```c
int printf(char *fmt, ...) 
```

where the declaration ... means that the number and types of these arguments may vary. The declaration ... can only appear at the end of an argument list. Our minprintf is declared as 

其中声明 ... 表示参数的个数和类型可以变化。声明 ... 只能出现在参数表的末尾。我们的 minprintf 声明为

```c
void minprintf(char *fmt, ...) 
```

since we will not return the character count that printf does. 

因为我们不返回 printf 所返回的字符计数。

The tricky bit is how minprintf walks along the argument list when the list doesn't even have a name. The standard header <stdarg.h> contains a set of macro definitions that define how to step through an argument list. The implementation of this header will vary from machine to machine, but the interface it presents is uniform. 

棘手之处在于：当参数表连名字都没有时，minprintf 如何遍历它。标准头文件 <stdarg.h> 包含一组宏定义，规定了如何遍历参数表。该头文件的实现在不同机器上有所不同，但它提供的接口是统一的。

The type va_list is used to declare a variable that will refer to each argument in turn; in minprintf, this variable is called ap, for ``argument pointer.'' The macro va_start initializes ap to point to the first unnamed argument. It must be called once before ap is used. There must be at least one named argument; the final named argument is used by va_start to get started. 

类型 va_list 用于声明一个将依次引用每个参数的变量；在 minprintf 中，这个变量称为 ap，即“参数指针”（argument pointer）。宏 va_start 把 ap 初始化为指向第一个无名参数。在使用 ap 之前必须调用它一次。必须至少有一个有名参数；最后一个有名参数由 va_start 用来开始。

Each call of va_arg returns one argument and steps ap to the next; va_arg uses a type name to determine what type to return and how big a step to take. Finally, va_end does whatever cleanup is necessary. It must be called before the program returns. 

每次调用 va_arg 返回一个参数并把 ap 前进到下一个；va_arg 使用一个类型名来决定返回什么类型以及步长多大。最后，va_end 完成一切必要的清理工作。必须在程序返回之前调用它。

These properties form the basis of our simplified printf: 

这些性质构成了我们简化版 printf 的基础：

```c
#include <stdarg.h>

/* minprintf: minimal printf with variable argument list */
void minprintf(char *fmt, ...)
{
    va_list ap; /* points to each unnamed arg in turn */
    char *p, *sval;
    int ival;
    double dval;

    va_start(ap, fmt); /* make ap point to 1st unnamed arg */
    for (p = fmt; *p; p++) {
        if (*p != '%') {
            putchar(*p);
            continue;
        }
        switch (*++p) {
        case 'd':
            ival = va_arg(ap, int);
            printf("%d", ival);
            break;
        case 'f':
            dval = va_arg(ap, double);
            printf("%f", dval);
            break;
        case 's':
            for (sval = va_arg(ap, char *); *sval; sval++)
                putchar(*sval);
            break;
        default:
            putchar(*p);
            break;
        }
    }
    va_end(ap); /* clean up when done */
} 
```

Exercise 7-3. Revise minprintf to handle more of the other facilities of printf. 

练习 7-3. 改进 minprintf，使其处理 printf 的更多其他功能。

## 7.4 Formatted Input - Scanf

The function scanf is the input analog of printf, providing many of the same conversion facilities in the opposite direction. 

函数 scanf 是 printf 在输入方向的对应物，以相反的方向提供许多相同的转换功能。

```c
int scanf(char *format, ...) 
```

scanf reads characters from the standard input, interprets them according to the specification in format, and stores the results through the remaining arguments. The format argument is described below; the other arguments, each of which must be a pointer, indicate where the corresponding converted input should be stored. As with printf, this section is a summary of the most useful features, not an exhaustive list. 

scanf 从标准输入读取字符，按 format 中的说明解释它们，并通过其余参数存放结果。format 参数将在下面描述；其他参数每个都必须是指针，指出相应的转换后的输入应存放到何处。与 printf 一样，本节是对最有用特性的概述，并非详尽清单。

scanf stops when it exhausts its format string, or when some input fails to match the control specification. It returns as its value the number of successfully matched and assigned input items. This can be used to decide how many items were found. On the end of file, EOF is returned; note that this is different from 0, which means that the next input character does not match the first specification in the format string. The next call to scanf resumes searching immediately after the last character already converted. 

scanf 在用完其格式串或某个输入与控制说明不匹配时停止。它返回成功匹配并赋值的输入项数，可用于判断找到了多少项。在文件末尾返回 EOF；注意这与 0 不同，0 表示下一个输入字符与格式串中的第一个说明不匹配。下一次调用 scanf 将从上一次已转换的最后一个字符之后立即继续搜索。

There is also a function sscanf that reads from a string instead of the standard input: 

还有一个函数 sscanf，它从字符串而不是标准输入读取：

```c
int sscanf(char *string, char *format, arg1, arg2, ...) 
```

It scans the string according to the format in format and stores the resulting values through arg1, arg2, etc. These arguments must be pointers. 

它按照 format 中的格式扫描 string，并通过 arg1、arg2 等存放结果值。这些参数必须是指针。

The format string usually contains conversion specifications, which are used to control conversion of input. The format string may contain: 

格式串通常包含用于控制输入转换的转换说明。格式串中可以含有：

• Blanks or tabs, which are not ignored. 

• 空白或制表符，它们不会被忽略。

• Ordinary characters (not %), which are expected to match the next non-white space character of the input stream. 

• 普通字符（非 %），它们应与输入流中下一个非空白字符匹配。

• Conversion specifications, consisting of the character %, an optional assignment suppression character *, an optional number specifying a maximum field width, an optional h, l or L indicating the width of the target, and a conversion character. 

• 转换说明，由字符 %、可选的赋值抑制字符 *、可选的指定最大字段宽度的数字、可选的指示目标宽度的 h、l 或 L，以及一个转换字符组成。

A conversion specification directs the conversion of the next input field. Normally the result is places in the variable pointed to by the corresponding argument. If assignment suppression is indicated by the * character, however, the input field is skipped; no assignment is made. An input field is defined as a string of non-white space characters; it extends either to the next white space character or until the field width, is specified, is exhausted. This implies that scanf will read across boundaries to find its input, since newlines are white space. (White space characters are blank, tab, newline, carriage return, vertical tab, and formfeed.) 

转换说明指示对下一个输入字段的转换。通常，结果存放在相应参数所指向的变量中。但如果用 * 字符指示了赋值抑制，则跳过该输入字段，不进行赋值。输入字段定义为不含空白字符的字符串；它延伸到下一个空白字符，或在指定了字段宽度时直到字段宽度用尽。这意味着 scanf 会跨过行边界去寻找它的输入，因为换行符也是空白。（空白字符包括空格、制表符、换行符、回车符、垂直制表符和换页符。）

The conversion character indicates the interpretation of the input field. The corresponding argument must be a pointer, as required by the call-by-value semantics of C. Conversion characters are shown in Table 7.2. 

转换字符指明对输入字段的解释方式。相应参数必须是指针，这是 C 按值调用语义所要求的。转换字符如表 7.2 所示。


Table 7.2: Basic Scanf Conversions

表 7.2 scanf 的基本转换


<table><tr><td>Character</td><td>Input Data; Argument type</td></tr><tr><td>d</td><td>decimal integer; int *</td></tr><tr><td>i</td><td>integer; int *. The integer may be in octal (leading 0) or hexadecimal (leading 0x or 0x).</td></tr><tr><td>o</td><td>octal integer (with or without leading zero); int *</td></tr><tr><td>u</td><td>unsigned decimal integer; unsigned int *</td></tr><tr><td>x</td><td>hexadecimal integer (with or without leading 0x or 0x); int *</td></tr><tr><td>c</td><td>characters; char *. The next input characters (default 1) are placed at the indicated spot. The normal skip-over white space is suppressed; to read the next non-white space character, use %1s</td></tr><tr><td>s</td><td>character string (not quoted); char *, pointing to an array of characters long enough for the string and a terminating '\0' that will be added.</td></tr><tr><td>e,f,g</td><td>floating-point number with optional sign, optional decimal point and optional exponent; float *</td></tr><tr><td>%</td><td>literal %; no assignment is made.</td></tr></table>

The conversion characters d, i, o, u, and x may be preceded by h to indicate that a pointer to short rather than int appears in the argument list, or by l (letter ell) to indicate that a pointer to long appears in the argument list. 

转换字符 d、i、o、u 和 x 前面可以加上 h，表示参数表中出现的是指向 short 而不是 int 的指针；或者加上 l（字母 ell），表示参数表中出现的是指向 long 的指针。

As a first example, the rudimentary calculator of Chapter 4 can be written with scanf to do the input conversion: 

作为第一个例子，第 4 章的初级计算器可以用 scanf 来完成输入转换而改写为：

```c
#include <stdio.h>

main() /* rudimentary calculator */
{
    double sum, v;

    sum = 0;
    while (scanf("%lf", &v) == 1)
        printf("\t%.2f\n", sum += v);
    return 0;
} 
```

Suppose we want to read input lines that contain dates of the form 

假设我们要读取包含如下形式日期的输入行：

```txt
25 Dec 1988
```

The scanf statement is

scanf 语句是

```c
int day, year;
char monthname[20];
scanf("%d %s %d", &day, monthname, &year);
```

No & is used with monthname, since an array name is a pointer. 

monthname 前没有用 &，因为数组名本身就是指针。

Literal characters can appear in the scanf format string; they must match the same characters in the input. So we could read dates of the form mm/dd/yy with the scanf statement: 

scanf 的格式串中可以有字面字符；它们必须与输入中的相同字符匹配。因此我们可以用下面的 scanf 语句读取 mm/dd/yy 形式的日期：

```c
int day, month, year;
scanf("%d/%d/%d", &month, &day, &year); 
```

scanf ignores blanks and tabs in its format string. Furthermore, it skips over white space (blanks, tabs, newlines, etc.) as it looks for input values. To read input whose format is not fixed, it is often best to read a line at a time, then pick it apart with scanf. For example, suppose we want to read lines that might contain a date in either of the forms above. Then we could write 

scanf 忽略其格式串中的空格和制表符。此外，它在寻找输入值时会跳过空白（空格、制表符、换行符等）。要读取格式不固定的输入，通常最好一次读一行，然后再用 sscanf 把它拆开。例如，假设我们要读取的行可能包含上述两种形式之一的日期，则可以这样写：

```c
while (getline(line, sizeof(line)) > 0) {
    if (sscanf(line, "%d %s %d", &day, monthname, &year) == 3)
        printf("valid: %s\n", line); /* 25 Dec 1988 form */
    else if (sscanf(line, "%d/%d/%d", &month, &day, &year) == 3)
        printf("valid: %s\n", line); /* mm/dd/yy form */
    else
        printf("invalid: %s\n", line); /* invalid form */
}
```

Calls to scanf can be mixed with calls to other input functions. The next call to any input function will begin by reading the first character not read by scanf. 

对 scanf 的调用可以与其他输入函数的调用混用。下一次对任何输入函数的调用将从 scanf 未读取的第一个字符开始读取。

A final warning: the arguments to scanf and sscanf must be pointers. By far the most common error is writing 

最后一个警告：scanf 和 sscanf 的参数必须是指针。到目前为止最常见的错误是写成

```c
scanf("%d", n);
```

instead of

而不是

```c
scanf("%d", &n);
```

This error is not generally detected at compile time. 

这一错误通常在编译时检测不出来。

Exercise 7-4. Write a private version of scanf analogous to minprintf from the previous section. 

练习 7-4. 编写一个私有的 scanf 版本，类似于上一节的 minprintf。

Exercise 7-5. Rewrite the postfix calculator of Chapter 4 to use scanf and/or sscanf to do the input and number conversion. 

练习 7-5. 改写第 4 章的后缀计算器，用 scanf 和/或 sscanf 完成输入和数字转换。

## 7.5 File Access

The examples so far have all read the standard input and written the standard output, which are automatically defined for a program by the local operating system. 

到目前为止，我们所有的例子都是从标准输入读、往标准输出写，而标准输入输出是由本地操作系统自动为程序定义好的。

The next step is to write a program that accesses a file that is not already connected to the program. One program that illustrates the need for such operations is cat, which concatenates a set of named files into the standard output. cat is used for printing files on the screen, and as a general-purpose input collector for programs that do not have the capability of accessing files by name. For example, the command 

下一步是编写一个访问尚未连接到程序的文件的程序。cat 是说明这类操作必要性的一种程序，它把一组命名文件串接后送到标准输出。cat 用于在屏幕上打印文件，也作为通用的输入收集器，供那些没有按名字访问文件能力的程序使用。例如，命令

```txt
cat x.c y.c 
```

prints the contents of the files x.c and y.c (and nothing else) on the standard output. 

将在标准输出上打印文件 x.c 和 y.c 的内容（此外别无其他）。

The question is how to arrange for the named files to be read - that is, how to connect the external names that a user thinks of to the statements that read the data. 

问题在于如何安排读取这些命名文件——也就是说，如何把用户所想的外部名字连接到读数据的语句上。

The rules are simple. Before it can be read or written, a file has to be opened by the library function fopen. fopen takes an external name like x.c or y.c, does some housekeeping and negotiation with the operating system (details of which needn't concern us), and returns a pointer to be used in subsequent reads or writes of the file. 

规则很简单。文件在读写之前必须先用库函数 fopen 打开。fopen 接受一个像 x.c 或 y.c 这样的外部名字，做一些与操作系统的内部处理和协商（细节我们不必关心），并返回一个指针，供随后对该文件的读写使用。

This pointer, called the file pointer, points to a structure that contains information about the file, such as the location of a buffer, the current character position in the buffer, whether the file is being read or written, and whether errors or end of file have occurred. Users don't need to know the details, because the definitions obtained from <stdio.h> include a structure declaration called FILE. The only declaration needed for a file pointer is exemplified by 

这个指针称为文件指针（file pointer），它指向一个包含文件相关信息的结构，如缓冲区的位置、缓冲区中当前字符的位置、文件是正在读还是正在写、以及是否发生了错误或到达文件末尾。用户不必了解这些细节，因为从 <stdio.h> 获得的定义中包含一个名为 FILE 的结构声明。文件指针所需的唯一声明示例如下：

```c
FILE *fp;
FILE *fopen(char *name, char *mode); 
```

This says that fp is a pointer to a FILE, and fopen returns a pointer to a FILE. Notice that FILE is a type name, like int, not a structure tag; it is defined with a typedef. (Details of how fopen can be implemented on the UNIX system are given in Section 8.5.) 

这表示 fp 是一个指向 FILE 的指针，fopen 也返回一个指向 FILE 的指针。注意 FILE 是一个类型名，像 int 一样，而不是结构标记；它是用 typedef 定义的。（fopen 在 UNIX 系统上如何实现的细节见 8.5 节。）

The call to fopen in a program is 

程序中对 fopen 的调用是

```c
fp = fopen(name, mode); 
```

The first argument of fopen is a character string containing the name of the file. The second argument is the mode, also a character string, which indicates how one intends to use the file. Allowable modes include read ("r"), write ("w"), and append ("a"). Some systems distinguish between text and binary files; for the latter, a "b" must be appended to the mode string. 

fopen 的第一个参数是包含文件名的字符串。第二个参数是模式（mode），也是一个字符串，指明打算如何使用该文件。允许的模式包括读（"r"）、写（"w"）和追加（"a"）。有些系统区分文本文件和二进制文件；对后者，须在模式串后面追加 "b"。

If a file that does not exist is opened for writing or appending, it is created if possible. Opening an existing file for writing causes the old contents to be discarded, while opening for appending preserves them. Trying to read a file that does not exist is an error, and there may be other causes of error as well, like trying to read a file when you don't have permission. If there is any error, fopen will return NULL. (The error can be identified more precisely; see the discussion of error-handling functions at the end of Section 1 in Appendix B.) 

以写或追加方式打开一个不存在的文件时，如有可能就会创建它。以写方式打开一个已存在的文件会导致其旧内容被丢弃，而以追加方式打开则保留旧内容。读取一个不存在的文件是错误的，还可能有其他出错原因，比如在没有权限的情况下试图读取文件。如有任何错误，fopen 将返回 NULL。（可以更精确地识别错误；参见附录 B 第 1 节末尾关于错误处理函数的讨论。）

The next thing needed is a way to read or write the file once it is open. getc returns the next character from a file; it needs the file pointer to tell it which file. 

下一个需要的是文件打开之后读写它的方式。getc 返回文件中的下一个字符；它需要文件指针来告诉它读哪个文件。

```c
int getc(FILE *fp) 
```

getc returns the next character from the stream referred to by fp; it returns EOF for end of file or error. 

getc 返回 fp 所引用的流中的下一个字符；遇到文件末尾或出错时返回 EOF。

putc is an output function: 

putc 是一个输出函数：

```c
int putc(int c, FILE *fp) 
```

putc writes the character c to the file fp and returns the character written, or EOF if an error occurs. Like getchar and putchar, getc and putc may be macros instead of functions. 

putc 把字符 c 写到文件 fp 上并返回写入的字符，出错时返回 EOF。与 getchar 和 putchar 一样，getc 和 putc 可能是宏而不是函数。

When a C program is started, the operating system environment is responsible for opening three files and providing pointers for them. These files are the standard input, the standard output, and the standard error; the corresponding file pointers are called stdin, stdout, and stderr, and are declared in <stdio.h>. Normally stdin is connected to the keyboard and stdout and stderr are connected to the screen, but stdin and stdout may be redirected to files or pipes as described in Section 7.1. 

C 程序启动时，操作系统环境负责打开三个文件并为它们提供指针。这三个文件是标准输入、标准输出和标准错误；相应的文件指针称为 stdin、stdout 和 stderr，声明在 <stdio.h> 中。通常 stdin 连接到键盘，stdout 和 stderr 连接到屏幕，但按照 7.1 节所述，stdin 和 stdout 可以重定向到文件或管道。

getchar and putchar can be defined in terms of getc, putc, stdin, and stdout as follows: 

getchar 和 putchar 可以用 getc、putc、stdin 和 stdout 定义如下：

```c
#define getchar()    getc(stdin)
#define putchar(c)    putc((c), stdout) 
```

For formatted input or output of files, the functions fscanf and fprintf may be used. These are identical to scanf and printf, except that the first argument is a file pointer that specifies the file to be read or written; the format string is the second argument. 

对文件进行格式化输入或输出时，可以使用函数 fscanf 和 fprintf。它们与 scanf 和 printf 相同，只是第一个参数是一个文件指针，指定要读或写的文件；格式串是第二个参数。

```c
int fscanf(FILE *fp, char *format, ...)
int fprintf(FILE *fp, char *format, ...) 
```

With these preliminaries out of the way, we are now in a position to write the program cat to concatenate files. The design is one that has been found convenient for many programs. If there are command-line arguments, they are interpreted as filenames, and processed in order. If there are no arguments, the standard input is processed. 

有了这些准备，我们现在可以编写串接文件的程序 cat 了。这种设计已被发现适用于许多程序。如果有命令行参数，就把它们解释为文件名并按顺序处理。如果没有参数，就处理标准输入。

```c
#include <stdio.h>

/* cat: concatenate files, version 1 */
main(int argc, char *argv[])
{
    FILE *fp;
    void filecopy(FILE *, FILE *);

    if (argc == 1) /* no args; copy standard input */
        filecopy(stdin, stdout);
    else 
        while (--argc > 0)
            if ((fp = fopen(*++argv, "r")) == NULL) {
                printf("cat: can't open %s\n", *argv);
                return 1;
            } else {
                filecopy(fp, stdout);
                fclose(fp);
            }
    return 0;
}

/* filecopy: copy file ifp to file ofp */
void filecopy(FILE *ifp, FILE *ofp)
{
    int c;

    while ((c = getc(ifp)) != EOF)
        putc(c, ofp);
} 
```

The file pointers stdin and stdout are objects of type FILE *. They are constants, however, not variables, so it is not possible to assign to them. 

文件指针 stdin 和 stdout 是 FILE * 类型的对象。但它们是常量而不是变量，所以不能对它们赋值。

The function 

```c
int fclose(FILE *fp) 
```

is the inverse of fopen, it breaks the connection between the file pointer and the external name that was established by fopen, freeing the file pointer for another file. Since most operating systems have some limit on the number of files that a program may have open simultaneously, it's a good idea to free the file pointers when they are no longer needed, as we did in cat. There is also another reason for fclose on an output file - it flushes the buffer in which putc is collecting output. fclose is called automatically for each open file when a program terminates normally. (You can close stdin and stdout if they are not needed. They can also be reassigned by the library function freopen.) 

即 fclose 是 fopen 的逆操作：它断开 fopen 建立的文件指针与外部名之间的连接，释放文件指针以供另一个文件使用。由于大多数操作系统对程序可以同时打开的文件数有限制，所以当文件指针不再需要时释放它们是个好习惯，就像我们在 cat 中所做的那样。对输出文件调用 fclose 还有另一个原因——它会刷新 putc 收集输出的缓冲区。程序正常终止时，会对每个打开的文件自动调用 fclose。（如果不需要，可以关闭 stdin 和 stdout。它们也可以用库函数 freopen 重新赋值。）

## 7.6 Error Handling - Stderr and Exit

The treatment of errors in cat is not ideal. The trouble is that if one of the files can't be accessed for some reason, the diagnostic is printed at the end of the concatenated output. That might be acceptable if the output is going to a screen, but not if it's going into a file or into another program via a pipeline. 

cat 中对错误的处理并不理想。问题在于，如果某个文件由于某种原因无法访问，诊断信息会打印在串接输出的末尾。如果输出到屏幕上这或许可以接受，但如果输出进入文件或通过管道进入另一个程序就不行了。

To handle this situation better, a second output stream, called stderr, is assigned to a program in the same way that stdin and stdout are. Output written on stderr normally appears on the screen even if the standard output is redirected. 

为了更好地处理这种情况，程序还以与 stdin 和 stdout 同样的方式被分配了第二个输出流，称为 stderr。即使标准输出被重定向，写到 stderr 上的输出通常也会出现在屏幕上。

Let us revise cat to write its error messages on the standard error. 

让我们修改 cat，使其把错误信息写到标准错误上。

```c
#include <stdio.h>

/* cat: concatenate files, version 2 */
main(int argc, char *argv[])
{
    FILE *fp;
    void filecopy(FILE *, FILE *);
    char *prog = argv[0]; /* program name for errors */

    if (argc == 1) /* no args; copy standard input */
        filecopy(stdin, stdout);
    else 
        while (--argc > 0)
            if ((fp = fopen(*++argv, "r")) == NULL) {
                fprintf(stderr, "%s: can't open %s\n", prog, *argv);
                exit(1);
            } else {
                filecopy(fp, stdout);
                fclose(fp);
            }
    if (ferror(stdout)) {
        fprintf(stderr, "%s: error writing stdout\n", prog);
        exit(2);
    }
    exit(0);
} 
```

The program signals errors in two ways. First, the diagnostic output produced by fprintf goes to stderr, so it finds its way to the screen instead of disappearing down a pipeline or into an output file. We included the program name, from argv[0], in the message, so if this program is used with others, the source of an error is identified. 

该程序用两种方式报告错误。首先，fprintf 产生的诊断输出送往 stderr，因此它会出现在屏幕上，而不会顺着管道消失或进入输出文件。我们在信息中包含了来自 argv[0] 的程序名，因此当这个程序与其他程序一起使用时，可以识别出错误的来源。

Second, the program uses the standard library function exit, which terminates program execution when it is called. The argument of exit is available to whatever process called this one, so the success or failure of the program can be tested by another program that uses this one as a sub-process. Conventionally, a return value of 0 signals that all is well; non-zero values usually signal abnormal situations. exit calls fclose for each open output file, to flush out any buffered output. 

其次，程序使用标准库函数 exit，它在被调用时终止程序的执行。exit 的参数可供调用本程序的任何进程使用，因此本程序的成功或失败可以由另一个把它作为子进程使用的程序来测试。按照惯例，返回值 0 表示一切正常；非零值通常表示异常情况。exit 会为每个打开的输出文件调用 fclose，以冲刷任何缓冲的输出。

Within main, return expr is equivalent to exit(expr). exit has the advantage that it can be called from other functions, and that calls to it can be found with a pattern-searching program like those in Chapter 5. 

在 main 中，return expr 等价于 exit(expr)。exit 的优点是它可以从其他函数中调用，而且对它的调用可以用像第 5 章中那样的模式搜索程序找到。

The function ferror returns non-zero if an error occurred on the stream fp. 

函数 ferror 在流 fp 上发生错误时返回非零值。

Although output errors are rare, they do occur (for example, if a disk fills up), so a production program should check this as well. 

尽管输出错误很少见，但确实会发生（例如磁盘满了），所以正式的产品程序也应该检查这一点。

The function feof(FILE *) is analogous to ferror; it returns non-zero if end of file has occurred on the specified file. 

函数 feof(FILE *) 与 ferror 类似；在指定文件上发生文件末尾时它返回非零值。

We have generally not worried about exit status in our small illustrative programs, but any serious program should take care to return sensible, useful status values. 

在我们的小示例程序中，通常不关心退出状态，但任何严肃的程序都应注意返回合理的、有用的状态值。

## 7.7 Line Input and Output

The standard library provides an input and output routine fgets that is similar to the getline function that we have used in earlier chapters: 

标准库提供了一个输入输出例程 fgets，它类似于我们在前面章节中使用的 getline 函数：

```c
char *fgets(char *line, int maxline, FILE *fp) 
```

fgets reads the next input line (including the newline) from file fp into the character array line; at most maxline-1 characters will be read. The resulting line is terminated with '\0'. Normally fgets returns line; on end of file or error it returns NULL. (Our getline returns the line length, which is a more useful value; zero means end of file.) 

fgets 从文件 fp 中读取下一个输入行（包括换行符）放入字符数组 line；最多读取 maxline-1 个字符。所得的行以 '\0' 结尾。通常 fgets 返回 line；在文件末尾或出错时返回 NULL。（我们的 getline 返回行长度，这是一个更有用的值；零表示文件末尾。）

For output, the function fputs writes a string (which need not contain a newline) to a file: 

对于输出，函数 fputs 把一个字符串（不必含换行符）写到一个文件：

```c
int fputs(char *line, FILE *fp) 
```

It returns EOF if an error occurs, and non-negative otherwise. 

出错时它返回 EOF，否则返回非负值。

The library functions gets and puts are similar to fgets and fputs, but operate on stdin and stdout. Confusingly, gets deletes the terminating '\n', and puts adds it. 

库函数 gets 和 puts 与 fgets 和 fputs 类似，但作用于 stdin 和 stdout。令人困惑的是，gets 会删除结尾的 '\n'，而 puts 会加上它。

To show that there is nothing special about functions like fgets and fputs, here they are, copied from the standard library on our system: 

为了说明 fgets 和 fputs 之类的函数并无特别之处，下面给出它们，是从我们系统的标准库中复制的：

```c
/* fgets: get at most n chars from iop */
char *fgets(char *s, int n, FILE *iop)
{
    register int c;
    register char *cs;

    cs = s;
    while (--n > 0 && (c = getc(iop)) != EOF) 
        if ((*cs++ = c) == '\n')
            break;
    *cs = '\0';
    return (c == EOF && cs == s) ? NULL : s;
}

/* fputs: put string s on file iop */
int fputs(char *s, FILE *iop)
{
    int c;

    while (c = *s++)
        putc(c, iop);
    return ferror(iop) ? EOF : 0;
} 
```

For no obvious reason, the standard specifies different return values for ferror and fputs. 

不知出于什么原因，标准为 ferror 和 fputs 规定了不同的返回值。

It is easy to implement our getline from fgets: 

用 fgets 实现我们的 getline 很容易：

```c
/* getline: read a line, return length */
int getline(char *line, int max)
{
    if (fgets(line, max, stdin) == NULL)
        return 0;
    else 
        return strlen(line);
} 
```

Exercise 7-6. Write a program to compare two files, printing the first line where they differ. 

练习 7-6. 编写一个程序比较两个文件，打印它们第一次不同的那一行。

Exercise 7-7. Modify the pattern finding program of Chapter 5 to take its input from a set of named files or, if no files are named as arguments, from the standard input. Should the file name be printed when a matching line is found? 

练习 7-7. 修改第 5 章的模式查找程序，使其从一组命名文件获取输入，或者在没有文件名作为参数时从标准输入获取。找到匹配行时应该打印文件名吗？

Exercise 7-8. Write a program to print a set of files, starting each new one on a new page, with a title and a running page count for each file. 

练习 7-8. 编写一个程序打印一组文件，每个新文件从新的一页开始，并为每个文件打印标题和页码计数。

## 7.8 Miscellaneous Functions

The standard library provides a wide variety of functions. This section is a brief synopsis of the most useful. More details and many other functions can be found in Appendix B. 

标准库提供了各种各样的函数。本节简要概述最有用的那些。更多细节和许多其他函数可在附录 B 中找到。

## 7.8.1 String Operations

We have already mentioned the string functions strlen, strcpy, strcat, and strcmp, found in <string.h>. In the following, s and t are char *'s, and c and n are ints. 

我们已经提到过 <string.h> 中的字符串函数 strlen、strcpy、strcat 和 strcmp。在下面的列表中，s 和 t 是 char * 类型，c 和 n 是 int。

```c
strcat(s,t)     concatenate t to end of s 
strncat(s,t,n)     concatenate n characters of t to end of s 
strcmp(s,t)     return negative, zero, or positive for s < t, s == t, s > t 
strncmp(s,t,n)     same as strcmp but only in first n characters 
strcpy(s, t)     copy t to s 
strncpy(s,t,n)     copy at most n characters of t to s 
strlen(s)     return length of s 
strchr(s,c)     return pointer to first c in s, or NULL if not present 
strrchr(s,c)     return pointer to last c in s, or NULL if not present 
```

## 7.8.2 Character Class Testing and Conversion

Several functions from <ctype.h> perform character tests and conversions. In the following, c is an int that can be represented as an unsigned char or EOF. The function returns int. 

<ctype.h> 中的几个函数执行字符测试和转换。在下面的列表中，c 是一个可以表示为 unsigned char 或 EOF 的 int。函数返回 int。

```c
isalpha(c)     non-zero if c is alphabetic, 0 if not 
isupper(c)     non-zero if c is upper case, 0 if not 
islower(c)     non-zero if c is lower case, 0 if not 
isdigit(c)     non-zero if c is digit, 0 if not 
isalnum(c)     non-zero if isalpha(c) or isdigit(c), 0 if not 
isspace(c)     non-zero if c is blank, tab, newline, return, formfeed, vertical tab 
toupper(c)     return c converted to upper case 
tolower(c)     return c converted to lower case 
```

## 7.8.3 Ungetc

The standard library provides a rather restricted version of the function ungetch that we wrote in Chapter 4; it is called ungetc. 

标准库提供了我们在第 4 章中编写的 ungetch 函数的一个相当受限的版本，称为 ungetc。

```c
int ungetc(int c, FILE *fp) 
```

pushes the character c back onto file fp, and returns either c, or EOF for an error. Only one character of pushback is guaranteed per file. ungetc may be used with any of the input functions like scanf, getc, or getchar. 

它把字符 c 退回到文件 fp 上，返回 c，出错时返回 EOF。每个文件只保证能退回一个字符。ungetc 可以与 scanf、getc 或 getchar 等任何输入函数一起使用。

## 7.8.4 Command Execution

The function system(char *s) executes the command contained in the character string s, then resumes execution of the current program. The contents of s depend strongly on the local operating system. As a trivial example, on UNIX systems, the statement 

函数 system(char *s) 执行包含在字符串 s 中的命令，然后恢复当前程序的执行。s 的内容很大程度上取决于本地操作系统。举一个简单的例子，在 UNIX 系统上，语句

```c
system("date"); 
```

causes the program date to be run; it prints the date and time of day on the standard output. system returns a system-dependent integer status from the command executed. In the UNIX system, the status return is the value returned by exit. 

会使程序 date 运行；它在标准输出上打印日期和当日时间。system 返回一个由系统决定的整数状态，来自所执行的命令。在 UNIX 系统中，返回的状态就是 exit 返回的值。

## 7.8.5 Storage Management

The functions malloc and calloc obtain blocks of memory dynamically. 

函数 malloc 和 calloc 动态地获取内存块。

```c
void *malloc(size_t n) 
```

returns a pointer to n bytes of uninitialized storage, or NULL if the request cannot be satisfied. 

返回一个指向 n 字节未初始化存储的指针，无法满足请求时返回 NULL。

```c
void *calloc(size_t n, size_t size) 
```

returns a pointer to enough free space for an array of n objects of the specified size, or NULL if the request cannot be satisfied. The storage is initialized to zero. 

返回一个指向足够空闲空间的指针，足以容纳 n 个指定大小的对象组成的数组，无法满足请求时返回 NULL。该存储被初始化为零。

The pointer returned by malloc or calloc has the proper alignment for the object in question, but it must be cast into the appropriate type, as in 

malloc 或 calloc 返回的指针具有适合相关对象的对齐方式，但必须把它强制转换为适当的类型，如下所示：

```c
int *ip;

ip = (int *) calloc(n, sizeof(int)); 
```

free(p) frees the space pointed to by p, where p was originally obtained by a call to malloc or calloc. There are no restrictions on the order in which space is freed, but it is a ghastly error to free something not obtained by calling malloc or calloc. 

free(p) 释放 p 所指向的空间，其中 p 最初是通过调用 malloc 或 calloc 获得的。释放空间的顺序没有任何限制，但释放不是通过调用 malloc 或 calloc 获得的东西是一个可怕的错误。

It is also an error to use something after it has been freed. A typical but incorrect piece of code is this loop that frees items from a list: 

在被释放之后使用它也是错误的。一个典型但不正确的代码是下面这个从链表中释放元素的循环：

```c
for (p = head; p != NULL; p = p->next) /* WRONG */
    free(p); 
```

The right way is to save whatever is needed before freeing: 

正确的方法是在释放之前先保存任何需要的东西：

```c
for (p = head; p != NULL; p = q) {
    q = p->next;
    free(p);
} 
```

Section 8.7 shows the implementation of a storage allocator like malloc, in which allocated blocks may be freed in any order. 

8.7 节展示了像 malloc 这样的存储分配器的实现，其中已分配的块可以按任意顺序释放。

## 7.8.6 Mathematical Functions

There are more than twenty mathematical functions declared in <math.h>; here are some of the more frequently used. Each takes one or two double arguments and returns a double. 

<math.h> 中声明了二十多个数学函数；这里列出一些较常用的。每个函数接受一个或两个 double 参数并返回一个 double。

```c
sin(x)     sine of x, x in radians 
cos(x)     cosine of x, x in radians 
atan2(y,x)     arctangent of y/x, in radians 
exp(x)     exponential function e 
log(x)     natural (base e) logarithm of x (x>0) 
log10(x)     common (base 10) logarithm of x (x>0) 
pow(x,y)     x<sup>y</sup> 
sqrt(x)     square root of x (x>0) 
fabs(x)     absolute value of x 
```

## 7.8.7 Random Number generation

The function rand() computes a sequence of pseudo-random integers in the range zero to RAND_MAX, which is defined in <stdlib.h>. One way to produce random floating-point numbers greater than or equal to zero but less than one is 

函数 rand() 计算一个范围从 0 到 RAND_MAX 的伪随机整数序列，RAND_MAX 定义在 <stdlib.h> 中。产生大于等于零但小于一的随机浮点数的一种方法是

```c
#define frand() ((double) rand() / (RAND_MAX+1.0)) 
```

(If your library already provides a function for floating-point random numbers, it is likely to have better statistical properties than this one.) 

（如果你的库已经提供了浮点随机数函数，它很可能比这个有更好的统计性质。）

The function srand(unsigned) sets the seed for rand. The portable implementation of rand and srand suggested by the standard appears in Section 2.7. 

函数 srand(unsigned) 为 rand 设置种子。标准建议的 rand 和 srand 的可移植实现见 2.7 节。

Exercise 7-9. Functions like isupper can be implemented to save space or to save time. Explore both possibilities. 

练习 7-9. 像 isupper 这样的函数可以实现为节省空间或节省时间。探索这两种可能性。

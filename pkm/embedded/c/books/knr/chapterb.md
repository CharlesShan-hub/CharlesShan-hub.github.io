---
title: K&R C Appendix B
tags:
  - book
date: 2026-10-06
comment:
---


## Appendix B - Standard Library

This appendix is a summary of the library defined by the ANSI standard. The standard library is not part of the C language proper, but an environment that supports standard C will provide the function declarations and type and macro definitions of this library. We have omitted a few functions that are of limited utility or easily synthesized from others; we have omitted multi-byte characters; and we have omitted discussion of locale issues; that is, properties that depend on local language, nationality, or culture. 
本附录概要介绍 ANSI 标准定义的库。标准库不是 C 语言本身的组成部分，但支持标准 C 的环境会提供本库的函数声明以及类型和宏定义。我们省略了少数效用有限或容易由其他函数合成的函数；省略了多字节字符；也省略了区域（locale）问题的讨论，即依赖于本地语言、国籍或文化的性质。

The functions, types and macros of the standard library are declared in standard headers: 
标准库的函数、类型和宏在标准头文件中声明：

```txt
<assert.h> <float.h> <math.h> <stdarg.h> <stdlib.h>
<ctype.h> <limits.h> <setjmp.h> <stddef.h> <string.h>
<errno.h> <locale.h> <signal.h> <stdio.h> <time.h>
```

头文件可以用（A header can be accessed by）

#include <header> 

来访问。头文件可以以任意顺序、任意次数包含。头文件必须在任何外部声明或定义之外包含，且在对其声明的任何内容使用之前包含。头文件不必是源文件。

External identifiers that begin with an underscore are reserved for use by the library, as are all other identifiers that begin with an underscore and an upper-case letter or another underscore. 
以下划线开头的外部标识符保留给库使用；以一个下划线加一个大写字母或另一个下划线开头的所有其他标识符也同样保留。

## B.1 Input and Output: <stdio.h>

The input and output functions, types, and macros defined in <stdio.h> represent nearly one third of the library. 
`<stdio.h>` 中定义的输入输出函数、类型和宏约占整个库的三分之一。

A stream is a source or destination of data that may be associated with a disk or other peripheral. The library supports text streams and binary streams, although on some systems, notably UNIX, these are identical. A text stream is a sequence of lines; each line has zero or more characters and is terminated by '\n'. An environment may need to convert a text stream to or from some other representation (such as mapping '\n' to carriage return and linefeed). A binary stream is a sequence of unprocessed bytes that record internal data, with the property that if it is written, then read back on the same system, it will compare equal. 
流（stream）是可以与磁盘或其他外设关联的数据源或数据目的地。库支持文本流（text stream）和二进制流（binary stream），尽管在某些系统上（尤其是 UNIX）两者相同。文本流是行的序列；每行有零个或多个字符，以 `'\n'` 结尾。环境可能需要把文本流转换到或转换自某种其他表示（如把 `'\n'` 映射为回车和换行）。二进制流是记录内部数据的未经处理的字节序列，具有这样的性质：如果在同一系统上写入后再读回，则比较相等。

A stream is connected to a file or device by opening it; the connection is broken by closing the stream. Opening a file returns a pointer to an object of type FILE, which records whatever information is necessary to control the stream. We will use "file pointer" and "stream" interchangeably when there is no ambiguity. 
流通过打开（open）与文件或设备连接；关闭（close）流则断开连接。打开一个文件返回一个指向 `FILE` 类型对象的指针，该对象记录控制流所需的任何信息。在没有歧义时，"文件指针（file pointer）"与"流（stream）"两个词互换使用。

When a program begins execution, the three streams stdin, stdout, and stderr are already open. 
程序开始执行时，三个流 `stdin`、`stdout` 和 `stderr` 已经打开。

## B.1.1 File Operations

The following functions deal with operations on files. The type size_t is the unsigned integral type produced by the sizeof operator. 
下列函数处理文件操作。类型 `size_t` 是由 `sizeof` 运算符产生的无符号整型。

FILE *fopen(const char *filename, const char *mode) 

fopen opens the named file, and returns a stream, or NULL if the attempt fails. Legal values for mode include: 
`fopen` 打开指定名字的文件，并返回一个流；如果尝试失败则返回 `NULL`。`mode` 的合法取值包括：

"r" open text file for reading 
"r" 打开文本文件用于读

"w" create text file for writing; discard previous contents if any 
"w" 创建文本文件用于写；丢弃原有内容（如果有的话）

"a" append; open or create text file for writing at end of file 
"a" 追加；打开或创建文本文件，在文件末尾写

"r+" open text file for update (i.e., reading and writing) 
"r+" 打开文本文件用于更新（即读和写）

"w+" create text file for update, discard previous contents if any 
"w+" 创建文本文件用于更新，丢弃原有内容（如果有的话）

"a+" append; open or create text file for update, writing at end 
"a+" 追加；打开或创建文本文件用于更新，在末尾写

Update mode permits reading and writing the same file; fflush or a file-positioning function must be called between a read and a write or vice versa. If the mode includes b after the initial letter, as in "rb" or "w+b", that indicates a binary file. Filenames are limited to FILENAME_MAX characters. At most FOPEN_MAX files may be open at once. 
更新模式（update mode）允许对同一个文件既读又写；在读和写（或写和读）之间必须调用 `fflush` 或某个文件定位函数。如果 `mode` 在首字母之后含有 `b`，如 `"rb"` 或 `"w+b"`，则表示二进制文件。文件名最多为 `FILENAME_MAX` 个字符。同时最多可以打开 `FOPEN_MAX` 个文件。

FILE *freopen(const char *filename, const char *mode, FILE *stream) 

freopen opens the file with the specified mode and associates the stream with it. It returns stream, or NULL if an error occurs. freopen is normally used to change the files associated with stdin, stdout, or stderr. 
`freopen` 以指定的模式打开文件，并把流与该文件关联起来。它返回 `stream`；如果出错则返回 `NULL`。`freopen` 通常用来改变与 `stdin`、`stdout` 或 `stderr` 相关联的文件。

int fflush(FILE *stream) 

On an output stream, fflush causes any buffered but unwritten data to be written; on an input stream, the effect is undefined. It returns EOF for a write error, and zero otherwise. fflush(NULL) flushes all output streams. 
在输出流上，`fflush` 使所有已缓冲但未写出的数据被写出；在输入流上，其效果未定义。发生写错误时返回 `EOF`，否则返回 0。`fflush(NULL)` 刷新所有输出流。

int fclose(FILE *stream) 

fclose flushes any unwritten data for stream, discards any unread buffered input, frees any automatically allocated buffer, then closes the stream. It returns EOF if any errors occurred, and zero otherwise. 
`fclose` 刷新 `stream` 中所有未写出的数据，丢弃所有未读的缓冲输入，释放所有自动分配的缓冲区，然后关闭该流。如果发生任何错误则返回 `EOF`，否则返回 0。

int remove(const char *filename) 

remove removes the named file, so that a subsequent attempt to open it will fail. It returns non-zero if the attempt fails. 
`remove` 删除指定名字的文件，使得之后试图打开该文件的操作失败。如果尝试失败则返回非 0 值。

int rename(const char *oldname, const char *newname) 

rename changes the name of a file; it returns non-zero if the attempt fails. 
`rename` 改变文件的名字；如果尝试失败则返回非 0 值。

FILE *tmpfile(void) 

tmpfile creates a temporary file of mode "wb+" that will be automatically removed when closed or when the program terminates normally. tmpfile returns a stream, or NULL if it could not create the file. 
`tmpfile` 创建一个模式为 `"wb+"` 的临时文件，该文件在关闭或程序正常终止时会被自动删除。`tmpfile` 返回一个流；如果无法创建文件则返回 `NULL`。

char *tmpnam(char s[L_tmpnam]) 

tmpnam(NULL) creates a string that is not the name of an existing file, and returns a pointer to an internal static array. tmpnam(s) stores the string in s as well as returning it as the function value; s must have room for at least L_tmpnam characters. tmpnam generates a different name each time it is called; at most TMP_MAX different names are guaranteed during execution of the program. Note that tmpnam creates a name, not a file. 
`tmpnam(NULL)` 创建一个不是现有文件名字的字符串，并返回指向一个内部静态数组的指针。`tmpnam(s)` 把该字符串存储在 `s` 中，同时也把它作为函数值返回；`s` 必须有容纳至少 `L_tmpnam` 个字符的空间。`tmpnam` 每次调用都生成一个不同的名字；在程序执行期间最多可以保证生成 `TMP_MAX` 个不同的名字。注意，`tmpnam` 创建的是名字，而不是文件。

int setvbuf(FILE *stream, char *buf, int mode, size_t size) 

setvbuf controls buffering for the stream; it must be called before reading, writing or any other operation. A mode of _IOFBF causes full buffering, _IOLBF line buffering of text files, and _IONBF no buffering. If buf is not NULL, it will be used as the buffer, otherwise a buffer will be allocated. size determines the buffer size. setvbuf returns non-zero for any error. 
`setvbuf` 控制流的缓冲方式；必须在读、写或任何其他操作之前调用。`mode` 为 `_IOFBF` 时表示全缓冲，`_IOLBF` 表示对文本文件行缓冲，`_IONBF` 表示不缓冲。如果 `buf` 不是 `NULL`，将把它用作缓冲区，否则将分配一个缓冲区。`size` 决定缓冲区的大小。`setvbuf` 出错时返回非 0 值。

void setbuf(FILE *stream, char *buf) 

If buf is NULL, buffering is turned off for the stream. Otherwise, setbuf is equivalent to (void) setvbuf(stream, buf, _IOFBF, BUFSIZ). 
如果 `buf` 为 `NULL`，则关闭该流的缓冲。否则，`setbuf` 等价于 `(void) setvbuf(stream, buf, _IOFBF, BUFSIZ)`。

## B.1.2 Formatted Output

The printf functions provide formatted output conversion. 
printf 系列函数提供格式化的输出转换。

```c
int fprintf(FILE *stream, const char *format, ...) 
```

fprintf converts and writes output to stream under the control of format. The return value is the number of characters written, or negative if an error occurred. 
`fprintf` 在 `format` 的控制下转换输出并写到 `stream` 中。返回值是写出的字符数；如果出错则为负数。

The format string contains two types of objects: ordinary characters, which are copied to the output stream, and conversion specifications, each of which causes conversion and printing of the next successive argument to fprintf. Each conversion specification begins with the character % and ends with a conversion character. Between the % and the conversion character there may be, in order: 
格式串包含两类对象：普通字符（会被复制到输出流中）和转换说明（conversion specification），每个转换说明将转换并打印 `fprintf` 的下一个连续的参数。每个转换说明以字符 `%` 开始，以转换字符结束。在 `%` 与转换字符之间可以依次有：

• Flags (in any order), which modify the specification: 
• 标志（可以以任意顺序出现），用于修饰转换说明：

o -, which specifies left adjustment of the converted argument in its field. 
o `-`，指定转换后的参数在其字段中左对齐。

o +, which specifies that the number will always be printed with a sign. 
o `+`，指定数字总是带符号打印。

o space: if the first character is not a sign, a space will be prefixed. 
o 空格：如果第一个字符不是符号，则在其前面加一个空格。

0: for numeric conversions, specifies padding to the field width with leading zeros. 
`0`：对数字转换，指定用前导 0 填充到字段宽度。

o #, which specifies an alternate output form. For o, the first digit will become zero. For x or X, 0x or 0X will be prefixed to a non-zero result. For e, E, f, g, and G, the output will always have a decimal point; for g and G, trailing zeros will not be removed. 
o `#`，指定另一种输出形式。对 `o`，第一个数字将变为零；对 `x` 或 `X`，非零结果前将加上 `0x` 或 `0X` 前缀；对 `e`、`E`、`f`、`g` 和 `G`，输出总是带有小数点；对 `g` 和 `G`，不删除末尾的 0。

A number specifying a minimum field width. The converted argument will be printed in a field at least this wide, and wider if necessary. If the converted argument has fewer characters than the field width it will be padded on the left (or right, if left adjustment has been requested) to make up the field width. The padding character is normally space, but is 0 if the zero padding flag is present. 
一个数字，指定最小字段宽度（minimum field width）。转换后的参数将打印在至少这么宽的字段中，必要时可以更宽。如果转换后的参数的字符数少于字段宽度，将在左边填充（如果指定了左对齐则在右边填充）以补足字段宽度。填充字符通常是空格，但如果存在 0 填充标志则为 0。

• A period, which separates the field width from the precision. 
• 一个句点，用于分隔字段宽度与精度。

• A number, the precision, that specifies the maximum number of characters to be printed from a string, or the number of digits to be printed after the decimal point for e, E, or f conversions, or the number of significant digits for g or G conversion, or the number of digits to be printed for an integer (leading 0s will be added to make up the necessary width). 
• 一个数字，即精度（precision），指定从字符串中打印的字符的最大数目，或者对 `e`、`E` 或 `f` 转换指定小数点后打印的位数，或者对 `g` 或 `G` 转换指定有效数字的位数，或者对整数指定打印的位数（将加上前导 0 以补足所需的宽度）。

• A length modifier h, l (letter ell), or L. "h" indicates that the corresponding argument is to be printed as a short or unsigned short; "l" indicates that the argument is a long or unsigned long, "L" indicates that the argument is a long double. 
• 长度修饰符 `h`、`l`（字母 ell）或 `L`。"h" 表示相应参数将按 `short` 或 `unsigned short` 打印；"l" 表示参数是 `long` 或 `unsigned long`；"L" 表示参数是 `long double`。

Width or precision or both may be specified as *, in which case the value is computed by converting the next argument(s), which must be int. 
宽度或精度（或两者）可以指定为 `*`，此时该值通过转换下一个参数（必须是 `int`）计算得到。

The conversion characters and their meanings are shown in Table B.1. If the character after the % is not a conversion character, the behavior is undefined. 
转换字符及其含义如表 B.1 所示。如果 `%` 之后的字符不是转换字符，则行为未定义。


Table B.1 Printf Conversions


<table><tr><td>Characterd,i</td><td>Argument type; Printed Asint; signed decimal notation.</td></tr><tr><td>o</td><td>int; unsigned octal notation (without a leading zero).</td></tr><tr><td>x,X</td><td>unsigned int; unsigned hexadecimal notation (without a leading 0x or 0x), using abcdef for 0x or ABCDEF for 0x.</td></tr><tr><td>u</td><td>int; unsigned decimal notation.</td></tr><tr><td>c</td><td>int; single character, after conversion to unsigned char</td></tr><tr><td>s</td><td>char *; characters from the string are printed until a '\0' is reached or until the number of characters indicated by the precision have been printed.</td></tr><tr><td>f</td><td>double; decimal notation of the form [-]mmm.ddd, where the number of d's is given by the precision. The default precision is 6; a precision of 0 suppresses the decimal point.</td></tr><tr><td>e,E</td><td>double; decimal notation of the form [-]m.dddddde+/-xx or [-]m.ddddddE+/-xx, where the number of d's is specified by the precision. The default precision is 6; a precision of 0 suppresses the decimal point.</td></tr><tr><td>g,G</td><td>double; %e or %E is used if the exponent is less than -4 or greater than or equal to the precision; otherwise %f is used. Trailing zeros and a trailing decimal point are not printed.</td></tr><tr><td>p</td><td>void *; print as a pointer (implementation-dependent representation).</td></tr><tr><td>n</td><td>int *; the number of characters written so far by this call to printf is written into the argument. No argument is converted.</td></tr><tr><td>%</td><td>no argument is converted; print a %</td></tr></table>

```txt
int printf(const char *format, ...)
```

printf(...) is equivalent to fprintf(stdout, ...). 
printf(...) 等价于 fprintf(stdout, ...)。

```txt
int sprintf(char *s, const char *format, ...)
```

sprintf is the same as printf except that the output is written into the string s, terminated with '\0'. s must be big enough to hold the result. The return count does not include the '\0'. 
sprintf 与 printf 相同，只是输出写到字符串 `s` 中，并以 `'\0'` 结尾。`s` 必须足够大以容纳结果。返回的计数不包括 `'\0'`。

```txt
int vprintf(const char *format, va_list arg)
int vfprintf(FILE *stream, const char *format, va_list arg)
int vsprintf(char *s, const char *format, va_list arg)
```

The functions vprintf, vfprintf, and vsprintf are equivalent to the corresponding printf functions, except that the variable argument list is replaced by arg, which has been initialized by the va_start macro and perhaps va_arg calls. See the discussion of <stdarg.h> in Section B.7. 
函数 `vprintf`、`vfprintf` 和 `vsprintf` 与对应的 printf 函数等价，只是可变参数表被 `arg` 取代，`arg` 已由 `va_start` 宏（可能还有 `va_arg` 调用）初始化。参见 B.7 节对 `<stdarg.h>` 的讨论。

## B.1.3 Formatted Input

The scanf function deals with formatted input conversion. 
scanf 函数处理格式化的输入转换。

int fscanf(FILE *stream, const char *format, ...) 

fscanf reads from stream under control of format, and assigns converted values through subsequent arguments, each of which must be a pointer. It returns when format is exhausted. fscanf returns EOF if end of file or an error occurs before any conversion; otherwise it returns the number of input items converted and assigned. 
fscanf 在 `format` 的控制下从 `stream` 中读取，并通过后续参数赋以转换后的值，每个参数都必须是指针。当 `format` 用完时返回。如果在任何转换之前遇到文件结尾或出错，`fscanf` 返回 `EOF`；否则返回被转换并赋值的输入项的个数。

The format string usually contains conversion specifications, which are used to direct interpretation of input. The format string may contain: 
格式串通常包含转换说明，用于指导对输入的解释。格式串可以包含：

• Blanks or tabs, which are not ignored. 
• 空白或制表符（不会被忽略）。

• Ordinary characters (not %), which are expected to match the next non-white space character of the input stream. 
• 普通字符（不是 `%`），它们应与输入流中下一个非空白字符相匹配。

• Conversion specifications, consisting of a %, an optional assignment suppression character *, an optional number specifying a maximum field width, an optional h, l, or L indicating the width of the target, and a conversion character. 
• 转换说明，由一个 `%`、一个可选的赋值抑制字符 `*`、一个可选的数字（指定最大字段宽度）、一个可选的 `h`、`l` 或 `L`（指示目标的宽度）以及一个转换字符组成。

A conversion specification determines the conversion of the next input field. Normally the result is placed in the variable pointed to by the corresponding argument. If assignment suppression is indicated by *, as in %*s, however, the input field is simply skipped; no assignment is made. An input field is defined as a string of non-white space characters; it extends either to the next white space character or until the field width, if specified, is exhausted. This implies that scanf will read across line boundaries to find its input, since newlines are white space. (White space characters are blank, tab, newline, carriage return, vertical tab, and formfeed.) 
转换说明决定对下一个输入字段的转换。通常，结果放在相应参数所指向的变量中。但是，如果用 `*` 指示赋值抑制（如 `%*s`），则输入字段只是被跳过，不进行赋值。输入字段定义为由非空白字符组成的字符串；它延伸到下一个空白字符，或者在指定了字段宽度的情况下延伸到字段宽度用完为止。这意味着 `scanf` 会跨过行边界寻找其输入，因为换行符是空白字符。（空白字符包括空格、制表符、换行符、回车符、垂直制表符和换页符。）

The conversion character indicates the interpretation of the input field. The corresponding argument must be a pointer. The legal conversion characters are shown in Table B.2. 
转换字符指示对输入字段的解释。相应参数必须是指针。合法的转换字符如表 B.2 所示。

The conversion characters d, i, n, o, u, and x may be preceded by h if the argument is a pointer to short rather than int, or by l (letter ell) if the argument is a pointer to long. The conversion characters e, f, and g may be preceded by l if a pointer to double rather than float is in the argument list, and by L if a pointer to a long double. 
如果参数是指向 `short`（而非 `int`）的指针，转换字符 `d`、`i`、`n`、`o`、`u` 和 `x` 前面可以加 `h`；如果参数是指向 `long` 的指针，则可以加 `l`（字母 ell）。如果参数列表中是指向 `double`（而非 `float`）的指针，转换字符 `e`、`f` 和 `g` 前面可以加 `l`；如果是指向 `long double` 的指针，则可以加 `L`。


Table B.2 Scanf Conversions


<table><tr><td>Character</td><td>Input Data; Argument type</td></tr><tr><td>d</td><td>decimal integer; int*</td></tr><tr><td>i</td><td>integer; int*. The integer may be in octal (leading 0) or hexadecimal (leading 0x or 0x).</td></tr><tr><td>o</td><td>octal integer (with or without leading zero); int *.</td></tr><tr><td>u</td><td>unsigned decimal integer; unsigned int *.</td></tr><tr><td>x</td><td>hexadecimal integer (with or without leading 0x or 0x); int*.</td></tr><tr><td>c</td><td>characters; char*. The next input characters are placed in the indicated array, up to the number given by the width field; the default is 1. No &#x27;\0&#x27; is added. The normal skip over white space characters is suppressed in this case; to read the next non-white space character, use %1s.</td></tr><tr><td>s</td><td>string of non-white space characters (not quoted); char *, pointing to an array of characters large enough to hold the string and a terminating &#x27;\0&#x27; that will be added.</td></tr><tr><td>e,f,g</td><td>floating-point number; float *. The input format for float&#x27;s is an optional sign, a string of numbers possibly containing a decimal point, and an optional exponent field containing an E or e followed by a possibly signed integer.</td></tr><tr><td>p</td><td>pointer value as printed by printf(&quot;%p&quot;);, void *.</td></tr><tr><td>n</td><td>writes into the argument the number of characters read so far by this call; int *. No input is read. The converted item count is not incremented.</td></tr><tr><td>[...]</td><td>matches the longest non-empty string of input characters from the set between brackets; char *. A &#x27;\0&#x27; is added. [ ] ... ] includes ] in the set.</td></tr></table>

<table><tr><td>[^...]</td><td>matches the longest non-empty string of input characters not from the set between brackets; char *. A &#x27;\0&#x27; is added. [^] ... ] includes ] in the set.</td></tr><tr><td>%</td><td>literal %; no assignment is made.</td></tr></table>

```txt
int scanf(const char *format, ...)
int sscanf(const char *s, const char *format, ...)
```

scanf(...) is identical to fscanf(stdin, ...). 
scanf(...) 与 fscanf(stdin, ...) 完全相同。

sscanf(s, ...) is equivalent to scanf(...) except that the input characters are taken from the string s. 
sscanf(s, ...) 等价于 scanf(...)，只是输入字符取自字符串 `s`。

## B.1.4 Character Input and Output Functions

int fgetc(FILE *stream) 

fgetc returns the next character of stream as an unsigned char (converted to an int), or EOF if end of file or error occurs. 
fgetc 以 `unsigned char`（转换为 `int`）的形式返回 `stream` 的下一个字符；如果遇到文件结尾或出错则返回 `EOF`。

char *fgets(char *s, int n, FILE *stream) 

fgets reads at most the next n-1 characters into the array s, stopping if a newline is encountered; the newline is included in the array, which is terminated by '\0'. fgets returns s, or NULL if end of file or error occurs. 
fgets 把接下来的至多 n-1 个字符读入数组 `s` 中；如果遇到换行符则停止，换行符也包含在数组中，数组以 `'\0'` 结尾。`fgets` 返回 `s`；如果遇到文件结尾或出错则返回 `NULL`。

int fputc(int c, FILE *stream) 

fputc writes the character c (converted to an unsigend char) on stream. It returns the character written, or EOF for error. 
`fputc` 把字符 `c`（转换为 `unsigned char`）写到 `stream` 上。返回写出的字符；出错时返回 `EOF`。

```txt
int fputs(const char *s, FILE *stream) 
```

fputs writes the string s (which need not contain \n) on stream; it returns nonnegative, or EOF for an error. 
`fputs` 把字符串 `s`（其中不需要包含 `\n`）写到 `stream` 上；返回非负值；出错时返回 `EOF`。

int getc(FILE *stream) 

getc is equivalent to fgetc except that if it is a macro, it may evaluate stream more than once. 
`getc` 与 `fgetc` 等价，区别在于：如果 `getc` 是宏，它可能会多次计算 `stream`。

```txt
int putc(int c, FILE *stream)
```

putc is equivalent to fputc except that if it is a macro, it may evaluate stream more than once. 
`putc` 与 `fputc` 等价，区别在于：如果 `putc` 是宏，它可能会多次计算 `stream`。

```txt
int putchar(int c)
```

putchar(c) is equivalent to putc(c, stdout). 
putchar(c) 等价于 putc(c, stdout)。

int getchar(void) 

getchar is equivalent to getc(stdin). 
getchar() 等价于 getc(stdin)。

```txt
char *gets(char *s) 
```

gets reads the next input line into the array s; it replaces the terminating newline with '\0'. It returns s, or NULL if end of file or error occurs. 
gets 把下一个输入行读入数组 `s` 中，并用 `'\0'` 替换结尾的换行符。返回 `s`；如果遇到文件结尾或出错则返回 `NULL`。

```txt
int puts(const char *s) 
```

puts writes the string s and a newline to stdout. It returns EOF if an error occurs, non-negative otherwise. 
puts 把字符串 `s` 和一个换行符写到 `stdout` 上。出错时返回 `EOF`，否则返回非负值。

```txt
int ungetc(int c, FILE *stream) 
```

ungetc pushes c (converted to an unsigned char) back onto stream, where it will be returned on the next read. Only one character of pushback per stream is guaranteed. EOF may not be pushed back. ungetc returns the character pushed back, or EOF for error. 
ungetc 把 `c`（转换为 `unsigned char`）退回到 `stream` 上，下次读取时将返回它。每个流只保证能退回一个字符。`EOF` 不能被退回。ungetc 返回退回的字符；出错时返回 `EOF`。

## B.1.5 Direct Input and Output Functions

```txt
size_t fread(void *ptr, size_t size, size_t nobj, FILE *stream) 
```

fread reads from stream into the array ptr at most nobj objects of size size. fread returns the number of objects read; this may be less than the number requested. feof and ferror must be used to determine status. 
fread 从 `stream` 中读取至多 nobj 个大小为 size 的对象到数组 `ptr` 中。fread 返回读取的对象数，可能少于请求的数量。必须用 `feof` 和 `ferror` 来确定状态。

```txt
size_t fwrite(const void *ptr, size_t size, size_t nobj, FILE *stream) 
```

fwrite writes, from the array ptr, nobj objects of size size on stream. It returns the number of objects written, which is less than nobj on error. 
fwrite 从数组 `ptr` 中把 nobj 个大小为 size 的对象写到 `stream` 上。返回写出的对象数；出错时小于 `nobj`。

## B.1.6 File Positioning Functions

```txt
int fseek(FILE *stream, long offset, int origin) 
```

fseek sets the file position for stream; a subsequent read or write will access data beginning at the new position. For a binary file, the position is set to offset characters from origin, which may be SEEK_SET (beginning), SEEK_CUR (current position), or SEEK_END (end of file). For a text stream, offset must be zero, or a value returned by ftell (in which case origin must be SEEK_SET). fseek returns non-zero on error. 
fseek 为 `stream` 设置文件位置；其后的读或写将从新位置开始访问数据。对二进制文件，位置被设置为从 `origin` 起偏移 offset 个字符，`origin` 可以是 `SEEK_SET`（文件开始）、`SEEK_CUR`（当前位置）或 `SEEK_END`（文件结尾）。对文本流，offset 必须为 0，或者是 `ftell` 返回的值（此时 `origin` 必须是 `SEEK_SET`）。fseek 出错时返回非零值。

```txt
long ftell(FILE *stream) 
```

ftell returns the current file position for stream, or -1 on error. 
ftell 返回 `stream` 的当前文件位置；出错时返回 -1。

```txt
void rewind(FILE *stream)
```

rewind(fp) is equivalent to fseek(fp, 0L, SEEK_SET); clearerr(fp). 
rewind(fp) 等价于 fseek(fp, 0L, SEEK_SET); clearerr(fp)。

```txt
int fgetpos(FILE *stream, fpos_t *ptr) 
```

fgetpos records the current position in stream in *ptr, for subsequent use by fsetpos. The type fpos_t is suitable for recording such values. fgetpos returns nonzero on error. 
fgetpos 把 `stream` 中的当前位置记录到 `*ptr` 中，供以后 `fsetpos` 使用。类型 `fpos_t` 适合记录这类值。fgetpos 出错时返回非零值。

```txt
int fsetpos(FILE *stream, const fpos_t *ptr) 
```

fsetpos positions stream at the position recorded by fgetpos in *ptr. fsetpos returns non-zero on error. 
fsetpos 把 `stream` 定位到 fgetpos 记录在 `*ptr` 中的位置。fsetpos 出错时返回非零值。

## B.1.7 Error Functions

Many of the functions in the library set status indicators when error or end of file occur. These indicators may be set and tested explicitly. In addition, the integer expression errno (declared in <errno.h>) may contain an error number that gives further information about the most recent error. 
库中的许多函数在出错或遇到文件结尾时会置位状态指示符。这些指示符可以被显式地置位和测试。此外，整型表达式 `errno`（声明在 `<errno.h>` 中）可能包含一个错误编号，提供关于最近一次错误的更多信息。

```txt
void clearerr(FILE *stream) 
```

clearerr clears the end of file and error indicators for stream. 
clearerr 清除 `stream` 的文件结尾指示符和错误指示符。

```txt
int feof(FILE *stream)
```

feof returns non-zero if the end of file indicator for stream is set. 
如果 `stream` 的文件结尾指示符被置位，feof 返回非零值。

```txt
int ferror(FILE *stream)
```

ferror returns non-zero if the error indicator for stream is set. 
如果 `stream` 的错误指示符被置位，ferror 返回非零值。

```txt
void perror(const char *s)
```

perror(s) prints s and an implementation-defined error message corresponding to the integer in errno, as if by 
perror(s) 打印 `s` 以及与 `errno` 中的整数相对应的实现定义的错误消息，如同执行：

```txt
fprintf(stderr, "%s: %s\n", s, "error message"); 
```

See strerror in Section B.3. 
参见 B.3 节中的 `strerror`。

## B.2 Character Class Tests: <ctype.h>

The header <ctype.h> declares functions for testing characters. For each function, the argument list is an int, whose value must be EOF or representable as an unsigned char, and the return value is an int. The functions return non-zero (true) if the argument c satisfies the condition described, and zero if not. 
头文件 `<ctype.h>` 声明了一些测试字符的函数。每个函数的参数是一个 `int`，其值必须是 `EOF` 或可以用 `unsigned char` 表示的值；返回值是 `int`。如果参数 `c` 满足所述条件，函数返回非零值（真），否则返回零。

isalnum(c) isalpha(c) or isdigit(c) is true 
isalnum(c)：isalpha(c) 或 isdigit(c) 为真

isalpha(c) isupper(c) or islower(c) is true 
isalpha(c)：isupper(c) 或 islower(c) 为真

iscntrl(c) control character 
iscntrl(c)：控制字符

isdigit(c) decimal digit 
isdigit(c)：十进制数字

isgraph(c) printing character except space 
isgraph(c)：除空格外的可打印字符

islower(c) lower-case letter 
islower(c)：小写字母

isprint(c) printing character including space 
isprint(c)：包括空格在内的可打印字符

ispunct(c) printing character except space or letter or digit 
ispunct(c)：除空格、字母或数字外的可打印字符

isspace(c) space, formfeed, newline, carriage return, tab, vertical tab 
isspace(c)：空格、换页符、换行符、回车符、制表符、垂直制表符

isupper(c) upper-case letter 
isupper(c)：大写字母

isxdigit(c) hexadecimal digit 
isxdigit(c)：十六进制数字

In the seven-bit ASCII character set, the printing characters are 0x20 (' ') to 0x7E ('-'); the control characters are 0 NUL to 0x1F (US), and 0x7F (DEL). 
在七位 ASCII 字符集中，可打印字符是 0x20 (' ') 到 0x7E ('-')；控制字符是 0 (NUL) 到 0x1F (US)，以及 0x7F (DEL)。

In addition, there are two functions that convert the case of letters: 
此外，还有两个转换字母大小写的函数：

```txt
int tolower(c) convert c to lower case
int toupper(c) convert c to upper case 
```

If c is an upper-case letter, tolower(c) returns the corresponding lower-case letter, toupper(c) returns the corresponding upper-case letter; otherwise it returns c. 
如果 `c` 是大写字母，`tolower(c)` 返回对应的小写字母；`toupper(c)` 返回对应的大写字母；否则返回 `c` 本身。

## B.3 String Functions: <string.h>

There are two groups of string functions defined in the header <string.h>. The first have names beginning with str; the second have names beginning with mem. Except for memmove, the behavior is undefined if copying takes place between overlapping objects. Comparison functions treat arguments as unsigned char arrays. 
头文件 `<string.h>` 中定义了两组字符串函数。第一组以 `str` 开头；第二组以 `mem` 开头。除 `memmove` 外，如果在重叠的对象之间进行复制，则行为未定义。比较函数把参数当作 `unsigned char` 数组处理。

In the following table, variables s and t are of type char *; cs and ct are of type const char *; n is of type size_t; and c is an int converted to char. 
在下表中，变量 `s` 和 `t` 的类型是 `char *`；`cs` 和 `ct` 的类型是 `const char *`；`n` 的类型是 `size_t`；`c` 是一个转换为 `char` 的 `int`。

char *strcpy(s,ct) copy string ct to string s, including '\0'; return s. 
`char *strcpy(s,ct)`：把字符串 `ct` 复制到字符串 `s` 中（包括 `'\0'`）；返回 `s`。

char *strncpy(s,ct,n) copy at most n characters of string ct to s; return s. Pad with '\0's if ct has fewer than n characters. 
`char *strncpy(s,ct,n)`：把字符串 `ct` 的至多 n 个字符复制到 `s` 中；返回 `s`。如果 `ct` 的字符数少于 n，则用 `'\0'` 填充。

char *strcat(s,ct) concatenate string ct to end of string s; return s. 
`char *strcat(s,ct)`：把字符串 `ct` 连接到字符串 `s` 的末尾；返回 `s`。

char *strncat(s,ct,n) concatenate at most n characters of string ct to string s, terminate s with '\0'; return s. 
`char *strncat(s,ct,n)`：把字符串 `ct` 的至多 n 个字符连接到字符串 `s` 上，用 `'\0'` 结束 `s`；返回 `s`。

int strcmp(cs,ct) compare string cs to string ct; return <0 if cs<ct, 0 if cs==ct, or >0 if cs>ct. 
`int strcmp(cs,ct)`：比较字符串 `cs` 与 `ct`；cs<ct 时返回 <0，cs==ct 时返回 0，cs>ct 时返回 >0。

int strncmp(cs,ct,n) compare at most n characters of string cs to string ct; return <0 if cs<ct, 0 if cs==ct, or >0 if cs>ct. 
`int strncmp(cs,ct,n)`：比较字符串 `cs` 与 `ct` 的至多 n 个字符；cs<ct 时返回 <0，cs==ct 时返回 0，cs>ct 时返回 >0。

char *strchr(cs,c) return pointer to first occurrence of c in cs or NULL if not present. 
`char *strchr(cs,c)`：返回指向 `c` 在 `cs` 中首次出现的位置的指针；如果不存在则返回 `NULL`。

char *strrchr(cs,c) return pointer to last occurrence of c in cs or NULL if not present. 
`char *strrchr(cs,c)`：返回指向 `c` 在 `cs` 中最后一次出现的位置的指针；如果不存在则返回 `NULL`。

size_t strspn(cs,ct) return length of prefix of cs consisting of characters in ct. 
`size_t strspn(cs,ct)`：返回 `cs` 的前缀的长度，该前缀中的字符都属于 `ct`。

void *memcpy(s,ct,n) copy n characters from ct to s, and return s. 
`void *memcpy(s,ct,n)`：把 `ct` 的 n 个字符复制到 `s` 中；返回 `s`。

void *memmove(s,ct,n) same as memcpy except that it works even if the objects overlap. 
`void *memmove(s,ct,n)`：与 `memcpy` 相同，但即使对象重叠也能正确工作。

int memcmp(cs,ct,n) compare the first n characters of cs with ct; return as with strcmp. 
`int memcmp(cs,ct,n)`：比较 `cs` 与 `ct` 的前 n 个字符；返回值同 `strcmp`。

void *memchr(cs,c,n) return pointer to first occurrence of character c in cs, or NULL if not present among the first n characters. 
`void *memchr(cs,c,n)`：返回指向 `c` 在 `cs` 中首次出现的位置的指针；如果前 n 个字符中不存在则返回 `NULL`。

void *memset(s,c,n) place character c into first n characters of s, return s. 
`void *memset(s,c,n)`：把字符 `c` 放入 `s` 的前 n 个字符中；返回 `s`。

size_t strcspn(cs,ct) return length of prefix of cs consisting of characters not in ct. 
`size_t strcspn(cs,ct)`：返回 `cs` 的前缀的长度，该前缀中的字符都不属于 `ct`。

char *strpbrk(cs,ct) return pointer to first occurrence in string cs of any character string ct, or NULL if not present. 
`char *strpbrk(cs,ct)`：返回指向字符串 `cs` 中首次出现 `ct` 中任意字符的位置的指针；如果不存在则返回 `NULL`。

char *strstr(cs,ct) return pointer to first occurrence of string ct in cs, or NULL if not present. 
`char *strstr(cs,ct)`：返回指向字符串 `ct` 在 `cs` 中首次出现的位置的指针；如果不存在则返回 `NULL`。

size_t strlen(cs) return length of cs. 
`size_t strlen(cs)`：返回 `cs` 的长度。

char *strerror(n) return pointer to implementation-defined string corresponding to error n. 
`char *strerror(n)`：返回指向与错误编号 `n` 对应的实现定义的字符串的指针。

char *strtok(s,ct) strtok searches s for tokens delimited by characters from ct; see below. 
`char *strtok(s,ct)`：strtok 在 `s` 中搜索由 `ct` 中的字符分隔的记号（token）；见下文。

A sequence of calls of strtok(s,ct) splits s into tokens, each delimited by a character from ct. The first call in a sequence has a non-NULL s, it finds the first token in s consisting of characters not in ct; it terminates that by overwriting the next character of s with '\0' and returns a pointer to the token. Each subsequent call, indicated by a NULL value of s, returns the next such token, searching from just past the end of the previous one. strtok returns NULL when no further token is found. The string ct may be different on each call. 
对 `strtok(s,ct)` 的一系列调用把 `s` 分割成记号，每个记号由 `ct` 中的一个字符分隔。序列中的第一次调用时的 `s` 为非 `NULL`，它查找 `s` 中由不在 `ct` 中的字符组成的第一个记号；它用 `'\0'` 覆盖 `s` 的下一个字符来结束该记号，并返回指向该记号的指针。随后的每次调用（用 `NULL` 值作为 `s` 指示）返回下一个这样的记号，从前一个记号的末尾之后开始搜索。当找不到更多的记号时，strtok 返回 `NULL`。每次调用时的字符串 `ct` 可以不同。

The mem... functions are meant for manipulating objects as character arrays; the intent is an interface to efficient routines. In the following table, s and t are of type void *; cs and ct are of type const void *; n is of type size_t; and c is an int converted to an unsigned char. 
mem... 系列函数用于把对象当作字符数组来操作；其目的是为高效的例程提供接口。在下表中，`s` 和 `t` 的类型是 `void *`；`cs` 和 `ct` 的类型是 `const void *`；`n` 的类型是 `size_t`；`c` 是一个转换为 `unsigned char` 的 `int`。

## B.4 Mathematical Functions: <math.h>

The header <math.h> declares mathematical functions and macros. 
头文件 `<math.h>` 声明了数学函数和宏。

The macros EDOM and ERANGE (found in <errno.h>) are non-zero integral constants that are used to signal domain and range errors for the functions; HUGE_VAL is a positive double value. A domain error occurs if an argument is outside the domain over which the function is defined. On a domain error, errno is set to EDOM; the return value is implementation-defined. A range error occurs if the result of the function cannot be represented as a double. If the result overflows, the function returns HUGE_VAL with the right sign, and errno is set to ERANGE. If the result underflows, the function returns zero; whether errno is set to ERANGE is implementation-defined. 
宏 `EDOM` 和 `ERANGE`（在 `<errno.h>` 中）是非零整型常量，用于指示函数的定义域错误（domain error）和值域错误（range error）；`HUGE_VAL` 是一个正的 `double` 值。如果参数超出函数定义的范围，就发生定义域错误。发生定义域错误时，`errno` 被置为 `EDOM`；返回值由实现定义。如果函数的结果无法表示为 `double`，就发生值域错误。如果结果上溢，函数返回带有正确符号的 `HUGE_VAL`，并且 `errno` 被置为 `ERANGE`。如果结果下溢，函数返回零；`errno` 是否被置为 `ERANGE` 由实现定义。

In the following table, x and y are of type double, n is an int, and all functions return double. Angles for trigonometric functions are expressed in radians. 
在下表中，`x` 和 `y` 的类型是 `double`，`n` 是 `int`，所有函数都返回 `double`。三角函数的角度用弧度表示。

sin(x) sine of x 
sin(x)：x 的正弦

cos(x) cosine of x 
cos(x)：x 的余弦

tan(x) tangent of x 
tan(x)：x 的正切

asin(x) sin<sup>-1</sup>(x) in range [-pi/2,pi/2], x in [-1,1]. 
asin(x)：sin<sup>-1</sup>(x)，值域 [-pi/2,pi/2]，x 在 [-1,1] 内

acos(x) cos<sup>-1</sup>(x) in range [0,pi], x in [-1,1]. 
acos(x)：cos<sup>-1</sup>(x)，值域 [0,pi]，x 在 [-1,1] 内

atan(x) tan<sup>-1</sup>(x) in range [-pi/2,pi/2]. 
atan(x)：tan<sup>-1</sup>(x)，值域 [-pi/2,pi/2]

atan2(y,x) tan<sup>-1</sup>(y/x) in range [-pi,pi]. 
atan2(y,x)：tan<sup>-1</sup>(y/x)，值域 [-pi,pi]

sinh(x) hyperbolic sine of x 
sinh(x)：x 的双曲正弦

cosh(x) hyperbolic cosine of x 
cosh(x)：x 的双曲余弦

tanh(x) hyperbolic tangent of x 
tanh(x)：x 的双曲正切

exp(x) exponential function e<sup>x</sup> 
exp(x)：指数函数 e<sup>x</sup>

log(x) natural logarithm ln(x), x>0. 
log(x)：自然对数 ln(x)，x>0

log10(x) base 10 logarithm log<sub>10</sub>(x), x>0. 
log10(x)：以 10 为底的对数 log<sub>10</sub>(x)，x>0

pow(x,y) x<sup>y</sup>. A domain error occurs if x=0 and y<=0, or if x<0 and y is not an integer. 
pow(x,y)：x<sup>y</sup>。如果 x=0 且 y<=0，或 x<0 且 y 不是整数，则发生定义域错误

sqrt(x) sqare root of x, x>=0. 
sqrt(x)：x 的平方根，x>=0

ceil(x) smallest integer not less than x, as a double. 
ceil(x)：不小于 x 的最小整数，以 double 表示

floor(x) largest integer not greater than x, as a double. 
floor(x)：不大于 x 的最大整数，以 double 表示

fabs(x) absolute value |x| 
fabs(x)：绝对值 |x|

ldexp(x,n) x*2<sup>n</sup> 
ldexp(x,n)：x*2<sup>n</sup>

double frexp(x, int *ip) splits x into a normalized fraction in the interval [1/2,1) which is returned, and a power of 2, which is stored in *ip. If x is zero, both parts of the result are zero. 
frexp：把 x 分割成区间 [1/2,1) 内的一个规格化小数（作为返回值）和一个 2 的幂（存储在 `*ip` 中）。如果 x 为零，结果的两个部分都为零。

double modf(x, double *ip) splits x into integral and fractional parts, each with the same sign as x. It stores the integral part in *ip, and returns the fractional part. 
modf：把 x 分割成整数部分和小数部分，各与 x 同号。整数部分存储在 `*ip` 中，返回小数部分。

double fmod(x,y) floating-point remainder of x/y, with the same sign as x. If y is zero, the result is implementation-defined. 
fmod(x,y)：x/y 的浮点余数，符号与 x 相同。如果 y 为零，结果由实现定义。

## B.5 Utility Functions: <stdlib.h>

The header <stdlib.h> declares functions for number conversion, storage allocation, and similar tasks. 
头文件 `<stdlib.h>` 声明了用于数值转换、存储分配和类似任务的函数。

double atof(const char *s) 

atof converts s to double; it is equivalent to strtod(s, (char**)NULL). 
atof 把 `s` 转换为 `double`；它等价于 `strtod(s, (char**)NULL)`。

int atoi(const char *s) 

atoi converts s to int; it is equivalent to (int)strtol(s, (char**)NULL, 10). 
atoi 把 `s` 转换为 `int`；它等价于 `(int)strtol(s, (char**)NULL, 10)`。

long atol(const char *s) 

atol converts s to long; it is equivalent to strtol(s, (char**)NULL, 10). 
atol 把 `s` 转换为 `long`；它等价于 `strtol(s, (char**)NULL, 10)`。

double strtod(const char *s, char **endp) 

strtod converts the prefix of s to double, ignoring leading white space; it stores a pointer to any unconverted suffix in *endp unless endp is NULL. If the answer would overflow, HUGE_VAL is returned with the proper sign; if the answer would underflow, zero is returned. In either case errno is set to ERANGE. 
strtod 把 `s` 的前缀转换为 `double`，忽略前导空白；除非 `endp` 为 `NULL`，否则它把指向任何未转换的后缀的指针存储到 `*endp` 中。如果结果会溢出，返回带有正确符号的 `HUGE_VAL`；如果结果会下溢，返回零。两种情况下 `errno` 都被置为 `ERANGE`。

long strtol(const char *s, char **endp, int base) 

strtol converts the prefix of s to long, ignoring leading white space; it stores a pointer to any unconverted suffix in *endp unless endp is NULL. If base is between 2 and 36, conversion is done assuming that the input is written in that base. If base is zero, the base is 8, 10, or 16; leading 0 implies octal and leading 0x or 0X hexadecimal. Letters in either case represent digits from 10 to base-1; a leading 0x or 0X is permitted in base 16. If the answer would overflow, LONG_MAX or LONG_MIN is returned, depending on the sign of the result, and errno is set to ERANGE. 
strtol 把 `s` 的前缀转换为 `long`，忽略前导空白；除非 `endp` 为 `NULL`，否则它把指向任何未转换的后缀的指针存储到 `*endp` 中。如果 `base` 在 2 到 36 之间，则假定输入以该进制书写并进行转换。如果 `base` 为 0，则进制为 8、10 或 16：前导 0 意味着八进制，前导 0x 或 0X 意味着十六进制。在两种情况下，字母表示从 10 到 base-1 的数字；在 base 为 16 时允许前导 0x 或 0X。如果结果会溢出，根据结果的符号返回 `LONG_MAX` 或 `LONG_MIN`，并且 `errno` 被置为 `ERANGE`。

unsigned long strtoul(const char *s, char **endp, int base) 

strtoul is the same as strtol except that the result is unsigned long and the error value is ULONG_MAX. 
strtoul 与 strtol 相同，只是结果为 `unsigned long` 且错误值为 `ULONG_MAX`。

int rand(void) 

rand returns a pseudo-random integer in the range 0 to RAND_MAX, which is at least 32767. 
rand 返回 0 到 `RAND_MAX` 范围内的伪随机整数，`RAND_MAX` 至少为 32767。

void srand(unsigned int seed) 

srand uses seed as the seed for a new sequence of pseudo-random numbers. The initial seed is 1. 
srand 用 `seed` 作为新的伪随机数序列的种子。初始种子为 1。

void *calloc(size_t nobj, size_t size) 

calloc returns a pointer to space for an array of nobj objects, each of size size, or NULL if the request cannot be satisfied. The space is initialized to zero bytes. 
calloc 返回指向为 nobj 个对象（每个大小为 size）的数组分配的空间的指针；如果无法满足请求则返回 `NULL`。该空间被初始化为零字节。

void *malloc(size_t size) 

malloc returns a pointer to space for an object of size size, or NULL if the request cannot be satisfied. The space is uninitialized. 
malloc 返回指向为大小为 size 的对象分配的空间的指针；如果无法满足请求则返回 `NULL`。该空间未初始化。

void *realloc(void *p, size_t size) 

realloc changes the size of the object pointed to by p to size. The contents will be unchanged up to the minimum of the old and new sizes. If the new size is larger, the new space is uninitialized. realloc returns a pointer to the new space, or NULL if the request cannot be satisfied, in which case *p is unchanged. 
realloc 把 `p` 所指向对象的大小改变为 size。内容保持不变，最多到旧大小与新大小中的较小者。如果新大小更大，新空间未初始化。realloc 返回指向新空间的指针；如果无法满足请求则返回 `NULL`，此时 `*p` 保持不变。

void free(void *p) 

free deallocates the space pointed to by p; it does nothing if p is NULL. p must be a pointer to space previously allocated by calloc, malloc, or realloc. 
free 释放 `p` 所指向的空间；如果 `p` 为 `NULL` 则什么也不做。`p` 必须是先前由 `calloc`、`malloc` 或 `realloc` 分配的空间的指针。

void abort(void) 

abort causes the program to terminate abnormally, as if by raise(SIGABRT). 
abort 使程序异常终止，如同执行 `raise(SIGABRT)`。

void exit(int status) 

exit causes normal program termination. atexit functions are called in reverse order of registration, open files are flushed, open streams are closed, and control is returned to the environment. How status is returned to the environment is implementationdependent, but zero is taken as successful termination. The values EXIT_SUCCESS and EXIT_FAILURE may also be used. 
exit 使程序正常终止。atexit 函数以注册时的相反顺序被调用，打开的文件被刷新，打开的流被关闭，控制返回到环境。status 如何返回到环境由实现定义，但零值被视为成功终止。也可以使用值 `EXIT_SUCCESS` 和 `EXIT_FAILURE`。

int atexit(void (*fcn)(void)) 

atexit registers the function fcn to be called when the program terminates normally; it returns non-zero if the registration cannot be made. 
atexit 注册函数 `fcn`，使其在程序正常终止时被调用；如果无法完成注册则返回非零值。

int system(const char *s) 

system passes the string s to the environment for execution. If s is NULL, system returns non-zero if there is a command processor. If s is not NULL, the return value is implementation-dependent. 
system 把字符串 `s` 传递给环境以执行。如果 `s` 为 `NULL`，并且存在命令处理器，system 返回非零值。如果 `s` 不是 `NULL`，返回值由实现定义。

char *getenv(const char *name) 

getenv returns the environment string associated with name, or NULL if no string exists. Details are implementation-dependent. 
getenv 返回与 `name` 相关联的环境字符串；如果不存在这样的字符串则返回 `NULL`。细节由实现定义。

void *bsearch(const void *key, const void *base, size_t n, size_t size, int (*cmp)(const void *keyval, const void *datum)) 

bsearch searches base[0]...base[n-1] for an item that matches *key. The function cmp must return negative if its first argument (the search key) is less than its second (a table entry), zero if equal, and positive if greater. Items in the array base must be in ascending order. bsearch returns a pointer to a matching item, or NULL if none exists. 
bsearch 在 base[0]...base[n-1] 中搜索与 `*key` 匹配的元素。函数 `cmp` 的第一个参数（搜索关键字）小于第二个参数（表中元素）时必须返回负数，相等时返回零，大于时返回正数。数组 `base` 中的元素必须按升序排列。bsearch 返回指向匹配元素的指针；如果不存在则返回 `NULL`。

```c
void qsort(void *base, size_t n, size_t size, int (*cmp)(const void *, const void *)) 
```

qsort sorts into ascending order an array base[0]...base[n-1] of objects of size size. The comparison function cmp is as in bsearch. 
qsort 把大小为 size 的对象数组 base[0]...base[n-1] 按升序排序。比较函数 `cmp` 与 `bsearch` 中的相同。

int abs(int n) 

abs returns the absolute value of its int argument. 
abs 返回其 `int` 参数的绝对值。

long labs(long n) 

labs returns the absolute value of its long argument. 
labs 返回其 `long` 参数的绝对值。

div_t div(int num, int denom) 

div computes the quotient and remainder of num/denom. The results are stored in the int members quot and rem of a structure of type div_t. 
div 计算 num/denom 的商和余数。结果存储在类型为 `div_t` 的结构的 `int` 成员 `quot` 和 `rem` 中。

```txt
ldiv_t ldiv(long num, long denom) 
```

ldiv computes the quotient and remainder of num/denom. The results are stored in the long members quot and rem of a structure of type ldiv_t. 
ldiv 计算 num/denom 的商和余数。结果存储在类型为 `ldiv_t` 的结构的 `long` 成员 `quot` 和 `rem` 中。

## B.6 Diagnostics: <assert.h>

The assert macro is used to add diagnostics to programs: 
assert 宏用于给程序添加诊断：

void assert(int expression) 

If expression is zero when 

assert(expression) 

is executed, the assert macro will print on stderr a message, such as 

Assertion failed: expression, file filename, line nnn 
当 `assert(expression)` 执行时如果 `expression` 为零，assert 宏将在 `stderr` 上打印一条消息，例如：

It then calls abort to terminate execution. The source filename and line number come from the preprocessor macros __FILE__ and __LINE__. 
然后它调用 `abort` 终止执行。源文件名和行号来自预处理器宏 `__FILE__` 和 `__LINE__`。

If NDEBUG is defined at the time <assert.h> is included, the assert macro is ignored. 
如果在包含 `<assert.h>` 时定义了 `NDEBUG`，则 assert 宏被忽略。

## B.7 Variable Argument Lists: <stdarg.h>

The header <stdarg.h> provides facilities for stepping through a list of function arguments of unknown number and type. 
头文件 `<stdarg.h>` 提供了遍历数目和类型都未知的函数参数表的设施。

Suppose lastarg is the last named parameter of a function f with a variable number of arguments. Then declare within f a variable of type va_list that will point to each argument in turn: 
假设 `lastarg` 是带有数目可变的参数的函数 `f` 的最后一个命名参数。然后在 `f` 内声明一个类型为 `va_list` 的变量，它将依次指向每个参数：

va_list ap; 

ap must be initialized once with the macro va_start before any unnamed argument is accessed: 
在访问任何未命名的参数之前，`ap` 必须用宏 `va_start` 初始化一次：

```txt
va_start(va_list ap, lastarg); 
```

Thereafter, each execution of the macro va_arg will produce a value that has the type and value of the next unnamed argument, and will also modify ap so the next use of va_arg returns the next argument: 
此后，每次执行宏 `va_arg` 都将产生一个值，该值具有下一个未命名参数的类型和值，并且还会修改 `ap`，使下一次使用 `va_arg` 时返回下一个参数：

```txt
type va_arg(va_list ap, type); 
```

The macro 

```txt
void va_end(va_list ap);
```

must be called once after the arguments have been processed but before f is exited. 
必须在处理完参数之后、退出 f 之前调用一次。

## B.8 Non-local Jumps: <setjmp.h>

The declarations in <setjmp.h> provide a way to avoid the normal function call and return sequence, typically to permit an immediate return from a deeply nested function call. 
`<setjmp.h>` 中的声明提供了一种避开正常的函数调用和返回序列的方法，典型用途是允许从深层嵌套的函数调用中立即返回。

int setjmp(jmp_buf env) 

The macro setjmp saves state information in env for use by longjmp. The return is zero from a direct call of setjmp, and non-zero from a subsequent call of longjmp. A call to setjmp can only occur in certain contexts, basically the test of if, switch, and loops, and only in simple relational expressions. 
宏 `setjmp` 把状态信息保存在 `env` 中，供 `longjmp` 使用。直接调用 setjmp 时返回零；随后调用 `longjmp` 时返回非零值。对 setjmp 的调用只能出现在某些上下文中，基本上就是 `if`、`switch` 和循环的测试部分，并且只能出现在简单的关系表达式中。

```txt
if (setjmp(env) == 0)
    /* get here on direct call */
else
    /* get here by calling longjmp */
```

void longjmp(jmp_buf env, int val) 

longjmp restores the state saved by the most recent call to setjmp, using the information saved in env, and execution resumes as if the setjmp function had just executed and returned the non-zero value val. The function containing the setjmp must not have terminated. Accessible objects have the values they had at the time longjmp was called, except that non-volatile automatic variables in the function calling setjmp become undefined if they were changed after the setjmp call. 
longjmp 使用保存在 `env` 中的信息恢复最近一次调用 setjmp 时保存的状态，并恢复执行，就好像 setjmp 函数刚刚执行并返回了非零值 val 一样。包含 setjmp 调用的函数必须尚未终止。可访问的对象具有调用 longjmp 时它们所具有的值，但如果调用 setjmp 的函数中的非 `volatile` 自动变量在 setjmp 调用之后被改变过，则它们的值变为未定义。

## B.9 Signals: <signal.h>

The header <signal.h> provides facilities for handling exceptional conditions that arise during execution, such as an interrupt signal from an external source or an error in execution. 

void (*signal(int sig, void (*handler)(int)))(int) 

signal determines how subsequent signals will be handled. If handler is SIG_DFL, the implementation-defined default behavior is used, if it is SIG_IGN, the signal is ignored; otherwise, the function pointed to by handler will be called, with the argument of the type of signal. Valid signals include 
signal 决定后续的信号将如何被处理。如果 `handler` 是 `SIG_DFL`，则使用实现定义的默认行为；如果是 `SIG_IGN`，则忽略该信号；否则，将调用 `handler` 所指向的函数，参数为信号的类型。有效的信号包括

SIGABRT abnormal termination, e.g., from abort 
SIGABRT：异常终止，例如由 abort 引起

SIGFPE arithmetic error, e.g., zero divide or overflow 
SIGFPE：算术错误，例如除零或溢出

SIGILL illegal function image, e.g., illegal instruction 
SIGILL：非法函数映像，例如非法指令

SIGINT interactive attention, e.g., interrupt 
SIGINT：交互式注意信号，例如中断

SIGSEGV illegal storage access, e.g., access outside memory limits 
SIGSEGV：非法存储访问，例如访问超出内存限制

SIGTERM termination request sent to this program 
SIGTERM：发送给本程序的终止请求

signal returns the previous value of handler for the specific signal, or SIG_ERR if an error occurs. 
signal 返回该信号之前的 handler 值；出错时返回 `SIG_ERR`。

When a signal sig subsequently occurs, the signal is restored to its default behavior; then the signal-handler function is called, as if by (*handler)(sig). If the handler returns, execution will resume where it was when the signal occurred. 
当信号 sig 随后发生时，信号被恢复为其默认行为；然后调用信号处理函数，如同执行 `(*handler)(sig)`。如果处理函数返回，执行将从信号发生时所在的位置继续。

The initial state of signals is implementation-defined. 
信号的初始状态由实现定义。

int raise(int sig) 

raise sends the signal sig to the program; it returns non-zero if unsuccessful. 
raise 把信号 sig 发送给程序；如果不成功则返回非零值。

## B.10 Date and Time Functions: <time.h>

The header <time.h> declares types and functions for manipulating date and time. Some functions process local time, which may differ from calendar time, for example because of time zone. clock_t and time_t are arithmetic types representing times, and struct tm holds the components of a calendar time: 
头文件 `<time.h>` 声明了处理日期和时间的类型与函数。一些函数处理本地时间（local time），它可能与日历时间不同，例如由于时区的原因。`clock_t` 和 `time_t` 是表示时间的算术类型，`struct tm` 保存日历时间的各个成分：

```txt
int tm_sec; seconds after the minute (0,61)
int tm_min; minutes after the hour (0,59)
int tm_hour; hours since midnight (0,23)
int tm_mday; day of the month (1,31)
int tm_mon; months since January (0,11)
int tm_year; years since 1900
int tm_wday; days since Sunday (0,6)
int tm_yday; days since January 1 (0,365)
int tm_isdst; Daylight Saving Time flag 
```

`int tm_sec`：分钟之后的秒数 (0,61)
`int tm_min`：小时之后的分钟数 (0,59)
`int tm_hour`：午夜之后的小时数 (0,23)
`int tm_mday`：月中的日 (1,31)
`int tm_mon`：一月之后的月数 (0,11)
`int tm_year`：1900 之后的年数
`int tm_wday`：星期日之后的天数 (0,6)
`int tm_yday`：1 月 1 日之后的天数 (0,365)
`int tm_isdst`：夏令时标志

tm_isdst is positive if Daylight Saving Time is in effect, zero if not, and negative if the information is not available. 
如果夏令时有效，`tm_isdst` 为正；否则为零；如果信息不可用则为负。

clock_t clock(void) 

clock returns the processor time used by the program since the beginning of execution, or -1 if unavailable. clock()/CLK_PER_SEC is a time in seconds. 
clock 返回程序自开始执行以来占用的处理器时间；如果不可用则返回 -1。clock()/CLK_PER_SEC 是以秒为单位的时间。

time_t time(time_t *tp) 

time returns the current calendar time or -1 if the time is not available. If tp is not NULL, the return value is also assigned to *tp. 
time 返回当前的日历时间；如果时间不可用则返回 -1。如果 `tp` 不是 `NULL`，返回值也被赋给 `*tp`。

double difftime(time_t time2, time_t time1) 

difftime returns time2-time1 expressed in seconds. 
difftime 返回以秒表示的 time2-time1。

time_t mktime(struct tm *tp) 

mktime converts the local time in the structure *tp into calendar time in the same representation used by time. The components will have values in the ranges shown. mktime returns the calendar time or -1 if it cannot be represented. 
mktime 把结构 `*tp` 中的本地时间转换为与 time 所用表示相同的日历时间。各成员将具有所示范围内的值。mktime 返回日历时间；如果无法表示则返回 -1。

The next four functions return pointers to static objects that may be overwritten by other calls. 
下面四个函数返回指向静态对象的指针，这些对象可能被其他调用覆盖。

char *asctime(const struct tm *tp) 

asctime converts the time in the structure *tp into a string of the form 
asctime 把结构 `*tp` 中的时间转换为如下形式的字符串

```txt
Sun Jan 3 15:14:13 1988\n\0
```

char *ctime(const time_t *tp) 

ctime converts the calendar time *tp to local time; it is equivalent to asctime(localtime(tp)) 
ctime 把日历时间 `*tp` 转换为本地时间；它等价于 asctime(localtime(tp))

struct tm *gmtime(const time_t *tp) 

gmtime converts the calendar time *tp into Coordinated Universal Time (UTC). It returns NULL if UTC is not available. The name gmtime has historical significance. 
gmtime 把日历时间 `*tp` 转换为协调世界时（UTC）。如果 UTC 不可用则返回 `NULL`。gmtime 这个名字有历史意义。

struct tm *localtime(const time_t *tp) 

localtime converts the calendar time *tp into local time. 
localtime 把日历时间 `*tp` 转换为本地时间。

size_t strftime(char *s, size_t smax, const char *fmt, const struct tm *tp) 

strftime formats date and time information from *tp into s according to fmt, which is analogous to a printf format. Ordinary characters (including the terminating '\0') are copied into s. Each %c is replaced as described below, using values appropriate for the local environment. No more than smax characters are placed into s. strftime returns the number of characters, excluding the '\0', or zero if more than smax characters were produced. 
strftime 根据 `fmt`（类似 printf 的格式串）把 `*tp` 中的日期和时间信息格式化到 `s` 中。普通字符（包括结尾的 '\0'）被复制到 `s` 中。每个 `%c` 按下述说明替换，使用适合本地环境的值。最多有 smax 个字符被放入 `s` 中。strftime 返回除 '\0' 之外的字符数；如果产生的字符超过 smax 个则返回零。

%a abbreviated weekday name. 
%a：缩写的星期名
%A full weekday name. 
%A：完整的星期名

%b abbreviated month name. 
%b：缩写的月份名

%B full month name. 
%B：完整的月份名

%c local date and time representation. 
%c：本地日期和时间表示

%d day of the month (01-31). 
%d：月中的日 (01-31)

%H hour (24-hour clock) (00-23). 
%H：小时（24 小时制）(00-23)

%I hour (12-hour clock) (01-12). 
%I：小时（12 小时制）(01-12)

%j day of the year (001-366). 
%j：年中的日 (001-366)

%m month (01-12). 
%m：月 (01-12)

%M minute (00-59). 
%M：分 (00-59)

%p local equivalent of AM or PM. 
%p：AM 或 PM 的本地等价形式

%S second (00-61). 
%S：秒 (00-61)

%U week number of the year (Sunday as 1st day of week) (00-53). 
%U：年中的周数（星期日为一周的第一天）(00-53)

%w weekday (0-6, Sunday is 0). 
%w：星期 (0-6，星期日为 0)

%W week number of the year (Monday as 1st day of week) (00-53). 
%W：年中的周数（星期一为一周的第一天）(00-53)

%x local date representation. 
%x：本地日期表示

%X local time representation. 
%X：本地时间表示

%y year without century (00-99). 
%y：不带世纪的年份 (00-99)

%Y year with century. 
%Y：带世纪的年份

%Z time zone name, if any. 
%Z：时区名（如果有的话）

%% % 
%%：%

## B.11 Implementation-defined Limits: <limits.h> and <float.h>

The header <limits.h> defines constants for the sizes of integral types. The values below are acceptable minimum magnitudes; larger values may be used. 
头文件 `<limits.h>` 定义了整型大小的常量。下列数值是可接受的最小值；可以使用更大的值。

<table><tr><td>CHAR_BIT</td><td>8</td><td>bits in a char</td></tr><tr><td>CHAR_MAX</td><td>UCHAR_MAX or SCHAR_MAX</td><td>maximum value of char</td></tr><tr><td>CHAR_MIN</td><td>0 or SCHAR_MIN</td><td>maximum value of char</td></tr><tr><td>INT_MAX</td><td>32767</td><td>maximum value of int</td></tr><tr><td>INT_MIN</td><td>-32767</td><td>minimum value of int</td></tr><tr><td>LONG_MAX</td><td>2147483647</td><td>maximum value of long</td></tr><tr><td>LONG_MIN</td><td>-2147483647</td><td>minimum value of long</td></tr><tr><td>SCHAR_MAX</td><td>+127</td><td>maximum value of signed char</td></tr><tr><td>SCHAR_MIN</td><td>-127</td><td>minimum value of signed char</td></tr><tr><td>SHRT_MAX</td><td>+32767</td><td>maximum value of short</td></tr><tr><td>SHRT_MIN</td><td>-32767</td><td>minimum value of short</td></tr><tr><td>UCHAR_MAX</td><td>255</td><td>maximum value of unsigned char</td></tr><tr><td>UINT_MAX</td><td>65535</td><td>maximum value of unsigned int</td></tr><tr><td>ULONG_MAX</td><td>4294967295</td><td>maximum value of unsigned long</td></tr><tr><td>USHRT_MAX</td><td>65535</td><td>maximum value of unsigned short</td></tr></table>

The names in the table below, a subset of <float.h>, are constants related to floating-point arithmetic. When a value is given, it represents the minimum magnitude for the corresponding quantity. Each implementation defines appropriate values. 
下表中列出的名字是 `<float.h>` 的一个子集，是与浮点算术相关的常量。当给出某个值时，它表示相应量的最小数量级。每个实现会定义合适的值。

<table><tr><td>FLT_RADIX</td><td>2</td><td>radix of exponent, representation, e.g., 2, 16</td></tr><tr><td>FLT_ROUNDS</td><td></td><td>floating-point rounding mode for addition</td></tr><tr><td>FLT_DIG</td><td>6</td><td>decimal digits of precision</td></tr><tr><td>FLT_EPSILON</td><td>1E-5</td><td>smallest number x such that 1.0+x != 1.0</td></tr><tr><td>FLT_MANT_DIG</td><td></td><td>number of base FLT_RADIX in mantissa</td></tr><tr><td>FLT_MAX</td><td>1E+37</td><td>maximum floating-point number</td></tr><tr><td>FLT_MAX_EXP</td><td></td><td>maximum n such that FLT_RADIXn-1is representable</td></tr><tr><td>FLT_MIN</td><td>1E-37</td><td>minimum normalized floating-point number</td></tr><tr><td>FLT_MIN_EXP</td><td></td><td>minimum n such that 10nis a normalized number</td></tr><tr><td>DBL_DIG</td><td>10</td><td>decimal digits of precision</td></tr><tr><td>DBL_EPSILON</td><td>1E-9</td><td>smallest number x such that 1.0+x != 1.0</td></tr><tr><td>DBL_MANT_DIG</td><td></td><td>number of base FLT_RADIX in mantissa</td></tr><tr><td>DBL_MAX</td><td>1E+37</td><td>maximum double floating-point number</td></tr><tr><td>DBL_MAX_EXP</td><td></td><td>maximum n such that FLT_RADIXn-1is representable</td></tr><tr><td>DBL_MIN</td><td>1E-37</td><td>minimum normalized double floating-point number</td></tr><tr><td>DBL_MIN_EXP</td><td></td><td>minimum n such that 10nis a normalized number</td></tr></table>

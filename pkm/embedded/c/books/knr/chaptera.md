---
title: K&R C Appendix A
tags:
  - book
date: 2026-10-06
comment:
---


# Appendix A - Reference Manual

## A.1 Introduction

This manual describes the C language specified by the draft submitted to ANSI on 31 October, 1988, for approval as ``American Standard for Information Systems - programming Language C, X3.159-1989.'' The manual is an interpretation of the proposed standard, not the standard itself, although care has been taken to make it a reliable guide to the language. 
本手册描述的 C 语言以 1988 年 10 月 31 日提交 ANSI 审批的草案为准，该草案即《美国信息系统标准——程序设计语言 C，X3.159-1989》。本手册是对该拟议标准的一种解释，而不是标准本身，尽管已尽力使其成为该语言的可靠指南。

For the most part, this document follows the broad outline of the standard, which in turn follows that of the first edition of this book, although the organization differs in detail. Except for renaming a few productions, and not formalizing the definitions of the lexical tokens or the preprocessor, the grammar given here for the language proper is equivalent to that of the standard. 
总体上，本文档遵循该标准的大致框架，而该标准又遵循本书第一版的框架，尽管组织细节有所不同。除了对少数产生式重新命名，以及没有把词法记号或预处理器的定义形式化之外，这里给出的语言本身文法与标准中的文法是等价的。

Throughout this manual, commentary material is indented and written in smaller type, as this is. Most often these comments highlight ways in which ANSI Standard C differs from the language defined by the first edition of this book, or from refinements subsequently introduced in various compilers. 
在本手册中，注释材料都采用缩进并以较小的字体排印，就像本段这样。这些注释最常用来强调 ANSI 标准 C 与本书第一版所定义的语言之间的差别，或与随后在各种编译器中引入的改进之间的差别。

## A.2 Lexical Conventions

A program consists of one or more translation units stored in files. It is translated in several phases, which are described in Par.A.12. The first phases do low-level lexical transformations, carry out directives introduced by the lines beginning with the # character, and perform macro definition and expansion. When the preprocessing of Par.A.12 is complete, the program has been reduced to a sequence of tokens. 
程序由存储在文件中的一个或多个翻译单元组成。程序的翻译分为几个阶段，这些阶段在 Par.A.12 中描述。最初的几个阶段完成低层次的词法变换，执行以 # 字符开头的行所引入的指令，并进行宏定义与宏展开。当 Par.A.12 的预处理完成后，程序就被归约为一个记号序列。

## A.2.1 Tokens

There are six classes of tokens: identifiers, keywords, constants, string literals, operators, and other separators. Blanks, horizontal and vertical tabs, newlines, formfeeds and comments as described below (collectively, ``white space'') are ignored except as they separate tokens. Some white space is required to separate otherwise adjacent identifiers, keywords, and constants. 
记号共有六类：标识符、关键字、常量、字符串字面值、运算符以及其他分隔符。空格、横向与纵向制表符、换行符、换页符以及下文描述的注释（统称为"空白符"）除了用来分隔记号之外都被忽略。某些空白符是必需的，用来分隔原本相邻的标识符、关键字与常量。

If the input stream has been separated into tokens up to a given character, the next token is the longest string of characters that could constitute a token. 
如果输入流已被分离为记号直至某个给定字符，那么下一个记号就是下一个能够构成记号的最长字符串。

## A.2.2 Comments

The characters /* introduce a comment, which terminates with the characters */. Comments do not nest, and they do not occur within a string or character literals. 
字符 /* 引入一个注释，注释终止于字符 */。注释不能嵌套，也不能出现在字符串字面值或字符字面值之中。

## A.2.3 Identifiers

An identifier is a sequence of letters and digits. The first character must be a letter; the underscore _ counts as a letter. Upper and lower case letters are different. Identifiers may have any length, and for internal identifiers, at least the first 31 characters are significant; 
标识符是由字母与数字组成的序列。第一个字符必须是字母，下划线 _ 也算作字母。大写字母与小写字母是有区别的。标识符可以有任意长度；对于内部标识符，至少前 31 个字符是有效的；

some implementations may take more characters significant. Internal identifiers include preprocessor macro names and all other names that do not have external linkage (Par.A.11.2). Identifiers with external linkage are more restricted: implementations may make as few as the first six characters significant, and may ignore case distinctions. 
某些实现可能会让更多的字符有效。内部标识符包括预处理器宏名以及所有其他没有外部链接的名字。具有外部链接的标识符受到更多限制：实现可以只让前 6 个字符有效，并且可以忽略大小写区别。

## A.2.4 Keywords

The following identifiers are reserved for the use as keywords, and may not be used otherwise: 
下列标识符被保留用作关键字，不得用作其他用途：

<table><tr><td>auto</td><td>double</td><td>int</td><td>struct</td></tr><tr><td>break</td><td>else</td><td>long</td><td>switch</td></tr><tr><td>case</td><td>enum</td><td>register</td><td>typedef</td></tr><tr><td>char</td><td>extern</td><td>return</td><td>union</td></tr><tr><td>const</td><td>float</td><td>short</td><td>unsigned</td></tr><tr><td>continue</td><td>for</td><td>signed</td><td>void</td></tr><tr><td>default</td><td>goto</td><td>sizeof</td><td>volatile</td></tr><tr><td>do</td><td>if</td><td>static</td><td>while</td></tr></table>


Some implementations also reserve the words fortran and asm. 
某些实现还保留了 fortran 和 asm 这两个词。


The keywords const, signed, and volatile are new with the ANSI standard; enum and void are new since the first edition, but in common use; entry, formerly reserved but never used, is no longer reserved. 
关键字 const、signed 和 volatile 是 ANSI 标准新增的；enum 和 void 是第一版之后新增的，但已得到普遍使用；entry 曾被保留但从未使用，现在不再保留。

## A.2.5 Constants

There are several kinds of constants. Each has a data type; Par.A.4.2 discusses the basic types: 
存在几种常量。每种常量都有一个数据类型；Par.A.4.2 讨论了这些基本类型：

constant: 

integer-constant 

character-constant 

floating-constant 

enumeration-constant 

## A.2.5.1 Integer Constants

An integer constant consisting of a sequence of digits is taken to be octal if it begins with 0 (digit zero), decimal otherwise. Octal constants do not contain the digits 8 or 9. A sequence of digits preceded by 0x or 0X (digit zero) is taken to be a hexadecimal integer. The hexadecimal digits include a or A through f or F with values 10 through 15. 
一个由数字序列组成的整数常量，若以 0（数字零）开头则为八进制，否则为十进制。八进制常量不包含数字 8 和 9。以 0x 或 0X（数字零）开头的数字序列被当作十六进制整数。十六进制数字包括 a 或 A 到 f 或 F，其值为 10 到 15。

An integer constant may be suffixed by the letter u or U, to specify that it is unsigned. It may also be suffixed by the letter l or L to specify that it is long. 
整数常量可以加后缀字母 u 或 U，以指明它是无符号的；也可以加后缀字母 l 或 L，以指明它是 long 类型的。

The type of an integer constant depends on its form, value and suffix. (See Par.A.4 for a discussion of types). If it is unsuffixed and decimal, it has the first of these types in which its value can be represented: int, long int, unsigned long int. If it is unsuffixed, octal or hexadecimal, it has the first possible of these types: int, unsigned int, long int, unsigned long int. If it is suffixed by u or U, then unsigned int, unsigned long int. If it is suffixed by l or L, then long int, unsigned long int. If an integer constant is suffixed by UL, it is unsigned long. 
整数常量的类型取决于其形式、值和后缀（类型的讨论见 Par.A.4）。如果没有后缀且是十进制的，那么它的类型是下列类型中其值可表示的第一个：int、long int、unsigned long int。如果没有后缀，且是八进制或十六进制的，那么它的类型是下列可能类型中的第一个：int、unsigned int、long int、unsigned long int。如果后缀是 u 或 U，则为 unsigned int、unsigned long int。如果后缀是 l 或 L，则为 long int、unsigned long int。如果整数常量的后缀是 UL，则它是 unsigned long 类型。

The elaboration of the types of integer constants goes considerably beyond the first edition, which merely caused large integer constants to be long. The U suffixes are new. 
整数常量类型的这套详细规定比第一版大大扩展了，第一版只是让大的整数常量成为 long 类型。U 后缀是新增的。

## A.2.5.2 Character Constants

A character constant is a sequence of one or more characters enclosed in single quotes as in 'x'. The value of a character constant with only one character is the numeric value of the character in the machine's character set at execution time. The value of a multi-character constant is implementation-defined. 
字符常量是由单引号括住的一个或多个字符组成的序列，如 'x'。只包含一个字符的字符常量，其值是执行时该字符在机器字符集中的数值。多字符常量的值由实现定义。

Character constants do not contain the ' character or newlines; in order to represent them, and certain other characters, the following escape sequences may be used: 
字符常量不包含 ' 字符和换行符；为了表示它们以及某些其他字符，可以使用下列转义序列：

<table><tr><td>newline</td><td>NL (LF)</td><td>\n</td><td>backslash</td><td>\</td><td>\\</td></tr><tr><td>horizontal tab</td><td>HT</td><td>\t</td><td>question mark</td><td>?</td><td>\?</td></tr><tr><td>vertical tab</td><td>VT</td><td>\v</td><td>single quote</td><td>&#x27;</td><td>\&#x27;</td></tr><tr><td>backspace</td><td>BS</td><td>\b</td><td>double quote</td><td>&quot;</td><td>\&quot;</td></tr><tr><td>carriage return</td><td>CR</td><td>\r</td><td>octal number</td><td>ooo</td><td>\ooo</td></tr><tr><td>formfeed</td><td>FF</td><td>\f</td><td>hex number</td><td>hh</td><td>\xhh</td></tr><tr><td>audible alert</td><td>BEL</td><td>\a</td><td colspan="3"></td></tr></table>

The escape \ooo consists of the backslash followed by 1, 2, or 3 octal digits, which are taken to specify the value of the desired character. A common example of this construction is \0 (not followed by a digit), which specifies the character NUL. The escape \xhh consists of the backslash, followed by x, followed by hexadecimal digits, which are taken to specify the value of the desired character. There is no limit on the number of digits, but the behavior is undefined if the resulting character value exceeds that of the largest character. For either octal or hexadecimal escape characters, if the implementation treats the char type as signed, the value is sign-extended as if cast to char type. If the character following the \ is not one of those specified, the behavior is undefined. 
转义序列 \ooo 由反斜杠后跟 1、2 或 3 个八进制数字组成，这些数字被用来指定所想要的字符的值。这种构造的一个常见例子是 \0（后面不跟数字），它指定字符 NUL。转义序列 \xhh 由反斜杠、后跟 x、再后跟十六进制数字组成，这些数字被用来指定所想要的字符的值。对数字的个数没有限制，但如果得到的字符值超出了最大字符的值，其行为是未定义的。对于八进制或十六进制转义字符，如果实现把 char 类型当作有符号类型，那么该值会像被强制转换为 char 类型那样进行符号扩展。如果 \ 后面的字符不是这里列出的字符之一，其行为是未定义的。

In some implementations, there is an extended set of characters that cannot be represented in the char type. A constant in this extended set is written with a preceding L, for example L'x', and is called a wide character constant. Such a constant has type wchar_t, an integral type defined in the standard header <stddef.h>. As with ordinary character constants, hexadecimal escapes may be used; the effect is undefined if the specified value exceeds that representable with wchar_t. 
在某些实现中，存在一个扩展字符集，其中的字符无法用 char 类型表示。这个扩展字符集中的常量要在前面写一个 L，例如 L'x'，称为宽字符常量（wide character constant）。这种常量的类型是 wchar_t，它是在标准头文件 <stddef.h> 中定义的一个整数类型。与普通字符常量一样，可以使用十六进制转义；如果指定的值超出了 wchar_t 可表示的范围，其效果是未定义的。

Some of these escape sequences are new, in particular the hexadecimal character representation. Extended characters are also new. The character sets commonly used in the Americas and western Europe can be encoded to fit in the char type; the main intent in adding wchar_t was to accommodate Asian languages. 
这些转义序列中有一些是新增的，尤其是十六进制的字符表示形式。扩展字符也是新增的。美洲和西欧常用的字符集都可以编码后放入 char 类型；新增 wchar_t 的主要意图是容纳亚洲语言。

## A.2.5.3 Floating Constants

A floating constant consists of an integer part, a decimal part, a fraction part, an e or E, an optionally signed integer exponent and an optional type suffix, one of f, F, l, or L. The integer and fraction parts both consist of a sequence of digits. Either the integer part, or the fraction part (not both) may be missing; either the decimal point or the e and the exponent (not both) may be missing. The type is determined by the suffix; F or f makes it float, L or l makes it long double, otherwise it is double. 
浮点常量由整数部分、小数点、小数部分、e 或 E、一个可选的带符号整数指数以及一个可选的类型后缀（f、F、l 或 L 之一）组成。整数部分和小数部分都由数字序列组成。整数部分或小数部分（但不能两者都）可以省略；小数点或者 e 与指数（但不能两者都）可以省略。类型由后缀决定；F 或 f 使其成为 float，L 或 l 使其成为 long double，否则是 double。

## A.2.5.4 Enumeration Constants

Identifiers declared as enumerators (see Par.A.8.4) are constants of type int. 
声明为枚举符（见 Par.A.8.4）的标识符是 int 类型的常量。

## A.2.6 String Literals

A string literal, also called a string constant, is a sequence of characters surrounded by double quotes as in "...". A string has type ``array of characters'' and storage class static (see Par.A.3 below) and is initialized with the given characters. Whether identical string literals are distinct is implementation-defined, and the behavior of a program that attempts to alter a string literal is undefined. 
字符串字面值（string literal）也称为字符串常量，是用双引号括住的字符序列，如 "..."。字符串的类型是"字符数组"，存储类是 static（见下文 Par.A.3），并用给定的字符进行初始化。相同的字符串字面值是否是不同的对象由实现定义；试图修改字符串字面值的程序，其行为是未定义的。

Adjacent string literals are concatenated into a single string. After any concatenation, a null byte \0 is appended to the string so that programs that scan the string can find its end. String literals do not contain newline or double-quote characters; in order to represent them, the same escape sequences as for character constants are available. 
相邻的字符串字面值会被拼接成一个字符串。任何拼接之后，都会在字符串后附加一个空字节 \0，使得扫描字符串的程序能够找到它的末尾。字符串字面值不包含换行符和双引号字符；为了表示它们，可以使用与字符常量相同的转义序列。

As with character constants, string literals in an extended character set are written with a preceding L, as in L"...". Wide-character string literals have type ``array of wchar_t.'' Concatenation of ordinary and wide string literals is undefined. 
与字符常量一样，扩展字符集中的字符串字面值要在前面写一个 L，如 L"..."。宽字符串字面值的类型是"wchar_t 数组"。普通字符串字面值与宽字符串字面值的拼接是未定义的。

The specification that string literals need not be distinct, and the prohibition against modifying them, are new in the ANSI standard, as is the concatenation of adjacent string literals. Wide-character string literals are new. 
字符串字面值不必是不同对象的这一规定，以及禁止修改它们的规定，都是 ANSI 标准新增的，相邻字符串字面值的拼接也是新增的。宽字符串字面值是新增的。

## A.3 Syntax Notation

In the syntax notation used in this manual, syntactic categories are indicated by italic type, and literal words and characters in typewriter style. Alternative categories are usually listed on separate lines; in a few cases, a long set of narrow alternatives is presented on one line, marked by the phrase ``one of.'' An optional terminal or nonterminal symbol carries the subscript ``opt,'' so that, for example, 
在本手册使用的语法记号中，语法范畴用斜体表示，字面词与字符用打字机体表示。可选项通常分行列出；在少数情况下，一长串简短的可选项会放在一行中，并用短语 "one of" 标注。可选的终结符或非终结符带有下标 "opt"，例如：

$$
\left\{e x p r e s s i o n _ {o p t} \right\}
$$

means an optional expression, enclosed in braces. The syntax is summarized in Par.A.13. 
表示一个可选的、用花括号括住的表达式。语法的汇总见 Par.A.13。

Unlike the grammar given in the first edition of this book, the one given here makes precedence and associativity of expression operators explicit. 
与本书第一版给出的文法不同，这里给出的文法明确地表示出了表达式运算符的优先级和结合性。

## A.4 Meaning of Identifiers

Identifiers, or names, refer to a variety of things: functions; tags of structures, unions, and enumerations; members of structures or unions; enumeration constants; typedef names; and objects. An object, sometimes called a variable, is a location in storage, and its interpretation depends on two main attributes: its storage class and its type. The storage class determines the lifetime of the storage associated with the identified object; the type determines the meaning of the values found in the identified object. A name also has a scope, which is the region of the program in which it is known, and a linkage, which determines whether the same name in another scope refers to the same object or function. Scope and linkage are discussed in Par.A.11. 
标识符（或称名字）可以指代多种东西：函数；结构、联合和枚举的标记（tag）；结构或联合的成员；枚举常量；typedef 名字；以及对象。对象有时也称为变量，是存储中的一个位置，对它的解释取决于两个主要属性：它的存储类和它的类型。存储类决定与被标识对象关联的存储的生命期；类型决定在被标识对象中找到的值的含义。名字还有一个作用域（scope），即程序中该名字可知的区域；还有一个链接（linkage），它决定另一个作用域中的同一名字是否指代同一个对象或函数。作用域与链接在 Par.A.11 中讨论。

## A.4.1 Storage Class

There are two storage classes: automatic and static. Several keywords, together with the context of an object's declaration, specify its storage class. Automatic objects are local to a block (Par.9.3), and are discarded on exit from the block. Declarations within a block create automatic objects if no storage class specification is mentioned, or if the auto specifier is used. Objects declared register are automatic, and are (if possible) stored in fast registers of the machine. 
有两种存储类：自动的和静态的。若干关键字连同对象声明所在的上下文一起指定对象的存储类。自动对象局部于一个块（Par.9.3），在退出该块时被丢弃。块内的声明在未提及存储类说明符或使用 auto 说明符时创建自动对象。声明为 register 的对象是自动的，并且（如果可能的话）被存放在机器的快速寄存器中。

Static objects may be local to a block or external to all blocks, but in either case retain their values across exit from and reentry to functions and blocks. Within a block, including a block that provides the code for a function, static objects are declared with the keyword static. The objects declared outside all blocks, at the same level as function definitions, are always static. They may be made local to a particular translation unit by use of the static keyword; this gives them internal linkage. They become global to an entire program by omitting an explicit storage class, or by using the keyword extern; this gives them external linkage. 
静态对象可以局部于一个块，也可以对所有块都是外部的，但无论哪种情况，在退出和重新进入函数与块时都保持其值。在一个块内（包括提供函数代码的块内），静态对象用关键字 static 声明。在所有块之外、与函数定义同一层声明的对象总是静态的。可以用 static 关键字使它们局部于特定的翻译单元；这将赋予它们内部链接（internal linkage）。也可以通过省略显式的存储类，或使用关键字 extern，使它们对整个程序是全局的；这将赋予它们外部链接（external linkage）。

## A.4.2 Basic Types

There are several fundamental types. The standard header <limits.h> described in Appendix B defines the largest and smallest values of each type in the local implementation. The numbers given in Appendix B show the smallest acceptable magnitudes. 
存在几种基本类型。附录 B 中描述的标准头文件 <limits.h> 定义了本地实现中每种类型的最大值和最小值。附录 B 中给出的数字是可接受的最小量级。

Objects declared as characters (char) are large enough to store any member of the execution character set. If a genuine character from that set is stored in a char object, its value is equivalent to the integer code for the character, and is non-negative. Other quantities may be stored into char variables, but the available range of values, and especially whether the value is signed, is implementation-dependent. 
声明为字符（char）的对象大到足以存放执行字符集中的任何成员。如果来自该字符集的一个真正的字符被存放到一个 char 对象中，其值等价于该字符的整数编码，并且是非负的。其他量也可以存入 char 变量，但可用的取值范围，尤其是值是否有符号，是与实现相关的。

Unsigned characters declared unsigned char consume the same amount of space as plain characters, but always appear non-negative; explicitly signed characters declared signed char likewise take the same space as plain characters. 
声明为 unsigned char 的无符号字符与普通字符占用同样多的空间，但总是表现为非负的；声明为 signed char 的显式有符号字符同样占用与普通字符相同的空间。

unsigned char type does not appear in the first edition of this book, but is in common use. signed char is new. 
unsigned char 类型在本书第一版中没有出现，但已得到普遍使用。signed char 是新增的。

Besides the char types, up to three sizes of integer, declared short int, int, and long int, are available. Plain int objects have the natural size suggested by the host machine architecture; the other sizes are provided to meet special needs. Longer integers provide at least as much storage as shorter ones, but the implementation may make plain integers equivalent to either short integers, or long integers. The int types all represent signed values unless specified otherwise. 
除 char 类型之外，还可以有最多三种大小的整数，声明为 short int、int 和 long int。普通 int 对象具有宿主机体系结构所建议的自然大小；其他大小用来满足特殊需要。较长的整数至少提供与较短整数一样多的存储，但实现也可以让普通整数等价于短整数或长整数。除非另有说明，int 类型都表示有符号值。

Unsigned integers, declared using the keyword unsigned, obey the laws of arithmetic modulo 2<sup>n</sup> where n is the number of bits in the representation, and thus arithmetic on unsigned quantities can never overflow. The set of non-negative values that can be stored in a signed object is a subset of the values that can be stored in the corresponding unsigned object, and the representation for the overlapping values is the same. 
使用关键字 unsigned 声明的无符号整数遵守模 2<sup>n</sup> 的算术法则（其中 n 是表示中的位数），因此对无符号量的算术运算永远不会溢出。可以存入有符号对象的非负值集合，是可存入对应无符号对象的值集合的子集，并且重叠值的表示方式相同。

Any of single precision floating point (float), double precision floating point (double), and extra precision floating point (long double) may be synonymous, but the ones later in the list are at least as precise as those before. 
单精度浮点（float）、双精度浮点（double）和超高精度浮点（long double）三者可以是同义的，但列表中靠后的类型至少与靠前的类型一样精确。

long double is new. The first edition made long float equivalent to double; the locution has been withdrawn. 
long double 是新增的。第一版曾把 long float 当作与 double 等价，这一说法已被撤销。

Enumerations are unique types that have integral values; associated with each enumeration is a set of named constants (Par.A.8.4). Enumerations behave like integers, but it is common for a compiler to issue a warning when an object of a particular enumeration is assigned something other than one of its constants, or an expression of its type. 
枚举是具有整数值的独特类型；每个枚举都关联着一组命名的常量（Par.A.8.4）。枚举的行为类似于整数，但当把某个特定枚举的常量之外的值，或其类型之外的表达式，赋给该枚举类型的对象时，编译器通常会发出警告。

Because objects of these types can be interpreted as numbers, they will be referred to as arithmetic types. Types char, and int of all sizes, each with or without sign, and also enumeration types, will collectively be called integral types. The types float, double, and long double will be called floating types. 
由于这些类型的对象可以被解释为数，它们将被称为算术类型（arithmetic types）。char 类型、所有大小的 int 类型（各有符号与无符号两种）以及枚举类型，统称为整数类型（integral types）。float、double 和 long double 类型将被称为浮点类型（floating types）。

The void type specifies an empty set of values. It is used as the type returned by functions that generate no value. 
void 类型指定一个空的值集合。它被用作不生成值的函数的返回类型。

## A.4.3 Derived types

Beside the basic types, there is a conceptually infinite class of derived types constructed from the fundamental types in the following ways: 
除了基本类型之外，还有一个概念上无限的派生类型类别，它们由基本类型按下列方式构造：

arrays of objects of a given type; 
给定类型的对象的数组；

functions returning objects of a given type; 
返回给定类型对象的函数；

pointers to objects of a given type; 
指向给定类型对象的指针；

structures containing a sequence of objects of various types; 
包含一个由各种类型的对象组成的序列的结构；

unions capable of containing any of one of several objects of various types. 
能够包含若干个不同类型对象中任意一个的联合。

In general these methods of constructing objects can be applied recursively. 
一般而言，这些构造对象的方法可以递归地应用。

## A.4.4 Type Qualifiers

An object's type may have additional qualifiers. Declaring an object const announces that its value will not be changed; declaring it volatile announces that it has special properties relevant to optimization. Neither qualifier affects the range of values or arithmetic properties of the object. Qualifiers are discussed in Par.A.8.2. 
对象的类型可以带有附加的限定符（qualifier）。把对象声明为 const，表明它的值不会被改变；把它声明为 volatile，表明它具有与优化相关的特殊性质。两种限定符都不影响对象的取值范围或算术性质。限定符在 Par.A.8.2 中讨论。

## A.5 Objects and Lvalues

An Object is a named region of storage; an lvalue is an expression referring to an object. An obvious example of an lvalue expression is an identifier with suitable type and storage class. There are operators that yield lvalues, if E is an expression of pointer type, then *E is an lvalue expression referring to the object to which E points. The name ``lvalue'' comes from the assignment expression E1 = E2 in which the left operand E1 must be an lvalue expression. The discussion of each operator specifies whether it expects lvalue operands and whether it yields an lvalue. 
对象（Object）是存储的一个命名的区域；左值（lvalue）是引用一个对象的表达式。左值表达式的一个明显例子是具有适当类型和存储类的标识符。有些运算符会产生左值：如果 E 是一个指针类型的表达式，那么 *E 就是一个引用 E 所指对象的左值表达式。"lvalue"（左值）这个名字来自赋值表达式 E1 = E2，其中左操作数 E1 必须是左值表达式。对每个运算符的讨论都会说明它是否期望左值操作数，以及它是否产生左值。

## A.6 Conversions

Some operators may, depending on their operands, cause conversion of the value of an operand from one type to another. This section explains the result to be expected from such conversions. Par.6.5 summarizes the conversions demanded by most ordinary operators; it will be supplemented as required by the discussion of each operator. 
某些运算符会根据其操作数，把操作数的值从一种类型转换为另一种类型。本节解释这类转换可以期望得到的结果。Par.6.5 汇总了大多数普通运算符所要求的转换；在对每个运算符的讨论中会根据需要对此加以补充。

## A.6.1 Integral Promotion

A character, a short integer, or an integer bit-field, all either signed or not, or an object of enumeration type, may be used in an expression wherever an integer may be used. If an int can represent all the values of the original type, then the value is converted to int; otherwise the value is converted to unsigned int. This process is called integral promotion. 
字符、短整数或整型位字段（无论是否有符号），或者枚举类型的对象，都可以在任何可以使用整数的表达式中使用。如果 int 能够表示原类型的所有值，那么该值就被转换为 int；否则该值被转换为 unsigned int。这一过程称为整型提升（integral promotion）。

## A.6.2 Integral Conversions

Any integer is converted to a given unsigned type by finding the smallest non-negative value that is congruent to that integer, modulo one more than the largest value that can be represented in the unsigned type. In a two's complement representation, this is equivalent to left-truncation if the bit pattern of the unsigned type is narrower, and to zero-filling unsigned values and sign-extending signed values if the unsigned type is wider. 
任何整数被转换为给定的无符号类型的方式是：找出与该整数同余的最小非负值，模数比该无符号类型所能表示的最大值大 1。在二进制补码表示中，如果无符号类型的位模式更窄，这等价于截去左侧的位；如果无符号类型更宽，则等价于对无符号值进行零填充、对有符号值进行符号扩展。

When any integer is converted to a signed type, the value is unchanged if it can be represented in the new type and is implementation-defined otherwise. 
当任何整数被转换为有符号类型时，如果值能够在新类型中表示，则值不变；否则结果由实现定义。

## A.6.3 Integer and Floating

When a value of floating type is converted to integral type, the fractional part is discarded; if the resulting value cannot be represented in the integral type, the behavior is undefined. In particular, the result of converting negative floating values to unsigned integral types is not specified. 
当浮点类型的值被转换为整数类型时，小数部分被丢弃；如果得到的值无法用整数类型表示，其行为是未定义的。特别地，把负的浮点值转换为无符号整数类型的结果没有规定。

When a value of integral type is converted to floating, and the value is in the representable range but is not exactly representable, then the result may be either the next higher or next lower representable value. If the result is out of range, the behavior is undefined. 
当整数类型的值被转换为浮点类型时，如果值在可表示范围内但不能精确表示，那么结果可能是相邻的较大或较小的可表示值。如果结果超出范围，其行为是未定义的。

## A.6.4 Floating Types

When a less precise floating value is converted to an equally or more precise floating type, the value is unchanged. When a more precise floating value is converted to a less precise floating type, and the value is within representable range, the result may be either the next higher or the next lower representable value. If the result is out of range, the behavior is undefined. 
当精度较低的浮点值被转换为同等或更高精度的浮点类型时，值不变。当精度较高的浮点值被转换为精度较低的浮点类型，且值在可表示范围内时，结果可能是相邻的较大或较小的可表示值。如果结果超出范围，其行为是未定义的。

## A.6.5 Arithmetic Conversions

Many operators cause conversions and yield result types in a similar way. The effect is to bring operands into a common type, which is also the type of the result. This pattern is called the usual arithmetic conversions. 
许多运算符都会以类似的方式引起转换并给出结果的类型。其效果是把操作数带到同一个公共类型上，该类型也是结果的类型。这种模式称为常规算术转换（usual arithmetic conversions）。

• First, if either operand is long double, the other is converted to long double. 
• 首先，如果任一操作数是 long double，则另一个操作数被转换为 long double。

• Otherwise, if either operand is double, the other is converted to double. 
• 否则，如果任一操作数是 double，则另一个操作数被转换为 double。

• Otherwise, if either operand is float, the other is converted to float. 
• 否则，如果任一操作数是 float，则另一个操作数被转换为 float。

• Otherwise, the integral promotions are performed on both operands; then, if either operand is unsigned long int, the other is converted to unsigned long int. 
• 否则，对两个操作数都执行整型提升；然后，如果任一操作数是 unsigned long int，则另一个操作数被转换为 unsigned long int。

• Otherwise, if one operand is long int and the other is unsigned int, the effect depends on whether a long int can represent all values of an unsigned int; if so, the unsigned int operand is converted to long int; if not, both are converted to unsigned long int. 
• 否则，如果一个操作数是 long int 而另一个是 unsigned int，其效果取决于 long int 能否表示 unsigned int 的所有值；如果能，则 unsigned int 操作数被转换为 long int；如果不能，则两者都被转换为 unsigned long int。

• Otherwise, if one operand is long int, the other is converted to long int. 
• 否则，如果一个操作数是 long int，则另一个操作数被转换为 long int。

• Otherwise, if either operand is unsigned int, the other is converted to unsigned int. 
• 否则，如果任一操作数是 unsigned int，则另一个操作数被转换为 unsigned int。

• Otherwise, both operands have type int. 
• 否则，两个操作数的类型都是 int。

There are two changes here. First, arithmetic on float operands may be done in single precision, rather than double; the first edition specified that all floating arithmetic was double precision. Second, shorter unsigned types, when combined with a larger signed type, do not propagate the unsigned property to the result type; in the first edition, the unsigned always dominated. The new rules are slightly more complicated, but reduce somewhat the surprises that may occur when an unsigned quantity meets signed. Unexpected results may still occur when an unsigned expression is compared to a signed expression of the same size. 
这里有两处变化。首先，对 float 操作数的算术运算可以在单精度而非双精度下进行；第一版规定所有浮点算术运算都是双精度的。其次，较短的无符号类型与较大的有符号类型组合时，不会再把无符号性质传播到结果类型；在第一版中，无符号总是占支配地位。新规则稍微复杂了一些，但减少了一些当无符号量遇到有符号量时可能发生的意外。当无符号表达式与同样大小的有符号表达式进行比较时，仍然可能出现意外的结果。

## A.6.6 Pointers and Integers

An expression of integral type may be added to or subtracted from a pointer; in such a case the integral expression is converted as specified in the discussion of the addition operator (Par.A.7.7). 
整数类型的表达式可以与指针相加或相减；在这种情况下，整数表达式按照加法运算符讨论（Par.A.7.7）中的规定进行转换。

Two pointers to objects of the same type, in the same array, may be subtracted; the result is converted to an integer as specified in the discussion of the subtraction operator (Par.A.7.7). 
指向同一数组中同类型对象的两个指针可以相减；结果按照减法运算符讨论（Par.A.7.7）中的规定被转换为一个整数。

An integral constant expression with value 0, or such an expression cast to type void *, may be converted, by a cast, by assignment, or by comparison, to a pointer of any type. This produces a null pointer that is equal to another null pointer of the same type, but unequal to any pointer to a function or object. 
值为 0 的整型常量表达式，或被强制转换为 void * 类型的这种表达式，可以通过强制转换、赋值或比较，被转换为任何类型的指针。这将产生一个空指针（null pointer），它等于同类型的另一个空指针，但不等于任何指向函数或对象的指针。

Certain other conversions involving pointers are permitted, but have implementation-defined aspects. They must be specified by an explicit type-conversion operator, or cast (Pars.A.7.5 and A.8.8). 
涉及指针的某些其他转换也是允许的，但带有与实现相关的方面。它们必须通过显式的类型转换运算符即强制转换（cast）来指定（Par.A.7.5 和 Par.A.8.8）。

A pointer may be converted to an integral type large enough to hold it; the required size is implementation-dependent. The mapping function is also implementation-dependent. 
指针可以被转换为足以容纳它的大整数类型；所需的大小是与实现相关的。映射函数也是与实现相关的。

A pointer to one type may be converted to a pointer to another type. The resulting pointer may cause addressing exceptions if the subject pointer does not refer to an object suitably aligned in storage. It is guaranteed that a pointer to an object may be converted to a pointer to an object whose type requires less or equally strict storage alignment and back again without change; the notion of ``alignment'' is implementation-dependent, but objects of the char types have least strict alignment requirements. As described in Par.A.6.8, a pointer may also be converted to type void * and back again without change. 
一种类型的指针可以被转换为另一种类型的指针。如果原来的指针没有指向一个在存储中适当对齐的对象，那么得到的指针可能引起寻址异常。可以保证：指向某对象的指针可以被转换为指向一个其类型对存储对齐要求较松或相同的对象的指针，并且可以再转换回来而不发生改变；"对齐"（alignment）的概念是与实现相关的，但 char 类型的对象的对齐要求最宽松。如 Par.A.6.8 所述，指针也可以被转换为 void * 类型再转换回来而不发生改变。

A pointer may be converted to another pointer whose type is the same except for the addition or removal of qualifiers (Pars.A.4.4, A.8.2) of the object type to which the pointer refers. If qualifiers are added, the new pointer is equivalent to the old except for restrictions implied by the new qualifiers. If qualifiers are removed, operations on the underlying object remain subject to the qualifiers in its actual declaration. 
指针可以被转换为另一个指针，后者的类型与之相同，只是该指针所指对象类型的限定符（Par.A.4.4 与 Par.A.8.2）有所增加或去除。如果增加了限定符，新指针与旧指针等价，只是受新限定符所隐含的限制；如果去除了限定符，对底层对象的操作仍然受其实际声明中限定符的约束。

Finally, a pointer to a function may be converted to a pointer to another function type. Calling the function specified by the converted pointer is implementation-dependent; however, if the converted pointer is reconverted to its original type, the result is identical to the original pointer. 
最后，指向函数的指针可以被转换为指向另一个函数类型的指针。调用由转换后指针所指定的函数是与实现相关的；不过，如果把这个转换后的指针再转换回原来的类型，结果就与原来的指针完全相同。

## A.6.7 Void

The (nonexistent) value of a void object may not be used in any way, and neither explicit nor implicit conversion to any non-void type may be applied. Because a void expression denotes a nonexistent value, such an expression may be used only where the value is not required, for example as an expression statement (Par.A.9.2) or as the left operand of a comma operator (Par.A.7.18). 
void 对象的（不存在的）值不能以任何方式使用，也不能对它应用显式或隐式的转换而得到任何非 void 类型。因为 void 表达式表示一个不存在的值，所以这样的表达式只能用在不需要值的地方，例如作为表达式语句（Par.A.9.2）或作为逗号运算符的左操作数（Par.A.7.18）。

An expression may be converted to type void by a cast. For example, a void cast documents the discarding of the value of a function call used as an expression statement. 
表达式可以通过强制转换被转换为 void 类型。例如，一个 void 强制转换表明丢弃了用作表达式语句的函数调用的值。

void did not appear in the first edition of this book, but has become common since. 
void 在本书第一版中没有出现，但自那之后已变得很常见。

## A.6.8 Pointers to Void

Any pointer to an object may be converted to type void * without loss of information. If the result is converted back to the original pointer type, the original pointer is recovered. Unlike the pointer-to-pointer conversions discussed in Par.A.6.6, which generally require an explicit cast, pointers may be assigned to and from pointers of type void *, and may be compared with them. 
任何指向对象的指针都可以被转换为 void * 类型而不损失信息。如果结果被转换回原来的指针类型，就能恢复出原来的指针。与 Par.A.6.6 中讨论的指针到指针的转换（通常需要显式的强制转换）不同，指针可以与 void * 类型的指针互相赋值，也可以与它们进行比较。

This interpretation of void * pointers is new; previously, char * pointers played the role of generic pointer. The ANSI standard specifically blesses the meeting of void * pointers with object pointers in assignments and relationals, while requiring explicit casts for other pointer mixtures. 
对 void * 指针的这种解释是新的；以前，char * 指针扮演着通用指针的角色。ANSI 标准特别批准了 void * 指针与对象指针在赋值和关系运算中的混用，而对其他指针混合使用则要求显式的强制转换。

## A.7 Expressions

The precedence of expression operators is the same as the order of the major subsections of this section, highest precedence first. Thus, for example, the expressions referred to as the operands of + (Par.A.7.7) are those expressions defined in Pars.A.7.1-A.7.6. Within each subsection, the operators have the same precedence. Left- or right-associativity is specified in each subsection for the operators discussed therein. The grammar given in Par.13 incorporates the precedence and associativity of the operators. 
表达式运算符的优先级与本节各主要小节的顺序相同，优先级最高的在前。例如，作为 +（Par.A.7.7）的操作数被提到的表达式，就是在 Par.A.7.1~Par.A.7.6 中定义的那些表达式。在每个小节内，各运算符具有相同的优先级。每个小节针对其中讨论的运算符指明了左结合还是右结合。Par.A.13 中给出的文法融入了各运算符的优先级和结合性。

The precedence and associativity of operators is fully specified, but the order of evaluation of expressions is, with certain exceptions, undefined, even if the subexpressions involve side effects. That is, unless the definition of the operator guarantees that its operands are evaluated in a particular order, the implementation is free to evaluate operands in any order, or even to interleave their evaluation. However, each operator combines the values produced by its operands in a way compatible with the parsing of the expression in which it appears. 
运算符的优先级和结合性是完全规定了的，但表达式的求值顺序除某些例外情况外是未定义的，即使子表达式涉及副作用也是如此。也就是说，除非该运算符的定义保证其操作数按特定顺序求值，否则实现可以按任意顺序对操作数求值，甚至交错地求值。不过，每个运算符都会以与其所在表达式的解析相兼容的方式组合其操作数产生的值。

This rule revokes the previous freedom to reorder expressions with operators that are mathematically commutative and associative, but can fail to be computationally associative. The change affects only floating-point computations near the limits of their accuracy, and situations where overflow is possible. 
这条规则撤销了以前的一种自由，即重排那些在数学上可交换、可结合但在计算上可能不满足结合性的运算符的表达式的自由。这一变化只影响接近精度极限的浮点计算，以及可能发生溢出的情形。

The handling of overflow, divide check, and other exceptions in expression evaluation is not defined by the language. Most existing implementations of C ignore overflow in evaluation of signed integral expressions and assignments, but this behavior is not guaranteed. Treatment of division by 0, and all floating-point exceptions, varies among implementations; sometimes it is adjustable by a non-standard library function. 
语言没有定义表达式求值中溢出、除零检查以及其他异常的处理。现有的大多数 C 实现都会忽略有符号整数表达式和赋值求值中的溢出，但这一行为没有保证。对除以 0 以及所有浮点异常的处理因实现而异；有时可以通过一个非标准库函数进行调整。

## A.7.1 Pointer Conversion

If the type of an expression or subexpression is ``array of T'' for some type T, then the value of the expression is a pointer to the first object in the array, and the type of the expression is altered to ``pointer to T.'' This conversion does not take place if the expression is in the operand of the unary & operator, or of ++, --, sizeof, or as the left operand of an assignment operator or the . operator. Similarly, an expression of type ``function returning T,'' except when used as the operand of the & operator, is converted to ``pointer to function returning T.' 
如果表达式或子表达式的类型是"T 的数组"（array of T，T 为某个类型），那么该表达式的值就是指向数组中第一个对象的指针，并且表达式的类型被改变为"指向 T 的指针"。如果该表达式是一元 & 运算符或 ++、--、sizeof 运算符的操作数，或者是赋值运算符或 . 运算符的左操作数，这一转换就不会发生。类似地，"返回 T 的函数"类型的表达式，除用作 & 运算符的操作数之外，会被转换为"指向返回 T 的函数的指针"。

## A.7.2 Primary Expressions

Primary expressions are identifiers, constants, strings, or expressions in parentheses. 
基本表达式（primary expression）是标识符、常量、字符串或括号中的表达式。

primary-expression 

identifier 

constant 

string 

(expression) 

An identifier is a primary expression, provided it has been suitably declared as discussed below. Its type is specified by its declaration. An identifier is an lvalue if it refers to an object (Par.A.5) and if its type is arithmetic, structure, union, or pointer. 
标识符是一个基本表达式，前提是它已经按下面讨论的那样被适当地声明了。它的类型由其声明规定。如果标识符指代一个对象（Par.A.5），并且其类型是算术类型、结构、联合或指针，那么它就是一个左值。

A constant is a primary expression. Its type depends on its form as discussed in Par.A.2.5. 
常量是一个基本表达式。它的类型取决于其形式，如 Par.A.2.5 中所讨论的。

A string literal is a primary expression. Its type is originally ``array of char'' (for wide-char strings, ``array of wchar_t''), but following the rule given in Par.A.7.1, this is usually modified to ``pointer to char'' (wchar_t) and the result is a pointer to the first character in the string. The conversion also does not occur in certain initializers; see Par.A.8.7. 
字符串字面值是一个基本表达式。它的类型本来是"char 数组"（对宽字符串则是"wchar_t 数组"），但按照 Par.A.7.1 中给出的规则，通常被改为"指向 char 的指针"（指向 wchar_t 的指针），结果是指向字符串第一个字符的指针。在某些初始化程序中，这一转换也不发生；见 Par.A.8.7。

A parenthesized expression is a primary expression whose type and value are identical to those of the unadorned expression. The precedence of parentheses does not affect whether the expression is an lvalue. 
带括号的表达式是一个基本表达式，其类型和值与不带括号的表达式相同。括号的存在与否并不影响表达式是否为左值。

## A.7.3 Postfix Expressions

The operators in postfix expressions group left to right. 
后缀表达式中的运算符从左向右组合。

postfix-expression: 

primary-expression 

postfix-expression[expression] 

postfix-expression(argument-expression-list<sub>opt</sub>) 

postfix-expression.identifier 

postfix-expression->identifier 

postfix-expression++ 

postfix-expression-- 

argument-expression-list: assignment-expression assignment-expression-list , assignment-expression 

## A.7.3.1 Array References

A postfix expression followed by an expression in square brackets is a postfix expression denoting a subscripted array reference. One of the two expressions must have type ``pointer to T'', where T is some type, and the other must have integral type; the type of the subscript expression is T. The expression E1[E2] is identical (by definition) to *((E1)+(E2)). See Par.A.8.6.2 for further discussion. 
一个后缀表达式后跟一个方括号括住的表达式，构成一个表示带下标的数组引用的后缀表达式。两个表达式中必须有一个具有"指向 T 的指针"类型（T 为某个类型），另一个必须具有整数类型；下标表达式的类型是 T。表达式 E1[E2]（按定义）与 *((E1)+(E2)) 完全相同。进一步的讨论见 Par.A.8.6.2。

## A.7.3.2 Function Calls

A function call is a postfix expression, called the function designator, followed by parentheses containing a possibly empty, comma-separated list of assignment expressions (Par.A7.17), which constitute the arguments to the function. If the postfix expression consists of an identifier for which no declaration exists in the current scope, the identifier is implicitly declared as if the declaration 
函数调用是一个后缀表达式（称为函数指名符），后跟一对圆括号，括号中包含一个可能为空的、用逗号分隔的赋值表达式列表（Par.A.7.17），这些赋值表达式构成函数的实参。如果后缀表达式由一个在当前作用域内没有声明的标识符组成，那么该标识符会被隐式地声明，就像如下声明

extern int identifier(); 

had been given in the innermost block containing the function call. The postfix expression (after possible explicit declaration and pointer generation, Par.A7.1) must be of type ``pointer to function returning T,'' for some type T, and the value of the function call has type T. 
已经在包含该函数调用的最内层块中给出一样。后缀表达式（在可能的显式声明和指针生成之后，Par.A.7.1）必须具有"指向返回 T 的函数的指针"类型（T 为某个类型），且函数调用的值具有类型 T。

In the first edition, the type was restricted to ``function,'' and an explicit * operator was required to call through pointers to functions. The ANSI standard blesses the practice of some existing compilers by permitting the same syntax for calls to functions and to functions specified by pointers. The older syntax is still usable. 
在第一版中，类型被限制为"函数"，并且通过函数指针进行调用时需要显式的 * 运算符。ANSI 标准批准了一些现有编译器的做法，允许对函数的调用和通过指针指定的函数的调用使用相同的语法。旧的语法仍然可用。

The term argument is used for an expression passed by a function call; the term parameter is used for an input object (or its identifier) received by a function definition, or described in a function declaration. The terms ``actual argument (parameter)'' and ``formal argument (parameter)'' respectively are sometimes used for the same distinction. 
术语"实参"（argument）用于函数调用所传递的表达式；术语"形参"（parameter）用于函数定义所接收的输入对象（或其标识符），或在函数声明中所描述的对象。"实际参数（actual argument/parameter）"与"形式参数（formal argument/parameter）"这两个术语有时也分别用来表达同样的区别。

In preparing for the call to a function, a copy is made of each argument; all argument-passing is strictly by value. A function may change the values of its parameter objects, which are copies of the argument expressions, but these changes cannot affect the values of the arguments. However, it is possible to pass a pointer on the understanding that the function may change the value of the object to which the pointer points. 
在为函数调用做准备时，会对每个实参做一个副本；所有参数传递都严格是按值传递的。函数可以改变其形参对象（即实参表达式的副本）的值，但这些改变不会影响实参的值。不过，可以在传递指针时约定函数可能会改变指针所指对象的值。

There are two styles in which functions may be declared. In the new style, the types of parameters are explicit and are part of the type of the function; such a declaration os also called a function prototype. In the old style, parameter types are not specified. Function declaration is issued in Pars.A.8.6.3 and A.10.1 
函数的声明有两种风格。在新风格中，参数的类型是显式的，并且是函数类型的一部分；这样的声明也称为函数原型（function prototype）。在旧风格中，不指定参数的类型。函数声明在 Par.A.8.6.3 和 Par.A.10.1 中讨论。

If the function declaration in scope for a call is old-style, then default argument promotion is applied to each argument as follows: integral promotion (Par.A.6.1) is performed on each argument of integral type, and each float argument is converted to double. The effect of the call is undefined if the number of arguments disagrees with the number of parameters in the definition of the function, or if the type of an argument after promotion disagrees with that of the corresponding parameter. Type agreement depends on whether the function's definition is new-style or old-style. If it is old-style, then the comparison is between the promoted type of the arguments of the call, and the promoted type of the parameter, if the definition is newstyle, the promoted type of the argument must be that of the parameter itself, without promotion. 
如果调用时作用域内的函数声明是旧风格的，那么会对每个实参应用默认的参数提升：对每个整数类型的实参执行整型提升（Par.A.6.1），每个 float 类型的实参被转换为 double。如果实参的个数与函数定义中形参的个数不一致，或者提升后实参的类型与对应形参的类型不一致，那么调用的效果是未定义的。类型是否一致取决于函数的定义是新风格还是旧风格。如果是旧风格，那么比较是在调用实参提升后的类型与形参提升后的类型之间进行的；如果定义是新风格，那么实参提升后的类型必须与形参本身的类型一致，不做提升。

If the function declaration in scope for a call is new-style, then the arguments are converted, as if by assignment, to the types of the corresponding parameters of the function's prototype. The number of arguments must be the same as the number of explicitly described parameters, unless the declaration's parameter list ends with the ellipsis notation (, ...). In that case, the number of arguments must equal or exceed the number of parameters; trailing arguments beyond the explicitly typed parameters suffer default argument promotion as described in the preceding paragraph. If the definition of the function is old-style, then the type of each parameter in the definition, after the definition parameter's type has undergone argument promotion. 
如果调用时作用域内的函数声明是新风格的，那么实参会被转换（就像通过赋值那样）为函数原型中对应形参的类型。实参的个数必须与显式描述的形参个数相同，除非声明的参数表以省略号记号（, ...）结尾。在这种情况下，实参的个数必须等于或超过形参的个数；超出显式指定类型的形参之外的尾部实参，按上一段所述接受默认的参数提升。如果函数的定义是旧风格的，那么定义中每个形参的类型，即为该定义形参的类型经过参数提升之后的类型。

These rules are especially complicated because they must cater to a mixture of old- and new-style functions. Mixtures are to be avoided if possible. 
这些规则特别复杂，因为它们必须同时照顾旧风格和新风格函数的混合使用。如果可能，应避免混合使用。

The order of evaluation of arguments is unspecified; take note that various compilers differ. However, the arguments and the function designator are completely evaluated, including all side effects, before the function is entered. Recursive calls to any function are permitted. 
实参的求值顺序没有规定；请注意各种编译器有所不同。不过，在进入函数之前，实参和函数指名符都会被完全求值，包括所有副作用。对任何函数的递归调用都是允许的。

## A.7.3.3 Structure References

A postfix expression followed by a dot followed by an identifier is a postfix expression. The first operand expression must be a structure or a union, and the identifier must name a member of the structure or union. The value is the named member of the structure or union, and its type is the type of the member. The expression is an lvalue if the first expression is an lvalue, and if the type of the second expression is not an array type. 
后缀表达式后跟一个点号再跟一个标识符，构成一个后缀表达式。第一个操作数表达式必须是结构或联合，标识符必须命名该结构或联合的一个成员。值就是该结构或联合中被命名的成员，其类型就是该成员的类型。如果第一个表达式是左值，并且第二个表达式的类型不是数组类型，那么该表达式就是一个左值。

A postfix expression followed by an arrow (built from - and >) followed by an identifier is a postfix expression. The first operand expression must be a pointer to a structure or union, and the identifier must name a member of the structure or union. The result refers to the named member of the structure or union to which the pointer expression points, and the type is the type of the member; the result is an lvalue if the type is not an array type. 
后缀表达式后跟一个箭头（由 - 和 > 构成）再跟一个标识符，构成一个后缀表达式。第一个操作数表达式必须是指向结构或联合的指针，标识符必须命名该结构或联合的一个成员。结果指的就是指针表达式所指向的结构或联合中被命名的成员，类型就是该成员的类型；如果该类型不是数组类型，结果就是一个左值。

Thus the expression E1->MOS is the same as (*E1).MOS. Structures and unions are discussed in Par.A.8.3. 
因此，表达式 E1->MOS 与 (*E1).MOS 相同。结构与联合在 Par.A.8.3 中讨论。

In the first edition of this book, it was already the rule that a member name in such an expression had to belong to the structure or union mentioned in the postfix expression; however, a note admitted that this rule was not firmly enforced. Recent compilers, and ANSI, do enforce it. 
在本书第一版中，就已经有这样的规则：这种表达式中的成员名必须属于后缀表达式中提到的那个结构或联合；不过，书中的一个注承认这条规则没有被严格执行。较新的编译器和 ANSI 都会强制执行这条规则。

## A.7.3.4 Postfix Incrementation

A postfix expression followed by a ++ or -- operator is a postfix expression. The value of the expression is the value of the operand. After the value is noted, the operand is incremented ++ or decremented -- by 1. The operand must be an lvalue; see the discussion of additive operators (Par.A.7.7) and assignment (Par.A.7.17) for further constraints on the operand and details of the operation. The result is not an lvalue. 
后缀表达式后跟 ++ 或 -- 运算符，构成一个后缀表达式。表达式的值就是操作数的值。在记下该值之后，操作数被 ++ 增 1 或被 -- 减 1。操作数必须是一个左值；关于操作数的进一步限制和操作的细节，见加法运算符（Par.A.7.7）和赋值（Par.A.7.17）的讨论。结果不是左值。

## A.7.4 Unary Operators

```txt
unary-expression:
    postfix-expression
    ++ unary-expression
    -- unary-expression
    unary-operator cast-expression
    sizeof unary-expression
    sizeof ( type-name )

unary-operator: one of
& * + - ~ ! 
```

Expressions with unary operators group right-to-left. 
带有一元运算符的表达式从右向左组合。

## A.7.4.1 Prefix Incrementation Operators

A unary expression followed by a ++ or -- operator is a unary expression. The operand is incremented ++ or decremented -- by 1. The value of the expression is the value after the incrementation (decrementation). The operand must be an lvalue; see the discussion of additive operators (Par.A.7.7) and assignment (Par.A.7.17) for further constraints on the operands and details of the operation. The result is not an lvalue. 
一元表达式前跟 ++ 或 -- 运算符，构成一个一元表达式。操作数被 ++ 增 1 或被 -- 减 1。表达式的值是增加（减少）之后的值。操作数必须是一个左值；关于操作数的进一步限制和操作的细节，见加法运算符（Par.A.7.7）和赋值（Par.A.7.17）的讨论。结果不是左值。

## A.7.4.2 Address Operator

The unary operator & takes the address of its operand. The operand must be an lvalue referring neither to a bit-field nor to an object declared as register, or must be of function type. The result is a pointer to the object or function referred to by the lvalue. If the type of the operand is T, the type of the result is ``pointer to T.'' 
一元运算符 & 取其操作数的地址。操作数必须是既不指代位字段也不指代声明为 register 的对象的左值，或者必须是函数类型。结果是指向该左值所指对象或函数的指针。如果操作数的类型是 T，则结果的类型是"指向 T 的指针"。

## A.7.4.3 Indirection Operator

The unary * operator denotes indirection, and returns the object or function to which its operand points. It is an lvalue if the operand is a pointer to an object of arithmetic, structure, union, or pointer type. If the type of the expression is ``pointer to T,'' the type of the result is T. 
一元 * 运算符表示间接（indirection），返回其操作数所指向的对象或函数。如果操作数是指向算术类型、结构、联合或指针类型对象的指针，它就是一个左值。如果表达式的类型是"指向 T 的指针"，则结果的类型是 T。

## A.7.4.4 Unary Plus Operator

The operand of the unary + operator must have arithmetic type, and the result is the value of the operand. An integral operand undergoes integral promotion. The type of the result is the type of the promoted operand. 
一元 + 运算符的操作数必须具有算术类型，结果是操作数的值。整数类型的操作数要经过整型提升。结果的类型是提升后操作数的类型。

The unary + is new with the ANSI standard. It was added for symmetry with the unary -. 
一元 + 是 ANSI 标准新增的。增加它是为了与一元 - 保持对称。

## A.7.4.5 Unary Minus Operator

The operand of the unary - operator must have arithmetic type, and the result is the negative of its operand. An integral operand undergoes integral promotion. The negative of an unsigned quantity is computed by subtracting the promoted value from the largest value of the promoted type and adding one; but negative zero is zero. The type of the result is the type of the promoted operand. 
一元 - 运算符的操作数必须具有算术类型，结果是其操作数的负值。整数类型的操作数要经过整型提升。无符号量的负值通过从提升后类型的最大值中减去提升后的值再加 1 来计算；但负零就是零。结果的类型是提升后操作数的类型。

## A.7.4.6 One's Complement Operator

The operand of the ~ operator must have integral type, and the result is the one's complement of its operand. The integral promotions are performed. If the operand is unsigned, the result is computed by subtracting the value from the largest value of the promoted type. If the operand is signed, the result is computed by converting the promoted operand to the corresponding unsigned type, applying ~, and converting back to the signed type. The type of the result is the type of the promoted operand. 
~ 运算符的操作数必须具有整数类型，结果是其操作数的反码（one's complement）。先执行整型提升。如果操作数是无符号的，结果通过从提升后类型的最大值中减去该值来计算。如果操作数是有符号的，结果通过把提升后的操作数转换为对应的无符号类型、应用 ~、再转换回有符号类型来计算。结果的类型是提升后操作数的类型。

## A.7.4.7 Logical Negation Operator

The operand of the ! operator must have arithmetic type or be a pointer, and the result is 1 if the value of its operand compares equal to 0, and 0 otherwise. The type of the result is int. 
! 运算符的操作数必须具有算术类型或者是一个指针，如果其操作数的值等于 0，结果为 1，否则为 0。结果的类型是 int。

## A.7.4.8 Sizeof Operator

The sizeof operator yields the number of bytes required to store an object of the type of its operand. The operand is either an expression, which is not evaluated, or a parenthesized type name. When sizeof is applied to a char, the result is 1; when applied to an array, the result is the total number of bytes in the array. When applied to a structure or union, the result is the number of bytes in the object, including any padding required to make the object tile an array: the size of an array of n elements is n times the size of one element. The operator may not be applied to an operand of function type, or of incomplete type, or to a bit-field. The result is an unsigned integral constant; the particular type is implementation-defined. The standard header <stddef.h> (See appendix B) defines this type as size_t. 
sizeof 运算符给出存储一个其操作数类型的对象所需的字节数。操作数可以是一个表达式（不求值），或者是一个带括号的类型名。当 sizeof 作用于 char 时，结果是 1；作用于数组时，结果是数组中的总字节数。作用于结构或联合时，结果是对象中的字节数，包括使对象能平铺成数组所需的任何填充：n 个元素的数组的大小是单个元素大小的 n 倍。该运算符不能作用于函数类型的操作数、不完整类型的操作数或位字段。结果是一个无符号整数常量；具体类型由实现定义。标准头文件 <stddef.h>（见附录 B）把这个类型定义为 size_t。

## A.7.5 Casts

A unary expression preceded by the parenthesized name of a type causes conversion of the value of the expression to the named type. 
一元表达式前面加上带括号的类型名，会使表达式的值被转换为指定的类型。

cast-expression: 

unary expression 

(type-name) cast-expression 

This construction is called a cast. The names are described in Par.A.8.8. The effects of conversions are described in Par.A.6. An expression with a cast is not an lvalue. 
这种构造称为强制转换（cast）。类型名在 Par.A.8.8 中描述。转换的效果在 Par.A.6 中描述。带强制转换的表达式不是左值。

## A.7.6 Multiplicative Operators

The multiplicative operators *, /, and % group left-to-right. 
乘法运算符 `*`、`/` 和 `%` 从左向右组合。

multiplicative-expression: 

multiplicative-expression * cast-expression 

multiplicative-expression / cast-expression 

multiplicative-expression % cast-expression 

The operands of * and / must have arithmetic type; the operands of % must have integral type. The usual arithmetic conversions are performed on the operands, and predict the type of the result. 
`*` 和 `/` 的操作数必须为算术类型；`%` 的操作数必须为整型。对操作数执行常规算术转换，并预测结果的类型。

The binary * operator denotes multiplication. 
二元运算符 `*` 表示乘法。

The binary / operator yields the quotient, and the % operator the remainder, of the division of the first operand by the second; if the second operand is 0, the result is undefined. Otherwise, it is always true that (a/b)*b + a%b is equal to a. If both operands are non-negative, then the remainder is non-negative and smaller than the divisor, if not, it is guaranteed only that the absolute value of the remainder is smaller than the absolute value of the divisor. 
二元运算符 `/` 产生第一个操作数除以第二个操作数的商，`%` 运算符产生余数；如果第二个操作数为 0，则结果未定义。否则，`(a/b)*b + a%b` 等于 `a` 这一关系恒成立。如果两个操作数都是非负的，则余数非负且小于除数；否则，只能保证余数的绝对值小于除数的绝对值。

## A.7.7 Additive Operators

The additive operators + and - group left-to-right. If the operands have arithmetic type, the usual arithmetic conversions are performed. There are some additional type possibilities for each operator. 
加法运算符 `+` 和 `-` 从左向右组合。如果操作数为算术类型，则执行常规算术转换。每个运算符还有一些额外的类型可能性。

additive-expression: 

multiplicative-expression 

additive-expression + multiplicative-expression 

additive-expression - multiplicative-expression 

The result of the + operator is the sum of the operands. A pointer to an object in an array and a value of any integral type may be added. The latter is converted to an address offset by multiplying it by the size of the object to which the pointer points. The sum is a pointer of the same type as the original pointer, and points to another object in the same array, appropriately offset from the original object. Thus if P is a pointer to an object in an array, the expression P+1 is a pointer to the next object in the array. If the sum pointer points outside the bounds of the array, except at the first location beyond the high end, the result is undefined. 
运算符 `+` 的结果是操作数之和。指向数组中对象的指针可以与任何整型的值相加。整型值通过乘以指针所指对象的尺寸被转换为地址偏移量。和是指针，类型与原指针相同，指向同一数组中另一个对象，与原对象偏移适当的距离。因此，如果 `P` 是指向数组中某对象的指针，则表达式 `P+1` 是指向数组中下一个对象的指针。如果和指针超出了数组的边界——除了指向数组高端之外的第一个位置——则结果未定义。

The provision for pointers just beyond the end of an array is new. It legitimizes a common idiom for looping over the elements of an array. 
允许指针刚好越过数组末尾的规定是新增的。它使一种遍历数组元素的常用惯用法合法化。

The result of the - operator is the difference of the operands. A value of any integral type may be subtracted from a pointer, and then the same conversions and conditions as for addition apply. 
运算符 `-` 的结果是操作数之差。任何整型的值都可以从指针中减去，然后适用与加法相同的转换和条件。

If two pointers to objects of the same type are subtracted, the result is a signed integral value representing the displacement between the pointed-to objects; pointers to successive objects differ by 1. The type of the result is defined as ptrdiff_t in the standard header <stddef.h>. The value is undefined unless the pointers point to objects within the same array; however, if P points to the last member of an array, then (P+1)-P has value 1. 
两个指向同类型对象的指针相减，结果是一个带符号整数值，表示被指对象之间的位移量；指向相邻对象的指针相差 1。结果的类型在标准头文件 `<stddef.h>` 中定义为 `ptrdiff_t`。除非两个指针指向同一数组中的对象，否则该值未定义；但是，如果 `P` 指向数组的最后一个成员，则 `(P+1)-P` 的值为 1。

## A.7.8 Shift Operators

The shift operators << and >> group left-to-right. For both operators, each operand must be integral, and is subject to integral the promotions. The type of the result is that of the promoted left operand. The result is undefined if the right operand is negative, or greater than or equal to the number of bits in the left expression's type. 
移位运算符 `<<` 和 `>>` 从左向右组合。对两个运算符而言，每个操作数都必须为整型，并进行整型提升。结果的类型是提升后左操作数的类型。如果右操作数为负，或者大于等于左表达式类型的位数，则结果未定义。

shift-expression: 

additive-expression 

shift-expression << additive-expression 

shift-expression >> additive-expression 

The value of E1<<E2 is E1 (interpreted as a bit pattern) left-shifted E2 bits; in the absence of overflow, this is equivalent to multiplication by 2<sup>E2</sup>. The value of E1>>E2 is E1 right-shifted 
`E1<<E2` 的值是 `E1`（解释为位模式）左移 `E2` 位；在没有溢出的情况下，这等价于乘以 2^E2。`E1>>E2` 的值是 `E1` 右移

E2 bit positions. The right shift is equivalent to division by $2 ^ { \mathrm { E } 2 }$ if E1 is unsigned or it has a non-negative value; otherwise the result is implementation-defined. 
`E2` 个位。如果 `E1` 是无符号的或其值非负，则右移等价于除以 2^E2；否则结果是实现定义的。

## A.7.9 Relational Operators

The relational operators group left-to-right, but this fact is not useful; $a { < } b { < } c$ is parsed as (a<b)<c, and evaluates to either 0 or 1. 
关系运算符从左向右组合，但这一事实并无用处；`a<b<c` 被解析为 `(a<b)<c`，其求值结果为 0 或 1。

relational-expression: 

shift-expression 

$$
r e l a t i o n a l - e x p r e s s i o n <   s h i f t - e x p r e s s i o n
$$

relational-expression > shift-expression 

$$
\text { relational - expression } <   = \text { shift - expression }
$$

$$
r e l a t i o n a l - e x p r e s s i o n > = s h i f t - e x p r e s s i o n
$$

The operators < (less), > (greater), <= (less or equal) and >= (greater or equal) all yield 0 if the specified relation is false and 1 if it is true. The type of the result is int. The usual arithmetic conversions are performed on arithmetic operands. Pointers to objects of the same type (ignoring any qualifiers) may be compared; the result depends on the relative locations in the address space of the pointed-to objects. Pointer comparison is defined only for parts of the same object; if two pointers point to the same simple object, they compare equal; if the pointers are to members of the same structure, pointers to objects declared later in the structure compare higher; if the pointers refer to members of an array, the comparison is equivalent to comparison of the the corresponding subscripts. If P points to the last member of an array, then P+1 compares higher than P, even though P+1 points outside the array. Otherwise, pointer comparison is undefined. 
运算符 `<`（小于）、`>`（大于）、`<=`（小于或等于）和 `>=`（大于或等于）在指定关系为假时都产生 0，为真时产生 1。结果的类型是 `int`。对算术操作数执行常规算术转换。指向同类型对象（忽略任何限定符）的指针可以比较；结果取决于被指对象在地址空间中的相对位置。指针比较仅对同一对象的各部分有定义；如果两个指针指向同一个简单对象，则它们比较相等；如果指针指向同一结构的成员，则指向结构中较后声明对象的指针比较结果较大；如果指针引用的是数组的成员，则比较等价于对应下标的比较。如果 `P` 指向数组的最后一个成员，则 `P+1` 比 `P` 大，即使 `P+1` 指向数组之外。否则，指针比较未定义。

These rules slightly liberalize the restrictions stated in the first edition, by permitting comparison of pointers to different members of a structure or union. They also legalize comparison with a pointer just off the end of an array. 
这些规则允许比较指向结构或联合不同成员的指针，从而略微放宽了第一版中陈述的限制。它们还将与刚好越过数组末尾的指针的比较合法化。

## A.7.10 Equality Operators

equality-expression: 

relational-expression 

equality-expression == relational-expression 

$$
e q u a l i t y - e x p r e s s i o n! = r e l a t i o n a l - e x p r e s s i o n
$$

The == (equal to) and the != (not equal to) operators are analogous to the relational operators except for their lower precedence. (Thus a<b == c<d is 1 whenever $a < b$ and $\ b { \mathrm { C } } < \ b { \mathrm { d } }$ have the same truth-value.) 
运算符 `==`（等于）和 `!=`（不等于）类似于关系运算符，只是优先级更低。（因此，只要 `a<b` 和 `c<d` 的真值相同，`a<b == c<d` 就为 1。）

The equality operators follow the same rules as the relational operators, but permit additional possibilities: a pointer may be compared to a constant integral expression with value 0, or to a pointer to void. See $\mathrm { P a r . A . 6 . 6 }$ 
相等运算符遵循与关系运算符相同的规则，但允许额外的可能性：指针可以与值为 0 的整型常量表达式比较，或与指向 `void` 的指针比较。参见 Par.A.6.6。

## A.7.11 Bitwise AND Operator

AND-expression: 

equality-expression 

AND-expression & equality-expression 

The usual arithmetic conversions are performed; the result is the bitwise AND function of the operands. The operator applies only to integral operands. 
执行常规算术转换；结果是操作数的按位与（bitwise AND）函数。该运算符仅适用于整型操作数。

## A.7.12 Bitwise Exclusive OR Operator

```txt
exclusive-OR-expression:
AND-expression
exclusive-OR-expression ^ AND-expression 
```

The usual arithmetic conversions are performed; the result is the bitwise exclusive OR function of the operands. The operator applies only to integral operands. 
执行常规算术转换；结果是操作数的按位异或（bitwise exclusive OR）函数。该运算符仅适用于整型操作数。

## A.7.13 Bitwise Inclusive OR Operator

```txt
inclusive-OR-expression:
exclusive-OR-expression
inclusive-OR-expression | exclusive-OR-expression 
```

The usual arithmetic conversions are performed; the result is the bitwise inclusive OR function of the operands. The operator applies only to integral operands. 
执行常规算术转换；结果是操作数的按位同或（bitwise inclusive OR）函数。该运算符仅适用于整型操作数。

## A.7.14 Logical AND Operator

```txt
logical-AND-expression:
inclusive-OR-expression
logical-AND-expression && inclusive-OR-expression 
```

The && operator groups left-to-right. It returns 1 if both its operands compare unequal to zero, 0 otherwise. Unlike &, && guarantees left-to-right evaluation: the first operand is evaluated, including all side effects; if it is equal to 0, the value of the expression is 0. Otherwise, the right operand is evaluated, and if it is equal to 0, the expression's value is 0, otherwise 1. 
运算符 `&&` 从左向右组合。如果它的两个操作数都不等于零，则返回 1，否则返回 0。与 `&` 不同，`&&` 保证从左到右求值：先求第一个操作数，包括所有副作用；如果它等于 0，则表达式的值为 0。否则求右操作数，如果它等于 0，则表达式的值为 0，否则为 1。

The operands need not have the same type, but each must have arithmetic type or be a pointer. The result is int. 
操作数不必具有相同类型，但每个都必须为算术类型或指针。结果是 `int`。

## A.7.15 Logical OR Operator

```txt
logical-OR-expression:
logical-AND-expression
logical-OR-expression || logical-AND-expression 
```

The || operator groups left-to-right. It returns 1 if either of its operands compare unequal to zero, and 0 otherwise. Unlike |, || guarantees left-to-right evaluation: the first operand is evaluated, including all side effects; if it is unequal to 0, the value of the expression is 1. Otherwise, the right operand is evaluated, and if it is unequal to 0, the expression's value is 1, otherwise 0. 
运算符 `||` 从左向右组合。如果它的任一操作数不等于零，则返回 1，否则返回 0。与 `|` 不同，`||` 保证从左到右求值：先求第一个操作数，包括所有副作用；如果它不等于 0，则表达式的值为 1。否则求右操作数，如果它不等于 0，则表达式的值为 1，否则为 0。

The operands need not have the same type, but each must have arithmetic type or be a pointer. The result is int. 
操作数不必具有相同类型，但每个都必须为算术类型或指针。结果是 `int`。

## A.7.16 Conditional Operator

conditional-expression: 

logical-OR-expression 

logical-OR-expression ? expression : conditional-expression 

The first expression is evaluated, including all side effects; if it compares unequal to 0, the result is the value of the second expression, otherwise that of the third expression. Only one of the second and third operands is evaluated. If the second and third operands are arithmetic, the usual arithmetic conversions are performed to bring them to a common type, and that type is the type of the result. If both are void, or structures or unions of the same type, or pointers to objects of the same type, the result has the common type. If one is a pointer and the other the constant 0, the 0 is converted to the pointer type, and the result has that type. If one is a pointer to void and the other is another pointer, the other pointer is converted to a pointer to void, and that is the type of the result. 
先求第一个表达式的值，包括所有副作用；如果它不等于 0，结果是第二个表达式的值，否则是第三个表达式的值。第二、第三个操作数只求值其一。如果第二、第三个操作数都是算术类型，则执行常规算术转换将它们转换为公共类型，该类型就是结果的类型。如果两者都是 `void`，或者是同类型的结构或联合，或者是指向同类型对象的指针，则结果具有公共类型。如果一个是指针、另一个是常量 0，则 0 被转换为指针类型，结果具有该类型。如果一个是指向 `void` 的指针、另一个是其他指针，则另一个指针被转换为指向 `void` 的指针，这就是结果的类型。

In the type comparison for pointers, any type qualifiers (Par.A.8.2) in the type to which the pointer points are insignificant, but the result type inherits qualifiers from both arms of the conditional. 
在指针的类型比较中，指针所指类型中的任何类型限定符（Par.A.8.2）都是无关紧要的，但结果的类型会从条件的两个分支继承限定符。

## A.7.17 Assignment Expressions

There are several assignment operators; all group right-to-left. 

assignment-expression: 

conditional-expression 

unary-expression assignment-operator assignment-expression 

assignment-operator: one of 

= *= /= %= += -= <<= >>= &= ^= |= 

All require an lvalue as left operand, and the lvalue must be modifiable: it must not be an array, and must not have an incomplete type, or be a function. Also, its type must not be qualified with const; if it is a structure or union, it must not have any member or, recursively, submember qualified with const. The type of an assignment expression is that of its left operand, and the value is the value stored in the left operand after the assignment has taken place. 
所有赋值运算符都要求一个左值作为左操作数，且该左值必须是可修改的：它不能是数组，不能具有不完整类型，也不能是函数。此外，其类型不能用 `const` 限定；如果是结构或联合，则不能有任何用 `const` 限定的成员或（递归地）子成员。赋值表达式的类型是其左操作数的类型，值是赋值发生后存储在左操作数中的值。

In the simple assignment with =, the value of the expression replaces that of the object referred to by the lvalue. One of the following must be true: both operands have arithmetic type, in which case the right operand is converted to the type of the left by the assignment; or both operands are structures or unions of the same type; or one operand is a pointer and the other is a pointer to void, or the left operand is a pointer and the right operand is a constant expression with value 0; or both operands are pointers to functions or objects whose types are the same except for the possible absence of const or volatile in the right operand. 
在使用 `=` 的简单赋值中，表达式的值替换左值所指对象的值。以下条件之一必须成立：两个操作数都具有算术类型，此时右操作数通过赋值被转换为左操作数的类型；或者两个操作数都是同类型的结构或联合；或者一个操作数是指针、另一个是指向 `void` 的指针，或者左操作数是指针而右操作数是值为 0 的常量表达式；或者两个操作数都是指向函数或对象的指针，且其类型相同（右操作数的类型可以缺少 `const` 或 `volatile`）。

An expression of the form E1 op= E2 is equivalent to E1 = E1 op (E2) except that E1 is evaluated only once. 
形如 `E1 op= E2` 的表达式等价于 `E1 = E1 op (E2)`，只是 `E1` 只求值一次。

## A.7.18 Comma Operator

expression: 

assignment-expression 

expression , assignment-expression 

A pair of expressions separated by a comma is evaluated left-to-right, and the value of the left expression is discarded. The type and value of the result are the type and value of the right operand. All side effects from the evaluation of the left-operand are completed before beginning the evaluation of the right operand. In contexts where comma is given a special meaning, for example in lists of function arguments (Par.A.7.3.2) and lists of initializers (Par.A.8.7), the required syntactic unit is an assignment expression, so the comma operator appears only in a parenthetical grouping, for example, 
用逗号分隔的一对表达式从左到右求值，左表达式的值被丢弃。结果的类型和值是右操作数的类型和值。左操作数求值产生的所有副作用都在开始求值右操作数之前完成。在逗号被赋予特殊含义的上下文中，例如在函数实参列表（Par.A.7.3.2）和初始化列表（Par.A.8.7）中，所需的语法单元是赋值表达式，因此逗号运算符只能出现在带括号的分组中，例如，

f(a, (t=3, t+2), c) 

有三个实参，其中第二个的值为 5。

## A.7.19 Constant Expressions

Syntactically, a constant expression is an expression restricted to a subset of operators: 
在语法上，常量表达式（constant expression）是限制在运算符子集上的表达式：

constant-expression: 

conditional-expression 

Expressions that evaluate to a constant are required in several contexts: after case, as array bounds and bit-field lengths, as the value of an enumeration constant, in initializers, and in certain preprocessor expressions. 
在若干上下文中要求能求值为常量的表达式：`case` 之后、作为数组边界和位域长度、作为枚举常量的值、在初始化程序中，以及在某些预处理表达式中。

Constant expressions may not contain assignments, increment or decrement operators, function calls, or comma operators; except in an operand of sizeof. If the constant expression is required to be integral, its operands must consist of integer, enumeration, character, and floating constants; casts must specify an integral type, and any floating constants must be cast to integer. This necessarily rules out arrays, indirection, address-of, and structure member operations. (However, any operand is permitted for sizeof.) 
常量表达式不能包含赋值、自增或自减运算符、函数调用或逗号运算符；`sizeof` 的操作数除外。如果要求常量表达式为整型，则其操作数必须由整数、枚举、字符和浮点常量组成；强制转换必须指定整型，且任何浮点常量都必须强制转换为整数。这必然排除了数组、间接、取地址和结构成员操作。（不过，`sizeof` 允许任何操作数。）

More latitude is permitted for the constant expressions of initializers; the operands may be any type of constant, and the unary & operator may be applied to external or static objects, and to external and static arrays subscripted with a constant expression. The unary & operator can also be applied implicitly by appearance of unsubscripted arrays and functions. Initializers must evaluate either to a constant or to the address of a previously declared external or static object plus or minus a constant. 
初始化程序中的常量表达式允许更大的自由度；操作数可以是任何类型的常量，一元 `&` 运算符可以应用于外部或静态对象，以及用常量表达式作下标的外部和静态数组。一元 `&` 运算符也可以通过不带下标的数组和函数的出现而隐式应用。初始化程序必须求值为常量，或者求值为先前声明的外部或静态对象的地址加或减一个常量。

Less latitude is allowed for the integral constant expressions after #if; sizeof expressions, enumeration constants, and casts are not permitted. See Par.A.12.5. 
`#if` 之后的整型常量表达式允许的自由度更小；不允许 `sizeof` 表达式、枚举常量和强制转换。参见 Par.A.12.5。

## A.8 Declarations

Declarations specify the interpretation given to each identifier; they do not necessarily reserve storage associated with the identifier. Declarations that reserve storage are called definitions. Declarations have the form 
声明（declaration）指定赋予每个标识符的解释；它们不一定保留与标识符相关的存储。保留存储的声明称为定义（definition）。声明的形式为

declaration: 

declaration-specifiers init-declarator-list<sub>opt</sub>; 

The declarators in the init-declarator list contain the identifiers being declared; the declaration-specifiers consist of a sequence of type and storage class specifiers. 
init-declarator-list 中的声明符包含被声明的标识符；declaration-specifiers 由类型和存储类说明符的序列组成。

declaration-specifiers:
    storage-class-specifier declaration-specifiers $_{opt}$ type-specifier declaration-specifiers $_{opt}$ type-qualifier declaration-specifiers $_{opt}$ init-declarator-list:
    init-declarator
    init-declarator-list, init-declarator

init-declarator:
    declarator
    declarator = initializer 

Declarators will be discussed later (Par.A.8.5); they contain the names being declared. A declaration must have at least one declarator, or its type specifier must declare a structure tag, a union tag, or the members of an enumeration; empty declarations are not permitted. 
声明符将在后面讨论（Par.A.8.5）；它们包含被声明的名字。声明必须至少有一个声明符，或者其类型说明符必须声明一个结构标签、联合标签或枚举成员；不允许空声明。

## A.8.1 Storage Class Specifiers

The storage class specifiers are: 
存储类说明符是：

auto  register  static  extern  typedef

The meaning of the storage classes were discussed in Par.A.4.4. 
存储类的含义在 Par.A.4.4 中讨论过。

The auto and register specifiers give the declared objects automatic storage class, and may be used only within functions. Such declarations also serve as definitions and cause storage to be reserved. A register declaration is equivalent to an auto declaration, but hints that the declared objects will be accessed frequently. Only a few objects are actually placed into registers, and only certain types are eligible; the restrictions are implementation-dependent. However, if an object is declared register, the unary & operator may not be applied to it, explicitly or implicitly. 
说明符 `auto` 和 `register` 给被声明的对象自动存储类，并且只能在函数内使用。这类声明也充当定义并导致保留存储。`register` 声明等价于 `auto` 声明，但暗示被声明的对象将被频繁访问。实际放入寄存器的对象只有少数，且只有某些类型才有资格；限制与实现相关。但是，如果对象声明为 `register`，则一元 `&` 运算符不能显式或隐式地作用于它。

The rule that it is illegal to calculate the address of an object declared register, but actually taken to be auto, is new. 
对声明为 `register` 但实际被当作 `auto` 处理的对象计算地址是非法的，这一规则是新增的。

The static specifier gives the declared objects static storage class, and may be used either inside or outside functions. Inside a function, this specifier causes storage to be allocated, and serves as a definition; for its effect outside a function, see Par.A.11.2 
说明符 `static` 给被声明的对象静态存储类，可以在函数内或函数外使用。在函数内部，该说明符导致分配存储，并充当定义；其在函数外的效果参见 Par.A.11.2。

A declaration with extern, used inside a function, specifies that the storage for the declared objects is defined elsewhere; for its effects outside a function, see Par.A.11.2. 
在函数内部使用带 `extern` 的声明，指明被声明对象的存储在别处定义；其在函数外的效果参见 Par.A.11.2。

The typedef specifier does not reserve storage and is called a storage class specifier only for syntactic convenience; it is discussed in Par.A.8.9. 
说明符 `typedef` 不保留存储，只是为了语法方便才称为存储类说明符；它在 Par.A.8.9 中讨论。

At most one storage class specifier may be given in a declaration. If none is given, these rules are used: objects declared inside a function are taken to be auto; functions declared within a function are taken to be extern; objects and functions declared outside a function are taken to be static, with external linkage. See Pars. A.10-A.11 
一个声明中最多可以给出一个存储类说明符。如果都没有给出，则使用这些规则：在函数内部声明的对象被视为 `auto`；在函数内部声明的函数被视为 `extern`；在函数外部声明的对象和函数被视为 `static`，具有外部链接。参见 Par.A.10~A.11。

## A.8.2 Type Specifiers

The type-specifiers are: 
类型说明符是：

```txt
type specifier:
void
char
short
int
long
float
double
signed
unsigned
struct-or-union-specifier
enum-specifier
typedef-name 
```

At most one of the words long or short may be specified together with int; the meaning is the same if int is not mentioned. The word long may be specified together with double. At most one of signed or unsigned may be specified together with int or any of its short or long varieties, or with char. Either may appear alone in which case int is understood. The signed specifier is useful for forcing char objects to carry a sign; it is permissible but redundant with other integral types. 
`long` 或 `short` 至多一个可以与 `int` 一起指定；如果不提 `int`，含义相同。单词 `long` 可以与 `double` 一起指定。`signed` 或 `unsigned` 至多一个可以与 `int`、其 `short` 或 `long` 变体，或与 `char` 一起指定。两者都可以单独出现，此时理解为 `int`。说明符 `signed` 可用于强制 `char` 对象携带符号；对其他整型类型来说是允许的但冗余。

Otherwise, at most one type-specifier may be given in a declaration. If the type-specifier is missing from a declaration, it is taken to be int. 
此外，一个声明中至多可以给出一个类型说明符。如果声明中缺少类型说明符，则被视为 `int`。

Types may also be qualified, to indicate special properties of the objects being declared. 
类型还可以被限定，以表明被声明对象的特殊性质。

```txt
type-qualifier:
const
volatile 
```

Type qualifiers may appear with any type specifier. A const object may be initialized, but not thereafter assigned to. There are no implementation-dependent semantics for volatile objects. 
类型限定符可以与任何类型说明符一起出现。`const` 对象可以初始化，但此后不能再赋值。`volatile` 对象没有与实现相关的语义。

The const and volatile properties are new with the ANSI standard. The purpose of const is to announce objects that may be placed in read-only memory, and perhaps to increase opportunities for optimization. The purpose of volatile is to force an implementation to suppress optimization that could otherwise occur. For example, for a machine with memory-mapped input/output, a pointer to a device register might be declared as a pointer to volatile, in order to prevent the compiler from removing apparently redundant references through the pointer. Except that it should diagnose explicit attempts to change const objects, a compiler may ignore these qualifiers. 
`const` 和 `volatile` 特性是 ANSI 标准新增的。`const` 的目的是声明可能被放在只读存储器中的对象，或许还能增加优化的机会。`volatile` 的目的是强制实现抑制原本可能发生的优化。例如，对于具有内存映射输入/输出的机器，指向设备寄存器的指针可能被声明为指向 `volatile` 的指针，以防止编译器删除通过该指针的表面上冗余的引用。除了应该诊断对 `const` 对象的显式修改企图之外，编译器可以忽略这些限定符。

## A.8.3 Structure and Union Declarations

A structure is an object consisting of a sequence of named members of various types. A union is an object that contains, at different times, any of several members of various types. Structure and union specifiers have the same form. 
结构（structure）是由一系列不同类型的命名成员组成的对象。联合（union）是在不同时间包含若干不同类型成员中任一成员的对象。结构和联合说明符具有相同的形式。

struct-or-union-specifier: 

struct-or-union identifier<sub>opt</sub>{ struct-declaration-list } 

struct-or-union identifier 

struct-or-union: 

struct 

union 

A struct-declaration-list is a sequence of declarations for the members of the structure or union: 

struct-declaration-list: 

struct declaration 

struct-declaration-list struct declaration 

struct-declaration: specifier-qualifier-list struct-declarator-list; 

specifier-qualifier-list: 

type-specifier specifier-qualifier-list<sub>opt</sub> 

type-qualifier specifier-qualifier-list<sub>opt</sub> 

struct-declarator-list: 

struct-declarator 

struct-declarator-list , struct-declarator 

Usually, a struct-declarator is just a declarator for a member of a structure or union. A structure member may also consist of a specified number of bits. Such a member is also called a bit-field; its length is set off from the declarator for the field name by a colon. 
通常，struct-declarator 就是结构或联合成员的声明符。结构成员还可以由指定数量的位组成。这样的成员也称为位域（bit-field）；其长度用冒号与域名声明符隔开。

struct-declarator: 

declarator declarator<sub>opt</sub> : constant-expression 

A type specifier of the form 
形如

struct-or-union identifier { struct-declaration-list } 

的类型说明符 declares the identifier to be the tag of the structure or union specified by the list. A subsequent declaration in the same or an inner scope may refer to the same type by using the tag in a specifier without the list: 
将标识符声明为由该列表指定的结构或联合的标签。同一作用域或内层作用域中的后续声明可以在不带列表的说明符中使用该标签来引用同一类型：

struct-or-union identifier 

If a specifier with a tag but without a list appears when the tag is not declared, an incomplete type is specified. Objects with an incomplete structure or union type may be mentioned in contexts where their size is not needed, for example in declarations (not definitions), for specifying a pointer, or for creating a typedef, but not otherwise. The type becomes complete on occurrence of a subsequent specifier with that tag, and containing a declaration list. Even in specifiers with a list, the structure or union type being declared is incomplete within the list, and becomes complete only at the } terminating the specifier. 
如果带有标签但不带列表的说明符在该标签尚未声明时出现，则指定的是不完整类型（incomplete type）。具有不完整结构或联合类型的对象可以在不需要其尺寸的上下文中提及，例如在声明（而非定义）中、在指定指针时，或在创建 typedef 时，但不能用于其他场合。当随后出现带有该标签且包含声明列表的说明符时，类型变为完整。即使在带列表的说明符中，被声明的结构或联合类型在列表内也是不完整的，只在终止该说明符的 `}` 处才变为完整。

A structure may not contain a member of incomplete type. Therefore, it is impossible to declare a structure or union containing an instance of itself. However, besides giving a name to the structure or union type, tags allow definition of self-referential structures; a structure or union may contain a pointer to an instance of itself, because pointers to incomplete types may be declared. 
结构不能包含不完整类型的成员。因此，不可能声明包含自身实例的结构或联合。但是，除了给结构或联合类型命名之外，标签还允许定义自引用结构（self-referential structures）；结构或联合可以包含指向自身实例的指针，因为可以声明指向不完整类型的指针。

A very special rule applies to declarations of the form 
一个非常特殊的规则适用于形如

struct-or-union identifier; 

的声明——它声明一个结构或联合，但没有声明列表也没有声明符。即使该标识符是在外层作用域（Par.A.11.1）中已声明的结构或联合标签，该声明也会使该标识符成为当前作用域中一个新的、类型不完整的结构或联合的标签。

This recondite is new with ANSI. It is intended to deal with mutually-recursive structures declared in an inner scope, but whose tags might already be declared in the outer scope. 
这一晦涩的规则是 ANSI 新增的。它旨在处理声明于内层作用域但其标签可能已在外层作用域中声明的相互递归结构。

A structure or union specifier with a list but no tag creates a unique type; it can be referred to directly only in the declaration of which it is a part. 
带列表但不带标签的结构或联合说明符创建一个唯一类型；只能在它作为其一部分的声明中直接引用它。

The names of members and tags do not conflict with each other or with ordinary variables. A member name may not appear twice in the same structure or union, but the same member name may be used in different structures or unions. 
成员名和标签名彼此不冲突，也不与普通变量冲突。一个成员名不能在同一结构或联合中出现两次，但同一成员名可以用于不同的结构或联合中。

In the first edition of this book, the names of structure and union members were not associated with their parent. However, this association became common in compilers well before the ANSI standard. 
在本书第一版中，结构和联合成员的名字与其父类型没有关联。然而，这种关联在 ANSI 标准之前很久就已在编译器中变得普遍。

A non-field member of a structure or union may have any object type. A field member (which need not have a declarator and thus may be unnamed) has type int, unsigned int, or signed int, and is interpreted as an object of integral type of the specified length in bits; whether an int field is treated as signed is implementation-dependent. Adjacent field members of structures are packed into implementation-dependent storage units in an implementation-dependent direction. When a field following another field will not fit into a partially-filled storage unit, it may be split between units, or the unit may be padded. An unnamed field with width 0 forces this padding, so that the next field will begin at the edge of the next allocation unit. 
结构或联合的非域成员可以具有任何对象类型。域成员（field member，它不必有声明符，因此可以无名）具有类型 `int`、`unsigned int` 或 `signed int`，并被解释为指定比特长度的整型类型对象；`int` 域是否按带符号处理是与实现相关的。结构的相邻域成员按与实现相关的方向打包进与实现相关的存储单元。当一个域装进前面已被部分填充的存储单元放不下时，它可以在单元间拆分，或者对该单元填充。宽度为 0 的无名域强制这种填充，使下一个域从下一个分配单元的边缘开始。

The ANSI standard makes fields even more implementation-dependent than did the first edition. It is advisable to read the language rules for storing bit-fields as ``implementation-dependent'' without qualification. Structures with bit-fields may be used as a portable way of attempting to reduce the storage required for a structure (with the probable cost of increasing the instruction space, and time, needed to access the fields), or as a non-portable way to describe a storage layout known at the bitlevel. In the second case, it is necessary to understand the rules of the local implementation. 
ANSI 标准使域比第一版更加与实现相关。建议将存储位域的语言规则毫无保留地读作"与实现相关"。带位域的结构可以用作试图减少结构所需存储的可移植方式（可能以增加访问域所需的指令空间和时间为代价），或用作描述比特级已知存储布局的不可移植方式。在后一种情况下，必须了解本地实现的规则。

The members of a structure have addresses increasing in the order of their declarations. A non-field member of a structure is aligned at an addressing boundary depending on its type; therefore, there may be unnamed holes in a structure. If a pointer to a structure is cast to the type of a pointer to its first member, the result refers to the first member. 
结构成员的地址按其声明顺序递增。结构的非域成员按取决于其类型的寻址边界对齐；因此，结构中可能存在未命名的空洞。如果将指向结构的指针强制转换为指向其第一个成员的指针类型，则结果引用第一个成员。

```txt
sp->count 
```

A union may be thought of as a structure all of whose members begin at offset 0 and whose size is sufficient to contain any of its members. At most one of the members can be stored in a union at any time. If a pointr to a union is cast to the type of a pointer to a member, the result refers to that member. 
联合可以看作是一个所有成员都从偏移 0 开始、且尺寸足以容纳其任一成员的结构。任一时刻联合中至多只能存储一个成员。如果将指向联合的指针强制转换为指向某成员的指针类型，则结果引用该成员。

A simple example of a structure declaration is 
一个简单的结构声明例子是

```txt
struct tnode {
    char tword[20];
    int count;
    struct tnode *left;
    struct tnode *right;
};
```

which contains an array of 20 characters, an integer, and two pointers to similar structures. Once this declaration has bene given, the declaration 
其中包含一个 20 字符的数组、一个整数和两个指向同类结构的指针。一旦给出了这个声明，声明

```txt
struct tnode s, *sp; 
```

declares s to be a structure of the given sort, and sp to be a pointer to a structure of the given sort. With these declarations, the expression 
将 `s` 声明为该类型的结构，`sp` 声明为指向该类型结构的指针。有了这些声明，表达式

refers to the count field of the structure to which sp points; 
指的是 sp 所指结构的 count 域；

```txt
s.left 
```

refers to the left subtree pointer of the structure s, and 
指的是结构 `s` 的左子树指针，而

```txt
s.right->tword[0] 
```

refers to the first character of the tword member of the right subtree of s. 
指的是 `s` 右子树 `tword` 成员的第一个字符。

In general, a member of a union may not be inspected unless the value of the union has been assigned using the same member. However, one special guarantee simplifies the use of unions: if a union contains several structures that share a common initial sequence, and the union currently contains one of these structures, it is permitted to refer to the common initial part of any of the contained structures. For example, the following is a legal fragment: 
一般而言，除非联合的值是使用同一成员赋值的，否则不能检查联合的成员。然而，有一条特殊保证简化了联合的使用：如果联合包含若干共享公共初始序列的结构，且联合当前包含其中一个结构，则允许引用任何所含结构的公共初始部分。例如，下面是一个合法的片段：

```txt
union {
    struct {
    int type;
    } n;
    struct {
    int type;
    int intnode;
    } ni;
    struct {
    int type;
    float floatnode;
    } nf;
} u;
...
u.nf.type = FLOAT;
u.nf.floatnode = 3.14;
...
if (u.n.type == FLOAT)
    ... sin(u.nf.floatnode) ... 
```

## A.8.4 Enumerations

Enumerations are unique types with values ranging over a set of named constants called enumerators. The form of an enumeration specifier borrows from that of structures and unions. 
枚举（enumerations）是值遍取一组命名常量（称为枚举符（enumerators））的独特类型。枚举说明符的形式借鉴了结构和联合。

enum-specifier: 

enum identifier<sub>opt</sub> { enumerator-list } 

enum identifier 

enumerator-list: 

enumerator 

enumerator-list , enumerator 

enumerator: 

identifier 

identifier = constant-expression 

The identifiers in an enumerator list are declared as constants of type int, and may appear wherever constants are required. If no enumerations with = appear, then the values of the corresponding constants begin at 0 and increase by 1 as the declaration is read from left to right. An enumerator with = gives the associated identifier the value specified; subsequent identifiers continue the progression from the assigned value. 
枚举符列表中的标识符被声明为 `int` 类型的常量，可以在任何需要常量的地方出现。如果没有带 `=` 的枚举符出现，则对应常量的值从 0 开始，随声明从左到右被读取而依次加 1。带 `=` 的枚举符给相关联的标识符指定值；后续标识符从该指定值继续递进。

Enumerator names in the same scope must all be distinct from each other and from ordinary variable names, but the values need not be distinct. 
同一作用域中的枚举符名字必须互不相同，也必须不同于普通变量名，但值不必互不相同。

The role of the identifier in the enum-specifier is analogous to that of the structure tag in a struct-specifier; it names a particular enumeration. The rules for enum-specifiers with and without tags and lists are the same as those for structure or union specifiers, except that incomplete enumeration types do not exist; the tag of an enum-specifier without an enumerator list must refer to an in-scope specifier with a list. 
enum-specifier 中标识符的作用类似于 struct-specifier 中结构标签的作用；它命名一个特定的枚举。带与不带标签和列表的 enum-specifier 的规则与结构或联合说明符的规则相同，只是不存在不完整的枚举类型；不带枚举符列表的 enum-specifier 的标签必须引用作用域内带列表的说明符。

Enumerations are new since the first edition of this book, but have been part of the language for some years. 
枚举是本书第一版之后新增的，但作为语言的一部分已有若干年。

## A.8.5 Declarators

Declarators have the syntax: 

declarator: 

pointer<sub>opt</sub> direct-declarator 

direct-declarator: 

identifier 

(declarator) 

direct-declarator [ constant-expression<sub>opt</sub> ] 

direct-declarator ( parameter-type-list ) 

direct-declarator ( identifier-list<sub>opt</sub> ) 

pointer: 

* type-qualifier-list<sub>opt</sub> 

* type-qualifier-list<sub>opt</sub> pointer 

type-qualifier-list: 

type-qualifier 

type-qualifier-list type-qualifier 

The structure of declarators resembles that of indirection, function, and array expressions; the grouping is the same. 
声明符的结构类似于间接、函数和数组表达式的结构；分组方式相同。

## A.8.6 Meaning of Declarators

A list of declarators appears after a sequence of type and storage class specifiers. Each declarator declares a unique main identifier, the one that appears as the first alternative of the production for direct-declarator. The storage class specifiers apply directly to this identifier, but its type depends on the form of its declarator. A declarator is read as an assertion that when its identifier appears in an expression of the same form as the declarator, it yields an object of the specified type. 
声明符列表出现在类型和存储类说明符的序列之后。每个声明符声明一个唯一的主标识符，即作为 direct-declarator 产生式的第一个候选出现的那个。存储类说明符直接作用于该标识符，但其类型取决于其声明符的形式。声明符可以读作一个断言：当其标识符出现在与声明符同形的表达式中时，它产生一个指定类型的对象。

Considering only the type parts of the declaration specifiers (Par. A.8.2) and a particular declarator, a declaration has the form ``T D,'' where T is a type and D is a declarator. The type attributed to the identifier in the various forms of declarator is described inductively using this notation. 
只考虑声明说明符（Par.A.8.2）的类型部分和某个特定声明符时，声明具有形式 ``T D''，其中 T 是类型，D 是声明符。各种形式声明符所赋予标识符的类型用这种记号归纳描述。

In a declaration T D where D is an unadored identifier, the type of the identifier is T. 
在声明 T D 中，如果 D 是无修饰的标识符，则该标识符的类型是 T。

In a declaration T D where D has the form 
在声明 T D 中，如果 D 具有形式

( D1 ) 

则 D1 中标识符的类型与 D 的相同。括号不改变类型，但可能改变复杂声明符的结合。

## A.8.6.1 Pointer Declarators

In a declaration T D where D has the form 
在声明 T D 中，如果 D 具有形式

* type-qualifier-list<sub>opt</sub> D1 

且声明 T D1 中标识符的类型是 ``type-modifier T''，则 D 的标识符的类型是 ``type-modifier type-qualifier-list pointer to T''。跟在 `*` 之后的限定符作用于指针本身，而不是指针所指的对象。

For example, consider the declaration 
例如，考虑声明

```txt
int *ap[]; 
```

Here, ap[] plays the role of D1; a declaration ``int ap[]'' (below) would give ap the type ``array of int,'' the type-qualifier list is empty, and the type-modifier is ``array of.'' Hence the actual declaration gives ap the type ``array to pointers to int.' 
这里，`ap[]` 充当 D1 的角色；声明 ``int ap[]''（见下文）会给 `ap` 类型 ``array of int''，类型限定符列表为空，类型修饰符是 ``array of''。因此，实际的声明给 `ap` 的类型是 ``array to pointers to int''。

As other examples, the declarations 
作为其他例子，声明

```txt
int i, *pi, *const cpi = &i;
const int ci = 3, *pci; 
```

declare an integer i and a pointer to an integer pi. The value of the constant pointer cpi may not be changed; it will always point to the same location, although the value to which it refers may be altered. The integer ci is constant, and may not be changed (though it may be initialized, as here.) The type of pci is ``pointer to const int,'' and pci itself may be changed to point to another place, but the value to which it points may not be altered by assigning through pci. 
声明了一个整数 `i` 和一个指向整数的指针 `pi`。常量指针 `cpi` 的值不可改变；它将始终指向同一位置，尽管它所指的值可以被改变。整数 `ci` 是常量，不可改变（不过可以像这里这样初始化）。`pci` 的类型是 ``pointer to const int''，`pci` 本身可以改变为指向别处，但它所指的值不能通过 `pci` 赋值来改变。

## A.8.6.2 Array Declarators

In a declaration T D where D has the form 
在声明 T D 中，如果 D 具有形式

D1 [constant-expression $_{opt}$ ] 

且声明 T D1 中标识符的类型是 ``type-modifier T''，则 D 的标识符的类型是 ``type-modifier array of T''。如果存在 constant-expression，它必须具有整型且值大于 0。如果指定边界的常量表达式缺失，则数组具有不完整类型。

An array may be constructed from an arithmetic type, from a pointer, from a structure or union, or from another array (to generate a multi-dimensional array). Any type from which an array is constructed must be complete; it must not be an array of structure of incomplete type. This implies that for a multi-dimensional array, only the first dimension may be missing. The type of an object of incomplete aray type is completed by another, complete, declaration for the object (Par.A.10.2), or by initializing it (Par.A.8.7). For example, 
数组可以由算术类型、指针、结构或联合、或另一个数组（生成多维数组）构成。任何构造成数组的类型都必须是完整的；不能是不完整类型结构的数组。这意味着对多维数组，只有第一维可以缺失。不完整数组类型对象的类型由该对象的另一个完整声明（Par.A.10.2）补全，或通过初始化它（Par.A.8.7）补全。例如，

```txt
float fa[17], *afp[17]; 
```

declares an array of float numbers and an array of pointers to float numbers. Also, 
声明了一个浮点数数组和一个浮点数指针数组。另外，

```txt
static int x3d[3][5][7]; 
```

declares a static three-dimensional array of integers, with rank 3 X 5 X 7. In complete detail, x3d is an array of three items: each item is an array of five arrays; each of the latter arrays is an array of seven integers. Any of the expressions x3d, x3d[i], x3d[i][j], x3d[i][j][k] may reasonably appear in an expression. The first three have type ``array,'', the last has type int. More specifically, x3d[i][j] is an array of 7 integers, and x3d[i] is an array of 5 arrays of 7 integers. 
声明了一个秩为 3×5×7 的静态三维整数数组。详细地说，`x3d` 是一个三项的数组：每一项是五个数组的数组；后者每个数组是七个整数的数组。表达式 `x3d`、`x3d[i]`、`x3d[i][j]`、`x3d[i][j][k]` 中任何一个都可以合理地出现在表达式中。前三个具有类型 ``array''，最后一个具有类型 `int`。更具体地说，`x3d[i][j]` 是 7 个整数的数组，`x3d[i]` 是 5 个"7 整数数组"的数组。

The array subscripting operation is defined so that E1[E2] is identical to *(E1+E2). Therefore, despite its asymmetric appearance, subscripting is a commutative operation. Because of the conversion rules that apply to + and to arrays (Pars.A6.6, A.7.1, A.7.7), if E1 is an array and E2 an integer, then E1[E2] refers to the E2-th member of E1. 
数组下标运算定义为 `E1[E2]` 与 `*(E1+E2)` 等同。因此，尽管外观不对称，下标是可交换的运算。由于适用于 `+` 和数组的转换规则（Par.A.6.6、A.7.1、A.7.7），如果 `E1` 是数组、`E2` 是整数，则 `E1[E2]` 引用 `E1` 的第 `E2` 个成员。

In the example, x3d[i][j][k] is equivalent to *(x3d[i][j] + k). The first subexpression x3d[i][j] is converted by Par.A.7.1 to type ``pointer to array of integers,'' by Par.A.7.7, the addition involves multiplication by the size of an integer. It follows from the rules that arrays are stored by rows (last subscript varies fastest) and that the first subscript in the declaration helps determine the amount of storage consumed by an array, but plays no other part in subscript calculations. 
在这个例子中，`x3d[i][j][k]` 等价于 `*(x3d[i][j] + k)`。第一个子表达式 `x3d[i][j]` 根据 Par.A.7.1 被转换为类型 ``pointer to array of integers''；根据 Par.A.7.7，加法涉及乘以整数的大小。由这些规则可知，数组按行存储（最后一个下标变化最快），声明中的第一个下标帮助确定数组消耗的存储量，但在下标计算中不起其他作用。

## A.8.6.3 Function Declarators

In a new-style function declaration T D where D has the form 
在新风格（new-style）函数声明 T D 中，如果 D 具有形式

D1 (parameter-type-list) 

且声明 T D1 中标识符的类型是 ``type-modifier T''，则 D 的标识符的类型是 ``type-modifier function with arguments parameter-type-list returning T''。

The syntax of the parameters is 
参数的语法是

parameter-type-list: 

parameter-list 

parameter-list , ... 

parameter-list: 

parameter-declaration 

parameter-list , parameter-declaration 

parameter-declaration: 

declaration-specifiers declarator 

declaration-specifiers abstract-declarator<sub>opt</sub> 

In the new-style declaration, the parameter list specifies the types of the parameters. As a special case, the declarator for a new-style function with no parameters has a parameter list consisting soley of the keyword void. If the parameter list ends with an ellipsis ``, ...'', then the function may accept more arguments than the number of parameters explicitly described, see Par.A.7.3.2. 
在新风格声明中，参数列表指定参数的类型。作为一种特殊情况，无参数的新风格函数的声明符有一个仅由关键字 `void` 组成的参数列表。如果参数列表以省略号 ``、 ...'' 结尾，则该函数可以接受比显式描述的参数数量更多的实参，参见 Par.A.7.3.2。

The types of parameters that are arrays or functions are altered to pointers, in accordance with the rules for parameter conversions; see Par.A.10.1. The only storage class specifier permitted in a parameter's declaration is register, and this specifier is ignored unless the function declarator heads a function definition. Similarly, if the declarators in the parameter declarations contain identifiers and the function declarator does not head a function definition, the identifiers go out of scope immediately. Abstract declarators, which do not mention the identifiers, are discussed in Par.A.8.8. 
作为数组或函数的参数类型会被改为指针，遵循参数转换规则；参见 Par.A.10.1。参数声明中唯一允许的存储类说明符是 `register`，除非函数声明符位于函数定义的开头，否则该说明符被忽略。类似地，如果参数声明中的声明符包含标识符，而函数声明符不在函数定义的开头，则这些标识符立即离开作用域。不提及标识符的抽象声明符在 Par.A.8.8 中讨论。

In an old-style function declaration T D where D has the form 
在旧风格（old-style）函数声明 T D 中，如果 D 具有形式

D1(identifier-list<sub>opt</sub>) 

且声明 T D1 中标识符的类型是 ``type-modifier T''，则 D 的标识符的类型是 ``type-modifier function of unspecified arguments returning T''。参数（如果存在）具有形式

identifier-list: 

identifier 

identifier-list , identifier 

In the old-style declarator, the identifier list must be absent unless the declarator is used in the head of a function definition (Par.A.10.1). No information about the types of the parameters is supplied by the declaration. 
在旧风格声明符中，标识符列表必须省略，除非该声明符用于函数定义的开头（Par.A.10.1）。声明不提供关于参数类型的任何信息。

For example, the declaration 
例如，声明

$$
\text { int   } f (), \text {   *fpi(),   (*pfi)(); }
$$

declares a function f returning an integer, a function fpi returning a pointer to an integer, and a pointer pfi to a function returning an integer. In none of these are the parameter types specified; they are old-style. 
声明了返回整数的函数 `f`、返回指向整数指针的函数 `fpi`，以及指向返回整数的函数的指针 `pfi`。这些都没有指定参数类型；它们是旧风格的。

In the new-style declaration 
在新风格声明中

int strcpy(char *dest, const char *source), rand(void); 

strcpy is a function returning int, with two arguments, the first a character pointer, and the second a pointer to constant characters. The parameter names are effectively comments. The second function rand takes no arguments and returns int. 
`strcpy` 是一个返回 `int` 的函数，带两个实参，第一个是字符指针，第二个是指向常量字符的指针。参数名实际上是注释。第二个函数 `rand` 不带实参并返回 `int`。

Function declarators with parameter prototypes are, by far, the most important language change introduced by the ANSI standard. They offer an advantage over the ``old-style'' declarators of the first edition by providing error-detection and coercion of arguments across function calls, but at a cost: turmoil and confusion during their introduction, and the necessity of accomodating both forms. Some syntactic ugliness was required for the sake of compatibility, namely void as an explicit marker of new-style functions without parameters. 
带参数原型的函数声明符是 ANSI 标准引入的最重要的语言变化。与第一版的"旧风格"声明符相比，它们通过在函数调用间提供错误检测和实参强制转换而具有优势，但代价是：引入期间的混乱，以及必须同时容纳两种形式。为了兼容性需要一些语法上的丑陋，即用 `void` 作为无参数新风格函数的显式标记。

The ellipsis notation ``, ...'' for variadic functions is also new, and, together with the macros in the standard header <stdarg.h>, formalizes a mechanism that was officially forbidden but unofficially condoned in the first edition. 
用于可变参数函数的省略号记法 ``、 ...'' 也是新的，它与标准头文件 `<stdarg.h>` 中的宏一起，将第一版中官方禁止但非官方默许的一种机制形式化了。

These notations were adapted from the C++ language. 
这些记法借鉴自 C++ 语言。

## A.8.7 Initialization

When an object is declared, its init-declarator may specify an initial value for the identifier being declared. The initializer is preceded by =, and is either an expression, or a list of initializers nested in braces. A list may end with a comma, a nicety for neat formatting. 
当对象被声明时，其 init-declarator 可以为被声明的标识符指定初始值。初始化程序（initializer）之前是 `=`，它或者是一个表达式，或者是嵌在花括号中的初始化程序列表。列表可以以逗号结尾，这是为了排版整齐的小便利。

initializer: 

assignment-expression 

{ initializer-list } 

{ initializer-list , } 

initializer-list: 

initializer 

initializer-list , initializer 

All the expressions in the initializer for a static object or array must be constant expressions as described in Par.A.7.19. The expressions in the initializer for an auto or register object or array must likewise be constant expressions if the initializer is a brace-enclosed list. However, if the initializer for an automatic object is a single expression, it need not be a constant expression, but must merely have appropriate type for assignment to the object. 
静态对象或数组的初始化程序中的所有表达式都必须是 Par.A.7.19 中描述的常量表达式。`auto` 或 `register` 对象或数组的初始化程序中的表达式，如果初始化程序是花括号括起的列表，同样必须是常量表达式。但是，如果自动对象的初始化程序是单个表达式，则它不必是常量表达式，只需具有适合赋给该对象的类型。

The first edition did not countenance initialization of automatic structures, unions, or arrays. The ANSI standard allows it, but only by constant constructions unless the initializer can be expressed by a simple expression. 
第一版不允许自动结构、联合或数组的初始化。ANSI 标准允许，但只能用常量构造，除非初始化程序可以用简单表达式表示。

A static object not explicitly initialized is initialized as if it (or its members) were assigned the constant 0. The initial value of an automatic object not explicitly intialized is undefined. 
未显式初始化的静态对象被初始化为好像它（或其成员）被赋了常量 0。未显式初始化的自动对象的初始值未定义。

The initializer for a pointer or an object of arithmetic type is a single expression, perhaps in braces. The expression is assigned to the object. 
指针或算术类型对象的初始化程序是单个表达式，或许在花括号中。该表达式被赋给对象。

The initializer for a structure is either an expression of the same type, or a brace-enclosed list of initializers for its members in order. Unnamed bit-field members are ignored, and are not initialized. If there are fewer initializers in the list than members of the structure, the trailing members are initialized with 0. There may not be more initializers than members. Unnamed bit-field members are ignored,and are not initialized. 
结构的初始化程序或者是同类型的表达式，或者是按顺序对其成员初始化的花括号括起列表。无名位域成员被忽略，不被初始化。如果列表中的初始化程序少于结构的成员，则尾随成员用 0 初始化。初始化程序不能多于成员。无名位域成员被忽略，不被初始化。

The initializer for an array is a brace-enclosed list of initializers for its members. If the array has unknown size, the number of initializers determines the size of the array, and its type becomes complete. If the array has fixed size, the number of initializers may not exceed the number of members of the array; if there are fewer, the trailing members are initialized with 0. 
数组的初始化程序是对其成员初始化的花括号括起列表。如果数组尺寸未知，初始化程序的数量决定数组的尺寸，其类型变为完整。如果数组有固定尺寸，初始化程序的数量不能超过数组成员的数量；如果更少，尾随成员用 0 初始化。

As a special case, a character array may be initialized by a string literal; successive characters of the string initialize successive members of the array. Similarly, a wide character literal (Par.A.2.6) may initialize an array of type wchar_t. If the array has unknown size, the number of characters in the string, including the terminating null character, determines its size; if its size is fixed, the number of characters in the string, not counting the terminating null character, must not exceed the size of the array. 
作为一种特殊情况，字符数组可以用字符串字面值初始化；字符串的相继字符初始化数组的相继成员。类似地，宽字符字面值（Par.A.2.6）可以初始化 `wchar_t` 类型的数组。如果数组尺寸未知，字符串中字符的数量（包括结尾的空字符）决定其尺寸；如果尺寸固定，字符串中字符的数量（不计结尾空字符）不得超过数组尺寸。

The initializer for a union is either a single expression of the same type, or a brace-enclosed initializer for the first member of the union. 
联合的初始化程序或者是同类型的单个表达式，或者是对联合第一个成员的花括号括起初始化程序。

The first edition did not allow initialization of unions. The ``first-member'' rule is clumsy, but is hard to generalize without new syntax. Besides allowing unions to be explicitly initialized in at least a primitive way, this ANSI rule makes definite the semantics of static unions not explicitly initialized. 
第一版不允许联合的初始化。"第一成员"规则笨拙，但没有新语法难以推广。除了至少以原始方式允许显式初始化联合之外，这条 ANSI 规则还明确了未显式初始化的静态联合的语义。

An aggregate is a structure or array. If an aggregate contains members of aggregate type, the initialization rules apply recursively. Braces may be elided in the initialization as follows: if the initializer for an aggregate's member that itself is an aggregate begins with a left brace, then the succeding comma-separated list of initializers initializes the members of the subaggregate; it is erroneous for there to be more initializers than members. If, however, the initializer for a subaggregate does not begin with a left brace, then only enough elements from the list are taken into account for the members of the subaggregate; any remaining members are left to initialize the next member of the aggregate of which the subaggregate is a part. 
聚合体（aggregate）是结构或数组。如果聚合体包含聚合体类型的成员，则初始化规则递归适用。初始化中花括号可以省略，规则如下：如果聚合体某个成员（其本身也是聚合体）的初始化程序以左花括号开始，则其后逗号分隔的初始化程序列表初始化子聚合体的成员；初始化程序多于成员是错误的。但是，如果子聚合体的初始化程序不以左花括号开始，则从列表中只取足够元素用于子聚合体的成员；剩余的成员留给子聚合体所属聚合体的下一个成员初始化。

For example, 
例如，

```txt
int x[] = { 1, 3, 5 }; 
```

declares and initializes x as a 1-dimensional array with three members, since no size was specified and there are three initializers. 
声明并初始化 `x` 为一个有三个成员的一维数组，因为没有指定尺寸且有三个初始化程序。

```txt
float y[4][3] = {
    { 1, 3, 5 },
    { 2, 4, 6 },
    { 3, 5, 7 },
}; 
```

is a completely-bracketed initialization: 1, 3 and 5 initialize the first row of the array y[0], namely y[0][0], y[0][1], and y[0][2]. Likewise the next two lines initialize y[1] and y[2]. The initializer ends early, and therefore the elements of y[3] are initialized with 0. Precisely the same effect could have been achieved by 
这是一个完全加括号的初始化：1、3 和 5 初始化数组 `y[0]` 的第一行，即 `y[0][0]`、`y[0][1]` 和 `y[0][2]`。同样，后两行初始化 `y[1]` 和 `y[2]`。初始化程序提前结束，因此 `y[3]` 的元素用 0 初始化。完全相同的效果可以这样达到：

```txt
float y[4][3] = {
    1, 3, 5, 2, 4, 6, 3, 5, 7
}; 
```

The initializer for y begins with a left brace, but that for y[0] does not; therefore three elements from the list are used. Likewise the next three are taken successively for y[1] and for y[2]. Also, 
`y` 的初始化程序以左花括号开始，但 `y[0]` 的没有；因此从列表中使用三个元素。同样，接下来三个依次用于 `y[1]` 和 `y[2]`。另外，

```txt
float y[4][3] = {
    { 1 }, { 2 }, { 3 }, { 4 } 
```

initializes the first column of y (regarded as a two-dimensional array) and leaves the rest 0. 
初始化 `y` 的第一列（把 `y` 看作二维数组），其余为 0。

Finally, 
最后，

```txt
char msg[] = "Syntax error on line %s\n"; 
```

shows a character array whose members are initialized with a string; its size includes the terminating null character. 
展示了一个成员用字符串初始化的字符数组；其尺寸包括结尾的空字符。

## A.8.8 Type names

In several contexts (to specify type conversions explicitly with a cast, to declare parameter types in function declarators, and as argument of sizeof) it is necessary to supply the name of a data type. This is accomplished using a type name, which is syntactically a declaration for an object of that type omitting the name of the object. 
在若干上下文中（用强制转换显式指定类型转换、在函数声明符中声明参数类型，以及作为 `sizeof` 的实参），需要提供数据类型的名字。这可以用类型名（type name）完成，它在语法上是一个省略了对象名字的该类型对象声明。

type-name:
specifier-qualifier-list abstract-declarator $_{opt}$ 

abstract-declarator: 

pointer 

pointer<sub>opt</sub> direct-abstract-declarator 

direct-abstract-declarator: 

(abstract-declarator)
direct-abstract-declarator $_{opt}$ [constant-expression $_{opt}$ ]
direct-abstract-declarator $_{opt}$ (parameter-type-list $_{opt}$ ) 

It is possible to identify uniquely the location in the abstract-declarator where the identifier would appear if the construction were a declarator in a declaration. The named type is then the same as the type of the hypothetical identifier. For example, 
可以唯一确定 abstract-declarator 中的位置——如果这个构造是声明中的声明符，标识符就会出现在那里。被命名的类型就与假想标识符的类型相同。例如，

```txt
int
int *
int *[3]
int (*)([]]
int *()
int (*[]) (void) 
```

name respectively the types ``integer,'' ``pointer to integer,'' ``array of 3 pointers to integers,' ``pointer to an unspecified number of integers,'' ``function of unspecified parameters returning pointer to integer,'' and ``array, of unspecified size, of pointers to functions with no parameters each returning an integer.' 
它们分别命名这些类型：``integer''、``pointer to integer''、``array of 3 pointers to integers''、``pointer to an unspecified number of integers''、``function of unspecified parameters returning pointer to integer''，以及 ``array, of unspecified size, of pointers to functions with no parameters each returning an integer''。

## A.8.9 Typedef

Declarations whose storage class specifier is typedef do not declare objects; instead they define identifiers that name types. These identifiers are called typedef names. 
存储类说明符为 `typedef` 的声明不声明对象；而是定义命名类型的标识符。这些标识符称为 typedef 名字（typedef names）。

```txt
typedef-name: identifier 
```

A typedef declaration attributes a type to each name among its declarators in the usual way (see Par.A.8.6). Thereafter, each such typedef name is syntactically equivalent to a type specifier keyword for the associated type. 
typedef 声明以通常的方式（参见 Par.A.8.6）把一个类型赋予其声明符中的每个名字。此后，每个这样的 typedef 名字在语法上等价于关联类型的类型说明符关键字。

For example, after 
例如，在

```txt
typedef long Blockno, *Blockptr;
typedef struct { double r, theta; } Complex;
```

之后，构造（the constructions）

```txt
Blockno b;
extern Blockptr bp;
Complex z, *zp; 
```

are legal declarations. The type of b is long, that of bp is ``pointer to long,'' and that of z is the specified structure; zp is a pointer to such a structure. 
是合法声明。`b` 的类型是 `long`，`bp` 的类型是 ``pointer to long''，`z` 的类型是指定的结构；`zp` 是指向这种结构的指针。

typedef does not introduce new types, only synonyms for types that could be specified in another way. In the example, b has the same type as any long object. 
`typedef` 不引入新类型，只是可以用其他方式指定的类型的同义词。在这个例子中，`b` 与任何 `long` 对象具有相同类型。

Typedef names may be redeclared in an inner scope, but a non-empty set of type specifiers must be given. For example, 
typedef 名字可以在内层作用域中重新声明，但必须给出非空的类型说明符集合。例如，

```txt
extern Blockno;
```

does not redefine Blockno, but 
不重新定义 Blockno，但

```txt
extern int Blockno;
```

does. 
这样则重新定义了。

## A.8.10 Type Equivalence

Two type specifier lists are equivalent if they contain the same set of type specifiers, taking into account that some specifiers can be implied by others (for example, long alone implies long int). Structures, unions, and enumerations with different tags are distinct, and a tagless union, structure, or enumeration specifies a unique type. 
如果两个类型说明符列表包含相同的类型说明符集合——考虑到某些说明符可以蕴含其他说明符（例如，单独的 `long` 蕴含 `long int`）——则它们等价。带有不同标签的结构、联合和枚举是不同的，不带标签的联合、结构或枚举指定一个唯一类型。

Two types are the same if their abstract declarators (Par.A.8.8), after expanding any typedef types, and deleting any function parameter specifiers, are the same up to the equivalence of type specifier lists. Array sizes and function parameter types are significant. 
如果两个类型的抽象声明符（Par.A.8.8）在展开所有 typedef 类型并删除所有函数参数说明符之后，在类型说明符列表等价的意义下相同，则这两个类型相同。数组尺寸和函数参数类型是重要的。

## A.9 Statements

Except as described, statements are executed in sequence. Statements are executed for their effect, and do not have values. They fall into several groups. 
除非另有说明，语句按顺序执行。语句为其效果而执行，没有值。它们分为几组。

statement: 

labeled-statement 

expression-statement 

compound-statement 

selection-statement 

iteration-statement 

jump-statement 

## A.9.1 Labeled Statements

Statements may carry label prefixes. 
语句可以带有标签前缀。

labeled-statement: 

identifier : statement 

case constant-expression : statement 

default : statement 

A label consisting of an identifier declares the identifier. The only use of an identifier label is as a target of goto. The scope of the identifier is the current function. Because labels have their own name space, they do not interfere with other identifiers and cannot be redeclared. See Par.A.11.1. 
由标识符构成的标签声明该标识符。标识符标签的唯一用途是作为 `goto` 的目标。标识符的作用域是当前函数。因为标签有自己的名字空间，它们不与其他标识符冲突，也不能被重新声明。参见 Par.A.11.1。

Case labels and default labels are used with the switch statement (Par.A.9.4). The constant expression of case must have integral type. 
`case` 标签和 `default` 标签与 `switch` 语句一起使用（Par.A.9.4）。`case` 的常量表达式必须具有整型。

Labels themselves do not alter the flow of control. 
标签本身不改变控制流。

## A.9.2 Expression Statement

Most statements are expression statements, which have the form 
大多数语句是表达式语句（expression statement），其形式为

expression-statement: 

expression<sub>opt</sub>; 

Most expression statements are assignments or function calls. All side effects from the expression are completed before the next statement is executed. If the expression is missing, the construction is called a null statement; it is often used to supply an empty body to an iteration statement to place a label. 
大多数表达式语句是赋值或函数调用。表达式的所有副作用在下一条语句执行之前完成。如果表达式缺失，这个构造称为空语句（null statement）；它常用于给迭代语句提供空体，或用于放置标签。

## A.9.3 Compound Statement

So that several statements can be used where one is expected, the compound statement (also called ``block'') is provided. The body of a function definition is a compound statement. 
为了能在需要一个语句的地方使用多个语句，提供了复合语句（compound statement，也称为"块（block）"）。函数定义的体是一个复合语句。

compound-statement: 

{ declaration-list<sub>opt</sub> statement-list<sub>opt</sub> } 

declaration-list: 

declaration 

declaration-list declaration 

If an identifier in the declaration-list was in scope outside the block, the outer declaration is suspended within the block (see Par.A.11.1), after which it resumes its force. An identifier may be declared only once in the same block. These rules apply to identifiers in the same name space (Par.A.11); identifiers in different name spaces are treated as distinct. 
如果 declaration-list 中的标识符在块外已有作用域，则外层声明在块内被挂起（参见 Par.A.11.1），块结束后恢复效力。同一块中标识符只能声明一次。这些规则适用于同一名字空间（Par.A.11）中的标识符；不同名字空间中的标识符被视为不同。

Initialization of automatic objects is performed each time the block is entered at the top, and proceeds in the order of the declarators. If a jump into the block is executed, these initializations are not performed. Initialization of static objects are performed only once, before the program begins execution. 
自动对象的初始化在每次从块顶部进入时执行，按声明符的顺序进行。如果执行了跳入块内的跳转，这些初始化不执行。静态对象的初始化只在程序开始执行之前执行一次。

## A.9.4 Selection Statements

Selection statements choose one of several flows of control. 
选择语句（selection statement）在若干控制流中选择其一。

selection-statement: 

if (expression) statement 

if (expression) statement else statement 

switch (expression) statement 

In both forms of the if statement, the expression, which must have arithmetic or pointer type, is evaluated, including all side effects, and if it compares unequal to 0, the first substatement is executed. In the second form, the second substatement is executed if the expression is 0. The else ambiguity is resolved by connecting an else with the last encountered else-less if at the same block nesting level. 
在两种形式的 `if` 语句中，表达式（必须具有算术或指针类型）被求值，包括所有副作用；如果它不等于 0，则执行第一个子语句。在第二种形式中，如果表达式为 0，则执行第二个子语句。else 二义性通过把 `else` 连接到同一块嵌套层次中最后遇到的没有 `else` 的 `if` 来解决。

The switch statement causes control to be transferred to one of several statements depending on the value of an expression, which must have integral type. The substatement controlled by a switch is typically compound. Any statement within the substatement may be labeled with one or more case labels (Par.A.9.1). The controlling expression undergoes integral promotion (Par.A.6.1), and the case constants are converted to the promoted type. No two of these case constants associated with the same switch may have the same value after conversion. There may also be at most one default label associated with a switch. Switches may be nested; a case or default label is associated with the smallest switch that contains it. 
`switch` 语句使控制根据一个表达式的值（必须具有整型）转移到若干语句之一。由 switch 控制的子语句通常是复合语句。子语句中的任何语句都可以带有一个或多个 `case` 标签（Par.A.9.1）。控制表达式进行整型提升（Par.A.6.1），`case` 常量被转换为提升后的类型。与同一 switch 相关联的 `case` 常量中，任何两个在转换后不得具有相同的值。与一个 switch 相关联的 `default` 标签至多一个。switch 可以嵌套；`case` 或 `default` 标签与包含它的最小的 switch 相关联。

When the switch statement is executed, its expression is evaluated, including all side effects, and compared with each case constant. If one of the case constants is equal to the value of the expression, control passes to the statement of the matched case label. If no case constant matches the expression, and if there is a default label, control passes to the labeled statement. If no case matches, and if there is no default, then none of the substatements of the swtich is executed. 
执行 switch 语句时，先求其表达式的值（包括所有副作用），并与每个 `case` 常量比较。如果某个 `case` 常量等于表达式的值，控制传递给匹配的 case 标签的语句。如果没有 `case` 常量与表达式匹配，且存在 `default` 标签，控制传递给被标记的语句。如果没有 `case` 匹配，也没有 `default`，则 switch 的任何子语句都不执行。

In the first edition of this book, the controlling expression of switch, and the case constants, were required to have int type. 
在本书第一版中，switch 的控制表达式和 `case` 常量都要求是 `int` 类型。

## A.9.5 Iteration Statements

Iteration statements specify looping. 
迭代语句（iteration statement）指定循环。

iteration-statement:
while (expression) statement
do statement while (expression);
for (expression $_{opt}$ ; expression $_{opt}$ ; expression $_{opt}$ ) statement 

In the while and do statements, the substatement is executed repeatedly so long as the value of the expression remains unequal to 0; the expression must have arithmetic or pointer type. With while, the test, including all side effects from the expression, occurs before each execution of the statement; with do, the test follows each iteration. 
在 `while` 和 `do` 语句中，只要表达式的值保持不等于 0，子语句就反复执行；表达式必须具有算术或指针类型。`while` 的测试（包括表达式的所有副作用）在每次执行语句之前进行；`do` 的测试在每次迭代之后进行。

In the for statement, the first expression is evaluated once, and thus specifies initialization for the loop. There is no restriction on its type. The second expression must have arithmetic or pointer type; it is evaluated before each iteration, and if it becomes equal to 0, the for is terminated. The third expression is evaluated after each iteration, and thus specifies a reinitialization for the loop. There is no restriction on its type. Side-effects from each expression are completed immediately after its evaluation. If the substatement does not contain continue, a statement 
在 `for` 语句中，第一个表达式求值一次，从而为循环指定初始化。其类型没有限制。第二个表达式必须具有算术或指针类型；它在每次迭代之前求值，如果它变为等于 0，则 `for` 终止。第三个表达式在每次迭代之后求值，从而为循环指定重新初始化。其类型没有限制。每个表达式的副作用在其求值之后立即完成。如果子语句不包含 `continue`，则语句

for (expression1; expression2; expression3) statement

等价于（is equivalent to）

```txt
expression1;
while (expression2) {
    statement
    expression3;
} 
```

Any of the three expressions may be dropped. A missing second expression makes the implied test equivalent to testing a non-zero element. 
三个表达式中的任何一个都可以省略。缺失的第二个表达式使隐含的测试等价于测试一个非零元素。

## A.9.6 Jump statements

Jump statements transfer control unconditionally. 
跳转语句（jump statement）无条件地转移控制。

jump-statement:
goto identifier;
continue;
break;
return expression $_{opt}$ ; 

In the goto statement, the identifier must be a label (Par.A.9.1) located in the current function. Control transfers to the labeled statement. 
在 `goto` 语句中，标识符必须是位于当前函数中的标签（Par.A.9.1）。控制转移到被标记的语句。

A continue statement may appear only within an iteration statement. It causes control to pass to the loop-continuation portion of the smallest enclosing such statement. More precisely, within each of the statements 
`continue` 语句只能出现在迭代语句中。它使控制传递给包含它的最小的这类语句的循环继续部分。更准确地说，在下列每个语句中

```txt
while (...) { do { for (...) { ... ... contin: ; contin: ; contin: ; } while (...); } 
```

a continue not contained in a smaller iteration statement is the same as goto contin. 
中，不包含在更小的迭代语句中的 `continue` 与 `goto contin` 相同。

A break statement may appear only in an iteration statement or a switch statement, and terminates execution of the smallest enclosing such statement; control passes to the statement following the terminated statement. 
`break` 语句只能出现在迭代语句或 `switch` 语句中，它终止包含它的最小的这类语句的执行；控制传递给被终止语句之后的语句。

A function returns to its caller by the return statement. When return is followed by an expression, the value is returned to the caller of the function. The expression is converted, as by assignment, to the type returned by the function in which it appears. 
函数通过 `return` 语句返回其调用者。当 `return` 后面跟有表达式时，该值返回给函数的调用者。表达式像赋值一样被转换为其所在函数的返回类型。

Flowing off the end of a function is equivalent to a return with no expression. In either case, the returned value is undefined. 
执行越过函数末尾等价于没有表达式的 `return`。无论哪种情况，返回值都未定义。

## A.10 External Declarations

The unit of input provided to the C compiler is called a translation unit; it consists of a sequence of external declarations, which are either declarations or function definitions. 
提供给 C 编译器的输入单元称为翻译单元（translation unit）；它由外部声明的序列组成，外部声明或者是声明，或者是函数定义。

translation-unit: 

external-declaration 

translation-unit external-declaration 

external-declaration: 

function-definition 

declaration 

The scope of external declarations persists to the end of the translation unit in which they are declared, just as the effect of declarations within the blocks persists to the end of the block. The syntax of external declarations is the same as that of all declarations, except that only at this level may the code for functions be given. 
外部声明的作用域持续到声明所在的翻译单元的末尾，正如块内声明的效果持续到块的末尾一样。外部声明的语法与所有声明的语法相同，只是只有在这个层次上才可以给出函数的代码。

## A.10.1 Function Definitions

Function definitions have the form 
函数定义的形式为

function-definition: 

declaration-specifiers<sub>opt</sub> declarator declaration-list<sub>opt</sub> compound-statement 

The only storage-class specifiers allowed among the declaration specifiers are extern or static; see Par.A.11.2 for the distinction between them. 
声明说明符中唯一允许的存储类说明符是 `extern` 或 `static`；它们之间的区别参见 Par.A.11.2。

A function may return an arithmetic type, a structure, a union, a pointer, or void, but not a function or an array. The declarator in a function declaration must specify explicitly that the declared identifier has function type; that is, it must contain one of the forms (see Par.A.8.6.3). 
函数可以返回算术类型、结构、联合、指针或 `void`，但不能返回函数或数组。函数声明中的声明符必须显式指明被声明的标识符具有函数类型；也就是说，它必须包含如下形式之一（参见 Par.A.8.6.3）。

direct-declarator ( parameter-type-list ) direct-declarator ( identifier-list<sub>opt</sub> ) 

其中 direct-declarator 是标识符或带括号的标识符。特别地，它不得通过 `typedef` 获得函数类型。

In the first form, the definition is a new-style function, and its parameters, together with their types, are declared in its parameter type list; the declaration-list following the function's declarator must be absent. Unless the parameter type list consists solely of void, showing that the function takes no parameters, each declarator in the parameter type list must contain an identifier. If the parameter type list ends with ``, ...'' then the function may be called with more arguments than parameters; the va_arg macro mechanism defined in the standard header <stdarg.h> and described in Appendix B must be used to refer to the extra arguments. Variadic functions must have at least one named parameter. 
在第一种形式中，定义是新风格函数，其参数连同类型一起在参数类型列表中声明；函数声明符之后的声明列表必须省略。除非参数类型列表仅由 `void` 组成（表示函数不带参数），参数类型列表中的每个声明符必须包含一个标识符。如果参数类型列表以 ``、 ...'' 结尾，则函数可以用比参数更多的实参调用；必须使用标准头文件 `<stdarg.h>` 中定义、附录 B 中描述的 `va_arg` 宏机制来引用额外的实参。可变参数函数必须至少有一个命名参数。

In the second form, the definition is old-style: the identifier list names the parameters, while the declaration list attributes types to them. If no declaration is given for a parameter, its type is taken to be int. The declaration list must declare only parameters named in the list, initialization is not permitted, and the only storage-class specifier possible is register. 
在第二种形式中，定义是旧风格的：标识符列表命名参数，而声明列表赋予它们类型。如果参数没有给出声明，其类型被视为 `int`。声明列表必须只声明列表中命名的参数，不允许初始化，唯一可能的存储类说明符是 `register`。

In both styles of function definition, the parameters are understood to be declared just after the beginning of the compound statement constituting the function's body, and thus the same identifiers must not be redeclared there (although they may, like other identifiers, be redeclared in inner blocks). If a parameter is declared to have type ``array of type,'' the declaration is adjusted to read ``pointer to type;'' similarly, if a parameter is declared to have type ``function returning type,'' the declaration is adjusted to read ``pointer to function returning type.'' During the call to a function, the arguments are converted as necessary and assigned to the parameters; see Par.A.7.3.2. 
在两种风格的函数定义中，参数都被理解为在构成函数体的复合语句开始处紧接着声明，因此同样的标识符不得在那里重新声明（不过与其他标识符一样，可以在内层块中重新声明）。如果参数声明为 ``array of type'' 类型，声明被调整为 ``pointer to type''；类似地，如果参数声明为 ``function returning type'' 类型，声明被调整为 ``pointer to function returning type''。函数调用期间，实参按需转换并赋给参数；参见 Par.A.7.3.2。

New-style function definitions are new with the ANSI standard. There is also a small change in the details of promotion; the first edition specified that the declarations of float parameters were adjusted to read double. The difference becomes noticable when a pointer to a parameter is generated within a function. 
新风格函数定义是 ANSI 标准新增的。提升的细节也有小变化；第一版规定 `float` 参数的声明被调整为 `double`。当在函数内部生成指向参数的指针时，这一差异变得明显。

A complete example of a new-style function definition is 
一个完整的新风格函数定义例子是

```txt
int max(int a, int b, int c)
{
    int m;
    m = (a > b) ? a : b;
    return (m > c) ? m : c; 
```

Here int is the declaration specifier; max(int a, int b, int c) is the function's declarator, and { ... } is the block giving the code for the function. The corresponding oldstyle definition would be 
这里 `int` 是声明说明符；`max(int a, int b, int c)` 是函数的声明符，`{ ... }` 是给出函数代码的块。对应的旧风格定义是

```c
int max(a, b, c)
int a, b, c;
{
    /* ... */
} 
```

where now int max(a, b, c) is the declarator, and int a, b, c; is the declaration list for the parameters. 
这里 `int max(a, b, c)` 是声明符，`int a, b, c;` 是参数的声明列表。

## A.10.2 External Declarations

External declarations specify the characteristics of objects, functions and other identifiers. The term ``external'' refers to their location outside functions, and is not directly connected with the extern keyword; the storage class for an externally-declared object may be left empty, or it may be specified as extern or static. 
外部声明指明对象、函数和其他标识符的特性。术语"外部"指它们位于函数之外，与 `extern` 关键字没有直接联系；外部声明对象的存储类可以留空，也可以指定为 `extern` 或 `static`。

Several external declarations for the same identifier may exist within the same translation unit if they agree in type and linkage, and if there is at most one definition for the identifier. 
同一标识符的多个外部声明可以存在于同一翻译单元中，只要它们在类型和链接上一致，且该标识符至多有一个定义。

Two declarations for an object or function are deemed to agree in type under the rule discussed in Par.A.8.10. In addition, if the declarations differ because one type is an incomplete structure, union, or enumeration type (Par.A.8.3) and the other is the corresponding completed type with the same tag, the types are taken to agree. Moreover, if one type is an incomplete array type (Par.A.8.6.2) and the other is a completed array type, the types, if otherwise identical, are also taken to agree. Finally, if one type specifies an old-style function, and the other an otherwise identical new-style function, with parameter declarations, the types are taken to agree. 
对象或函数的两个声明在 Par.A.8.10 讨论的规则下被认为类型一致。此外，如果两个声明不同是因为一个类型是不完整的结构、联合或枚举类型（Par.A.8.3），而另一个是带有相同标签的对应完整类型，则类型被视为一致。再者，如果一个类型是不完整的数组类型（Par.A.8.6.2），另一个是完整的数组类型，则只要其他方面相同，类型也被视为一致。最后，如果一个类型指定旧风格函数，另一个指定其他方面相同、带参数声明的新风格函数，则类型被视为一致。

If the first external declarator for a function or object includes the static specifier, the identifier has internal linkage; otherwise it has external linkage. Linkage is discussed in Par.11.2. 
如果函数或对象的第一个外部声明符包含 `static` 说明符，则该标识符具有内部链接（internal linkage）；否则具有外部链接（external linkage）。链接在 Par.A.11.2 中讨论。

An external declaration for an object is a definition if it has an initializer. An external object declaration that does not have an initializer, and does not contain the extern specifier, is a tentative definition. If a definition for an object appears in a translation unit, any tentative definitions are treated merely as redundant declarations. If no definition for the object appears in the translation unit, all its tentative definitions become a single definition with initializer 0. 
对象的外部声明如果有初始化程序，则是定义（definition）。没有初始化程序且不含 `extern` 说明符的外部对象声明是暂定定义（tentative definition）。如果对象的定义出现在翻译单元中，所有暂定定义只被当作冗余声明。如果翻译单元中没有对象的定义出现，其所有暂定定义合为一个初始值为 0 的定义。

Each object must have exactly one definition. For objects with internal linkage, this rule applies separately to each translation unit, because internally-linked objects are unique to a translation unit. For objects with external linkage, it applies to the entire program. 
每个对象必须恰好有一个定义。对具有内部链接的对象，这条规则分别适用于每个翻译单元，因为内部链接的对象对翻译单元是唯一的。对具有外部链接的对象，它适用于整个程序。

Although the one-definition rule is formulated somewhat differently in the first edition of this book, it is in effect identical to the one stated here. Some implementations relax it by generalizing the notion of tentative definition. In the alternate formulation, which is usual in UNIX systems and recognized as a common extension by the Standard, all the tentative definitions for an externally linked object, throughout all the translation units of the program, are considered together instead of in each translation unit separately. If a definition occurs somewhere in the program, then the tentative definitions become merely declarations, but if no definition appears, then all its tentative definitions become a definition with initializer 0. 
尽管本书第一版对单一定义规则的表述有所不同，但其实质与此处陈述的相同。一些实现通过推广暂定定义的概念放宽了这条规则。在替代表述中（UNIX 系统中通常如此，且被标准认可为常见扩展），具有外部链接对象的所有暂定定义在整个程序的所有翻译单元中合在一起考虑，而不是在每个翻译单元中分别考虑。如果程序中某处出现了定义，则暂定定义仅成为声明；如果没有定义出现，则其所有暂定定义合为一个初始值为 0 的定义。

## A.11 Scope and Linkage

A program need not all be compiled at one time: the source text may be kept in several files containing translation units, and precompiled routines may be loaded from libraries. Communication among the functions of a program may be carried out both through calls and through manipulation of external data. 
程序不必一次性全部编译：源文本可以保存在包含翻译单元的若干文件中，预编译的例程可以从库中加载。程序函数之间的通信既可以通过调用进行，也可以通过操纵外部数据进行。

Therefore, there are two kinds of scope to consider: first, the lexical scope of an identifier which is the region of the program text within which the identifier's characteristics are understood; and second, the scope associated with objects and functions with external linkage, which determines the connections between identifiers in separately compiled translation units. 
因此，有两种作用域需要考虑：第一，标识符的词法作用域（lexical scope），即程序文本中标识符的特性可被理解的区域；第二，与具有外部链接的对象和函数相关联的作用域，它确定分别编译的翻译单元中标识符之间的连接。

## A.11.1 Lexical Scope

Identifiers fall into several name spaces that do not interfere with one another; the same identifier may be used for different purposes, even in the same scope, if the uses are in different name spaces. These classes are: objects, functions, typedef names, and enum constants; labels; tags of structures or unions, and enumerations; and members of each structure or union individually. 
标识符分为几个互不干扰的名字空间；如果用途处于不同的名字空间，同一标识符可以用于不同目的，甚至在同一作用域中。这些类别是：对象、函数、typedef 名字和枚举常量；标签；结构或联合的标签以及枚举；每个结构或联合各自的成员。

These rules differ in several ways from those described in the first edition of this manual. Labels did not previously have their own name space; tags of structures and unions each had a separate space, and in some implementations enumerations tags did as well; putting different kinds of tags into the same space is a new restriction. The most important departure from the first edition is that each structure or union creates a separate name space for its members, so that the same name may appear in several different structures. This rule has been common practice for several years. 
这些规则与手册第一版描述的规则有几处不同。标签以前没有自己的名字空间；结构和联合的标签各自有单独的空间，在某些实现中枚举标签也是如此；把不同种类的标签放进同一空间是一个新的限制。与第一版最重要的差异是每个结构或联合为其成员创建单独的名字空间，这样同一个名字可以出现在几个不同的结构中。这条规则已成为多年来的普遍做法。

The lexical scope of an object or function identifier in an external declaration begins at the end of its declarator and persists to the end of the translation unit in which it appears. The scope of a parameter of a function definition begins at the start of the block defining the function, and persists through the function; the scope of a parameter in a function declaration ends at the end of the declarator. The scope of an identifier declared at the head of a block begins at the end of its declarator, and persists to the end of the block. The scope of a label is the whole of the function in which it appears. The scope of a structure, union, or enumeration tag, or an enumeration constant, begins at its appearance in a type specifier, and persists to the end of a translation unit (for declarations at the external level) or to the end of the block (for declarations within a function). 
外部声明中对象或函数标识符的词法作用域从其声明符的末尾开始，持续到它出现的翻译单元的末尾。函数定义的参数的作用域从定义函数的块的开始处起，贯穿整个函数；函数声明中参数的作用域在声明符的末尾结束。在块头部声明的标识符的作用域从其声明符的末尾开始，持续到块的末尾。标签的作用域是它出现的整个函数。结构、联合或枚举标签或枚举常量的作用域从它在类型说明符中的出现开始，持续到翻译单元的末尾（对外部层次的声明）或块的末尾（对函数内的声明）。

If an identifier is explicitly declared at the head of a block, including the block constituting a function, any declaration of the identifier outside the block is suspended until the end of the block. 
如果标识符在块的头部（包括构成函数的块）显式声明，则块外对该标识符的任何声明都被挂起，直到块结束。

## A.11.2 Linkage

Within a translation unit, all declarations of the same object or function identifier with internal linkage refer to the same thing, and the object or function is unique to that translation unit. All declarations for the same object or function identifier with external linkage refer to the same thing, and the object or function is shared by the entire program. 
在翻译单元内，具有内部链接的同一对象或函数标识符的所有声明都指同一事物，且该对象或函数对该翻译单元是唯一的。具有外部链接的同一对象或函数标识符的所有声明都指同一事物，且该对象或函数由整个程序共享。

As discussed in Par.A.10.2, the first external declaration for an identifier gives the identifier internal linkage if the static specifier is used, external linkage otherwise. If a declaration for an identifier within a block does not include the extern specifier, then the identifier has no linkage and is unique to the function. If it does include extern, and an external declaration for is active in the scope surrounding the block, then the identifier has the same linkage as the external declaration, and refers to the same object or function; but if no external declaration is visible, its linkage is external. 
如 Par.A.10.2 所讨论的，标识符的第一个外部声明如果使用 `static` 说明符，则给该标识符内部链接，否则给外部链接。如果块内标识符的声明不包含 `extern` 说明符，则该标识符没有链接，对该函数是唯一的。如果包含 `extern`，且围绕该块的作用域中有一个外部声明处于活动状态，则该标识符具有与外部声明相同的链接，指同一对象或函数；但如果看不到外部声明，其链接是外部链接。

## A.12 Preprocessing

A preprocessor performs macro substitution, conditional compilation, and inclusion of named files. Lines beginning with #, perhaps preceded by white space, communicate with this preprocessor. The syntax of these lines is independent of the rest of the language; they may appear anywhere and have effect that lasts (independent of scope) until the end of the translation unit. Line boundaries are significant; each line is analyzed individually (bus see Par.A.12.2 for how to adjoin lines). To the preprocessor, a token is any language token, or a character sequence giving a file name as in the #include directive (Par.A.12.4); in addition, any character not otherwise defined is taken as a token. However, the effect of white spaces other than space and horizontal tab is undefined within preprocessor lines. 
预处理器（preprocessor）执行宏替换、条件编译和指定文件的包含。以 `#` 开头（前面可能有空白）的行与这个预处理器通信。这些行的语法独立于语言的其他部分；它们可以出现在任何地方，其效果（独立于作用域）持续到翻译单元结束。行边界是重要的；每一行被单独分析（拼接行的方式参见 Par.A.12.2）。对预处理器而言，记号是任何语言记号，或者是像 `#include` 指令（Par.A.12.4）中那样给出文件名的字符序列；此外，任何没有以其他方式定义的字符都被当作记号。但是，在预处理器行中，除空格和水平制表符之外的空白的效果未定义。

Preprocessing itself takes place in several logically successive phases that may, in a particular implementation, be condensed. 
预处理本身发生在若干逻辑上相继的阶段中，在特定实现中这些阶段可能被压缩合并。

1. First, trigraph sequences as described in Par.A.12.1 are replaced by their equivalents. Should the operating system environment require it, newline characters are introduced between the lines of the source file. 
1. 首先，Par.A.12.1 所述的三字符序列（trigraph sequences）被其等价物替换。如果操作系统环境需要，则在源文件的行之间引入换行字符。

2. Each occurrence of a backslash character \ followed by a newline is deleted, this splicing lines (Par.A.12.2). 
2. 每个反斜杠字符 `\` 后跟换行符的出现都被删除，这样拼接行（Par.A.12.2）。

3. The program is split into tokens separated by white-space characters; comments are replaced by a single space. Then preprocessing directives are obeyed, and macros (Pars.A.12.3-A.12.10) are expanded. 
3. 程序被拆分为由空白字符分隔的记号；注释被替换为单个空格。然后执行预处理指令，并展开宏（Par.A.12.3~A.12.10）。

4. Escape sequences in character constants and string literals (Pars. A.2.5.2, A.2.6) are replaced by their equivalents; then adjacent string literals are concatenated. 
4. 字符常量和字符串字面值中的转义序列（Par.A.2.5.2、A.2.6）被其等价物替换；然后相邻的字符串字面值被拼接。

5. The result is translated, then linked together with other programs and libraries, by collecting the necessary programs and data, and connecting external functions and object references to their definitions. 
5. 结果被翻译，然后通过收集必要的程序和数据、将外部函数和对象引用连接到其定义，与其他程序和库链接在一起。

## A.12.1 Trigraph Sequences

The character set of C source programs is contained within seven-bit ASCII, but is a superset of the ISO 646-1983 Invariant Code Set. In order to enable programs to be represented in the reduced set, all occurrences of the following trigraph sequences are replaced by the corresponding single character. This replacement occurs before any other processing. 
C 源程序的字符集包含在七位 ASCII 之内，但是 ISO 646-1983 不变代码集的超集。为了使程序能用这个缩减集表示，下列三字符序列的所有出现都被对应的单个字符替换。这种替换在任何其他处理之前发生。

<table><tr><td>? ? =</td><td>#</td><td>?? (</td><td>[</td><td>?? &lt;</td><td>{</td></tr><tr><td>?? /</td><td>\</td><td>?? )</td><td>]</td><td>?? &gt;</td><td>}</td></tr><tr><td>?? &#x27;</td><td>^</td><td>?? !</td><td>|</td><td>?? -</td><td>~</td></tr></table>

No other such replacements occur. 
没有其他这类替换发生。

Trigraph sequences are new with the ANSI standard. 
三字符序列是 ANSI 标准新增的。

## A.12.2 Line Splicing

Lines that end with the backslash character \ are folded by deleting the backslash and the following newline character. This occurs before division into tokens. 
以反斜杠字符 `\` 结尾的行通过删除反斜杠和随后的换行符来折叠。这发生在拆分为记号之前。

## A.12.3 Macro Definition and Expansion

A control line of the form 
形如下面的控制行

# define identifier token-sequence 

使预处理器用给定的记号序列替换该标识符后续的出现；记号序列前后的空白被丢弃。同一标识符的第二个 `#define` 是错误的，除非第二个记号序列与第一个相同（所有空白分隔被视为等价）。

A line of the form 
形如下面的行

# define identifier (identifier-list) token-sequence where there is no space between the first identifier and the (, is a macro definition with parameters given by the identifier list. As with the first form, leading and trailing white space arround the token sequence is discarded, and the macro may be redefined only with a definition in which the number and spelling of parameters, and the token sequence, is identical. 
其中第一个标识符与 `(` 之间没有空格，是一个带参数的宏定义，参数由标识符列表给出。与第一种形式一样，记号序列前后的空白被丢弃，宏只能用参数的数量和拼写以及记号序列都相同的定义重定义。

A control line of the form 
形如下面的控制行

# undef identifier

使该标识符的预处理器定义被遗忘。对未知标识符应用 `#undef` 不是错误。

When a macro has been defined in the second form, subsequent textual instances of the macro identifier followed by optional white space, and then by (, a sequence of tokens separated by commas, and a ) constitute a call of the macro. The arguments of the call are the commaseparated token sequences; commas that are quoted or protected by nested parentheses do not separate arguments. During collection, arguments are not macro-expanded. The number of arguments in the call must match the number of parameters in the definition. After the arguments are isolated, leading and trailing white space is removed from them. Then the token sequence resulting from each argument is substituted for each unquoted occurrence of the corresponding parameter's identifier in the replacement token sequence of the macro. Unless the parameter in the replacement sequence is preceded by #, or preceded or followed by ##, the argument tokens are examined for macro calls, and expanded as necessary, just before insertion. 
当宏以第二种形式定义时，宏标识符的后续文本实例——后面跟可选空白，然后跟 `(`、由逗号分隔的记号序列和 `)`——构成宏的一次调用。调用的实参是以逗号分隔的记号序列；被引号括起或被嵌套括号保护的逗号不分隔实参。收集期间，实参不做宏展开。调用中实参的数量必须与定义中参数的数量匹配。实参被分离之后，去掉其前后空白。然后，每个实参得到的记号序列替换宏的替换记号序列中对应参数标识符的每个不带引号的出现。除非替换序列中的参数前面有 `#`，或前面或后面有 `##`，否则实参记号在插入之前会被检查是否包含宏调用，并按需展开。

Two special operators influence the replacement process. First, if an occurrence of a parameter in the replacement token sequence is immediately preceded by #, string quotes (") are placed around the corresponding parameter, and then both the # and the parameter identifier are replaced by the quoted argument. A \ character is inserted before each " or \ character that appears surrounding, or inside, a string literal or character constant in the argument. 
两个特殊运算符影响替换过程。第一，如果替换记号序列中参数的出现前面紧跟着 `#`，则给对应参数加上字符串引号（`"`），然后 `#` 和参数标识符都被替换为带引号的实参。在实参中出现在字符串字面值或字符常量外围或内部的每个 `"` 或 `\` 字符之前，插入一个 `\` 字符。

Second, if the definition token sequence for either kind of macro contains a ## operator, then just after replacement of the parameters, each ## is deleted, together with any white space on either side, so as to concatenate the adjacent tokens and form a new token. The effect is undefined if invalid tokens are produced, or if the result depends on the order of processing of the ## operators. Also, ## may not appear at the beginning or end of a replacement token sequence. 
第二，如果任一种宏的定义记号序列包含 `##` 运算符，则在参数替换之后，每个 `##` 连同两侧的任何空白被删除，以便把相邻记号拼接成一个新记号。如果产生了无效记号，或者结果取决于 `##` 运算符的处理顺序，则效果未定义。另外，`##` 不能出现在替换记号序列的开头或结尾。

In both kinds of macro, the replacement token sequence is repeatedly rescanned for more defined identifiers. However, once a given identifier has been replaced in a given expansion, it is not replaced if it turns up again during rescanning; instead it is left unchanged. 
在这两种宏中，替换记号序列都被反复重新扫描以查找更多已定义的标识符。但是，一旦给定标识符在给定展开中已被替换，重新扫描期间它再次出现时就不再替换；而是保持不变。

Even if the final value of a macro expansion begins with with #, it is not taken to be a preprocessing directive. 
即使宏展开的最终值以 `#` 开始，也不被视为预处理指令。

The details of the macro-expansion process are described more precisely in the ANSI standard than in the first edition. The most important change is the addition of the # and ## operators, which make quotation and concatenation admissible. Some of the new rules, especially those involving concatenation, are bizarre. (See example below.) 
宏展开过程的细节在 ANSI 标准中比第一版描述得更精确。最重要的变化是增加了 `#` 和 `##` 运算符，它们使加引号和拼接成为合法。一些新规则，尤其是涉及拼接的规则，非常古怪。（参见下面的例子。）

For example, this facility may be used for ``manifest-constants,'' as in 
例如，这种设施可以用于"显式常量（manifest-constants）"，如

```txt
#define TABSIZE 100
int table[TABSIZE];
```

The definition 
定义

```txt
#define ABSDIFF(a, b) ((a) > (b) ? (a) - (b) : (b) - (a)) 
```

defines a macro to return the absolute value of the difference between its arguments. Unlike a function to do the same thing, the arguments and returned value may have any arithmetic type or even be pointers. Also, the arguments, which might have side effects, are evaluated twice, once for the test and once to produce the value. 
定义了一个宏，返回其实参之差的绝对值。与完成同样事情的函数不同，实参和返回值可以具有任何算术类型，甚至可以是指针。此外，可能有副作用的实参被求值两次，一次用于测试，一次用于产生值。

Given the definition 
给定定义

```txt
#define tempfile(dir) #dir "%s"
```

the macro call tempfile(/usr/tmp) yields 
宏调用 `tempfile(/usr/tmp)` 产生

```txt
"/usr/tmp" "%s"
```

which will subsequently be catenated into a single string. After 
随后它将被拼接为单个字符串。在

```txt
#define cat(x, y) x ## y 
```

之后，

the call cat(var, 123) yields var123. However, the call cat(cat(1,2),3) is undefined: the presence of ## prevents the arguments of the outer call from being expanded. Thus it produces the token string 
调用 `cat(var, 123)` 产生 `var123`。但是，调用 `cat(cat(1,2),3)` 是未定义的：`##` 的存在阻止外层调用的实参被展开。因此它产生记号串

```txt
cat (1, 2)3 
```

and )3 (the catenation of the last token of the first argument with the first token of the second) is not a legal token. If a second level of macro definition is introduced, 
而 `)3`（第一个实参的最后一个记号与第二个实参的第一个记号的拼接）不是合法记号。如果引入第二层宏定义，

```txt
#define xcat(x, y) cat(x,y)
```

things work more smoothly; xcat(xcat(1, 2), 3) does produce 123, because the expansion of xcat itself does not involve the ## operator. 
事情就顺畅了；`xcat(xcat(1, 2), 3)` 确实产生 `123`，因为 `xcat` 自身的展开不涉及 `##` 运算符。

Likewise, ABSDIFF(ABSDIFF(a,b),c) produces the expected, fully-expanded result. 
同样，`ABSDIFF(ABSDIFF(a,b),c)` 产生预期的完全展开的结果。

## A.12.4 File Inclusion

A control line of the form 

```txt
# include <filename> 
```

causes the replacement of that line by the entire contents of the file filename. The characters in the name filename must not include > or newline, and the effect is undefined if it contains any of ", ', \, or /*. The named file is searched for in a sequence of implementation-defined places. 
使该行被文件 filename 的全部内容替换。名字 filename 中的字符不得包含 `>` 或换行符；如果包含 `"`、`'`、`\` 或 `/*` 中的任何一个，效果未定义。指定的文件在与实现相关的一系列位置中查找。

Similarly, a control line of the form 
类似地，形如下面的控制行

# include "filename" 

searches first in association with the original source file (a deliberately implementationdependent phrase), and if that search fails, then as in the first form. The effect of using ', \, or /* in the filename remains undefined, but > is permitted. 
首先在与原始源文件相关联的位置查找（这是一个刻意与实现相关的说法）；如果查找失败，则像第一种形式那样查找。在文件名中使用 `'`、`\` 或 `/*` 的效果仍未定义，但允许 `>`。

Finally, a directive of the form 
最后，形如下面的指令

# include token-sequence 

not matching one of the previous forms is interpreted by expanding the token sequence as for normal text; one of the two forms with <...> or "..." must result, and is then treated as previously described. 
如果不匹配前面的形式之一，则像正常文本一样展开记号序列来解释；结果必须是带 `<...>` 或 `"..."` 的两种形式之一，然后按前面描述的方式处理。

#include files may be nested. 
#include 文件可以嵌套。

## A.12.5 Conditional Compilation

Parts of a program may be compiled conditionally, according to the following schematic syntax. 
程序的各部分可以按照如下示意语法条件编译。

preprocessor-conditional: 

if-line text elif-parts else-part<sub>opt</sub> #endif 

if-line: 

# if constant-expression 

# ifdef identifier 

# ifndef identifier 

elif-parts: 

elif-line text 

elif-parts<sub>opt</sub> 

elif-line: 

# elif constant-expression 

else-part: 

else-line text 

else-line: #else 

Each of the directives (if-line, elif-line, else-line, and #endif) appears alone on a line. The constant expressions in #if and subsequent #elif lines are evaluated in order until an expression with a non-zero value is found; text following a line with a zero value is discarded. The text following the successful directive line is treated normally. ``Text'' here refers to any material, including preprocessor lines, that is not part of the conditional structure; it may be empty. Once a successful #if or #elif line has been found and its text processed, succeeding #elif and #else lines, together with their text, are discarded. If all the expressions are zero, and there is an #else, the text following the #else is treated normally. Text controlled by inactive arms of the conditional is ignored except for checking the nesting of conditionals. 
每个指令（if-line、elif-line、else-line 和 `#endif`）单独出现在一行上。`#if` 和后续 `#elif` 行中的常量表达式按顺序求值，直到找到具有非零值的表达式；值为零的行之后的文本被丢弃。成功的指令行之后的文本被正常处理。这里的"文本"指任何材料，包括不属于条件结构部分的预处理器行；它可以为空。一旦找到成功的 `#if` 或 `#elif` 行并处理了其文本，后续的 `#elif` 和 `#else` 行连同其文本一起被丢弃。如果所有表达式都为零，且存在 `#else`，则 `#else` 之后的文本被正常处理。条件的非活动分支控制的文本被忽略，只检查条件是否嵌套。

The constant expression in #if and #elif is subject to ordinary macro replacement. Moreover, any expressions of the form 
`#if` 和 `#elif` 中的常量表达式要进行普通宏替换。此外，任何形如

defined identifier 

or 

defined (identifier) 

are replaced, before scanning for macros, by 1L if the identifier is defined in the preprocessor, and by 0L if not. Any identifiers remaining after macro expansion are replaced by 0L. Finally, each integer constant is considered to be suffixed with L, so that all arithmetic is taken to be long or unsigned long. 
在扫描宏之前，如果标识符在预处理器中已定义，则被替换为 `1L`，否则替换为 `0L`。宏展开之后剩余的任何标识符都被替换为 `0L`。最后，每个整数常量都被认为带有 `L` 后缀，因此所有算术都被视为 `long` 或 `unsigned long`。

The resulting constant expression (Par.A.7.19) is restricted: it must be integral, and may not contain sizeof, a cast, or an enumeration constant. 
所得的常量表达式（Par.A.7.19）受限：它必须是整型的，不能包含 `sizeof`、强制转换或枚举常量。

The control lines 
控制行

#ifdef identifier 

#ifndef identifier 

are equivalent to 

# if defined identifier 

# if ! defined identifier 

respectively. 
分别等价于。

#elif is new since the first edition, although it has been available is some preprocessors. The defined preprocessor operator is also new. 
`#elif` 是第一版之后新增的，尽管它在某些预处理器中早已可用。`defined` 预处理运算符也是新增的。

## A.12.6 Line Control

For the benefit of other preprocessors that generate C programs, a line in one of the forms 
为了对生成 C 程序的其他预处理器提供帮助，形如下面之一的行

# line constant "filename" 

# line constant 

使编译器出于错误诊断的目的认为：下一个源行的行号由十进制整数常量给出，当前输入文件由标识符命名。如果带引号的文件名缺失，记住的名字不变。该行中的宏在解释之前被展开。

## A.12.7 Error Generation

A preprocessor line of the form 
形如下面的预处理器行

# error token-sequence<sub>opt</sub> 

使预处理器写出一个包含该记号序列的诊断消息。

## A.12.8 Pragmas

A control line of the form 
形如下面的控制行

# pragma token-sequence<sub>opt</sub> 

使预处理器执行与实现相关的动作。无法识别的 pragma 被忽略。

## A.12.9 Null directive

A control line of the form 
形如下面的控制行

# 

没有效果。

## A.12.10 Predefined names

Several identifiers are predefined, and expand to produce special information. They, and also the preprocessor expansion operator defined, may not be undefined or redefined. 
若干标识符是预定义的，展开后产生特殊信息。它们以及预处理展开运算符 `defined`，不能被取消定义或重定义。

__LINE__ A decimal constant containing the current source line number. 
十进制常量，包含当前源行号。

__FILE__ A string literal containing the name of the file being compiled. 
字符串字面值，包含被编译文件的名字。

__DATE__ A string literal containing the date of compilation, in the form "Mmmm dd yyyy" 
字符串字面值，包含编译日期，形式为 "Mmmm dd yyyy"

__TIME__ A string literal containing the time of compilation, in the form "hh:mm:ss" 
字符串字面值，包含编译时间，形式为 "hh:mm:ss"

__STDC__ The constant 1. It is intended that this identifier be defined to be 1 only in standard-conforming implementations. 
常量 1。该标识符被定义为 1，仅用于符合标准的实现。

#error and #pragma are new with the ANSI standard; the predefined preprocessor macros are new, but some of them have been available in some implementations. 
`#error` 和 `#pragma` 是 ANSI 标准新增的；预定义的预处理器宏是新增的，但其中一些在某些实现中早已可用。

## A.13 Grammar

Below is a recapitulation of the grammar that was given throughout the earlier part of this appendix. It has exactly the same content, but is in different order. 
下面是本附录前面部分给出的文法的概要。它与前面完全相同，但顺序不同。

The grammar has undefined terminal symbols integer-constant, character-constant, floatingconstant, identifier, string, and enumeration-constant; the typewriter style words and symbols are terminals given literally. This grammar can be transformed mechanically into input acceptable for an automatic parser-generator. Besides adding whatever syntactic marking is used to indicate alternatives in productions, it is necessary to expand the ``one of'' constructions, and (depending on the rules of the parser-generator) to duplicate each production with an opt symbol, once with the symbol and once without. With one further change, namely deleting the production typedef-name: identifier and making typedef-name a terminal symbol, this grammar is acceptable to the YACC parser-generator. It has only one conflict, generated by the if-else ambiguity. 
该文法有未定义的终结符 integer-constant、character-constant、floating-constant、identifier、string 和 enumeration-constant；打字机体式的单词和符号是按字面给出的终结符。这个文法可以被机械地转换为自动分析器生成器可接受的输入。除了加上用于指示产生式候选的语法标记之外，还需要展开"one of"构造，并且（取决于分析器生成器的规则）将每个带有 opt 符号的产生式复制两份，一次带符号，一次不带。再做一个改变——删除产生式 typedef-name: identifier 并把 typedef-name 作为终结符——这个文法就可以被 YACC 分析器生成器接受。它只有一个冲突，由 if-else 二义性产生。

external-declaration: 

function-definition 

declaration 

function-definition: 

declaration-specifiers<sub>opt</sub> declarator declaration-list<sub>opt</sub> compound-statement 

declaration: 

declaration-specifiers init-declarator-list<sub>opt</sub>; 

declaration-list: 

declaration 

declaration-list declaration 

declaration-specifiers: 

storage-class-specifier declaration-specifiers<sub>opt</sub> 

type-specifier declaration-specifiers<sub>opt</sub> 

type-qualifier declaration-specifiers<sub>opt</sub> 

storage-class specifier: one of 

auto register static extern typedef 

type specifier: one of 

void char short int long float double signed 

unsigned struct-or-union-specifier enum-specifier typedef-name 

type-qualifier: one of 

const volatile 

struct-or-union-specifier: 

struct-or-union identifier<sub>opt</sub> { struct-declaration-list } 

struct-or-union identifier 

struct-or-union: one of 

struct union 

struct-declaration-list: 

struct declaration 

struct-declaration-list struct declaration 

init-declarator-list: 

init-declarator 

init-declarator-list, init-declarator 

init-declarator: 

declarator 

declarator = initializer 

struct-declaration: 

specifier-qualifier-list struct-declarator-list; 

specifier-qualifier-list: type-specifier specifier-qualifier-list<sub>opt</sub> type-qualifier specifier-qualifier-list<sub>opt</sub> 

struct-declarator-list: 

struct-declarator 

struct-declarator-list , struct-declarator 

struct-declarator: 

declarator 

declarator<sub>opt</sub> : constant-expression 

enum-specifier: 

enum identifier<sub>opt</sub> { enumerator-list } 

enum identifier 

enumerator-list: 

enumerator 

enumerator-list , enumerator 

enumerator: 

identifier 

identifier = constant-expression 

declarator: 

pointer<sub>opt</sub> direct-declarator 

direct-declarator: 

identifier 

(declarator) 

direct-declarator [ constant-expression<sub>opt</sub> ] 

direct-declarator ( parameter-type-list ) 

direct-declarator ( identifier-list<sub>opt</sub> ) 

pointer: 

* type-qualifier-list<sub>opt</sub> 

* type-qualifier-list<sub>opt</sub> pointer 

type-qualifier-list: type-qualifier type-qualifier-list type-qualifier 

parameter-type-list: parameter-list parameter-list , ... 

parameter-list: parameter-declaration parameter-list , parameter-declaration parameter-declaration: declaration-specifiers declarator declaration-specifiers abstract-declarator<sub>opt</sub> 

identifier-list: identifier identifier-list , identifier 

initializer: 

assignment-expression 

{ initializer-list } 

{ initializer-list , } 

initializer-list: initializer initializer-list , initializer 

type-name: specifier-qualifier-list abstract-declarator<sub>opt</sub> 

abstract-declarator: 

pointer 

pointer<sub>opt</sub> direct-abstract-declarator 

direct-abstract-declarator: ( abstract-declarator ) direct-abstract-declarator<sub>opt</sub> [constant-expression<sub>opt</sub>] direct-abstract-declarator<sub>opt</sub> (parameter-type-list<sub>opt</sub>) 

typedef-name: 

identifier 

statement: 

labeled-statement 

expression-statement 

compound-statement 

selection-statement 

iteration-statement 

jump-statement 

labeled-statement: 

identifier : statement 

case constant-expression : statement 

default : statement 

expression-statement: 

expression<sub>opt</sub>; 

compound-statement: { declaration-list<sub>opt</sub> statement-list<sub>opt</sub> } statement-list: statement statement-list statement 

selection-statement: if (expression) statement if (expression) statement else statement switch (expression) statement 

iteration-statement: while (expression) statement do statement while (expression); for (expression<sub>opt</sub>; expression<sub>opt</sub>; expression<sub>opt</sub>) statement 

jump-statement: goto identifier; continue; break; return expression<sub>opt</sub>; 

expression: assignment-expression expression , assignment-expression 

assignment-expression: conditional-expression unary-expression assignment-operator assignment-expression 

assignment-operator: one of 

= *= /= %= += -= <<= >>= &= ^= |= 

conditional-expression: logical-OR-expression logical-OR-expression ? expression : conditional-expression 

constant-expression: conditional-expression 

logical-OR-expression: logical-AND-expression logical-OR-expression || logical-AND-expression 

logical-AND-expression: inclusive-OR-expression logical-AND-expression && inclusive-OR-expression 

inclusive-OR-expression: exclusive-OR-expression inclusive-OR-expression | exclusive-OR-expression exclusive-OR-expression: AND-expression exclusive-OR-expression ^ AND-expression 

AND-expression: equality-expression AND-expression & equality-expression 

equality-expression: relational-expression equality-expression == relational-expression equality-expression != relational-expression 

relational-expression: shift-expression relational-expression < shift-expression relational-expression > shift-expression relational-expression <= shift-expression relational-expression >= shift-expression 

shift-expression: additive-expression shift-expression << additive-expression shift-expression >> additive-expression 

additive-expression: multiplicative-expression additive-expression + multiplicative-expression additive-expression - multiplicative-expression 

multiplicative-expression: multiplicative-expression * cast-expression multiplicative-expression / cast-expression multiplicative-expression % cast-expression 

cast-expression: unary expression (type-name) cast-expression 

unary-expression: postfix expression ++unary expression --unary expression unary-operator cast-expression sizeof unary-expression sizeof (type-name) 

unary operator: one of & * + - ~ ! 

postfix-expression: primary-expression postfix-expression[expression] 

postfix-expression(argument-expression-list<sub>opt</sub>) 

postfix-expression.identifier 

postfix-expression->+identifier 

postfix-expression++ 

postfix-expression-- 

primary-expression: identifier constant string (expression) 

argument-expression-list: 

assignment-expression 

assignment-expression-list , assignment-expression 

constant: 

integer-constant 

character-constant 

floating-constant 

enumeration-constant 

The following grammar for the preprocessor summarizes the structure of control lines, but is not suitable for mechanized parsing. It includes the symbol text, which means ordinary program text, non-conditional preprocessor control lines, or complete preprocessor conditional instructions. 
下面关于预处理器的文法概括了控制行的结构，但不适合机械化分析。它包括符号 text，表示普通程序文本、非条件的预处理器控制行或完整的预处理器条件指令。

control-line:

# define identifier token-sequence 

# define identifier(identifier, ... , identifier) token-sequence 

# undef identifier 

# include <filename> 

# include "filename" 

# line constant "filename" 

# line constant 

# error token-sequence<sub>opt</sub> 

# pragma token-sequence<sub>opt</sub> 

# 

preprocessor-conditional 

preprocessor-conditional: 

if-line text elif-parts else-part<sub>opt</sub> #endif 

if-line: 

# if constant-expression 

# ifdef identifier 

# ifndef identifier 

elif-parts: 

elif-line text 

elif-parts<sub>opt</sub> 

elif-line: 

# elif constant-expression 

else-part: 

else-line text 

else-line: 

#else 

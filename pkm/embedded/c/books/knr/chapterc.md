---
title: K&R C Appendix C
tags:
  - book
date: 2026-10-06
comment:
---


# Appendix C - Summary of Changes

Since the publication of the first edition of this book, the definition of the C language has undergone changes. Almost all were extensions of the original language, and were carefully designed to remain compatible with existing practice; some repaired ambiguities in the original description; and some represent modifications that change existing practice. Many of the new facilities were announced in the documents accompanying compilers available from AT&T, and have subsequently been adopted by other suppliers of C compilers. More recently, the ANSI committee standardizing the language incorporated most of the changes, and also introduced other significant modifications. Their report was in part participated by some commercial compilers even before issuance of the formal C standard. 
自本书第一版出版以来，C 语言的定义经历了许多变化。其中绝大多数是对原有语言的扩充，并且经过精心设计以保持与已有实践的兼容；一些修复了原始描述中的歧义；还有一些则代表了对已有实践的改变。许多新特性是在 AT&T 提供的编译器所附带的文档中宣布的，随后被其他 C 编译器供应商采纳。最近，负责将该语言标准化的 ANSI 委员会吸纳了其中的大部分变化，同时还引入了其他一些重要的修改。在正式的 C 标准发布之前，他们的报告已经有部分被一些商业编译器所实现。

This Appendix summarizes the differences between the language defined by the first edition of this book, and that expected to be defined by the final standard. It treats only the language itself, not its environment and library; although these are an important part of the standard, there is little to compare with, because the first edition did not attempt to prescribe an environment or library. 
本附录总结了本书第一版所定义的语言与最终标准预期定义的语言之间的差异。它只涉及语言本身，而不涉及语言的环境和库；尽管环境和库是标准的重要组成部分，但没有什么可比较的，因为第一版并没有试图规定环境和库。

Preprocessing is more carefully defined in the Standard than in the first edition, and is extended: it is explicitly token based; there are new operators for concatenation of tokens (##), and creation of strings (#); there are new control lines like #elif and #pragma; redeclaration of macros by the same token sequence is explicitly permitted; parameters inside strings are no longer replaced. Splicing of lines by \ is permitted everywhere, not just in strings and macro definitions. See Par.A.12. 
与第一版相比，标准对预处理的定义更加严格，并且进行了扩充：预处理明确地基于记号（token）；增加了用于记号拼接的运算符（##）和创建字符串的运算符（#）；新增了诸如 #elif 和 #pragma 之类的控制行；用同一记号序列重新声明宏被明确允许；字符串内部的参数不再被替换。通过 \ 拼接行现在在任何地方都是允许的，而不仅限于字符串和宏定义中。参见 Par.A.12。

• The minimum significance of all internal identifiers increased to 31 characters; the smallest mandated significance of identifiers with external linkage remains 6 monocase letters. (Many implementations provide more.) 
• 所有内部标识符的最小有效长度增加到 31 个字符；具有外部链接（external linkage）的标识符要求的最小有效长度仍为 6 个单一大小的字母。（许多实现提供了更多。）

• Trigraph sequences introduced by ?? allow representation of characters lacking in some character sets. Escapes for #\^[]{}|~ are defined, see Par.A.12.1. Observe that the introduction of trigraphs may change the meaning of strings containing the sequence ??. 
• 由 ?? 引入的三符序列（trigraph sequences）使得某些字符集中缺失的字符可以得到表示。为 #\^[]{}|~ 定义的转义见 Par.A.12.1。注意，三符序列的引入可能会改变包含 ?? 序列的字符串的含义。

• New keywords (void, const, volatile, signed, enum) are introduced. The stillborn entry keyword is withdrawn. 
• 引入了新的关键字（void、const、volatile、signed、enum）。夭折的 entry 关键字被撤销。

• New escape sequences, for use within character constants and string literals, are defined. The effect of following \ by a character not part of an approved escape sequence is undefined. See Par.A.2.5.2 
• 定义了新的转义序列，用于字符常量和字符串字面值中。在 \ 之后跟一个不属于认可的转义序列的字符，其效果是未定义的。参见 Par.A.2.5.2

• Everyone's favorite trivial change: 8 and 9 are not octal digits. 
• 人人都喜欢的微小变化：8 和 9 不是八进制数字。

The standard introduces a larger set of suffixes to make the type of constants explicit: U or L for integers, F or L for floating. It also refines the rules for the type of unsiffixed constants (Par.A.2.5). 
标准引入了更大的一组后缀以显式指定常量的类型：对整数用 U 或 L，对浮点数用 F 或 L。它还细化了无后缀常量的类型规则（Par.A.2.5）。

• Adjacent string literals are concatenated. 
• 相邻的字符串字面值会被拼接。

• There is a notation for wide-character string literals and character constants; see Par.A.2.6. 
• 增加了宽字符字符串字面值和宽字符常量的表示法；参见 Par.A.2.6。

• Characters as well as other types, may be explicitly declared to carry, or not to carry, a sign by using the keywords signed or unsigned. The locution long float as a synonym for double is withdrawn, but long double may be used to declare an extraprecision floating quantity. 
• 字符类型以及其他类型一样，都可以使用关键字 signed 或 unsigned 显式声明为带符号或不带符号。作为 double 同义词的 long float 说法被撤销，但可以使用 long double 来声明扩展精度的浮点量。

• For some time, type unsigned char has been available. The standard introduces the signed keyword to make signedness explicit for char and other integral objects. 
• 一段时间以来，unsigned char 类型已经可用。标准引入 signed 关键字，用于为 char 及其他整型对象显式指定符号性。

The void type has been available in most implementations for some years. The Standard introduces the use of the void * type as a generic pointer type; previously char * played this role. At the same time, explicit rules are enacted against mixing pointers and integers, and pointers of different type, without the use of casts. 
void 类型在大多数实现中已经可用多年。标准引入了 void * 类型作为通用指针类型；在此之前，这个角色由 char * 扮演。同时，标准制定了明确的规则，禁止在不使用强制类型转换的情况下混用指针与整数，以及混用不同类型的指针。

• The Standard places explicit minima on the ranges of the arithmetic types, and mandates headers (<limits.h> and <float.h>) giving the characteristics of each particular implementation. 
• 标准对算术类型的取值范围规定了明确的最小值，并强制要求提供头文件（`<limits.h>` 和 `<float.h>`）来说明每个特定实现的特性。

• Enumerations are new since the first edition of this book. 
• 枚举是本书第一版之后新增的。

• The Standard adopts from C++ the notion of type qualifier, for example const (Par.A.8.2). 
• 标准从 C++ 借鉴了类型限定符（type qualifier）的概念，例如 const（Par.A.8.2）。

• Strings are no longer modifiable, and so may be placed in read-only memory. 
• 字符串不再是可修改的，因此可以放置在只读内存中。

• The "usual arithmetic conversions" are changed, essentially from "for integers, unsigned always wins; for floating point, always use double" to "promote to the smallest capacious-enough type." See Par.A.6.5. 
• “通常算术转换（usual arithmetic conversions）”发生了变化，基本上从“对整数而言，unsigned 总是获胜；对浮点数而言，总是使用 double”改成了“提升到能够容纳的最小类型”。参见 Par.A.6.5。

• The old assignment operators like =+ are truly gone. Also, assignment operators are now single tokens; in the first edition, they were pairs, and could be separated by white space. 
• 像 =+ 这样的旧赋值运算符被彻底废除了。此外，赋值运算符现在是单个记号；在第一版中，它们是成对的，可以由空白分隔。

• A compiler's license to treat mathematically associative operators as computationally associative is revoked. 
• 编译器将数学上可结合的运算符当作计算上可结合来处理的许可被撤销了。

• A unary + operator is introduced for symmetry with unary -. 
• 为了与一元 - 对称，引入了一元 + 运算符。

• A pointer to a function may be used as a function designator without an explicit * operator. See Par.A.7.3.2. 
• 指向函数的指针可以不经显式 * 运算符而直接用作函数指示符。参见 Par.A.7.3.2。

• Structures may be assigned, passed to functions, and returned by functions. 
• 结构可以赋值、传递给函数，也可以由函数返回。

• Applying the address-of operator to arrays is permitted, and the result is a pointer to the array. 
• 允许对数组使用取地址运算符，其结果是指向该数组的指针。

The sizeof operator, in the first edition, yielded type int; subsequently, many implementations made it unsigned. The Standard makes its type explicitly implementation-dependent, but requires the type, size_t, to be defined in a standard header (<stddef.h>). A similar change occurs in the type (ptrdiff_t) of the difference between pointers. See Par.A.7.4.8 and Par.A.7.7. 
sizeof 运算符在第一版中产生 int 类型的结果；随后，许多实现将其改为 unsigned。标准将其类型明确地规定为实现相关的，但要求该类型 size_t 在标准头文件（`<stddef.h>`）中定义。指针之差的类型（ptrdiff_t）也发生了类似的变化。参见 Par.A.7.4.8 和 Par.A.7.7。

• The address-of operator & may not be applied to an object declared register, even if the implementation chooses not to keep the object in a register. 
• 取地址运算符 & 不得作用于声明为 register 的对象，即使实现选择不把该对象保存在寄存器中。

• The type of a shift expression is that of the left operand; the right operand can't promote the result. See Par.A.7.8. 
• 移位表达式的类型是左操作数的类型；右操作数不能提升结果的类型。参见 Par.A.7.8。

The Standard legalizes the creation of a pointer just beyond the end of an array, and allows arithmetic and relations on it; see Par.A.7.7. 
标准使创建恰好指向数组末尾之后位置的指针成为合法，并允许对其进行算术运算和关系比较；参见 Par.A.7.7。

The Standard introduces (borrowing from C++) the notion of a function prototype declaration that incorporates the types of the parameters, and includes an explicit recognition of variadic functions together with an approved way of dealing with them. See Pars. A.7.3.2, A.8.6.3, B.7. The older style is still accepted, with restrictions. 
标准引入了（借鉴自 C++）函数原型声明的概念，即在声明中包含参数的类型，并明确承认了可变参数函数，同时给出了处理它们的认可方式。参见 Par.A.7.3.2、Par.A.8.6.3、Par.B.7。旧式的声明仍然被接受，但有限制。

• Empty declarations, which have no declarators and don't declare at least a structure, union, or enumeration, are forbidden by the Standard. On the other hand, a declaration with just a structure or union tag redeclares that tag even if it was declared in an outer scope. 
• 空声明——既没有声明符，又至少未声明一个结构、联合或枚举——被标准禁止。另一方面，仅含结构或联合标记的声明会重新声明该标记，即使它已在外层作用域中声明过。

• External data declarations without any specifiers or qualifiers (just a naked declarator) are forbidden. 
• 没有任何类型说明符或限定符的外部数据声明（只有一个光秃秃的声明符）被禁止。

Some implementations, when presented with an extern declaration in an inner block, would export the declaration to the rest of the file. The Standard makes it clear that the scope of such a declaration is just the block. 
一些实现在遇到内层块中的 extern 声明时，会将该声明导出到文件的其余部分。标准明确规定，这种声明的作用域仅仅是该块。

• The scope of parameters is injected into a function's compound statement, so that variable declarations at the top level of the function cannot hide the parameters. 
• 参数的作用域被注入到函数的复合语句中，因此函数顶层处的变量声明不能隐藏参数。

• The name spaces of identifiers are somewhat different. The Standard puts all tags in a single name space, and also introduces a separate name space for labels; see Par.A.11.1. Also, member names are associated with the structure or union of which they are a part. (This has been common practice from some time.) 
• 标识符的名字空间有些不同。标准将所有标记放入同一个名字空间，并为标号引入了一个单独的名字空间；参见 Par.A.11.1。此外，成员名与其所属的结构或联合相关联。（这种做法一段时间以来已是常见实践。）

• Unions may be initialized; the initializer refers to the first member. 
• 联合可以初始化；初始化式针对其第一个成员。

• Automatic structures, unions, and arrays may be initialized, albeit in a restricted way. 
• 自动结构、联合和数组也可以初始化，尽管方式有所限制。

• Character arrays with an explicit size may be initialized by a string literal with exactly that many characters (the \0 is quietly squeezed out). 
• 具有显式大小的字符数组可以用恰好包含同样多字符的字符串字面值来初始化（\0 被悄悄地挤掉）。

• The controlling expression, and the case labels, of a switch may have any integral type. 
• switch 的控制表达式和 case 标号可以是任何整型。
---
title: 10 Data access
tags:
  - book
date: 2026-10-08
comment:
---
# 10 Data access

This chapter covers

- Storing and retrieving data with Pulsar Functions

- Using Pulsar’s internal state mechanism for data storage and retrieval

- Accessing data from external systems with Pulsar Functions

本章内容包括

- 用 Pulsar Functions 存取数据

- 利用 Pulsar 的内部状态机制来做数据存储与检索

- 用 Pulsar Functions 从外部系统访问数据

Thus far all of the information used by our Pulsar Functions has been provided inside the incoming messages. While this is an effective way to exchange information, it is not the most efficient or desirable way for Pulsar Functions to exchange information with one another. The biggest drawback to this approach is that it creates a dependency on the message source to provide your Pulsar function with the information it needs to do its job. This violates the encapsulation principle of object-oriented design, which dictates that the internal logic of a function should not be exposed to the outside world. Currently, any changes to the logic inside one function might require changes to the upstream function that provides the incoming messages.

到目前为止，我们的 Pulsar Functions 所使用的一切信息，都是由传入的消息提供的。虽然这是一种有效的信息交换方式，但它并不是 Pulsar Functions 彼此之间交换信息时最高效、也最理想的做法。这种做法最大的弊端在于：它造成了一种对消息源的依赖——你的 Pulsar 函数必须靠消息源来提供它完成工作所需的信息。这违反了面向对象设计中的封装原则，而封装原则要求一个函数内部的实现逻辑不应当暴露给外部世界。就目前而言，某个函数内部逻辑的任何改动，都可能需要那个提供传入消息的上游函数跟着改。

Consider a use case where you are writing a function that requires a customer’s contact information, including their cell phone number. Rather than passing a message containing all of that information, wouldn’t it be easier to just pass the customer ID, which can then be used by our function to query the database and retrieve the information we need instead? In fact, this is a common access pattern if the information required by the function exists in an external data source, such as a database. This approach enforces encapsulation and prevents changes in one function from directly impacting other functions by relying on each function to gather the information it needs instead of providing it inside the incoming message.

来考虑这样一个用例：你正在编写一个需要客户联系方式（包括手机号码）的函数。与其传递一条包含全部这些信息的消息，不如只传递客户 ID，让我们的函数拿它去查询数据库、取回所需的信息，这样岂不是更省事？事实上，如果函数所需的那份信息本来就存在于某个外部数据源（例如数据库）中，这是一种很常见的访问模式。这种做法强化了封装性，并且通过让每个函数自行去收集它所需要的信息、而不是把信息塞在传入消息里，避免了一个函数中的改动直接波及到其他函数。

In this chapter, I will walk through several uses cases that need to store and/or retrieve data from an external system and demonstrate how to do so using Pulsar Functions. In doing so, I will cover a variety of different data stores and describe the various criteria used to select one technology over another.

在本章中，我将逐个走查若干需要向外部系统存储和/或检索数据的用例，并演示如何用 Pulsar Functions 来完成这些操作。在此过程中，我会涉及多种不同的数据存储，并说明在选用某一种技术而非另一种时所依据的各项标准。


## 子目录

- [10.1 Data sources](<10-data-access/10.1-data-sources.md>)
- [10.2 Data access use cases](<10-data-access/10.2-data-access-use-cases.md>)
- [Summary](<10-data-access/summary.md>)

---
title: Summary
tags:
  - book
date: 2026-10-08
comment:
---
# Summary
- Pulsar Functions can be used to provide near real-time machine learning on streaming data to produce actionable insights.
  Pulsar Functions 可以被用来对流式数据提供近乎实时的机器学习，以产出可付诸行动的洞察。

- Providing near real-time predictions requires an ML model that takes a pre-defined set of inputs, known as a feature set.
  要提供近乎实时的预测，需要一个接收一组预先定义好的输入（即所谓的特征集）的 ML 模型。

- A feature is a numeric representation of an individual aspect of an object, such as the average meal preparation time of a restaurant.
  一个特征就是某个对象某个侧面的数值化表示，例如某家餐厅的平均备餐时间。

- Most features within a feature vector cannot be calculated using the data from a single message, nor can they be computed in a timely manner. Therefore, it is common to have ancillary processing compute these values in the background and store them in a low-latency data store.
  特征向量中的大多数特征，既无法用单条消息中的数据算出来，也无法被及时地计算出来。因此，常见的做法是让辅助处理在后台计算出这些值，并把它们存放在一个低延迟的数据存储中。

- The predictive model markup language (PMML) is a standard format for representing ML models developed in a variety of languages, which helps make ML models portable.
  预测模型标记语言（PMML）是一种用于表示用各种语言开发出来的 ML 模型的标准格式，它有助于让 ML 模型具备可移植性。

- There is an open-source Java-based project that supports the evaluation of PMML models, which allows us to easily execute any PMML-supported model inside a Pulsar function.
  有一个基于 Java 的开源项目支持对 PMML 模型做评估，这让我们能够轻松地在一个 Pulsar 函数中执行任何 PMML 支持的模型。

- You can use other language-specific libraries to execute non-PMML models inside Pulsar Functions as well.
  你也可以使用其他特定于语言的库，在 Pulsar Functions 内部执行非 PMML 的模型。

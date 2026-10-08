---
title: 12 Edge analytics
tags:
  - book
date: 2026-10-08
comment:
---
# 12 Edge analytics

This chapter covers

- Using Pulsar for edge computing

- Using Pulsar to perform edge analytics

- Performing anomaly detection on the edge using Pulsar Functions

- Performing statistical analytics on the edge using Pulsar Functions

本章内容包括

- 用 Pulsar 做边缘计算

- 用 Pulsar 执行边缘分析

- 用 Pulsar Functions 在边缘侧执行异常检测

- 用 Pulsar Functions 在边缘侧执行统计分析

If you are like most people, when you hear the term the *Internet of Things* (IoT), you tend to think of smart thermostats, internet-connected refrigerators, or personal data assistants, such as Alexa. While these consumer-oriented IoT devices tend to get a lot of attention, there is a subset of IoT called the *industrial internet of things* (IIoT), which focuses on the use of sensors that are connected to machinery and vehicles within the transport, energy, and industrial sectors. Companies use the information collected from sensors that are physically embedded inside industrial equipment to monitor, automate, and predict all kinds of industrial processes and outcomes.

如果你和大多数人一样，那么当你听到*物联网*（Internet of Things，IoT）这个词时，往往会想到智能恒温器、联网冰箱，或者 Alexa 这样的个人数据助理。虽然这些面向消费者的 IoT 设备往往吸引了大量关注，但 IoT 还有一个被称为*工业物联网*（industrial internet of things，IIoT）的子集，它聚焦于那些被连接到交通、能源和工业领域中机械装备与车辆上的传感器。企业利用从那些被物理嵌入工业设备内部的传感器所采集到的信息，来监控、自动化并预测各种各样的工业流程与产出。

The data collected from these IIoT sensors has several practical applications, including monitoring tens of thousands of miles of remote industrial equipment within the energy industry to ensure that there are no imminent failures that could lead to a catastrophic event resulting in a large environmental impact. Sensor data can also be gathered from non-stationary IIoT sensors, such as in a large fleet of refrigerated tractor trailers used to distribute a vaccine that must be kept below a certain temperature in order to remain effective across the globe. These sensors allow us to detect a gradual warming within any given refrigeration unit and reroute the cargo to a nearby maintenance facility for repairs.

从这些 IIoT 传感器采集到的数据有着若干实际用途，其中包括：在能源行业内监控绵延数万英里的偏远工业设备，以确保不存在任何可能导致灾难性事件、进而造成重大环境影响的迫近故障。传感器数据也可以从那些非固定式的 IIoT 传感器上收集，例如一支庞大的冷藏半挂车队——它们被用来在全球范围内配送某种疫苗，而这种疫苗必须被保持在某个温度以下才能维持效力。这些传感器让我们能够探测到任何一个冷藏单元内的逐渐升温，并把货物改道送往附近的维修设施去修理。

In such a situation, it is important that we detect the change in temperature within the refrigeration units as soon as possible so we can react in time to preserve the heat-sensitive cargo. If we waited until the cargo arrived at its intended destination before we checked the temperature, it would be too late, and the vaccine would be useless. This phenomenon is often referred to as the diminishing time value of data, since the value obtained from the information is at its highest point immediately after the event occurs, and it rapidly diminishes over time. In the case of the refrigeration unit failure, the sooner we can react to that information, the better. If we are unaware of the failure for hours, the cargo is most likely going to spoil, and the information will no longer be actionable because it will be too late to do anything about it. As you can see in figure 12.1, the longer the response time to such a catastrophic event, the less impact any remedial action will have on the system.

在这种情况下，重要的是我们要尽快探测出这些冷藏单元内的温度变化，以便能及时做出反应，保住那批对热敏感的货物。如果我们要等到货物抵达预定目的地之后才去检查温度，那就太晚了，疫苗也就没用了。这种现象通常被称为数据的时值递减（diminishing time value of data）——因为从这些信息中获得的价值，在事件刚发生的那一刻处于最高点，随后会随时间迅速衰减。就冷藏单元故障而言，我们对这条信息做出反应的速度越快越好。如果我们几个小时都没察觉到这个故障，货物多半就已经变质了，而这条信息也就不再可付诸行动了，因为届时再做什么都为时已晚。从图 12.1 中可以看到，对这样一个灾难性事件的响应时间拖得越久，任何补救措施对系统所能产生的影响就越小。

![](assets/CH12_F01_Kjerrumgaard.png)

Figure 12.1 The value of any piece of information diminishes rapidly over time, and the goal of edge computing is to reduce the overall decision latency by eliminating the capture latency produced by transmitting the data from the sensor to the cloud for analysis.

图 12.1 任何一条信息的价值都会随时间迅速衰减；而边缘计算的目标，就是通过消除"把数据从传感器传送到云端去分析"所产生的采集延迟，来降低总体的决策延迟。

The amount of time between when an event occurs and when a corresponding action is taken in response is known as the decision latency and is comprised of two components: the *capture latency*, which is the amount of time required to transfer the data to your analysis software, and the *analysis latency*, which is the amount of time required to analyze the data to determine what action to take.

从某个事件发生、到针对它采取相应行动之间所经过的时间长度，被称为决策延迟（decision latency），它由两个部分构成：*采集延迟*（capture latency），即把数据传输给你的分析软件所需的时间；以及*分析延迟*（analysis latency），即分析这些数据、以决定采取什么行动所需的时间。

From a technological perspective, the IIoT provides the same basic capability as any other “smart” consumer IoT device, which refers to the automated instrumentation and reporting capabilities of physical devices that previously did not have those capabilities. For example, the defining characteristic of a “smart” thermostat is that it can communicate its current reading and be adjusted remotely via a smartphone app. That being said, the scale of a typical IIoT deployment is significantly larger than a simple system that lets you adjust your thermostat from your phone.

从技术角度看，IIoT 提供的是与任何其他"智能"消费级 IoT 设备相同的基本能力——也就是让那些此前并不具备自动化检测与上报能力的物理设备，获得这些能力。举例来说，一个"智能"恒温器的决定性特征是：它能够上报自己当前的读数，并且可以通过一个智能手机应用被远程调节。话虽如此，一个典型 IIoT 部署的规模，要比那种让你能用手机调节恒温器的简单系统大得多。

With potentially millions of sensors spread across a single factory plant floor or a large fleet of tractor trailers, each of which is producing a new metric every second, one can easily see that these IIoT datasets are both high volume and high frequency. A common approach to processing these datasets is to collect all of the individual data elements, transfer them to the cloud, and use traditional SQL-based data analysis tools, such as Apache Hive, or more traditional data warehouses. This ensures that the analysis is done on a complete dataset from all of the sensors, so any inter-sensor reading relationships can be observed and used for analysis (e.g., the correlation between a temperature sensor and the overall plant humidity from a different sensor can be tracked and analyzed).

在单个工厂的车间地面或一支庞大的半挂车队中，可能散布着数以百万计的传感器，而每一个传感器每秒都在产出一条新的指标——由此很容易看出，这些 IIoT 数据集既具有高体量、又具有高频率的特点。处理这些数据集的一种常见做法是：把所有单个的数据元素都收集起来，把它们传输到云端，然后使用传统的、基于 SQL 的数据分析工具（例如 Apache Hive），或者更传统的数据仓库。这确保了分析是在来自所有传感器的完整数据集上进行的，因此任何跨传感器的读数关系都能被观察到并用于分析（例如，某个温度传感器与来自另一个传感器的全厂整体湿度之间的相关性，就可以被跟踪和分析）。

However, this approach has some serious disadvantages, such as significant decision latency (the time between when the event occurred and when it gets processed), cost inefficiencies associated with having to provision sufficient network bandwidth and computing resources to process such large datasets, and the storage cost of retaining all of this information.

然而，这种做法也有一些严重的弊端，例如显著的决策延迟（从事件发生到它被处理之间的时间）、因不得不配置足够多的网络带宽与计算资源来处理如此庞大的数据集而产生的成本效率问题，以及留存全部这些信息所需的存储成本。

From a practical perspective, the amount of the time required to transfer data from most IIoT platforms to a cloud computing environment for analysis makes it nearly impossible to perform any real-time reaction to a potentially catastrophic event. While some of the most dramatic examples of such an event include the detection of faults in power plants or airplanes before they explode or crash, the speed of data analysis in most IIoT applications is critical as well.

从实践角度看，把数据从大多数 IIoT 平台传输到一个云计算环境去分析所需的时间，使得对某个潜在灾难性事件做出任何实时反应几乎成为不可能。虽然这类事件中最引人注目的一些例子，包括在发电厂或飞机爆炸、坠毁之前检测出其故障，但在大多数 IIoT 应用中，数据分析的速度同样是至关重要的。

In order to overcome this limitation, some of the data processing and analysis of IIoT data can be performed on infrastructure that is physically located closer to the source of the data itself. Bringing computation closer to the source of the data decreases the capture latency and allows applications to respond to data as it’s being created almost instantaneously rather than having to wait for the information to be transmitted over the internet before processing it. This practice of processing data near the edge of the network where the data is being generated, instead of in a centralized data collection point such as a data center or cloud, is often referred to as *edge computing*.

为了克服这一限制，IIoT 数据的一部分处理与分析工作，可以在那些物理位置上更靠近数据本身来源的基础设施上来完成。把计算搬到更靠近数据来源的地方，会缩短采集延迟，并让应用能够在数据正在被产生的那一刻就几乎即时地对其做出响应，而不必先等信息通过互联网被传输出去、再进行处理。这种在数据正被生成的网络边缘附近处理数据、而不是在数据中心或云端这类集中式数据采集点处理数据的做法，通常被称为*边缘计算*（edge computing）。

In this chapter, I’ll demonstrate how we can deploy Pulsar Functions inside an edge computing environment to provide near real-time data processing and analysis to react more quickly to events within an IIoT environment and minimize the decision latency between the time a high-value event is perceived and when the appropriate response is made.

在本章中，我将演示如何在一个边缘计算环境中部署 Pulsar Functions，以提供近乎实时的数据处理与分析，从而对 IIoT 环境中的事件做出更快的反应，并把"感知到一个高价值事件的时刻"与"做出恰当响应的时刻"之间的决策延迟降到最低。


## 子目录

- [12.1 IIoT architecture](<12-edge-analytics/12.1-iiot-architecture.md>)
- [12.2 A Pulsar-based processing layer](<12-edge-analytics/12.2-a-pulsar-based-processing-layer.md>)
- [12.3 Edge analytics](<12-edge-analytics/12.3-edge-analytics.md>)
- [12.4 Univariate analysis](<12-edge-analytics/12.4-univariate-analysis.md>)
- [12.5 Multivariate analysis](<12-edge-analytics/12.5-multivariate-analysis.md>)
- [12.6 Beyond the book](<12-edge-analytics/12.6-beyond-the-book.md>)
- [Summary](<12-edge-analytics/summary.md>)

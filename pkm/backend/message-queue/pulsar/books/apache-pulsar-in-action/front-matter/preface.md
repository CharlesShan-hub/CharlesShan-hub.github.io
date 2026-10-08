## preface

Back in 2012, the Yahoo! team was looking for a global, geo-replicated platform that could stream all of Yahoo!’s messaging data between various apps such as Yahoo Mail and Yahoo Finance. At the time, there were generally two types of systems to handle in-motion data: message queues that handled mission-critical business events in real-time, and streaming systems that handled scalable data pipelines at scale. But there wasn’t a platform that provided both capabilities that Yahoo required.

早在 2012 年，Yahoo! 团队就在寻找一个全球化、支持异地复制的平台，能够把 Yahoo! 的全部消息数据在 Yahoo Mail、Yahoo Finance 等各个应用之间流式地传起来。当时，用来处理"运动中的数据"的系统大体上有两类：一类是消息队列，实时处理那些关键任务型的业务事件；另一类是流式系统，大规模地处理可扩展的数据流水线。但并不存在一个能同时提供 Yahoo 所需这两种能力的平台。

After vetting the messaging and streaming landscape, it became clear that existing technologies were not able to serve their needs, so the team at Yahoo! started working on building a unified messaging and streaming platform for in-motion data named Pulsar. After 4 years of operation across 10 datacenters processing billions of messages per day, Yahoo! decided to open source its messaging platform under the Apache license in 2016.

在仔细评估了消息与流式领域的全景之后，人们清楚地看到：现有技术都无法满足他们的需求。于是 Yahoo! 的团队开始动手为"运动中的数据"构建一个统一的消息与流式平台，并将其命名为 Pulsar。在横跨 10 个数据中心、每天处理数十亿条消息地运行了 4 年之后，Yahoo! 于 2016 年决定以 Apache 许可证将自己的这个消息平台开源出来。

I first encountered Pulsar in the fall of 2017. I was leading the professional services team at Hortonworks focused on the streaming data platform known as Hortonworks Data Flow (HDF) that comprised Apache NiFi, Kafka, and Storm. It was my job to oversee the deployment of these technologies into a customer’s infrastructure and help them get started developing streaming applications.

我第一次接触 Pulsar 是在 2017 年秋天。当时我在 Hortonworks 领导专业服务团队，专注于那个被称为 Hortonworks Data Flow（HDF）的流式数据平台——它由 Apache NiFi、Kafka 和 Storm 组成。我的职责是监督把这些技术部署到客户的基础设施中，并帮助他们着手开发流式应用。

The greatest challenge we faced when working with Kafka was helping our customers administer it properly, and specifically determining the proper number of partitions for a given topic to achieve a proper balance of speed and efficiency while allowing for future data growth. Those of you that are familiar with Kafka are painfully aware of the fact that this seemingly simple decision has a profound impact on the scalability of your topics, and the process of changing this value (even from 3 to 4) necessitates a rebalancing process that is slow and results in the rebalancing topic being unavailable for reading or writing during the entire process.

我们在使用 Kafka 时面临的最大挑战，是帮助客户妥善地管理它——具体而言，是为某个给定主题确定恰当的分区数量，以便在速度、效率之间取得恰当的平衡，同时还能为未来的数据增长留出余地。那些熟悉 Kafka 的人都会痛苦地意识到这样一个事实：这个看似简单的决定，却对你各个主题的可扩展性有着深远的影响；而修改这个值的过程（哪怕只是从 3 改到 4）都必然伴随着一次再均衡过程——它十分缓慢，并且会导致那个正在再均衡的主题在整个过程中都无法被读写。

This rebalancing requirement was universally disliked by all the customers who were using HDF, and rightfully so, because they saw it as a clear impediment to their ability to scale the Kafka cluster as their data volumes grew. They knew from experience just how difficult it was to scale their messaging platform up and down. Even worse was the fact that we could not simply “drop in” a few more nodes to add computing capacity to our customer’s existing cluster without also reconfiguring the topics to use them by assigning more partitions to the existing topics to have the data redistributed onto the recently added nodes. This inability to horizontally scale out their streaming capacity without manual (or heavily scripted) intervention was in direct conflict with most of our customers’ desires to move their messaging platforms to the cloud and capitalize on the elastic computing capability the cloud provides.

所有使用 HDF 的客户都普遍厌恶这个再均衡的要求，而且他们的反感是完全有道理的——因为他们把它视为一个明显的阻碍：随着自身数据量增长，他们扩展 Kafka 集群的能力被卡住了。他们从经验中深知，把自己的消息平台扩上去、再缩下来有多么困难。更糟的是这样一个事实：我们不能简单地"丢进"几个新节点，就能为客户现有的集群增加计算能力——除非同时重新配置各个主题来使用它们，也就是给现有主题分配更多分区，好让数据被重新分布到那些新近加入的节点上。这种"不靠人工（或大量脚本）干预就无法横向扩展流式处理能力"的状况，与我们大多数客户的愿望是直接冲突的：他们希望能把自己的消息平台搬上云，并充分利用云所提供的弹性计算能力。

That is when I discovered the Apache Pulsar platform and found its claim to be “cloud-native” especially appealing because it addressed both scalability pain points. While HDF had allowed my customers to get started quickly, they found it difficult to manage and not architected to run in the cloud. I realized that Apache Pulsar was a much better solution than what we were currently offering to our customers and tried to convince our product team to consider replacing Kafka with Pulsar in our HDF product. I even went so far as to write connectors that allowed it to work with the Apache NiFi component of our stack to facilitate that adoption, but to no avail.

就在那时，我发现了 Apache Pulsar 这个平台，并且觉得它"云原生"的自我定位格外有吸引力——因为它同时解决了上述两个可扩展性痛点。虽然 HDF 让我的客户能够快速上手，但他们发现它难以管理，而且其架构并不是为运行在云上而设计的。我意识到，Apache Pulsar 比起我们当时提供给客户的方案要好得多，于是便试图说服我们的产品团队考虑在 HDF 产品中把 Kafka 换成 Pulsar。我甚至还专门写了一些连接器，让它能与我们技术栈中的 Apache NiFi 组件协同工作，以推动这项采用——但毫无结果。

When I was approached by the original developers of Apache Pulsar in January of 2018 and offered the opportunity to join a small start-up called Streamlio, I immediately jumped at the chance to work with them. Pulsar was a young project back then, having just been placed into the Apache incubation program, and we spent the next 15 months working to get our fledgling “podling” through the incubation process and promoted to top-level project status.

2018 年 1 月，当 Apache Pulsar 的最初开发者们找到我、并给我机会加入一家名为 Streamlio 的小型初创公司时，我立刻抓住了这个与他们共事的机会。Pulsar 在当时还是个年轻的项目，刚刚被放进 Apache 的孵化计划；在接下来的 15 个月里，我们一直在努力，让我们这个羽翼未丰的"孵化项目"（podling）走完孵化流程，并被提升为顶级项目。

This was during the height of the streaming data hype, and Kafka was the dominant player in the space, so naturally everyone considered the terms interchangeable. The consensus was that Kafka was the only data-streaming platform available. I knew better from my prior experiences and took it upon myself to relentlessly evangelize what I knew to be a technologically superior solution—a lonely voice shouting in the proverbial wilderness.

那正是流式数据炒作最盛的时期，而 Kafka 是这个领域里占据主导地位的玩家，因此大家自然地把这两个词当作可以互换的。当时的共识是：Kafka 是唯一可用的数据流式平台。而我基于此前的经历知道事实并非如此，于是把不遗余力地布道那个我深知在技术上更优越的方案，当成了自己的责任——一个在众所周知的荒野中呼喊的孤独声音。

By the spring of 2019, the Apache Pulsar community had experienced tremendous growth in terms of contributors and users, but there was a profound lack of reliable documentation on the technology. So, when the prospect of writing *Apache* *Pulsar in Action* was first proposed to me, I immediately seized upon it as an opportunity to address the glaring need within the Pulsar community. While I was never able to convince my colleagues to join me in this endeavor, they were an invaluable source of guidance and information throughout the process and have used this book as a means of transferring some of their knowledge to you.

到了 2019 年春天，Apache Pulsar 社区在贡献者和用户两方面都经历了巨大的增长，但关于这项技术的可靠文档却严重匮乏。因此，当有人第一次向我提出撰写《Apache Pulsar in Action》的设想时，我立刻把它抓在了手里，视其为填补 Pulsar 社区这一明显需求的机会。虽然我始终没能说服我的同事们加入这项事业，但在整个过程中，他们一直是指导和信息的宝贵来源；而他们也把这本书当作一种途径，把他们的部分知识传递给了你。

This book is targeted to individuals who are brand new to Pulsar, and is a combination of the information I gathered while working directly with the project founders when they were actively developing Pulsar, along with experience gained from working directly with organizations that have adopted Apache Pulsar in production.

这本书面向的是那些对 Pulsar 完全陌生的读者；它是两类内容的结合：一类是我在项目创始人积极开发 Pulsar 期间、与他们直接共事时所收集到的信息，另一类是我与那些已在生产环境中采用 Apache Pulsar 的组织直接合作所取得的经验。

It is intended to provide guidance over the stumbling blocks and pitfalls that others have encountered during their journeys with Pulsar. Above all, this book will give you the confidence to develop stream processing applications and microservices employing Pulsar using the Java programming language. Even though I have chosen to use Java for most of the code samples throughout the book due to my familiarity with the language, I have also created a similar set of code using Python and have uploaded it to my GitHub account for those of you who prefer coding in that language.

本书意在针对其他人在使用 Pulsar 的过程中所遇到的那些绊脚石与陷阱，提供指引。最重要的是，这本书会给你信心，让你能够用 Java 编程语言、借助 Pulsar 去开发流式处理应用和微服务。尽管由于我对 Java 这门语言更为熟悉，全书大部分代码示例都选用了 Java，但我也用 Python 写了一套类似的代码，并已上传到我的 GitHub 账户，供那些更喜欢用这门语言编程的读者使用。

---
title:
tags:
date:
comment:
---

# 消费端限流
并发量比较大的时候，如果消费端一次性将所有消息从消息队列中取出，消费端处理起来压力必然很大。我们可以启用消费端限流，让消费端慢慢从队列中消费，达到削峰填谷的效果。

## 当不启用限流时
我们找到生产端，让生产端发 100 条消息到队列，用 SpringBoot 集成 RabbitMQ 的第一个案例中的生产端，编写测试代码：

```java
@Test
public void test02(){
    for (int i = 1; i <= 100; i++) {
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, "hello rabbit" + i);
    } 
}
```

运行测试程序，观察 web 管理界面 `queue.order`队列：

![1763892303223-4730975f-4b86-4ea0-99b1-d16e301a5b40.png](../assets/1763892303223-4730975f-4b86-4ea0-99b1-d16e301a5b40.png)



在 `consumer_confirm`项目中再编写一个新的消费端的监听，代码如下：

```java
@RabbitListener(queues = {QUEUE_NAME})
public void processMessagePrefetch(String dataString, Message message, Channel channel) throws IOException {
    try {
        TimeUnit.SECONDS.sleep(1);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    System.out.println("消费端接收到消息：" + dataString);
    channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
}
```

启动消费端，打开 web 管理界面，看看是不是 100 瞬间变成 0：

![1763892565191-caaf4ded-665d-4f19-a27a-ed000512ea8f.png](../assets/1763892565191-caaf4ded-665d-4f19-a27a-ed000512ea8f.png)

![1763892577218-0c1e3171-ade4-4a03-945c-f48d1865f2f7.png](../assets/1763892577218-0c1e3171-ade4-4a03-945c-f48d1865f2f7.png)

## 当启用限流时
在消费端的 `application.yml`中启用限流，一次少取，配置如下：

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: admin
    password: 123456
    virtual-host: /
    listener:
      simple:
        acknowledge-mode: manual # 把消息确认默认修改为手动确认
        prefetch: 1 # 消费端一次取一条进行消费
```

再重新执行生产端，发送 100 条消息到队列：

![1763893871565-ec0f6230-3217-48a5-b629-9b16e91da6d4.png](../assets/1763893871565-ec0f6230-3217-48a5-b629-9b16e91da6d4.png)

5 秒后刷新页面：达到了 1 秒取一条消息进行消费。

![1763893886496-1b425458-c246-41ae-b5ae-d09723deb681.png](../assets/1763893886496-1b425458-c246-41ae-b5ae-d09723deb681.png)

## 一次取少量和一次取大量的区别
![1763893247044-24882f77-627c-4732-917b-6d3393b3c2d7.png](../assets/1763893247044-24882f77-627c-4732-917b-6d3393b3c2d7.png)
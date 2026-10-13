---
title:
tags:
date:
comment:
---

# MyBatis-Plus常用配置

mp的配置可以参考官方文档：

![1744276728852-f1b08204-42fb-4254-bb5b-a50765a97028.png](../assets/1744276728852-f1b08204-42fb-4254-bb5b-a50765a97028.png)

常用配置如下：

```yaml

mybatis-plus:
  
  configuration:
    map-underscore-to-camel-case: true # 是否开启驼峰和下划线的映射
    cache-enabled: false # 是否启用二级缓存
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 打印SQL日志
    
  type-aliases-package: com.jkweilai.mp.model # 别名包
  
  mapper-locations: "classpath*:/mapper/**/*.xml" # mapper xml文件的位置
  
  global-config: # 全局配置
    db-config:
      id-type: auto # id类型
      update-strategy: not_null # 更新策略：不为空时更新

```

提示：大部分的配置都是有默认配置的。

**大家可能会有疑问**：mp不是不用写mapper xml文件吗？为什么还需要`mapper-locations`配置呢？

这是因为mp做单表CRUD的时候不用提供 mapper xml文件，如果自己需要定制SQL，或者多表操作的时候就需要手动编写`mapper xml`文件了。

**小细节**：`classpath:`和`classpath*:`的区别？

![1744277884879-dd57ca99-9679-4034-9f68-67baa03e9aea.png](../assets/1744277884879-dd57ca99-9679-4034-9f68-67baa03e9aea.png)

classpath*: 的星号表示跨模块/跨 JAR 加载资源，确保不会遗漏分散在不同位置的 XML 文件。但是要注意，这种方式效率较低，不要滥用。

---
title:
tags:
date:
comment:
---

# IService接口

mp不仅提供了持久层的代码，还提供了service层的代码。

---

## 自己写的service层代码

```java

package com.jkweilai.mp.service;

import com.jkweilai.mp.model.Car;

import java.util.List;

public interface CarService{
    // 增
    int save(Car car);
    // 删
    int removeById(Long id);
    // 改
    int updateById(Car car);
    // 查一个
    Car getById(Long id);
    // 查所有
    List<Car> list();
}

```

```java

package com.jkweilai.mp.service.impl;

import com.jkweilai.mp.mapper.CarMapper;
import com.jkweilai.mp.model.Car;
import com.jkweilai.mp.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarMapper carMapper;

    @Override
    public int save(Car car) {
        return carMapper.insert(car);
    }

    @Override
    public int removeById(Long id) {
        return carMapper.deleteById(id);
    }

    @Override
    public int updateById(Car car) {
        return carMapper.updateById(car);
    }

    @Override
    public Car getById(Long id) {
        return carMapper.selectById(id);
    }

    @Override
    public List<Car> list() {
        return carMapper.selectList(null);
    }
}

```

可见，在没有复杂业务的前提下，代码几乎也是固定的，就是在service中注入`mapper`，然后调用`mapper`相关的方法。因此这些代码mp也是可以自动生成的。

---

## 使用mp提供的IService接口

两步即可实现：

第一步：编写`CarService接口`继承`IService<Car>`接口

```java

package com.jkweilai.mp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jkweilai.mp.model.Car;

public interface CarService extends IService<Car> {
}

```

提示：`IService接口`是mp提供的，为什么我们的接口要继承这个接口，因为在`Controller`中要面向接口调用service的方法，而这些方法都在`IService接口`中，如果需要额外的业务方法，可以在自己的接口中额外添加扩展方法。

第二步：编写`CarServiceImpl实现类`继承`ServiceImpl<CarMapper,Car>`类并实现`CarService接口`

```java

package com.jkweilai.mp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jkweilai.mp.mapper.CarMapper;
import com.jkweilai.mp.model.Car;
import com.jkweilai.mp.service.CarService;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl extends ServiceImpl<CarMapper, Car> implements CarService {
}

```

提示：为什么实现了`CarService接口`还要继承 `ServiceImpl<CarMapper, Car>`？这是因为在`ServiceImpl<CarMapper, Car>`里面mp给了默认的实现，如果不继承它，则需要将`IService接口`中所有的方法自己全部实现一遍。

****IService接口的继承结构如下：****

![1744336178236-0441b8f3-ca31-40a4-a9cd-a0438e01f2c1.png](../assets/1744336178236-0441b8f3-ca31-40a4-a9cd-a0438e01f2c1.png)

---

## IService接口常用方法

### 负责新增的方法

![1744336381917-1e255d47-67f0-4af9-9598-e857ff051848.png](../assets/1744336381917-1e255d47-67f0-4af9-9598-e857ff051848.png)

+ save(T) 保存
+ saveBatch(Collection<T>) 批量保存
+ saveOrUpdate(T) 保存或修改（保存时根据id判断，如果没有则保存，如果有则更新）

### 负责删除的方法

![1744336400274-077afd2b-f307-408b-bfec-3f2d943cc5bc.png](../assets/1744336400274-077afd2b-f307-408b-bfec-3f2d943cc5bc.png)

+ removeById(Serializable) 根据主键删除
+ removeByIds(Collection<?>) 根据多个主键删除多条记录，底层用 `in(id1, id2, id3)`
+ removeBatchByIds(Collection<?>) 根据多个主键删除多条记录，底层会启动JDBC的批处理操作（调用JDBC的addBatch方法来批量删除，大数量时效率较高。）

### 负责修改的方法

![1744336479166-0bbbbbe3-e8e7-4387-9f87-c9fe5afb7958.png](../assets/1744336479166-0bbbbbe3-e8e7-4387-9f87-c9fe5afb7958.png)

+ updateById(T) 根据id更新
+ updateBatchById(Collection<T>) 根据id批量更新

### 负责查询的方法

![1744337340527-47aec78b-c34e-48a1-8d7f-6019bd8bed09.png](../assets/1744337340527-47aec78b-c34e-48a1-8d7f-6019bd8bed09.png)

+ 这几个方法都是查一个。

![1744337480761-c157a80d-fb26-4635-8694-0cbb7a5413b8.png](../assets/1744337480761-c157a80d-fb26-4635-8694-0cbb7a5413b8.png)

+ 这几个方法都是查多个

![1744336558292-010dea5b-18ee-4439-96c2-212c6e831b98.png](../assets/1744336558292-010dea5b-18ee-4439-96c2-212c6e831b98.png)

+ 这几个方法是查数量

![1744336698246-3fe6be3f-b343-413f-b8e9-e2c7b5e3c447.png](../assets/1744336698246-3fe6be3f-b343-413f-b8e9-e2c7b5e3c447.png)

+ 这几个方法负责分页查询

![1744336716976-4717df5e-140e-47ed-ab88-a4cc0c57d46a.png](../assets/1744336716976-4717df5e-140e-47ed-ab88-a4cc0c57d46a.png)

+ 复杂条件的查询和更新建议使用这几个方法。
+ ****提示：如果是通过主键查询或更新建议使用之前的方法，如果是复杂条件的查询或更新使用这几个方法更方便。****

---

## 基于mp的IService开发业务接口

### 业务概述

实现五个接口，如下：

| 编号 | 接口 | 请求方式 | 请求路径 | 请求参数 | 返回值 |
| --- | --- | --- | --- | --- | --- |
| 1 | 新增汽车 | POST | /cars | 汽车表单实体 | 无 |
| 2 | 删除汽车 | DELETE | /cars/{id} | 汽车id | 无 |
| 3 | 根据id查询汽车 | GET | /cars/{id} | 汽车id | 汽车VO |
| 4 | 根据id批量查询 | GET | /cars | 汽车id集合 | 汽车VO集合 |
| 5 | 根据id降低厂商指导价 | PUT | /cars/{id}/reduction/{price} | 汽车id，降价额度 | 无 |

实现技术：**SpringBoot + MyBatis-Plus + Swagger + Hutool + Lombok**

### 搭建环境

1. 创建SpringBoot项目

![1744341745714-523efd46-d369-4170-a06e-b8c28ea69a11.png](../assets/1744341745714-523efd46-d369-4170-a06e-b8c28ea69a11.png)

2. 创建SpringBoot项目过程中引入依赖

![1744351469957-b3f6df83-b790-4407-abbb-ee3da3d69240.png](../assets/1744351469957-b3f6df83-b790-4407-abbb-ee3da3d69240.png)

3. SpringBoot项目创建完成后，`application.properties`修改为`application.yml`

![1744343146621-0bce9e0d-0274-4dff-a226-17cd15768edc.png](../assets/1744343146621-0bce9e0d-0274-4dff-a226-17cd15768edc.png)

4. 引入依赖：MyBatis-Plus、Swagger、Hutool

```xml

<!--swagger依赖-->
<dependency>
  <groupId>com.github.xiaoymin</groupId>
  <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
  <version>4.5.0</version>
</dependency>
<!--MyBatis-Plus依赖-->
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
  <version>3.5.11</version>
</dependency>
<!-- hutool依赖，一个java工具库 -->
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-all</artifactId>
  <version>5.8.37</version>
</dependency>

```

5. 编写`application.yml`配置文件

```yaml

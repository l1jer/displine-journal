# Restful API

- [Restful API](#restful-api)
  - [What is REST](#what-is-rest)
  - [Methods // 动词+宾语, 动词均大写, 宾语系名词且负数 URL, 避免多级 URL](#methods--动词宾语-动词均大写-宾语系名词且负数-url-避免多级-url)
  - [RESTful Web Serves](#restful-web-serves)
  - [资源与 URI](#资源与-uri)
    - [URI 设计上的技巧](#uri-设计上的技巧)
  - [统一资源接口](#统一资源接口)
  - [服务器回应](#服务器回应)
    - [不返回纯文本](#不返回纯文本)
    - [发生错误是, 不要返回 200, 具体错误信息放在数据体里面返回](#发生错误是-不要返回-200-具体错误信息放在数据体里面返回)
    - [提供链接](#提供链接)
  - [幂等性](#幂等性)
      - [概述](#概述)
      - [常用思路](#常用思路)
  - [实例](#实例)
    - [获取用户列表](#获取用户列表)

## What is REST

Representational State Transfer = REST, 即表述性状态转移

2000 年的时候 Dr.Roy Fielding 提出来的一种软件架构风格, 其具有表述性状态转移的架构约束条件和原则, 基于 HTTP/URI/XML/HTML 使用, 通常为 JSON 格式.

## Methods // 动词+宾语, 动词均大写, 宾语系名词且负数 URL, 避免多级 URL

- GET 获取数据 //read
- POST 添加数据 // create
- PUT 更新/添加数据 // update
- PATCH 更新数据, 通常是部分更新 //update
- DELETE 删除数据 //delete

## RESTful Web Serves

Web Serves 是一个独立于平台/低耦合/自包含/基于可编程的 web 应用程式/可使用开放 XML 标准来描述, 发布, 发现, 协调和配置这些应用程序, 用于开发分布式的互操作的应用程序, 所以, **基于 REST 架构的 Web Services 即是 RESTful.**

## 资源与 URI

Uniform Resource Identifier URI 可以让一个资源被识别的唯一标识, 可以看作为资源的地址, 也可以是名称, 如果没有 URI 即不是资源, 只是资源的一部分信息.

其中 URI 的设计应遵循可寻址性原则, 具有自描述性, 需要在形式上给人以直觉上的关联.

### URI 设计上的技巧

- `_` 或 `-` 提高可读性
- `/` 表示资源的层级关系
- `?` 过滤资源
  - (`?`容易被当做是参数的传递,造成 URI 过于复杂难以理解, 可以用`?`对资源过滤, 比如 git/pulls 来表示 git 项目的拉取请求, 而/pulls?/state=closed 用来表示 git 项目中已经关闭的拉取请求, 这种 URL 通常对应的是一些特定条件的查询结果或算法运算结果)
- `,`或`;` 同级资源关系, 用于分割, 不过 github 是用`...`来代替了

## 统一资源接口

统一接口原则, 包含了一组受限的预定义的操作; 接口使用标准 HTTP 方法诸如 GET/PUT/POST 并遵循其语义, 按照 HTTP 方法语义来暴露资源, 接口将会有安全性和幂等性的特性,
比如 GET 和 HEAD 请求都是安全的, 无论请求多少次, 都不会改变服务器状态;
而 GET/HEAD/PUT/DELETE 请求都是幂等的, 无论对资源操作多少次, 结果总是一样的, 后面的请求并不会产生比第一次更多的影响.

| Category                   | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| 1XX:informational          | Communicates transfer protocol-level information                           |
| 2xx:Success                | Client's request was accepted successfully                                 |
| 3xx: Redirection           | Client must take some additional action in order to complete their request |
| 4xx:Client Error           | Errors from clients                                                        |
| 5xx: Server Error          | Errors from server                                                         |
| ---                        | ---                                                                        |
| 201 Created                | (Details are at https://restfulapi.net/heep-status-codes/)                 |
| 202 Accepted               |
| 204 No Content             |
| 301 Moved Permanently      |
| 302 Found                  |
| 303 See Other              |
| 304 Not Modified           |
| 307 Temporary Redirect     |
| 400 Bad Request            |
| 401 Unauthorized           |
| 403 Forbidden              |
| 404 Not Found              |
| 405 Method Not Allowed     |
| 406 Not Acceptable         |
| 412 Precondition Failed    |
| 415 Unsupported Media Type |
| 500 Internal Server Error  |
| 501 Not Implemented        |

- 也可以通过查看阮一峰 RESTful API 最佳实践来查询具体返回码详情, 也可查看 RESTful 官网评论区.

---

## 服务器回应

### 不返回纯文本

API 返回数据格式=JSON 对象, 服务器回应的 HTTP 头的`Content-Type`属性要设为`application/json`, 客户端请求时也要明确告诉服务器可以接受 JSON 格式, 即请求头 `ACCEPT` 属性也要设成`application/json`:

```py
GET /order/2 HTTP/1.1
ACCEPT: application/json
```

### 发生错误是, 不要返回 200, 具体错误信息放在数据体里面返回

### 提供链接

API 使用者未必知道 URL 的设计, 所以要在回应中给出相关链接, 方便执行下一步操作, 如此操作, 用户只要记住一个 URL 就可以发现其他 URL, 这种方法叫 HATEOAS.

## 幂等性

#### 概述

原本是数学上的概念, f(x)=f(f(x)) 能够成立的数学性质

编程领域里, 则是**对同一个系统, 使用同样的条件, 一次请求和重复的多次请求对系统资源的影响是一致的.**

幂等性在分布式系统设计中十分重要,在设计师总是秉持这样的一种理念: `调用接口发生异常并且重复尝试时, 总是会造成系统所无法承受的损失, 所以必须阻止这种现象的发生`.

其中幂等有空间和时间两个维度.

在什么情况下适用幂等性呢? 比如网络原因导致支付失败, 系统提示后又一次付款造成系统两次扣款, 在电商/银行/互联网等对数据准确性要求很高的领域中非常重要.

#### 常用思路

1. MVCC

多版本并发控制, 乐观锁的一种实现, 数据更新时需要去比较持有数据的版本号, 版本号不一致的操作无法成功. 比如微博点赞次数自动+1 接口:

```c#
public boolean addCount(Long id, Long version);
update blogTable set count=count+1, version = version+1 where id=135 and version = 123
```

每一个 version 只有一次执行成功的机会, 一旦失败必须重新获取.

2. 去重表

利用数据库表单特性来实现幂等, 常用思路是在表上构建唯一性索引, 保证某一类数据一旦执行完毕, 后续同样的请求再也无法成功写入.

比如微博点赞, 要想防止一个人重复点赞, 设计一张表将微博 id 与用户 id 绑定建立唯一索引, 每当用户点暂时就在表中写入一条数据, 这样重复点赞的数据就无法写入.

3. TOKEN 机制

为每一次操作生成一个唯一性的凭证 token, 一个 token 在操作的每一个阶段只有一次执行权, 一旦执行成功则保存结果, 对重复请求返回同一结果.

比如淘宝订单 id 做 token, 下单时可以生成订单, 减少库存, 减免优惠券等等.

每一个环节执行前先检测该订单 id 是否执行过此步骤, 对未执行的请求, 执行操作并缓存结果, 二队已经执行过的 id 则返回之前执行的结果, 不作任何操作, 最大程度上避免操作的重复值性问题, 缓存起来的执行结果也能用于事务的控制等.

**总结: 幂等性是分布式领域的一把利刃**

---

## 实例

```json
{
  "user1": {
    "name": "josh",
    "password": "pass1234",
    "profession": "tutor",
    "id": 1
  },
  "user2": {
    "name": "tom",
    "password": "pass1234",
    "profession": "teacher",
    "id": 2
  },
  "user3": {
    "name": "jimmy",
    "password": "pass1234",
    "profession": "security",
    "id": 3
  }
}
```

| 序号 | URI        | HTTP 方法 | 发送内容       | 结果         |
| ---- | ---------- | --------- | -------------- | ------------ |
| 1    | listUsers  | GET       | Null           | 获取用户列表 |
| 2    | addUser    | POST      | JSON.Stringify | 添加新用户   |
| 3    | deleteUser | DELETE    | JSON.Stringif  | 删除用户     |
| 4    | :id        | GET       | Null           | 显示用户信息 |

### 获取用户列表

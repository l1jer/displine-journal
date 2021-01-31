# Node Express

- [Node Express](#node-express)
  - [Routing](#routing)
  - [Routing Methods](#routing-methods)
  - [Route Paths](#route-paths)
  - [Route Parameters](#route-parameters)
  - [Route handler 解决程序](#route-handler-解决程序)
  - [Response methods](#response-methods)
  - [express.Router](#expressrouter)

## Routing

**Routing** refers to detemining how an application resonds to a client request to a particular endpoint, which is a **URIs(or path)** and a specific **HTTP request method (GET, POST etc.)**.

当 app 接收到指定路线末端请求和 HTTP 方法时, 路由方法会指定一个回调函数,

## Routing Methods

- Express suports the following routing methods for HTTP methods:
  | ------ | --------- | ----------- | -------- | ------ | -------- |
  | ------ | --------- | ----------- | -------- | ------ | -------- |
  | get | post | put | head | delete | options |
  | trace | copy | lock | mkcol | move | purge |
  | unlock | report | mkactivity | checkout | merge | m-search |
  | notify | subscribe | unsubscribe | patch | search | - |

```js
app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});
```

`app.all()` 为所有 HTTP 请求方法的路径提供加载中间件功能.

```js
app.all("/secret", (req, res, next) => {
  console.log("Here is your secret garden ...");
  next(); //pass control to the next handler
});
```

## Route Paths

请求方法和其中的路由路径定义了进行请求的末端, 它可以是字符串, 字符串模式或正则表达式.

字符 `? + * ()` 是他们的正则表达式对应子集, 字符串路径会逐字解释连字符 hyphen `-` 和 点 dot `.`.

`$` 需要包含在 `([])` 中, 例如 `/data/$book` 的请求路径字符串将会是 `/data/([\$])book`.

path-to-regexp 匹配路径, 具体参阅`path-to-regexp`文档

Express Route Tester 用于测试基本 Express 路由的便捷工具, 但它不支持模式匹配.

```js
// 请求到根路由 /
app.get("/", (req, res) => {
  res.send("root");
});

// 匹配请求 /about
app.get("/about", (req, res) => {
  res.send("about");
});

// match acd 和 abcd
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

// match abcd, abbcd, abbbcd etc.
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

// match abcd, abxcd, abRONDOMcd, ab123cd etc.
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
```

```js
// 三元表达式 实例
// match anything w/ an 'a' in it
app.get("/a/", (req, res) => {
  res.send("/a/");
});

// match butterfly 和 dragonfly, but not butterflyman or dragonflyman etc.
app.get("/.*fly$/", (req, res) => {
  res.send("/.*fly$/");
});
```

## Route Parameters

路有参数是指定的 URL 段, 用于捕获它们在 URL 中所处位置指定的值, 其值将会填充到 `req.params` 对象中, 路径中指定的路由参数的名称将作为其各自的键.

```js
Route path: /users/:userId/books/:bookId
Request URL: http://localhose:3000/users/34/books/8989
req.params:{"userId":"34", "bookId":"8989"}
```

在路由路径中指定路有参数, 才能使用路由参数定义路由:

```js
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});
```

**路线参数的名称必须由'word characters'组成, A-Z, a-z, 0-9, 同样可以使用 hyphen 和 dot**

为了更好地控制具体字符串被一个路由参数所匹配, 可以追加一个正则表达式放在圆括号中(parenthese):

```js
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId":"42"}
```

Express 4.x 中, 正则表达式中的 `*` 字符不以通常的方式解释, 用 `{0,}` 代替.

## Route handler 解决程序

可以利用多个回调函数来作为中间件处理请求, 唯一特例就是这些回调函数可能会调用 next('route') 避开剩下的路由回调.

可以利用这个机制来强加前提条件到一条路由上, 在没有任何理由在当前路由处理的情况下, 然后传递控制给子路由.

> bypass n.支路; 分流术 v.绕过,避开; 忽视, 不顾; 设旁路
> subsequence a. 随后的
> impose vi.利用,欺骗;施加影响; vt.强加;以欺骗;征税

Route handler 可以是函数 或 函数数组或者是综上两者, 如下例们所示:

```js
// a single callback fn -> a route
app.get("/example/a", function (req, res) {
  res.send("Hello from A!");
});

// more than 1 callbacks fn -> a route (make sure) 指定了 next 对象
app.get(
  "example/b",
  (req, res, next) => {
    console.log("the response will be sent by the next fn...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

// an array of callback fn -> route
var cb0 = (req, res, next) => {
  console.log("CB0");
  next();
};

var cb1 = (req, res, next) => {
  console.log("CB1");
  next();
};

var cb2 = (req, res) => {
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb, cb2]);

// 一组非独立函数和函数数组 -> a route
var cb0 = (req, res, next) => {
  console.log("CB0");
  next();
};

var cb1 = (req, res, next) => {
  console.log("CB1");
  next();
};

app.get(
  "example/d",
  [cb0, cb1],
  (req, res, next) => {
    console.log("response sent by the next fn...");
    next();
  },
  (req, res) => {
    res.send("Hello from D!");
  }
);
```

## Response methods

如果在 route handler 中没有使用以下方法, 客户请求就会被搁置.

| Method           | Description                            |
| ---------------- | -------------------------------------- |
| res.download()   | 弹出提示文件下载                       |
| res.end()        | 结束进程                               |
| res.json()       | 发送 JSON 回执                         |
| res.jsonp()      | 发送 JSONP 支持的 JSON 回执            |
| res.redirect()   | 重导向请求                             |
| res.render()     | 渲染一个查看样板                       |
| res.send()       | 发送不同类型的回执                     |
| res.sendFile()   | 发送文件(八位字节流)                   |
| res.sendStatus() | 设置回执状态码并发送字符串形式的回执体 |

## express.Router

用于创建模块和可挂载路由处理. 一个 Router 实例是一个完整的中间件和路由系统, 因此也可以称之为 mini-app.

下面实例是创建一个模块化的 router, 载入一个中间件函数, 定义一些 routes 并挂载 router 模块在 main app 的 path 上

```js
var express = require('express')
var router = express.Router()

// middleware 是这个router 特定的
router.use(timelog(req,res,next)=>{
  console.log('Time:', Date.now())
  next()
})

// 定义主页路径
router.get('/', (req,res)=>{
  res.send('Birds homepage')
})

// 定义 about 路径
router.get('/about', (req,res)=>{
  res.send('Birds About')
})

module.exports = router
```

在 app 中载入路由模块:

```js
var birds = require("./birds");
app.use("/birds", birds);
```

如此一来, app 便可以处理请求到 /birds 和 /birds/about, 同时也可以声明 app 特定的 timeLog 中间件函数

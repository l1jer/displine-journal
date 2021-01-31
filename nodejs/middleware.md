# Proxy Middleware 剖析

## http-proxy-middleware

> BG: 我们当前主机为 http://localhost:3000 , 而我们有一个需求来请求 /api, 而不希望由 3000 来处理, 希望利用另一台服务器来处理;
> 此时侧可以在 express 的 3000 端口启动代理, 可使发送到 3000 端口的 /api 请求转发至其他端口, 比如 3001, 即请求 http://localhost:3000/api 等同于 http://localhost:3001/api

Node Express 中加载中间件 proxy(http-proxy-middleware), 代理的存在即是一套方法从配置文件中得到服务器端口, 进行 HTTP 方法访问, 好处在于不需要自己重复写 HTTP 请求体, 其次是通过修改中间件的参数和端口配置文件来进行操作, 可以理解为游戏中的脚本操作.

```js
// ../proxy/index.js
const express = require("express");
const path = require("path");
const proxy = require("http-proxy-middleware");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const app = express();
const server = require("http").createServer(app);

const serverConfig = config.serverConfig;
const proxyConfig = config.proxyConfig;

app.set("host", serverConfig.host || "0.0.0.0");
app.set("port", serverConfig.port);

// -- 中间件请求体 --
(proxyConfig || []).forEach((item) => {
  // 这里遍历是否有版本,服务器名称, 服务器主机地址和端口
  // 根据得到的配置信息来匹配 baseUrl, 而baseUrl和option是proxy的选项们,
  if (item.version && item.serverName && item.proxyHost && item.proxyPort) {
    // 此为proxy的api, 和接口文档中的请求路径所对接
    // e.g. "/api/v1/virtualNetworkServer"
    const baseUrl = `/api/${item.version}/${item.serverName}`;
    //                      \__________/    \_____________/
    //                            |                |
    //                  对应配置文件中的版本号    服务器名称

    //option 参数是:
    const option = {
      target: `http://${item.proxyHost}:${item.proxyPort}`,
      //此为目标服务器主机, 在config.json文件中修改
      pathRewrite: {
        //此处可以重写请求, 访问源可以被替换, eg:
        // '^/api/old-path' : '/api/new-path'
      },
      changeOrigin: true,
      // 是否需要改变原始主机head为目标URL
    };

    option.pathRewrite[baseUrl] = "/";
    //创建代理服务器api, 利用参数对象baseUrl和option来实现组件复用的简易性和可读性
    const apiProxy = proxy(baseUrl, option);

    app.use(apiProxy);
  } else {
    console.log("配置文件异常!");
    //不容分说, 当服务器配置文件信息缺失报告异常
  }
// -- 中间件请求体结束 --

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath);
});

  // 服务器监听
  server.listen(app.get("port"), app.get("host"), () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`running at http:// ${host}:${port}`);
  // 这里根据配置文件(config.json)得到本地/代理端口 127.0.0.1:3000(这也是webpack打包的api) 同为 localhost:3000.

});
```

- 后端端口: 10.10.230.39:8083
- 前端代理/前端端口: 127.0.0.1:3000

其中需要明白的是, 后端数据通过`webpack`打包接口传出到 proxy 端, proxy 抓取后传输给前端页面, n vice versa

根据官方文档定位所需要的数据请求体:
`GET /vn/vnScheme/projs/:proj_uuid/schemes/:scheme_uuid`

在 proxy/index.js 文件中添加以下手写构型数据:

```js
app.get(
  "/api/v1/virtualNetworkServer/vn/vnScheme/projs/:proj_uuid/schemes/:scheme_uuid",
  (req, res) => {
    res.send({
      status: "success",
      data: {
        uuid: "1111",
        proj_uuid: "1111",
        name: "1111",
        isLocked: "false",
        checked: "false",
        forward: [
          {
            lt_tree_node_uuid: "1111:Proxy rewrite rule created",
            lt_tree_node_name: "1111:Proxy rewrite rule created",
            lt_tree_node_fullpath: "1111:Proxy rewrite rule created",
            le_tree_node_uuid: "1111:Proxy rewrite rule created",
            le_tree_node_name: "1111:Proxy rewrite rule created",
            le_tree_node_fullpath: "1111:Proxy rewrite rule created",
          },
        ],
      },
    });
  }
);
```

排查中得知, express 中手写数据应在 `代理方法` 前, 否则直接导致无法读取, 起先自己先把代码放在了这里, 无法读取后放在了`监听端口方法`前, 起先的问题是请求体端口不完整, 原来是`/virtualNetworkServer/vn/vnScheme/projs/:proj_uuid/schemes/:scheme_uuid`

## 接口文档也会有雷区

其次是经过断点调试后在 devTool 中得到数据但是页面没有渲染, 梁先生`怒斥`着要拿出接口文档再次查看, 后得知, 接口文档和服务端数据类型有出入(接口文档是对象, 而服务器端数据类型是数组对象).

一开始的无知使自己从接口文档中提供的端口和其端口前端加上 `/api/v1` 每一项进行 postman 返回数据, 同时缓慢地理解着 proxy 方法体及其参数等.

**PS: `devTool` 和 `postman` 可以便捷看到传输结果.**

## 上下文匹配

```
http://example.com:8080/over/there?name=jerry#handsome
\__/ \________________/\_________/ \________/ \______/
  |           |             |           |         |
 协议         主机          路径         查询   碎片crumbs?
```

### 路径匹配

- `proxy({ })` 匹配任何路径, 所有请求将被转发
- `proxy('/', { })` 匹配所有路径, 所有请求将被转发
- `proxy('/api',{ })` 匹配以 /api 开头的请求

### 多种匹配

- `proxy('/api','/ajax', '/otherpaths',{ })`

### 通配符路径匹配

细粒度的匹配可以使用通配符, Glob 匹配模式由 miromatch 创造.

- `proxy('**', { })` 任何请求
- `proxy('**/*.html', { })` 匹配任何以 html 结尾的请求
- `proxy('/*.html', { })` 匹配当前路径下以 html 结尾的请求
- `proxy('/api/**/*.html', { })` 匹配 / api 下以 html 结尾的请求
- `proxy(['/api/**', '/ajax/**'], { })` 匹配 api 和 ajax 下的所有请求
- `proxy(['/api/**', '!**/users.json'], { })` 匹配 /api, 非 \*\*/ 下的所有 user.json 文件请求

### 自定义匹配

```js
var filter = function (pathname, req) {
  return pathname.match("^api") && req.method === "GET";
};
var apiProxy = proxy(filter, { target: "htto://www.redux.org" });
```

## Option

- option.pathRewrite 重写 url 路径

```js
pathRewrite:{'^/api/old-path' : '/api/new-path'} //重写
pathRewrite:{'^/api/old-path' : ''}  // 移除
pathRewrite:{'^/' : '/api/new-path'}  //添加
//自定义
pathRewrite:function(path, req){
  return path.replace('/api/old-path','/api/new-path')
}
```

- option.router 对象/函数, 重新制定请求转发目标, 会根据配置顺序返回最先匹配到结果

```js
router:{
  'users.localhost:3000' : 'localhost:8001', // host only
  'localhost:3000' : 'localhost:8002',       // host only
  'localhost:3000/api' : 'localhost:8003',   // host + path
  '/api' : 'localhost:8004' // path only
}

// 自定义
router:function(req){
  return 'http://localhost:8004';
}
```

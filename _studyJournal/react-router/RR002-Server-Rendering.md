# Server Rendering 服务器渲染

- [Server Rendering 服务器渲染](#server-rendering-服务器渲染)
  - [StaticRouter 静态路由](#staticrouter-静态路由)
  - [Adding app specific context information](#adding-app-specific-context-information)
  - [导向 301 和 302](#导向-301-和-302)
  - [导向 404, 401 或其他状态](#导向-404-401-或其他状态)
  - [Putting it all together](#putting-it-all-together)
  - [Data Loading 数据载入](#data-loading-数据载入)

## StaticRouter 静态路由

自从服务器都是无状态 (stateless), 渲染已经变得一些不一样了.

基本思路是包裹 APP 在无状态的 <StaticRouter> 取代 <BrowserRouter>, 从而路由可以匹配我们从服务器传递请求的 URL.

```js
// Client
<BrowserRouter>
<App/>
<BrosweRouter>

// server
<staticRouter location={req.url} context={context}>
<App/>
</StaticRouter>
```

当渲染 <Redirect> 在客户端上, 浏览器历史会改变状态, 然后我们可以得到新的页面.

在静态服务器里, 我们不能改变 APP 状态, 取而代之, 我们利用 context prop 去找出之前渲染的结果,. 如果我们找到 `context.url`, 那我们就知道了 APP redirected. 这将让我们可以从服务器上发送 a proper redirect.

```js
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // 某处的 <Redirect> 被渲染了
  redirect(301, contect.url);
} else {
  // we r good, send the response
}
```

## Adding app specific context information

> 给 app 加上具体的上下文信息

路由终究只会添加 `context.url`, 但你可能想要一些导向至 301 和另一些导向 302, 或者当一些特定的 UI 组件被渲染后导向 404, 再或者没有授权导向 401, 我们可以让我们手中的 context prop 变态(mutate).

## 导向 301 和 302

> 我终于意识到自己做不了这种计算机词汇的翻译, 太 tm 难翻译了, 只能自己理解.

```js
function RedirectWithStatus({ from, to, status }) {
  return (
    <Route
      render={({ staticContext }) => {
        // 客户端没有 `staticContext`, 所以我们需要在这里 guard against that
        if (staticContext) staticContext.status = status;
        return <Redirect from={from} to={to} />;
      }}
    />
  );
}

function App() {
  return (
    <Switch>
      // some other routes
      <RedirectWithStatus status={301} from="/users" to="/profiles" />
      <RedirectWithStatus status={302} from="/courses" to="/dashboard" />
    </Switch>
  );
}

// on the server
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // can use 'contextStatus` added in RedirectWithStatus
  redirect(context.status, context.url);
}
```

## 导向 404, 401 或其他状态

我们可以像上个实例写一样的, 创建一个组件, 里面添加一些上下文并渲染在 app 中去得到一个不同的状态码.

```js
function Status({code, children}){
  return(
    <Route render={({staticContext})=>{
      if (staticContext) = staticContext.status = code;
      return children;
    }}/>
  )
}
```

这之后就可以渲染一个 `Status` 在 app 中的任意位置去添加 `staticContext`:

```js
function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Lost in 404</h1>
      </div>
    </Status>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

## Putting it all together

一个实例将你会需要的那些普遍零碎(general piecies) 的代码全部放在一起:

```js
import http from "http";
import React from "react";
import ReactDOMServer from "reactDOM/server";
import { StaticRouter } from "react-router-dom";

import App from "./app.js";

http
  .createServer((req, res) => {
    const context = {};

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });
      res.end();
    } else {
      res.write(`<!doctype html><div id="app">${html}</div>`);
      res.end();
    }
  })
  .listen(3000);
```

and then the client

```js
import ReactDOM from "react-dom";
import { BrowserRoute } from "react-router-dom";

import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
```

## Data Loading 数据载入

在数据载入这方面, 没有最好的方式. 但最主要的强制限制就是渲染前先载入数据.

Reacr Router 导出 matchPath static function(静态函数?) 来局部匹配地点到路由, 渲染前, 可以在服务器上使用去帮助检测数据依赖.

这个方法的要旨在于依赖于一个曾经用于在渲染检查数据依赖前渲染路由和 match against 的静态路由设置.

> gist n.要旨
> constraint n.限制, 强制
> composable a. 组合的
> prescribe vt./vi. 规定, 开处方
> router 路由器
> route 路由
> routing 路由选择, 信息发送

```js
const route = [
  {
    path: "/",
    component: Root,
    loadData: () => getSomeData(),
  },
  // etc
];
```

使用这个设置来渲染 app 中的路由:

```js
import { routes } from "./routes.js";

function App() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} />
      ))}
    </Switch>
  );
}
```

之后可以在服务器上这么写:

```js
import { matchPath } from "react-router-dom";

const promises = [];
// 'some'的使用来模仿 `<Switch>`的行为来做首个路有选择
routes.some((route) => {
  const match = matchPath(req.path, route);
  if (match) promises.push(route.loadData(match));
  return match;
});
Promise.all(
  promises.then((data) => {
    // 对data在这里进行一些操作, 然后客户端就可以访问后渲染app
  })
);
```

在最后, 客户端需要取出数据, 以上这些是需要的几个地方, 并不是规定要这样载入数据.

如果需要静态路由设置数据载入和服务器渲染, 参考官网的 `React Routr Config`.

# React-router

- [React-router](#react-router)
  - [Quick Start](#quick-start)
  - [Primary components](#primary-components)
    - [Routers](#routers)
    - [Route Matchers](#route-matchers)
      - [`<Switch>` & `<Route>`](#switch--route)
    - [Navigation / Route Changers](#navigation--route-changers)
      - [<Link>](#link)
      - [<NavLink>](#navlink)
      - [<Redirect>](#redirect)

**`demo: \public-resource\react-router-demo\src\Basic.routing.js`**

## Quick Start

1. Basi routing (demo: Basic.routing.js)
2. Nested Routing (demo: Nested.routing.js)

```js
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
```

## Primary components

### Routers

| Router        | 总路由     | 默认服务器配置         |
| ------------- | ---------- | ---------------------- |
| BrowserRouter | 浏览器路由 | 需要设置服务器适配     |
| HashRouter    | 井字号路由 | 不发送服务器, 无需适配 |

The 2 differences btw `BrowserRouter` & `HashRouter` is **storing the URL and communicate w/ your web** server:

- `<BrowserRouter>`: uses regular URL paths (best-looking URLs) that server needs to be correctly configured. React Router manages client-side of all URLs on same pages served by the web server.

- `<HashRouter>`: stores current location in the `# portion of the URL`, e.g. http://baidu.com/#/news/20200512. No special server configuration as it never sent to the server.

**Make sure the router is rendered at the root of the element hierarchy**:

```js
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

### Route Matchers

#### `<Switch>` & `<Route>`

Rendered <Switch> will search its children <Route>s path matched the current URL, the longer path will be chosen first.

> **No <Route> matches, nothing rendered by <Switch>.**

```jsx
function App() {
  return (
    <div>
      {/* Switch 查找子Route们和renders来定义第一个就是当前URL */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        {/* 当Switch找到当前URL则立即渲染, 其它会被无视 */}
        {/* The more specific path="/contact/:id" comes before path="/contact/", so that route will render when viewing an individual contact. 即越详细的地址先被渲染*/}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        {/*  */}
        <Route path="/allcontact">
          <AllContact />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/allcontact">
          <AllContact />
        </Route>
        {/* <Route path="/"> 永远都会匹配这个地址, 所以这个在<Switch>的最后 */}
        {/* 另一个解决方式即 <Route exact path="/">, 它会匹配 whole url */}
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}
```

### Navigation / Route Changers

#### <Link>

To create links in the application by rendering an anchor(instead of <a>) in HTML.

```js
<Link to="/">Home</Link> // <a href='/'>Home</a>
```

#### <NavLink>

<NavLink> 是一个特殊类型的 <Link>, 可以使其变为 `active` 当它匹配到了当前地址.

```js
<NavLink to="/about" activeClassName="about">
  {/* <a href="/about" aria-current="page" class="about">About</a> */}
  {/* 同等于 html 里面 active */}
  About
</NavLink>
// 当它不是其页面时会失去className
// 并会显示像平常一样的 <a href='/'>About</a>
```

#### <Redirect>

任何时候想要强制导航, 可以用 <Redirect> 来渲染导航至某页面.

```js
<Redirect to="/login" />
```

---

| route matchers  | 路由     |
| --------------- | -------- |
| Switch          |          |
| Route           | 路由     |
| Route Path      | 对应链接 |
| Route Component | 对应组件 |

---

| navigation           | 匹配的路由器信息 |
| -------------------- | ---------------- |
| navigation component | route changers   |
| link                 | 路由导航         |
| Link to              | 切换链接         |
| NavLink              | 导航链接         |
| location             | 地址栏信息       |
| history              | 路由的方法?      |

```

```

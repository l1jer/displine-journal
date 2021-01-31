# 条件渲染 Conditional Rendering

- [条件渲染 Conditional Rendering](#条件渲染-conditional-rendering)
  - [元素变量](#元素变量)
  - [运算符 &&](#运算符-)
  - [三目运算符 Ternary Operator](#三目运算符-ternary-operator)
  - [阻止组件渲染](#阻止组件渲染)

即 根据组件的不同状态, 选择性渲染对应状态下的部分内容.
和 JS 一样, 使用 `if` 或 '条件运算符(ternary operator)` 创建元素来体现当前状态, 由 React 根据它们来更新 UI.

示例组件:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Guest, please sign up.</h1>;
}

// 根据用户是否登陆来决定显式哪一行 greeting
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById("greeting")
);
```

## 元素变量

使用变量来储存元素, 可以有条件地渲染组件的一部分, 而其他渲染部分并不会因此而改变, `登陆` 和 `注销` 两个组件实例如下:

```js
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}
```

创建一个有状态的组件(即组件 `setState`) `LoginControl`, 它会根据当前的状态渲染 `<LoginButton />` 或者 `<LogoutButton />`, 同时渲染上部分示例的 `<Greeting />`.

```js
import React from "react";
import ReactDOM from "react-dom";
// import Greeting from 'Greeting';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }
  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }
  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedin={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

// 根据用户是否登陆来决定显式哪一行 greeting
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

ReactDOM.render(<LoginControl />, document.getElementById("controller"));
```

## 运算符 &&

&& 运算符可以很方便地进行元素的条件渲染, 其中`true && expression` 总是返回 `expression`, 而 `false && expression` 总是返回 `false`, 然后 React 会忽略并跳过它.

```js
function Mailbox(props) {
  constunreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello</h1>
      {unreadMessages.length > 0 && (
        <h2> You habe {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

const messages = ["React", "Re:React", "RE:ReReact"];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById("unreadmessages")
);
```

## 三目运算符 Ternary Operator

`condition ? true : false`

文本中实现状态转换:

```js
render();
const isLoggedIn = this.state.isLoggedIn;
return (
  <div>
    {" "}
    The user is <b>{isLoggedIn ? "currently" : "not"}</b> logged in.
  </div>
);
```

同样适用于按钮中:

```js
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    <div>
    {isLoggedIn}
      ? <LogoutButton onClick={this.handleLogoutClick} />
      : <LoginButton onClick={this.handleLoginClick} />
    }
    </div>
```

但是如果条件过于复杂, 就需要考虑 `提取组件` 来简化复杂度.

## 阻止组件渲染

让 `render` 方法直接返回 `null`, 则会造成组件不进行任何渲染, 即使它已经被其他组件渲染, 但仍旧可以进行隐藏组件, 这其中的过程并不会影响组件的生命周期, 下面实例中, `componentDidUpdate` 依然会被调用.

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
    // 这里便是重点
  }
  return <div className="warning">warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        // 这里的componentDidUpdate 依然会被调用
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}
ReactDOM.render(<Page />, document.getElementById("warningbanner"));
```

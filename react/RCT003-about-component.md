# React Component
## 组件 & Props
### Function 和 Class 组件

function -> 本质上就是 JS function == class(ES6)

它接收唯一带有数据的 props(代表属性)对象并返回一个 React 元素 -> function 组件

```js
function Welcome(props) {
  return <h5>你好, {props.name}</h5>;
}

// The above can be converted to the following:

class Welcome extends React.Component {
  render() {
    return <h5>你好, {this.props.name}</h5>;
  }
}
```

---

### Render 渲染组件

```js
const element = <div />; // DOM标签
const element = <Welcome name="Josh" />; // React用户自定义标签
```


**`组件传参`: 以 React 元素自定义组件, 它会传递 JSX 所接收到的`属性(attributes)`以及`子组件(children)`转换为单个对象传递给组件, 此对象即`props`**, 如下面代码:

```js
function Welcome(props) {
  return <h5>你好, {props.name}</h5>;
}

const element = <Welcome name="Josh" />;
ReactDOM.render(element, document.getElementById("welcome"));
```

---

### 组合组件(套娃/套件)

```js
function Welcome(props) {
  return <h5>你好, {props.name}</h5>;
}

function Taowa() {
  return (
    <div>
      <Welcome name="Tim" />
      <Welcome name="Tam" />
      <Welcome name="Tom" />
    </div>
  );
}

ReactDOM.render(<Taowa />, document.getElementById("welcome"));
```

---

### 提取组件
评论功能, 它接收author, text以及date作为props<br>
冗长而臃肿, 打出来的时候费好大劲去理解`这是个嘛?`.
```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```


提取出来 Avatar 组件, 而本身的`author`并不是很对应其真实功能而更换为`user`

```js
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

// 另渲染 `UserInfo` 和 `Avatar`
function UserInfo(props){
    return(
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
              {props.user.name}
            </div>
        </div>
    );
}

// 简化后的 `Comment`
function Comment(props) {
  return (
    <div className="Comment">
        <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

### Props 只读性
**所有 React 组件都必须保护其props不被更改**

```js
纯函数
function sum(a, b){
    return a + b;
}

非纯函数:更改了入参
function withdraw(account, amount){
    account.total -= amount;
}
```

**`给自己的备忘录`: 套用外部组件, 检查如下内容:**
1. 外部组件的js文件中确认全导入项`import React from 'react';import ReactDOM from 'react-dom';` 等组件, 结尾处要导出此组件. 2.
2. 需要导入外部组件的js文件中确认导入项 `import something from './something';`


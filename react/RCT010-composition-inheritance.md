# Composition vs Inheritance 组合和继承

**利用 React 强大的组合模式来代替继承从而复用组件代码**

## Containment 包含关系

一些尤其是像 Sidebar 和 Dialog 这样的表现为通用容器 (generic boxes) 的组件, 无法提前知晓其子组件的内容, 来通过使用特殊的 Children prop 来传递子元素到渲染结果中.

理解: 这里的 `<FancyBorder>` JSX 标签中的所有内容都会作为衣蛾 `children prop`传递给 `FancyBorder Component`, 因为 `FancyBorder component` 将`{props.children}`渲染在一个 `<div>` 中, 被传递的子组件们会出现在输出结果中.

> arbitrary a. 任意的

```jsx
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}
// 下面组件则通过 JSX 嵌套来使其组件作为子组件传递给父组件
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thx</p>
    </FancyBorder>
  );
}
```

然而, 也可以用下面这种方式, 在不使用 `children` 的情况下, 将所需内容传入 props, 并使用相应 prop.

`<Contacts />` 和 `<Chat />` 之类的 React 元素本质就是对象, 可以直接被当做 props 像其他数据一样传递, 雷同于'槽(slot)', 但是 React 中没有这概念的限制, 可以将任何东西作为 props 进行传递.

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}
function App() {
  return <SpiltPane left={<Contacts />} right={<Chat />} />;
}
```

## Specialization 特例关系

在上上一个实例中, WelcomeDialog 就是 Dialog 的**特殊实例**. 在 React 中可以通过组合来实现这一点, '特殊'组件可以通过 props 定制并渲染'一般'组件:

```jsx
function Dialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return <Dialog title="welcome" message="thx" />;
}
```

同样可以适用于 class 组件

```jsx
function Dialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: "" };
  }

  render() {
    return (
      <Dialog title="Exploration" message="Where? Mars!">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onCLick={this.state.handleSignUp}> Sign up</button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({ login: e.target.value });
  }

  handleSignUp() {
    alert("Welcome to Jumanji, ${this.state.login}!");
  }
}
```

## 继承?

Props 和 组合 提供了清晰而安全地定制组件外观和行为的灵活方式, 组件可以接受任意 props, 包括基本数据类型, React 元素以及函数.

如果想要在组件间复用非 UI 功能, 可以将其提取为一个单独的 JS 模块, 如函数/对象/类, 组件可以直接引入(import)而不用 extend 继承.

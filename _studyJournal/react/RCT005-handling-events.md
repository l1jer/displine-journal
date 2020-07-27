# Handling Events

> In React, handling events is very similar to DOM elements, only a few of syntax(语法) differences.
>
> 1.  camelCase 驼峰式写法
> 2.  JSX 传递 function, 而不是 string.

---

```html
<!-- in HTML -->
<button onclick="activateLasers()">
  Activate Lasers
</button>

<!-- in React, camelCase & function -->
<button onClick="{activateLasers}">
  Activate Lasers
</button>
```

## 防止默认行为触发:

```html
<!-- in HTML -->
<a href="#" onclick="return false"></a>
```

```js
// in React, by using preventDefault() instead
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    // Clicked, but do nothing.
  }
  return <a href="#" onClick={handleClick}>点我啊点我</a>;
}
```

## 创建事件监听器

一般不需要使用 `addEventListener` 为已创建的 DOM 元素添加监听器, 只需要在初始渲染时添加监听器.

使用 ES6 class 语法定义组件 -> 将事件处理函数声明为 class 中的方法.

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // 回调中使用 `this`, 构造器这里必须用bind绑定
    this.handleClick = this.handleClick.bind(this);
  }
    // 绑定后, 下面这个方法才不会报错
  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
ReactDOM.render(<Toggle />, document.getElementById("root"));
```

[查看 demo](http://cegitlab.hirain.net/asw/public-resource/tree/jiarui.li/react-demo/src/Toggle.js)

**注意**:如果在 JSX 中使用`this`, 必须绑定 `this.handleClick` 到 `onClick' 上. 否则`this`会变成`undefined`. 这是因为JS是这样的规则, 并不是React的特殊性. 如果引用一个没有`()`的方法, 比如`onClick=={this.handleClick}`, 这个方法就必须先被绑定才可以不报错.

在不使用 `bind()`的情况下有两种方法可以解决:

```js
class Button extends React.Component{
  handleClick = () => {
    console.log{'this is:', this};
  }
```

或是在回调中使用 `箭头函数`:

```js
render(){
  return (
    <button onClick={()=>this.handleClick()}>
    // 这里确保 handleClick 里的 this 已被绑定
    Click me
    </button>
  );
 }
}
```

但是后者在每次渲染 Button 的时候都会创建不同的回调函数, 一般没什么问题, 但如果该回调函数作为 prop 传入子组件时, 这些组件可能会进行额外的渲染, **建议**在构造器中绑定或者使用class field语法来避免此问题.

## 向事件处理程序传递参数

箭头函数 方式:
事件对象必须显式地进行传递

```js
<button onClick={(e)=>this.deleteRow(id,e)}>Delete Row</button>
```

Function.prototype.bind 方式:
事件对象以及更多的参数将会被隐式地进行传递

```js
<button onClick={this.deleteRow(this, id)}>Delete Row</button>
```


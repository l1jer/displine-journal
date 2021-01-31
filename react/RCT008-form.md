# 表单 Form

## 受控组件

在HTML中, 如 `<input>`, `<textarea>` 和 `<select>`等表单元素通常是自维护 state, 并根据用户输入进行更新.
在React中, 可变状态(mutable state) 通常保存在组件的state中, 并只能通过 setState() 来更新, 即表单内value值受state影响. 

**受控组件**: 渲染表单的组件还控制着用户输入过程中表单发生的操作, 以这种方式控制取值的表单输入元素.

在表单元素上设置 `value` 属性, 因此显示的值始终为 `this.state.value`, 使 state成为唯一数据源, 由于 `handleChange` 在每次安监室都会执行并更新其中state, 显示值将随着输入而更新. 同样, value 也可以传递给其他UI元素或者通过其他事件处理函数重置.

> [表单提交代码实例](http://cegitlab.hirain.net/asw/public-resource/tree/jiarui.li/react-demo/src/Form.jsx)

总的来说, `<input>` 中的这一类标签都可以接受一个 `value` 属性来实现受控组件.

值得注意的是, `value` 同样接收数组, 可支持 `select` 中的 `multiple` 多选:

```jsx
<select multiple={true} value={['B', 'C']}>
```

### 处理多个输入

当需要处理多个 `input` 元素的时候, 通过添加 `name` 属性, 让处理函数根据 `event.target.name` 的值来选择要进行的操作.

> [多个输入 代码实例](http://cegitlab.hirain.net/asw/public-resource/tree/jiarui.li/react-demo/src/FormMul.jsx)

官方文档给出:
```jsx
this.setState({
  [name]:value
})

等同于下面的ES5

var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

### 受控输入空值

在受控组件上指定 value 的 props 会阻止用户更改输入, 如果没有那就可能是 value 被以外设置为undefined/null.

```jsx{1,3}
ReactDOM.render(<input value='hi' />, mountNode);

setTimeout(function(){
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

同样地, 受控组件有时候会比较麻烦, 数据变化的每种方式都编写成事件处理函数通过一个组件传递给state, 如果要使用React和非React库集成时, 就会非常麻烦, 这种情况下可以使用非受控组件.


---


## 非受控组件

### 文件 input 标签

上传文件, 或者通过使用JS的 `FIleAPI` 进行控制, 因其 value 只读性, 这是一个非受控组件

```jsx
<input type='file' />
```
手动操作DOM来控制
# List & Key

`map()` 使数组元素双倍增长:

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2,4,6,8,10]
```

## 渲染多个组件

`{}` 可以在 JSX 内构建一个 `元素集合`.

实例: 使用 `map()` 方法遍历 `numbers` 数组, 将每个元素变成 `<li>`, 最后得到的数组赋值给 `listItems`:

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) => <li>{number}</li>);

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("listitems"));
```

## 基础列表组件

在一个组件中渲染列表, 从上一个实例中重构成为一个组件 - 接收 numbers 数组作为参数并输出一个元素列表.

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((numbers) => (
    <li key={number.toString()}>
      {" "}
      // 没有这里的key, 则会警告 list items 应该被提供一个 key.
      {number}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
const numbers = [1, 2, 3, 4, 5];

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("numberlist")
);
```

创建一个元素时, 必须包括一个特殊的 `key` 属性.

## Key

Key 帮助 React 识别被改变的元素, 比如被添加/删除等, 因此数组中的每一个元素应被赋予一个确定的标识

```jsx
const number = [1, 2, 3, 4, 5];
const listItem = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

基本上来说, `key = id` 同样这个元素在列表中拥有唯一的字符串.

```jsx
const todoItem = todos.map((todo)) =>
<li key={todo.id}> { todo.text } </li>);
```

没有确定的 id 可以用的话就用 index, 但是这样会导致性能变差, 可能会引起组件状态问题, 可参考 Robin Pokorny 的`深度解析使用索引作为key的负面影响`.

## 用 Key 来提取组件

元素 key 只有放在上下文里就近的数组中才有意义. 比如, 如果提取出一个 `ListItem` 组件, 应该把 key 保留在数组中的 <ListItem /> 元素上, 而不是放在 `ListItem` 组件中的 `<li>` 元素上.

```jsx
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 一个好记的方法是 map() 需要keys
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("listnumbers")
);
```

而 key 只是在 sibling 中必须唯一, 不需要全局唯一, 可以使用相同的 key 值 来生成两个不同的数组.

```jsx
```

Key 会传递信息给 React, 但不会传递给组件, 如果组件中需要 key 属性的值, 可以用其他属性名**显式传递**:

```jsx
const content = posts.map((post) => (
  <Post key={post.id} id={post.id} title={post.title} />
));
// 这里 Post 组件可以读出 props.id, 但是读不出 props.key
```

## JSX 中嵌入 map()

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

//其中 JSX 允许在大括号中嵌入任何表达式, 可以内联 map() 返回结果:
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```

值得注意的是, 如果一个 map() 里有很多嵌套, 那可能这个时候就是**提取组件**的好机会.
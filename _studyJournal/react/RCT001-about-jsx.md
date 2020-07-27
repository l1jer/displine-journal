# JSX
- [JSX](#jsx)
  - [- JSX Represents Objects](#ullijsx-represents-objectsliul)
  - [JSX 是什么?](#jsx-是什么)
  - [Why JSX?](#why-jsx)
  - [Embedding Expressions in JSX 嵌入表达式](#embedding-expressions-in-jsx-嵌入表达式)
  - [JSX also is an Expression](#jsx-also-is-an-expression)
  - [Spucifying Attributes with JSX](#spucifying-attributes-with-jsx)
  - [JSX Prevents Injection Attacks](#jsx-prevents-injection-attacks)
  - [JSX Represents Objects](#jsx-represents-objects)
---

## JSX 是什么?

```js
const element = <h1>Hello, world!</h1>;
```

JS 的一个语法扩展, 可以很好地描述 UI 应该呈现出它应有交互的本质形式, 具有 JS 的全部功能, 可以生成 React'元素'.
<br>

## Why JSX?

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，其并没采用将**标记与逻辑分离到不同文件**这种人为分离方式， 而是通过将两者共同存放在“组件(Component)"的松散耦合单元之中, 来实现关注点分离. JS 中将 JSX 和 UI 放在一起时, 会在视觉上有辅助作用, React 中可以显示更多有用的错误和警告信息.

---

## Embedding Expressions in JSX 嵌入表达式

```js
const name = "Jerry Li";
const element = <h1>Hi, {name}</h1>;

ReactDOM.render{
    element,
    document.getElementById('root')
};
// 在{}里面可以放置任何有效的JS表达式， eg. 2+2, user.firstName or formatName(user)
```

任何有效的 JS `Expression` 都可以在 JSX 的大括号里放置使用, 如下调用 JS 的 `formatName(user)` 并将结果嵌入`<h1>`:

```js
function formatName(user){
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: 'Jerry',
    lastName: 'Li'
};

const element = (
    <h1>Hi, {formatName(user)}</h1>!
)

ReactDOM.render{
    element,
    document.getElementById('root')
};
```

> ASI: automatic semicolon insertion, the following statements are affected by ASI for brevity
> empty statement, var, expression, do-while, continue, break, return, throw
> Token: LineTerminator or '}';

## JSX also is an Expression

`if` & `for`, assign it to variable, accept it as arguments, and return it from functions:

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, master.</h1>;
}
```

## Spucifying Attributes with JSX

```js
const element = <div tabIndex="0"></div>; // Strings need quotes
const element = <img src={user.avatarUrl}></img>; // Expressions need curly braces
// Either quotes or curly braces, but not both in the same attribute.
// ReactDOM uses camelCase property naming convention instead of HTML's e.g. className/tabIndex

// Empty tags need to be closed immidiatelywith '/>'
const element = <img src={user.avatarUrl} />;
```

## JSX Prevents Injection Attacks

```js
const title = response.potentiallyMaliciousInput;
// This is safe and prevents XSS attacks
const element = <h1>{title}</h1>;
// By default, React DOM escapes(转义) any values embedded in JSX bf rendering them.
// 渲染前就可以防止那些并非自己的代码注入在脚本中, 所有内容都会转换成 string.
```

## JSX Represents Objects

Babel 会把 jsx 转译为一个 React.createElement() 函数调用:

```js
const element = (
    <h1 className="greeting">greetings</h1>
);
// above 同等于 below:
const element = React.createElement(
    'h1', {className:'greeting'}, 'greetings'
);

// 其中的过程(简化过)是这样的:
const element = {
    type: 'h1',
    props:{
        className:'greeting',
        children:'greetings'
    }
};
```

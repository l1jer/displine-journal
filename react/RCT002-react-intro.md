---
Perl语言的发明人Larry Wall说，好的程序员有3种美德： 懒惰、急躁和傲慢（Laziness, Impatience and hubris）。

懒惰：
是这样一种品质，它使得你花大力气去避免消耗过多的精力。它敦促你写出节省体力的程序，同时别人也能利用它们。为此你会写出完善的文档，以免别人问你太多问题。

急躁：
是这样一种愤怒--当你发现计算机懒洋洋地不给出结果。于是你写出更优秀的代码，能尽快真正的解决问题。至少看上去是这样。

傲慢：
极度的自信，使你有信心写出（或维护）别人挑不出毛病的程序。
---


# Introduction to React 

- React is a JavaScript library - one of the most popular ones, with [over 100,000 stars on GitHub](https://github.com/facebook/react).
- React is not a framework (unlike Angular, which is more opinionated).
- React is an open-source project created by Facebook.
- React is used to build user interfaces (UI) on the front end.
- React is the **view** layer of an MVC application (Model View Controller)
- 可以总结为 `React` 是一个`声明式(declarative)`, `高效(efficient)`和`灵活(flexible)`的 JS 库, 使用`组件(component)`来将一些简短&独立的代码片段组合成复杂的用户界面(UI).

---

## 入门教程链接

- [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) (JS tutorial) - 一个可以对 js 重新认识的文章
- [React basics tutorials in 136-minute() by Team Tree House](https://teamtreehouse.com/library/react-basics-2)
- [Getting Started with React - An Overview and Walkthrough Tutorial by Tania Rascia](https://www.taniarascia.com/getting-started-with-react/)
- [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

## React.Component 子类

```js
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Jerry</li>
          <li>William</li>
          <li>Tony</li>
        </ul>
      </div>
    );
  }
}
```

代码内容解释:
'ShoppingList' -> **React 组件类/组件类型**

**props(properties)** -> 一个组件接收的参数, 后通过**render**方法返回需要展示在屏幕上的视图的层次截结构

**render**方法的返回值 -> 描述了你希望在屏幕上看到的内容, 即 render 返回了一个**React 元素**, 此为一种对渲染内容的轻量级描述

**JSX 语法** -> 大多数 React 开发者使用, 语法`<div/>`会被编译成`React.createElement('div'), 上面的实例中的代码等同于如下:

```js
return React.createElement(
  "div",
  { className: "shopping-list" },
  React.createElement("h1" /* ... h1 children ...*/),
  React.createElement("ul" /* ... ul children ...*/)
);
```
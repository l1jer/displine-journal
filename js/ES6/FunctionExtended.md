# 函数的扩展

- [函数的扩展](#函数的扩展)
  - [1. 函数参数的默认值](#1-函数参数的默认值)
    - [基本用法](#基本用法)
    - [与解构赋值默认值结合使用](#与解构赋值默认值结合使用)
    - [参数默认值的位置](#参数默认值的位置)
    - [函数的 length 属性](#函数的-length-属性)
    - [作用域](#作用域)
    - [应用](#应用)
  - [2. Rest 参数/展开语法](#2-rest-参数展开语法)
  - [3. 严格模式](#3-严格模式)
  - [4. name 属性](#4-name-属性)
  - [5. 箭头函数](#5-箭头函数)
  - [6. 尾部用优化](#6-尾部用优化)
  - [7. 函数参数的尾逗号](#7-函数参数的尾逗号)
  - [8. Function.prototype.toString()](#8-functionprototypetostring)
  - [9. catch 命令的参数省略](#9-catch-命令的参数省略)

## 1. 函数参数的默认值

### 基本用法

昔日:

```js
function log(x, y) {
  y = y || "world";
  console.log(x, y);
}
log("Hello");
log("Hello", "China");
log("Hello", "");
/*
Hello world
Hello China
Hello world
*/
```

(缺点:如果 y 赋值了, 但是对应 boolean 为 false,则赋值会失败, 参数 y 为空字符的话会被改为默认值), 为了弥补这点, 则需要判断参数 y 是否被赋值: `if (typeof y === 'undefined'){y='World';}`

ES6 中可以直接在参数中给予默认值:

```js
function log(x, y = "world") {
  console.log(x, y);
}
log("Hello");
log("Hello", "China");
log("Hello", "");
/*
Hello world
Hello China
Hello 
*/

//另一个例子:
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
p; // Point {x: 0, y: 0}
```

其优势为:

1. 阅读清晰, 一些参数可省略且不用查看函数体或文档;
2. 有利于未来代码优化, 未来版本中在对外接口中, 彻底拿掉参数也不会导致以前代码无法运行.

值得注意的是, 参数变量是默认声明, 不能在其作用域中用 let/const 再次声明, 也不能有同名参数.

### 与解构赋值默认值结合使用

对象解构赋值默认值, 没有使用函数参数的默认值:

```js
function foo({ x, y = 5 }) {
  console.log(x, y);
}
foo({}); // undefine 5
foo({ x: 1 }); // 1 5
foo({ x: 1, y: 2 }); //1 1
foo(); // Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'.

// 前一个实例 调用时没有提供参数, 变量x和y就不会生成从而报错,
// 这里通过提供函数参数默认值就可以避免
function foo({ x, y = 5 } = {}) {
  console.log(x, y);
}
foo(); //undefiend 5
```

解构赋值默认值实现 fetch 方法:

```js
// 如果fetch第二个参数是对象, 便可以为其三个属性设置默认值, 但是这样绝不能省略第二个参数.
function fetch(url, { body = "", method = "GET", headers = {} }) {
  console.log(method);
}

fetch("http://exampl.com", {}); // GET
fetch("http://exampl.com");
// Uncaught TypeError: Cannot destructure property `body` of 'undefined' or 'null'.

// 这里结合函数参数的默认值便可以省略第二参数, 产生双中默认值.
function fetch(url, { body = "", method = "GET", headers = {} } = {}) {
  console.log(method);
}
fetch("http://exampl.com");
```

额外:

```js
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

m1(); // [0,0]
m2(); // [0,0]

m1({ x: 1, y: 2 }); //[1,2]
m2({ x: 1, y: 2 }); //[1,2]

m1({ x: 1 }); //[1,0]
m2({ x: 1 }); //[1, undefined]

m1({}); //[0,0]
m2({}); //[undefined, undefined]

m1({ z: 3 }); //[0,0]
m2({ z: 3 }); //[undefined, undefined]
```

### 参数默认值的位置

通常定义了默认值的参数, 应该是函数的尾参数, 这样比较容易看出来到底省略了哪些参数, 如果非尾部的参数设置默认值, 实际上这个参数是没法省略的, 除非显式输入 undefined, 然而 null 就只能返回 null.

### 函数的 length 属性

指定了参数之后再去取 length 值, 则会返回没有指定默认值的参数个数, length 属性失真.
因为 length 属性的含义是该函数预期传入的参数个数, 同理 rest 参数也不会计入 length 属性, 并且如果设置了默认值的参数不是尾参数, 那么 length 属性也不再计入后面的参数了.

### 作用域

一旦设置了参数的默认值, 函数进行声明初始化时, 参数会形成一个单独的 context, 初始化结束后就会消失. 这种语法行为, 没有设置参数默认值时是不会出现的.

```js
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2); // 2
// 在这里, 默认值变量x 被定义在这个作用域中, 默认值变量 x 指向第一个参数 x, 而不是全局变量 x, 所以输出 2

let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f(); // 1
// 这里 y=x形成一个单独作用域, 在这里的变量x本身没有定义, 则指向外层的全局变量x, 所以局部变量x影响不到默认值变量x.
// 如果在这里移除全局变量x, 则会报错 x isn't defined
// 如果参数为 x=x 也会报错, 参数x=x会形成一个单独作用域, 即let x=x, 即暂时性死区.
```

如果参数默认值是函数, 也是同理作用域:

```js
let foo = "outer"; // 这里移除全局变量则会报错
function bar(func = () => foo) {
  let foo = "inner";
  console.log(func());
}
bar(); // outer
// 函数bar的参数func的默认值是匿名函数, 指向变量foo为返回值, 在这个单独作用域里面, 并没有定义变量foo, 所以foo指向外层的全局变量foo, 因此输出 outer
```

```js
var x = 1;
function foo(
  x,
  y = function () {
    x = 2;
  }
) {
  var x = 3; // 如果把这里的var移除, 则foo()输出为2
  y();
  console.log(x);
}
foo();
x;
```

函数 foo 的参数产生作用域,

1.  声明了变量 x, 后声明了变量 y, y 的默认值是匿名函数
2.  匿名函数内部的变量 x, 指向同一个作用域的第一个参数 x
3.  函数 foo 内部又声明了一个内部变量 x, 该变量与第一个参数 x 不在同作用域, 所以不是用一个变量
4.  执行 y 后, 内部变量 x 和外部全局变量 x 的值都没变

### 应用

利用参数默认值可以指定某参数不得省略, 省略则会报错.

```js
function throwIfMissing() {
  throw new Error("Missing Parameter");
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo(); // Error
```

反之则可以将参数默认值设为 undefined, 表明此参数可以省略.

```js
function foo(optional = undefied) {...}
```

## 2. Rest 参数/展开语法

获取函数的多余参数, 可以不使用 arguments 对象了, `...`搭配数组,将多余参数放入数组中.
比如这个加法实例:

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum = +val;
  }
  return sum;
}
add(3, 9, 8); //20
```

arguments 实例:

```js
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

const sortNUmbers = (...numbers) => numbers.sort;
```

**rest 参数必须是最后一个参数**

## 3. 严格模式

ES5 中函内部可以设定为严格模式, 而 ES2016 中修改为, 只要函数参数使用了默认值/解构赋值/扩展运算, name 函数内部就不能显式设定为严格模式, 否则报错.

原因是函数内部的严格模式 同时适用于函数体和函数参数. 但是函数执行时会先执行函数参数再执行函数体, 但是只要从函数体之中才能知道参数是否应该以严格模式执行, 但是参数却应该先于函数体执行.

解决方法为

1. 全局严格模式
2. 函数包在一个无参数的立即执行函数里:

```js
const bobDoSomething = (function () {
  "use strict";
  return function (value = 42) {
    return value;
  };
})();
```

## 4. name 属性

返回该函数的函数名, ES5 的时候返回空字符串, ES6 以后才会返回实际函数名.
但也有一些特例:

```js
new Function().name; // 'anonymous'
function foo() {}
foo.bind({}).name; // 'bound foo'
(function () {}.bind({}).name); // 'bound '
```

## 5. 箭头函数

之前学习过了, 此处记载一些实例.

```js
var f = (v) => v;
var f = function (v) {
  return v;
};

//特例
let foo = () => {
  a: 1;
};
foo(); // undefined
```

特例中意图是返回一个对象 `{a:1}`, 但是由于引擎认为大括号是代码块, 所以执行了一行语句 `a:1`, a 可以解释为语句的标签, 因此实际执行的语句是`1;`就结束了且没有返回值.

## 6. 尾部用优化

## 7. 函数参数的尾逗号

## 8. Function.prototype.toString()

ES2019 修改 `toString()` 方法, 明确要求返回一模一样的原始代码(以前是会省略注释和空格)

## 9. catch 命令的参数省略

ES2019 以后 `try...catch` 的 `catch` 后面允许省略参数

# 变量的解构赋值

- [变量的解构赋值](#变量的解构赋值)
  - [数组](#数组)
    - [基本用法](#基本用法)
    - [默认值](#默认值)
  - [对象 **重点**](#对象-重点)
  - [字符串](#字符串)
  - [数值 n 布尔值](#数值-n-布尔值)
  - [函数参数](#函数参数)
  - [圆括号的问题](#圆括号的问题)
    - [不能使用圆括号的情况](#不能使用圆括号的情况)
    - [可以使用圆括号的情况](#可以使用圆括号的情况)
  - [用途 **重点**](#用途-重点)
    - [1. 变换变量的值](#1-变换变量的值)
    - [2. 从函数返回多个值](#2-从函数返回多个值)
    - [3. 函数参数的定义](#3-函数参数的定义)
    - [4. 提取 JSON 数据](#4-提取-json-数据)
    - [5. 函数参数的默认值](#5-函数参数的默认值)
    - [6. 遍历 Map 结构](#6-遍历-map-结构)
    - [7. 输入模块的指定方法](#7-输入模块的指定方法)

## 数组

### 基本用法

ES6 中允许按照一定模式, 从数组和对象中提取值, 对变量进行赋值, 称之为`解构(Destruction)`.

即 `let [a,b,c] = [1,2,3]`.

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo, bar, baz -> 1, 2, 3

let [, , third] = ["foo", "bar", "baz"];
third; // "baz"

let [x, , y] = [1, 2, 3]; // x, y -> 1, 3

let [head, ...tail] = [1, 2, 3, 4]; // head, tail -> 1, [2,3,4]

let [x, y, ...z] = ["a"]; // x, y, z -> 'a', undefined, []
```

解构失败的变量值就等于 undefined., 但是不完全解构, 可以成功:

```js
let [x, y] = [1, 2, 3];
let [a, [b], c] = [1, [2, 3], 4];
```

如果等号右边不是数组(可遍历的解构), 那么会报错, 因为等号右边的值, 转为对象以后不具备 Iterator 接口(前五个), 或者本身就不具备(最后一个):

```js
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// Set 结构
let [x, y, z] = new Set(["a", "b", "c"]);
x; // 'a'
```

实际上, 具有 iterator 接口的数据结构都可以采用数组形式的解构赋值, 比如下面的`fibs`就是一个 Generator 函数, 原生具有 iterator 接口, 解构赋值会依次从这个接口获取值:

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield (a[(a, b)] = [b, a + b]);
  }
}

let [first, second, third, forth, fifth, sixth] = fibs();
sixth; // 5
```

### 默认值

解构赋值允许指定默认值.

ES6 中内部使用严格相等运算符( === ), 判断一个位置是否有值. 所以只有当一个数组元素严格等于`undefined`, 默认值才能生效.

```js
let [x = 1] = [undefined];
x; // 1

let [x = 1] = [null];
x; // null

// 如果一个数组元素是 null则默认值不会生效, 因为 null 不严格等于 undefined
```

如果默认值是一个表达式, 则是惰性求值, 用到的时候才会求值.

```js
function f() {
  console.log("aaa");
}
let [x = f()] = [1]; // 因x可以取到值, so 函数f不会执行.

// 等同于下面
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}

// -----
let [x = 1, y = x] = []; // x=1, y=1
let [x = 1, y = x] = [2]; // x=2, y=2
let [x = 1, y = x] = [1, 2]; // x=1, y=2
let [x = y, y = 1] = []; // Error
```

## 对象 **重点**

## 字符串

```js
const [a, b, c, d, e] = "hello"; // 每一个字母按顺序对应每一个字母

let { length: len } = "hello"; // 同时可以对 length 属性解构赋值
len; //5
```

## 数值 n 布尔值

等号右边是数值和布尔值, 则会先转换为对象:

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true

//数值和布尔值的包装对象都有 toString的属性, 因此变量x都能取到值.
```

解构赋值的原则是: 只要等号右边的值不是对象/数组, 就会先转换为对象. 但由于 undefined 和 null 无法转为对象, 解构即报错.

## 函数参数

```js
//实例1
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3

//实例2
[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b); // [3, 7]

//函数参数解构使用默认值
//函数move的参数=对象, 解构这个对象得到变量x和y的值; 如果解构失败, x和y等于默认值
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3,8]
move({ x: 3 }); // [3,0]
move({}); // [undefined, undefined]
move(); // [0,0]

//下面这样写会得到不同结果
//函数move的参数指定默认值, 而不是为变量x和y指定默认值, 因此得到不同结果
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

move({ x: 3, y: 8 }); //[3,8]
move({ x: 3 }); //[3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// undefined 会触发函数参数默认值
[1, undefined, 3].map((x = "yes") => x); // [1, 'yes', 3]
```

## 圆括号的问题

编译器只有在解析到/解析不到等号才能知道是式子还是模式, 但是如果模式中出现圆括号, ES6 中的规则是, 只要有可能导致解构的歧义, 就不能使用圆括号. 但是依然处理起来很麻烦, 所以尽量不要在模式中放置圆括号.

### 不能使用圆括号的情况

1. 变量声明语句(报错)

```js
let [(a)]=[1]
let ({x:c})={}
let {(x:c)}={}
let {x:(c)}={}
let {(x):c}={}

let {o:({p:p})}={o:{p:2}}
```

2. 函数参数(报错)

```js
function f([(z)]) { return z; }
function f([z,(x)]) { return x; }
```

3. 赋值语句的模式(报错)

```js
`
({ p: a } = { p: 42 });
([a]) = [5];

[({ p : a }), { x: c}] = [{}, {}];
`;
```

### 可以使用圆括号的情况

赋值语句的非模式部分:
是赋值语句, 而非声明语句; 圆括号都不属于模式的一部分.

```js
`
[(b)] = [3];
({ p: (d)} = {});
[(parseInt.prop)] = [3];
`;
```

## 用途 **重点**

### 1. 变换变量的值

### 2. 从函数返回多个值

### 3. 函数参数的定义

### 4. 提取 JSON 数据

### 5. 函数参数的默认值

### 6. 遍历 Map 结构

### 7. 输入模块的指定方法

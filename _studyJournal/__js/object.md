# Object 一切皆对象

- [Object 一切皆对象](#object-一切皆对象)
  - [函数编程与面向对象的实例对比](#函数编程与面向对象的实例对比)
  - [操作对象的属性](#操作对象的属性)
  - [对象的引用传址](#对象的引用传址)
  - [展开语法完成参数合并](#展开语法完成参数合并)
  - [对象解构](#对象解构)
    - [解构操作的简写形式与变量解构](#解构操作的简写形式与变量解构)
    - [多层对象解构](#多层对象解构)
    - [解构默认值实现配置项合并](#解构默认值实现配置项合并)
    - [函数参数的解构特性](#函数参数的解构特性)
  - [Proxy 代理拦截](#proxy-代理拦截)
    - [Proxy 控制函数](#proxy-控制函数)
    - [Proxy 控制数组](#proxy-控制数组)
  - [JSON](#json)
    - [JSON 序列化](#json-序列化)
    - [自定义 toJSON](#自定义-tojson)
    - [JSON -> JS](#json---js)

---

## 函数编程与面向对象的实例对比

函数编程容易造成冗长代码, 改良成为对象就会优秀,

函数:

```js
let name = "jerry";
let grade = [
  { name: "js", score: 99 },
  { name: "html", score: 1 },
];
function average(grade, name) {
  let total = grade.reduce((t, l) => t + l.score, 0);
  // 这一块没有梳理明白
  return `${name}的平均成绩是: ${total / grade.length}`;
}
console.log(average(grade, name));
```

对象:
在对象里面,想查询某一数据就会变得非常便利.

```js
let user = {
  name: "jerry",
  grade: [
    { name: "js", score: 99 },
    { name: "html", score: 1 },
  ],
  average() {
    let total = this.grade.reduce((t, l) => t + l.score, 0);
    return `${this.name}的平均成绩是: ${total / this.grade.length}`;
  },
};
console.log(user.average);
```

## 操作对象的属性

```js
let jer = {
  "my name": "jerry",
  name: "jerjer",
  grade: [
    { name: "js", score: 99 },
    { name: "html", score: 1 },
  ],
};
for (const key in jer) {
  console.log(jer[key]); // [{…}, {…}]
}
console.log(jer["my name"]); // jerry
jer.age = 19;
jer.get = function () {
  return `${this.name}的年龄是${this.age}`;
};
console.log(jer.get()); // jerjer的年龄是19
delete jer.age;
console.log(jer.get()); // jerjer的年龄是undefined
```

## 对象的引用传址

```js
let users = { name: "jerry" };
function show(a) {
  a.age = 18;
}
let a = 1; // 这里并不会改变show(a)的值
show(user); // 在 user 中添加 age 并且赋值 18.
```

## 展开语法完成参数合并

```js
let user = { name: "jerry", age: 18 };
let lang = { ...user, lang: "zh" };
// {name:'jerry', age:18, lang:'zh'}
```

上传文件类型大小更替

```js
function upload(params){
  let config = {
    type:"*.jpeg", "*.bmp",
    size: 1024
  };
  config = {...config, ...params};
  console.log(config);
}
console.log(upload({size:128, type:"*.gif"}));
```

## 对象解构

展开语法 -> 数组的批量梳理
解构语法 -> 元素结构的分解处理

```js
function user()={name:'jerry', age:18};
{name:n, age:a} = user;
console.log(n,a);

function cmd(){
  return {name:'jerry', age:18};
}
let {name, age}=cmd();

// 赋值
function user({name,age}){
  console.log(name,age)  // jerry 18
}
user({name:'jerry', age:18});
// 同样也可以选择部分参数传递

let{random} = Math;
console.log(random());
```

```js
// 严格模式
"use strict";
// {name, age}={name:'jerry', age:18} --> incorrect!
let /* const */ { name, age } = { name: "jerry", age: 23 };
```

### 解构操作的简写形式与变量解构

```js
let web = { name: "baidu", url: "baidu.com" };
let { name, url } = web;
console.log(name, url); // baidu baidu.com

let arr = ["baidu", "baidu.com"];
let [b] = arr;
console.log(b); // baidu.com
```

### 多层对象解构

```js
let cmd = {
  name: "jerry",
  skill: {
    title: "javascript",
  },
};
let {
  name,
  skill: { title },
  /*
  解析为 let {title}={ title:'javascript' };
  */
} = cmd;
console.log(name, title); // jerry javascript
```

### 解构默认值实现配置项合并

```js
let user = { name: "jerry", url: "baidu.com" };
// 这里即为默认值, 下面解构不会更改这里
let { name:'tom', url, title='javascript' } = user;
console.log(title); // javascript
console.log(name); // jerry

// 这个方法可以做参数合并
function createElement(options={}){
  let {width=200, height:100, backgroundColor='red'} = options;
  // 这里是默认参数
  const div = document.createElement('div');
  div.style.width = width +'px';
  div.style.height = height +'px';
  div.style.backgroundColor = backgroundColor +'px';
  document.body.appendChild(div);
}
createElement(width:60, height:30);
// 这里永远是优先, 改变默认参数
```

### 函数参数的解构特性

```js
function cmd(name, { sex: a, age: b }) {
  console.log(name, a, b); // jerry male 18
}
cmd("jerry", { sex: "male", age: 18 });
```

---

## Proxy 代理拦截

```js
"use strict";
const cmd = { name: "jerry" };
const proxy = new Proxy(cmd, {
  // ↑ 第一个参数是所要拦截的目标对象, 第二个参数是对象, 用来定制拦截行为. ↑
  get: function (obj, property) {
    console.log(property); // {name: 'jerry'}
    return obj[property];
  },
  set(obj, property, value) {
    // (目标对象, 所要访问属性, 所要访问数值)
    console.log(value); // jerry
    obj[property] = value;
  },
});
console.log(proxy.name);
```

### Proxy 控制函数

```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1);
}
let proxy = new Proxy(factorial, {
  apply(func, obj, args) {
    console.log(func);
    console.log(obj);
    console.log(args);
    // 计算阶乘的运行时长
    console.time("run");
    func.apply(this, args);
    console.timeEnd("run");
  },
});
proxy.apply({}, [1000]);
```

### Proxy 控制数组

对数组进行截断处理.

```js
let proxy = new Proxy(cmd, {
  get(array, key) {
    const title = array[key].title;
    const len = 10;
    // return title.length > len ? title.substr(0, len) + ".".repeat(3) : title;
    // 只显示标题
    array[key].title =
      title.length > len ? title.substr(0, len) + ".".repeat(3) : title;
    return array[key];
    // 显示整个数组内容
  },
});
console.log(JSON.stringify(proxy[1], null, 2));
```

## JSON

### JSON 序列化

以往的 xml -> JSON: 通用传送数据的格式

1. 配置项
2. 多元沟通传递通用数据, 就好比英文在国际上的地位

```js
let data = {
  name: "jerry",
  data: {
    age: 18,
  },
};

let json = JSON.stringify(data, null, 2);
console.log(json);
```

### 自定义 toJSON

```js
let data = {
  title: "jerry",
  age: {
    years: 18,
  },
  toJSON: function () {
    return {
      title: this.title,
      age: this.age.years,
    };
  },
};

let json = JSON.stringify(data, null, 2);
console.log(json);
```

### JSON -> JS

```js
let json = JSON.stringify(data, null, 2);
let obj = JSON.parse(json, (key, value) => {
  // 转化成字符串
  if (key == "title") {
    value = "Mr." + value;
  }
  return value;
});
```

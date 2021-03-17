# Class 类

- [Class 类](#class-类)
  - [声明定义](#声明定义)
  - [构造函数](#构造函数)
  - [属性定义](#属性定义)
  - [函数差异](#函数差异)
  - [静态访问](#静态访问)
    - [静态属性](#静态属性)
    - [静态方法](#静态方法)
  - [访问器](#访问器)
  - [访问控制](#访问控制)

模拟传统的 class, 但是底层实现机制依然是原型继承, class 只是语法糖为了让类声明与集成更加简洁清晰.

## 声明定义

1. 类声明和赋值表达式定义类, 推荐使用类声明来定义类
2. 类方法间不需要逗号

```js
class user {
  show() {}
  get() {
    console.log("get method");
  }
}
const cmd = new user();
cmd.get();

console.log(user == user.prototype.constructor); //true
console.log(cmd == user.prototype.constructor); //true
```

## 构造函数

- Constructor 构造函数传递参数, constructor 会在 new 时自动执行.
  **show -> 构造函数方法**
  **getName -> 原型方法**
- 构造函数用于传递对象的初始参数, 但不是必须定义, 如果不设置的话, 系统会设置如下类型
  - 自构造器中调用完 `super` 后才可以用 `this`
  - `super`
- 按照原理分析, 类 其实就是 函数, 其中 constructor 用来定义函数代码, 和普通函数对比, 结构是一致的, 包括在类中定义的方法也会保存在函数原型中

```js
class user {
  constructor(name) {
    this.name = name;
    this.show = function () {};
  }
  getName() {
    return this.name;
  }
}
const cmd = new user("jerry");
console.log(cmd);
```

## 属性定义

在 class 中定义的属性为每个 new 出的对象独立创建,

```js
class user {
  constructor(name, site) {
    this.name = name;
    this.site = site;
  }
  show() {
    console.log(this.site + ":" + this.name);
  }
}
let cmd = new user("jer", 18);
cmd.show();
```

## 函数差异

虽然 class 使用函数声明类的语法糖, 但是也有区别 - 定义的方法不能枚举

```js
class user {
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}

let jer = new user("jerry"); //不会枚举出show属性
for (const key in jer) {
  console.log(key);
}

function cmd(name) {
  this.name = name;
}
cmd.prototype.show = function () {
  console.log(this.name);
};
let obj = new cmd("jerjer");
for (const key in obj) {
  console.log(key);
}
```

**class 中默认使用严格模式**

## 静态访问

### 静态属性

为 类 设置属性, 而不是为生成的对象设置:

```js
function user() {}
user.site = "jerry";
console.dir(user); // user()

const cmd = new user();
console.log(cmd.site); // undefined
console.log(user.site); // jerry
```

在 class 中为属性添加 static 关键字 即 声明为静态属性, 可以吧为所有对象使用的值定义为静态属性.

```js
class Request {
  static HOST = "https://www.baidu.com";
  query(api) {
    return Request.HOST + "/" + api;
  }
}
// 这里不是很理解
let request = new Request();
```

### 静态方法

通过类访问不能使用对象访问的方法, 比如系统的 `Math.round()`, 一般情况下, **方法不需要对象属性参与计算就**可以定义为静态方法.

在 class 内声明的方法前使用 static 定义的方法 -> 静态方法

## 访问器

对对象的属性进行访问控制

使用访问器对私有属性进行管理:

- 使用访问器可以管控属性, 有效防止属性随意修改
- 访问器就是在函数前加上 `get/set` 修饰, 操作属性时不需要加函数的括号,可以直接用函数名

```js
class user {
  constructor(name) {
    this.data = { name };
  }
  get name() {
    return this.data.name;
  }
  set name(value) {
    if (value.trim() == "") throw new Error("invalid params");
    this.data.name = value;
  }
}
let cmd = new user("jerry");
cmd.name = "Mr.";
console.log(cmd.name);
// 这一块也不是很理解
```

## 访问控制

> 这部分有点复杂, 涉及到还未学习的 Symbol 和 WeakMap
> 设置对象的私有属性有多种方式, 例如 模块封装.

- `public` 不受保护的属性, 在类的内部与外部都可以访问到
- `protected` 受保护的属性, 不允许外部直接操作, 但可以继承后在类内部访问, 有以下几种方式定义
  - 命名保护: 将属性定义为以 `_` 开始, 声明其为私有属性, 请不要在外部使用; 继承时可用.
    - 外部修改私有属性是可以使用访问器 `setter` 操作
    - 但此方法也只是提示作用, 并不能限制行为
  - Symbol: 定义私有访问属性, 在外部通过查看对象结构无法获取的属性
  - WeakMap: 是一组键/值对的集??
- `private` 私有属性, 只在当前类可以访问到, 并且不允许继承使用
  - 为属性或方法名前加 # 为声明为私有属性
  - 只能在声明的类中使用
- 属性保护 保护属性并使用访问器控制

# Function 函数

- [Function 函数](#function-函数)
  - [Object & attributes](#object--attributes)
  - [匿名函数](#匿名函数)
    - [立即执行函数与块作用域 解决冲突](#立即执行函数与块作用域-解决冲突)
  - [参数](#参数)
    - [形参和实参](#形参和实参)
    - [默认参数使用技巧](#默认参数使用技巧)
      - [数组元素排序实例](#数组元素排序实例)
      - [`箭头函数`实例](#箭头函数实例)
      - [运算实例](#运算实例)
    - [函数参数与 argument](#函数参数与-argument)
      - [函数参数](#函数参数)
      - [Argument](#argument)
  - [箭头函数](#箭头函数)
    - [箭头函数简化实例 - Filter 过滤器](#箭头函数简化实例---filter-过滤器)
    - [箭头函数简化后实例 - reduce 求和](#箭头函数简化后实例---reduce-求和)
  - [递归算法 Recursion Algorithm](#递归算法-recursion-algorithm)
    - [递归求和与点语法注意事项 M](#递归求和与点语法注意事项-m)
    - [递归实现倒三角](#递归实现倒三角)
    - [递归附加参数使用技巧](#递归附加参数使用技巧)
  - [回调函数 Callback Function](#回调函数-callback-function)
  - [展开语法 ` 收``放 `自如](#展开语法-收放自如)
    - [[...args] + reduce](#args--reduce)
    - [购物车折扣实例](#购物车折扣实例)
  - [函数中使用 this 的状态](#函数中使用-this-的状态)
    - [常量改变 this 指针](#常量改变-this-指针)
    - [箭头函数改变 this 指针](#箭头函数改变-this-指针)
      - [标准版 箭头函数更改 this 指针 => 指向对象本身](#标准版-箭头函数更改-this-指针--指向对象本身)
      - [按钮实例实操箭头函数更改 this 指向](#按钮实例实操箭头函数更改-this-指向)
      - [SUM: 箭头函数更改 this 指针](#sum-箭头函数更改-this-指针)
    - [this 的构造原理](#this-的构造原理)
      - [Apply() & Call()](#apply--call)
      - [Call() & Apply() 的区别在于传递参数的方式](#call--apply-的区别在于传递参数的方式)
      - [call/apply 传参自体验:](#callapply-传参自体验)
      - [构造函数方法继承, 使代码变成可复用](#构造函数方法继承-使代码变成可复用)
      - [开发面板实例](#开发面板实例)
      - [Bind()](#bind)
        - [bind 绑定事件](#bind-绑定事件)
        - [bind 实现随机颜色更替](#bind-实现随机颜色更替)

---

## Object & attributes

```js
// ObjectName.propertyName

let func = new Function("title", "console.log(title)");

function abd(title) {
  console.log(title);
}
abd("baidu.com"); // baidu.com

let cmd = function (title) {
  console.log(title);
};

// 分号怎么回事 还没解释

// 对象的存在 即 存储方法和属性
let user = {
  name: null,
  setUsername: function (name) {
    this.name = name;
  },
  getUsername: function () {
    return this.name;
  },
};
user.setUsername("terminal");
console.log(user.getUsername());
```

`let` 是不会把对象加载到`window`里面, 但是`var`创建的对象时会加在`window`里面.
函数不要独立存放, 建议使用类和模块来进行管理, 函数传递在类里面

---

## 匿名函数

```js
show();
function show(){
    console.log("showcase");
}  // 变量提升

function sum( ...args){
    return args.reduce((a,b) {
        return a + b;
    });
}
```

---

### 立即执行函数与块作用域 解决冲突

**此部分为理解原理, 扩展知识, 模块化和类已经代替此方法**

```js
// 1.js
function cmd() {
  console.log("4.1.js-cmd");
}
function show() {
  console.log("4.1.js-show");
}
```

```js
// 2.js
// 如果在index.html里面调用1.js和2.js,
// 用作用域的方式套其中一个, 使其变为非全局作用域的函数,
// 同样的函数就会只执行作用域外面的.
(function(){
function cmd(){
    console.log("4.2.js-cmd");
}
function show(){
    console.log("4.2.js-show");
}
}))
//可以理解为 匿名函数 套 函数 制造作用域
```

```js
(function (window) {
  function cmd() {
    console.log("4.2.js-cmd");
  }
  function show() {
    console.log("4.2.js-show");
  }
  window.js2 = { cmd, show };
})(window);

// 在index.html中调用 js2.cmd() 便可以调用
```

还可以利用块级作用域解决此问题

```js
{
  let cmd = function () {
    console.log("4.2.js-cmd");
  };
  let show = function () {
    console.log("4.2.js-show");
  };
  windows.js2 = { cmd, show };
}
```

---

## 参数

∂

### 形参和实参

```js
function sum(a, b) {
  // a, b 是形参
  return a + b;
}
console.log(sum(1, 2)); // 1, 2是实参
// 形参 > 实参, 大于部分undefine
// 实参 > 形参, 大于部分不显示
```

### 默认参数使用技巧

```js
function avg(total, year) {
// function avg(total, year = 1) 函数参数这样写可以直接代替下一行代码
  year = year || 1; // 默认参数 1
  return Math.round(total / year);
}
console.log(avg(2000, 3)); /// 667
console.log(avg(2000); // 1, 如果没有上面的默认参数则会生成NaN
```

#### 数组元素排序实例

```js
function sortArray(array, type = "asc") { // 默认参数升序
  return array.sort(function (a, b) {
    return type == "asc" ? a - b : b - a;
  });
}
console.log(sortArray([3,1,4,2]));  // [1,2,3,4]
// 默认 type 参数改成降序 desc
console.log(sortArray([3,1,4,2],,"desc"));  // [4,3,2,1]
```

#### `箭头函数`实例

```js
function sortArray(array, type = "asc") { // 默认参数升序
  return array.sort((a, b) =>
    type == "asc" ? a - b : b - a;);
}
console.log(sortArray([3,1,4,2]));  // [1,2,3,4]
// 默认 type 参数改成降序 desc
console.log(sortArray([3,1,4,2],,"desc"));  // [4,3,2,1]
```

#### 运算实例

```js
// 大部分情况里默认参数放在后面
function sum(total, dicount = 0, dis = 0) {
  return total * (1 - discount) * (1 - dis);
}
console.log.sum(1000, 0.1, 0.2);
```

### 函数参数与 argument

#### 函数参数

```js
// 一般写法
let arr = [1, 2, 3, 4, 5, 6, 7].filter(function (a) {
  return a <= 3;
});
console.log(arr); // [1,2,3]

// 利用函数参数
function cmd(a) {
  return a <= 3;
}
let arr = [1, 2, 3, 4, 5, 6, 7].filter(cmd);
console.log(arr); // [1,2,3]

// 定时器
// 函数/匿名函数都可以
var i = 0;
function cmd() {
  console.log(++i);
}
setInterval(cmd, 1000);

// 按钮
<button id="bt"></button>

function event(){
        alert(this.innerHTML);
    }
document.getElementById("bt".addEventListener("click",event);
```

#### Argument

`Argument` 是一个类似数组但不是数组的对象, 存在于数组中,其具有数组相同的访问性质及方式, 能够由`arguments[n]来访问对应的单个参数的值, 并拥有数组长度属性 length. 其存储的是实际传递给函数的参数, 而不局限于函数声明所定义的参数列表.

```js
function sum() {
  // 旧方法
  console.log(arguments.length);
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// Argument 利用reduce
function sum() {
  console.log(arguments);
  return [...arguments].reduce((a, b) => a + b);
}
console.log(sum(1, 23, 4, 42, 56, 45, 34));

// 展开语法代替arguments 更简洁
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
console.log(sum(1, 23, 4, 42, 56, 45, 34)); // 168
```

## 箭头函数

```js
//正常写 函数
let cmd = function () {
  return 1 + 2;
};
// 箭头函数/胖箭头 - 函数
let cmd = () => {
  return 1 + 2;
};
```

### 箭头函数简化实例 - Filter 过滤器

```js
// 正常写 filter 过滤器
let cmd = [1, 2, 3, 4, 5, 6].filter(function (value, index) {
  return value <= 3;
});

// 箭头函数 -  filter 过滤器
let cmd = [1, 2, 3, 4, 5, 6].filter((value) => {
  // index没有使用则去掉,
  // 当这里的filter参数只有value一个的时候可以不需要加括号
  return value <= 3;
});

// ↓↓  进一步优化  ↓↓
let cmd = [1, 2, 3, 4, 5, 6].filter((value) => value <= 3);
// 去掉大括号, 去除return, 参数直指参数条件.
```

### 箭头函数简化后实例 - reduce 求和

```js
let sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b);
```

递归/构造/事件处理要考虑作用域问题, 很难使用箭头函数.

## 递归算法 Recursion Algorithm

例如: 5 的阶乘(factorial), 5x4x3x2x1

```js
// 常用写法
function factorial(num) {
  if (num == 1) {
    return 1;
  }
  num * factorial(num - 1);
}

// 简化写法 - 三元运算 / Ternary operator
function factorial(num) {
  return num == 1 ? 1 : num * factorial(--num);
}

// 细化递归过程
console.log(num(3));
return 3 * factorial(3 - 1); // return 3*2*1
return 2 * factorial(2 - 1); // return 2*1 代入顶层
return 1;
```

递归只需要`考虑时机`和`深入两层`

### 递归求和与点语法注意事项 M

```js
function sum(...args) {
  //   console.log(args);
  if (args.length == 0) {
    return 0;
  }
  return args.pop() + sum(...args);
}
console.log(sum(1, 2, 3, 4, 5, 6)); // 21

/*
// console.log(args)的过程:
(6) [1, 2, 3, 4, 5, 6]
(5) [1, 2, 3, 4, 5]
(4) [1, 2, 3, 4]
(3) [1, 2, 3]
(2) [1, 2]
[1]
[]
*/
```

箭头函数简化后:

```js
function sum(...args) {
  return args.length == 0 ? 0 : args.pop() + sum(...args);
}
console.log(sum(1, 2, 3, 4, 5, 6)); // 21
```

递归算法逻辑一定要完全理解.

### 递归实现倒三角

想起来 Python 做的练习了, 感觉都忘光了...

```js
function star(sum){
  if(sum == 0){
    return '';
  }  // 退出机制
  document.write('*'.repeat(sum)+'<br/>)' || star(--sum);
}

// 换用三元表达式简化
function star(sum){
return sum ? (document.write('*'.repeat(sum)+'<br/>') || star(--sum)) : '';
}
star(5);
```

### 递归附加参数使用技巧

[跳至 demo](D:\jiarui.li\gitlab-hirain-trial\public-resource\jiarui.li\react-journal\react-journal\public\0019-ternary-operator.html)

```js
let browsers = [
  {
    title: "Chrome",
    click: 15,
  },
  {
    title: "Firefox",
    click: 45,
  },
  {
    title: "Opera",
    click: 79,
  },
];
// 递归方法
function change(browsers, num = 100, i = 0) {
  if (i == browsers.length) {
    return browsers;
  }
  browsers[i].click += num;
  return change(browsers, num, ++i);
}
console.table(change(browsers));

// 优秀的 Map 方法
browsers.map(function (item) {
  item.click += 100;
});
console.table(browsers);
```

---

## 回调函数 Callback Function

理论: 其他函数中调用函数.

```js
// addEventlistener('click',function()) -> 可以理解为一个函数
// 而其中的 function() 则是 回调函数
document.getElementById("bt").addEventListener("click", function () {
  alert(this.innerHTML);
});

let cmd = [1, 2, 3, 4];
cmd.map(function (value, index, array) {
  array[index] += 10; //根据所引来进行改变
  // return value;  这里写不写都是一样
});
console.table(cmd);
```

## 展开语法 ` 收``放 `自如

### [...args] + reduce

```js
let cmd = [1, 2, 3]; // 收
let [a, b, c] = [...cmd]; // 放

let [a, ...edu] = [1, 2, 3, 4]; //a=1, edu=2,3,4

function sum(...args) {
  console.log(arguments);
  // Arguments(4) [1, 2, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]
  console.log(args);
  // (4) [1, 2, 3, 4]
  return args.reduce((a, b) => a + b);
  // 得到总和
}
console.log(sum(1, 2, 3, 4555555));
```

### 购物车折扣实例

```js
function sum(discount = 0, ...price) {
  // 展开语法放在后面, 否则报语法错误
  // console.log(price);
  let total = price.reduce((a, b) => a + b); // 得到总价
  return Math.round(total * (discount / 10));
}
console.log(sum(9, 50, 100, 20));
```

## 函数中使用 this 的状态

`this` 在这里的意义在于**可以免去每一次更改对象名称的繁琐手续**.
`对象`小节里会详细诠释 this 在对象中的运用

```js
let obj = {
  name: "cmd",
  show: function () {
    // 对象里的函数 => 类方法
    console.log(this); // cmd对象, 指代对象本身
    function render() {
      // 对象里的函数的函数 => 普通函数
      console.log(this); // window全局对象, 函数内的this一般指代全局对象window
    }
    return this.name; // return obj.name;
  },
};
console.log(obj.show());
```

那么, 如何在函数内使用 this 指代对象本身呢?

```js
// 这里有作用域链的概念
function user(name) {
  // 参数中定义name即可防止向上查找
  this.name = name;
  this.show = function () {
    return this.name;
  };
}
let jer = new user("jerry");
console.log(jer.show());
```

### 常量改变 this 指针

以往解决 this 指针的方式

```js
let browsers = {
  site: "core",
  lists: ["chrome", "safari", "firefox"],
  show: function () {
    console.log(this);
    console.log(this.site);
    console.log(this.lists);
    // 正常显示对象属性
    const self = this; // 把 this 赋值给 self以便函数内可以直接使用 this
    return this.lists.map(function (value) {
      console.log(self); // 这里只可以去查找上方 self, 而本身this仍旧指window
      // 涉及到作用域链的问题
      return `${self.site} - ${value}`;
    });
  },
};
console.table(browsers.show());
```

**一个妙极了的方法改变`this`指针, 从上方实例中优化:**

```js
let browsers = {
  site: "core",
  lists: ["chrome", "safari", "firefox"],
  show: function () {
    return this.lists.map(function (value) {
      return `${this.site} - ${value}`;
    }, this); // 有些特殊函数可以通过第二参数改变this指针, 比如map函数
  },
};
console.table(browsers.show());
```

### 箭头函数改变 this 指针

#### 标准版 箭头函数更改 this 指针 => 指向对象本身

```js
let browsers = {
  site: "core",
  lists: ["chrome", "safari", "firefox"],
  show: function () {
    console.log(this);
    //   const self = this;
    return this.lists.map((title) => `${this.site} - ${title}`); // 指向对象本身
  }, // 箭头函数(里没有this)使得其作用域内的this指向上下文 => 向上在父级作用域里找this
}; // 箭头函数的this具有词法作用域, 而普通函数内的没有, 这是在运行时绑定的.
console.table(browsers.show());
```

#### 按钮实例实操箭头函数更改 this 指向

实例目标: 取按钮值, 在按钮值前面加上字符串
[点击查看 demo](../../react-demo/public/0021-this-syntax.html)

1. 箭头函数实现更改 this 指向

```js
//
let Dom = {
  site: "你用力地点击了",
  bind: function () {
    const button = document.getElementById("button1");
    button.addEventListener("click", (event) => {
      //   console.log(this);
      console.log(event.target); // event属性中有target
      console.log(this.site + event.target.innerHTML + "下"); // 这里this指向了声明的Dom对象
      // innerHTML来取HTML标签里面的内容
    });
  },
};
Dom.bind();
```

2. 对象属性中添加 `const self = this;`, 且在 `button` 中添加函数, 实现函数内 this 指针.

```js
let Bom = {
  site: "你巧妙地锤击了",
  bind: function () {
    const button = document.getElementById("button2");
    const self = this;
    button.addEventListener("click", function () {
      console.log(self.site + this.innerHTML + "下"); // 这里this指向了button
    });
  },
};
Bom.bind();
```

3. 在对象中添加方法,实现 `addEventListener` 中的 `this` 向上查找

```js
let Com = {
  site: "你怎么没完没了地点我们的",
  handleEvent: function (event) {
    // 此处是类方法
    console.log(this.site + event.target.innerHTML + "下");
  },
  bind: function () {
    const button = document.getElementById("button3");
    button.addEventListener("click", this);
  },
};
Com.bind();
```

4. 多个按钮 `bind()` 的处理方式

```js
let Xom = {
  site: "所有按钮都被监视中, 我看见你按我们",
  handleEvent: function (event) {
    console.log(this.site + event.target.innerHTML + "了");
  },
  bind: function () {
    let buttons = document.querySelectorAll("button");
    // 这里箭头函数 this => 对象本身
    buttons.forEach((elem) => {
      // 此处 this => 父级对象
      elem.addEventListener("click", () => {
        console.log(this.site + event.target.innerHTML);
        /*
        buttons.forEach(function(elem){ 
          // 此处为普通函数, this => window
          elem.addEventListener('click',()=>{
            // 此处 this => window
            */
      });
    });
  },
};
Xom.bind();
```

#### SUM: 箭头函数更改 this 指针

**箭头函数也可称之为 lambda 方法, 定义轻量级的内联回调函数**

1. 父级函数定义一个变量 `const self = this`,
2. 使用箭头函数, 使 `this` 向父级查找继而指向对象本身
3. 使用函数(在对象中添加方法)使得 `this` 指向 `DOM` 当中对象

- 箭头函数中 this 指向父级查找, 继而指向对象本身
- 一般函数中 this 指向全局对象 window
- 大量使用同一按钮 => 普通函数
- 大量需要调用父级对象/方法 => 箭头函数

**个人理解后总结性发言**: 箭头函数简化了函数代码并且不会创建新作用域, 其作用域属于父级作用域, 所以父级作用域的 this 指向即箭头函数 this 指向.

### this 的构造原理

**模块对象还会继续延伸本部分内容**
Call(), apply() & bind() 都是为了改变 this 指针而存在, 有些细微差别

#### Apply() & Call()

this 的构造原理:

```js
function user(name) {
  // This is a 构造函数 (the Function constructor)
  this.name = name; // 这里的this时空的{}, 可以被改变
  // return {a:'tom'}; // 此时此处会直接代替jerry变量中的值
}
let jerry = new user("jerry"); // 在user函数中生成 {name:'jerry'},
console.log(jerry);

let john = { 中文: "约翰" }; // 此时jerry即jerry

user.call(john, "john"); // 传入到user函数的name变量里, 此时this => john对象
console.log(john);
```

#### Call() & Apply() 的区别在于传递参数的方式

```js
let amy = {
  name: "Amy",
};
let emily = {
  name: "Emily",
};
function user(birthyear, gender) {
  console.log(birthyear + gender + this.name);
}
user.call(amy, "1990年生,", "性别女,");
user.apply(amy, ["1990年生,", "性别女,"]);
// 首位参数为对象
// call中第二位参数依次传入函数参数
// apply中的数组元素依次传入函数参数
/*  1. 两者传递到函数内得到this指针;
    2. 均立即执行, 不需要其他附加指令.
    */
```

#### call/apply 传参自体验:

```js
function show() {
  alert(this.innerHTML);
}
let buttons = document.querySelectorAll("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (event) => {
    show.call(event.target);
    // 这里没有参数, 换成apply是一样的
  });
}
```

数组传参来理解两者区别:

```js
let arr = [1, 2, 3, 4, 5];
console.log(Math.max(...arr)); // 展开语法获得元素
console.log(Math.max.call(Math, arr)); // 是无效的
console.log(Math.max.apply(Math, arr)); // 在这里就只能使用apply()而非call()
```

#### 构造函数方法继承, 使代码变成可复用

请求文章列表和请求用户列表方式, 用 request 创建复用代码

```js
// 此处为可复用的构造函数
function request() {
  // 善用代码复用
  this.get = function (params) {
    let str = Object.keys(params)
      .map((k) => `${k}=${params[k]}`)
      .join("&");
    let url = `http://news.sina.com/${this.url}/${str}`;
    console.log(url);
  };
}

// 请求文章列表, 备注为原始方法
function article() {
  this.url = "article/lists";
  request.call(this);
  //   this.get = function (params) {
  //     console.log(Object.keys(params));
  //     let str = Object.keys(params)
  //       .map((k) => `${k}=${params[k]}`)
  //       .join("&");
  //     console.log(`http://news.sina.com/${this.url}/${str}`);
  //   };
}
let a = new article();
console.log(a.get({ id: 1, cat: "js" }));

// 请求用户列表, 备注为原始方法
function players() {
  this.url = "players/lists";
  request.call(this);
  //   this.get = function (params) {
  //     console.log(Object.keys(params));
  //     let str = Object.keys(params)
  //       .map((k) => `${k}=${params[k]}`)
  //       .join("&");
  //     console.log(`http://news.sina.com/${this.url}/${str}`);
  //   };
}
let player = new players();
player.get({ id: 2, role: "admin" });
```

#### 开发面板实例

一般方法:

```js
document.querySelectorAll("dt").forEach((dt, i) => {
  dt.addEventListener("click", () => {
    let dds = document.querySelectorAll("dd");
    dds.forEach((dd) => dd.setAttribute("hidden", "hidden"));
    dds[i].removeAttribute("hidden");
    panel.call(null, i);
  });
});
```

call()方法:

```js
document.querySelectorAll("dt").forEach((dt, i) => {
  dt.addEventListener("click", () => panel.call(null, i));
  // 没有用到this便传递空集null, 否则报错
});
function panel(i) {
  let dds = document.querySelectorAll("dd");
  dds.forEach((dd) => dd.setAttribute("hidden", "hidden"));
  dds[i].removeAttribute("hidden");
}
```

#### Bind()

区别于 `call()` 和 `apply()`, `bind()` 是**不会立即执行**,其次是**有两次传参的机会**.

```js
function show() {
  console.log(this.name);
}
// call和apply会立即执行
show.call({ name: "jerry" }); //
show.apply({ name: "jerry" });
// bind可以得到一个函数
let func = show.bind({ name: "jerry" });
console.log(func); // show(){ console.log(this.name);}
```

`bind` 立即执行方式 - 尾部加上括号

```js
show.bind({ name: "jerry" })();
```

`bind` 映射函数, 传址, 浅拷贝

```js
let a = function () {};
let b = a;

console.log(a === b); // true
b = a.bind(); // 映射, 浅拷贝
console.log(a === b); // false
```

`bind` 传值的实现方式

```js
function cmd(a, b) {
  return this.f + a + b;
}
let func = cmd.bind({ f: 1 }, 1, 2);
func(); // a=1, b=2, 得到 1 1 2

let func = cmd.bind({ f: 1 }, 1);
func(3, 4); // a=3, b没有值, 得到1 3

let func = cmd.bind({ f: 1 });
func(3, 4); // a=3, b=4, 得到1 3 4
```

##### bind 绑定事件

```html
<button>监听事件</button>

<script>
  document.querySelector("button").addEventListener(
    "click",
    function () {
      document.write(this.url + event.target.innerHTML);
    }.bind({ url: baidu.com }) // 按钮文字变成 'baidu.com监听事件'
  );
</script>
```

##### bind 实现随机颜色更替

```js
function color(elem) {
  this.elem = elem;
  this.color = ["#f5f5f5", "#bc5247", "#a8f5c2"];
  this.run = function () {
    setInterval(
      function () {
        let i = Math.floor(Math.random() * this.colors.length);
        this.elem.style.backgroundColor = this.colors[i];
      }.bind(this),
      1000
    );
  };
}
let obf = new Color(document.body);
obj.run();
let h1 = new Color(document.querySelector('h1'));
h1.run();
```

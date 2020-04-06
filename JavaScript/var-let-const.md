Let/const a = "html"; //必须在声明后使用
let 变量;  const 常量;
TDZ 临时报错?
尽量用 let/const 代替 var,
先声明后赋值再使用;

```js
  Var web = "CSS";
  Var web;
  Web = "CSS";

  Var a = "a",

  b = "b",
  Url = "google.com";
  Var a = b = c = "html";
```

var 修改本地变量; 在 function 内不加 var 即修改全局变量
强烈建议使用 let 在块作用域
```js
  Console.log(web);
  Console.log(typeof web); //查询类型
```

-----

#### 基本数据类型：

| Undefined | Null   | Boolean              |
| --------- | ------ | -------------------- |
| Number    | String | Symbol (new in ES 6) |

```js
+ 基本类型的值是不可变的
+ 基本数据类型的值是按值访问的。

  var str = "123hello321";
  str.toUpperCase();   // 123HELLO321
  console.log(str);   // 123hello321
```
```js
+ 基本类型的比较是它们的值的比较

  var a = 1;
  var b = true;
  console.log(a == b);  // true
  console.log(a === b);  // false
```

上面 a 和 b 的数据类型不同，但是也可以进行值的比较，这是因为在比较之前，自动进行了数据类型的 隐式转换。

```js
== : 只进行值的比较
=== : 不仅进行值得比较，还要进行数据类型的比较
```

```js
+ 基本类型的变量是存放在栈内存（Stack）里的
  var a,b; 
  a = "zyj"; 
  b = a; 
  console.log(a);    // zyj 
  console.log(b);    // zyj 
  a = "呵呵";    // 改变 a 的值，并不影响 b 的值 
  console.log(a);    // 呵呵 
  console.log(b);    // zyj 
```

图解如下：栈内存中包括了变量的标识符和变量的值

-----------------

#### 引用类型

除过上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 Object 类型。细分的话，有：Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型 等

```js
+ 引用类型的值是可变的
+ 引用类型的值是按引用访问的

  var obj = {name:"zyj"};     // 创建一个对象
  obj.name = "percy";         // 改变 name 属性的值
  obj.age = 21;               // 添加 age 属性
  obj.giveMeAll = function(){
    return this.name + ":" + this.age;};  // 添加 giveMeAll 方法
  obj.giveMeAll();
```

```js
+ 引用类型的比较是引用的比较

	var obj1 = {};        // 新建一个空对象 obj1
	var obj2 = {};        // 新建一个空对象 obj2
	console.log(obj1 == obj2);    // false
	console.log(obj1 === obj2);   // false
```

因为 obj1 和 obj2 分别引用的是存放在堆内存中的2个不同的对象，故变量 obj1 和 obj2 的值（引用地址）也是不一样的！

```js
+ 引用类型的值是保存在堆内存（Heap）中的对象（Object）与其他编程语言不同，JavaScript 不能直接操作对象的内存空间（堆内存）。

  var a = {name:"percy"};
  var b;
  b = a;
  a.name = "zyj";
  console.log(b.name);    // zyj
  b.age = 22;
  console.log(a.age);     // 22
  var c = {name: "zyj",
           age: 22};
```
图解如下：
	• 栈内存中保存了变量标识符和指向堆内存中该对象的指针
	• 堆内存中保存了对象的内容

--------

#### 严格模式

"use strict" 严格模式, 推荐使用
帮助我们纠正一些问题,和变量作用域类似, 向下查找纠错.
这样代码更加标准化, 养成好习惯.
可以避免意外创建全局变量

---


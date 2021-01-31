# 重新梳理 JS 理论知识
- [重新梳理 JS 理论知识](#重新梳理-js-理论知识)
  - [Primary Expression 主要表达式](#primary-expression-主要表达式)
  - [Left-hand-side Expression](#left-hand-side-expression)
  - [函数声明提升](#函数声明提升)
  - [this this this](#this-this-this)
    - [Global context 全局环境](#global-context-全局环境)
    - [Function context 函数(运行内)环境](#function-context-函数运行内环境)

---

## Primary Expression 主要表达式

|Primary Expression|Basic keywords & general expressiona in JS|基础关键字和常用表达式|
-|-|-
`this`|refers to a special property of an excution context|指向函数的执行上下文
`function`|defines a function expression|函数表达式
`class`|defines a class expression|类表达式
`function*`|defines a generator function expression|generator函数表达式
`yield`|Pause/resume a generator function|暂停/恢复generator函数
`yield*`|Delegate to another generator function or iterable object| 委派给另一个generator函数或可迭代对象
`async function`|defines an async function expression|异步函数表达式
`await`|Pause/resume an async function and wait for the promise's resolution/rejection.|暂停/恢复执行异步函数. 并等待promise的resolve(?)/reject回调
`[]`|Array initializer/literal syntax|数组初始化/字面量语法
`{}`|Object initializer/literal syntax|对象初始化/字面量语法
`/ab+c/i`|Regular expression literal syntax|正则表达式字面量语法
`()`|Grouping operator|分组操作符

---
## Left-hand-side Expression

LHS Expression|Left values are athe destination of an assignment|左边的值时赋值的目标|
-|-|-
Property accessors|Member operator provide access to a property or method of an object(`object.property` & `object["property"]`).| 属性访问符:成员运算符提供了对对象属性或方法的访问
`new`|creates an instance of a constructor|创建了构造函数实例
`new.target`|In constructors, refers to the constructor that was invoked by `new`|构造器中,指向`new`调用的构造器
`super`|calls the parent constructor|调用父类的构造器
`...obj`|**Spread syntax** allows an expression to be expanded in places where multiple arguments(for function calls)/multiple elements(for array literal) are expected|展开运算符: 可将一个可迭代的对象在函数调用的位置展开成为多个参数/在数组字面量中展开成多个元素数组

```js
var a = 3;
b=a++;  // b=a=a+1  b=3  a=4
b=a--;  // b=a=a-1  b=3  a=2
b=++a;  // b=a+1=a  b=4  a=4
b=--a;  // b=a-1=a  b=2  a=2
// a -= b -> a=a-b
// a += b -> a=a+b

Left/Right Shift Assignment 左右移赋值
>>= / <<=: 向左或向右移 指定位数的比特位
```

## 函数声明提升
Function declarations in JS are hoisted to the top of the **enclosing function** or **global scope**.The function can be use bf you declared it.

**函数声明**被提升到了**函数定义**, 可在函数声明之前使用该函数.

```js
// 此处提升
hoisted(); // logs "foo"
function hoisted(){
    console.log('foo');
}
//此处无提升
notHoisted(); 
// TypeError: notHoisted is not a function.
var notHoisted = function(){
    console.log('bar');
};
```

## this this this

* 严格模式和非严格模式会有所不同
* 大多数情况下, 函数的调用方式(runtime binding)决定了`this`的值.
* `this`不能再执行期间被赋值, 并且在每次函数被调用时`this`的值也可能会不同.
* ES5中引入`bind()`可以来设置函数的`this`值, 而不用考虑函数如何被调用的.
* ES6中引入`箭头函数`支持`this`语法解析(在闭合的执行环境内设置`this`的值).

### Global context 全局环境
In the global excution context(out of any function):
 `this` -> the global object (strict & non-strict).
 ```js
console.log(this === windows);  // true

a = 12;
console.log(window.a); // 12

this.b = "ABC";
console.log(window.b)  // "ABC"
console.log(b)         // "ABC"

* globalThis 可以在任何时候(literally)使用全局对象
```
### Function context 函数(运行内)环境

`this` 的值取决于函数被调用的方式
```js
function f1(){return this;}
// 浏览器中
f1() === window;
// Node中
f1() === global;

// this 将保持它进入执行环境时的值, 没有被定义就只能保持为 undefined:
function f2(){
    'use strict'; 
    return this;  // undefined
}
```

`call`或者`apply`方法可以把`this`的值从一个环境传到另一个:
```js
var obj = {a:'Custome'};
var a = 'Global';
function whatsThis(arg){
    return this.a;  // this 的值取决于函数的调用方式
}
```


scope 作用域
context 上下文
statement 声明
function 函数


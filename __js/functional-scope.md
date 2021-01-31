# 作用域 functional scope

- [作用域 functional scope](#作用域-functional-scope)
  - [延伸函数环境生命周期(其实就是闭包)](#延伸函数环境生命周期其实就是闭包)
  - [构造函数中的作用域的使用形态](#构造函数中的作用域的使用形态)
  - [块级作用域](#块级作用域)
  - [let/const/var 在 for 循环中执行原理](#letconstvar-在-for-循环中执行原理)
  - [模拟出 var 的伪块作用域](#模拟出-var-的伪块作用域)
  - [多级作用域嵌套](#多级作用域嵌套)

JS 中不像其他语言, 在全局环境中的函数不会被回收,
**全局变量**不仅仅是全局变量, 在函数中仍旧有效, 堪称为真正渗透的全局变量.
同一个函数, 每次调用都会开辟一片新的内存, 并且数据不会共享.
子函数内可以调用父函数的变量.
系统会自动清除使用完的函数

## 延伸函数环境生命周期(其实就是闭包)

```js
function cmd() {
  let n = 1;
  return function sum() {
    // 此处传值给变量n,
    // console.log(++n);
    let m = 1;
    return function show() {
      console.log(++m);
      console.log(++n);
    };
  };
  sum();
}
let a = cmd();
a(); // 2
a(); // 3
a(); // 4

let b = cmd(); // a和b前后不影响, 指向内存不同
b(); // 2
b(); // 3
b(); // 4

// 如果调用一次函数便会开辟一片内存空间
// 当 return 这块作用域时, 分别用a/b来接受, 即a和b分别是不同的作用域
```

## 构造函数中的作用域的使用形态

```js
function cmd(){
  let n = 1;
  this.sum = function()
  console.log(++n);
}
/*
解析:
function cmd(){
  let n = 1;
  function sum(){
    console.log(++n);
  }
  return {
    sum: sum
  };
}
*/
let a = new cmd();
a.sum();  // 2
a.sum();  // 3

let b = new cmd();
b.sum();  // 2
b.sum();  // 3
```

## 块级作用域

`var` 不存在块级作用域

```js
let a = 1;
let a = 2;
// 这里会报错;
{
  let a = 1; // valid
}
{
  let a = 2; // valid
}
// const和let是一样的效果
```

## let/const/var 在 for 循环中执行原理

```js
for (var i = 1; i <= 3; i++) {
  // 此处是当i=4时判断不再执行函数代码, 但是实际上i时会累加到4
  // 此处var换成let的话会导致函数外console.log(i)的时候报错
  console.log(i); // 1 2 3
}
console.log(i); // i = 4
```

## 模拟出 var 的伪块作用域

```js
for (var i = 1; i <= 3; i++) {
  // 实参
  (function (i) {
    // 形参
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
```

## 多级作用域嵌套

```js
let arr = [];
for (var i = 1; i <= 3; i++) {
  (function (i) {
    arr.push(function () {
      return i;
    });
  })(i);
}
console.log(arr[2]());
```

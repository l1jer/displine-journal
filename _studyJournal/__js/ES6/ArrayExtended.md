# 数组的扩展

## 1. 扩展运算符/Spread

Rest 参数/展开语法的逆运算, 讲一个数组转为用逗号分隔的参数序列, 主要用于函数调用:

```js
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
[...document.querySelectorAll("div")]; // [div#page, div.primary, div.secondary, div#user-options-list.aui-list.hidden ...]

function push(array, ...items) {
  array.push(...items);
}
function add(x, y) {
  return x + y;
}
const numbers = [44, 78];
add(...numbers); // 122
```

同时, 扩展运算符与正常的函数参数可以结合使用, 非常灵活:

```js
function f(v, w, x, y, z) {}
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

// 后面还可以放置表达式
const arr = [...(x > 0 ? ["a"] : []), "b"];
// 但是后面是一个空数组的话则会没有效果
// 比如 [...[], 1]
```

值得注意的是, 只有函数调用时, 扩展运算符才可以放在圆括号中, 否则报错:

```js
(...[1,2]); // Uncaught SyntaxError: Unexpected number
console.log((...[1,2])); // Uncaught SyntaxError: Unexpected number
console.log(...[1,2]) // 1 2
```

### 替代函数的 apply 方法

```js
// ES5
function f(x, y, z) {}
var args = [0, 1, 2];
f.apply(null, args);

// ES6
function f(x, y, z) {}
let args = [0, 1, 2];
f(...args);
```

由于 JS 不提供求数据最大元素的函数, 只能套用 Math.max 函数, 将数组转为一个参数序列求最大值. 但当有了扩展运算符以后, 便可以直接用 Math.max 了.

```js
Math.max.apply(null, [14, 3, 77]); //ES5
Math.max(...[14, 3, 77]); //ES6
//等同于
Math.max(14, 3, 77);
/* -- push函数 将一个数组添加到另一个数组的尾部 -- */
/* ES5 */
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
/* ES6 */
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

### 应用实例

1. 复制数组
   数组是符合的数据类型, 直接复制 -> 复制了指向底层数据结构的指针, 而不是克隆一个全新的数组.

```js
const a1 = [1, 2];
const a2 = [...a1];
// 或
const [...a2] = a1;
```

2. 合并数组 // 浅拷贝, 对原数组的引用
3. 与解构赋值结合, 生成数组

```js
(a = list[0]), (rest = list.slice(1)); //ES5
[a, ...rest] = list; //ES6
```

其中扩展运算符用于数组, 只能放在参数最后一位, 否则报错.

4. 字符串

```js
[...'hello'] // ["h", "e", "l", "l", "o"]

'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
// 换成 扩展运算符
function length(str){
  return [...str].length;
}
length('x\uD83D\uDE80y') // 3
```

5. 实现 iterator 接口的对象
   任何定义了遍历器接口的对象, 都可以用扩展运算符转为真正的数组.

```js
let nodeList = document.querySelectorAll("div"); // 返回了一个NodeList对象, 类似数组的对象.
let array = [...nodeList]; // 这里将其转为真正的数组, 原因是NodeList对象实现了iterator

Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
};
console.log([...5]); // [0, 1, 2, 3, 4]
/* 定义了 Number 对象的遍历器接口后, 扩展运算符将 5 自动转成 Number 实例以后便调用这个接口, 就会返回自定义的结果了. */
// ---

let arrayLike = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 3,
};
let arr = [...arrayLike];
// Uncaught TypeError: object is not iterable
// 此处 arrayLike是一个类似数组的对象, 但是没有部署iterator接口, 改为使用Array.from方便便可以转为真正的数组
```

6. Map 和 Set 结构, Generator 函数
   [...]

## 2. Array.from()

将两类对象转为真正的数组: 类似数组的对象/array-like object 和可遍历/iterable 对象(包括 ES6 的 Set 和 Map)

```js
let arrayLike = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 3,
};

let arr2 = Array.from(arrayLike); // ["a", "b", "c"]
```

常见类似数组的对象是 DOM 操作返回 NodeList 集合, 以及函数内部的 arguments 对象. Array.from 都可以转为真正的数组:

```js
// NodeList 对象
let ps = document.querySelectorAll("p");
Array.from(ps).filter((p) => {
  //这里转化为数组后再用filter
  return p.textContent.length > 100;
});

// arguments 对象
function foo() {
  var args = Array.from(arguments);
}
Array.from([1, 2, 3]); // [1, 2, 3]
```

## 3. Array.of()

将一组值转换为数组, 弥补数组构造函数 Array()的不足, 因为参数个数的不同, 会导致 Array() 的行为有差异

```js
Array.of(5, 19, 11); // [5, 19, 11]
Array.of(5); // [5]
Array.of(5).length; // 1

Array(); // []
Array(3); // [, , ,] -> 参数不少于 2 个时, Array() 才会返回由参数组成的新数组
Array(5, 19, 11); // [5,19,11]

/* Array.of来代替 Array() / new Array(), 并且不存在由于参数不同而导致的重载 */
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1); // [1]
Array.of(1, 2); // [1,2]
```

## 4. copyWithin()

在当前数组内部, 将指定位置的成员复制到其他位置并覆盖原有成员, 然后返回当前数组.

```js
Array.prototype.copyWithin(target, (start = 0), (end = this.length));
// .copyWithin(target, start, end)
```

- target(必须): 从该位置开始替换, 负值表倒数.
- start(可选): 从该位置开始读取数据, 默认为 0, 负值表从末尾开始计算.
- end(可选): 到该位置前停止读取数据, 默认等于数组长度, 负值表从末尾开始计算.

`[1,2,3,4,5].copyWithin(0,3) // [4,5,3,4,5]`

## 5. 数组实例的 find() 和 findIndex()

find() -> 找出第一个符合条件的数组元素

findIndex() -> 找出第一个符合条件的数组元素的位置

参数为一个回调函数, 所有数组元素一次执行该回调函数, 直到找出第一个返回值为 true 的元素, 然后返回该元素; 如果没有符合条件的成员则返回 undefined; 而 findIndex() 则会返回 -1

```js
[1, 3, -5, 10].find((n) => n < 0); // -5
[1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
}); // 10

[1, 5, 10, 15].findIndex(function (value, index, arr) {
  return value > 9;
}); // 2
```

两者都可以接收第二参数, 绑定回调函数 this 对象, 也都可以发现 NaN, 弥补了 indexOf 的不足:

```js
function f(v){
  return v>0this.age
}
let person ={name:'John', age:20};
[10,12,26,15].find(f, person); // 26

[NaN.indexof(NaN)]; //-1
[NaN].findIndex(y => Object.is(NaN,y))  // 0
```

## 6. 数组实例的 fill()

给定值填充一个数组, 用于空数组的初始化很方便, 数组中已有的元素会被全部抹去.

```js
["a", "b", "c"].fill(7);
new Array(3).fill(7);
// [7, 7, 7]

//fill 方法还可以接受第二个和第三个参数, 用于指定填充的起始位置和结束位置.
["a", "b", "c"].fill(7, 1, 2); // ["a", 7, "c"]
//从第一位开始到第二位之前, 填充7;
```

如果填充的类型为对象, name 被赋值的是同一个内存地址的对象, 而不是深拷贝对象.

# 闭包 Closure

**函数和对其周围状态(lexical environment 词法环境)的引用捆绑在一起构成了闭包(closure)**, 闭包可以让你从内部函数访问外部函数作用域, 在 JS 中,每当函数被创建,就会在函数生成时生成闭包.

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
```

## 词法作用域 Lexical Environment

**词法(lexical)**一词指的是, 词法作用域根据源代码中声明变量的位置来确定该变量在何处可用.嵌套函数可访问声明与它们外部作用域的变量

## 闭包

```js
let arr = [1, 23, 56, 3, 77, 65, 4, 9];
let cmd = arr.filter(function (v) {
  return v >= 2 && v <= 9;
});
console.log(cmd);
let a = arr.filter(function (v) {
  return v >= 6 && v <= 10;
});
console.log(a);
```

## 利用闭包获得价格区间商品

```js
let item = [
  {
    title: "cloth",
    price: 30,
  },
  {
    title: "TV",
    price: 3000,
  },
  {
    title: "iPhone",
    price: 300,
  },
];

function btw(a, b) {
  return function (v) {
    return v.price >= a && v.price <= b;
  };
}
console.table(item.filter(btw(50, 1000)));
```

## 移动动画的闭包使用

```js
// btns是一个nodeList, 自带forEach()
let btns = document.querySelectorAll("button");
btns.forEach(function (item) {
  let left = 1;
  item.addEventListener("click", function () {
    // let left = 1; // 每一次点击按钮便产生一个环境, 即内存区域
    console.log(left);
    setInterval(function () {
      item.style.left = left++ + "px";
    }, 50); // 此处高能, 点两次制造疯狂抖动
  });
});
// 每一次点击制造新的环境, 使position返回成初始值
```

## 函数防抖

```js
    // 只要把left变量放在事件监听外面就可以了
    // 但是这样会让每次点击加速移动
          let left = 1;
          item.addEventListener("click", function () {
              setInterval(function () {
               item.style.left = left++ + "px";
              }, 50);
```

## 节流阀

```js
    // 从此处就涉及了 函数防抖/节流 的相关知识点了
    // 在变量 left下面创建另一个变量 interval=false
    // 在 item 事件监听里套上条件渲染 if(!interval){ interval = true} ...
    // 这样的话就制造了节流阀, 使得事件监听事件变成一次性
      btns.forEach(function (item) {
        let left = 1;
        let interval = false;
        item.addEventListener("click", function () {
          if(!interval){
        setInterval(function () {
          item.style.left = left++ + "px";
        }, 50);
      }
```

## 利用 bind 制造节流阀

```js
    btns.forEach(function (item) {
      let bind = false;
      item.addEventListener("click", function () {
        if(!bind){
          bind = true;  //这里写上此语句或者在后面直接 bind = setInterval ... 效果一样
          let left = 1;
          setInterval(function () {
            item.style.left = left++ + "px";
           }, 50);
      }
    // item.style.left !== 1 也可行
```

## 利用闭包根据字段排序商品

常用排序:

```js
//
let st = item.sort(function (a, b) {
  return a.price > b.price ? 1 : -1;
});
console.table(st);
```

闭包排序:

```js
// 可复用代码, 调整不同项的排序
function order(field, type = "asc") {
  return function (a, b) {
    if (type == "asc") return a[field] > b[field] ? 1 : -1; // 升序
    return a[field] > b[field] ? -1 : 1; //降序
  };
}
/*
    command = {
      sort: function (callback) {
        callback(v);
      },
    };
    */
let sstt = item.sort(order("price", "desc"));
console.table(sstt);
```

## 闭包的内存泄漏处理

```js
let divs = document.querySelectorAll("div");
divs.forEach(function (item) {
  let desc = item.getAttribute("desc"); // 异步调用
  item.addEventListener("click", function () {
    // console.log(item.getAttribute("desc"));
    // 重复调取div值造成了父级函数存在于内存中, 造成资源浪费
    console.log(desc);
    console.log(item); // null
  });
  item = null; // 同步先执行, 点击事件时异步执行
  // 每一次点击和清空属于同级作用域, 每次点击过后, item 同时成为 null
});
```

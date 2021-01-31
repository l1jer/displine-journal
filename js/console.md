# console

## alert

警告框, 仅支持一个参数, 看不到具体对象内容, 是一个函数,可以被清除或者赋值其他方法

## console.log

打印内容, 支持多个参数, 可以看到对象的内容, 是一个对象的方法.

```js
var console = {
   log:function(){},
   debug:function(){
   ...
   }
}

console.log = null;
alert(console.log) // clg就真的null了
```

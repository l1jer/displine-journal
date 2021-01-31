# A re-introduction to JavaScript

> JavaScript is a multi-paradigm, dynamic language with types and operators, standard built-in objects, and methods. Its syntax is based on the Java and C languages — many structures from those languages apply to JavaScript as well.

> JavaScript supports object-oriented programming with object prototypes, instead of classes (see more about [prototypical inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) and ES2015 [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)). JavaScript also supports functional programming — because they are objects, functions may be stored in variables and passed around like any other object.

---

- [A re-introduction to JavaScript](#a-re-introduction-to-javascript)
  - [Javascript types](#javascript-types)
    - [Numbers 数字](#numbers-数字)
    - [Strings 字符串](#strings-字符串)
    - [Other types](#other-types)
    - [Variables-变量](#variables-变量)
      - [`let`](#let)
      - [`const`](#const)
      - [`var`](#var)
    - [Operators 运算符](#operators-运算符)
    - [Control structures](#control-structures)
      - [`if & else`](#if--else)

---

## Javascript types

- String
- Number
- Boolean
- Symbol
- Object
  - Function
  - Array
  - Date
  - RegExp
- Null
- Undefine

---

### Numbers 数字

> Numbers in JavaScript are "double-precision 64-bit format IEEE 754 values", according to the spec.
> Number 的类型遵循了 IEEE754-2008 中的 64 位浮点数规则定义的小数后的有效位数至多为 52 位

0.1 + 0.2 == 0.30000000000000004;  
[阮一峰的<浮点数的二进制表示>](http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html)

> Integer values are treated as 32-bit ints, and some implementations even store it that way until they are asked to perform an instruction that's valid on a Number but not on a 32-bit integer.

```js
// The standard arithmetic operators are supported
// Math that provides advanced mathematical functions and constants 提供高级数学运算和常量

Math.sin(3.5);
var circumference = 2 * Math.PI * r;

// parseInt converts a string to an integer
parseInt("123", 10); // 123
parseInt("010", 10); // 10
parseInt("010"); //  8
parseInt("0x10"); // 16
parseInt("11", 2); // 3 binary

// parseFloat() parses floating point numbers
// '+' converts values to numbers
+"42"; // 42
+"010"; // 10
+"0x10"; // 16

parseInt("hello", 10); // NaN

NaN + 5; // NaN (Not A Number)
isNaN(NaN); // true

1 / 0; //  Infinity
-1 / 0; // -Infinity

isFinite(1 / 0); // false
isFinite(-Infinity); // false
isFinite(NaN); // false

// parseInt() & parseFloat() are able to parse numbers from a string only has numbers, otherwise it is invalid.
// However, '+' will return 'NaN' if there is an invalid character
```

---

### Strings 字符串

Strings in JavaScript are sequences of [Unicode characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Values,_variables,_and_literals#Unicode). More accurately, they are sequences of **UTF-16 code units**; each code unit is represented by a 16-bit number. Each Unicode character is represented by either 1 or 2 code units.

```js
"hello".length; // 5

"hello".charAt(0); // "h"
"hello, world".replace("world", "mars"); // "hello, mars"
"hello".toUpperCase(); // "HELLO"
```

### Other types

**[`Null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)** is a value that indicates a deliberate non-value (and is only accessible through the `null` keyword)

**[`Undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)** is a value of type `undefined` that indicates an uninitialized variable and a constant.

```js
// false, 0, empty strings (""), NaN, null, and undefined all become false.
Boolean(""); // false
Boolean(234); // true

// Boolean operations are supported:
// && (logical and), || (logical or), and ! (logical not)
```

---

### Variables-变量

#### `let`

**`let` declares block-level variables.**<u>The declared variable is available from the _block_ it is enclosed in.</u>

```js
let a;
let name = "Simon";
```

```js
// myLetVariable is *not* visible out here

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
}

// myLetVariable is *not* visible out here
```

#### `const`

**`const` allows you to declare variables whose values are **never intended to change\**. <u>The variable is available from the *block\* it is declared in.</u>

```js
const Pi = 3.14; // variable Pi is set
Pi = 1; // this will throw an error because you cannot change a constant variable.
```

#### `var`

A variable declared with the **`var`** keyword is available from the _function_ it is declared in.

```js
var a;
var name = "Simon";
```

```js
// myVarVariable *is* visible out here

for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) {
  // myVarVariable is visible to the whole function
}

// myVarVariable *is* visible out here
```

If you declare a variable without assigning any value to it, its type is `undefined`. 即 **声明变量不赋值 = undefined**.

> An important difference between JavaScript and other languages like Java is that in JavaScript, blocks do not have scope; only functions have a scope. So if a variable is defined using `var` in a compound statement (for example inside an `if` control structure), it will be visible to the entire function. However, starting with ECMAScript 2015, `let` and `const` declarations allow you to create block-scoped variables.

> **Block：语句块** (或其他语言中的 **复合语句**) 用来组织零个或多条语句. 包含在{ }里面, 通常在流程控制语句 (如 `if`, `for`, `while`)中使用.

> **Block-level scope**: **块级作用域**通过 var 声明的变量**没有**块级作用域. 在语句块(block)里声明的变量作用域是其所在的函数或者 script 标签内, 你可以在语句块外面访问到它. 换句话说, 语句块不会生成一个新的作用域. 尽管单独的语句块是合法的语句, 但在 JavaScript 中你不会想使用单独的语句块,因为它们不像你想象的 C 或 Java 中的语句块那样处理事物.

---

### Operators 运算符

[Arithmetic operators by mozilla.org](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()>) Mozzilla.org 的算术运算符详解

Additional reading: [Bitwise operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

`+`, `-`, `*`, `/`, `%`;<br>`+=`, `-=` means `x = x *operator* y`;<br>`++`, `--`

```js
x += 5;
x = x + 5;

"hello" + " world"; // "hello world"
"3" + 4 + 5; // "345"
3 + 4 + "5"; // "75"

123 == "123"; // true
1 == true; // true

// To avoid type coercion, use the triple-equals operator:
// triple '=' 来验证属性
123 === "123"; // false
1 === true; // false

// There are also != and !== operators.
```

### Control structures

#### `if & else`

```js
var name = "kittens";
if (name == "puppies") {
  name += " woof";
} else if (name == "kittens") {
  name += " meow";
} else {
  name += "!";
}
name == "kittens meow";
```

> `URL` = uniform/universal resource locator

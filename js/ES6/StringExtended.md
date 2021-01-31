# 字符串的扩展

- [字符串的扩展](#字符串的扩展)
  - [1. 加强了对 UNICODE 支持](#1-加强了对-unicode-支持)
  - [2. 字符串的遍历器接口](#2-字符串的遍历器接口)
  - [3. 直接输入 u+2028 和 u+2029](#3-直接输入-u2028-和-u2029)
  - [4. JSON.stringify() 改造](#4-jsonstringify-改造)
  - [5. 模板字符串 template string // 和 python 一样](#5-模板字符串-template-string--和-python-一样)
  - [6. 实例:模板编译](#6-实例模板编译)
  - [7. 标签模板 tagged template -> 函数调用来处理模板字符串](#7-标签模板-tagged-template---函数调用来处理模板字符串)
  - [8. 模板字符串的限制](#8-模板字符串的限制)
- [字符串的新增方法](#字符串的新增方法)
  - [1. String.fromCodePoint()](#1-stringfromcodepoint)
  - [2. String.raw()](#2-stringraw)
  - [3. codePointAt()](#3-codepointat)
  - [4. normalize()](#4-normalize)
  - [5. Includes(), StartsWith(), endsWith()](#5-includes-startswith-endswith)
  - [6. repeat()](#6-repeat)
  - [7. padStart(), padEnd()](#7-padstart-padend)
  - [8. trimStart(), trimEnd()](#8-trimstart-trimend)
  - [9. matchAll()](#9-matchall)

## 1. 加强了对 UNICODE 支持

仅限于`\u0000 - \uFFFF`, 超出后必须用双字节表示; 如果超出`0xFFFF`的话, 比如`\u20BB7`会理解为`\u20BB+7`, 由于`\u20BB`是一个不可发音字符, 所以会显示为`空格7`.

```js
"\u0011"; //"a"
"\uD842\uDFB7"; // "𠮷"
"\u20BB7"; // "7"

// 其中ES6改进后, 只要将码点放入大括号就可以正确解读该字符.
"\u{41}\u{42}\u{43}"; // "abc"
let hello = 123;
hello; //123

// 大括号表示法和四字节UTF-16编码等价
"\u{1F680}" === "\uD83D\uDE80"; // true

即6种方法表示一个字符;
"z" === "z"; // true
"\172" === "z"; // true
"\x7A" === "z"; // true
"\u0007A" === "z"; // true
"\u{7A}" === "z"; // true
```

## 2. 字符串的遍历器接口

ES6 之后, Iterator 中的 `for...of` 可以遍历字符串

```js
for (let codePoint of "foo") {
  console.log(codePoint);
}
// f
// o
// o
let text = String.fromCodePoint(0x20bb7);
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
} // � �

for (let i of text) {
  console.log(i);
} // 𠮷

这里字符串 `text` 只有一个字符,
但是 `for` 循环会认为它包含两个字符切不可打印,
而 `for...of` 会正确识别这一个字符 `𠮷`.
```

## 3. 直接输入 u+2028 和 u+2029

JS 字符串允许直接输入字符, 以及输入字符的转移形式, 比如'中'的 unicode 是 u+4e2d, 字符串中可以直接输入汉子也可以输入转义形式`\u4e2d`. 但是其中有五个字符只能转义输入:

| 反斜杠   | \       | reverse solidus     | U+005c |
| -------- | ------- | ------------------- | ------ |
| 回车     | `enter` | carriage return     | U+000D |
| 行分隔符 |         | line separator      | U+2028 |
| 段分隔符 |         | paragraph separator | U+2029 |
| 换行符   |         | line feed           | U+000A |

- JSON 中直接使用行/段分隔符的话, 服务器输出 JSON 会被 JSON.parse 解析后可能报错,
- JSON 格式允许分隔符, 但是其格式已经冻结(RFC 7159), 因此 ES2019 允许 JS 字符串直接输入行/段分隔符.

```js
const json = '"\u2028"';
JSON.parse(json); // 可能报错

所以用以下方式代替: const PS = eval("'\u2028'");
```

## 4. JSON.stringify() 改造

JSON 的数据标准必须是 UTF-8 编码, 但是现在 JSON.stringify()有可能返回不符合 UTF-8 标准的字符串, UTF-8 标准规定 0xD800-0xDFFF 之间的码点不能单独使用, 必须配对使用; 问题在于, JSON.stringify()可能返回者之间的单个码点, ES2019 中改变了其行为, 如果遇到区间单个码点或者不存在的配对形式, 它会返回转义字符串留给应用决定下一步处理.

## 5. 模板字符串 template string // 和 python 一样

增强版字符串,用反引号标识, 可以当做普通字符串使用, 也可以用来定义多行字符串, 或者在字符串中嵌入变量.

```js
`In JS '\n' is a line-feed.`;

`In JS this is
not legal.`

let name = 'Bob, time = 'today';
`Hello ${name},
how r u ${time}?`
```

模板字符串同时会保留所有空格和缩进:

```js
$("#list").html(
  `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim() // trim方法可以消除换行
);
```

其中大括号内可以放入任意 JS 表达式/运算/引用对象属性:

```js
`${x} + ${y * 2}`;

let obj = { x: 1, y: 2 };
`${obj.x} + ${obj.y}`;

function fn() {
  return "hello world";
}
`foo ${fn()} bar`; // foo hellow world bar

// 没有生命的变量会报错
// 字符串会被同样输出
`hello ${"world"}`; // hello world
```

模板字符串同样可以嵌套, 甚至可以引用模板字符串本身写成函数:

```js
let func = (name) => `hello ${name}!`;
func("Jerry"); // hello Jerry
```

## 6. 实例:模板编译

通用模板字符串, 生成正式模板的实例, 用 `<% ... %>` 来输出 JS 表达式 :

```js
let template = `
<ul>
  <% for (let i = 0; i < data.supplies.length; i++) {%>
    <li><%= data.supplies[i] %></li>
    <% } %>
  </ul>`;
```

如何编译这个模板字符串呢? 一种思路是将其转换为 JS 表达式字符串:

```js
echo("<ul>");
for (let i = 0; i < data.suppliers.length; i++) {
  echo("<li>");
  echo(data.suppliers[i]);
  echo("</li>");
}
echo("</ul>");

function compile(template) {
  // 使用正则表达式转换
  const evalExpr = /<%=(.+?)%>/g;
  const exp = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, "`); \n echo( $1 ); \n echo(`")
    .replace(expr, "`); \n $1 \n echo(`");

  template = "echo(`" + template + "`);";

  //封装 template 在一个函数内返回
  let script = `(function parse(data){
  let output ="";

  function echo(html){
    output += html;
  }

  ${template}
  
  return output;
})`;
  return script;
}

let parse = eval(complie(template));
div.innerHTML = parse({ suppliers: ["cat", "dog", "elephant"] });
/*
<ul>
  <li>cat</li>
  <li>dog</li>
  <li>elephant</li>
</ul>;
*/
```

## 7. 标签模板 tagged template -> 函数调用来处理模板字符串

`alert`hello`=== alert(['hello'])`

相当于`标签`即函数, 紧跟在后面的模板字符串即参数. 但是如果模板字符里面有变量, 将会处理模板字符串为多个参数, 再调用函数:

```js
let a = 5;
let b = 10;
// tag`hello ${a + b} world ${a * b}`;
// 上下是相等的, 也可以理解为上方tag是以下面的形式来调用:
// tag(["hello ", " world ", ""], 15, 50);
// --------------------------
function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);
  return "OK";
}

tag`hello ${a + 2} world ${a * b}`;
```

- 如何将各个参数按照原来的位置拼合回去:

```js
let total = 30;
let msg = passthru`the total is ${total} (${total * 1.05} inc. tax)`;

function passthru(literals) {
  let result = "";
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}
msg;
// "the total is 30 (31.5 with tax)"
```

- 使用 rest 参数转化如下:

```js
let total = 30;
let msg = passthru`the total is ${total} (${total * 1.05} inc. tax)`;

function passthru(literals, ...values) {
  let output = "";
  let i;
  for (i = 0; i < values.length; i++) {
    output += literals[i] + values[i];
  }
  output += literals[i];
  return output;
}
msg;
// "the total is 30 (31.5 with tax)"
```

- 而标签模板的一个重要应用方法即**过滤 HTML 字符串, 防止用户输入恶意内容**, 同样可以做多语言转换, 也可以自己手动添加条件判断和循环处理功能

```js
let sender = '<script>alert("000")</script>';
let message = SaferHTML`<p>${sender} has sent u a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 0; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    s += templateData[i];
  }
  return s;
}
message;

// 循环处理
let libraryHtml = hasTemplate`
<ul> 
#for book in ${myBooks}
<li><i>#{book.title}</i></li>
#end
</ul>`;
```

- 标签模板使 JS 中嵌入其他语言变为可能:

```js
jsx`
<div>
<input
  ref='input
  onChange='${this.handleChanhge}'
  defaultValue=${this.state.value}'/>
  ${this.state.value}
</div>
```

- 模板处理函数的首参数(模板字符串数组)伴随一个 raw 属性:
  - console.log`123` -> ["123", raw: Array(1)]
  - raw 中相当于是'生代码', 里面的斜杠等会被转义, 方便取得转义之前的原始模板而设计的.

## 8. 模板字符串的限制

模板字符串默认会将字符串转移, 导致无法嵌入其他语言.
ES2018 中放松了对标签模板里面的字符串转移的限制, 遇到不合法的字符串转移返回 undefined 而不是报错, 并且从 raw 属性上可以得到原始字符串.
但是这种`放松`只在标签模板解析字符串时生效.

# 字符串的新增方法

## 1. String.fromCodePoint()

ES5 中提供了 String.fromCharCode()方法从 Unicode 码点返回对应字符, 但仍旧不能识别码点大于 0xFFFF 的字符, 比如 0x20BB7 的最高位 2 会被舍弃而返回 U+0BB7 对应字符.

ES6 提供了 `String.fromCodePoint()` 方法, 来取代前者弥补不足,在作用上与 `codePointAt()` 方法相反, 其参数如果是多个, 则会被合并成一个字符串返回: `String.fromCodePoint(0x78, 0xlf680, 0x79 === 'x\uD83D\uDE80y`.

其中 `String.fromCodePoint()` 方法定义在 String 对象上; 而`codePointAt` 方法定义在字符串的实例对象上.

## 2. String.raw()

可以作为处理模板字符串的基本方法, 它会将所有变量替换, 而且对斜杠(源字符串的斜杠已经转义的话, 那么此方法会进行再次转义)进行转义, 方便作为字符串来使用.

本质上是一个正常函数, 专用于模板字符串的标签函数; 如果写成正常函数形式的话, 首参数是一个具有`raw`属性的对象, 其 raw 属性的值是一个数组, 对应模板字符串解析后的值.

```js
//`foo${1+2}bar` 等同于下
String.raw({ raw: ["foo", "bar"] }, 1 + 2); // "foo3bar"

String.raw = function passthru(literals, ...values) {
  let output = "";
  let i;
  for (i = 0; i < values.length; i++) {
    output += literals.raw[i] + values[i];
  }
  output += literals.raw[i];
  return output;
};
```

## 3. codePointAt()

JS 内部, 字符以 UFT-16 储存, 每个字符为 2 字节, 对于 4 字节的字符(Unicode 码点大于 0xFFFF 的字符), JS 会认为它们是两个字符.

## 4. normalize()

Unicode 提供了两种方法来表示欧洲语言的语调和重音符号.
a. 带重音符号的字符(\u01D1);
b. 合成符号, 原字符与重音符号的合成, (\u004F\u030C, 配对字符)

但是 JS 不识别, 会拆分成两个符号, ES6 中提供了 normalize() 方法来将字符的不同表示方法统一为同样的形式, 称之为 Unicode 正规化(如英文所意..)

```js
"\u01D1".normalize() === "\u004F\u030C".normalize(); //true
```

其参数可为四个可选值, 如下:

- NFC | Normalization Form Canonical Composition
  > 标准等价合成, 返回多个简单字符的合成字符, '标准等价'指的是视觉和语义上等价.
- NFD | Normalization Form Canonical Decompostion
  > 标准等价分解, 返回合成字符分解的多个简单字符
- NFKC | Normalization Form Compatibility Composition
  > 兼容等价合成, 返回合成字符, '兼容等价'指的是语义上等价, 视觉上不等价.
- NFKD | Normalization Form Compatibility Decomposition
  > 兼容等价分解, 返回合成字符分解的多个简单字符

```js
'\u004F\u030C'.normalise('NFC').length //1
'\u004F\u030C'.normalise('NFD').length //2
NFC参数返回字符的合成形式, NFD -> 分解
```

但是 normalize() 方法不能识别 >=3 的字符合成, 需要使用正则表达式通过 Unicode 编号区间判断.

## 5. Includes(), StartsWith(), endsWith()

在 `indexOf` 方法之余, ES6 提供了**返回布尔值, 且都支持第二参数表开始搜索的位置**的三种新方法:

- includes() 是否找到了参数字符串
- startsWith() 参数字符串是否在原字符串的头部
- endsWith() 参数字符串是否在原字符串的尾部

值得注意的是, 使用第二参数 `n` 时, `endsWith`有所不同, 它是针对前 `n` 个字符, 其他两个方法是针对从第 `n` 个位置直到字符串结束.

## 6. repeat()

返回一个新字符串, 表示将原字符串重复`n`次

```js
"na".repeat(0); // ""
"na".repeat(2); //nana
"na".repeat(2.9); //nana, 小数取整
"na".repeat(Infinity); // RangeError
"na".repeat(-1); //RangeError, 但是如果是0到-1之间的小数, 会视为0
"na".repeat(NaN); //"", 等同于零
"na".repeat("na"); //"" 字符串等同于零
```

## 7. padStart(), padEnd()

ES2017 引入字符串头/尾部补全长度功能, 如字面意思:

```js
"x".padStart(5, "ab"); //"ababx"
"x".padStart(4, "ab"); //"abax"
"x".padEnd(5, "ab"); //"xabab"
"x".padEnd(4, "ab"); //"xaba"

// 补全参数小于原字符长度则直接返回原字符串
"xxx".padStart(2, "ab");
"xxx".padEnd(2, "ab");

// 补全字符串+原字符串超过补全长度, 则截去超出位数的补全字符串
"x".padStart(8, "9876543210"); // "9876543x"

"x".padStart(5); // "    x", 同理padEnd
"12".padStart(10, "0"); // "0000000012" --> 常见用途
"07-02".padStart(10, "YYYY-MM-DD"); // "YYYY-07-02" --> 另一用途:提示字符串格式
```

## 8. trimStart(), trimEnd()

ES2019 增加了这两个方法, 和 trim() 行为一致, 只是这两个分成了头尾部消除空格, 返回新字符串, 不修改原字符串.

```js
const s = "   abc   ";

s.trim(); //'abc'
s.trimStart(); // 'abc   '
s.trimEnd(); // '   abc'
```

## 9. matchAll()

返回一个正则表达式在当前字符串的所有匹配, 参考正则扩展

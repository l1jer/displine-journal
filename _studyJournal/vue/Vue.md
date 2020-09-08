# Vue

- [Vue](#vue)
  - [Vue CLI](#vue-cli)
    - [Single file component/单文件组件](#single-file-component单文件组件)
    - [Naming Regulation/命名规则](#naming-regulation命名规则)
  - [Template/模板](#template模板)
    - [Syntax](#syntax)
    - [Directives 指令](#directives-指令)
    - [Conditional render 条件渲染](#conditional-render-条件渲染)
    - [JSX](#jsx)
  - [Data](#data)
    - [Prop](#prop)
      - [属性校验](#属性校验)
    - [计算属性](#计算属性)
    - [侦听器](#侦听器)
  - [Event 事件](#event-事件)
    - [双向绑定](#双向绑定)
  - [样式](#样式)
    - [内联样式:](#内联样式)
    - [Scoped](#scoped)
  - [组件](#组件)
    - [组件注册](#组件注册)
    - [生命周期](#生命周期)
    - [动态组件](#动态组件)
  - [自定义指令](#自定义指令)
    - [钩子函数参数](#钩子函数参数)
    - [实际操作](#实际操作)

## Vue CLI

**Installation**

`npm i -g @vue/cli` / `yarn global add @vye/cli`

**Create projects**

`vue ui` / `vue create project_name`

### Single file component/单文件组件

- Better encapsulation
- Better template support
- Scoped CSS support (prevent global settings)
- Coordinate with any preprocess through vue-loader

> There are only two hard things in Computer Science: cache invalidation and naming things.
> -- PHIL KARLTON

### Naming Regulation/命名规则

- camelCase -> function/variable
- PascalCase -> file/class
- kebab-case -> HTML(non-case-sensitive)

## Template/模板

### Syntax

Based on HTML

```js
<h1>{{ msg }}</h1>
//value insertion/插值

<div v-once>{{ title }}</div>
//once off value insertion/一次性插值(这个会影响到该节点上的其他数据绑定)

<div v-html='description'></div>
//富文本内容

```

### Directives 指令

v-bind 可用 冒号 来代替
`<img v-bind:alt='title' src=',,.assets/logo.png>` == `<img :alt...>`

v-on 可用 @ 来代替
`<button v-on:click='showTitle'>showTitle</button>` == `< button @click>`

ref
`<base-input ref=''usernameInput></base-input>` --after render--> `this.$refs.usernameInpu.focus();`

### Conditional render 条件渲染

v-if

v-else-if

v-else

v-show
`<div v-show='handler'>`

### JSX

```html
<!-- Instance 1 -->
<template><div class="hello"></div></template>
<script>
	export default {
	  props: { msg: String },
	  data() {
	    return {
	      title: "hello Mr.James!",
	      user:
	    };
	  },
	  render() {
	    return <div class="hello">template</div>;
	  },
	};
</script>
```

## Data

data 返回的属性在响应式系统当中, 而 data 为函数, 因为只有返回一个生产 data 的函数, 这个组建产生的每一个实力才能维持一份被返回对象的独立的拷贝.

### Prop

从父组件到子组件传参,

```vue
// Parent component
<template>
	<div>
		<prop-child parent-name="banjitino"></prop-child>
	</div>
</template>

// Child component
<template>
	<div>father {{ parentName }}</div>
</template>
<script>
export default {
	props: ['parentName'],
};
</script>
```

**Vue 自打 version 2 改为单项数据流**

#### 属性校验

```js
export default {
	props: {
		parentName: {
			type: String, // 类型检查, value 为对应类型的构造函数; null 和 undefined 会通过任何类型验证; 多种类型传入数组[string, array]
			required: true,
			default: 'banjitino', // 默认值为对象或数组的默认值必须从一个工厂函数获取
			validator(value) {
				//自定义校验函数, true ->通过, 反之则不通过
				const nameEnums = ['banjitino', 'Sam'];
				return nameEnums.indexOf(value) !== -1;
			},
		},
	},
};
```

### 计算属性

[计算属性代码](../../_demonsrtrations__vueDemos/chess_queen/src/components/PropChild.vue)

**computed**

- 计算属性是基于其内部的响应式依赖进行缓存的
- 只在相关响应式依赖发生改变时, 它们才会重新求值
- 性能优, 但是消耗数据量和内存很大会阻塞渲染, 则换用 watch 中去执行

**method**

- 无缓存
- 每当触发重新渲染时, 调用方法将总会再次执行函数

### 侦听器

```js
watch:{
  count(){
    log(this.count);
  }
}
```

由于如果 computed 消耗数据量和内存很大会阻塞渲染, 则换用 watch 中去执行.

Vue 2 中 object.defineProperty 有一定局限性, 不能检测随想属性的添加和删除等, 也不能检测数组长度变化(通过改变 length 而增加的长度不能被检测到), 原因是出于性能考量, 不会对数组每个元素都进行监听.

`Vue.set()` 或者 `this.$set()`来解决如上问题

Vue 中来解决数组操作方法:

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
  以上方法 vue 2 中都进行了代理处理

## Event 事件

`v-on` 监听事件
`v-on:click.stop` 时间修饰符(为了保证 methods 方法只有纯粹的数据逻辑和 DOM 解耦, 易于单元测试, 不去处理 DOM 相关的操作)

### 双向绑定

`$emit` 子组件传递父组件 -> 自定义事件

```vue
// 父组件
<template>
  <div>
    {{ msg }}
    <event-parent-child
      :msg="msg"
      @update:msg="msg = $event"
    ></event-parent-child>
    <!--这部分可简写为
    <event-parent-child :msg.sync='msg'></event-parent-child>
 -->
  </div>
</template>

// 子组件
<template>
<button @click='$emit('update:msg','hi')'> say {{ msg }}</button>
</template>
<script>
export default {
  props: ["msg"],
};
</script>
```

## 样式

数据 vm 驱动样式修改, 和 v-bind 一样 -> 但是对于 class:

`v-bind:class='{'ui-demo_status--active':isActive,ui-demo_status--error':hasError}'`

isActive 必须是 truthy value (none of false/0/''/null/undefined/NaN), 这样可以不仅仅可以处理字符串表达式, 而且可以处理对象/数组的表现形式.

### 内联样式:

```vue
<template>
  <div class="ui-demo"
  v-bind:style="{'width':`${width}px`,
  'height':`${height}px`,
  'backgroundColor': bgColor}"></div>
</template>
<script>
export default {
  data(){
    return{
      width:'100',
      height:'100',
      bgColor:'#fff'
    }
  }
}
```

### Scoped

BEM 的来命名 css 污染问题:

```js
<template>
  <div class='test'>Hi</div>
</template>
// Output:
//  <div data-v-4866s4d6 class='test'>Hi</div>
// 这里可以得到一个随机哈希值的 attribute
<style scoped>
.test{ // output: .test[data-v-4866s4d6] {color:red;}
  color:red;
}
</style>
```

## 组件

### 组件注册

- 全局组件

```js
Vue.component('customer-a', {
	render() {
		return <div>custom-a</div>;
	},
});
```

- 局部注册组件: 只能在当前组件中使用

```vue
<template>
<div>
<prop-child parent-name='2'></prop-child>
</div>
</template>
<script>
import PropChild from './PropChild';
export default {
  components:{
    PropChild
  }
}
```

- 全局导入

```js
const requireComponent = require.context(
	// 组件目录相对路径
	'./components',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/Regist\w*\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName);
	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		// 获取和目录深度无关的文件名
		camelCase(
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	);

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果此组件选项是通过 'export default' 导出的, 则会优先使用
		// 否则会退到使用模块的root
		componentConfig.default || componentConfig
	);
});
```

- 按需载入

babel-plugin-import 通过 ES6 import 语法通过编译器导入组件
babel-plugin-component(Element) //饿了么基于前者做了修改的 dependency

```js
import { Button } from 'components';
// 把上面的语法转换成下面的语法
var button = require('components/lib/button');
require('components/lib/button/style.css');
```

### 生命周期

1. new Vue()
2. beforeCreate 初始化 | 事件&生命周期
3. created 初始化 | 注入&校验
4. 是否指定'el'选项?
   1. 否 - 当调用 `vm.$mount(el)` 函数时, 指向 4.2
   2. 是
      1. 是否指定 `template` 选项
         1. 是 -> 将 `template` 编译到 `render` 函数中\*
         2. 否 -> 将 `el` 外部的 `HTML` 作为 `template` 编译\*
         3. beforeMount 后 创建 `vm.$el` 并用其替换 `el`
         4. mounted 代表着挂载完毕
            1. beforeUpdate 当 data 被修改时
            2. Updated 虚拟 DOM 重新渲染并应用更新
            3. 当调用 `sm.$destroy()` 函数时
            4. beforeDestroy 解除绑定, 销毁子组件以及事件监听器
            5. destroyed 销毁完毕

- beforeCreated
  - 最初调用触发
  - data 和 events 都不能用
  - 可以在这里处理 loading
- created
  - 已经具有响应式的 data
  - 可发送 events
  - 可以在这里发送请求
- beforeMount
  - 在模板编译后, 渲染之前触发
  - SSR 中不可用
  - 基本用不上这个 Hook
- mounted
  - 在渲染之后触发,并可访问组件中的 DOM 以及\$ref
  - SSR 中不可用
  - 一般在用于需要在 vue 中嵌入非 Vue 的组件时, 不建议用于发送请求(放在 created 中)
- beforeUpdate
  - 在数据改变后, 模板改变前触发
  - 切勿使用它坚挺数据变化(使用计算属性和 watch 监听)
- updated
  - 在数据改变后,模板改变后触发
  - 常用语重渲染后的大殿, 性能检测或者触发 vue 组件中非 Vue 组件的更新
- beforeDestroy
  - 组件卸载前触发
  - 可以在此时清理事件, 计时器或者取消订阅操作
- destroyed
  - 卸载完毕后触发, 可以做最后的断电或事件触发操作

### 动态组件

- `<keep-alive>` 缓存子组件实例, 通过 vm.\$el 获得先前 DOM 元素, 直接插入. 其 props 如下:
  - include // 字符串或正则表达式, 只有名称匹配的组件会被缓存;
  - exclude // 任何名称匹配的组件都不会被缓存
  - max // 数字, 最多可以缓存多少组实例
- 子组件 life hook:
  - activated // Keep-alive 内组件加载成功后调用
  - deactivated // Keep-alive 内组件缓存成功后调用

## 自定义指令

```js
Vue.directive('demo',{ ... })
  bind: function (el, binding, vnode) {}
  // only call once, 指令第一次绑定到元素时调用,
  // one-time-off initiate configuration
  // el.parentNode = none

  inserted: function(el, binding, vnode){}
  // 被绑定元素插入父节点时调用
  // (仅保证父节点存在, 但不一定已被插入文档中)
  // The parentNode of the this node can be visited here through el.parentNode

  update: function(el, binding, vnode, oldVnode){}
  // 所在组件的 VNode 更新时调用
  // 但是可能发生在其子 VNode 更新之前
  // 指令的值可能发生了改变, 也可能没有
  // 但是可以通过比较更新前后的值来忽略不必要的模板更新

  componentUpdate: function(el, binding, vnode,oldVnode){}
  // 所在组件内的 VNode 以及子 VNode 全部更新后调用

  // only call once when unbind
  unbind: function(el, binding, vnode){}
<div v-demo></div>
```

当 methods 中存在操作 DOM/BOM 的逻辑的时候, 是否可以抽象成一个自定义指令.

### 钩子函数参数

```js
function(
  el,
  // 绑定元素, 可用来直接操作 DOM
  // bind 一个对象, 包含以下属性
  {
    name, // 指令明, 不包含 `v-` 前缀

    // 指令的绑定至, 例如: v-my-directive="1 + 1" 中, 绑定值为 2
    value,

    // 制定绑定的前一个值, 仅在 update 和 componentUpdated 钩子中可用.
    oldValue,

    // 字符串形式的指令表达式
    // 例如: v-my-directive="1 + 1" 中的 '1+1'.
    expression,

    // 传给指令的参数, 可选
    // 例如 v-my-directive:foo 中参数为 'foo'
    arg,

    // 一个包含修饰符的对象,
    // 例如: v-my-directive.foo.bar 中,
    // 修饰对象为 {foo:true, bar:true}.
    modifiers
  },
  // Vue编译生成的虚拟节点
  vnode,

  // 上一个虚拟节点, 仅在 update 和 componentUpdated 钩子中可用.
  oldVnode
  )

```

### 实际操作

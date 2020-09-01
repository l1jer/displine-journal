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
  props: ["parentName"],
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
      default: "banjitino", // 默认值为对象或数组的默认值必须从一个工厂函数获取
      validator(value) {
        //自定义校验函数, true ->通过, 反之则不通过
        const nameEnums = ["banjitino", "Sam"];
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

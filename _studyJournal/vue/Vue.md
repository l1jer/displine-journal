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

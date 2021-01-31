# CSS 架构思想

## SMACSS

### 如何定义 CSS 解构

- base 基础, 某一类元素的通用 \
- layout 布局页面的主体 |-- 模块层
- module 具体实施中的页面模块 /
- state 某种元素的不同装填 \
- theme 网站主题 / --皮肤层

划分页面 css 样式 模块层 皮肤层

## Meta-CSS

- 无语义样式 -> 保证样式移至和样式分离
- 直接以样式为类名

```css
.fl {
  float: left;
}
.mb-10 {
  margin-bottom: 10px;
}
```

宏观全局

1. 无语义通用 CSS 库
2. 常用布局方式 CSS 库
3. 项目布局 CSS 库

微观组件

1. 先写好无关颜色的结构, 再填充颜色
2. 先抛开样式看布局, 写好布局 CSS

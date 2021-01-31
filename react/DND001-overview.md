# React DnD

> 一组 React 高阶组件来进行复杂的拖拽交互, 它在 Trello 和 Sorify 中表现非常完美, 体现了其在应用中不同组件中拖拽并传入数据, 组件会改变他们的表现形式和 state 来展现对其拖拽对应的结果.

使用的时候只需要使用对应的 API 将目标组件进行包裹, 即可实现拖动/接受拖动元素的功能, 将拖动的事件转换成对象中对应状态的形式, 不需要开发者自己判断拖动状态, 只需要在传入的 spec 对象中各个状态属性中做对应处理即可,

`yarn add react-dnd react-dnd-html5-backend`

`npm i react-dnd react-dnd-html5-backend`

后者可以允许 React DnD 使用 `the HTML5 Drag n Drop API`, 或者可以选择第三方后端比如 `the touch backend`.

示例代码:

```js
// <Card text='Write the docs' />
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';

/**
 * Component
 */

export default function Card({ isDragging, text }) {
    const [{ opacity }, dragRef] = useDrag({
        item: { type: ItemType.CARD, text },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });
    return (
        <div ref={dragRef} style={{ opacity }}>
            {text}
        </div>
    );
}
```

## Overview

React DnD 并不像大多数的拖拽库一样, 如果没有用过的话会使用起来相对困难. 然而, 当你熟悉起来之后你会觉得易如反掌. 作者建议先了解拖拽概念再进行进一步阅读, 比如 Flux 和 Redux, React DnD 内部也是用的 Redux.

## Backends

React Dnd 基于 HTML 5 drag and drop API, 因为它截取了拖拽的 DOM 节点(the dragged DOM node), 并使用其作为拖拽预览(drag preview), 但是很不幸的是, H5DnD API 有一些下滑, 它并不能在触摸屏幕上运行, 而且对比其他浏览器, 它在 IE 上提供了更少可定制化的可能性.

所以这就是为什么 H5DnD 在 React DnD 中是一个插件化的选择, 这样的依赖(pluggable implementation)在 React DnD 中叫 `the backends`.

这个 backends 表现了一个和 React 的同步时间系统一样的角色, 它们不用考虑不同的浏览器而是去直接处理本地 DOM 事件.

## Items & Types

React DnD 就像 Flux 和 Redux 一样使用真实资源的数据, 而不是 views, 当某个东西在屏幕中被拖拉, 被称之为一个特定属性的物体被拖动.

那这个*物体*就是拖动了一个纯洁无瑕的 JS 对象, 这个*类型*就是一个字符串或一个`symbol` 在这个 APP 中定义了独一无二的一串*物体*

类型是非常有用的, 因为当你的 APP 越来越成熟, 你或许会制作更多的可拖拽组件, *类型*的存在就是为了让你指定的拖拽源和指定的拖拽目标是匹配的.

> enumeration n.列举;

## Monitors

DnD 是继承状态的, 这个状态必须存在于某处, 可以是正在拖拽的行为中, 也可以在一个现有的类型和一个现有的物体, 或者什么都没有.

RDnD 通过内部状态存储(Monitor)的一些小封装器(wrapper)使这些状态暴露于组件中, 而 `Monitor` 允许开发者通过更新组件 props 来回应 DnD 状态的改变.

对于每一个需要来追踪 DnD 状态的组件, 可以定义一个 collecting function (收集器函数?) 来检索 Monitor 中相关的部分. 于是 RDnD 负责及时调用收集函数并合并其返回值到组件的 props 中.

> retrieve vt.检索;恢复;重新得到. vi.找回猎物. n.[计]检索;恢复,取回

假设国际象棋中当一个棋子被拖拽的时候, 去高亮可移动至的格子, 下面是一个 Cell 组件的收集函数:

```js
function collect(monitor) {
    return {
        highlighted: monitor.canDrop(),
        hovered: monitor.isOver(),
    };
}
```

它指示 RDnD 的最新的 highlighted 和 hovered 的值, 作为 props 传给所有的 Cell 实例.

## Connector

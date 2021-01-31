# Redux

- [Redux](#redux)
  - [一种状态管理的解决方案](#一种状态管理的解决方案)
  - [Redux 实例 - 点击增减计数器](#redux-实例---点击增减计数器)
    - [1. 初始化数据](#1-初始化数据)
    - [2. 获取数据](#2-获取数据)
    - [3. 修改数据 -> 通过动作修改数据](#3-修改数据---通过动作修改数据)
    - [4. 修改视图 -> 监听数据变化, 重新渲染内容](#4-修改视图---监听数据变化-重新渲染内容)
    - [计数器实例代码](#计数器实例代码)

## 一种状态管理的解决方案

解决 React 数据管理(状态 state 管理), 中大型项目/数据比较庞大/组件之间数据交互较多.

- 解决组件的数据通信
- 解决数据和交互较多的应用

**Store**: 数据仓库, 保存数据的地方.
**State**: 一个对象, 数据仓库里的(包含整个应用所需要到的)所有数据.
**Action**: 一个动作, 用来触发数据改变的方法.
**Dispatch**: 触发动作的方法, 调用函数
**Reducer**: 一个函数, 通过获取动作, 改变数据, 生成一个新状态(state), 从而改变页面.

## Redux 实例 - 点击增减计数器

### 1. 初始化数据

```jsx
// 创建仓库
const store = createStore(reducer);
// 用于动作(action)创建新的状态(state)
const reducer = function (state = { num: 0 }, action) {
  //这里的reducer用来初始化数据 和 通过它获取动作
  // action => 不同的动作返回什么样的状态到state
  switch (action.type) {
    case "add":
      state.num++;
      break;
    case "dec":
      state.num--;
      break;
    default:
      break;
    // 这里已经修改了传入参数state, 不建议这么做
    // 可以按照redux官方文档里 用Object.aasign进行副本替换
  }
  return { ...state }; // 等同于对象的copy
  // 这是一个新的对象, 要对其进行解构重组
  // 这里需要对象解构的知识点
};
```

### 2. 获取数据

```jsx
let state = store.getState();
```

### 3. 修改数据 -> 通过动作修改数据

```jsx
store.dispatch({ type: "add" });
// store.dispatch({ type: "add", content:{id: 1, msg:'+1'} });
// 在 type后面加上content可以在console里面看到信息
```

### 4. 修改视图 -> 监听数据变化, 重新渲染内容

```jsx
store.subscribe(() => {
  ReactDOM.render(<Counter />, document.getElementById("counter"));
});
```

### [计数器实例代码](./react-demo/redux-counter.jsx)

```jsx
// 用于动作(action)创建新的状态(state)
const reducer = function (state = { num: 0 }, action) {
  // action => 不同的动作返回什么样的状态到state
  switch (action.type) {
    case "add":
      state.num++;
      break;
    case "dec":
      state.num--;
      break;
    default:
      break;
    // 这里已经修改了传入参数state, 不建议这么做
    // 可以按照redux官方文档里 用Object.aasign进行副本替换
  }
  return { ...state }; // 等同于对象的copy
  // 这是一个新的对象, 要对其进行解构重组
  // 这里需要对象解构的知识点
};

const store = createStore(reducer); // 创建仓库
console.log(store);

function add() {
  // 通过长裤的方法 dispatch 进行修改数据
  store.dispatch({ type: "add" });
  // dispatch 触发 reducer方法, 后将reducer里面的函数内容进行重新操作
}

function dec() {
  store.dispatch({ type: "dec" });
}

// 函数式计数器
const Counter = function (props) {
  let state = store.getState();
  return (
    <div>
      <h1>数量: {state.num}</h1>
      <button onClick={add}>i++</button>
      <button onClick={dec}>i--</button>
    </div>
  );
};

ReactDOM.render(<Counter />, document.getElementById("counter"));

// 回调函数, 在react-redux中这部分会被整合
store.subscribe(() => {
  ReactDOM.render(<Counter />, document.getElementById("counter"));
});
```

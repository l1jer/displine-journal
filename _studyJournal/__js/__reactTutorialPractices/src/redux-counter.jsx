import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// 用于动作(action)创建新的状态(state)
const reducer = function (state = { num: 0 }, action) {
  // action => 不同的动作返回什么样的状态到state
  switch (action.type) {
    case 'add':
      state.num++;
      break;
    case 'dec':
      state.num--;
      break;
    default:
      break;
    // 这里已经修改了传入参数state, 不建议这么做
    // 可以按照redux官方文档里 用Object.aasign进行副本替换
  }
  return { ...state } // 等同于对象的copy
  // 这是一个新的对象, 要对其进行解构重组
  // 这里需要对象解构的知识点
}

const store = createStore(reducer) // 创建仓库
console.log(store);

function add() {
  // 通过长裤的方法 dispatch 进行修改数据
  store.dispatch({ type: 'add' })
  // dispatch 触发 reducer方法, 后将reducer里面的函数内容进行重新操作
}

function dec() {
  store.dispatch({ type: 'dec' })
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
  )
}

ReactDOM.render(
  <Counter />,
  document.getElementById('counter'));

  // 回调函数
store.subscribe(() => {
  ReactDOM.render(
    <Counter />,
    document.getElementById('counter'))
});
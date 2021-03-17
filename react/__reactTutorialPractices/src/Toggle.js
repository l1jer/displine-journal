import React from 'react';
import ReactDOM from 'react-dom';


// 事件渲染
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // 回调中使用 `this`, 必须绑定
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
ReactDOM.render(
  <div>
    <Toggle />
  </div>,
  document.getElementById("toggle")
);

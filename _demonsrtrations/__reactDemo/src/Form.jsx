import React from "react";

export default class Form extends React.Component {
  // 受控组件只有用 setState 改变其状态
  constructor(props) {
    super(props);
    this.state = { value: 'coming soon' }; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {  // handleChange = (e) => {}
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    console.log(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* 下拉菜单 */}
        <select value={this.state.value} onChange={this.handleChange}>
        <option value="apple">苹果</option>  
        {/* 选择其中即可改变文本框内容 */}
        <option value="orange">橘子</option>
        <option value="peach">桃子</option>
        </select>

        {/* 文本输入框 */}
        <input type='text' value={this.state.value} onChange={this.handleChange} />
        {/* 这里 input 直接换成 textarea 即可转换为文字编辑区域 */}
        <input type='submit' value='提交' />
        {/* 上传文件, 或通过使用 FileAPI 进行控制 */}
        <input type='file' />
      </form>
    )
  }
}
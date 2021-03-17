import React from "react";
import ReactDOM from "react-dom";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 0 };
    // 绑定this,使其可回调
    this.setNewNumber = this.setNewNumber.bind(this);
  }

  setNewNumber() {
    this.setState({ data: this.state.data + 1 });
  }

  render() {
    return (
      <div className="btnNum">
        <button onClick={this.setNewNumber}>Counting Stars</button>
        <Content myNumber={this.state.data}></Content>
      </div>
    );
  }
}

class Content extends React.Component {
  componentWillMount() {
    console.log("will mt");
  }
  componentDidMount() {
    console.log("did mt");
  }
  componentWillReceiveProps(newProps) {
    console.log(`will rcv props`);
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(`will updt`);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(`did updt`);
  }
  componentWillUnmount() {
    console.log(`will unmt`);
  }

  render() {
    return (
      <div>
        <h4>{this.props.myNumber}</h4>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Button />
  </div>,
  document.getElementById(`button`)
);

/* <div><Button /></div>, document.getElementById('Id`)
 上述语句中间的逗号非常容易遗漏!谨记!
 解决方案:
 ReactDOM.render()中, 调用HTML标签的时候, 语句写在一行中
*/

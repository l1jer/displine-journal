import React from "react";
import ReactDOM from "react-dom";

class PlusBtn extends React.Component {
  handleClick = () => {
    const { count, onChange } = this.props
    if (onChange) {
      onChange(count + 1)
    }
  }
  render() {
    const { count } = this.props
    return (<button onClick={this.handleClick}>Plus + ${count}</button>)
  }
}

class MinusBtn extends React.Component {
  handleClick = () => {
    const { count, onChange } = this.props
    if (onChange) {
      onChange(count - 1)
    }
  }
  render() {
    const { count } = this.props
    return (<button onClick={this.handleClick}>Minus - ${count}</button>)
  }
}

class Calculatorr extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 50 }
  }
  handleChange = (value) => {
    this.setState({
      count: value,
    })
  }


  render() {
    const { count } = this.state
    return (
      <div>
        <h1>{count}</h1>
        <PlusBtn count={count} onChange={this.handleChange} />
        <MinusBtn count={count} onChange={this.handleChange} />
      </div>
    )
  }
}

ReactDOM.render(
  <div> <Calculatorr /></div >, document.getElementById('calculatorr')
);

// 
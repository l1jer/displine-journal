import React from "react";

export default class FormMul extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isGoing: true, numberOfGuests: 2 }; 
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.name === 'isGoing'? target.checked:target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <input name='isGoing' type='checkBox' checked={this.state.isGoing} onChange={this.handleInputChange} />
        <input name='numberOfGuests' type='number' value={this.state.numberOfguests} onChange={this.handleInputChange} />
      </form>
    )
  }
}
import React from 'react';
import ReactDOM from 'react-dom';

function Welcome(props) {
  return <h4>你好, {props.name}</h4>;
}

// combined functions
function Taowa() {
  return (
    <div>
      <Welcome name="Tim by Taowa" />
    </div>
    );
}

ReactDOM.render(
  <Taowa />,
  document.getElementById('welcome2')
);

export default Taowa;
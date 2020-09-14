import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Form from './Form';
import FormMul from './FormMul';
import Counter from './redux-counter';
import Calculator from './BoilingVerdict';
import Calculatorr from './reBoilingVerdict';

// -- Default package --
ReactDOM.render(
	<React.StrictMode>
		<Form />
		<FormMul />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// Set Current Time
function tick() {
	const element = (
		<div>
			<h3>告诉你们几个小伙, 现在是 {new Date().toLocaleTimeString()}.</h3>
		</div>
	);
	ReactDOM.render(element, document.getElementById('time'));
}
setInterval(tick, 1000);

// function component/传参 demo
// function Welcome(props){
//   return <h4>你好, {props.name}</h4>;
// }

// const element = <Welcome name="Josh" />;

// ReactDOM.render(
//     element,
//     document.getElementById('welcome1')
// );

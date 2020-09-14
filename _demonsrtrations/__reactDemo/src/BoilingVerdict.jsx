import React from 'react';
import ReactDOM from 'react-dom';

// BoilingVerdict
// 接受 celsius 温度, 得到是否煮沸结果
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>Boiling!!!</p>;
	}
	if (props.celsius <= 1) {
		return <p>It is getting colder, isn't it?</p>;
	}
	return <p>Stablly warm.</p>;
}

// 转换函数, 温度换算
function toCelsius(fahrenheit) {
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9) / 5 + 32;
}

// 当输入温度无效时, 函数返回空字符串,
function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	// 保留三位小数并四舍五入后的转换结果
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

// scale prop
const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit',
};

// ------ TemperatureInput ------

// 状态提升
// 同步两者温度数据, 将TemperatureInput 组件中的state传至 Calculator中
// 当 Calculator 拥有了共享state, 其会成为两个温度输入框中当前温度的'数据源'
// 因此两个输入框中的内容将始终保持一致.
class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		// this.state = { temperature: '' };
	}

	handleChange(e) {
		// this.setState({ temperature: e.target.value });
		this.props.onTemperatureChange(e.target.value);
		// 这里将输入值 temperature 传入 props
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>输入温度:{scaleNames[scale]}</legend>
				<input value={temperature} onChange={this.handleChange} />
				{/* <BoilingVerdict celsius={parseFloat(temperature)} /> */}
			</fieldset>
		);
	}
}
// ------ TemperatureInput End------

//  ------ Calcultor ------
// 用于输入温度的 <input> 并将其值保存在 this.state.temprature 中
// 第一个输入框
class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCChange = this.handleCChange.bind(this);
		this.handleFChange = this.handleFChange.bind(this);
		this.state = { temperature: '', scale: 'c' };
	}

	handleCChange(temperature) {
		this.setState({ scale: 'c', temperature });
	}

	handleFChange(temperature) {
		this.setState({ scale: 'f', temperature });
	}

	// handleChange(e) {
	//   // this.setState({ temperature: e.target.value });
	//   this.props.onTemperatureChange(e.target.value);
	//   // 这里将输入值 temperature 传入 props
	// }

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius =
			scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit =
			scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput
					scale='c'
					temperature={celsius}
					onTemperatureChange={this.handleCChange}
				/>
				<TemperatureInput
					scale='f'
					temperature={fahrenheit}
					onTemperatureChange={this.handleFChange}
				/>
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

//  ------ Calcultor End ------

ReactDOM.render(
	<div>
		{' '}
		<Calculator />
	</div>,
	document.getElementById('calculator')
);

//

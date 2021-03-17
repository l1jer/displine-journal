# 状态提升 Lifting State Up

> 通常多个组件需要反映相同的变化数据, 建议将共享状态提升到最近的共同父组件中去,

计算水在给定温度下是否会沸腾的温度计算器

```jsx
// Calcultor
// 用于输入温度的 <input> 并将其值保存在 this.state.temprature 中
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>输入温度(℃):</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

转换函数, 温度换算

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// 当输入温度无效时, 函数返回空字符串, 
function tryConvert(temperature, convert) {
  const input = parseFloat(temperatur);
  if (Number.isNaN(input)) {
    return '';
  }

  // 保留三位小数并四舍五入后的转换结果
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
```

状态提升

```jsx
// 状态提升
// 同步两者温度数据, 将TemperatureInput 组件中的state传至 Calculator中
// 当 Calculator 拥有了共享state, 其会成为两个温度输入框中当前温度的'数据源'
// 因此两个输入框中的内容将始终保持一致.
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: '' };
    // 当输入值 temperature 在 TemperatureInput 的state中, 
    // 调用 this.setState()便可以进行修改
    // 然而 temperature 由父组件传入的 prop,
    // TemperatureInput 组件便失去了控制权
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
  }
}

```
<template>
	<div id="app">
		<div>
			<eight-queen />
		</div>
		<div>
			<hello-world />
			<double-binding />
			<validate-input :rules="rules" />
		</div>
	</div>
</template>

<script>
import EightQueen from './components/EightQueen';
import HelloWorld from './components/HelloWorld.vue';
import DoubleBinding from './components/DoubleBinding';
import CustomInput from './components/CustomInput';
import ValidateHoc from './components/hoc.js';
const ValidateInput = ValidateHoc(CustomInput);

export default {
	name: 'App',
	data() {
		return {
			rules: [
				{
					test: function(value) {
						return /\d+/.test(value);
					},
					message: '请输入一个数字',
				},
			],
		};
	},
	components: {
		EightQueen,
		HelloWorld,
		DoubleBinding,
		ValidateInput,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-·;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
#app:nth-child(n) {
	float: left;
	display: flex;
	padding: 1em;
	/* border-top: solid 5px #000; */
	width: 300px;
}
#app:nth-child(n) > :first-child {
	/* width: 250px; */
	/* padding: em; */
	border-top: solid 5px #000;
}
</style>

<template>
	<div id="app">
		<div>
			<eight-queen />
		</div>
		<div>
			<hello-world />
			<double-binding />
		</div>
		<div>
			<hoc-custome-input />
			<renderless-input />
		</div>
	</div>
</template>

<script>
import EightQueen from './components/EightQueen';
import HelloWorld from './components/HelloWorld.vue';
import DoubleBinding from './components/DoubleBinding';
import HocCustomeInput from './components/HocCustomeInput';
import RenderlessInput from './components/RenderlessInput';

export default {
	name: 'App',
	components: {
		EightQueen,
		HelloWorld,
		DoubleBinding,
		HocCustomeInput,
		RenderlessInput,
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
	/* width: 200px; */
}
#app > div:nth-child(2n) > :nth-child(n) {
	width: 200px;
	margin: 1em;
	padding: 1em;
	border: solid 2px #000;
}
#app > div:nth-child(3n) > :nth-child(n) {
	width: 200px;
	margin: 1em;
	padding: 1em;
	border: solid 2px #000;
}
</style>

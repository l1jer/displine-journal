<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<eight-queen />
		<hello-world />
		<double-binding />
	</div>
</template>

<script>
import EightQueen from './components/EightQueen';
import HelloWorld from './components/HelloWorld.vue';
import DoubleBinding from './components/DoubleBinding';

export default {
	name: 'App',
	components: {
		EightQueen,
		HelloWorld,
		DoubleBinding,
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
.wb {
	padding: 1em;
	border-top: solid 5px #000;
}
.wb-200 {
	width: 200px;
	margin: 0 auto;
}
div {
	width: 450px;
	margin: 0 auto;
}
</style>

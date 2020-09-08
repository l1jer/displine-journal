<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<eight-queen />
		<hello-world />
		<div v-resize:[direction].quiet="onResize">
			Window height is: {{ length }}
		</div>
	</div>
</template>

<script>
import EightQueen from './components/EightQueen';
import HelloWorld from './components/HelloWorld.vue';

export default {
	data() {
		return {
			direction: 'vertical',
			length: 0,
		};
	},
	methods: {
		onResize(length) {
			this.length = length;
		},
	},
	name: 'App',
	components: {
		EightQueen,
		HelloWorld,
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
</style>

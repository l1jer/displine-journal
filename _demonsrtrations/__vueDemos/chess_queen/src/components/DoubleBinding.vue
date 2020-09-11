<template>
	<div class="wb">
		<div class="wb-200">
			<br />
			<!-- v-model  -->
			Simulating here : {{ text }}<br />
			<!-- v-model.lazy -->
			- v-model.lazy - <input type="text" v-model.lazy="text" /><br />
			- v-model - <input type="text" v-model.trim="text" /><br />
			- W/out v-model -
			<input type="text" :value="text" @input="text = $event.target.value" />
			<!-- v-model.number -->
			<div class="wb-200">
				<br />
				- Here are input numbers -
				<input type="number" v-model="num1" />{{ typeof num1 }}
				<input type="number" v-model.number="num2" />{{ typeof num2 }}
			</div>
		</div>
		<br />
		<!-- Simulating customise command -->
		<div class="wb" v-resize:[direction].quiet="onResize">
			Window height is: {{ length }}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: '',
			direction: 'vertical',
			length: window.innerHeight,
			num1: 0,
			num2: 0,
		};
	},
	methods: {
		onResize(length) {
			this.length = length;
		},
	},
};
</script>

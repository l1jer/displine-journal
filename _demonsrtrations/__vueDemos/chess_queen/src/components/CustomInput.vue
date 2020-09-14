<!--
 * @Author: Jerry Li
 * @Date: 2020-09-13 21:19:53
 * @LastEditTime: 2020-09-14 01:32:50
 * @LastEditors: Jerry Li
 * @Description: Well..
 * @FilePath: /Self_Displine/_demonsrtrations/__vueDemos/chess_queen/src/components/CustomInput.vue
-->

<template>
	<input type="text" @blur="$emit('blur', value)" v-model="value" />
</template>

<script>
export default {
	props: ['initValue'],
	data() {
		return {
			value: this.initValue,
		};
	},
};
</script>

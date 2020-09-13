<!--
 * @Author: your name
 * @Date: 2020-09-14 00:54:52
 * @LastEditTime: 2020-09-14 01:00:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Self_Displine/_demonsrtrations/__vueDemos/chess_queen/src/components/HocCustomeInput.vue
-->
<template>
	<div>HOC Input <validate-input :rules="rules" /></div>
</template>

<script>
import CustomInput from './CustomInput';
import ValidateHoc from './hoc.js';
const ValidateInput = ValidateHoc(CustomInput);

export default {
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
		ValidateInput,
	},
};
</script>

<style></style>

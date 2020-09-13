<template>
	<div>
		<s-validate #default="{ validate }" :value="value" :rules="rules">
			<input type="text" @blur="validate" v-model="value" />
		</s-validate>

		<s-validate #default="{ validate }" :value="text" :rules="textRules">
			<textarea type="text" @blur="validate" v-model="text" />
		</s-validate>
	</div>
</template>

<script>
import SValidate from './SValidate';

export default {
	data: () => ({
		value: 'hi',
		text: 'hi',
		rules: [
			{
				test: function(value) {
					return /\d+/.test(value);
				},
				message: '请输入一个数字',
			},
		],
		textRules: [
			{
				test: function(value) {
					return value;
				},
				message: '请输入一个非空的值',
			},
		],
	}),
	components: {
		SValidate,
	},
};
</script>

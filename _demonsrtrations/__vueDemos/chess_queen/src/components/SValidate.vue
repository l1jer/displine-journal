<!--
 * @Author: your name
 * @Date: 2020-09-14 01:02:58
 * @LastEditTime: 2020-09-14 01:03:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Self_Displine/_demonsrtrations/__vueDemos/chess_queen/src/components/SValidate.vue
-->
<template>
	<div>
		<slot :validate="validate"></slot>
		{{ errMsg }}
	</div>
</template>
<script>
export default {
	props: ['value', 'rules'],
	data() {
		return { errMsg: '' };
	},
	methods: {
		validate() {
			let validate = this.rules.reduce((pre, cur) => {
				let check = cur && cur.test && cur.test(this.value);
				this.errMsg = check ? '' : cur.message;
				return pre && check;
			}, true);
			return validate;
		},
	},
};
</script>

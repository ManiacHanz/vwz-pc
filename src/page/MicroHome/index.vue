<!-- 
	首页的下面主要模块，分左右两个部分。左边菜单点击了以后传回一个type给右边控制右边的显示
	这里的左边绑定了一个事件给子组件为了是能传回一个值更改data.type的值
	右边再把data.type的值传给右边的自组建
 -->
<template>
	<div class="microhome clear-float">
		<left-menu @switchType="switchType"></left-menu>
		<right-content :contentType="type"></right-content>
	</div>
</template>

<style scoped>
	.microhome {
		background: #ffffff;
		width: 1200px;
		min-height: 780px;
		margin: 30px auto 10px;
		border: 1px solid #dddddd;
		display: flex;
		flex-direction: row;
	}

</style>

<script>
	import leftMenu from '../../components/common/LeftMenu'
	import rightContent from '../../components/common/rightContent'
	export default {
		data() {
			return {
				type:'菜单配置'
			}
		},
		components: {
			leftMenu : leftMenu,
			rightContent
		},
		methods: {
			switchType(type) {
				this.type = type
				// console.log(this.type)
			}
		}
	}
</script>
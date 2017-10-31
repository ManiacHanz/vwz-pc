<template>
	<div class="right-content">
		<div class="topbar">
			<div class="title">{{contentType}}</div>
			<div class="instruction">使用说明
				<span></span>
			</div>
		</div>
		<ContentBody :contentBody="contentType"></ContentBody>	
		
		
	</div>

</template>


<script type="text/javascript">
	import ContentBody from '../../page/MicroHome/subpage/subIndex'
	export default {
		components: {
			ContentBody
		},
		props:["contentType"]
	}
</script>

<style lang="less" scoped>
	.right-content {
		flex-grow: 1
	}
	.topbar {		
		height: 64px;
		line-height: 64px;
		/*border-bottom: 1px solid #dddddd;*/
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
	}
	.topbar .title {
		font-size: 16px;
	}
	.topbar .instruction span {
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url('/static/img/icon_1.png') no-repeat;
		background-position: -392px -248px;
		vertical-align: sub;
	}
</style>
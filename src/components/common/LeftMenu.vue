<!-- 
	负责左边菜单栏的切换 
	继承过来的方法用来传回一个type值回给父组件 home  index
 -->

<template>
	<div class="leftmenu">
		<ul>
			<li v-for="(item, index) in menuList" :class="{active:index == nowIndex}" 
			@click="toggleMenus(index,item.type)">
				<i></i>
				{{ item.type }}
			</li>
		</ul>
	</div>

</template>


<script type="text/javascript">
	export default {
		data() {
			return {
				nowIndex:0,
				menuList:[
					{
						type: '菜单配置'
					},
					// {
					// 	type: '数据分析'
					// },
					{
						type: '文章管理'
					},
					// {
					// 	type: '用户管理'
					// },
					// {
					// 	type: '回收管理'
					// }
				]
			}
		},
		methods: {
			toggleMenus(index,type) {
				this.nowIndex = index
				this.$emit('switchType',type)
			}
		}
	}
</script>

<style lang="less" scoped>
	.leftmenu {
		width: 200px;
		border-right: 1px solid #dddddd;
	}
	.leftmenu li {
		width: 200px;
		height: 50px;
		text-align: center;
		text-indent: -40px;
		line-height: 50px;
		border-bottom: 1px solid #dddddd;
		cursor: pointer;
		
		/*background-position: -26px -147px;*/
	}
	.leftmenu li.active {
		background: #00adef;
		color: #ffffff;
	}
	.leftmenu li i {
		display: inline-block;
		width: 20px;
		height: 20px;
		vertical-align: sub;
		background: url('/static/img/sprite.png') no-repeat;
	}
	.leftmenu li:nth-child(1) i {
		background-position: -26px -101px;
	}
	.leftmenu li:nth-child(2) i {
		background-position: -90px -101px;
	}
	.leftmenu li:nth-child(3) i {
		background-position: -58px -101px;
	}
	.leftmenu li:nth-child(4) i {
		background-position: -122px -101px;
	}
	.leftmenu li:nth-child(5) i {
		background-position: -154px -101px;
	}
	.leftmenu li.active i {
		background-position-y: -145px; 
	}
</style>
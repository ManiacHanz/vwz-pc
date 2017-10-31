<template>
	<div class="data-analysis">
		<div class="data-table">
			<div class="data-table-title">
				昨日关键数据
			</div>
			<ul class="data-table-body">
				<li v-for="item in dataCounts">
					<p class="data-name">{{item.name}}</p>
					<p class="data-num">{{item.num}}</p>
				</li>
			</ul>
		</div>
		<ul class="tabs">
			<li v-for="(item,index) in dataCounts" :class="{active:index == nowIndex}" @click="switchType(index)">
				{{item.name}}
			</li>
		</ul>
		<div></div>
	</div>
</template>



<script>
	export default {
		data() {
			return {
				nowIndex:0,
				dataCounts: [
					{
						name:"网站访问次数",
						num:1
					},
					{
						name:"菜单点击次数",
						num:2
					},
					{
						name:"菜单点击人数",
						num:3
					},
					{
						name:"人均点击次数",
						num:4
					}
				]
			}
		},
		methods: {
			switchType(index){
				this.nowIndex = index
			}
		}
	}
</script>

<style scoped>
	.data-analysis {
		padding: 30px;
	}
	.data-table {
		border: 1px solid #dddddd;
	}
	.data-table-title {
		height: 40px;
		line-height: 40px;
		background: #f4f5f9;
		padding-left: 20px;
	}
	.data-table-body {
		height: 90px;
		padding: 20px 0;
		display: flex;
	}
	.data-table-body li {
		flex-grow: 1;
		text-align: center;
	}
	.data-table-body li:not(:last-of-type) {
		border-right: 1px solid #dddddd;
	}
	.data-name {
		margin-top: 4px;
		font-size: 16px;
	}
	.data-num {
		font-size: 34px;
		color: #999999;
		margin-top: 14px;
	}
	.tabs {
		margin-top: 30px;
		display: flex;
	}
	.tabs li {
		width: 134px;
		text-align: center;
		height: 34px;
		line-height: 34px;
		border:1px solid #dddddd;
		cursor: pointer;
	}
	.tabs li.active {
		background: #576477;
		color: #ffffff;
	}
</style>
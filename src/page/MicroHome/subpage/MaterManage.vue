<template>
	<div class="mater-manage">
		<div class="inner-box">
			<div class="top-bar">
				<div class="search">
					<input type="text" name="search" placeholder="标题/作者">
					<a role="button"></a>
				</div>
				<div class="new-btn" @click="goEdit()">新建文章</div>
			</div>
			<div class="list">
				<material-table :listData="listData"></material-table>	
			</div>
			<div class="page">
				<pagination :getPageNum="getPageNum"></pagination>
			</div>
		</div>
	</div>
</template>


<script>
	//引入列表组件
	import materialTable from '../../../components/list/materialTable.vue'
	import Pagination from '../../../components/common/Pagination'
	//引入数据组件
	import { 
		materialArticleData,
		// materialPicData,
		// materialRecordData,
		// materialVideoData
	} from '../../../../static/data/materialData.js'
	export default {
		components: {
			materialTable,
			Pagination
		},
		data() {
			return {
				nowIndex: 0,
				nowType:'文章',
				listData: []
				// 这里tabs应该要改成对象的数组，没方便选择的时候发送标记，或者选择下标发送
				// tabs: [
				// 	{
				// 		name:'文章',
				// 		type:'article'
				// 	},
				// 	{
				// 		name:'图片',
				// 		type:'pic'
				// 	},
				// 	{
				// 		name:'语音',
				// 		type:'record'
				// 	},
				// 	{
				// 		name:'视频',
				// 		type:'video'
				// 	}
				// ],
				
			}
		},
		methods: {
			goEdit() {
				this.$router.push('/artedit?id=123')
			},
			getPageNum ( pagenum ) {
				//获取页码数据  应该作为props传给子组件 这里的参数就是分页的插件穿回来的页码数 在这里进行请求数据 然后敷给listData
				console.log(pagenum)
			},
			getListData () {

			},
			// 根据标签页切换
			// toggleTabs(index,itemname,itemtype) {
			// 	this.nowIndex = index
			// 	// console.log(index,this.nowIndex)
			// 	this.nowType = itemname
			// 	if (itemtype === 'article') {
			// 		this.listData = materialArticleData()
			// 	}
			// 	else if (itemtype === 'pic') {
			// 		this.listData = materialPicData()
			// 	}
			// 	else if (itemtype === 'record') {
			// 		this.listData = materialRecordData()
			// 	}
			// 	else if (itemtype === 'video') {
			// 		this.listData = materialVideoData()
			// 	}
			// }
		},
		mounted() {
			this.listData = materialArticleData()
		}
	}
</script>

<style scoped>
	.mater-manage .tabs {
		display: flex;
		justify-content: flex-start;
		border-bottom: 1px solid #dddddd;
	}
	.mater-manage li {
		width: 134px;
		text-align: center;
		height: 34px;
		line-height: 34px;
		cursor: pointer;
	}
	.mater-manage li.active {
		border-bottom: 2px solid #00adef;
	}
	.mater-manage .inner-box {
		border-top: 1px solid #dddddd;
		padding: 0 34px;
	}
	.top-bar {
		margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}
	.search {
		width: 360px;
		height: 34px;
		line-height: 34px; 
		border: 1px solid #dddddd;
	}
	.search input {
		border: none;
		outline: none;
		width: 312px;
		line-height: 34px;
		color: #999999;
		padding-left: 8px;
		vertical-align: top;
	}
	.search a {
		display: inline-block;
		width: 34px;
		height: 34px;
		background: url("/static/img/sprite.png") no-repeat;
		background-position: -102px -778px;
	}
	.new-btn {
		color: #ffffff;
		background: #00adef;	
		display: inline-block;
		width: 104px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border-radius: 7px;
		cursor: pointer;
	}
	
	
</style>

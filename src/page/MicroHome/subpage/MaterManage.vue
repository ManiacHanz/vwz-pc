<template>
	<div class="mater-manage">
		<div class="inner-box">
			<div class="top-bar">
				<div class="search">
					<input type="text" name="search" placeholder="标题/作者" v-model="search" @keyup.13="_searchArticle">
					<a role="button" @click="_searchArticle"></a>
				</div>
				<div class="new-btn" @click="goEdit()">新建文章</div>
			</div>
			<div class="list" v-if="listData.length>0">
				<material-table :listData="listData" :toggleDisplay="_toggleDisplay" :delArticle="_delArticle"></material-table>	
			</div>
			<div class="page" v-if="listData">
				<pagination :getPageNum="getPageNum" :totalPage="totalPage"></pagination>
			</div>
			<div class="noData" v-if="!listData.length">
				<p>暂时还没有文章素材，快来新建吧！</p>
			</div>
		</div>
	</div>
</template>


<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'

import {__getArticalList} from 'service/getData'
import {__modifyDisplay, __delArticle} from 'service/sendData'

//引入列表组件
import materialTable from '../../../components/list/materialTable.vue'
import Pagination from '../../../components/common/Pagination'
	export default {
		components: {
			materialTable,
			Pagination
		},
		data() {
			return {
				nowIndex: 0,
				nowType:'文章',
				totalPage: '',
				search: '',
				nowPage: '',
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
		computed: {
			...mapState([
					'userInfo','shouldListUpdate'
				])
		},
		created () {
			let data = {
				...this.userInfo,
				page: 1,
				search: '',
			}
			console.log(data)
			__getArticalList(data)
				.then( res => {
					console.log(res)
					if(!res) {
						alert('网络请求失败，请检查网络或稍后重试')
						return false
					}
					if(!res.result) {
						alert(res.message)
						return false
					}
					this.listData = res.data.data
					this.totalPage = res.data.totalpage
				})
		},
		mounted() {
			// this.listData = materialArticleData()
			
		},
		watch: {
			shouldListUpdate: function(newVal){
				if(newVal){
					let data = {
						...this.userInfo,
						page: 1,
						// search: '',
					}
					// console.log(data)
					__getArticalList(data)
						.then( res => {
							console.log(res)
							if(!res) {
								alert('网络请求失败，请检查网络或稍后重试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
							this.listData = res.data.data
							this.totalPage = res.data.totalpage
						})
					this.TOGGLE_LISTDATAUPDATE()
				}
			}
		},
		methods: {
			...mapMutations([
					'OPEN_MODAL','SET_MODALCFG','SET_LOADING','OPEN_NOTIFICATION','CLOSE_MODAL','TOGGLE_LISTDATAUPDATE','userInfo'
				]),
			goEdit() {
				if(!this.userInfo.uid && !this.userInfo.token) {
					alert('登录错误，请返回登录页面重新登录')
					return false
				}
				this.$router.push('/artedit')
			},
			getPageNum ( pagenum ) {
				//获取页码数据  应该作为props传给子组件 这里的参数就是分页的插件穿回来的页码数 在这里进行请求数据 然后敷给listData
				console.log(pagenum)
				this.nowPage = pagenum
				let data = {
					...this.userInfo,
					page: pagenum,
					// search: '',
				}
				// console.log(data)
				__getArticalList(data)
					.then( res => {
						console.log(res)
						if(!res) {
							alert('网络请求失败，请检查网络或稍后重试')
							return false
						}
						if(!res.result) {
							alert(res.message)
							return false
						}
						this.listData = res.data.data
						this.totalPage = res.data.totalpage
					})
			},
			getListData () {

			},
			_searchArticle () {						//搜索
				this.SET_LOADING()
				let data = {
					...this.userInfo,
					page:1,
					search: this.search.trim(),
				}
				__getArticalList(data)
					.then( res => {
						this.SET_LOADING()
						console.log(res)
						if(!res) {
							alert('网络请求失败，请检查网络或稍后重试')
							return false
						}
						if(!res.result) {
							alert(res.message)
							return false
						}
						this.listData = res.data.data
						this.totalPage = res.data.totalpage
					})
			},
			_toggleDisplay (id, index) {
				//console.log(id, index)		//由子组件传回来的id 和 当前页listdata的 index  id用于传输后台数据 index改变前台展示
				if (!this.listData[index].display) {    // diaplay 0 是 显示  1 是隐藏
					this.OPEN_MODAL()
					let that = this
					let modalOption = {
						modalFor: 'hideArticle',				//模态框用来做什么  参考modal.vue
						title: '温馨提示',					//模态框的标题
						onSuccess: function(_this){		//点击确认的逻辑
							//发送请求 
							// console.log(_this.projectNameInput)
							that.SET_LOADING()

							let data = {
								...that.userInfo,
								id,
								display: 1
							}
							__modifyDisplay(data)
								.then( res => {
									that.SET_LOADING()
									console.log(res)
									if(!res.result) {
										alert(res.message)
										return false
									}
									that.listData[index].display = 1
									that.OPEN_NOTIFICATION('修改成功')
									that.CLOSE_MODAL()
								})
						}
					}
					this.SET_MODALCFG(modalOption)				
				} else {
					this.OPEN_MODAL()
					let that = this
					let modalOption = {
						modalFor: 'showArticle',				//模态框用来做什么  参考modal.vue
						title: '温馨提示',					//模态框的标题
						onSuccess: function(_this){		//点击确认的逻辑
							//发送请求 
							// console.log(_this.projectNameInput)
							that.SET_LOADING()

							let data = {
								...that.userInfo,
								id,
								display: 0
							}
							__modifyDisplay(data)
								.then( res => {
									that.SET_LOADING()
									console.log(res)
									if(!res.result) {
										alert(res.message)
										return false
									}
									that.listData[index].display = 0
									that.OPEN_NOTIFICATION('修改成功')
									that.CLOSE_MODAL()
								})
						}
					}
					this.SET_MODALCFG(modalOption)
				}
			},
			_delArticle (id, index) {
				this.OPEN_MODAL()
				let that = this
				let modalOption = {
					modalFor: 'delArticle',				//模态框用来做什么  参考modal.vue
					title: '温馨提示',					//模态框的标题
					onSuccess: function(){		//点击确认的逻辑
						that.SET_LOADING()
						let data = {
							...that.userInfo,
							ids: id,
						}
						__delArticle(data)
							.then(res => {
								that.SET_LOADING()
								console.log(res)
								if(!res.result) {
									alert(res.message)
									return false
								}
								that.OPEN_NOTIFICATION('删除成功')
								that.CLOSE_MODAL()
							})
							.then( () => {
								let data = {
									...that.userInfo,
									page: that.nowPage,
									search: '',
								}
								__getArticalList(data)
									.then( res => {
										if(!res) {
											alert('网络请求失败，请检查网络或稍后重试')
											return false
										}
										if(!res.result) {
											alert(res.message)
											return false
										}
										that.listData = res.data.data
										that.totalPage = res.data.totalpage
									})
							})
					}
				}
				this.SET_MODALCFG(modalOption)
			}
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
	}
</script>

<style lang="less" scoped>


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
		&.hover {
			background: #008ec4;
		}
	}
	.noData {
		padding-top: 100px;
		text-align: center;
		font-size: 16px;
		color: #999;
	}
	
</style>

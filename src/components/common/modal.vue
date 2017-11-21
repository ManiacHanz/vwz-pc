<template>
	<div class="modal" v-show="isShowModal">
		<div class="dialog">
			<div class="head">
				<div class="title">{{modalCfg.title}}</div>
				<div class="close" @click="CLOSE_MODAL"></div>
			</div>
			<div class="body">
				<section class="confirm-submit" v-if="modalCfg.modalFor==='submit'">
					<div class="alert"></div>
					<div class="tip">
						<p>发布确认</p>
						<p>发布成功后会覆盖原版本，且将对所有用户及时生效，确认发布？</p>
					</div>
				</section>
				<section class="confirm-login-out" v-if="modalCfg.modalFor==='loginOut'">
					<div class="alert"></div>
					<div class="tip">
						<p>退出登录确认</p>
						<p>退出登录后会返回到登录界面，确认退出吗？</p>
					</div>
				</section>
				<section class="confirm-remove" v-if="modalCfg.modalFor==='remove'">
					<div class="alert"></div>
					<div class="tip">
						<p>删除确认</p>
						<p>删除后“banner配置”下的配置内容将被删除</p>
					</div>
				</section>
				<section class="del-pic" v-if="modalCfg.modalFor==='delPic'">
					<div class="alert"></div>
					<div class="tip">
						<p>删除确认</p>
						<p>确认删除后，图片将被删除！</p>
					</div>
				</section>
				<section class="del-article" v-if="modalCfg.modalFor==='showArticle'">
					<div class="alert"></div>
					<div class="tip">
						<p>显示文章确认</p>
						<p>确认显示后，在文章选择列表中将被显示！</p>
					</div>
				</section>
				<section class="del-article" v-if="modalCfg.modalFor==='hideArticle'">
					<div class="alert"></div>
					<div class="tip">
						<p>隐藏文章确认</p>
						<p>确认隐藏后，在文章选择列表中将被隐藏！</p>
					</div>
				</section>
				<section class="del-article" v-if="modalCfg.modalFor==='delArticle'">
					<div class="alert"></div>
					<div class="tip">
						<p>删除确认</p>
						<p>确认删除后，文章内容将被删除！</p>
					</div>
				</section>
				<section class="del-article" v-if="modalCfg.modalFor==='delList'">
					<div class="alert"></div>
					<div class="tip">
						<p>删除确认</p>
						<p>确认删除后，此条数据将从列表中删除！</p>
					</div>
				</section>
				<section class="del-article" v-if="modalCfg.modalFor==='delBtn'">
					<div class="alert"></div>
					<div class="tip">
						<p>删除确认</p>
						<p>确认删除后，此按钮将被删除！</p>
					</div>
				</section>
				<section class="menu-icon" v-if="modalCfg.modalFor==='menuIcon'">
					<div class="up">
						<div>
							<span style="line-height: 40px;display: inline-block;">已选择的图标</span>
							<img :src="menuIconList[selectedIcon]" v-show="menuIconList[selectedIcon]"></img>
						</div>
						<div>
							<input type="file" name="" id="menuIconUploader" @change="_menuIconChange" hidden="hidden" accept=".png, .jpg, .jpeg">
							<p class="upload-btn" @click="_uploaderTrigger('menuIconUploader')">上传本地图标</p>
							<p class="advice">建议尺寸120x120</p>
						</div>
					</div>
					<div class="down">
						<ul>
							<li v-for="(item, index) in menuIconList" @click="selectIcon(index)">
								<div class="mask" v-show="selectedIcon===index"></div>
								<img :src="item">
							</li>
						</ul>
					</div>
				</section>
				<section class="plate-icon" v-if="modalCfg.modalFor==='plateIcon'">
					<div class="up">
						<div>
							<span style="line-height: 48px;display: inline-block;">已选择的图标</span>
							<img :src="plateIconList[selectedIcon]" v-show="plateIconList[selectedIcon]"></img>
						</div>
						<div>
							<input type="file" name="" id="plateIconUploader" @change="_plateIconChange" hidden="hidden" accept=".png, .jpg, .jpeg">
							<p class="upload-btn" @click="_uploaderTrigger('plateIconUploader')">本地上传</p>
							<p class="advice">建议尺寸140x140</p>
						</div>
					</div>
					<div class="down">
						<ul>
							<li v-for="(item, index) in plateIconList" @click="selectIcon(index)">
								<div class="mask" v-show="selectedIcon===index"></div>
								<img :src="item">
							</li>
						</ul>
					</div>
				</section>
				<section class="user-icon" v-if="modalCfg.modalFor==='userIcon'">
					<div class="up">
						<div>
							<span style="line-height: 40px;display: inline-block;">已选择的图标</span>
							<img :src="userIconList[selectedIcon]" v-show="userIconList[selectedIcon]"></img>
						</div>
						<div>
							<input type="file" name="" id="userIconUploader" @change="_userIconChange" hidden="hidden" accept=".png, .jpg, .jpeg">
							<p class="upload-btn" @click="_uploaderTrigger('userIconUploader')">本地上传</p>
							<p class="advice">建议尺寸140x140</p>
						</div>
					</div>
					<div class="down">
						<ul>
							<li v-for="(item, index) in userIconList" @click="selectIcon(index)">
								<div class="mask" v-show="selectedIcon===index"></div>
								<img :src="item">
							</li>
						</ul>
					</div>
				</section>
				<section class="modify-logo" v-if="modalCfg.modalFor==='logo'">
					<div class="left">
						<div class="imgbox" :style="logoBack"></div>
						<p>大图预览</p>
					</div>
					<div class="right">
						<input type="file" name="" hidden="hidden" value="选择LOGO" id="logoUploadBtn" @change="logoChange" accept=".png, .jpg, .jpeg">
						<div class="pick-logo" @click="_uploaderTrigger('logoUploadBtn')">选择LOGO</div>
						<p>LOGO必须是jpg或者png格式图片；</p>
						<p>新LOGO不允许涉及政治敏感与色情</p>
					</div>
				</section>
				<section class="modify-avatar" v-if="modalCfg.modalFor==='avatar'">
					<div class="left">
						<div class="imgbox" :style="avatarBack"></div>
						<p>大图预览</p>
					</div>
					<div class="right">
						<input type="file" name="" hidden="hidden" value="选择头像" id="avatarUploadBtn" @change="avatarChange" accept=".png, .jpg, .jpeg">
						<div class="pick-avatar" @click="_uploaderTrigger('avatarUploadBtn')">选择头像</div>
						<p>头像必须是jpg或者png格式图片；</p>
						<p>新头像不允许涉及政治敏感与色情</p>
					</div>
				</section>
				<section class="modify-psw" v-if="modalCfg.modalFor==='password'">
					<div>
						<span>旧密码：</span>
						<input type="password" name="oldPassword" v-model="modifyPswOld" maxlength="12">
						<p class="alert" v-show="oldPasswordAlert">旧密码输入错误</p>
					</div>
					<div>
						<span>新密码：</span>
						<input type="password" name="newPassword" v-model="modifyPswNew" maxlength="12">
						<p class="alert" v-show="newPasswordAlert">新密码少于6位/新密码不能包含特殊字符/新密码多于12位</p>
						<p>密码为6-12位，必须为数字或大小写字母及其组合</p>
					</div>
					<div>
						<span>确认新密码：</span>
						<input type="password" name="confirmPassword" v-model="modifyPswConfirm" maxlength="12">
						<p class="alert" v-show="modifyPswConfirm!=modifyPswNew">两次输入密码不一致</p>
					</div>
				</section>
				<section class="modify-project-name" v-if="modalCfg.modalFor==='projectName'">
					<div>
						<input type="text" v-model="projectNameInput" maxlength="12" placeholder="在此输入新的项目名称">
						<p>项目名称不超过12个字</p>
					</div>
				</section>
				<section class="pick-article" v-if="modalCfg.modalFor==='pickArticle'">
					<div class="top">
						<div class="search">
							<input type="text" name="" placeholder="标题/作者" maxlength="20" v-model="search">
							<a role="button" @click="_searchArticle"></a>
						</div>
						<div class="add-btn" @click="goEdit">新建文章</div>
					</div>
					<div class="body">
						<div class="panel-head">
							<span class="title">标题</span>
							<span class="author">作者</span>
							<span class="time">更新日期</span>
						</div>
						<div class="panel-body">
							<ul>
								<li v-for="(item, index) in articleList" :key="item.id">
									<input type="radio" name="articleChoose" :key="item.id" :value="item.id" v-model="articlePicked">
									<span class="title">{{item.title}}</span>
									<span class="author">{{item.author}}</span>
									<span class="time">{{item.updateTime}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="pagination">
						<pagination :getPageNum="getPageNum" :totalPage="totalPage"></pagination>
					</div>
				</section>
				<section class="QR-code" v-if="modalCfg.modalFor==='QRcode'">
					<div class="code-img">
						<qrcode-vue :value="QRLink" :size="278" level="H"></qrcode-vue>
					</div>
					<div>微信扫码打开微网站</div>
					<div class="code-link">{{QRLink}}</div>
				</section>
			</div>
			<div class="foot">
				<button class="copy-clipboard" v-if="modalCfg.modalFor==='QRcode'" 
				v-clipboard:copy="QRLink"
      	v-clipboard:success="onCopySuccess"
     	 	v-clipboard:error="onCopyFail">
					复制微网站地址
				</button>
				<div class="normal" v-else>
					<div class="confirm" @click="confirm">确&nbsp;定</div>
					<div class="cancel" @click="CLOSE_MODAL">取&nbsp;消</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import {imageBaseUrl, localUrl} from 'config/env'

import { __sendBase64 } from 'service/sendData'
import {__getImgUrl} from 'service/getData'
import {u_viewPick} from 'config/mUtils'

//引入数据组件
	import { materialArticleData } from '../../../static/data/materialData.js'

//剪贴板
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
//二维码
import QrcodeVue from 'qrcode.vue';
Vue.use(VueClipboard)

import { mapState, mapMutations } from 'vuex'
import {__getArtList} from 'service/getData'

import Pagination from './Pagination'

export default {

  name: 'modal',

  data () {
    return {
    	// 这里应该是去接口调到他的图标列表 再添加进来 用数组的concat方法
    	menuIconList: [],
    	plateIconList: [],
    	userIconList: [],
    	selectedIcon:'',		//选择的第几个 这里在点开模态框的时候是否应该传进来，如果不传，那上面src应该有个默认值
    	//logo和头像地址要调用  
    	logoBack: { backgroundImage: 'url(/static/img/logo.png)' },
    	avatarBack: { backgroundImage: 'url(/static/img/avatar.png)' },
    	//二维码地址
    	QRLink: '',
    	// 文章列表
    	articleList: '',
    	totalPage: '',
			search: '',
			nowPage: '',

    	//修改密码
    	modifyPswOld: '',
  		modifyPswNew:'',
  		modifyPswConfirm:'',
    	oldPasswordAlert: false,
    	newPasswordAlert: false,
    	//项目名称
    	projectNameInput: '',

    	//单选选择
    	articlePicked: '',
    }
  },
  components: {
  	Pagination,
  	QrcodeVue,
  },
  computed: {
  	...mapState([
  			'isShowModal','modalCfg','mobileColorStyle','userInfo'
  		])
  },
  watch: {
  	modifyPswNew: function(newVal, old) {
  		if(newVal.length<6) {
  			this.newPasswordAlert = true
  		}
  		else {
  			this.newPasswordAlert = false
  		}
  	},
  	isShowModal: function(newVal) {
  		this.selectedIcon = ''
  		let that = this
  		if(newVal) {//确保是打开的时候
  			let data = {
					...this.userInfo,
					type: 'a',
				}
  			if(this.modalCfg.modalFor == 'plateIcon') {
					__getImgUrl(data)
						.then( res => {
							// console.log(res)
							if(!res) {
								alert('网络错误，请检查网络或稍后再试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
  						that.plateIconList = []				// 在有网络并且成功的情况下清空图标？ 还是在最上面
							res.data.forEach(function(item, index){
								that.plateIconList.push(imageBaseUrl+item.iconUrl)
							})
						})
  			}
  			else if (this.modalCfg.modalFor == 'menuIcon') {
  				Object.defineProperty(data, 'type', {
  					value: 'b',
  					enumerable:true,
  				})
  				__getImgUrl(data)
						.then( res => {
							// console.log(res)
							if(!res) {
								alert('网络错误，请检查网络或稍后再试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
  						that.menuIconList = []				// 在有网络并且成功的情况下清空图标？ 还是在最上面
							res.data.forEach(function(item, index){
								that.menuIconList.push(imageBaseUrl+item.iconUrl)
							})
						})
  			}
  			else if (this.modalCfg.modalFor == 'userIcon') {
					Object.defineProperty(data, 'type', {
  					value: 'c',
  					enumerable:true,
  				})
  				__getImgUrl(data)
						.then( res => {
							// console.log(res)
							if(!res) {
								alert('网络错误，请检查网络或稍后再试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
  						that.userIconList = []				// 在有网络并且成功的情况下清空图标？ 还是在最上面
							res.data.forEach(function(item, index){
								that.userIconList.push(imageBaseUrl+item.iconUrl)
							})
						})
  			}
  			else if (this.modalCfg.modalFor == 'pickArticle') {
  				let data = {
						...this.userInfo,
						page: 1,
						search: '',
					}
  				this._getArticleData(data)
  			}
  		}
  	}

  },
  mounted () {
		//初始化列表数据  这里应该放在watch里面做
		// this.articleList = materialArticleData()
		this.QRLink = localUrl + '?id=' + this.userInfo.uid
  },
  methods: {
  	...mapMutations([
  			'CLOSE_MODAL','SET_LOGO','SET_AVATAR','SET_LOADING','OPEN_NOTIFICATION'
  		]),
  	_getArticleData (data) {
  		this.SET_LOADING()
  		__getArtList(data)
				.then( res => {
					console.log(res)
  				this.SET_LOADING()
					if(!res) {
						alert('网络请求失败，请检查网络或稍后重试')
						return false
					}
					if(!res.result) {
						alert(res.message)
						return false
					}
					this.articleList = res.data.data
					this.totalPage = res.data.totalpage
				})
  	},
  	_searchArticle () {						//搜索
			let data = {
				...this.userInfo,
				page:1,
				search: this.search.trim(),
			}
			this._getArticleData(data)
		},
		goEdit() {
			this.CLOSE_MODAL()
			this.$router.push('/artedit')
		},	
  	selectIcon (index) {
  		this.selectedIcon = index
  	},
  	// 按钮触发器input file
  	_uploaderTrigger (id) {
  		let idSelector = "#"+ id
  		document.querySelector(idSelector).click()
  	},
  	// plateIcon 上传
  	_plateIconChange (e) {
  		const that = this
  		u_viewPick(e.target).then( ({base64, type})=>{
  				// that.plateIconList.push(base64)
  				that.SET_LOADING('图片上传中...')
  				let data = {
  					...that.userInfo,
  					datas: base64,
  					suffix: type,
  					type: 'a',
  				}
  				__sendBase64(data)
  					.then( res => {
  						console.log(res)
  						that.SET_LOADING()
  						if(!res) {
  							alert('网络错误，请检查网络或稍后再试')
  							return false
  						}
  						if(!res.result) {
  							alert(res.message)
  							return false
  						}
  						that.plateIconList.push(imageBaseUrl + res.data)
  					})
  		})
  	},
  	_userIconChange (e) {
  		const that = this
  		u_viewPick(e.target).then( ({base64, type})=>{
  			//	that.userIconList.push(base64)
  			that.SET_LOADING('图片上传中...')
  				let data = {
  					...that.userInfo,
  					datas: base64,
  					suffix: type,
  					type: 'c',
  				}
  				__sendBase64(data)
  					.then( res => {
  						console.log(res)
  						that.SET_LOADING()
  						if(!res) {
  							alert('网络错误，请检查网络或稍后再试')
  							return false
  						}
  						if(!res.result) {
  							alert(res.message)
  							return false
  						}
  						that.userIconList.push(imageBaseUrl + res.data)
  					})
  		})
  	},
  	_menuIconChange (e) {
			const that = this
			u_viewPick(e.target).then( ({base64, type})=>{
  			//	that.menuIconList.push(base64)
  			that.SET_LOADING('图片上传中...')
  				let data = {
  					...that.userInfo,
  					datas: base64,
  					suffix: type,
  					type: 'b',
  				}
  				__sendBase64(data)
  					.then( res => {
  						console.log(res)
  						that.SET_LOADING()
  						if(!res) {
  							alert('网络错误，请检查网络或稍后再试')
  							return false
  						}
  						if(!res.result) {
  							alert(res.message)
  							return false
  						}
  						that.menuIconList.push(imageBaseUrl + res.data)
  					})
  		})
  	},
  	//LOGO修改
  	logoChange (e) {
  		const that = this
  		u_viewPick(e.target).then( ({base64, type})=>{
  			// if(rst.base64) {
  			// 	alert(1)
  			// 	//这里_this是封装的reader对象 that是这个vuecomponent所以要用
	  		// 	that.logoBack = Object.assign({}, that.logoBack, {
	  		// 		backgroundImage: 'url('+rst.base64+')'
	  		// 	})
  			// }
  			// else {
  			// 	alert(2)
  			// console.log(rst.base64, rst.type)
  			// 
				that.logoBack = Object.assign({}, that.logoBack, {
  				backgroundImage: 'url('+base64+')'
  			})
  		
  			// }
  			that.SET_LOGO(base64)
  			// console.table(rst)
  		})
  		
  		// let file = e.target.files[0]
  		// let reader = new FileReader()
  		// reader.readAsDataURL(file)
  		// reader.onloadend = function () {
  		// 	that.logoBack = Object.assign({}, that.logoBack, {
  		// 		backgroundImage: 'url('+this.result+')'
  		// 	})
  		// 	that.SET_LOGO(this.result)
  		// }
  	},
  	// 头像的修改
  
  	avatarChange (e) {
  		const that = this
  		u_viewPick(e.target).then( ({base64, type}) =>{
  			
				//这里_this是封装的reader对象 that是这个vuecomponent所以要用
  			that.avatarBack = Object.assign({}, that.avatarBack, {
  				backgroundImage: 'url('+base64+')'
  			})
  		
  			that.SET_AVATAR(base64)
  			// console.table(rst)
  		})
  	},
  	// 剪贴板回调
  	onCopySuccess () {
  		this.CLOSE_MODAL()
  		this.OPEN_NOTIFICATION('复制成功！')
  	},
  	onCopyFail () {
  		alert('复制失败')
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
			__getArtList(data)
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
					this.articleList = res.data.data
					this.totalPage = res.data.totalpage
				})
		},
		//确认按钮
		confirm() {
			this.modalCfg.onSuccess(this)
		}
  }
}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';
@import '../../style/common.less';

.modal {
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
.dialog {
	width: 850px;
	height: 580px;
	margin: 130px auto 0;
	background: #fff;
	position: relative;
}
.head {
	height: 52px;
	line-height: 52px;
	padding: 0 20px;
	background: #f3f6f8;
	display: flex;
	justify-content: space-between;
	.title {
		font-size: 15px;
		color: #444444;
	}
	.close {
		width: 24px;
		height: 24px;
		margin: 13px 0;
		background: url('/static/img/icon_1.png') no-repeat;
		background-position: -64px -613px;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			// opacity: 0.7;
			transform: rotateZ(90deg);
			transform-origin: center center;
		}
	}
}
.body {
	.confirm-submit, .confirm-login-out, .confirm-remove, .del-article, .del-pic {
		height: 50px;
		margin: 200px 0 0 255px;
		display: flex;
		.alert {
			width: 50px;
			background: url('/static/img/icon_1.png') no-repeat;
			background-position: -62px -500px;
			margin-right: 16px;
		}
		.tip {
			font-size: 15px;
			p:first-of-type {
				color:#333;
				margin-top: 3px;
				margin-bottom: 4px;
			}
			p:last-of-type {
				color:#666;
			}
		}
	}
	.menu-icon, .plate-icon, .user-icon {
		padding: 0 20px;
		.up {
			display: flex;
			justify-content: space-between;
			height: 60px;
			padding-top: 10px;
			border-bottom: 1px solid @borderGrey;
			img {
				width: 40px;
				height: 40px;
				vertical-align: middle;
				margin-left: 20px;
			}
			.upload-btn {
				color: #333;
				width: 104px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				border: 1px solid @borderGrey;
				border-radius: 7px;
				cursor: pointer;
				margin-bottom: 2px;
				&:hover {
					background: @lightBlue;
					color: #fff;
				}
			}
			.advice {
				color: #999;
				font-size: 12px;
				text-align: center;
			}
		}
		.down {
			ul {
				display: flex;
				flex-wrap: wrap;
				li {
					width: 38px;
					height: 38px;
					padding: 4px;
					border: 1px dotted @borderGrey;
					margin-right: 15px;
					margin-top: 15px;
					position: relative;
					cursor: pointer;
					&:nth-child(13n) {
						margin-right: 0;
					}
					&:hover {
						box-shadow: 0 2px 5px 0 #aaa;
					}
					img {
						width: 100%;
						height: 100%;
					}
					.mask {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						background: url('/static/img/sprite.png') no-repeat;
						background-position: -22px -609px;
						background-color: rgba(0, 0, 0, 0.5);
					}
				}
			}
		}
	}
	.plate-icon {
		.up {
			img {
				padding: 4px;
				background: @lightBlue;
			}
		}
		.down {
			ul {
				li {
					width: 40px;
					height: 40px;
					border: none;
					background: @lightBlue;
				}
			}
		}
	}
	.modify-logo, .modify-avatar {
		display: flex;
		justify-content: center;
		.left, .right {
			margin-top: 62px;
			width: 320px;
			height: 348px;
		}
		.left {
			box-shadow: 0 0 10px 2px @borderGrey;
			margin-right: 80px;
			.imgbox {
				width: 276px;
				height: 276px;
				margin: 20px auto 0;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: contain;
				background-color: #eee;
			}
			p {
				text-align: center;
				line-height: 44px;
			}
		}
		.right {
			.pick-logo, .pick-avatar {
				color: #333;
				width: 116px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				border: 1px solid #999;
				border-radius: 7px;
				margin-top: 132px;
				margin-bottom: 6px;
				cursor: pointer;
				transition: all 0.2s;
				&:hover {
					background: @lightBlue;
					border-color: @lightBlue;
					color: #fff;
				}
			}
			p {
				font-size: 12px;
				line-height: 200%;
				color: #666;
			}
		}
	}
	.modify-psw {
		width: 486px;
		margin: 0 auto;
		padding-top: 80px;
		span {
			display: inline-block;
			width: 110px;
			line-height: 32px;
			margin-right: 10px;
		}
		input {
			.wh(300px,30px);			
			padding: 0 8px;
			border: 1px solid #dedede;
			border-radius: 7px;
			margin-bottom: 8px;
			margin-top: 14px;
			&:focus {
				border-color: #999;
			}
		}
		p {
			color: #999;
			text-indent: 124px;

			&.alert {
				color: #f00;
			}
		}
	}
	.modify-project-name {
		div {
			width: 400px;
			margin: 180px auto 0 ; 
		}
		input {
			width: 100%;
			height: 30px;
			line-height:30px;
			text-indent: 10px;
			color: #333;
			border: 1px solid #dedede;
			margin-bottom: 12px;
			&:focus {
				border-color: #888;
			}
		}
		p {
			text-indent: 10px;
			color: #888;
		}
	}
	.QR-code {
		text-align: center;
		.code-img {
			width: 278px;
			height: 278px;
			margin: 60px auto 26px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.code-link {
			color: #999;
			margin-top: 14px;
		}
	}
	.pick-article {
		padding: 0 20px;
		.top {
			display: flex;
			justify-content: space-between;
			margin: 14px 0;
		}
		.search {
			height: 30px;
			border: 1px solid @borderGrey;
			color: @borderGrey;
			input {
				.wh(240px,30px);
				padding: 0 10px;
				border: none;
				outline:none;
				vertical-align: top;
			}
			a {
				.wh(30px, 30px);
				display: inline-block;
				background: url('/static/img/sprite.png') no-repeat;
				background-position: -102px -778px;
			}
		}
		.add-btn {
			.whtl(100px, 30px);
			border: 1px solid #888;
			border-radius: 4px;
			cursor: pointer;
			.btnHover();
		}
		.body{
			border: 1px solid @borderGrey;
			margin-bottom: 6px;
		}
		.panel-head {
			height: 39px;
			line-height: 39px;
			border-bottom: 1px solid @borderGrey;
			.title {
				width: 430px;
				padding-left: 40px;
			}
			.author {
				width: 124px;
			}
			.time {
				width: 80px;
			}
			.title, .author, .time {
				display: inline-block;
				padding-right: 30px;
			}
		}
		.panel-body {
			ul {
				height: 320px;
				// overflow-y: scroll;
			}
			li {
				height: 39px;
				line-height: 39px;
				border-bottom: 1px solid @borderGrey;
				input {
					width:36px;
					cursor: pointer;
				}
			}
			.title {
				width: 430px;
				padding-right: 30px;
			}
			.author {
				color: #999;
				width: 124px;
				padding-right: 30px;
			}
			.time {
				color: #999;
				width: 110px;
			}
			.title, .author, .time {
				display: inline-block;
				.ellipsis();
				vertical-align: bottom;
			}
		}
	}
}
.foot {
	width: 100%;
	height: 60px;
	line-height: 60px;
	background: #f3f6f8;
	position: absolute;
	bottom: 0;
	left: 0;
	.normal {
		display: flex;
		justify-content: center;
		.confirm, .cancel {
			width: 120px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			margin-top: 14px;
			border-radius: 7px;
			cursor: pointer;
			transition: all 0.3s;
			
		}
		.confirm {
			color: #fff;
			background: @lightBlue;
			border: 1px solid @lightBlue;
			margin-right: 66px;
			&:hover {
				background: @hoverBlue;
			}
		}
		.cancel {
			color: #333;
			border: 1px solid #aaa;
			&:hover {
				border-color: @borderActiveGrey;
				background: #ddd;
			}
		}
	}
	.copy-clipboard {
		display: block;
		width: 146px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #999;
		border-radius: 7px;
		margin: 14px auto;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			color: #fff;
			background-color: @lightBlue;
		}
	}
	
}
</style>
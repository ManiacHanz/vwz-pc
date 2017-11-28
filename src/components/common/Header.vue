<template>
	<div class="header">
		<div class="inner-box">
			<div class="img" @click="changeLogo" title="点击可以切换Logo图">
				<img :src="[logoUrl==''?'/static/img/logo.png':imgBaseUrl+logoUrl]">
			</div>
			<div class="account" :class="[hasNew?'getnew':'']">
				<img class="avatar " :src="[avatarUrl!=''?imgBaseUrl+avatarUrl:'/static/img/avatar.png']">
				<div class="red-dot" v-show="showRedDot"></div>
				<ul>
					<li class="check" @click="checkQrCode">
						<div class="red-dot" v-show="showRedDot"></div>
						<span></span>
						查看效果
					</li>
					<li class="modify-psw" @click="modifyPsw">
						<span></span>
						修改密码
					</li>
					<li class="modify-ava" @click="changeAvatar">
						<span></span>
						修改头像
					</li>
					<li class="modify-title" @click="changeTitle">
						<span></span>
						项目名称
					</li>
					<li class="login-out" @click="_loginOut">
						<span></span>
						安全退出
					</li>
				</ul>
			</div>
			<ul class="route-tabs">
				<li v-for="(item,index) in list" @click="toggleTabs(index)" :class="{active:index==nowIndex}">
					<router-link :to=" item.hash ">{{ item.title }}</router-link>
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {__loginOut, __modifyPsw, __sendBase64, __modifyProjectName} from 'service/sendData'
import {imageBaseUrl} from 'config/env'
import {setStore} from 'config/mUtils'
export default {
	data: function () {
		return {
			logo: '',
			avatar: '',
			nowIndex:0,
			imgBaseUrl: imageBaseUrl,
			list: [
				// {
				// 	title:'微网站',
				// 	hash:'microhome'
				// },
				// {
				// 	title:'摇一摇',
				// 	hash:'shake'
				// },
				// {
				// 	title:'炫幻明信片',
				// 	hash:'postcard'
				// },
				// {
				// 	title:'wifi-portal页',
				// 	hash:'wifiportal'
				// },
			]
		}
	},
	computed: {
		...mapState([
				'avatarUrl','logoUrl','avatarUrl','hasNew','userInfo','showRedDot'
			]),
	},
	mounted () {
		//这里要初始化读取 LOGO地址 头像地址等等 ，写入 这里的属性 
	},
	methods: {
		...mapMutations([
				'OPEN_NOTIFICATION','OPEN_MODAL','CLOSE_MODAL','SET_MODALCFG','SET_LOADING','OPEN_NOTIFICATION','SET_LOGO','SET_AVATAR','SET_SHOWREDDOT'
			]),
		toggleTabs(index) {
			this.nowIndex = index
			// console.log(index,this.nowIndex)
		},
		//改LOGO
		changeLogo () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'logo',				//模态框用来做什么  参考modal.vue
				title: '修改LOGO',					//模态框的标题
				onSuccess: function(){		//点击确认的逻辑
					that.SET_LOADING()
					let data = {
						...that.userInfo,
						datas: that.logoUrl,
						type: 2,
					}
					__sendBase64(data,'/site/upload_headimg')
						.then( res => {
							that.SET_LOADING()
							console.log(res)
							if(!res) {
								alert('上传失败，请稍后再试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
							that.logo = imageBaseUrl + res.data
							setStore('logo',res.data)
							that.SET_LOGO(res.data)
							that.OPEN_NOTIFICATION('修改成功')
							that.CLOSE_MODAL()
						})
					// that.logo = that.logoUrl
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		//改头像
		changeAvatar () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'avatar',				//模态框用来做什么  参考modal.vue
				title: '修改头像',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					that.SET_LOADING()
					let data = {
						...that.userInfo,
						datas: that.avatarUrl,
						type: 1,
					}
					__sendBase64(data,'/site/upload_headimg')
						.then( res => {
							that.SET_LOADING()
							console.log(res)
							if(!res) {
								alert('上传失败，请稍后再试')
								return false
							}
							if(!res.result) {
								alert(res.message)
								return false
							}
							that.avatar = imageBaseUrl + res.data
							setStore('headimg',res.data)
							that.SET_AVATAR(res.data)
							that.OPEN_NOTIFICATION('修改成功')
							that.CLOSE_MODAL()
						})
					// that.avatar = that.avatarUrl
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		//改密码
		modifyPsw () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'password',				//模态框用来做什么  参考modal.vue
				title: '修改密码',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					//发送请求 
					// console.log(_this.modifyPswOld, _this.modifyPswNew)
					
					if(_this.modifyPswOld.length < 6) {
						alert('密码不少于6位')
						return false
					}
					if(_this.modifyPswNew.length < 6) {
						alert('新密码不能少于6位')
						return false
					}
					if( _this.modifyPswConfirm != _this.modifyPswNew ){
						alert('两次密码输入必须一致')
						return false
					}
					that.SET_LOADING()
					let data = {...that.userInfo,password: _this.modifyPswOld, password1: _this.modifyPswNew}
					console.log(data)
					__modifyPsw(data).then( res => {
						that.SET_LOADING()
						console.log(res)
						if(!res.result) {
							alert(res.message)
						}
						else {
							that.OPEN_NOTIFICATION('修改成功')
							that.CLOSE_MODAL()
							// alert(res.message)
						}
					})
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		// 修改项目名称
		changeTitle () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'projectName',				//模态框用来做什么  参考modal.vue
				title: '修改项目名称',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					//发送请求 
					// console.log(_this.projectNameInput)
					that.SET_LOADING()

					let data = {
						...that.userInfo,
						name: _this.projectNameInput,
					}
					__modifyProjectName(data)
						.then( res => {

							that.SET_LOADING()
							console.log(res)
							if(!res.result) {
								alert(res.message)
								return false
							}
							that.OPEN_NOTIFICATION('修改成功')
							that.CLOSE_MODAL()
						})
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		// 查看二维码
		checkQrCode () {
			this.SET_SHOWREDDOT('false')
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'QRcode',				//模态框用来做什么  参考modal.vue
				title: '查看效果',					//模态框的标题
				onSuccess: function(){		//点击确认的逻辑
					
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		//退出登录
		_loginOut () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'loginOut',				//模态框用来做什么  参考modal.vue
				title: '退出登录',					//模态框的标题
				onSuccess: function(){		//点击确认的逻辑
					// 清楚sessionStorage   跳转到登录页
					sessionStorage.clear()
					// location.href = ''
					let data = {
						...that.userInfo
					}
					__loginOut(data).then( res => {					//退出登录要发请求？
						// alert('退出登录成功')
						// console.log(res)
						that.CLOSE_MODAL()
						console.log(res)
					})
				}
			}
			this.SET_MODALCFG(modalOption)
		}
	}
}

</script>

<style lang="less" scoped>
@import '../../style/variety.less';
.header {
	font-size: 16px;
	// border-bottom: 1px solid #dddddd;
	background: #ffffff;
	padding-left: calc( 100vw - 100% );
}
.inner-box {
	width: 1200px;
	height: 58px;
	margin: 0 auto;
}
.img {
	float: left;
	width: 350px;
	height:30px;
	margin: 14px 0;
	cursor: pointer;
	img {
		max-width: 100%;
		max-height: 100%;
	}
}
.inner-box .route-tabs {
	display: flex;
	float: right;
	margin-right: 150px;
}
.inner-box .route-tabs li {
	flex-direction: row;
	height: 58px;
	line-height: 58px;
	margin: 0 20px;
}
.inner-box .route-tabs li.active {
	color: #01aef0;
	border-bottom: 1px solid #01aef0;
}
.inner-box .account {
	float: right;
	width: 30px;
	height: 30px;
	background: #f1f4f9;
	margin: 14px 0;
	position: relative;
	&>.red-dot {
		width:6px;
		height: 6px;
		border-radius: 50%;
		position: absolute;
		top: -2px;
		right: -2px;
		background: #f00;
	}
	&.getnew:after {
		content: '';
		display: block;
		width: 6px;
		height: 6px;
		background: #f00;
		border-radius: 50%;
		position: absolute;
		top: -3px;
		right: -3px;
	}
	&.getnew .check:after {
		content: '';
		display: block;
		width: 6px;
		height: 6px;
		background: #f00;
		border-radius: 50%;
		position: absolute;
		top: 12px;
		right: 10px;
	}
	.avatar {
		width: 100%;
		height: 100%;
	}
	&:hover ul {
		display: block;
	}
	ul {
		display: none;
		position: absolute;
		top: 30px;
		right: 0;
		z-index: 9;
	}
	li {
		font-size: 14px;
		color: #333333;
		width: 120px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #dddddd;
		border-top: none;
		background: #ffffff;
		cursor: pointer;
		position: relative;
		&:hover {
			background: @lightBlue;
			color: #ffffff;
			&.check span{
				background-position: -62px -110px;
			}
			&.modify-psw span{
				background-position: -144px -110px;
			}
			&.modify-ava span{
				background-position: -226px -110px;
			}
			&.login-out span{
				background-position: -312px -110px;
			}
			&.modify-title span {
		 		background: url('/static/img/project_icon_white.png') no-repeat center ;
		 	}
		}
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
			vertical-align: middle;
			background: url('/static/img/sprite_02.png') no-repeat;
		}
		&.check span{
			background-position: -62px -62px;
		}
		&.modify-psw span{
			background-position: -145px -62px;
		}
		&.modify-ava span{
			background-position: -226px -62px;
		}
		&.login-out span{
			background-position: -311px -62px;
		}
		&.modify-title span {
	 		background: url('/static/img/project_icon.png') no-repeat center ;
	 	}
 	}
}

a {
	padding: 0 20px;
	display: inline-block;
	width: 100%;
	height: 100%;
}
a:visited {
	color:#333333;
}
.check {
	position: relative;
	.red-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background:#f00;
		position: absolute;
		right: 15px;
		top: 12px;
	}
}
</style>
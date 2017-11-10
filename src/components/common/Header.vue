<template>
	<div class="header">
		<div class="inner-box">
			<div class="img" @click="changeLogo" title="点击可以切换Logo图">
				<img :src="[logo==''?'/static/img/logo.png':logo]">
			</div>
			<div class="account" :class="[hasNew?'getnew':'']">
				<img class="avatar " :src="[avatar!=''?avatar:'/static/img/avatar.png']">
				<ul>
					<li class="check" @click="checkQrCode">
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
					<li class="login-out">
						<span></span>
						退出
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
export default {
	data: function () {
		return {
			logo: '',
			avatar: '',
			nowIndex:0,
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
				'avatarUrl','logoUrl','hasNew'
			]),
	},
	mounted () {
		//这里要初始化读取 LOGO地址 头像地址等等 ，写入 这里的属性 
	},
	methods: {
		...mapMutations([
				'OPEN_NOTIFICATION','OPEN_MODAL','SET_MODALCFG'
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
					that.logo = that.logoUrl
					
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
				onSuccess: function(){		//点击确认的逻辑
					that.avatar = that.avatarUrl
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
					console.log(_this.modifyPsw)
				}
			}
			this.SET_MODALCFG(modalOption)
		},
		// 查看二维码
		checkQrCode () {
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
				background-position: -143px -110px;
			}
			&.modify-ava span{
				background-position: -226px -110px;
			}
			&.login-out span{
				background-position: -310px -110px;
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
			background-position: -143px -62px;
		}
		&.modify-ava span{
			background-position: -226px -62px;
		}
		&.login-out span{
			background-position: -310px -62px;
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
.account {
	
}
</style>
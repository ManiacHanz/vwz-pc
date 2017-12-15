<template>
	<div class="mobile-panel" v-if="homePanelList">
		<div class="mobile">
			<!-- <transition name="panel-fade" mode="out-in"> -->
			<home-panel v-if="showPanel==='home'"></home-panel>
			<list-panel v-else-if="showPanel==='list'"></list-panel>
			<user-panel v-else-if="showPanel==='user'"></user-panel>
			<!-- </transition> -->
			<div class="menubtn" v-if="homePanelList.button" :class='mobileColorStyle'>
				<ul :class="menubtnStyle">
					<li :class="[mobileActive==='menubtn'+index?'active':'', item.icon==''?mobileColorStyle: '']" 
						v-for="(item, index) in homePanelList.button" 
						@click="switchPanel(item, index)">
						<div class="mask" v-show="!item.display"></div>
						<div class="icon">
							<img v-show="item.icon != ''" :src="imgBaseUrl + item.icon"></img>
						</div>
						<p :class="mobileColorStyle">{{ item.title }}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="theme">
			 <div @click="_changeTheme('blue')" title="点击可以切换主题哟~" :class="[mobileColorStyle === 'blue'? 'active' : '']">主题1</div>
			 <div @click="_changeTheme('dark')" title="点击可以切换主题哟" :class="[mobileColorStyle === 'dark'? 'active' : '']">主题2</div>
			 <div @click="_changeTheme('green')" title="点击可以切换主题哟" :class="[mobileColorStyle === 'green'? 'active' : '']">主题3</div>
			 <div class="submitTheme" @click="_submitTheme">确认主题</div>
		</div>
	</div>
		
	
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {__getHomePanel, __getTheme} from 'service/getData.js'
import {__sendTheme, __sendHomePanel} from 'service/sendData'
import {jsonParse, jsonStringify} from 'config/mUtils'

import {imageBaseUrl} from 'config/env.js'


//引入手机页面的3个模板页
import homePanel from './sub/homePanel.vue'
import listPanel from './sub/listPanel.vue'
import userPanel from './sub/userPanel.vue'


// 模拟手机首页配置数据 
// import { mobileHomeCfg } from '../../../static/data/mobileHomeCfg.js'

export default {

  name: 'mobilePanel',
  components: {
  	homePanel,
  	listPanel,
  	userPanel,
  },
  data () {
    return {
    	mobileCfg:'',    //手机配置,
    	// menuBtnIconList: ['/static/img/menuicon_01.png','','/static/img/menuicon_02.png','/static/img/menuicon_03.png'],   //按钮图标的默认配置
    	// menubtnStyle: 'type1',
    	timer: '',
    	imgBaseUrl: imageBaseUrl,
    	testMenuBtnData: [ {},{},{}],
    }
  },
  computed: {
  	...mapState([
  			'showPanel','mobileActive','mobileColorStyle','homePanelList','menubtnStyle','userInfo'
  		])
  },
  created () {
  	console.log({...this.userInfo})
  	__getHomePanel({...this.userInfo})
  		.then( res => {
  			// console.log(jsonParse(res.data))
  			if (!res) {
  				alert('网络请求失败，请检查网络后刷新页面')
  				return false
  			}
  			if (!res.result) {
  				alert(res.message)
  				return false
  			}
  			let jres = jsonParse(res.data)
  			// console.log(jres)
  			this.SAVE_HOMEPANELLIST(jres)
  			// console.log(this.homePanelList)
  		})
  		.then( ()=> {
				// this.SET_MENUBTN_STYLE ()
  		})
  	__getTheme({...this.userInfo})
  		.then( res => {
  			//console.log(res.data) //主题配色
  		  this.SET_MOBILE_COLOR(res.data)
  		})
  },
  mounted () {
  	//保证加载完成再渲染数据
  	setTimeout( ()=>{
   	 
  	},20)
  },
  watch: {
  	// mobileColorStyle: function(newVal, oldVal) {
  	// 	if(newVal === 'blue') {
  	// 		this.menuBtnIconList = ['/static/img/menuicon_01.png','','/static/img/menuicon_02.png','/static/img/menuicon_03.png']
  	// 	}
  	// 	else if (newVal === 'dark') {
  	// 		this.menuBtnIconList = ['/static/img/menuicon_01_dark.png','','/static/img/menuicon_02_dark.png','/static/img/menuicon_03_dark.png']
  	// 	}
  	// 	else if (newVal === 'green') {
  	// 		this.menuBtnIconList = ['/static/img/menuicon_01_green.png','','/static/img/menuicon_02_green.png','/static/img/menuicon_03_green.png']
  	// 	}
  	// }
  },
  beforeDestroy () {
  	this.SET_MOBILE_ACTIVE('')
  	this.CLEAR_FORMCFG()
  },
  methods: {
  	...mapMutations([
  			'SET_SHOWPANEL','SET_MOBILE_COLOR','UPDATE_FORMCFG','SET_MOBILE_ACTIVE','SAVE_HOMEPANELLIST','SET_MENUBTN_STYLE','SET_LOADING','OPEN_NOTIFICATION','CLEAR_FORMCFG'
  		]),
  	
  	//初始化菜单配置的样式 这里要通过数组的长度来判断  有3个按钮就传4位
  	// SET_MENUBTN_STYLE () {
  	// 	// console.log(this.homePanelList)
  	// 	if(this.homePanelList.button.length==4){
	  //   	this.menubtnStyle = 'type1'
	  //   }
	  //   else if (this.homePanelList.button.length==5) {
	  //   	// console.log(this.homePanelList.button[2].title=='')
	  //   	if(this.homePanelList.button[2].title=='') {
			// 		this.menubtnStyle = 'type2'
	  //   	}
	  //   	else {
	  //   		this.menubtnStyle = 'type3'
	  //   	}
	  //   }
  	// },
  	updateInputList (arr) {

  	},
  	//修改主题
  	_changeTheme (theme) {
  		const that = this
  		this.SET_MOBILE_COLOR(theme)
  		/**   延时发送主题配置
  		clearTimeout(this.timer)
  		this.timer = setTimeout(function(){
  			// 尽量减少请求次数
  			// console.log(theme)
  			let data = {
  				...that.userInfo,
  				theme,
  			}
  			__sendTheme(data)
  				.then( res => {
  					console.log(res)
  				})
  		},10000)
  		*/
  	},
  	// 确认主题
  	_submitTheme () {
  		this.SET_LOADING()
  		const that = this
  		let data = {
  				...this.userInfo,
  				theme: this.mobileColorStyle,
  			}
			__sendTheme(data)
				.then( res => {
  				this.SET_LOADING()
					// console.log(res)
					if(!res.result) {
						alert(res.message)
						return false
					}
					this.OPEN_NOTIFICATION('主题修改成功')
				})
  	},
  	switchPanel (item, index) {
  		/*
  			默认的3个按钮是有type值的，但是没有link值
  		 */

  		//改变面板显示
  		this.SET_SHOWPANEL(item.type)
  		//改变激活对象
  		this.SET_MOBILE_ACTIVE('menubtn'+index)
  		//改变表格显示
  		if(!!item.type) {
  			//默认的3个模块
  			let option = {
  				formFor: 'menubtn',
  				formTitle: '主菜单配置',
	  			formSubTitle: '',
	  			removeMenu: false,
	  			addMenu: false,
	  			inputList: [
	  				{type:'setTitle', key:'menubtn'+index, value:item.title},
	  				{type:'setIcon', key:'menubtn'+index, value: item.icon},
	  				{type:'setLink', key:'menubtn'+index, value: item.link},
	  				{type:'setType', key:'menubtn'+index, value: item.type},
	  				{type:'setDisplay', key:'menubtn'+index, value: item.display},
  				],
	  			pickFromLib: false
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  		else {
  			let option = {
  				formFor: 'menubtn',
  				formTitle: '主菜单配置',
	  			formSubTitle: '',
	  			removeMenu: true,
	  			addMenu: false,
	  			inputList: [
	  				{type:'setTitle', key:'menubtn'+index, value: item.title},
	  				{type:'setIcon', key:'menubtn'+index, value: item.icon},
	  				{type:'setLink', key:'menubtn'+index, value: item.link}
  				],
	  			pickFromLib: false
  			}
  			//新建一个菜单
  			this.UPDATE_FORMCFG(option)
  			if (this.menubtnStyle === 'type1') {
  				let obj = {
  					title: '菜单名称',
	          icon: '/fileresource/imgs/system/icon/menuicon_03_dark.png',
	          link: '',
	          type: '',
  				}
  				let oButton = [...this.homePanelList.button]
  				// console.log(this.homePanelList.button)
  				oButton.splice(1,0,obj)
  				let oHomePanelList = Object.assign({},this.homePanelList,{ button: oButton})
  				// console.log(oHomePanelList)
  				let data = {
  					...this.userInfo,
  					...oHomePanelList,
  				}
  				// console.log(jsonStringify(data))
  				__sendHomePanel(jsonStringify(data))			//3个面板的数据要转化
  					.then( res => {
  						if(!res){
  							alert('网络请求失败，请检查网络后刷新页面')
  							return false
  						}
  						if(!res.result) {
  							alert(res.message)
  							return false
  						}
  						this.SAVE_HOMEPANELLIST(oHomePanelList)
  						this.SET_MENUBTN_STYLE()
  					})
  				
  				// this.homePanelList = 
  				// alert('发送请求覆盖掉homePanelList')
  				// this.SAVE_HOMEPANELLIST(this.homePanelList)
  				// this.SET_MENUBTN_STYLE()
  			}
  		}
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';

/*transition的动画*/
.panel-fade-enter-active, .panel-fade-leave-active {
    transition: opacity .3s;
}
.panel-fade-enter, .panel-fade-leave-active {
    opacity: 0;
}
.mobile {
	width: 316px;
	border: 1px solid #dddddd;
}

.menubtn {
	font-size: 10px;
	border-top: 1px solid #dddddd;
	&.dark {
		background-color: @dark_back;
		border-color: @dark_border;
		li.active:after {
			border-color: @dark_lightFont;
		}
	}
	&.green li.active:after {
		border-color: @green_font;
	}
	ul {
		display: flex;
		justify-content: space-around;
		// justify-content: space-between;
	}
	li {
		flex-grow: 1;
		height: 46px;
		margin: 0 1px;
		cursor: pointer;
		position: relative;
		&.active:after {
			content: '';
			width: 100%;
			height: 100%;
			border: 1px solid @lightBlue;
			box-sizing: border-box;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
		}
		p.blue {
			color: @lightBlue;
		}
		p.dark {
			color: @dark_lightFont;
		}
		p.green {
			color: @green_font;
		}
		&:first-of-type,
		&:last-of-type,
		&:nth-last-child(2) {
			width: 60px;
			flex-grow: 0;
		}
		.icon {
			height:30px;
			text-align: center;
			img {
				width: 26px;
				height: 26px;
				margin-top: 2px;
			}
		}
		p {
			text-align: center;
		}
	}
	li.blue:first-of-type {
			background: url('/static/img/menuicon_01.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.blue:nth-last-child(2) {
			background: url('/static/img/menuicon_04.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.blue:nth-last-child(1) {
			background: url('/static/img/menuicon_05.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.dark:first-of-type {
			background: url('/static/img/menuicon_01_dark.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.dark:nth-last-child(2) {
			background: url('/static/img/menuicon_04_dark.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.dark:nth-last-child(1) {
			background: url('/static/img/menuicon_05_dark.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.green:first-of-type {
			background: url('/static/img/menuicon_01_green.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.green:nth-last-child(2) {
			background: url('/static/img/menuicon_04_green.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
		li.green:nth-last-child(1) {
			background: url('/static/img/menuicon_05_green.png') no-repeat;
			background-size: 26px 26px;
			background-position: center 2px;
		}
	.type1{
		li:nth-child(2) {
			background: url('/static/img/add_menu_long.png') no-repeat;
			background-size: 128px 46px;
			flex-grow:2;
		}
	}
	.type2 {
		li {
			width: 63px;
		}
		li:nth-child(3) {
			background: url('/static/img/add_menu.png') no-repeat;
			background-size: 61px 46px;
			flex-grow:1;
		}
	}
	.type3 {
		li {
			width: 63px;
		}
	}
	.mask {
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.6);
		position: absolute;
		left: 0;
		top: 0;
	}
}
.theme {
	color: #777777;
	width: 316px;
	height: 44px;
	line-height: 44px;
	background: #f2f4f9;
	text-align:right;
	margin-top: 14px;
	display: flex;
	div {
		color: #ffffff;
		width: 46px;
		height: 28px;
		text-align: center;
		line-height: 28px;
		margin: 8px 10px;
		cursor: pointer;
		position: relative;
		&:nth-child(1) {
			background: #25c4da;
		}
		&:nth-child(2) {
			background: #fb8f03;
		}
		&:nth-child(3) {
			background: #08c2ae;
		}

		&.active::after {
			content: '';
			display: block;
			width:44px;
			height: 26px;
			border: 1px solid @lightBlue;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	.submitTheme {
		color: #333;
		width: 74px;
	  height: 26px;
	  line-height: 26px;
	  text-align: center;
	  border: 1px solid #dedede;
	  background: #ffffff;
	  cursor: pointer;
	  &:hover {
	  	border-color: #888;
	  }
	}
}
</style>
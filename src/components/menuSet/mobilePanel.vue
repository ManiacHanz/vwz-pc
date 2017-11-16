<template>
	<div class="mobile-panel" v-if="homePanelList">
		<div class="mobile">
			<transition name="panel-fade" mode="out-in">
			<home-panel v-if="showPanel==='home'"></home-panel>
			<list-panel v-else-if="showPanel==='list'"></list-panel>
			<user-panel v-else-if="showPanel==='user'"></user-panel>
			</transition>
			<div class="menubtn" v-if="homePanelList.button" :class='mobileColorStyle'>
				<ul :class="menubtnStyle">
					<li :class="[mobileActive==='menubtn'+index?'active':'', item.icon==''?mobileColorStyle: '']" v-for="(item, index) in homePanelList.button" @click="switchPanel(item, index)">
						<div class="icon">
							<img v-show="item.icon != ''" :src="item.icon"></img>
						</div>
						<p :class="mobileColorStyle">{{ item.title }}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="theme">
			 <div @click="SET_MOBILE_COLOR('blue')" title="点击可以切换主题哟~">主题1</div>
			 <div @click="SET_MOBILE_COLOR('dark')" title="点击可以切换主题哟">主题2</div>
			 <div @click="SET_MOBILE_COLOR('green')" title="点击可以切换主题哟">主题3</div>
			 期待更多主题...
		</div>
	</div>
		
	
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {__getHomePanel} from 'service/getData.js'
import {jsonParse} from 'config/mUtils'

//引入手机页面的3个模板页
import homePanel from './sub/homePanel.vue'
import listPanel from './sub/listPanel.vue'
import userPanel from './sub/userPanel.vue'


// 模拟手机首页配置数据 
import { mobileHomeCfg } from '../../../static/data/mobileHomeCfg.js'

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
  methods: {
  	...mapMutations([
  			'SET_SHOWPANEL','SET_MOBILE_COLOR','UPDATE_FORMCFG','SET_MOBILE_ACTIVE','SAVE_HOMEPANELLIST','SET_MENUBTN_STYLE'
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
  					title: '',
	          icon: '',
	          link: '',
	          type: '',
  				}
  				this.homePanelList.button.splice(1,0,obj)
  				this.homePanelList = Object.assign({},...this.homePanelList,this.homePanelList.button)
  				alert('发送请求覆盖掉homePanelList')
  				this.SAVE_HOMEPANELLIST(this.homePanelList)
  				this.SET_MENUBTN_STYLE()
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
		li.active:after {
			border-color: @dark_lightFont;
		}
	}
	&.green li.active:after {
		border-color: @green_font;
	}
	ul {
		display: flex;
		justify-content: space-between;
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
		&:nth-child(1) {
			background: #25c4da;
		}
		&:nth-child(2) {
			background: #fb8f03;
		}
		&:nth-child(3) {
			background: #08c2ae;
		}
	}
}
</style>
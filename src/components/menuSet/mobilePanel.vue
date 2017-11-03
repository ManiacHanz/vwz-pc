<template>
	<div class="mobile-panel">
		<div class="mobile">
			<transition name="panel-fade" mode="out-in">
			<home-panel v-if="showPanel==='home'"></home-panel>
			<list-panel v-else-if="showPanel==='list'"></list-panel>
			<user-panel v-else-if="showPanel==='user'"></user-panel>
			</transition>
			<div class="menubtn">
				<ul :class="menubtnStyle">
					<li :class="[mobileActive==='menubtn'+index?'active':'', item.icon==''?mobileColorStyle: '']" v-for="(item, index) in mobileCfg.menuBtn" @click="switchPanel(item.default,item.link, index)">
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
    	menuBtnIconList: ['/static/img/menuicon_01.png','','/static/img/menuicon_02.png','/static/img/menuicon_03.png'],   //按钮图标的默认配置
    	menubtnStyle: 'type1',
    }
  },
  computed: {
  	...mapState([
  			'showPanel','mobileActive','mobileColorStyle'
  		])
  },
  created () {

  	//这里假数据的更换
    // console.log(mobileHomeCfg)
		this.mobileCfg = mobileHomeCfg
  },
  mounted () {
  	
    this.initMenuBtnType ()
    
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
  			'SET_SHOWPANEL','SET_MOBILE_COLOR','UPDATE_FORMCFG','SET_MOBILE_ACTIVE'
  		]),
  	
  	//初始化菜单配置的样式 这里要通过数组的长度来判断  有3个按钮就传4位
  	initMenuBtnType () {
  		// console.log('initMenuBtnType')
  		if(this.mobileCfg.menuBtn.length==4){
	    	this.menubtnStyle = 'type1'
	    }
	    else if (this.mobileCfg.menuBtn.length==5) {
	    	// console.log(this.mobileCfg.menuBtn[2].title=='')
	    	if(this.mobileCfg.menuBtn[2].title=='') {
					this.menubtnStyle = 'type2'
	    	}
	    	else {
	    		this.menubtnStyle = 'type3'
	    	}
	    }
  	},
  	updateInputList (arr) {

  	},
  	switchPanel (_default, link, index) {
  		/*
  			默认的3个按钮是有_default值的，但是没有link值

  		 */

  		//改变面板显示
  		this.SET_SHOWPANEL(_default)
  		//改变激活对象
  		this.SET_MOBILE_ACTIVE('menubtn'+index)
  		//改变表格显示
  		if (!!_default) {
  			//如果有type就是默认的3个配置
  			this.UPDATE_FORMCFG({
	  			formTitle: '主菜单配置',
	  			formSubTitle: '',
	  			removeMenu: false,
	  			addMenu: false,
	  			inputList: [{type:'setTitle', key:'1'},{type:'setIcon', key:'1'},{type:'setLink', key:'1'}],
	  			pickFromLib: false
	  		})
  		}
  		else {
  			//新建一个菜单
  			this.UPDATE_FORMCFG({
	  			formTitle: '主菜单配置',
	  			formSubTitle: '',
	  			removeMenu: true,
	  			addMenu: false,
	  			inputList: [{type:'setTitle', key:'2'},{type:'setIcon', key:'2'},{type:'setLink', key:'2'}],
	  			pickFromLib: false
	  		})
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
			background: url('/static/img/add_menu.png') no-repeat;
			background-size: 128px 46px;
			flex-grow:2;
		}
	}
	.type2 {
		li:nth-child(3) {
			background: url('/static/img/add_menu.png') no-repeat;
			background-size: 63px 46px;
			flex-grow:1;
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
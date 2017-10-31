<template>
	<div class="home-panel" :class="mobileColorStyle">
		<section class="banner swiper-container" :class="[mobileActive==='homebanner'?'active':'']" id="Swiper1"
		@click.left="setUpModule('','homebanner')">
      <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in mobileCfg.homebanner" :key="index" >
        		<img :src="item.img">
        		<p>
        			<span>{{ item.title }}</span>
        		</p>
          </li>
      </ul>
      <div class="swiper-pagination" id="SPagination_1"></div>
		</section>
		<section class="introduce" :class="[mobileActive==='introduce'?'active':'']" @click="setUpModule('','introduce')">
			<p class="title">{{mobileCfg.intro.title}}</p>
			<div class="content">{{mobileCfg.intro.content}}</div>
			<div class="tem-name">{{mobileCfg.intro.tempName}}</div>
		</section>
		<section class="plate">
			<div v-for="(item, index) in mobileCfg.plates" :class="['temp_'+index,mobileActive==='temp_'+index?'active':'']" 
			@click="setUpModule('','temp_'+index)">
				<img v-if="item.back" :src="item.back" class="background">
				<p class="describe" v-if="item.describe">{{ item.describe }}</p>
				<img :src="item.icon" v-if="item.icon">
				<p class="plate-name">{{ item.tempName }}</p>
			</div>
		</section>
	</div>
</template>

<script>
import '../../../../static/plugin/swiper.min.css'
import '../../../../static/plugin/swiper.min.js'

import { mapState, mapMutations } from 'vuex'

// 模拟手机首页配置数据 
import { mobileHomeCfg } from '../../../../static/data/mobileHomeCfg.js'
export default {

  name: 'homePanel',

  data () {
    return {
    	mobileCfg:'',    //手机配置,

    }
  },
  computed: {
  	...mapState([
  			'mobileColorStyle','mobileActive'
  		]),
  },
  created () {

  	//这里假数据的更换
    // console.log(mobileHomeCfg)
		this.mobileCfg = mobileHomeCfg
  },
  mounted () {
  	
		// 初始化轮播 
  	new Swiper('#Swiper1', {
        pagination: '#SPagination_1',
        loop: true,
        autoplay: 3000,
        paginationClickable: true,  //点击分页器
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
   			observeParents:true,//修改swiper的父元素时，自动初始化swiper
    })
  },
  methods: {
  	...mapMutations([
  			'SET_MOBILE_ACTIVE','UPDATE_FORMCFG'
  		]),
  	setUpModule (link, dom) {
  		// 改变激活状态
  		this.SET_MOBILE_ACTIVE(dom)
  		// 配置轮播表单
  		if (dom === 'homebanner') {
  			//标题数组
  			let bannerTitleArr = []
  			for (let elem of this.mobileCfg.homebanner) {
  				bannerTitleArr.push(elem.title)
  			}
  			let bannerLinkArr = []
  			for (let elem of this.mobileCfg.homebanner) {
  				bannerLinkArr.push(elem.link)
  			}
  			let option = {
  				formFor:'homebanner',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: 'banner配置',		//表单标题
					formSubTitle: '(最多可配置6张图片，请上传jpg/png格式，小于300k，建议尺寸720*320)',
					removeMenu: false,		//删除按钮
					addMenu: false,		//添加按钮
					inputList:[
						{
							type:'setMultiPicUploader',
							key:'homebanner',
							imglist:this.mobileCfg.homebanner,
						},
						{
							type:'setName',
							key:'homebanner', 
							value: bannerTitleArr,
						},
						{
							type:'setLink', 
							key:'homebanner', 
							value: bannerLinkArr,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  		// 配置介绍表单
  		else if (dom === 'introduce'){
				let option = {
  				formFor:'introduce',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: '二级菜单配置',		//表单标题
					formSubTitle: '',
					removeMenu: false,		//删除按钮
					addMenu: false,		//添加按钮
					inputList:[
						{
							type:'setTitle',
							key:'introduce',
							value: this.mobileCfg.intro.tempName,
						},
						{
							type:'setName', 
							key:'introduce', 
							value: this.mobileCfg.intro.title,
						},
						{
							type:'setSummary',
							key: 'introduce',
							value: this.mobileCfg.intro.content,
						},
						{
							type:'setLink', 
							key:'introduce', 
							value: this.mobileCfg.intro.link,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  		// 配置小模块表单
  		else {
  			let option = {
  				formFor:dom,    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: '二级菜单配置',		//表单标题
					formSubTitle: '',
					removeMenu: false,		//删除按钮
					addMenu: false,		//添加按钮
					inputList:[],
					pickFromLib: true,
  			}
  			if(dom.substring(5)<3){
  				option = Object.assign({}, option, {
  					inputList:[
	  					{
								type:'setTitle',
								key:dom,
								value: this.mobileCfg.plates[(dom.substring(5))].tempName,
							},
							{
								type:'setIcon', 
								key:dom, 
								value: this.mobileCfg.plates[dom.substring(5)].icon,
							},
							{
								type:'setLink',
								key: dom,
								value: this.mobileCfg.plates[dom.substring(5)].link,
							},
  					]
  				})
  			}
  			else {
  				option = Object.assign({}, option, {
  					inputList:[
	  					{
								type:'setTitle',
								key:dom,
								value: this.mobileCfg.plates[(dom.substring(5))].tempName,
							},
							{
								type:'setName', 
								key:dom, 
								value: this.mobileCfg.plates[dom.substring(5)].describe,
							},
							{
								type:'setBack',
								key:dom,
								value: this.mobileCfg.plates[dom.substring(5)].back,
							},
							{
								type:'setLink',
								key: dom,
								value: this.mobileCfg.plates[dom.substring(5)].link,
							},
  					]
  				})
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  	},
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/variety.less';


.home-panel {
	height: 448px;
	overflow: hidden;
}
.banner {
	width: 316px;
	height: 140px;
	background: #eeeeee;
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
	.swiper-slide {
		position: relative;
		img {
			width: 100%;
		}
		p {
			color: #ffffff;
			font-size: 14px;
			width: 100%;
			height: 26px;
			line-height: 26px;
			position: absolute;
			bottom: 0;
			left: 0;
			text-indent: 6px;
			overflow: hidden;
			background: rgba(0, 0, 0, 0.5);
			span {
				display: inline-block;
				width: 250px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
	.swiper-pagination {
		text-align: right;
		bottom: 4px;
	}
}
.introduce {
	height: 86px;
	border-top: 1px solid #dddddd;
	border-bottom: 1px solid #dddddd;
	padding: 6px 8px;
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

	.title {
		font-weight: bold;
		color: #333333;
		margin-bottom: 4px;
	}
	.content {
		font-size: 13px;
		color: #888888;
		line-height: 140%;
	}
	.tem-name {
		font-size: 12px;
		color: #333333;
		text-align: right;
		position: absolute;
		bottom: 6px;
		right: 8px;
	}
}
.plate {
	height: 194px;
	padding: 8px 6px;
	position: relative;
	&>div {
		border-radius: 4px;
		position: absolute;
		box-sizing: border-box;
		cursor: pointer;
		&.active:after {
			content: '';
			width: 100%;
			height: 100%;
			border: 2px solid @lightBlue;
			border-radius: 4px;
			box-sizing: border-box;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
		}
	}
	
	.plate-name {
		color: #ffffff;
		position: absolute;
		bottom: 6px;
		right: 6px;
	}
	img {
		width: 30px;
		height: 30px;
		position: absolute;
	}
	.describe {
		color: #ffffff;
		padding: 6px;
	}
	.temp_0 {
		width: 96px;
		height: 194px;
		background: #ff5654;
		top: 8px;
		left: 9px;
		img {
			top: 82px;
			left: 33px;
		}
	}
	.temp_1 {
		width: 92px;
		height: 92px;
		background: #03aaf4;
		top: 8px;
		left: 114px;
		img {
			top: 31px;
			left: 31px;
		}
	}
	.temp_2 {
		width: 92px;
		height: 92px;
		background: #8ed043;
		top: 8px;
		left: 215px;
		img {
			top: 31px;
			left: 31px;
		}
	}
	.temp_3 {
		width: 193px;
		height: 94px;
		background: #f1c53b;
		top: 108px;
		left: 114px;
		p {
			position:absolute;
			z-index:5;
		}
		img {
			top: 32px;
			left: 81px;
		}
		.background {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
		}
	}

}
.dark {
	background: @dark_back;
	.banner.active:after {
		border: 1px solid @dark_lightFont;
	}
	.introduce {
		border-color: @dark_border;
		&.active:after {
			border: 1px solid @dark_lightFont;
		}
		.title, .tem-name {
			color: @dark_lightFont;
		}
		.content {
			color: @dark_font;
		}
	}
	.plate {
		&>div.active:after {
			border: 2px solid @dark_lightFont;
		}
		.describe {
			color: @dark_font;
		}
		.temp_0 {
			background: @dark_plate0;
			img {
				opacity: 0.5;
			}
		}
		.temp_1 {
			background: @dark_plate1;
			img {
				opacity: 0.5;
			}
		}
		.temp_2 {
			background: @dark_plate2;
			img {
				opacity: 0.5;
			}
		}
		.temp_3 {
			background: @dark_plate3;
			img {
				opacity: 0.5;
			}
		}
	}
}
.green {
	.banner.active:after {
		border: 1px solid @green_font;
	}
	.introduce {
		&.active:after {
			border: 1px solid @green_font;
		}
	}
	.plate {
		background: @green_back;
		&>div.active:after {
			border: 2px solid @green_font;
		}
		.temp_0 {
			background: @green_plate0;
		}
		.temp_1 {
			background: @green_plate1;
		}
		.temp_2 {
			background: @green_plate2;
		}
		.temp_3 {
			background: @green_plate3;
		}
	}
}
</style>
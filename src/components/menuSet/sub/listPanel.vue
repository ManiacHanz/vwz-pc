<template>
	<div class="list-panel" :class="mobileColorStyle">
		<section class="banner swiper-container" :class="[mobileActive==='listbanner'?'active':'']" id="Swiper2"
		@click.left="setUpModule('','listbanner')">
      <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in mobileCfg.listbanner" :key="index">
        		<img :src="item.img">
        		<p>
        			<span>{{ item.title }}</span>
        		</p>
          </li>
      </ul>
      <div class="swiper-pagination" id="SPagination_2"></div>
		</section>
		<section class="detail">
			<ul >
				<li v-for="(item, index) in mobileCfg.contentlist" :key="index" 
				:class="[mobileActive==='contentlist'+index?'active':'']"
				@click.left="setUpModule(item.link,'contentlist'+index)">
					<type-a v-if="item.type==='a'" :content="item" :colorStyle="mobileColorStyle"></type-a>
					<type-b v-else :content="item" :colorStyle="mobileColorStyle"></type-b>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import '../../../../static/plugin/swiper.min.css'
import '../../../../static/plugin/swiper.min.js'

import typeA from '@/components/list/typeA'
import typeB from '@/components/list/typeB'


import { mapState, mapMutations } from 'vuex'

// 模拟手机首页配置数据 
import { mobileListCfg } from '../../../../static/data/mobileListCfg.js'

export default {

  name: 'listPanel',
  components: {
  	typeA,
  	typeB,
  },
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
		this.mobileCfg = mobileListCfg
  },
  mounted () {
		// 初始化轮播 
  	new Swiper('#Swiper2', {
        pagination: '#SPagination_2',
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
  		if (dom === 'listbanner') {
  			//标题数组
  			let bannerTitleArr = []
  			for (let elem of this.mobileCfg.listbanner) {
  				bannerTitleArr.push(elem.title)
  			}
  			let bannerLinkArr = []
  			for (let elem of this.mobileCfg.listbanner) {
  				bannerLinkArr.push(elem.link)
  			}
  			let option = {
  				formFor:'listbanner',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: 'banner配置',		//表单标题
					formSubTitle: '(最多可配置6张图片，请上传jpg/png格式，小于300k，建议尺寸720*320)',
					removeMenu: false,		//删除按钮
					addMenu: false,		//添加按钮
					inputList:[
						{
							type:'setMultiPicUploader',
							key:'listbanner',
							imglist:this.mobileCfg.listbanner,
						},
						{
							type:'setName',
							key:'listbanner', 
							value: bannerTitleArr,
						},
						{
							type:'setLink', 
							key:'listbanner', 
							value: bannerLinkArr,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  		else if (dom.substring(0,11) === 'contentlist') {
  			let domIndex = dom.substring(11)			//获取每个索引
  			let option = {
  				formFor:'contentlist',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: '二级菜单配置',		//表单标题
					formSubTitle: '',
					removeMenu: true,		//删除按钮
					addMenu: true,		//添加按钮
					inputList:[
						{
							type:'setName',
							key:dom, 
							value: this.mobileCfg.contentlist[domIndex].title,
						},
						{
							type:'setListPicUploader',
							key:dom,
							imglist: this.mobileCfg.contentlist[domIndex].imglist,
						},
						{
							type:'setLink', 
							key:dom, 
							value: this.mobileCfg.contentlist[domIndex].link,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  	},
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/variety.less';

::-webkit-scrollbar {
	width: 6px;
	height: 16px;  
  background-color: #F5F5F5;  
}
//滚动条背景
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: @borderActiveGrey;  
} 
.list-panel {
	height: 448px;
	overflow-y: auto;
	overflow-x: hidden;
}
.banner {
	width: 310px;
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
.detail li {
	border-top: 1px solid @borderGrey;
	border-bottom: 1px solid @borderGrey;
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
	}
}

.dark {
	.banner.active:after {
		border-color: @dark_lightFont;
	}
	.detail li {
		border-top-color: @dark_border;
		border-bottom-color: @dark_border;
		&.active:after {
			border-color: @dark_lightFont;
		}
	}
} 
.green {
	.banner.active:after {
		border-color: @green_font;
	}
	.detail li {
		&.active:after {
			border-color: @green_font;
		}
	}
} 
</style>
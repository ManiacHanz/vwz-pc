<template>
	<div class="user-panel" :class="mobileColorStyle">
		<section class="top">
			<img src="/static/img/ad_01.jpg">
		</section>
		<ul class="ctr-list">
			<li v-for="(item, index) in userPanelList.content" :key="index"
			:class="[mobileActive==='userlist'+index?'active':'']"
			@click.left="setUpModule(item.link,'userlist'+index)">
				<img :src="imgBaseUrl+item.icon" v-show="item.icon">
				<span>{{item.title}}</span>
			</li>
		</ul>
	</div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import {__getUserPanel} from 'service/getData.js'
import {imageBaseUrl} from 'config/env.js'
import {jsonParse} from 'config/mUtils'

// 模拟手机用户配置数据 
import { mobileUserCfg } from '../../../../static/data/mobileUserCfg.js'

export default {

  name: 'userPanel',

  data () {
    return {
    	mobileUserCfg:'',
    	imgBaseUrl: imageBaseUrl,

    }
  },
  computed: {
  	...mapState([
  			'mobileColorStyle','mobileActive','userPanelList','userInfo'
  		]),
  },
   created () {
  	__getUserPanel({...this.userInfo})
			.then( res => {
			  console.log(res.data)
  			if (!res.result) {
  				alert(res.message)
  				return false
  			}
  			let jres = jsonParse(res.data)
  			// console.log(jres)
				this.SAVE_USERPANELLIST(jres)
				this.SET_MENUBTN_STYLE()
  		})
  	//这里假数据的更换
    // console.log(mobileHomeCfg)
		// this.mobileCfg = mobileListCfg
  },
  mounted () {

  },
  methods: {
  	...mapMutations([
  			'SET_MOBILE_ACTIVE','UPDATE_FORMCFG','SAVE_USERPANELLIST','SET_MENUBTN_STYLE'
  		]),
  	setUpModule (link, dom) {
  		// 改变激活状态
  		this.SET_MOBILE_ACTIVE(dom)
  		//配置右边表单
  		let domIndex = dom.substring(8)
  		let option = {
	      formFor:'userlist',    //配置表单选项的唯一标识，负责配置唯一的数据
				formTitle: '二级菜单配置',		//表单标题
				formSubTitle: '',
				listIndex: domIndex,
				removeMenu: true,		//删除按钮
				addMenu: true,		//添加按钮
				inputList:[
					{
						type:'setName',
						key:dom, 
						value: this.userPanelList.content[domIndex].title,
					},
					{
						type:'setIcon',
						key:dom,
						value: this.userPanelList.content[domIndex].icon,
					},
					{
						type:'setLink', 
						key:dom, 
						value: this.userPanelList.content[domIndex].link,
					},
					{
						type:'setLinkType', 
						key:dom, 
						value: this.userPanelList.content[domIndex].linkType,
					},
				],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
				pickFromLib: true,
  		}
  		this.UPDATE_FORMCFG(option)
  	},
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/variety.less';
@import '../../../style/common.less';
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
.user-panel {
	height: 448px;
	// overflow: hidden;
	overflow-y: auto;
}
.top {
	height: 90px;
	position: relative;
	overflow: hidden;
	// cursor:pointer;
	// &.active {
	// 	border: 1px solid @lightBlue;
	// }
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
	img {
		width: 100%;
		height: 100%;
	}
}
.ctr-list {
	li {
		height: 46px;
		line-height: 46px;
		border: 1px solid transparent;
		border-bottom: 1px solid @borderGrey;
		background: url('/static/img/arrow.png') no-repeat;
		background-position: 95% center;
		background-size: 8px;
		padding-left: 10px;
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
	img {
		width: 30px;
		height: 30px;
		margin-right: 16px;
	  vertical-align: 8px;
	}
	span {
		display: inline-block;
		width: 180px;
		.ellipsis();
	}
}
.dark {
	background-color: @dark_back;
	.ctr-list{
		color: @dark_lightFont;
		li {
			background: url('/static/img/arrow_dark.png') no-repeat;
			background-position: 95% center;
			background-size: 8px;
			
			border-bottom-color: @dark_border;
			&.active:after {
				border-color: @dark_lightFont;
			}
		}
	}
}
.green {
	.ctr-list{
		li.active:after {
				border-color: @green_font;
		}
	}
}
</style>
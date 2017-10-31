<template>
	<div class="box">
		<div class="form-box">
			<section class="header">
				<div class="form-title">{{formCfg.formTitle}}
					<span class="form-subtitle">{{formCfg.formSubTitle}}</span>
				</div>
				<div>
					<span class="remove" v-if="formCfg.removeMenu">删除菜单</span>
					<span class="add" v-if="formCfg.addMenu">添加菜单</span>
				</div>			
			</section>
			<section class="panel">
				<div class="inputlist" v-for="item in formCfg.inputList">
					<div class="text-input input-box" v-if="item.type==='setTitle'" :key="item.key">
						<div class="input-title">
							菜单名称
						</div>
						<div>
							<input type="text" name="" maxlength="8" v-model="titleValue">
							<p class="alert"></p>
							<div class="tip">输入字数不超过8个汉字</div>
						</div>
					</div>
					<div class="link-input input-box" v-if="item.type==='setLink'" :key="selectedIndex?selectedIndex:item.key">
						<div class="input-title">
							页面地址
						</div>
						<div>
							<input type="text" name="" maxlength="" v-model="linkValue">
							<p class="alert"></p>
							<div class="tip">
								<div>输入第三方跳转网页</div>
								<div class="pick-btn" v-if="formCfg.pickFromLib" @click="_pickFromLib">从素材库中添加文章</div>
							</div>
						</div>
					</div>
					<div class="icon-input" v-if="item.type==='setIcon'">
						<div class="input-title">
							菜单图标
						</div>
						<div @click="_setIcon">
							上传图标
						</div>
					</div>
					<div class="back-input" v-if="item.type==='setBack'">
						<div class="input-title">
							背景图片
						</div>
						<div>
							<div class="btn" @click="_setBack">上传图片</div>
							<p>背景图建议尺寸672*324</p>
						</div>
						
					</div>
					<div class="title-input input-box" v-if="item.type==='setName'" >
						<div class="input-title">
							标题
						</div>
						<div>
							<input type="text" name="" maxlength="20" v-model="nameValue" :key="selectedIndex?selectedIndex:item.key">
							<p class="alert"></p>
							<div class="tip">输入字数不超过20个汉字</div>
						</div>
					</div>
					<div class="summary-input input-box" v-if="item.type==='setSummary'">
						<div class="input-title">
							摘要
						</div>
						<div>
							<input type="text" name="" maxlength="54" v-model="summaryValue">
							<p class="alert"></p>
							<div class="tip">输入字数不超过54个汉字</div>
						</div>
					</div>
					<div class="multi-pic-uploader" v-if="item.type==='setMultiPicUploader'">
						<ul>
							<li v-if="item.imglist.length>0" v-for="(subItem, index) in item.imglist" @click="selectPic(index)"
								:class="[index===selectedIndex?'active':'']">
								<div class="mask" v-show="index!==selectedIndex"></div>
								<img :src="subItem.img">
								<a role="button" class="del"></a>
							</li>
						</ul>
						<div class="add" v-if="item.imglist.length<6"></div>
					</div>
					<div class="list-pic-uploader" v-if="item.type==='setListPicUploader'">
						<div class="left">缩略图</div>
						<div class="right">
							<ul>
								<li v-if="item.imglist.length>0" v-for="(subItem, index) in item.imglist" :class="[index===selectedIndex?'active':'']">
									<img :src="subItem" :key="index">
									<a role="button" class="del"></a>
								</li>
								<li class="add" v-if="item.imglist.length<3"></li>
							</ul>
							
							<p class="alert">缩略图不可传两张</p>
							<p>缩略图只可以上传一张或者三张，建议尺寸324x240</p>
						</div>
						
					</div>
				</div>
				
			</section>
		</div>
		<div class="submit" @click="_submit">保存并发布</div>
	</div>
	
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {

  name: 'setUpForm',

  data () {
    return {
    	selectedIndex: 0,     //选中的第几个banner图片
    	nameValue: '',				//标题输入框的绑定值
    	linkValue: '',				//页面输入框的绑定值
    	titleValue: '',				//菜单名称输入框的绑定值
    	summaryValue: '',			//摘要输入框的绑定值
    }
  },
  // props:['formTitle', 'removeMenu', 'addMenu'],
  computed: {
  	...mapState([
  			'formCfg'
  		])
  },
  watch: {
  	formCfg: function (val, oldVal) {
  		//监测表单配置的变化 然后把这里的每个值变化 最后保存并发布的时候只需要取这里面的值  改变的值是由3个panel页面传过来的
  		if (val.formFor === 'homebanner') {
  			//配置主页轮播的标题参数
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')[this.selectedIndex]
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')[this.selectedIndex]
  			this.titleValue = ''
  			this.summaryValue = ''
  		}
  		else if (val.formFor === 'introduce') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.titleValue = this._getInputVal(val.inputList, 'type', 'setTitle', 'value')
  			this.summaryValue = this._getInputVal(val.inputList, 'type', 'setSummary', 'value')
  		}
  		else if (val.formFor.substring(0,5) === 'temp_') {
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.titleValue = this._getInputVal(val.inputList, 'type', 'setTitle', 'value')
  			this.summaryValue = ''
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value') || ''
  		}
  		else if (val.formFor === 'contentlist') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.summaryValue = ''
  			this.titleValue = ''
  		}
  		else if (val.formFor === 'userlist') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.summaryValue = ''
  			this.titleValue = ''
  		}
  	},
  	selectedIndex: function(val) {
  		// 为轮播图配置的轮播选中的索引
  		this.nameValue = this._getInputVal(this.formCfg.inputList, 'type', 'setName', 'value')[val]
			this.linkValue = this._getInputVal(this.formCfg.inputList, 'type', 'setLink', 'value')[val]
  	}
  },
  methods: {
  	...mapMutations([
  			'UPDATE_FORMCFG','OPEN_MODAL','SET_MODALCFG'
  		]),
  	selectPic (index) {
  		this.selectedIndex = index
  		// this.UPDATE_FORMCFG()
  	},
  	_getInputVal(arr, type, typeValue, need) {
  		//公用的给input框绑定值得方法
  		for(let i of arr){
  			if (i[type]===typeValue) {
  				return i[need]
  			}
  		}
  	},
  	//上传图片 上传图标
  	_setIcon () {
			this.OPEN_MODAL()
			let that = this
			if(this.formCfg.formFor.substring(0,5) == 'temp_') {
				let modalOption = {
					modalFor: 'plateIcon',				//模态框用来做什么  参考modal.vue
					title: '请选择以下图标',					//模态框的标题
					onSuccess: function(_this){		//选择图标的路径
						alert(_this.plateIconList[_this.selectedIcon])
					}
				}
				this.SET_MODALCFG(modalOption)
			}
			else if (this.formCfg.formFor == 'userlist') {
				let modalOption = {
					modalFor: 'userIcon',				//模态框用来做什么  参考modal.vue
					title: '请选择以下图标',					//模态框的标题
					onSuccess: function(_this){		//选择图标的路径
						alert(_this.userIconList[_this.selectedIcon])
					}
				}
				this.SET_MODALCFG(modalOption)
			}
  	},
		_setBack () {

		},
  	// 从素材库
  	_pickFromLib () {
			this.OPEN_MODAL()
			let that = this
			let modalOption = {
				modalFor: 'pickArticle',				//模态框用来做什么  参考modal.vue
				title: '选择文章',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					that.linkValue = _this.articlePicked
				}
			}
			this.SET_MODALCFG(modalOption)
  	},
  	//保存并发布
  	_submit () {
  		if(this.formCfg.formFor == '') {
  			return
  		}
  		switch(this.formCfg.formFor) {
  			case 'introduce': 
  				//linkValue  nameValue  summaryValue  titleValue
  				// 发送请求完成后保存  拼凑数据
  				
  				break;
  		}
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';
.form-box {
	width: 548px;
	min-height: 554px;
	background: @menuSetBackColor;
	border: 1px solid @borderGrey;
	padding: 0 18px;
}
.header {
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid @borderGrey;
	display: flex;
	justify-content: space-between;
	.remove, .add {
		padding-left: 26px;
		cursor: pointer;
	}
	.remove {
		color: #ff0000;
		margin-right: 20px;
		background: url('/static/img/sprite.png') no-repeat left center;
		background-position: -102px -904px;
	}
	.add {
		background: url('/static/img/sprite.png') no-repeat left center;
		background-position: -102px -932px;
	}
}

.input-box {
	margin-top: 30px;
	display: flex;
	.input-title {
		width: 94px;
		line-height: 30px;
	}
	&>div:last-of-type {
		input {
			width: 380px;
			height: 30px;
			line-height: 30px;
			padding: 0 7px;
			border: 1px solid @borderGrey;
			border-radius: 2px;
			&:focus {
				border-color: @borderActiveGrey;
			}
		}
		&.alert {
			color: #ff0000;
		}
		.tip {
			margin-top: 4px;
			color: #888888;
			display: flex;
			justify-content: space-between;
			.pick-btn {
				color: @lightBlue;
				cursor: pointer;
				border-bottom: 1px solid @lightBlue;
			}
		}
	}
}
.form-subtitle {
	color: #999999;
}
.icon-input{
	margin-top: 30px;
	display: flex;
	.input-title {
		width: 94px;
		line-height: 30px;
	}
	&>div:last-of-type {
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid @borderGrey;
		background: #ffffff;
		cursor: pointer;
		&:hover {
			border-color: @borderActiveGrey;
		}
	}
}
.back-input{
	margin-top: 30px;
	display: flex;
	.input-title {
		width: 94px;
		line-height: 30px;
	}
	.btn {
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid @borderGrey;
		background: #ffffff;
		cursor: pointer;
		&:hover {
			border-color: @borderActiveGrey;
		}
	}
	p {
		width: 300px;
		text-align:left;
		color: #999999;
	}
}
 
.multi-pic-uploader {
	margin-top: 30px;
	display: flex;
	ul {
		display: flex;
	}
	li {
		width: 64px;
		height: 64px;
		margin-right: 16px;
		position: relative;
		background: rgba(0,0,0,0.5);
		cursor: pointer;
		.mask {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
		}
		img {
			width: 100%;
			height: 100%;
		}
		.del {
			display: inline-block;
			width: 20px;
			height: 20px;
			position: absolute;
			right: -10px;
			top: -10px;
			background: url("/static/img/sprite.png") no-repeat;
			background-position: -103px -901px;
			z-index: 10;
		}
	}
	.add {
		width: 64px;
		height: 64px;
		background: url("/static/img/sprite.png") no-repeat;
		background-position: -23px -1000px;
		cursor: pointer;
	}
}
.list-pic-uploader {
	margin-top: 30px;
	display: flex;

	.left {
		width: 94px;
	}
	.right {
		ul {
			display: flex;
		}
		li {
			width: 108px;
			height: 80px;
			margin-right: 16px;
			position: relative;
			background: rgba(0,0,0,0.5);
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
			}
			.del {
				display: inline-block;
				width: 20px;
				height: 20px;
				position: absolute;
				right: -10px;
				top: -10px;
				background: url("/static/img/sprite.png") no-repeat;
				background-position: -103px -901px;
				z-index: 10;
			}
		}
		.add {
			width: 108px;
			height: 80px;
			background: url("/static/img/sprite_02.png") no-repeat;
			background-position: -64px -288px;
			cursor: pointer;
		}
	}
}
.submit {
	width: 120px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	color: #ffffff;
	border-radius: 6px;
	background: @lightBlue;
	margin-top: 20px;
	margin-bottom: 20px;
	cursor: pointer;
	transition: all .3s;
	&:hover {
		background: @hoverBlue;
	}
}
</style>
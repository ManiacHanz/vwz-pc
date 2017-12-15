// 组装模块并创建、导出store


import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'


Vue.use(Vuex)

const state = {
	userInfo: {
		// uid: 'USERjIMHXdT1',   //用户ID
		// token: 'd09eebd0ab5fb9acbfa676789b89a14'								// token
	},
	showLeftIndex: 0,				//左侧的样式和名称配置
	showRightContent: '菜单配置',
	avatarUrl: '',		//头像地址
	logoUrl: '',      //LOGO 地址
	hasNew: false,    //是否更新了
	mobileColorStyle: 'blue',   //手机色彩配置
	mobileActive: '',    //手机激活模块
	menubtnStyle: '',			//面板的菜单按钮的配置 
	mobileCfg: '',   //手机模块配置
	formCfg: {				//首页右边表单配置
		formFor:'',    //配置表单选项的唯一标识，负责配置唯一的数据
		formTitle: '主菜单配置',		//表单标题
		formSubTitle: '',				//表单副标题
		listIndex: '',       //给列表用的索引
		removeMenu: false,		//删除按钮
		addMenu: false,		//添加按钮
		inputList:[				//输入框列表   依次为  banner图片  菜单名称 菜单图标  页面地址 标题  摘要
			// {
			// 	type:'setMultiPicUploader',
			// 	key:'',
			// 	imglist:[],
			// },
			// {
			// 	type:'setListPicUploader',
			// 	key:'',
			// 	imglist:[],
			// },
			// {
			// 	type:'setTitle', key:'', value: '',
			// },
			// {
			// 	type:'setIcon', key:'', value: '',
			// },
			// {
			// 	type:'setLink', key:'', value: '',
			// },
			// {
			// 	type:'setName', key:'', value: '',
			// },
			// {
			// 	type:'setSummary', key:''
			// },

		],		
		pickFromLib: true,
	},
	showPanel: 'home',   //展示手机的某个模块
	isShowModal: false,		//是否展示模态框
	modalCfg: {						//模态框的配置
		modalFor: 'password',				//模态框用来做什么  参考modal.vue
		title: '温馨提示',					//模态框的标题
		onSuccess: function(){},    // 控制确定的作用
	},
	isShowLoading: false,					//是否显示Loading
	loadingText: '',							// loading是否自定义文字
	showNotificationText: '',     //发布信息的文字
	isShowNotification: false,		//是否展示发布成功的提示框
	homePanelList: '',			//默认3个手机页面的数据存储和渲染
	listPanelList: '',
	userPanelList: '',
	temporaryPanelList: '',     //临时手机面板的数据
	editorContent: '',						//富文本的内容
	shouldListUpdate: false,						// 文章管理列表是否需要更新
	showRedDot: false,         //是否显示表示更新的圆点
	isShowGuider: false,				// 是否显示引导层

}

export default new Vuex.Store({
	state,
	mutations,
	action,
})
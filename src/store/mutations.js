// 配置mutations

import Vue from 'vue'

import {
	SET_LOGO,
	SET_AVATAR,
	SAVE_MOBILECFG,
	SET_SHOWPANEL,
	SET_MOBILE_COLOR,
	SET_MOBILE_ACTIVE,
	UPDATE_FORMCFG,
	OPEN_MODAL,
	CLOSE_MODAL,
	SET_MODALCFG,
	OPEN_NOTIFICATION,
	CLOSE_NOTIFICATION,
	SAVE_HOMEPANELLIST,
	SAVE_LISTPANELLIST,
	SAVE_USERPANELLIST,
	SAVE_TEMPORARYLIST,
} from './mutation-types.js'

export default {
	//设置LOGO
	[SET_LOGO] (state, value) {
		state.logoUrl = value
	},
	//设置头像
	[SET_AVATAR] (state, value) {
		state.avatarUrl = value
	},
	// 保存3个面板的数据，用于渲染
	[SAVE_HOMEPANELLIST] (state, obj) {
		state.homePanelList = ''
		state.homePanelList = Object.assign({}, obj)
	},
	[SAVE_LISTPANELLIST] (state, obj) {
		state.listPanelList = ''
		state.listPanelList = Object.assign({}, obj)
	},
	[SAVE_USERPANELLIST] (state, obj) {
		state.userPanelList = ''
		state.userPanelList = Object.assign({}, obj)
	},
	// 保存临时数据，用于模态框确认的方法 发送给哪个接口，发送什么数据
	[SAVE_TEMPORARYLIST] (state, {_interface, obj}) {
		state.temporaryPanelList = ''
		if(_interface === 'home') {
			state.temporaryPanelList = Object.assign({}, state.homePanelList, obj)
			// console.log()
		}
		if(_interface === 'list') {
			state.temporaryPanelList = Object.assign({}, state.listPanelList, obj)
		}
	},
	//保存手机配置信息
	[SAVE_MOBILECFG] (state, mobileCfg) {
		state.mobileCfg = mobileCfg
	},
	//设置手机的menu按钮的切换作用
	[SET_SHOWPANEL] (state, panelName) {
		if (!panelName) {
			return
		}
		state.showPanel = panelName
	},
	// 设置手机主题的切换
	[SET_MOBILE_COLOR] (state, color) {
		state.mobileColorStyle = color
		// console.log(state.mobileColorStyle)
	},
	// 更新手机配置表单的属性
	[UPDATE_FORMCFG] (state, obj) {
		state.formCfg = Object.assign({}, state.formCfg, obj)
	},
	//设置手机激活模块
	[SET_MOBILE_ACTIVE] (state,module) {
		state.mobileActive = module
	},
	// 打开 关闭弹出框
	[OPEN_MODAL] (state) {
		state.isShowModal = true
	},
	[CLOSE_MODAL] (state) {
		state.isShowModal = false
	},
	[SET_MODALCFG] (state, obj) {
		state.modalCfg = Object.assign({}, state.modalCfg, obj)
	},
	//打开 发布成功 这个提示
	[OPEN_NOTIFICATION] (state) {
		state.isShowNotification = true
	},
	//关闭 发布成功 这个提示
	[CLOSE_NOTIFICATION] (state) {
		state.isShowNotification = false
	}
}
<template>
	<div class="box">
		<div class="form-box">
			<section class="header">
				<div class="form-title">{{formCfg.formTitle}}
					<span class="form-subtitle">{{formCfg.formSubTitle}}</span>
				</div>
				<div>
					<span class="remove" v-if="formCfg.removeMenu" @click="_removeDataList">删除菜单</span>
					<span class="add" v-if="formCfg.addMenu" @click="_addDataList">添加菜单</span>
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
							<input type="text" name="" maxlength="" v-model="linkValue" @blur="_linkBlur" @input="linkTypeValue = 0" id="linkInput" placeholder="请输入完整的网页地址  http://www...">
							<p class="alert"></p>
							<div class="tip">
								<div>输入第三方跳转网页</div>
								<div class="pick-btn" v-if="formCfg.pickFromLib" @click="_pickFromLib">从素材库中添加文章</div>
                <div v-if="formCfg.formFor==='menubtn'">不输入保持为默认页面</div>
							</div>
						</div>
					</div>
					<div class="icon-input" v-if="item.type==='setIcon'">
						<div class="input-title">
							菜单图标
						</div>
						<div @click="_setIcon">
							<img :src="imgBaseUrl+iconValue" v-show="iconValue">
							<span class="btn">上传图标</span>
						</div>
					</div>
					<div class="back-input" v-if="item.type==='setBack'">
						<div class="input-title">
							背景图片
						</div>
						<img :src="imgBaseUrl+backValue" v-show="backValue">
						<div>
							<input type="file" hidden="hidden" id="backUploader" @change="_backUploaderChange" accept=".png, .jpg, .jpeg">
							<div>
                <span class="btn" @click="_uploaderTrigger('backUploader')">上传图片</span>
                <span class="btn" @click="_clearBack" style="background-color: #eee;color:#777">清空背景图</span>
              </div>
							<p>背景图建议尺寸672*324</p>
						</div>
						
					</div>
					<div class="title-input input-box" v-if="item.type==='setName'" >
						<div class="input-title">
							标题
						</div>
						<div>
							<input type="text" name="" maxlength="20" v-model="nameValue" :key="selectedIndex?selectedIndex:item.key" @blur="_nameBlur">
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
								<img :src="imgBaseUrl + subItem">
								<a role="button" class="del" @click="_bannerDel(index)"></a>
							</li>
						</ul>
						<div class="add" v-if="item.imglist.length<6" @click="_uploaderTrigger('bannerAddBtn')"></div>
						<input type="file" id="bannerAddBtn" @change="_bannerAdd" hidden="hidden" accept=".png, .jpg, .jpeg">
					</div>
					<div class="list-pic-uploader" v-if="item.type==='setListPicUploader'">
						<div class="left">缩略图</div>
						<div class="right">
							<ul>
								<li v-if="item.imglist.length>0" v-for="(subItem, index) in item.imglist">
									<img :src="imgBaseUrl+subItem" :key="index">
									<a role="button" class="del" @click="_listPicDel(index)"></a>
								</li>
								<li class="add" v-if="item.imglist.length<3" @click="_uploaderTrigger('listPicAdd')"></li>
							</ul>
							<input type="file" id="listPicAdd" @change="_listPicAdd" hidden="hidden" accept=".png, .jpg, .jpeg">
							<p class="alert" style="color: #f00">缩略图不可传两张</p>
							<p style="color: #888">缩略图只可以上传一张或者三张，建议尺寸324x240</p>
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

import {imageBaseUrl} from 'config/env'

import {u_viewPick, u_getDate, jsonStringify} from 'config/mUtils'
import {__sendHomePanel, __sendListPanel, __sendUserPanel, __sendBase64} from 'service/sendData.js'
import {__getArtList} from 'service/getData'

export default {

  name: 'setUpForm',

  data () {
    return {
      imgBaseUrl: imageBaseUrl,     //添加的默认图片地址
    	selectedIndex: 0,     //选中的第几个banner图片
    	nameValue: '',				//标题输入框的绑定值
    	linkValue: '',				//页面输入框的绑定值
    	linkTypeValue: '',		//判断是第三方跳转还是文章跳转，文章选1 第三方选0
    	titleValue: '',				//菜单名称输入框的绑定值
    	summaryValue: '',			//摘要输入框的绑定值
    	iconValue:'',					//图标显示的绑定值
    	backValue: '',				// temp_3 的背景图值
      typeValue: '',        //  给面板菜单按钮专门用的 判断是不是默认按钮
    }
  },
  // props:['formTitle', 'removeMenu', 'addMenu'],
  computed: {
  	...mapState([
  			'formCfg','homePanelList','listPanelList','userPanelList','temporaryPanelList','menubtnStyle','mobileActive','userInfo'
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
  			this.iconValue = ''
  		  this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')[this.selectedIndex]
        this.typeValue = ''
  		}
  		else if (val.formFor === 'introduce') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.titleValue = this._getInputVal(val.inputList, 'type', 'setTitle', 'value')
  			this.summaryValue = this._getInputVal(val.inputList, 'type', 'setSummary', 'value')
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')
  			this.iconValue = ''
        this.typeValue = ''
  		}
  		else if (val.formFor.substring(0,5) === 'temp_') {
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.titleValue = this._getInputVal(val.inputList, 'type', 'setTitle', 'value')
  			this.summaryValue = ''
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value') || ''
  			this.iconValue = this._getInputVal(val.inputList, 'type', 'setIcon', 'value')
  			this.backValue = this._getInputVal(val.inputList, 'type', 'setBack', 'value')
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')
        this.typeValue = ''
  		}
  		else if(val.formFor === 'listbanner') {
  			//配置列表页轮播的标题参数
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')[this.selectedIndex]
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')[this.selectedIndex]
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')[this.selectedIndex]
  			this.titleValue = ''
  			this.summaryValue = ''
  			this.iconValue = ''
        this.typeValue = ''
  		}
  		else if (val.formFor === 'contentlist') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.summaryValue = ''
  			this.titleValue = ''
  			this.iconValue = ''
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')
        this.typeValue = ''
  		}
  		else if (val.formFor === 'userlist') {
  			this.nameValue = this._getInputVal(val.inputList, 'type', 'setName', 'value')
  			this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value')
  			this.summaryValue = ''
  			this.titleValue = ''
  			this.iconValue = this._getInputVal(val.inputList, 'type', 'setIcon', 'value')
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value') || ''
        this.typeValue = ''
  		}
      else if (val.formFor === 'menubtn') {
        this.titleValue = this._getInputVal(val.inputList, 'type', 'setTitle', 'value') || ''
        this.linkValue = this._getInputVal(val.inputList, 'type', 'setLink', 'value') || ''
        this.iconValue = this._getInputVal(val.inputList, 'type', 'setIcon', 'value') || ''
        this.typeValue = this._getInputVal(val.inputList, 'type', 'setType', 'value') || ''
      }
  	},
  	selectedIndex: function(val) {
  		// 为轮播图配置的轮播选中的索引
  		this.nameValue = this._getInputVal(this.formCfg.inputList, 'type', 'setName', 'value')[val]
			this.linkValue = this._getInputVal(this.formCfg.inputList, 'type', 'setLink', 'value')[val]
  	},

  },
  methods: {
  	...mapMutations([
  			'UPDATE_FORMCFG','OPEN_MODAL','SET_MODALCFG','SET_SOMEARR','SAVE_TEMPORARYLIST','SET_MOBILE_ACTIVE','SAVE_USERPANELLIST','SAVE_HOMEPANELLIST','SET_MENUBTN_STYLE','SAVE_LISTPANELLIST','CLEAR_FORMCFG','SET_LOADING','OPEN_NOTIFICATION','CLOSE_MODAL'
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
  	// 按钮触发器input file
  	_uploaderTrigger (id) {
  		let idSelector = "#"+ id
  		document.querySelector(idSelector).click()
  	},
  	//上传图片 上传图标
  	_setIcon () {
  		// this.selectedIndex = 0
			this.OPEN_MODAL()
			let that = this
			if(this.formCfg.formFor.substring(0,5) == 'temp_') {
				let modalOption = {
					modalFor: 'plateIcon',				//模态框用来做什么  参考modal.vue
					title: '请选择以下图标',					//模态框的标题
					onSuccess: function(_this){		//选择图标的路径
						// alert(_this.plateIconList[_this.selectedIcon])
            if(_this.selectedIcon==undefined) {
              alert('请选择图标')
              return
            }
						that.iconValue = _this.plateIconList[_this.selectedIcon].replace(that.imgBaseUrl, '')
            that.CLOSE_MODAL()
					}
				}
				this.SET_MODALCFG(modalOption)
			}
			else if (this.formCfg.formFor == 'userlist') {
				let modalOption = {
					modalFor: 'userIcon',				//模态框用来做什么  参考modal.vue
					title: '请选择以下图标',					//模态框的标题
					onSuccess: function(_this){		//选择图标的路径
						//alert(_this.userIconList[_this.selectedIcon])
						that.iconValue = _this.userIconList[_this.selectedIcon].replace(that.imgBaseUrl, '')
            if(_this.selectedIcon==undefined) {
              alert('请选择图标')
              return
            }
            that.formCfg.inputList[1].value = that.iconValue
            that.CLOSE_MODAL()
					}
				}
				this.SET_MODALCFG(modalOption)
			}
      else if (this.formCfg.formFor == 'menubtn') {
        let modalOption = {
          modalFor: 'menuIcon',       //模态框用来做什么  参考modal.vue
          title: '请选择以下图标',         //模态框的标题
          onSuccess: function(_this){   //选择图标的路径
            // alert(_this.menuIconList[_this.selectedIcon])
            that.iconValue = _this.menuIconList[_this.selectedIcon].replace(that.imgBaseUrl, '')
            if(_this.selectedIcon==undefined) {
              alert('请选择图标')
              return
            }
            that.formCfg.inputList[1].value = that.iconValue
            that.CLOSE_MODAL()
          }
        }
        this.SET_MODALCFG(modalOption)
      }
  	},
		// _setBack () {
		// 	document.querySelector('#backUploader').click()
		// },
		_backUploaderChange (e) {
			const that = this
      u_viewPick(e.target).then( ({base64, type}) => {
        let data = {
          ...that.userInfo,
          datas: base64,
          type: 'd',
          suffix: type,
        }
        __sendBase64(data)
          .then( res => {
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.backValue = res.data
          })
      })
		},
    //清空背景图
    _clearBack () {
      this.backValue = ''
    },
  	// 从素材库
  	_pickFromLib () {
      
			this.OPEN_MODAL()
			let that = this
      // let linkInput = document.querySelector('#linkInput')
			let modalOption = {
				modalFor: 'pickArticle',				//模态框用来做什么  参考modal.vue
				title: '选择文章',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					that.linkValue = _this.articlePicked
          // that._linkBlur()
          that.linkTypeValue = 1
          that.CLOSE_MODAL()
          that.OPEN_NOTIFICATION('添加文章成功')
				}
			}
			this.SET_MODALCFG(modalOption)
  	},
  	//banner更改 
  	_bannerAdd (e) {
  		let that = this
			let newFormCfg = Object.assign({},this.formCfg)
      u_viewPick(e.target).then( ({base64, type}) =>{
        let data = {
          ...that.userInfo,
          datas: base64,
          suffix: type,
          type: 'd',
        }
        that.SET_LOADING()
        __sendBase64(data)
          .then( res => {
            that.SET_LOADING()
            console.log(res)
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            newFormCfg.inputList[0].imglist.push(res.data)    // 这里因为上面标签里已经用了imgbaseurl了
            // newFormCfg.inputList[0].imglist.push(base64)
            newFormCfg.inputList[1].value.push('')
            newFormCfg.inputList[2].value.push('')
            that.UPDATE_FORMCFG(newFormCfg)
            that.selectedIndex = newFormCfg.inputList[0].imglist.length -1
          })
        
      })
  	},
  	_bannerDel (index) {
  		let that = this
  		let newFormCfg = Object.assign({},this.formCfg)
  		let modalOption = { 
  			modalFor: 'remove',
  			title: '温馨提示',
  			onSuccess: function() {
  				newFormCfg.inputList[0].imglist.splice(index, 1)
  				newFormCfg.inputList[1].value.splice(index, 1)
					newFormCfg.inputList[2].value.splice(index, 1)
  				that.UPDATE_FORMCFG(newFormCfg)
  				that.selectedIndex = 0
          that.CLOSE_MODAL()
  			}
  		}
  		this.SET_MODALCFG(modalOption)
  		this.OPEN_MODAL()
  	},

  	//输入框的失焦
  	_nameBlur () {
  		let that = this
  		let newInputList = Object.assign({},this.formCfg.inputList)
  		//banner标题
  		if (this.formCfg.formFor ==='homebanner' || this.formCfg.formFor ==='listbanner') {
  			newInputList[1].value[this.selectedIndex] = this.nameValue
  			this.UPDATE_FORMCFG(newInputList)
  		}
      if (this.formCfg.formFor ==='contentlist') {
        newInputList[0].value = this.nameValue
      }
  	},
  	_linkBlur () {
  		let that = this
  		let newInputList = Object.assign({},this.formCfg.inputList)
  		//banner链接
  		if (this.formCfg.formFor ==='homebanner' || this.formCfg.formFor ==='listbanner') {
  			newInputList[2].value[this.selectedIndex] = this.linkValue
  			this.UPDATE_FORMCFG(newInputList)
  			// console.log(this.formCfg)
  		}
      if (this.formCfg.formFor ==='contentlist') {
        newInputList[2].value = this.linkValue
      }
  	},
    //添加删除数据列表
    _addDataList () {
      if (this.formCfg.formFor ==='contentlist') {
        let nowTime = u_getDate()
        this.listPanelList.content.unshift({
                  title: '',
                  imglist: [],
                  time: nowTime,
                  link: '',
                  linkType: 0,
                })
        this.SET_MOBILE_ACTIVE('contentlist0')
        let newInputList = [
          {key:'contentlist0',type:'setName',value:''},
          {imglist:[],key:'contentlist0',type:'setListPicUploader'},
          {key:'contentlist0',type: 'setLink', value: ''},
          {key:'contentlist0',type: 'setLinkType', value: ''}
        ]
        this.UPDATE_FORMCFG({inputList:newInputList, listIndex: "0"})
      }
      else if (this.formCfg.formFor ==='userlist') {
        this.userPanelList.content.unshift({
          title: '',
          icon: '',
          link: '',
        })
        this.SET_MOBILE_ACTIVE('userlist0')
        let newInputList = [
          {key:'userlist0',type:'setName',value:''},
          {key:'userlist0',type: 'setIcon', value: ''},
          {key:'userlist0',type: 'setLink', value: ''},
          {key:'userlist0',type: 'setLinkType', value: ''}
        ]
        this.UPDATE_FORMCFG({inputList:newInputList})
      }
    },
    _removeDataList() {
      if (this.formCfg.formFor ==='contentlist'){
        if(this.listPanelList.content.length> 1) {
          const index = this.formCfg.inputList[0].key.substring(11)
          // console.log(index)
          let that = this
          let modalOption = { 
            modalFor: 'delList',
            title: '温馨提示',
            onSuccess: function() {
              /*
                要有个临时数据，当上传成功以后再用临时数据去覆盖掉源数据
               */
              that.SET_LOADING()
              let oContent = [...that.listPanelList.content]
              oContent.splice(index, 1)
              let payload = {
                _interface: 'list',
                obj: {
                  ...that.userInfo,
                  content: oContent,
                }
              }
              that.SAVE_TEMPORARYLIST(payload)
              // console.log(that.temporaryPanelList)
              __sendListPanel(jsonStringify(that.temporaryPanelList)).then( res =>{
                console.log(res)
                that.SET_LOADING()
                if(!res){
                  alert('网络错误，请检查网络或稍后再试')
                  return false
                }
                if(!res.result) {
                  alert(res.message)
                  return false
                }
                that.OPEN_NOTIFICATION('删除成功')
                that.CLEAR_FORMCFG()        //清除右边表单配置
                that.SET_MOBILE_ACTIVE('')  //清除左边手机面板配置
                that.CLOSE_MODAL()
                that.SAVE_LISTPANELLIST(that.temporaryPanelList)     //在把临时数据存到  展示的数据里
              })
              
            }
          }
          this.SET_MODALCFG(modalOption)
          this.OPEN_MODAL()
        }
        else {
          alert('请至少保持一条列表')
        }
      }
      else if(this.formCfg.formFor ==='userlist'){
        if(this.userPanelList.content.length> 1) {
          const index = this.formCfg.inputList[0].key.substring(11)
          let that = this
          let modalOption = { 
            modalFor: 'delList',
            title: '温馨提示',
            onSuccess: function() {
              that.SET_LOADING()

              let oContent = [...that.userPanelList.content]
              oContent.splice(index, 1)
              let payload = {
                _interface: 'user',
                obj: {
                  ...that.userInfo,
                  content: oContent,
                }
              }
              that.SAVE_TEMPORARYLIST(payload)
              __sendUserPanel(jsonStringify(that.temporaryPanelList)).then( res =>{
                console.log(res)
                that.SET_LOADING()
                if(!res){
                  alert('网络错误，请检查网络或稍后再试')
                  return false
                }
                if(!res.result) {
                  alert(res.message)
                  return false
                }
                that.OPEN_NOTIFICATION('删除成功')
                that.SAVE_USERPANELLIST(that.temporaryPanelList)     //在把临时数据存到  展示的数据里
                that.CLEAR_FORMCFG()        //清除右边表单配置
                that.SET_MOBILE_ACTIVE('')  //清除左边手机面板配置
                that.CLOSE_MODAL()
              })
            }
          }
          this.SET_MODALCFG(modalOption)
          this.OPEN_MODAL()
        }
        else {
          alert('请至少保持一条列表')
        }
      }
      else if(this.formCfg.formFor ==='menubtn') {
        /*
          删除按钮有几种情况
            1、五条数据都有 删除其中一个，就把当前的数据清空
            2、五条数据有4条数据有，有一个空的
              a.点击到空的 提示不能删这个
              b.点击到另个有的，直接删除这个 把type改成2
            3、五条数据中有3条有数据，有2个都是空的
              此时点击也要他能删除
         */
        let index = this.mobileActive.substring(7)
        let that = this
        if (this.homePanelList.button.length === 5) {
          let situation = 0
          for(let i in this.homePanelList.button) {
            if(this.homePanelList.button[i].title == ''){
              situation++
            }
          }
          // console.log('situation:',situation)
          if(situation == 0){
            //五条都有数据
            // 这里还要判断是不是再次点击的空的
             
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                that.SET_LOADING()
                const emptyBtn = {
                  title: '',
                  icon: '',
                  link: '',
                  type: '',
                }
                let oButton = [...that.homePanelList.button]
                oButton.splice(index, 1, emptyBtn)
                let oHomePanelList = Object.assign({},that.homePanelList,{ button: oButton})
                let data = {
                  ...that.userInfo,
                  ...oHomePanelList,
                }
                __sendHomePanel (jsonStringify(data)).then( res =>{
                  that.SET_LOADING()
                  if(!res){
                    alert('网络错误，请检查网络或稍后再试')
                    return false
                  }
                  if(!res.result) {
                    alert(res.message)
                    return false
                  }
                  that.OPEN_NOTIFICATION('删除成功')
                  that.SAVE_HOMEPANELLIST(oHomePanelList)   //在把临时数据存到  展示的数据里
                  that.CLEAR_FORMCFG()        //清除右边表单配置
                  that.SET_MOBILE_ACTIVE('')  //清除左边手机面板配置
                  that.CLOSE_MODAL()
                })
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
          }
          else if(situation == 1 || situation == 2) {
            //有一个空位
            if(this.homePanelList.button[index].title=='') {
              alert('空内容不能删除')
              return false
            }
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                that.SET_LOADING()
                const emptyBtn = {
                  title: '',
                  icon: '',
                  link: '',
                  type: '',
                }
                let oButton = [...that.homePanelList.button]
                oButton.splice(1, 2, emptyBtn)
                let oHomePanelList = Object.assign({},that.homePanelList,{ button: oButton})
                let data = {
                  ...that.userInfo,
                  ...oHomePanelList,
                }
                __sendHomePanel (jsonStringify(data)).then( res =>{
                  that.SET_LOADING()
                  if(!res){
                    alert('网络错误，请检查网络或稍后再试')
                    return false
                  }
                  if(!res.result) {
                    alert(res.message)
                    return false
                  }
                  that.OPEN_NOTIFICATION('删除成功')
                  that.SAVE_HOMEPANELLIST(oHomePanelList)   //在把临时数据存到  展示的数据里
                  that.SET_MENUBTN_STYLE()
                  that.CLEAR_FORMCFG()        //清除右边表单配置
                  that.SET_MOBILE_ACTIVE('')  //清除左边手机面板配置
                  that.CLOSE_MODAL()
                })
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
          }
          // else if(situation == 2) {
          //   const emptyBtn = {
          //     title: '',
          //     icon: '',
          //     link: '',
          //     type: '',
          //   }
          //   let oButton = [...this.homePanelList.button]
          //   oButton.splice(1, 2, emptyBtn)
          //   let oHomePanelList = Object.assign({},this.homePanelList,{ button: oButton})
          //   let data = {
          //     ...this.userInfo,
          //     ...oHomePanelList,
          //   }
          //   that.CLEAR_FORMCFG()        //清除右边表单配置
          //   that.SET_MOBILE_ACTIVE('')  //清除左边手机面板配置
          //   this.SAVE_HOMEPANELLIST(oHomePanelList)
          //   this.SET_MENUBTN_STYLE()
          // }
        }
        /**
        if (this.homePanelList.button.length === 5) {
          if(this.homePanelList.button[1].title == '' && this.homePanelList.button[2].title == '') {
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                  that.homePanelList.button.splice(index, 1)
                  that.SET_MENUBTN_STYLE()
                  that.CLEAR_FORMCFG()
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
          }
          else{
            const emptyBtn = {
              title: '',
              icon: '',
              link: '',
              type: '',
            }
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                  that.homePanelList.button.splice(index, 1,emptyBtn)
                  that.SET_MENUBTN_STYLE()
                  that.CLEAR_FORMCFG()
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
          }
        }
        else if(this.homePanelList.button.length === 4) {
          const emptyBtn = {
              title: '',
              icon: '',
              link: '',
              type: '',
            }
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                  that.homePanelList.button.splice(index, 1,emptyBtn)
                  that.SET_MENUBTN_STYLE()
                  that.CLEAR_FORMCFG()
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
        }
        */
      }
      
    },
  	// list列表的缩略图修改
  	_listPicAdd (e) {
  		let that = this
			let newFormCfg = Object.assign({},this.formCfg)
      // console.log(newFormCfg==this.formCfg)
      u_viewPick(e.target).then( ({base64, type}) => {
        let data = {
          ...that.userInfo,
          datas: base64,
          suffix: type,
          type: 'd',
        }
        // that.SET_LOADING()
        __sendBase64(data)
          .then( res => {
            // that.SET_LOADING()
            console.log(res)
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            newFormCfg.inputList[1].imglist.push(res.data)    // 这里因为上面标签里已经用了imgbaseurl了
            // newFormCfg.inputList[1].imglist.push(base64)
          })
        that.UPDATE_FORMCFG(newFormCfg)
        that.selectedIndex = newFormCfg.inputList[0].imglist.length -1
      })
  	},
  	_listPicDel (index) {
  		let that = this
  		let newFormCfg = Object.assign({},this.formCfg)
  		let modalOption = {
  			modalFor: 'delPic',
  			title: '温馨提示',
  			onSuccess: function() {
  				newFormCfg.inputList[1].imglist.splice(index, 1)
  				that.UPDATE_FORMCFG(newFormCfg)
          that.CLOSE_MODAL()
  			}
  		}
  		this.SET_MODALCFG(modalOption)
  		this.OPEN_MODAL()
  	},
  	//保存并发布
  	_submit () {
			// 保存并发布就是转化成需要发送的数据 ，给模态框确认的时候只需要通过这个来判断发送给哪个接口 就行了
      let that = this
  		if( !this.formCfg || this.formCfg.formFor == '') {
        alert('请选择修改板块')
  			return false
  		}
  		switch(this.formCfg.formFor) {
  			//首屏banner
  			case 'homebanner': 
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[0].imglist.length) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return false
          }
          for (let i in this.formCfg.inputList[0].imglist) {
            if(this.formCfg.inputList[0].imglist[i] == '') {
              alert('轮播图片不能为空，否则不会在手机页面上展示')
              break
            }
          }
          for (let i in this.formCfg.inputList[1].value) {
            if(this.formCfg.inputList[1].value[i] == '') {
              alert('轮播图片的标题不能为空，否则不会在手机页面上展示')
              return false
              break
            }
          }
          for (let i in this.formCfg.inputList[2].value) {
            if(this.formCfg.inputList[2].value[i] == '') {
              alert('轮播图片的页面地址不能为空，否则不会在手机页面上展示')
              return false
              break
            }
          }
          // alert(123)
          this.SET_LOADING()
  				//linkValue  nameValue  summaryValue  titleValue
  				let banner = new Array
  				let temporaryObj = {
  					title: '',
  					img: '',
  					link: '',
            linkType: '',
  				}
  				let inputlist = this.formCfg.inputList
  				for(let i = 0; i < inputlist[0].imglist.length; i++) {
  					banner.push(Object.assign({},temporaryObj, {
  						title: inputlist[1].value[i],
  						img:inputlist[0].imglist[i],
  						link:inputlist[2].value[i],
              linkType: inputlist[3].value[i],
  					}))
  				}
  				let payload = {
  					_interface: 'home',
  					obj:{
              ...this.userInfo,
  						banner
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
          __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个主页面板的数据')
          this.SAVE_HOMEPANELLIST(this.temporaryPanelList)  
  				break;
  			case 'introduce':
  			//首屏intro
          if(!this.nameValue || !this.titleValue || !this.linkValue || !this.summaryValue) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          this.SET_LOADING()
  				let intro = {
  					title: this.nameValue,
  					tempName: this.titleValue,
  					content: this.summaryValue,
  					link: this.linkValue,
  				}
  				payload = {
  					_interface: 'home',
  					obj: {
              ...this.userInfo,
  						intro
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)      // 这个临时数据是state里面的 只能用mutation里面去改变
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
          // let newdaaaa = jsonStringify(this.temporaryPanelList)
          // console.log(newdaaaa)
          __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          })
          // console.log(this.temporaryPanelList)
          // alert('提交给后台  整个主页面板的数据')
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)    //
  				break;
  			//首屏内容4个板块
  			case 'temp_0':
          if(!this.titleValue || !this.linkValue || !this.iconValue) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          this.SET_LOADING()

  				let tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				let content = [...this.homePanelList.content]
  				// console.log(content)
  				content.splice(0, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
              ...this.userInfo,
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
          __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个主页面板的数据')
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)  
  				break;
  			case 'temp_1':
          if(!this.titleValue || !this.linkValue || !this.iconValue) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          this.SET_LOADING()

  				tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				content = [...this.homePanelList.content]
  				// console.log(content)
  				content.splice(1, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
              ...this.userInfo,
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
           __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个主页面板的数据')
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)    
  				break;
  			case 'temp_2':
          if(!this.titleValue || !this.linkValue || !this.iconValue) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          this.SET_LOADING()

  				tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				content = [...this.homePanelList.content]
  				// console.log(content)
  				content.splice(2, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
              ...this.userInfo,
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
          __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个主页面板的数据')
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)  
  				break;
  			case 'temp_3':
          if(!this.titleValue || !this.linkValue || !this.titleValue) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          this.SET_LOADING()

  				tempObj = {
  					describe: this.nameValue,
            back: this.backValue,
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				content = [...this.homePanelList.content]
  				console.log(content)
  				content.splice(3, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
              ...this.userInfo,
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
          __sendHomePanel (jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_HOMEPANELLIST(that.temporaryPanelList)   //在把临时数据存到  展示的数据里
          }) 
          // alert('提交给后台  整个主页面板的数据')
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)  
  				break;
  			//list页banner
  			case 'listbanner': 
  				//linkValue  nameValue  summaryValue  titleValue
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[0].imglist.length) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          } 
          for (let i in this.formCfg.inputList[0].imglist) {
            if(this.formCfg.inputList[0].imglist[i] == '') {
              alert('轮播图片不能为空，否则不会在手机页面上展示')
              break
            }
          }
          for (let i in this.formCfg.inputList[1].value) {
            if(this.formCfg.inputList[1].value[i] == '') {
              alert('轮播图片的标题不能为空，否则不会在手机页面上展示')
              return false
              break
            }
          }
          for (let i in this.formCfg.inputList[2].value) {
            if(this.formCfg.inputList[2].value[i] == '') {
              alert('轮播图片的页面地址不能为空，否则不会在手机页面上展示')
              return false
              break
            }
          }
          that.SET_LOADING()
  				banner = new Array
  				temporaryObj = {
  					title: '',
  					img: '',
  					link: '',
  				}
  				inputlist = this.formCfg.inputList
  				for(let i = 0; i < inputlist[0].imglist.length; i++) {
  					banner.push(Object.assign({},temporaryObj, {
  						title: inputlist[1].value[i],
  						img:inputlist[0].imglist[i],
  						link:inputlist[2].value[i],
              linkType: inputlist[3].value[i],
  					}))
  				}
  				payload = {
  					_interface: 'list',
  					obj:{
              ...this.userInfo,
  						banner
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 listpanellist的数据和自己的数据
          __sendListPanel(jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            this.SAVE_LISTPANELLIST(this.temporaryPanelList)     //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个列表面板的数据')
          // this.SAVE_LISTPANELLIST(this.temporaryPanelList)  
  				break;
  			case 'contentlist':
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[1].imglist.length) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          that.SET_LOADING()
          content = [...this.listPanelList.content]
          let index = this.formCfg.listIndex
          temporaryObj = {
            title: this.nameValue,
            imglist: this.formCfg.inputList[1].imglist,
            time: u_getDate(),
            link: this.linkValue,
            linkType: this.linkTypeValue,
          }
          content.splice(index, 1, temporaryObj)
          // console.log(content)
          payload = {
            _interface: 'list',
            obj:{
              ...this.userInfo,
              content
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          __sendListPanel(jsonStringify(that.temporaryPanelList)).then( res =>{
            that.SET_LOADING()
            if(!res){
              alert('网络错误，请检查网络或稍后再试')
              return false
            }
            if(!res.result) {
              alert(res.message)
              return false
            }
            that.OPEN_NOTIFICATION()
            that.SAVE_LISTPANELLIST(that.temporaryPanelList)     //在把临时数据存到  展示的数据里
          })
          // alert('提交给后台  整个列表面板的数据')
          // this.SAVE_LISTPANELLIST(this.temporaryPanelList)
          break;
        case 'userlist':
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[1].value) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          that.SET_LOADING()
          content = [...this.userPanelList.content]
          index = this.formCfg.inputList[0].key.substring(8)
          temporaryObj = {
            icon:this.iconValue,
            link: this.linkValue,
            title: this.nameValue,
            linkType: this.linkTypeValue,
          }
          content.splice(index, 1, temporaryObj)
          payload = {
            _interface: 'user',
            obj:{
              ...this.userInfo,
              content
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          console.log(jsonStringify(that.temporaryPanelList))
          __sendUserPanel(jsonStringify(that.temporaryPanelList))
            .then( res => {
              that.SET_LOADING()
              if(!res){
                alert('网络错误，请检查网络或稍后再试')
                return false
              }
              if(!res.result) {
                alert(res.message)
                return false
              }
              that.OPEN_NOTIFICATION()
              that.SAVE_USERPANELLIST(that.temporaryPanelList) 
            })
          // alert('提交给后台  整个用户面板的数据')

          this.SAVE_USERPANELLIST(this.temporaryPanelList)
          break;
        case 'menubtn':
          if(!this.titleValue) {
            alert('按钮名称不能为空,否则不会在手机页面上展示')
            return
          }
          if(!this.typeValue) {
            if (!this.iconValue || !this.linkValue) {
              alert('新增按钮图标或链接地址不能为空')
              return
            }
          }
          that.SET_LOADING()
          let button = [...this.homePanelList.button]
          index = this.formCfg.inputList[0].key.substring(7)
          temporaryObj = {
            icon:this.iconValue,
            link: this.linkValue,
            title: this.titleValue,
            type: this.typeValue,
          }
          button.splice(index, 1, temporaryObj)
          // {button:button}
          
          payload = {
            _interface: 'home',
            obj:{
              ...this.userInfo,
              button:button
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          // alert('提交给后台  整个用户面板的数据')
          __sendHomePanel(jsonStringify(that.temporaryPanelList))
            .then( res => {
              that.SET_LOADING()
              if(!res){
                alert('网络错误，请检查网络或稍后再试')
                return false
              }
              if(!res.result) {
                alert(res.message)
                return false
              }
              that.OPEN_NOTIFICATION()
              that.SAVE_HOMEPANELLIST(that.temporaryPanelList)     //在把临时数据存到  展示的数据里
              that.SET_MENUBTN_STYLE()
            })
          // this.SAVE_HOMEPANELLIST(this.temporaryPanelList)
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
	img {
		width: 28px;
		height: 28px;
		vertical-align: middle;
		background: #dedede;
		padding: 2px;
		margin-right: 6px;
	}
	.btn {
		display: inline-block;
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
	img {
		display: block;
		width: 75px;
		height: 50px;
		vertical-align: middle;
		margin-right: 10px;
	}
	.btn {
    display: inline-block;
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid @borderGrey;
		background: #ffffff;
		cursor: pointer;
    margin-right: 8px;
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
			background: url("/static/img/del.png") no-repeat;
      background-size: 20px;
			// background-position: -103px -901px;
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
				background: url("/static/img/del.png") no-repeat;
        background-size: 20px;
				// background-position: -103px -901px;
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
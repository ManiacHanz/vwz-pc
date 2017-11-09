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
							<img :src="iconValue" v-show="iconValue">
							<span class="btn">上传图标</span>
						</div>
					</div>
					<div class="back-input" v-if="item.type==='setBack'">
						<div class="input-title">
							背景图片
						</div>
						<img :src="backValue" v-show="backValue">
						<div>
							<input type="file" hidden="hidden" id="backUploader" @change="_backUploaderChange">
							<div class="btn" @click="_uploaderTrigger('backUploader')">上传图片</div>
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
								<img :src="subItem">
								<a role="button" class="del" @click="_bannerDel(index)"></a>
							</li>
						</ul>
						<div class="add" v-if="item.imglist.length<6" @click="_uploaderTrigger('bannerAddBtn')"></div>
						<input type="file" id="bannerAddBtn" @change="_bannerAdd" hidden="hidden">
					</div>
					<div class="list-pic-uploader" v-if="item.type==='setListPicUploader'">
						<div class="left">缩略图</div>
						<div class="right">
							<ul>
								<li v-if="item.imglist.length>0" v-for="(subItem, index) in item.imglist">
									<img :src="subItem" :key="index">
									<a role="button" class="del" @click="_listPicDel(index)"></a>
								</li>
								<li class="add" v-if="item.imglist.length<3" @click="_uploaderTrigger('listPicAdd')"></li>
							</ul>
							<input type="file" id="listPicAdd" @change="_listPicAdd" hidden="hidden">
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
import {u_viewPick, u_getDate} from 'config/mUtils'
export default {

  name: 'setUpForm',

  data () {
    return {
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
  			'formCfg','homePanelList','listPanelList','userPanelList','temporaryPanelList','menubtnStyle','mobileActive'
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
        this.linkTypeValue = this._getInputVal(val.inputList, 'type', 'setLinkType', 'value')
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
  			'UPDATE_FORMCFG','OPEN_MODAL','SET_MODALCFG','SET_SOMEARR','SAVE_TEMPORARYLIST','SET_MOBILE_ACTIVE','SAVE_USERPANELLIST','SAVE_HOMEPANELLIST','SET_MENUBTN_STYLE'
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
						alert(_this.plateIconList[_this.selectedIcon])
            if(!_this.selectedIcon) {
              alert('请选择图标')
              return
            }
						that.iconValue = _this.plateIconList[_this.selectedIcon]
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
						that.iconValue = _this.userIconList[_this.selectedIcon]
            if(!_this.selectedIcon) {
              alert('请选择图标')
              return
            }
            that.formCfg.inputList[1].value = that.iconValue
					}
				}
				this.SET_MODALCFG(modalOption)
			}
      else if (this.formCfg.formFor == 'menubtn') {
        let modalOption = {
          modalFor: 'menuIcon',       //模态框用来做什么  参考modal.vue
          title: '请选择以下图标',         //模态框的标题
          onSuccess: function(_this){   //选择图标的路径
            alert(_this.menuIconList[_this.selectedIcon])
            that.iconValue = _this.menuIconList[_this.selectedIcon]
            if(!_this.selectedIcon) {
              alert('请选择图标')
              return
            }
            that.formCfg.inputList[1].value = that.iconValue
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
      u_viewPick(e.target).then( rst => {
        // if(rst.base64) {
        //   that.backValue = rst.base64
        // }
        // else {
          that.backValue = rst
        // }
      })
		},
  	// 从素材库
  	_pickFromLib () {
			this.OPEN_MODAL()
			let that = this
      let linkInput = document.querySelector('#linkInput')
			let modalOption = {
				modalFor: 'pickArticle',				//模态框用来做什么  参考modal.vue
				title: '选择文章',					//模态框的标题
				onSuccess: function(_this){		//点击确认的逻辑
					that.linkValue = _this.articlePicked
          // that._linkBlur()
          that.linkTypeValue = 1
				}
			}
			this.SET_MODALCFG(modalOption)
  	},
  	//banner更改 
  	// _addClick () {
  	// 	document.querySelector('#bannerAddBtn').click()
  	// },
  	_bannerAdd (e) {
  		let that = this
			let newFormCfg = Object.assign({},this.formCfg)
      u_viewPick(e.target).then( rst =>{
        // if(rst.base64) {
        //   newFormCfg.inputList[0].imglist.push(rst.base64)
        //   newFormCfg.inputList[1].value.push('')
        //   newFormCfg.inputList[2].value.push('')
        // }
        // else {
          newFormCfg.inputList[0].imglist.push(rst)
          newFormCfg.inputList[1].value.push('')
          newFormCfg.inputList[2].value.push('')
        // }
        that.UPDATE_FORMCFG(newFormCfg)
        that.selectedIndex = newFormCfg.inputList[0].imglist.length -1
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
        this.UPDATE_FORMCFG({inputList:newInputList})
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
          {key:'userlist0',type: 'setLink', value: ''}
        ]
        this.UPDATE_FORMCFG({inputList:newInputList})
      }
    },
    _removeDataList() {
      if (this.formCfg.formFor ==='contentlist'){
        if(this.listPanelList.content.length> 1) {
          const index = this.formCfg.inputList[0].key.substring(11)
          let that = this
          let modalOption = { 
            modalFor: 'delList',
            title: '温馨提示',
            onSuccess: function() {
                that.listPanelList.content.splice(index, 1)
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
        let index = this.mobileActive.substring(7)
        let that = this
        if (this.homePanelList.button.length === 5) {
          if(this.homePanelList.button[1].title == '' && this.homePanelList.button[2].title == '') {
            let modalOption = { 
              modalFor: 'delBtn',
              title: '温馨提示',
              onSuccess: function() {
                  that.homePanelList.button.splice(index, 1)
                  that.SET_MENUBTN_STYLE()
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
              }
            }
            this.SET_MODALCFG(modalOption)
            this.OPEN_MODAL()
        }
      }
      
    },
  	// list列表的缩略图修改
  	_listPicAdd (e) {
  		let that = this
			let newFormCfg = Object.assign({},this.formCfg)
      // console.log(newFormCfg==this.formCfg)
      u_viewPick(e.target).then( rst => {
        // if(rst.base64) {
        //   newFormCfg.inputList[1].imglist.push(rst.base64)
        // }
        // else {
          newFormCfg.inputList[1].imglist.push(rst)
        // }
        that.UPDATE_FORMCFG(newFormCfg)
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
  			}
  		}
  		this.SET_MODALCFG(modalOption)
  		this.OPEN_MODAL()
  	},
  	//保存并发布
  	_submit () {
			// 保存并发布就是转化成需要发送的数据 ，给模态框确认的时候只需要通过这个来判断发送给哪个接口 就行了

  		if(this.formCfg.formFor == '') {
  			return
  		}
  		switch(this.formCfg.formFor) {
  			//首屏banner
  			case 'homebanner': 
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
  						banner
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			case 'introduce':
  			//首屏intro
  				let intro = {
  					title: this.titleValue,
  					tempName: this.nameValue,
  					content: this.summaryValue,
  					link: this.linkValue,
  				}
  				payload = {
  					_interface: 'home',
  					obj: {
  						intro
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			//首屏内容4个板块
  			case 'temp_0':
  				let tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				let content = [...this.homePanelList.content]
  				console.log(content)
  				content.splice(0, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			case 'temp_1':
  				tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				content = [...this.homePanelList.content]
  				console.log(content)
  				content.splice(1, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			case 'temp_2':
  				tempObj = {
  					describe:'',
            back:'',
            icon: this.iconValue,
            tempName: this.titleValue,
            link: this.linkValue
  				}
  				content = [...this.homePanelList.content]
  				console.log(content)
  				content.splice(2, 1, tempObj)
  				payload = {
  					_interface: 'home',
  					obj: {
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			case 'temp_3':
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
  						content
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 homepanellist的数据和自己的数据
  				break;
  			//list页banner
  			case 'listbanner': 
  				//linkValue  nameValue  summaryValue  titleValue
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
  						banner
  					}
  				}
  				this.SAVE_TEMPORARYLIST(payload)
  				//这里就是弹出框 然后 发数据 然后用temporarylist的数据去覆盖掉 listpanellist的数据和自己的数据
  				break;
  			case 'contentlist':
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[1].imglist.length) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          content = [...this.listPanelList.content]
          let index = ''
          payload = {
            _interface: 'list',
            obj:{
              content
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          break;
        case 'userlist':
          if(!this.nameValue || !this.linkValue || !this.formCfg.inputList[1].value) {
            alert('表单配置项不能为空,否则不会在手机页面上展示')
            return
          }
          content = [...this.userPanelList.content]
          index = this.formCfg.inputList[0].key.substring(8)
          temporaryObj = {
            icon:this.iconValue,
            link: this.linkValue,
            title: this.nameValue,
          }
          content.splice(index, 1, temporaryObj)
          payload = {
            _interface: 'list',
            obj:{
              banner: this.userPanelList.banner,
              content
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          alert('提交给后台  整个用户面板的数据')

          this.SAVE_USERPANELLIST(this.temporaryPanelList)
          break;
        case 'menubtn':
          if(!this.titleValue) {
            alert('按钮名称不能为空,否则不会在手机页面上展示')
            return
          }
          if(!this.typeValue) {
            if (!this.iconValue) {
              alert('新增按钮图标不能为空')
              return
            }
          }
          let button = [...this.homePanelList.button]
          index = this.formCfg.inputList[0].key.substring(7)
          temporaryObj = {
            icon:this.iconValue,
            link: this.linkValue,
            title: this.titleValue,
            type:'',
          }
          button.splice(index, 1, temporaryObj)
          // {button:button}
          
          payload = {
            _interface: 'home',
            obj:{
              button:button
            }
          }
          this.SAVE_TEMPORARYLIST(payload)
          alert('提交给后台  整个用户面板的数据')

          this.SAVE_HOMEPANELLIST(this.temporaryPanelList)
          this.SET_MENUBTN_STYLE()
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
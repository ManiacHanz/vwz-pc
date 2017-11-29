<template>
  <div>
    <div class="edit-box">
      <div class="top-nav">
        <div class="back" @click="historyBack()"></div>
        <ul class="nav">
          <li @click="_toMaterManage">文章管理</li>
          &nbsp;  >
          <li>文章编辑</li>
        </ul>
      </div>
      <div class="body">
        <div class="left">
          <p>文章封面图</p>
          <div class="pic-btn" :class="{active: activeName === 'picBtn' || hoverName === 'picBtn' }" 
          @click.left="switchActive('picBtn')" @mouseenter="switchHover('picBtn')" @mouseleave="switchHover('')" @blur="_clearActive()">
            <div class="backimg" @click="_uploaderTrigger('coverUploader')">
              <img :src="imgBaseUrl+coverSrc" v-show="coverSrc" style="width:100%;height:100%;background: #fff;">
            </div>
            <input type="file" id="coverUploader" @change="_coverChange" hidden="hidden">
            <p>图片建议尺寸260X160</p>
          </div>
        </div>
        <div class="mid">
          <form>
            <div class="title">
              <input type="text" name="title" placeholder="这里输入标题，不超过20个汉字或40个英文" maxlength="20" 
              :class="{active: activeName === 'titleInput' || hoverName === 'titleInput' }" 
              @click.left="switchActive('titleInput')" v-model="titleValue" @blur="_clearActive()">
            </div>
            <div class="author">
              <input type="text" name="author" placeholder="这里输入作者，不超过8个汉字或16个英文" maxlength="8" 
              :class="{active: activeName === 'authorInput' || hoverName === 'authorInput' }" 
              @click.left="switchActive('authorInput')" v-model="authorValue" @blur="_clearActive()">
            </div>
            <div class="decribe">
              <input type="text" name="decribe" placeholder="这里输入描述，不超过40汉字或80个英文" maxlength="40" 
              :class="{active: activeName === 'decribeInput' || hoverName === 'decribeInput' }" 
              @click.left="switchActive('decribeInput')" v-model="describeValue" @blur="_clearActive()">
            </div>
            <div class="ueditor">
              <!-- //:ueditorConfig="{serverUrl:'http://localhost:8080/lulang/testffs/controller'}" -->
               <VueUEditor style="margin-bottom:30px;" :content="content"></VueUEditor>
            </div>
            <div class="copy">
              <p>网页版权信息</p>
              <input type="text" name="copy" placeholder="这里输入网站版权信息，不超过40字" maxlength="40" 
              :class="{active: activeName === 'copyInput' || hoverName === 'copyInput' }" 
              @click.left="switchActive('copyInput')" v-model="copyValue" @blur="_clearActive()">
            </div>
          </form>

        </div>
        <!-- <div class="right">
          <p>多媒体素材</p>
          <ul>
            <li :class="{active: liActiveName === 'addPic' || liHoverName === 'addPic'}"
             @click.left="switchLiActive('addPic')" @mouseenter="switchLiHover('addPic')" @mouseleave="switchLiHover('')">
              <div class="icon"></div>
              图片
            </li>
            <li :class="{active: liActiveName === 'addAudio' || liHoverName === 'addAudio'}"
            @click.left="switchLiActive('addAudio')" @mouseenter="switchLiHover('addAudio')" @mouseleave="switchLiHover('')">
              <div class="icon"></div>
              音频
            </li>
            <li :class="{active: liActiveName === 'addVideo' || liHoverName === 'addVideo'}"
            @click.left="switchLiActive('addVideo')" @mouseenter="switchLiHover('addVideo')" @mouseleave="switchLiHover('')">
              <div class="icon"></div>
              视频
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    <div class="footer">
      <div class="inner">
        <a role="button" @click="_submit">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

import {imageBaseUrl} from 'config/env'
import {u_viewPick, getInputLen} from 'config/mUtils'
import {__getArticalDetail} from 'service/getData'
import {__sendBase64, __editArticle} from 'service/sendData'

import VueUEditor from '../../components/editor/VueUEditor' //富文本


export default {
  data() {
    return {
      imgBaseUrl: imageBaseUrl,
      activeArr: ['picBtn'], //会改变样式的数组
      activeName: '',    //表单当前激活的样式的名称
      hoverName: '',   //表单鼠标悬停时的样式名称
      liActiveName: '',
      liHoverName: '',
      params:'',        // 通过get参数获取文章的id
      coverSrc: '',       //封面图
      titleValue: '',    //标题输入框的值
      authorValue: '',    //作者输入框的值
      describeValue: '',    //描述输入框的值
      copyValue: '',    //版权输入框的值
      content: '',   //继承的值
    }
  },
  components: {
    VueUEditor
  },
  computed: {
    ...mapState([
        'userInfo','editorContent'
      ])
  },
  created (){
    // console.log('fa-created...')
    this.init()
      // 要用id来请求 是编辑还是新建
      if(this.params == '') {
        return 
      }
      let data = {
        ...this.userInfo,
        id: this.params,
      }
      const that = this
      __getArticalDetail(data)
        .then( res => {
          console.log(res)
          that.coverSrc = res.data.cover
          that.titleValue = res.data.title
          that.authorValue = res.data.author
          that.describeValue = res.data.described
          that.copyValue = res.data.copyright
          that.SET_EDITORCONTENT(res.data.content)
          that.content = res.data.content
        })
  },
  mounted() {
    // console.log('fa-mounted...')
    this.$nextTick(() => {        //保证ueditor这些都加载结束
     
    })
  },
  watch: {
    /*以下是监测中英文输入的不同长度*/
    titleValue: function(newValue,oldValue) {
      getInputLen(newValue,oldValue,40,'titleValue',this)
    },
    authorValue: function(newValue,oldValue) {
      getInputLen(newValue,oldValue,16,'authorValue',this)
    },
    describeValue: function(newValue,oldValue) {
      getInputLen(newValue,oldValue,80,'describeValue',this)
    },
  },
  methods: {
    ...mapMutations([
        'SET_LOADING','SET_EDITORCONTENT','SWITCH_MENUTYPE','TOGGLE_LISTDATAUPDATE'
      ]),
    init() {
      //初始化时要判断是新建进来的还是编辑进来的 从而判断输入框里是否传值
      if (this.$route.params.id){
        this.params = this.$route.params.id
      }
      else {
        this.params = ''
      }
    },
    historyBack () {
      window.history.back()
    },
    _toMaterManage () {
      this.$router.push('/microhome')
      this.SWITCH_MENUTYPE({str:'文章管理',index: 1})

    },
    switchActive (name) {
      //用来改变激活的元素的边框样式
      this.activeName = name
    },
    switchHover (name) {
      this.hoverName = name
    },
    switchLiActive (name) {
      this.liActiveName = name
    },
    switchLiHover (name) {
      this.liHoverName = name
    },
    // 按钮触发器input file
    _uploaderTrigger (id) {
      let idSelector = "#"+ id
      document.querySelector(idSelector).click()
    },
    _clearActive () {
      this.activeName = ''
    },
    _coverChange (e) {
      const that = this
      u_viewPick(e.target).then(({base64, type})=>{
        that.SET_LOADING()
        let data = {
          ...that.userInfo,
          datas: base64,
          type: 'd',
          suffix: type,
        }
        __sendBase64(data)
          .then( res => {
            that.SET_LOADING()
            that.coverSrc = res.data
          })
        // if(rst.base64) {
        //   that.coverSrc = rst.base64
        // }
        // else {
          // that.coverSrc = rst
        // }
        // console.table(rst)
      })
    },
    //保存发布文章
    _submit () {
      if(this.titleValue.trim() == '') {
        alert('请输入文章的标题')
        return false
      }
      if(this.authorValue.trim() == '') {
        alert('请输入文章的作者')
        return false
      }
      if(this.describeValue.trim() == '') {
        alert('请输入文章的描述')
        return false
      }
      if(this.editorContent.trim() == '') {
        alert('请输入文章的内容')
        return false
      }
      if(this.coverSrc.trim() == '') {
        alert('请配置文章的封面图')
        return false
      }
      let title = this.titleValue
      let author = this.authorValue
      let described = this.describeValue
      let content = this.editorContent
      let copyright = this.copyValue
      let cover = this.coverSrc
      let id = this.params
      let data = {
        ...this.userInfo,
        title,
        author,
        described,
        content,
        copyright,
        cover,
      }
      if(id) {
        Object.defineProperty(data, 'id', {
          value: id,
          enumerable: true
        }) 
      }
      console.log(data)
      __editArticle(data)
        .then(res => {
          console.log(res)
          if(!res.result) {
            alert(res.message)
            return false
          }
          this.$router.push('/microhome')
          this.SWITCH_MENUTYPE({str:'文章管理',index: 1})
          this.TOGGLE_LISTDATAUPDATE()
        })
    },
  },
  watch: {
    //监测参数的变化来发送请求
    params(val, oldval){
      // console.log(val, oldval)
    }
  },
  //如果是动态参数 /edit/:id就会触发这个
  // beforeRouteUpdate(to, from ,next) {
  //   console.log("before...")
  // }
  beforeRouteEnter(to, from ,next) {
    // console.log("before...")
    
    /* // 最后执行-。-
    next( vm => {

      // console.log('beforeRouteEnter')
      vm.init()
      // 要用id来请求 是编辑还是新建
      if(vm.params == '') {
        return 
      }
      let data = {
        ...vm.userInfo,
        id: vm.params,
      }
      const that = vm
      __getArticalDetail(data)
        .then( res => {
          console.log(res)
          that.coverSrc = res.data.cover
          that.titleValue = res.data.title
          that.authorValue = res.data.author
          that.describeValue = res.data.described
          that.copyValue = res.data.copyright
          that.SET_EDITORCONTENT(res.data.content)
        })
    })
    */
    next()
  },
  beforeRouteLeave (to,from,next) {
    this.coverSrc = ''
    this.titleValue = ''
    this.authorValue = ''
    this.describeValue = ''
    this.copyValue = ''
    this.SET_EDITORCONTENT('')
    next()
  }
}
</script>

<style lang="less" scoped>
.edit-box {
  color: #333333;
  width: 1200px;
  min-height: 780px;
  border: 1px solid #dddddd;
  background: #ffffff;
  margin: 30px auto 50px;
}
.top-nav {
  font-size: 16px;
  color: #999999;
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  .back {
    width: 54px;
    height: 54px;
    background: url("/static/img/icon_1.png") no-repeat;
    background-position: -48px -945px;
    cursor: pointer;
  }
  .nav{
    display: flex;
    li {
      margin-left: 10px;
      cursor: pointer;
    }
    li:last-of-type {
      color: #333333;
    }
  }
}
.body {
  display:flex;
}
.left {
  background: #f8f8f8;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  width: 262px;
  border-right: 1px solid #dddddd;
  &>p {
    width: 218px;
    margin: 0 auto;
  }
  .pic-btn {
    width: 218px;
    height: 170px;
    border: 2px solid #ffffff;
    background-color: #ffffff;
    padding-top: 6px;
    margin: 24px auto;
    cursor: pointer;
    &.active {
      border-color: #00aeee;
    }
    &>p {
      color: #bbbbbb;
      line-height: 46px;
      text-align: center;
    }
  }
  .backimg {
    width: 198px;
    height: 120px;
    background: url('/static/img/icon_1.png') no-repeat;
    background-position: 0px -690px;
    background-color: #ececec;
    margin: 0 auto;
  }
}
.mid {
  flex-grow: 1;
  padding: 30px 120px;
  .title, .author, .copy, .decribe {
    margin-bottom: 30px;
    input {
      box-sizing: border-box;
      width: 100%;
      height: 32px;
      line-height: 32px;
      color: #999999;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding-left: 12px;
      &.active {
        border-color: #00aeee;
      }
    }
    p {
      margin-bottom: 16px;
    }
  }
}
.right {
  width: 220px;
  border-left: 1px solid #dddddd;
  p {
    width: 178px;
    height: 62px;
    line-height: 62px;
    margin: 0 auto;
  }
  ul {
    width: 178px;
    margin: 0 auto;
  }
  li {
    width: 140px;
    height: 22px;
    padding: 16px 18px;
    border: 1px solid #dddddd;
    cursor: pointer;
    display: flex;
    .icon {
      width: 30px;
      height: 30px;
      background: url('/static/img/icon_1.png') no-repeat;
    }
    &:first-of-type .icon{
      background-position: -62px -857px;
    }
    &:nth-child(2) .icon{
      background-position: -145px -857px;
    }
    &:last-of-type .icon{
      background-position: -225px -858px;
    }
    &.active {
      color: #ffffff;
      border-color: #00aeee;
      background-color: #00aeee;
      &:first-of-type .icon{
        background-position: -62px -905px;
      }
      &:nth-child(2) .icon{
        background-position: -145px -905px;
      }
      &:last-of-type .icon{
        background-position: -225px -905px;
      }
    }
  }
}
.footer {
  // width:100%;
  height: 76px;
  border-top: 1px solid #dedede;
  z-index:998;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background:#fff;
  .inner {
    width: 716px;
    margin: 0 auto;
    height: 76px;
    text-align: right;
    a {
      color: #fff;
      display: inline-block;
      width: 104px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      background: #00acee;
      margin-top: 22px;
      transition: all .3s;
      &:hover {
        background:  #008ec4;
        // box-shadow: 0 0 40px 0px #00acee;
      }
    }
  }
}

</style>

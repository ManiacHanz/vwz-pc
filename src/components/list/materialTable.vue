<template>
  <div class="table">
    <ul class="listUl">
      <li v-for="(item,index) in this.$props.listData" >
        <div class="content">
          <div class="content-title">{{item.title}}</div>
          <div class="content-info">
            <p class="author">{{item.author}}</p>
            <p class="content-time">更新于 {{item.operateTimeStr}}</p>
          </div>
          <div class="content-img">
            <img class="thumbnail" :src="imgBaseUrl+item.cover">
          </div>
          <div class="content-detail">{{item.described}}</div>
          <a class="mask" target="_blank" :href="'#/sample/' +item.id">预览文章</a>
        </div>
        <ul class="btns">
          <li class="edit-btn" @click="_goEdit(item.id)">
            <span></span>
            编辑
          </li>
          <li class="show-btn" :class="[!item.display?'isShow':'']" @click="_toggleDisplay(item.id, index)">
            <span></span>
            {{!item.display?'已显示':'已隐藏'}}
          </li>
          <li class="del-btn" @click="_delArticle(item.id, index)">
            <span></span>
            删除
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

import {u_transTime} from 'config/mUtils'
import {imageBaseUrl} from 'config/env'
import {__getArticalDetail} from 'service/getData'

export default {
  data() {
    return {
      imgBaseUrl: imageBaseUrl,
    }
  },
  computed: {
    ...mapState([
        'userInfo'
      ])
  },
  props:['listData','toggleDisplay','delArticle'],
  mounted () {
    // this.time = u_transTime(this.$props.updateTime)
  },
  methods: {
    // 点击编辑 进路由 传入参数
    _goEdit(id) {
      this.$router.push( {name:'ArticleEdit', params:{id} } )
      // let data = {
      //   ...this.userInfo,
      //   id
      // }
      // __getArticalDetail(data)
      //   .then(res => {
      //      console.log(res)
      //   })
    },
    _toggleDisplay (id, index) {
      this.toggleDisplay(id,index)
    },
    _delArticle (id, index) {
      this.delArticle(id, index)
    }
  }
}
</script>

<style lang="less" scoped>
  .table .listUl{
    color: #333333;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
  }
  .table .listUl>li {
    width: 300px;
    border: 1px solid #dddddd;
    margin-bottom: 30px;
    &:not(:nth-child(3n)){
      margin-right: 12px;
    }
  }
  .table .content {
    height: 300px;
    padding: 10px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .table .content:hover .mask {
    display: block;
  }
  .table .content-title{
    font-size: 16px;
    color: #333333;
    overflow: hidden;
    height: 40px;
  }
  .table .content-info {
    display: flex;
    justify-content: space-between;
    .author {
      color: #999999;
      font-size: 14px;
      max-width: 140px;
    }
  }
  .table .content-time{
    color: #999999;
    font-size: 14px;
  }
  .table .content-img {
    height: 160px;
    overflow: hidden;
    background-position: 0 -690px;
    background-color: #ececec;
  }
  .table .content-img img {
    width: 100%;
    height: 100%;
  }
  .table .content-detail {
    font-size: 14px;
    color: #999999;
    height: 40px;
    overflow: hidden;
    word-break: break-all;
  }
  .table .mask {
    font-size: 16px;
    color: #ffffff;
    width: 100%;
    height: 320px;
    text-align: center;
    line-height: 320px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: none;
    cursor: pointer;
  }
  .table .btns {
    display: flex;
  }
  .table .btns li {
    flex-grow: 1;
    text-align: center;
    height: 42px;
    line-height: 42px;
    color: #999999;
    background: #f3f7fd;
    border-top: 1px solid #dddddd;
    cursor: pointer;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 22px;
      height: 20px;
      background: url('/static/img/icon_1.png') no-repeat;
    }
  }
  .table .btns .edit-btn span{
    background-position: -62px -378px;
  }
  .table .btns .edit-btn:hover span{
    background-position: -62px -422px;
  }
  .table .btns .show-btn span{
    background-position: -369px -377px;
  }
  .table .btns .show-btn:hover span{
    background-position: -369px -421px;
  }
  .table .btns .show-btn.isShow span{
    background-position: -157px -377px;
  }
  .table .btns .show-btn.isShow:hover span{
    background-position: -157px -421px;
  }
  .table .btns .del-btn span{
    background-position: -264px -377px;
  }
  .table .btns .del-btn:hover span{
    background-position: -264px -421px;
  }
  .table .btns li:not(:last-of-type) {
    border-right: 1px solid #dddddd;
  }
  .table .btns li:hover {
    color: #111111;
  }
</style>

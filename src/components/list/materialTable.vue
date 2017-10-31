<template>
  <div class="table">
    <ul class="listUl">
      <li v-for="(item,index) in this.$props.listData" >
        <div class="content">
          <div class="content-title">{{item.title}}</div>
          <div class="content-info">
            <p class="author">{{item.author}}</p>
            <p class="content-time">更新于{{item.time}}</p>
          </div>
          <div class="content-img">
            <img class="thumbnail" :src="item.thumbnail">
          </div>
          <div class="content-detail">{{item.content}}</div>
          <div class="mask">预览文章</div>
        </div>
        <ul class="btns">
          <li class="edit-btn" @click="goEdit(item.id)">编辑</li>
          <li class="show-btn">已显示</li>
          <li class="del-btn">删除</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props:['listData'],
  methods: {
    // 点击编辑 进路由 传入参数
    goEdit(id) {
      this.$router.push( {name:'ArticleEdit', params:{id} } )
    }
  }
}
</script>

<style lang="less" scoped>
  .table .listUl{
    color: #333333;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .table .listUl>li {
    width: 300px;
    border: 1px solid #dddddd;
    margin-bottom: 30px;
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
    max-height: 160px;
    overflow: hidden;
  }
  .table .content-img img {
    width: 100%;
  }
  .table .content-detail {
    font-size: 14px;
    color: #999999;
    height: 40px;
    overflow: height;
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
  }
  .table .btns li:not(:last-of-type) {
    border-right: 1px solid #dddddd;
  }
  .table .btns li:hover {
    color: #111111;
  }
</style>

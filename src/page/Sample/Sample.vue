<template>
	<div class="box">
		<div class="inner-box">
			<h1 class="title">{{detail.title}}</h1>
			<div class="info">
				<span class="time">{{detail.operateTimeStr}}</span>
				<span class="author">{{detail.author}}</span>
			</div>
			<div class="content" id="content" v-html="detail.content">
				<!-- {{detail.content}} -->
			</div>
      <div class="copy-right">{{detail.copyright}}</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {__getArticalDetail} from 'service/getData'
export default {

  name: 'Sample',

  data () {
    return {
    	detail: '',    // 文章详情
    }
  },
  computed: {
  	...mapState([
  			'userInfo'
  		])
  },
  created () {
  	let data = {
  		...this.userInfo,
  		id:this.$route.params.id,
  	}
  	// console.log(data)
  	__getArticalDetail(data)
  		.then(res=>{
        if(!res) {
          alert('网络请求失败，请检查网络或稍后重试')
          return false
        }
        if(!res.result) {
          alert(res.message)
          return
        }
  			console.log(res)
  			this.detail = Object.assign({},res.data)
  			const oContent = document.querySelector('.content')
	  		console.log(oContent)
	  		oContent.innerHtml += res.content
  		})
  },
  mounted () {
  	this.$nextTick( () => {
  		const oContent = document.querySelector('.content')
  		console.log(oContent)
  		oContent.innerHtml = this.detail.content
  	})
  	
  },
  beforeRouteLeave () {
  	this.destroy()
  }
}
</script>

<style lang="less" scoped>
.box {
  // min-height: calc(~'100vh - 60px');
}
.inner-box {
	width: 670px;
  min-height: 100%;
	margin: 0 auto;
  background: #fff;
  padding: 40px 100px 0;
}
.title {
  color: #000;
  font-size: 26px;
  font-weight: bold;
  // text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #dedede;
  padding-top: 20px;
  padding-bottom: 20px;
}
.info {
  margin-top: 16px;
  margin-bottom: 22px;
}
.time {
  font-size: 16px;
  color:#999;
  margin-right: 10px;
}
.author {
  font-size: 16px;
  color: #607fa6;
}
.content {
  color: #3e3e3e;
  img{
    display: block;
    margin: 8px auto;
    max-width: 100%;
  }
}
.copy-right {
  color: #999;
  text-align: center;
  margin-top: 60px;
  padding-bottom: 40px;
}
</style>
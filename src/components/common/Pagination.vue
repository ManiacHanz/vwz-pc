<template>
	<div class="pagination">
		<div class="btn prev" v-show="this.nowPage > 1" @click="changePage(-1)"></div>
		<div class="page-num">{{nowPage}} / {{this.$props.totalPage}}</div>
		<div class="btn next" v-show="this.nowPage < this.totalPage" @click="changePage(+1)"></div>
		<div class="skip-page">
			<input type="tel" min="1" step="0" v-model="goToPage" @keyup="_checkZero">
			<a @click="skipPage()">跳转</a>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Pagination',

  data () {
    return {
    	nowPage: 1, //当前页数
    	goToPage: '',    //输入框要跳转的页数
    }
  },
  props: ["getPageNum","totalPage","initNowPage"],		//传的函数
  mounted () {
  	this.init()
  },
  watch: {
  	goToPage: function() {
  		//只能输入正整数
  		if (!/^\d+$/.test(this.goToPage)){
				return this.goToPage = this.goToPage.replace(/\D/g,'')
			}
  		// 监测跳转页数不能大于总页数
  		if(this.goToPage> this.totalPage) {
				 return this.goToPage = this.totalPage
			}
  	},
  	totalPage: function(newVal) {
  		// console.log(this.nowPage, newVal)
  		if (this.nowPage > newVal) {
  			this.nowPage = newVal
  		}
  	},
  	initNowPage: function(newVal) {
  		// 父组件点搜索的时候会让这个Prop变化 这是 就把当前页改成1
  		this.nowPage = 1
  	}
  },
  methods: {
  	init () {
  			//初始化页数
  			// this.totalPage = 9
  	},
  	changePage (num) {
  		//左右翻页
  		this.nowPage = this.nowPage + num
  		this.getPageNum(this.nowPage)
  	},
  	skipPage () {
  		//跳转页数 		排除0 和空  
  		console.log(!this.goToPage)
  		if(!this.goToPage) {
  			return false
  		}
  		if(this.goToPage == 0) {
  			this.goToPage = ''
  			return false
  		}
  		this.nowPage = this.goToPage *1
  		this.getPageNum(this.goToPage)
  	},
  	_checkZero () {
  		// 排除全部输入0的情况
  		if(this.goToPage != '' && /^0*$/.test(this.goToPage) ) {
  			this.goToPage = ''
  		}
  	}
  }
};
</script>

<style lang="less" scoped>
// 清楚input数字输入框的默认样式
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}

.pagination {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 70px;
	&>div {
		margin-right: 8px;
	}
}
.btn {
	width: 30px;
	height: 30px;
	border: 1px solid #999999;
	border-radius: 7px;
	position: relative;
	cursor: pointer;
	&:after {
		content: '';
		display: block;
		border: 8px solid #ffffff;
		position: absolute;
		top: 7px;
	}
}
.prev:after {
	border-right: 10px solid #777777;
	right: 11px;
}
.prev:hover:after {
	border-right-color: #00adef;
}
.next:after {
	border-left: 10px solid #777777;
	left: 11px;
}
.next:hover:after {
	border-left-color: #00adef;
}
.page-num {
	height: 32px;
	line-height: 32px;
}
.skip-page {
	input {
		color: #999999;
		width: 58px;
		height: 30px;
		line-height: 30px;
		padding-left: 6px;
		border: 1px solid #999999;
		border-radius: 7px;
	}
	a {
		display: inline-block;
		color: #333333;
		width: 58px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		border: 1px solid #999999;
		border-radius: 7px;
		&:hover {
			color: #ffffff;
			background: #00adef;
			border-color: #00adef;
		}
	}
}
</style>
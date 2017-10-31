<template>
	<div>
		<span class="icon"></span>
		<span>发布成功</span>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {

  name: 'successNotify',

  data () {
    return {

    }
  },
  computed: {
  	...mapState([
  			'isShowNotification'
  		])
  },
  watch: {
  	isShowNotification: function(newIsShowNotification) {
  		if(newIsShowNotification == true) {
  			setTimeout( ()=>{
  				this.CLOSE_NOTIFICATION()
  			},3000)
  		}
  	}
  },
  methods: {
  	...mapMutations([
  			'CLOSE_NOTIFICATION'
  		])
  }
}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';
@import '../../style/common.less';
div {
	.whtl(280px,72px);
	color: #fff;
	font-size: 16px;
	background-color: @lightBlue;
	.icon {
		display: inline-block;
		.wh(36px, 36px);
		background: url('/static/img/sprite_02.png') no-repeat;
		background-position: -63px -192px;
		vertical-align: middle;
		margin-right: 10px;
	}
}
</style>
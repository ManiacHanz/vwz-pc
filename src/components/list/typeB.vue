<template>
	<div class="box" :class="colorStyle">
		<img :src="imgBaseUrl+content.imglist[0]">
		<div class="right">
			<p class="title">{{ content.title }}</p>
			<p class="time">{{ content.time }}</p>
		</div>
	</div>
</template>

<script>
import {imageBaseUrl} from 'config/env.js'

export default {

  name: 'typeB',

  data () {
    return {
    	imgBaseUrl: imageBaseUrl,

    }
  },
  props: ['content','colorStyle'],

}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';

.box {
	padding: 8px 6px;
	display: flex;
}
img {
	display: block;
	width: 80px;
	height: 56px;
	margin-right: 8px;
}
.right {
	// flex-grow: 1;
	height: 56px;
	.title {
		height: 38px;
		overflow-y: hidden;
		margin-bottom: 2px;
		word-break: break-all;
	}
	.time {
		font-size: 12px;
		color: #999999;
	}
}
.dark {
	background: @dark_back;
	.title {
		color: @dark_lightFont;
	}
	.time {
		color: @dark_font;
	}
}
</style>
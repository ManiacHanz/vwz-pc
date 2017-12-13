<template>
	<div class="box">
		<div class="close" @click="_skipGuider">
			<img src="/static/img/skip.png">
		</div>
		<div class="img-box" @click.stop="_skipToNext">
			<img :src="imglist[nowIndex]">
			<div class="hideBtn" :class="'hide'+nowIndex" onselectstart="return false;"></div>
		</div>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getStore,setStore} from 'config/mUtils'
export default {

  name: 'guider',

  data () {
    return {
    	nowIndex: 0,
    	imglist: ['/static/img/guide/001.jpg','/static/img/guide/002.jpg','/static/img/guide/003.jpg','/static/img/guide/004.jpg','/static/img/guide/005.jpg','/static/img/guide/006.jpg','/static/img/guide/007.jpg','/static/img/guide/008.jpg','/static/img/guide/009.jpg','/static/img/guide/010.jpg','/static/img/guide/011.jpg','/static/img/guide/012.jpg','/static/img/guide/013.jpg','/static/img/guide/014.jpg','/static/img/guide/015.jpg'],
    }
  },
  methods: {
  	...mapMutations([
  			'TOGGLE_GUIDER'
  		]),
  	_skipGuider () {
  		this.nowIndex = 0
  		this.TOGGLE_GUIDER()
  		if (getStore('state') == 0) {
  			setStore('state', 1)
  		}
  	},
  	_skipToNext () {
  		if(this.nowIndex < this.imglist.length -1 ){
  			this.nowIndex += 1
  		}else {
  			this.nowIndex = 0
  			this.TOGGLE_GUIDER()
  			if (getStore('state') == 0) {
	  			setStore('state', 1)
	  		} 
  		}
  	}
  }
}
</script>

<style lang="less" scoped>
.box {
	width: 100%;
	min-width: 1000px;
	min-height: 650px;
	height: 100%;
	background: rgba(0,0,0,0.82);
	position: absolute;
	z-index: 999;
}
.close {
	width: 70px;
	height: 70px;
	position: absolute;
	right: 20px;
	top: 20px;
	z-index: 999;
	cursor: pointer;
	img {
		width:100%;
	}
}
.img-box {
	width: 1000px;
	height: 620px;
	position: relative;
	left: calc(~'50% - 500px');
	top: calc(~'50% - 310px');
	img {
		width: 100%;
		height: 100%;
	}
	.hideBtn {
		width: 200px;
		height: 60px;
		position: absolute;
		z-index:999;
		// border: 1px solid blue;
		cursor: pointer;
		&.hide0{
			left: 400px;
			top: 320px;
		}
		&.hide1 {
			left: 400px;
			top: 308px;
		}
		
		&.hide2 {
			left: 398px;
			top: 486px;
		}
		&.hide3 {
			left: 398px;
			top: 436px;
		}
		&.hide4 {
			left: 398px;
			top: 493px;
		}
		&.hide5 {
			left: 398px;
			top: 453px;
		}
		&.hide6 {
			left: 126px;
			top: 334px;
		}
		&.hide7 {
			left: 508px;
			top: 244px;
		}
		&.hide8 {
			left: 400px;
			top: 424px;
		}
		&.hide9 {
			left: 400px;
			top: 424px;
		}
		&.hide10 {
			left: 400px;
			top: 484px;
		}
		&.hide11 {
			left: 400px;
			top: 416px;
		}
		&.hide12 {
			left: 400px;
			top: 416px;
		}
		&.hide13 {
			left: 528px;
			top: 444px;
		}
		&.hide14 {
			left: 78px;
			top: 398px;
		}
	}

}
</style>
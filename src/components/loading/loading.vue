<template>
	<div class="box">
			<div class="main">
				<div class="loadEffect">
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
				</div>
				<slot>
					<p>请稍后</p>
				</slot>

			</div>
			
	</div>
</template>

<script>
export default {

  name: 'loading',

  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.main{
	width: 300px;
	height: 300px;
	padding-top: 10px;
	margin: 250px auto;
	background: rgba(0,0,0,0.8);
	border-radius: 15px;
}
p {
	font-size: 22px;
	color: #fff;
	text-align:center;
	margin-top: 40px;
}
a{
	display: block;
	text-align: center;
	font-size: 20px;
	margin-top: 200px;
}
.loadEffect{
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto;
  margin-top:40px;
}
.loadEffect span{
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load{
  0%{
      opacity: 1;
  }
  100%{
      opacity: 0.2;
  }
}
.loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.13s;
}
.loadEffect span:nth-child(2){
    left: 14px;
    top: 14px;
    -webkit-animation-delay:0.26s;
}
.loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -8px;
    -webkit-animation-delay:0.39s;
}
.loadEffect span:nth-child(4){
    top: 14px;
    right:14px;
    -webkit-animation-delay:0.52s;
}
.loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.65s;
}
.loadEffect span:nth-child(6){
    right: 14px;
    bottom:14px;
    -webkit-animation-delay:0.78s;
}
.loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    -webkit-animation-delay:0.91s;
}
.loadEffect span:nth-child(8){
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay:1.04s;
}

</style>
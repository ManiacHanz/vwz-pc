<template>
  <div>
    <div class="alert">
      <div class="icon"></div>
      <div class="char">
        <p>温馨提示</p>
        <p>菜单模块编辑完成后必需点击“保存并发布”才会生效，可通过右上角“查看效果”访问微网站。</p>
      </div>
    </div>
    <div class="body">
        <mobile-panel></mobile-panel>
        <set-up-form></set-up-form>
    </div>
  </div>
</template>

<script>
import mobilePanel from '../../../components/menuSet/mobilePanel.vue'
import setUpForm from '../../../components/menuSet/setUpForm'
export default {
  data () {
    return {

    }
  },
  components: {
    mobilePanel,
    setUpForm,
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/variety.less';

.alert {
    height: 36px;
    background: @menuSetBackColor;
    padding:  16px 30px 18px;
    display: flex;
    border-top: 1px solid @borderGrey;
  }
  .alert .icon {
    width: 36px;
    height: 36px;
    background: url('/static/img/tips.png') no-repeat;
    // background-position-y: 2px; 
    background-size: 36px;
    margin-right: 10px;
  }
  .alert .char {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .alert .char p:first-of-type{
    color: #aaaaaa;
  }
  .body {
    padding-top: 38px;
    padding-left: 30px;
    padding-right: 30px;
    display:flex;
    justify-content: space-between;
  }
  
</style>

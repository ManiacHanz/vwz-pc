<template>
  <div>
    <div class="alert">
      <div class="icon"></div>
      <div class="char">
        <p>温馨提示</p>
        菜单编辑完成后需点击“保存并发布”才能同步到手机。
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
    height: 34px;
    background: @menuSetBackColor;
    padding:  16px 30px 18px;
    display: flex;
    border-top: 1px solid @borderGrey;
  }
  .alert .icon {
    width: 34px;
    height: 36px;
    background: url('/static/img/sprite.png') no-repeat -17px -336px;
    background-size: 225px 1000px;
    margin-right: 10px;
  }
  .alert .char p:last-of-type{
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

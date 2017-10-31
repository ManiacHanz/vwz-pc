<template>
  <div id="app">
    <div style="background:#fff;border-bottom: 1px solid #dddddd">
      <div class="myhead">
        <my-header></my-header>
      </div>
    </div>
    <div class="mybody">
      <transition name="notify-fade" mode="out-in">
        <div class="notification" v-show="isShowNotification===true">
          <success-notify></success-notify>
        </div>
      </transition>
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <modal></modal>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

import Header from './components/common/Header'
import modal from './components/common/modal'
import successNotify from './components/notification/successNotify'

export default {
  name: 'app',
  components: {
    'my-header': Header,
    modal,
    successNotify,
  },
  computed: {
    ...mapState([
        'isShowNotification'
      ]),
  }
}
</script>

<style>
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  background: #e8e9ef;
  min-height: 100%;
  /*解决滚动条出现的滚动闪烁*/
}
.mybody, .myhead {
  padding-left: calc( 100vw - 100% );
}
.mybody {
  border-top: 1px solid transparent;
  position: relative;
}
.notification {
  width: 280px;
  margin: 0 auto;
  position: absolute;
  top: -1px;
  left: calc( 50vw - 140px );
}
/*transition的动画*/
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}

.notify-fade-enter-active, .notify-fade-leave-active {
  transition: all .3s ease;
}
.notify-fade-enter, .notify-fade-leave-to {
  transform: translateY(-70px);
  opacity: 0;
}
</style>

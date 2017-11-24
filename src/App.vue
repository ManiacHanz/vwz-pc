<template>
  <div id="app">
    <div class="loading-box" v-if="isShowLoading">
      <loading>
        <p v-if="loadingText">{{loadingText}}</p>
      </loading>
    </div>
    <div style="background:#fff;border-bottom: 1px solid #dddddd">
      <div class="myhead">
        <my-header></my-header>
      </div>
    </div>
    <div class="mybody">
      <transition name="notify-fade" mode="out-in">
        <div class="notification" v-show="isShowNotification===true">
          <success-notify>
            <span v-if="showNotificationText">{{showNotificationText}}</span>
          </success-notify>
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
import {setStore, getStore} from 'config/mUtils.js'
import {imageBaseUrl} from 'config/env'

import Header from './components/common/Header'
import modal from './components/common/modal'
import successNotify from './components/notification/successNotify'
import loading from './components/loading/loading'

export default {
  name: 'app',
  data: function() {
    return {
      uid: '',
      token: '',
      imgBaseUrl: imageBaseUrl,
    }
  },
  components: {
    'my-header': Header,
    modal,
    successNotify,
    loading,
  },
  computed: {
    ...mapState([
        'isShowNotification','isShowLoading','loadingText','showNotificationText'
      ]),
  },
  created () {
    // setStore('uid', 'USERjIMHXdT1')
    // setStore('token', 'dc75a1635757e096d139d6a160b929de')
    // setStore('name','微网站')
    // setStore('headimg','/webfrontres/TourismPc/img/header1.jpg')
    // setStore('logo','/fileresource/imgs/USERjIMHXdT1/1511522404344.jpeg')

    this.uid = getStore('uid')
    this.token = getStore('token')
    this.SAVE_USERINFO({uid:this.uid, token: this.token})
    
    this.SET_LOGO(getStore('logo'))
    this.SET_AVATAR(getStore('headimg'))
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations([
        'SAVE_USERINFO','SET_LOGO','SET_AVATAR',
      ])
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
.loading-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99999;
}
</style>

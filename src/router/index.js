import Vue from 'vue'
import Router from 'vue-router'
import MicroHome from '../page/MicroHome'
import PostCard from '../page/PostCard'
import Shake from '../page/Shake'
import WifiPortal from '../page/WifiPortal'
import ArticleEdit from '../page/Edit/ArticleEdit'
import Sample from '../page/Sample/Sample'


import {__checkLogin} from 'service/sendData'
import {getStore} from 'config/mUtils.js'
import {loginUrl} from 'config/env.js'

Vue.use(Router)

const router = new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'/microhome'
  	},
    {
      path: '/microhome',
      name: 'MicroHome',
      component: MicroHome,
      // children: [
      //   {
          // path: 'test',
          // component: Test
      //   }
      // ]
    },
    {
      path: '/artedit',
      name: 'ArticleEdit',
      component: ArticleEdit,
      meta: {noKeepAlive:true}
    },
    {
      path: '/postcard',
      name: 'PostCard',
      component: PostCard
    },
    {
      path: '/shake',
      name: 'Shake',
      component: Shake
    },
    {
      path: '/wifiportal',
      name: 'WifiPortal',
      component: WifiPortal
    },
    {
      path: '/sample/:id',
      name: 'Sample',
      component: Sample
    },
    
  ]
})

router.beforeEach( (to, from, next) =>{
  // console.log('everybefore..')
  if ( getStore('uid') && getStore('token') && getStore('mobile')) {
    __checkLogin()
      .then(res => {
        // console.log(res)
        if(res.statusCode == 404) {
          alert('请从登陆页面登陆进入，点击进入登录页')
          sessionStorage.clear()
          location.href = loginUrl
          return false 
        }
        next()
      })
  }
  else {
    alert('请从登陆页面登陆进入，点击进入登录页')
    sessionStorage.clear()
    location.href = loginUrl
  }
})

export default router
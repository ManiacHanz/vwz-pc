import Vue from 'vue'
import Router from 'vue-router'
import MicroHome from '../page/MicroHome'
import PostCard from '../page/PostCard'
import Shake from '../page/Shake'
import WifiPortal from '../page/WifiPortal'
import ArticleEdit from '../page/Edit/ArticleEdit'
import Sample from '../page/Sample/Sample'

import Hello from '../components/Hello'

Vue.use(Router)

export default new Router({
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
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    }

  ]
})

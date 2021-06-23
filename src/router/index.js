import { createRouter, createWebHistory } from 'vue-router'

//导入我们首页默认展示的组件
import findMusic from '../components/right/rightContent/findMusic.vue'
import move from '../components/right/rightContent/move.vue'
import liveBroadcast from '../components/right/rightContent/liveBroadcast.vue'
import FM from '../components/right/rightContent/FM.vue'
import Firend from '../components/right/rightContent/firend.vue'

//导入右侧封装好的组件----------> 这里是点击上面的导航跳转不同的内容
import nav1 from '../components/right/rightCenterContent/right-center-nav1.vue'
import nav2 from '../components/right/rightCenterContent/right-center-nav2.vue'
import nav3 from '../components/right/rightCenterContent/right-center-nav3.vue'
import nav4 from '../components/right/rightCenterContent/right-center-nav4.vue'
import nav5 from '../components/right/rightCenterContent/right-center-nav5.vue'
import nav6 from '../components/right/rightCenterContent/right-center-nav6.vue'

// 导入搜索组件
import serchSon from '../components/serch/serch.vue'
// 导入歌单详情页面组件
import gedanDetail from '../components/gedan/gedanDeail.vue'
import sonDetail from '../components/gedan/gedanComponents/sonDetail.vue'
import pinglun from '../components/gedan/gedanComponents/pinglun.vue'
import likeUser from '../components/gedan/gedanComponents/likeUser.vue'

// 导入歌单组件
// import sonList from '../components/gedan/navSonList.vue'

// 导入电台详情组件
import DjList from '../components/Dj/djList.vue';


// 导入歌手列表组件
import singerList from '../components/right/rightCenterContent/singer/singerList.vue'
import singerDetail from '../components/right/rightCenterContent/singer/singerDetail.vue'
import user from '../components/user/userDetail.vue'


// 视频组件  
import video from '../components/right/rightContent/move/video.vue'
import mv from '../components/right/rightContent/move/Mv.vue'
const routes = [
  {
    path: '/',
    // name: 'findMusic',
    redirect: '/findMusic/right-center-nav1',
  },
  {
    path: '/findMusic',
    // name: 'findMusic',
    component: findMusic,
    children: [
      {
        path: '/findMusic',
        redirect: '/findMusic/right-center-nav1'
      },
      {
        path: 'right-center-nav1',
        component: nav1
      },
      {
        path: 'right-center-nav2',
        component: nav2,
      },
      {
        path: 'right-center-nav3',
        component: nav3
      },
      {
        path: 'right-center-nav4',
        component: nav4
      },
      {
        path: 'right-center-nav5',
        component: nav5,
        children: [
          {
            path: '/findMusic/right-center-nav5',
            redirect:'/findMusic/right-center-nav5/singerList'
          },
           {
            path: 'singerList',
            component: singerList
          }
        ]
      },
      {
        path: 'right-center-nav6',
        component: nav6
      }
    ]
  },
  {
    path: '/move',
    // name: 'findMusic',
    component: move,
    children:[
      {
        path:'/move',
        redirect:'/move/video'
      },
      {
        path:'video',
        component:video
      },
      {
        path:'mv',
        component:mv
      }
    ]
  },
  {
    path: '/zhibo',
    // name: 'findMusic',
    component: liveBroadcast
  },
  {
    path: '/FM',
    // name: 'findMusic',
    component: FM
  },
  {
    path: '/firend',
    // name: 'findMusic',
    component: Firend
  },
  {
    path:'/singerdetai',
    component:singerDetail
  },
  {
    path: '/serch',
    // name: 'findMusic',
    component: serchSon
  },
  {
    path: '/gedanDetail',
    components: {
      name1: gedanDetail
    },
    children: [
      {
        path: '/gedanDetail',
        component: sonDetail
      },
      {
        path: 'pinglun',
        component: pinglun
      },
      {
        path: 'likeuser',
        component: likeUser
      }
    ]
  },
  {
    path: '/userDetail',
    components: {
      name2: user
    }
  },
  {
    path: '/Djlist',
    components: {
      name2: DjList
    }
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

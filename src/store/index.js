import { createStore } from 'vuex'

import {getHomeDetail,
        getTuiJianSon,
        } from '../http/requests'
import { reactive, ref} from 'vue';
export default createStore({
  state: {
    // 定义一个变量控制加载动画的出现与消失
    flags : Boolean,
    //首页数据存放--->首页轮播图
    imgURL: [],
    // 推荐歌单数据存放   
    tuiJianSon:[],
    unUserDetail:{},
    // 歌单中歌曲数据存放
    gedanSonDetail:{},
    // 存放页面中双击后要播放的音乐的url，在footed组件中获取这个变量即可
    songUrl:reactive({
      baseUrl:''
    }),
    listen:ref(''),
    // 用户个人信息存放
    userDetail:{}
  },
  mutations: {
    fns(state) {
      getHomeDetail(state).then((res) => {
        console.log(res.data.data)
        state.imgURL = res.data.data.blocks[0].extInfo.banners;
      })
    },
    getTuiJianSonDetail(state){
      getTuiJianSon(state).then((res) =>{
        state.tuiJianSon = res.data
        // console.log(state.tuiJianSon);
      })
    },
    getUserDetail(state,detail){
      state.unUserDetail = detail
    },
    getSonDetail(state,sonDetail){
      state.gedanSonDetail= sonDetail
      // console.log(state.gedanSonDetail);
      // console.log(sonDetail);
    },
    setFlag(state){
      state.flags = true
    },
    pushSongUrl(state,url){
      state.songUrl.baseUrl = url
    },
    addSon(state,url){
      state.listen= url
    }
  },
  actions: {
  },
  modules: {
  }
})

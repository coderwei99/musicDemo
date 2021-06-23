<template>
  <div id="index" onselectstart="return false;">
    <wYTop></wYTop>
    <wYLeft></wYLeft>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view name = 'name1'></router-view>
    <router-view name = 'name2'></router-view>
    <wFooted></wFooted>
  </div>
</template>

<script>
//导入封装好的request请求获取数据
import request from "./http/api";

//导入四大组件的顶部
import wYTop from "./components/top/top";

//导入四大组件的左侧
import wYLeft from "./components//left/left-list";

// 导入四大组件的底部
import wFooted from "./components/footed/footed"

import { onMounted } from 'vue';

//导入四大组件的右侧
// import findMusic from "./components/right/findMusic";

export default {
  name: "App",
  components: {
    wYTop,
    wYLeft,
    // findMusic
    wFooted
  },
  setup() {
    // 使用reques函数直接在setup中获取数据
    request('/login/cellphone?phone=15118267400&password=QQ916606569')
      .then((res) => {
        console.log(res);
      })
    const beforeunloadFn = function(e){
      console.log(e);
      // alert(1111)
 }
 beforeunloadFn()
    onMounted(()=>{
       window.addEventListener("beforeunload", (e) => beforeunloadFn(e));
    })
    //   });
    return{
      beforeunloadFn
    }
  },
};
</script>

<style scoped>
#index {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
.wy-left {
}
</style>

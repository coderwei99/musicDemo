<template>
  <div class="indeax">
    <el-container>
      <el-header>
        <findMusicTop></findMusicTop>
      </el-header>
      <el-main>
        <el-scrollbar height="400px">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import getHomeDetail from "../../../http/requests";
import store from "../../../store/index";
import { reactive, onMounted } from "vue";

//导入发现音乐顶部的导航栏
import findMusicTop from "./finMusic/findMusic-Top";
export default {
  components: {
    findMusicTop,
  },
  setup() {
    let appBannerImg = reactive({
      imgURL: [],
    });
    // 拿到首页的所有数据  通过commit执行vuex的fns函数拿到首页的所有数据。并且存放在vux中方便其他组件使用
    const getHomeDetails = function () {
      store.commit("fns");
    };
    onMounted(() => {
      getHomeDetails();
    });
    return {
      appBannerImg,
    };
  },
};
</script>

<style scoped>
.indeax {
  float: left;
  width: 83.92%;
}
.el-header {
  margin-top: 25px;
}
.el-main {
  height: 560px;
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

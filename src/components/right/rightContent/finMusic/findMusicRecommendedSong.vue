<template>
  <div>
    <router-link class="toTuiJianSon" to="/findMusic/right-center-nav2">推荐歌单</router-link>
    <i class="el-icon-arrow-right"></i>
    <!-- <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <div class="grid-content bg-purple" v-for="item in $store.state.tuiJianSon.result" v-bind:key="item.id">{{item.id}}
          <img :src="item.picUrl">
        </div>
      </el-col>
    </el-row> -->
    <div class="item">
      <div class="item-list" v-for="item in $store.state.tuiJianSon.result" v-bind:key = 'item.id'>
        <router-link :to='{path:"/gedanDetail",query:{
          id:item.id
        }}'>
          <img :src="item.picUrl" alt="" srcset="">
          <p>{{item.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
// import store from '../../../../store/index'
import store from "@/store/index";

export default {
  setup() {
    //定义函数触发vuex定义的事件，然后获取数据并且保存在store.tuiJianSon
    const getTuiJianDetails = function () {
      store.commit("getTuiJianSonDetail");
    };
    onMounted(() => {
      getTuiJianDetails();
    });
  },
};
</script>

<style scoped>
.toTuiJianSon{
  font-size: 20px;
  color: black;
  text-decoration: none;
  font-weight: 600;
}
.item{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-list{
  height: 250px;
  width: 220px;
  margin-top: 20px;
}
.item-list img{
  width: 180px;
  height: 180px;
  border-radius: 5px;
  text-align: center;
}
.item-list a{
  text-decoration: none;
  color: #373737;
  font-weight: 400;
  font-size: 15px;
}
</style>
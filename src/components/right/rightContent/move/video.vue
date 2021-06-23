<template>
  <div class="tainer">
    <el-container>
      <el-header>
        <div class="nav-top">
          <div class="nav-tag">
            全部视频
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="nav-list">
            <ul>
              <li v-for="item in mv.mvlist" :key="item.id">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-main>
        <div></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive } from "vue";
// import {  getListDetail } from "../../../../http/viode";
import request from '../../../../http/api'
export default {
  setup() {
    let mv = reactive({
      //  视频顶部导航右侧分类
      mvlist: [],
      mvdetail:[]
    });
    // getmvList().then((res) => {
    //   console.log(res);
    //   mv.mvlist = res.data.data;
    // });
      // getListDetail().then((res) => {
      //   mv.mvdetail = res.data.data.datas
      // });
    request('/video/category/list').then(res =>{
      console.log(res)
    })

    return {
      mv,
    };
  },
};
</script>

<style scoped>
.nav-top {
  display: flex;
  justify-content: space-between;
}
.nav-tag {
  width: 100px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  font-size: 13px;
  color: black;
  border: 1px solid grey;
  border-radius: 38px;
}
.nav-list {
  width: 600px;
  display: flex;
}
.nav-list ul {
  width: 600px;
  display: flex;
  justify-content: space-between;
}
.nav-list ul li {
  font-size: 13px;
  color: grey;
}
</style>

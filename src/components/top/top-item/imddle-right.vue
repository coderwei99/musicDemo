<template>
  <div id="app">
    <span class="touxiang">
      <img :src="userDetails.userDetail.profile.avatarUrl" alt="" srcset="" />
    </span>
    <a @click="btnFlag">{{ userDetails.userDetail.profile.nickname }}</a>
    <i class="el-icon-caret-bottom"></i>
    <logo v-if="flag" :falg="flag" @sueec="sueec"></logo>
    <userDetail v-show="userDetailFlag == true"></userDetail>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import store from "@/store/index";
import logo from "../top-item/logo";
import userDetail from "../top-item/userDetail";

export default {
  components: {
    logo,
    userDetail,
  },
  setup() {
    // if(sessionStorage.getItem('userName'))
    // console.log(sessionStorage);
    // console.log(sessionStorage.getItem('userName'));
    // console.log(sessionStorage.getItem('userToken'));
    // console.log(sessionStorage.getItem('userCookie'));
    console.log(sessionStorage.getItem("userImg"));

    // 声明一个变量登录框的开启与隐藏
    let flag = ref(false);

    // 声明一个变量是打开个人中心
    let userDetailFlag = ref(false);

    // 声明一个变量判断打开登录还是打开个人中心
    let unFlag = ref(0);

    let userDetails = reactive({
      userDetail: {
        profile: {
          nickname: sessionStorage.getItem("userName") || "请登录",
          avatarUrl:
            sessionStorage.getItem("userImg") ||
            require("../../../assets/top-img/touxiang.png"),
        },
      },
    });
    let btnFlag = function () {
      if (!sessionStorage.getItem("userName")) {
        if (unFlag.value == 0) {
          flag.value = !flag.value;
        } else {
          userDetailFlag.value = !userDetailFlag.value;
        }
      }else{
        userDetailFlag.value = !userDetailFlag.value
      }
    };

    //接受子组件传递来的事件展示用户信息
    function sueec() {
      flag.value = false;
      unFlag.value = 1;
      // userDetailFlag.value = true
      //  console.log(userDetails.userDetail);
      // console.log(userDetails.userDetail.profile.nickname);
      userDetails.userDetail = store.state.unUserDetail.message;
    }
    return {
      btnFlag,
      flag,
      sueec,
      userDetails,
      userDetailFlag,
      unFlag,
    };
  },
};
</script>

<style scoped>
#app {
  float: left;
  margin-left: 250px;
}
.touxiang {
  display: inline-block;
  margin-top: 20px;
}
.touxiang img {
  width: 35px;
  height: 35px;
  border-radius: 35px;
  vertical-align: middle;
}
#app a {
  color: white;
  font-size: 13px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}
.btn-denglu {
  font-size: 13px;
  display: inline-block;
  margin-left: 15px;
  margin-top: 31px;
  vertical-align: top;
  color: white;
  letter-spacing: 3px;
}
</style>
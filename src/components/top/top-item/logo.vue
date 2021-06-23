<template>
  <div class="logos">
    <div class="border">
      请输入手机号：<input
        v-model="phone"
        placeholder="请输入手机号"
        type="text"
      /><br /><br />
      请输入密码：<input
        type="password"
        v-model="captcha"
        @keyup.enter="denglu"
      />
      <el-button type="primary" @click="btnclick">发送验证码</el-button>
      <el-button :plain="true" type="success" @click="denglu"
        >登录，我起飞了</el-button
      >
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import {getPhoneText} from '../../../http/requests'
import request from "../../../http/api";
export default {
  props: {
    falg: {
      type: Boolean,
    },
  },
  setup(props, content) {
    let userDetail = reactive({
      message: {},
    });
    const phone = ref("");
    const captcha = ref("");
    let flag = true;
    // 按下发送验证码逻辑处理
    const btnclick = function () {
      let phon = Number(phone.value);
      //  getPhoneText(phon).then(res =>res).catch(err => err)
      console.log(phon);
      // 发起请求获取验证码
      request("/captcha/sent", {
        phone: phon,
      }).then((res) => res);
    };
    // 按下登录时逻辑处理
    const denglu = function () {


      if (phone.value&&captcha.value) {
        
        let phon = Number(phone.value);
        let captchas = captcha.value;
        console.log(phon);
        console.log(captchas);
        // console.log(111);
        // 发起请求判断验证码是否正确
  
        // console.log(phon);
        // request('/captcha/verify',{
        //   phone:phon,
        //   captcha:captchas
        // }).then(
        //   res=>{
        //     console.log(res);
        //   }
        // ).catch(err =>{
        //   console.log(err.code);
        // })
        // 通过密码登录
        request("/login/cellphone", {
          phone: phon,
          password: captchas,
        })
          .then((res) => {
            userDetail.message = res.data;
            // console.log(res.data.code);
            if (res.data.code == 200) {
              console.log("登录成功");
              console.log(res.data);
              store.state.userDetail = res.data;
              console.log(store.state.userDetail);
              ElMessage({
                dangerouslyUseHTMLString: true,
                message: "<strong>登陆成功</strong>",
                center: true,
                type: "success",
                duration: 1000,
              });
              // console.log(res);
              sessionStorage.setItem("userName", res.data.profile.nickname);
              sessionStorage.setItem("userToken", res.data.token);
              sessionStorage.setItem("userCookie", res.data.cookie);
              sessionStorage.setItem("userImg", res.data.profile.avatarUrl);
              // sessionStorage.setItem(user)
              // console.log(res.data.token);
              // 发射出一个事件告诉父组件请求成功了，vuex中有用户信息了，可以进行展示了，并且将flag改为false，用于关闭登录框
              content.emit("sueec", false);
            } else {
              console.log("密码有一点点问题");
              ElMessage({
                dangerouslyUseHTMLString: true,
                message: "<strong>密码有问题</strong>",
                center: true,
                type: "error",
                duration: 1000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        store.commit("getUserDetail", userDetail);
        // console.log(props.falg);
      }
      else{
             ElMessage({
                dangerouslyUseHTMLString: true,
                message: "<strong>请输入密码</strong>",
                center: true,
                type: "warning",
                duration: 1000,
              });
       }
    };
    return {
      phone,
      captcha,
      btnclick,
      denglu,
      flag,
      userDetail,
    };
  },
};
</script>

<style scoped>
.logos {
  width: 400px;
  height: 362px;
  background-color: palevioletred;
  position: relative;
  z-index: 999;
}
.border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid red;
  width: 380px;
  height: 100px;
}

.logos input {
  height: 20px;
  width: 200px;
}
.el-button {
  height: 30px;
}
</style>
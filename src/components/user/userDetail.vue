<template>
    <!-- 在任何界面种点击某个用户跳转到这个用户详情页 用户id看地址栏  2021-5-4 编写该组件，只写了个组件验证跳转是否正确，内容未编写  -->
  <div>用户详情页  用户ID：{{userId}}</div>
</template>

<script>
import { ref } from 'vue'
import {  useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter()
    let userId = ref('')
    userId.value = router.currentRoute.value.query.id;
    return{
      userId
    }
  }
}
</script>

<style scoped>

</style>
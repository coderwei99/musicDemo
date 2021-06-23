<template>
  <div>
      个人中心我起飞了,杰伦永远的神
  </div>
</template>

<script>
import store from '../../../store/index'
export default {
  setup(){
    console.log(store.state.userDetail)
  }
};
</script>

<style scoped>
</style>
<template>
  <div id="app-top">
      <topLeft></topLeft>
      <minLeft></minLeft>
      <minRight></minRight>
  </div>
</template>

<script>
//导入子组件 ----左侧logo
import topLeft from "./top-item/top-left";

//导入子组件  -----中左
import minLeft from "./top-item/middle-left"

// 导入子组件 -----中右
import minRight from './top-item/imddle-right'
export default {
  data() {
    return {};
  },
  components: {
      topLeft,
      minLeft,
      minRight
  },
  
};
</script>

<style scoped>
#app-top {
  width: 100%;
  height: 75px;
  background: blue;
  float: left;
}
</style>
<template>
  <div id="app">
      <router-link to="/findMusic">发现音乐</router-link>
      <router-link to="/move">视频</router-link>
      <router-link to="/firend">朋友</router-link>
      <router-link to="/zhibo">直播</router-link>
      <router-link to="/FM">私人FM</router-link>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
#app{
    margin-left: 35px;
    margin-top: 10px;
    float: left;
}
.router-link-active {
  background: rgba(246, 246, 247);
  font-weight: bold;
}

a{
  display: block;
  margin-top: 2px;
  width: 175px;
  height: 35px;
  line-height: 35px;
  padding-left: 8px;
  text-decoration: none;
  line-height: 35px;
  color: black;
  font-weight: 400;
}
</style>
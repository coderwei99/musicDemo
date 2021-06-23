<template>
  <div class="index">
    <div class="nav-top">
      <router-link to="/move/video">视频</router-link>
      <router-link to="/move/mv">MV</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index{
  width: 81.9%;
  background: red;
  float:left
}
a {
  text-decoration: none;
  margin: 0 20px;
  display: inline-block;
  padding-bottom: 5px;
}
.nav-top{
  margin-bottom: 15px;
  margin-top: 15px;
  display: flex;
}
.router-link-active {
  border-bottom: 4px solid red;
  font-size: 18px;
  color: black;
  font-weight: 700;
}
</style>

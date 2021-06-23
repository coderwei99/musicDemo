<template>
  <div class="index">
        <router-link to="/findMusic/right-center-nav1">个性推荐</router-link>
        <router-link to="/findMusic/right-center-nav2">歌单</router-link>
        <router-link to="/findMusic/right-center-nav3">主播电台</router-link>
        <router-link to="/findMusic/right-center-nav4">排行榜</router-link>
        <router-link to="/findMusic/right-center-nav5">歌手</router-link>
        <router-link to="/findMusic/right-center-nav6">最新音乐</router-link>
  </div>
</template>

<script>
// import rightCenterNav1 from '../../rightCenterContent/right-center-nav1'

export default {
  components: {
    // rightCenterNav1
  },
};
</script>

<style scoped>
a {
  display: block;
  margin-left: 30px;
  text-decoration: none;
  float: left;
  color: black;
}
.router-link-active {
  border-bottom: 3px solid red;
  font-weight: bold;
}
</style>
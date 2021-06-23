<template>
  <div>
    <!-- {{$store.state.imgURL}} -->
    <el-carousel :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="item in $store.state.imgURL" :key="item">
        <img class="appIndexBanner" :src="item.pic" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
    <findMusicRecommendedSon></findMusicRecommendedSon>
  </div>
</template>

<script>
// 导入发现音乐推荐歌单组件
import findMusicRecommendedSon from "../rightContent/finMusic/findMusicRecommendedSong";
export default {
  components: {
    findMusicRecommendedSon,
  },
};
</script>

<style scoped>
.appIndexBanner {
  width: 100%;
  height: 100%;
}
</style>
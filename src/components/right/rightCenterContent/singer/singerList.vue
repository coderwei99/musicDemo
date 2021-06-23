<template>
  <div class="indx">
    <div
      class="singerList"
      v-for="item in singerDetails.details"
      :key="item.name"
      @click="toSinger(item.id)"
    >
      <div class="listImg">
        <img :src="item.img1v1Url" alt="" />
      </div>
      <div class="singerName">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";

import { getGinnerList } from "../../../../http/requests";
export default {
  setup() {
    let areas = ref("");
    let types = ref("");
    let router = useRouter();
    let singerDetails = reactive({
      details: [],
    });
    //刚进来请求获取默认展示的数据
    getGinnerList(-1, -1).then((res) => {
      console.log(res);
      singerDetails.details = res.data.artists;
    });
    const toSinger = function (id) {
        console.log(111)
        router.push({
        path: "/singerdetai",
        query: {
            id
        },
      });
      // router.push({
      //   path: "/singerDetail",
      //   query: {
      //     id
      //   },
      // });
    };
    watch(
      () => router.currentRoute.value.query,
      function () {
        areas.value = router.currentRoute.value.query.area;
        types.value = router.currentRoute.value.query.type;

        getGinnerList(areas.value, types.value).then((res) => {
          console.log(res.data.artists);
          singerDetails.details = res.data.artists;
          // 2021.5.12    接下来要做的事情是渲染界面   res就是要渲染的数据  刚开始进入歌手组件，最下面也要渲染一次默认的数据 也就是 刚进来下面需要展示  全部全部 热门的数据
        });
      }
    );
    return {
      singerDetails,
      toSinger,
    };
  },
};
</script>

<style scoped>
.indx {
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.singerList {
  width: 200px;
  height: 200px;
  margin-top: 5px;
}
.listImg img {
  width: 173px;
  height: 173px;
  border-radius: 5px;
  margin-left: 13px;
}
.singerName{
  text-align: center;
}
</style>
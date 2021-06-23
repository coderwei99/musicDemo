<template>
  <div>
    <el-carousel indicator-position="outside" type="card" height="200px">
      <el-carousel-item v-for="item in Dj.DjBanner" :key="item">
        <img :src="item.pic" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="type">
    <div
      class="type-list"
      v-for="item in Dj.DjType"
      :key="item.name"
      @click="goToThisCom(item.id)"
    >
      <div class="type-list-img">
        <img :src="item.pic56x56Url + '?param35*35'" />
      </div>
      <p>
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getDjBanner, getDjType } from "../../../http/requests";
export default {
  setup() {
    let router = useRouter();
    let Dj = reactive({
      DjBanner: [],
      DjType: [],
    });

    getDjBanner()
      .then((res) => {
        // console.log(res.data.data);
        Dj.DjBanner = res.data.data;
      })
      .then(() => {
        getDjType().then((res) => {
          // console.log(res);
          Dj.DjType = res.data.categories;
        });
      });

    const goToThisCom = function (type) {
      console.log(type);
      router.push({
        path: "/DjList",
        query: {
            type
        },
      });
    };
    return {
      Dj,
      goToThisCom,
    };
  },
};
</script>

<style scoped>
.el-carousel__ite {
  height: 200px;
}
.el-carousel__item img {
  width: 100%;
}
.type {
  display: flex;
  justify-content: space-between;
}
.type-list p {
  text-align: center;
  font-size: 13px;
  color: grey;
  margin-top: 8px;
}
.type-list-img {
  text-align: center;
  background: #fcebeb;
  border-radius: 35px;
  height: 55px;
  width: 55px;
  position: relative;
}
.type-list-img img {
  width: 36px;
  height: 36px;
  position: absolute;
  /* top: 35px; */
  top: 10px;
  left: 10px;
}
</style>
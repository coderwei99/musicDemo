<template>
  <div>
    <div class="listnav">
      <div class="listlist" :class="{ activeclass: isflag }" @click="btnClass1">
        新歌速递
      </div>
      <div
        class="lishilist"
        :class="{ activeclass: isflags }"
        @click="btnClass2"
      >
        新碟上架
      </div>
    </div>
    <div v-if="isshow">
      <div class="navTop">
        <div
          @click="typeClick(0)"
          class="laztClass"
          :class="{ addClass: add == 0 }"
        >
          全部
        </div>
        <div
          @click="typeClick(7)"
          class="laztClass"
          :class="{ addClass: add == 7 }"
        >
          华语
        </div>
        <div
          @click="typeClick(96)"
          class="laztClass"
          :class="{ addClass: add == 96 }"
        >
          欧美
        </div>
        <div
          @click="typeClick(8)"
          class="laztClass"
          :class="{ addClass: add == 8 }"
        >
          日本
        </div>
        <div
          @click="typeClick(16)"
          class="laztClass"
          :class="{ addClass: add == 16 }"
        >
          韩国
        </div>
        <!-- <router-link to="/findMusic/right-center-nav6/">全部</router-link>
        <router-link to="/findMusic/right-center-nav6/">华语</router-link>
        <router-link to="/findMusic/right-center-nav6/">欧美</router-link>
        <router-link to="/findMusic/right-center-nav6/">韩国</router-link>
        <router-link to="/findMusic/right-center-nav6/">日本</router-link> -->
      </div>
      <div id="content">
        <div
          v-for="(item, index) in newSonDetail.detailList"
          :key="item"
          class="items"
          @dblclick="getUrl(item.id)"
        >
          <div class="ind">
            {{ index + 1 }}
          </div>
          <div class="item-img">
            <img :src="item.album.picUrl + '?param=60y60'" alt="" />
          </div>
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-song">
            <span v-for="items in item.artists" :key="items">
              {{ items.name }}
            </span>
          </div>
          <div class="item-title">
            {{ item.album.name }}
          </div>
          <div class="item-time">
            {{ formatDate(new Date(item.mMusic.playTime), "mm:ss") }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div>3222</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { getTopSon, getSongUrl } from "../../../http/requests";
import { formatDate } from "../../songTime";
import store from "../../../store/index";

export default {
  setup() {
    let isflag = ref(true);
    let isflags = ref(false);
    let isshow = ref(true);
    const btnClass1 = function () {
      isflags.value = false;
      isflag.value = true;
      isshow.value = true;
    };
    const btnClass2 = function () {
      isflag.value = false;
      isflags.value = true;
      isshow.value = false;
    };

    let newSonDetail = reactive({
      detailList: [],
      detailTime: [],
    });
    getTopSon(0).then((res) => {
      console.log(res.data);
      newSonDetail.detailList = res.data.data;
      console.log(newSonDetail.detailTime);
    });

    let add = ref(0);
    const typeClick = function (type) {
      console.log(type);
      add.value = type;
      console.log(add.value);
      getTopSon(type).then((res) => {
        console.log(res);
        newSonDetail.detailList = res.data.data;
      });
    };
    let getUrl = function (id) {
      console.log(id);
      getSongUrl(id).then((res) => {
        console.log(res.data.data[0].url);
        store.commit("addSon", res.data.data[0].url);
      });
    };
    return {
      isflag,
      isflags,
      btnClass1,
      btnClass2,
      newSonDetail,
      formatDate,
      isshow,
      typeClick,
      add,
      getUrl,
    };
  },
};
</script>

<style scoped>
.listnav {
  display: flex;
  justify-content: center;
}
.listlist {
  width: 150px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: black;
  font-size: 13px;
  line-height: 30px;
  border: 1px solid black;
}
.lishilist {
  width: 150px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: black;
  font-size: 13px;
  line-height: 30px;
  border: 1px solid black;
}
.activeclass {
  border: 0;
  color: white;
  background: #bbbbbb;
}
.navTop {
  display: flex;
  justify-content: left;
}
.laztClass {
  margin-left: 40px;
  color: grey;
  font-size: 15px;
}
.navTop div:first-child {
  margin-left: 0;
}
.addClass {
  color: black;
  font-weight: 700;
}
.items {
  height: 80px;
  display: flex;
  margin-top: 5px;
}
.ind {
  width: 50px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: grey;
}
.item-img {
  width: 100px;
  height: 70px;
  text-align: center;
  padding-top: 10px;
}
.item-img img {
  border-radius: 5px;
}
.item-name {
  width: 550px;
  height: 80px;
  line-height: 80px;
}
.item-song {
  width: 150px;
  height: 80px;
  text-align: left;
  line-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: grey;
  font-size: 14px;
}
.item-title {
  width: 200px;
  height: 80px;
  line-height: 80px;
  padding-left: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: grey;
  font-size: 14px;
}
.item-time {
  width: 56px;
  height: 80px;
  text-align: right;
  padding-left: 70px;
  line-height: 80px;
  color: grey;
  font-size: 12px;

}
#content {
  margin-top: 30px;
}
#content > div:nth-of-type(Odd) {
  background: rgba(249, 249, 249);
}
</style>
<template>
  <div>
    <div>官方榜</div>
    <div class="item">
      <div class="itemHotlist" v-for="item in ranking.fiveList" :key="item.id">
        <div class="topimg" @click="goToDetail(item.id)">
          <img :src="item.coverImgUrl + '?param=200y200'" />
        </div>
        <div class="toplist">
          <el-table
            :data="fiveRight.list.slice(0, 5)"
            :show-header="falg"
            stripe
            style="width: 100%"
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="first" label="日期" width="750">
            </el-table-column>
            <el-table-column
              prop="second"
              label="日期"
              width="150"
              :align="rFlag"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="morelist">
        <div class="morelistname">全球榜</div>
        <div class="morelistdetail">
          <div
            class="morelistimg"
            v-for="item in fiveRight.morelist.slice(
              3,
              fiveRight.morelist.length
            )"
            :key="item.name"
            @click="gotolist(item.id)"
          >
            <div class="imgs">
              <img :src="item.coverImgUrl + '?param=170y170'" alt="" />
            </div>
            <div class="imgalt">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getRankingList, getSonRanking } from "../../../http/requests";
export default {
  setup() {
    let router = useRouter();
    let ranking = reactive({
      //  排行榜
      list: {},
      //   官方榜左边所需要展示的五条数据
      fiveList: {},
      //   存放前几个榜单所需要展示的五首歌的数据
      fiveRightList: {},
    });
    let fiveRight = reactive({
      morelist: [],
      list: [],
    });
    getRankingList().then((res) => {
      //   console.log(res.data.list);
      ranking.list = res.data.list;
      ranking.fiveList = res.data.list.slice(0, 5);
      // console.log(ranking.list);
      // console.log(ranking.fiveList);
      // getRankingTack(ranking.fiveList[0].id).then((res) => {
      //   fiveRight.list = res.data.playlist.tracks.slice(0,5);
      //   // console.log(fiveRight.list);
      // });
      getSonRanking().then((res) => {
        fiveRight.morelist = res.data.list;
        console.log(fiveRight.morelist);
        console.log(res.data.list[0].tracks);
        fiveRight.list = [
          ...res.data.list[0].tracks,
          ...res.data.list[1].tracks,
          ...res.data.list[2].tracks,
          ...res.data.list[3].tracks,
          ...res.data.list[4].tracks,
        ];
        console.log(fiveRight.list);
      });
    });
    const goToDetail = function (id) {
      console.log(id);
      router.push({
        path: "/gedanDetail",
        query: {
          id,
        },
      });
    };
    const gotolist = function (id) {
      console.log(id);
       router.push({
        path: "/gedanDetail",
        query: {
          id,
        },
      });
    };
    return {
      ranking,
      fiveRight,
      falg: false,
      rFlag: "right",
      goToDetail,
      gotolist,
    };
  },
};
</script>

<style scoped>
.item {
  width: 100%;
}
.itemHotlist {
  display: flex;
  margin-top: 15px;
}
.topimg {
  width: 20%;
  height: 250px;
  text-align: center;
}
.topimg img {
  border-radius: 10px;
  margin-top: 15px;
}
.toplist {
  box-sizing: border-box;
  width: 80%;
  height: 250px;
  padding-left: 30px;
}
.morelist {
  width: 100%;
}
.morelistdetail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 15px;
}
.morelistimg {
  padding: 0 15px;
}
.imgs img {
  border-radius: 5px;
}
.imgalt {
  padding: 5px 0;
  font-size: 15px;
}
</style>
<template>
  <div v-if="$store.state.flags == true">loading</div>
  <div v-else>
    <!-- <div class="clearfix">
      <div class="title">音乐标题</div>
      <div class="singer">歌手</div>
      <div class="zhuanji">专辑</div>
      <div class="time">时长</div>
    </div>
    <div class="detail clearfix" v-for="(item,index) in sonTackids.gequDetails" :key="item.id">
      <div class="indexa">
        {{ index+1 }}
      </div>
      <i class="el-icon-star-off"></i>
      <i class="el-icon-download"></i>
      <div class="singerDetail">
        {{ item.name }}
      </div>
      <div class="zhuanjiName" v-for="items in item.ar" :key = 'items.id'>
          {{items.name}}
      </div>
    </div> -->
    <table>
      <tr>
        <th></th>
        <th class="title">音乐标题</th>
        <th class="singer">歌手</th>
        <th class="zhuanji">专辑</th>
        <th class="time" @click="playMusic">时长</th>
      </tr>
      <tr
        v-for="(item, index) in sonTackids.gequDetails"
        :key="item.id"
        @dblclick="playMusic(item)"
      >
        <td class="indexa">
          {{ detai(index + 1) }}
          <i class="el-icon-star-off"></i>
          <i class="el-icon-download"></i>
        </td>
        <td class="title">
          <div>
            {{ item.name }}
          </div>
        </td>
        <td class="sin">
          <div>
            <span
              class="singerpaading"
              v-for="items in item.ar"
              :key="items.id"
            >
              {{ items.name }}
            </span>
          </div>
        </td>
        <td class="zhuanjidetail">
          <div>
            {{ item.al.name }}
          </div>
        </td>
        <td>{{ formatDate(new Date(item.dt), "mm:ss") }}</td>
      </tr>
    </table>
  </div>
  <!-- <el-table
      :data="sonTackids.gequDetails"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="日期s"
        width="180">
      </el-table-column>
    </el-table> -->
</template>


<script>
import store from "../../../store/index";
import { sonDetails, getSongUrl } from "../../../http/requests";
import { reactive, ref } from "vue";

import { formatDate } from "../../songTime";
export default {
  setup() {
    store.commit("setFlag");
    let insonsk = ref("");
    let sonTackids = reactive({
      //存放所有歌曲的tackids
      tackids: [],
      // 存放所有歌曲的信息,如歌名、歌手等等信息
      gequDetails: {},
      // 歌曲时长
      sonTime: "",
    });
    let istrids = ref("");
    setTimeout(() => {
      // console.log(store.state.gedanSonDetail);
      sonTackids.tackids = store.state.gedanSonDetail;
      // console.log(sonTackids.tackids);
      let trid = "";
      for (let i = 0; i < sonTackids.tackids.length; i++) {
        // console.log(sonTackids.tackids[i].id);
        trid = trid + sonTackids.tackids[i].id + ",";
      }
      // console.log(trid);
      trid = trid.slice(0, trid.length - 1);
      // console.log(trid);
      istrids.value = trid;
      // console.log(trid.length);

      // 用vuex中的
      sonDetails(trid).then((res) => {
        // console.log(res);
        sonTackids.gequDetails = res.data.songs;
        store.state.flags = false;
        // console.log(sonTackids.gequDetails);
      });
    }, 1500);

    const playMusic = function (item) {
      console.log(item.id);
      getSongUrl(item.id).then((res) => {
        // console.log(res.data.data[0].url)
        store.commit("addSon", res.data.data[0].url);
      });
      // console.log(store.state.gedanSonDetail,id)
      getSongUrl(istrids.value).then(() => {
        // console.log(res.data.data[0].url)
        store.commit("pushSongUrl", istrids.value);
        // console.log(istrids.value)
      });
    };
    const detai = function (index) {
      if (index < 10) {
        return "0" + index;
      }else{
        return index
      }
    };
    return {
      sonTackids,
      insonsk,
      formatDate,
      playMusic,
      detai,
    };
  },
};
</script>

<style scoped>
/* .title,
.singer,
.zhuanji,
.time {
  float: left;
} */
.title {
  width: 430px;
  margin-left: 168px;
  text-align: left;
}
.singer {
  width: 300px;
  text-align: left;
}
.zhuanji {
  width: 250px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  width: 130px;
  text-align: left;
}
.indexa,
.singerDetail,
.zhuanjiName {
  float: left;
}
.indexa {
  margin-left: 40px;
}
.el-icon-star-off {
  margin-top: 3px;
  padding-left: 10px;
}
.el-icon-download {
  margin-top: 3px;
  padding-left: 5px;
}
.singerDetail {
  margin-left: 45px;
}
.zhuanjiName {
  margin-left: 300px;
}
.singerpaading {
  padding-left: 10px;
}
.singerpaading:first-child {
  padding-left: 0;
}
.el-scrollbar {
  background: cadetblue;
  height: 400px;
}
.zhuanjidetail div {
  overflow: hidden;
  width: 210px;
}
/* td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
.title > div {
  width: 650px;
}
.sin div {
  width: 200px;
}
table {
  width: 1268px;
}
table tr {
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table tr:first-of-type(even) {
  background: gray;
}
</style>
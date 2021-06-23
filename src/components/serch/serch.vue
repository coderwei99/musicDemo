<template>
  <!-- <div>搜索起飞了------------------------------888{{ queId }}{{ hotword }}</div> -->
  <div class="index">
    <el-scrollbar height="500px">
      <el-container>
        <el-header>
          <div class="count">找到 {{ songcount }} 首单曲</div>
          <div class="nav-top">
            <div class="nav-list">
              <ul>
                <li
                  v-for="(item, index) in tags"
                  :key="item"
                  @click="tabtag(index)"
                  :class="{active:flag == index}"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </el-header>
        <el-main>
          <table>
            <tr>
              <th></th>
              <th class="musicTitle">音乐标题</th>
              <th class="musicSong">歌手</th>
              <th class="music">专辑</th>
              <th class="musicTime">时长</th>
            </tr>
            <tr
              v-for="(item, index) in ket.serchdetail"
              :key="item.id"
              class="cs"
              @dblclick="singlist(item.id)"
            >
              <td class="musicIndex">
                {{ index + 1 }}
                <i class="el-icon-star-off"></i>
                <i class="el-icon-download"></i>
              </td>
              <td class="musicTitle musicname">{{ item.name }}</td>
              <td class="musicSong">{{ item.artists[0].name }}</td>
              <td class="music">{{ item.album.name }}</td>
              <td class="musicTime">
                {{ formatDate(new Date(item.duration), "mm:ss") }}
              </td>
            </tr>
          </table>
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { formatDate } from "../songTime";
import { getValueSon, getSongUrl } from "../../http/requests";
import store from "../../store/index";
export default {
  setup() {
    let tags = ["单曲", "歌手", "专辑", "歌单", "歌词", "用户"];
    const router = useRouter();
    let queId = ref("");
    let hotword = ref("");
    queId.value = router.currentRoute.value.query.type;
    hotword.value = router.currentRoute.value.query.keywords;
    // console.log(queId);
    let ket = reactive({
      serchdetail: [],
    });

   getValueSon(router.currentRoute.value.query.keywords)
          .then((res) => {
            songcount.value = res.data.result.songCount;
            console.log(res.data.result.songCount);
            console.log(res.data.result.songs);
            ket.serchdetail = res.data.result.songs;
          })
          .catch((err) => err);


    let songcount = ref("");
    watch(
      () => router.currentRoute.value.query.keywords,
      function () {
        console.log(11);
        queId.value = router.currentRoute.value.query.type;
        hotword.value = router.currentRoute.value.query.keywords;
        getValueSon(router.currentRoute.value.query.keywords)
          .then((res) => {
            console.log(router.currentRoute.value.query.keywords)
            songcount.value = res.data.result.songCount;
            console.log(res.data.result.songCount);
            console.log(res.data.result.songs);
            ket.serchdetail = res.data.result.songs;
          })
          .catch((err) => err);
      }
    );
    getValueSon(hotword.value).then((res) => {
      console.log(res.data.result.songs);
      ket.serchdetail = res.data.result.songs;
    });
    const singlist = function (id) {
      console.log(id);
      getSongUrl(id).then((res) => {
        console.log(res.data.data[0].url);
        store.commit("addSon", res.data.data[0].url);
      });
    };
    let flag = ref()
    const tabtag = function (index) {
      flag.value = index

      console.log(index);
    };
    return {
      tags,
      queId,
      hotword,
      ket,
      formatDate,
      singlist,
      songcount,
      tabtag,
      flag
    };
  },
};
</script>

<style scoped>
.index {
  width: 83.6%;
  float: left;
}
.count {
  font-weight: 600;
}
.nav-top {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}
.nav-list {
  width: 600px;
  display: flex;
}
.nav-list ul {
  width: 600px;
  display: flex;
  justify-content: left;
}
.nav-list ul li {
  font-size: 13px;
  color: black;
  font-size: 14px;
}
.nav-list ul li {
  margin-left: 30px;
  padding-bottom: 5px;
}
.nav-list ul li:nth-child(1) {
  margin-left: 0px;
}
table {
  font-size: 13px;
  width: 80%;
  border-spacing: 0px 10px;
}
table th {
  text-align: left;
  color: gray;
}
table td {
  height: 30px;
}
.cs:hover {
  background: #f0f1f2;
}
.musicIndex {
  width: 43px;
}
.musicTitle {
  width: 679px;
  padding-left: 10px;
}
.musicSong {
  width: 200px;
}
.musicname {
  color: #747dbf;
}
table tr:nth-of-type(even) {
  background: rgba(249, 249, 249);
}
.el-scrollbar {
  height: 580px;
}
.active{
  border-bottom: 4px solid #ec4141;
}
</style>
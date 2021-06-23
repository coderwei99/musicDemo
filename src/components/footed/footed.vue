<template>
  <div class="vidow">
    <!-- <div class="footed-left">11</div> -->
    <left></left>
    <center :songvalue = songIndex></center>
    <right></right>
    <!-- <div class="footed-center"> -->
      <!-- <audio
        ref="video"
        autoplay
        :src="$store.state.listen"
      >
        Your browser does not support the audio element.
      </audio> -->
    <!-- </div> -->
    <!-- <div class="sonlist" v-for="item in audioUrl.urls" :key="item.id">
      {{ item.url }}
    </div> -->

    <i class="el-icon-s-unfold" @click="drawer = true" type="primary" style="margin-left: 16px">
    </i>
    <el-drawer title="sonlist" v-model="drawer" :with-header="false">

      <div class="listnav">
        <div class="listlist" :class="{'activeclass':isflag}" @click="btnClass1">播放列表</div>
        <div class="lishilist" :class="{'activeclass':isflags}" @click="btnClass2">历史记录</div>
      </div>
      <el-table
      :row-class-name="tableRowClassName"
        :data="audioUrl.songDetail"
        stripe
        style="width: 100%"
        max-height="850"
        @row-dblclick="btns"
        :show-header = 'fas'
        highlight-current-row
      >
        <el-table-column property="name" label="日期" width="180">
        </el-table-column>
        <el-table-column property="ar[0].name" label="日期" width="180">
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { reactive, watch, ref} from "vue";
import { useStore } from "vuex";
import { sonDetails, getSongUrl } from "../../http/requests";

import left from '../footed/footed/footedLeft';
import center from '../footed/footed/footedCenter';
import right from '../footed/footed/footedRight';
export default {
  components:{
      left,
      center,
      right
  },
  setup() {
    let audioUrl = reactive({
      urls: {},
      songDetail: [],
    });
    let songId = ref("");
    let video = ref(null);
    let drawer = ref(false);
    let store = useStore();
    watch(store.state.songUrl, function () {
      // 使用watch观察vuex保存的歌曲有没有发生变化，发生变化就说明用户切换了歌单，就更新数据，
      // console.log(store.state.songUrl.baseUrl);
      songId.value = store.state.songUrl.baseUrl;
      // console.log(audioUrl.urls);

      // 更新数据之后发送新的网络请求获取新歌曲的歌名  作者等等信息
      sonDetails(songId.value).then((res) => {
        console.log(res.data.songs);
        audioUrl.songDetail = res.data.songs;
      });
    });
    let listening =ref('')
    let songIndex = ref()
    const btns = function (row) {
      // console.log(111);
      // console.log(row);
      getSongUrl(row.id).then((res) => {
        // console.log(res.data.data[0].url);
        // console.log(video.value.src);
        // video.value.src = res.data.data[0].url;
        // console.log(video.value);
        // listening.value = res.data.data[0].url
        
        store.commit('addSon',res.data.data[0].url)
      });
      // console.log(row.index)
      songIndex.value = row.index
      // console.log(songIndex.value)
    };
    console.log(songIndex.value)
    const tableRowClassName = function({row, rowIndex}){
        	row.index = rowIndex;
        	return 'rows'
        }

    let isflag = ref(true)
    let isflags = ref(false)

    const btnClass1 = function() {
      isflags.value = false
      isflag.value = true

    }
    const btnClass2 = function() {
      isflag.value = false
      isflags.value = true
    }

    return {
      audioUrl,
      drawer,
      songId,
      btns,
      video,
      fas:false,
      isflag,
      isflags,
      btnClass1,
      btnClass2,
      listening,
      tableRowClassName,
      songIndex,
    };
  },
};
</script>

<style scoped>
.vidow {
  width: 100%;
  height: 67px;
  float: left;
  display: flex;
  justify-content: space-between;
}

.footed-left {
  width: 200px;
  height: 67px;
  background: red;
}

.footed-center {
  width: 550px;
  height: 67px;
  background: royalblue;
}

.footed-right {
  width: 200px;
  height: 67px;
  background: salmon;
}
.items {
  width: 200px;
  height: 200px;
  background: red;
}
.listnav{
  display: flex;
  justify-content: center;
}
.listlist{
  width: 150px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: black;
  font-size: 13px;
  line-height: 30px;
  border: 1px solid black;
}
.lishilist{
  width: 150px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: black;
  font-size: 13px;
  line-height: 30px;
  border: 1px solid black;
}
.activeclass{
  border: 0;
  color: white;
  background: #bbbbbb;
}
.el-icon-s-unfold{
  font-size: 20px;
  margin-top: 20px;
}
</style>


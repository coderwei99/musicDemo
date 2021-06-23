<template>
  <!-- <el-skeleton :rows="13" animated /> -->
  <div>
    <el-container>
      <el-header style="height: 30px">
        <!-- <router-link to="/navSonList" v-for="item in Detail.sonListType" :key="item.id">{{item.name}}</router-link> -->

        <el-tabs @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in Detail.sonListType"
            :label="item.name"
            :key="index"
          >

            <div
              class="content"
              v-for="items in Detail.typeList"
              :key="items.id"
              @click="getIdClick(items.id)"
            >
              <div class="itemlist">
                <img :src="items.coverImgUrl + '?param=200y200'" />
                <span>
                  {{ items.name }}
                </span>
              </div>
            </div>

            
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive} from "vue";
import { getHotSonListType, getTypeSonList } from "../../../http/requests";
export default {
  setup() {
    const router = useRouter();
    let Detail = reactive({
      sonListType: [],
      sonListDetail: {},
      typeList: [],
    });
    getHotSonListType().then((res) => {
      console.log(res.data.tags);
      Detail.sonListType = res.data.tags;
      // 进入歌单默认发送网络请求获取第一个标签页的歌单进行展示
      getTypeSonList(Detail.sonListType[0].name).then((res) => {
        console.log(res.data.playlists);
        Detail.typeList = res.data.playlists;
      });
    });
    const handleClick = function (tab, event) {
      if (tab.props.label !== Detail.sonListDetail) {
        console.log(tab.props.label, event);
        Detail.sonListDetail = tab.props.label;
        getTypeSonList(Detail.sonListDetail).then((res) => {
          console.log(res.data.playlists);
          Detail.typeList = res.data.playlists;
        });
      }
    };

    const getIdClick = function (id) {
      console.log(id);
      router.push({path:'/gedanDetail',query:{
        id
      }})
    };
    return {
      Detail,
      handleClick,
      // activeName: Detail.sonListType
      flag: true,
      getIdClick,
    };
  },
};
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: center;
  height: 25px;
  width: 100%;
}
a {
  margin: 0 35px;
  text-align: center;
  text-decoration: none;
  color: black;
}
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.content {
  width: 200px;
}
.itemlist img {
  border-radius: 5px;
}
.itemlist {
  font-size: 15px;
}
.itemlist span {
  line-height: 1px !important;
}
</style>
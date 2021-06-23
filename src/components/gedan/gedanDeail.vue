<template>
  <div class="gedanDetail">
    <!-- <ul>
      <li>{{ musicId }} </li>
      <li>{{ gedanList.tackids }} </li>
    </ul> -->
       <el-scrollbar>
    <div class="clearfix">
      <div class="gedanImg clearfix">
        <img :src="gedanList.thatGeDanDetail.coverImgUrl + '?param=200y200'" />
      </div>
      <div class="gedan-item">
        <div class="item-top clearfix">
          <div class="gedanTag">歌单</div>
          <h3>{{ gedanList.thatGeDanDetail.name }}</h3>
        </div>
        <div class="item-center clearfix">
          <router-link
            :to="{
              path: '/userDetail',
              query: {
                id: gedanList.thatGeDanDetail.userId,
              },
            }"
          >
            {{ userName }}
          </router-link>
          <p class="creatTime">{{ time }}创建</p>
        </div>
        <div class="listenMusic">
          <div class="listenmore">
            <i class="el-icon-caret-right"></i>
            播放全部
            <i class="el-icon-plus"></i>
          </div>
          <div class="like">
            <i class="el-icon-folder-add"></i>
            收藏({{ gedanList.thatGeDanDetail.subscribedCount }})
          </div>
          <div class="share">
            <i class="el-icon-paperclip"></i>
            分享({{ gedanList.thatGeDanDetail.shareCount }})
          </div>
          <div class="xiazai">
            <i class="el-icon-download"></i>
            下载全部
          </div>
        </div>
        <div class="bootom">
          <div>
            标签:
            <span
              v-for="item in gedanList.thatGeDanDetail.tags"
              :key="item.index"
            >
              <a href="javascript:;"> {{ item }}/ </a>
            </span>
          </div>
          <div class="item-bottom clearfix">
            <div class="songnumber">
              歌曲：{{ gedanList.thatGeDanDetail.trackCount }}
            </div>
            <div class="listCount">
              播放：{{ gedanList.thatGeDanDetail.playCount }}
            </div>
          </div>
          <div class="textdetail">
            <div class="textdel">
                  简介：{{ gedanList.thatGeDanDetail.description }}
            </div>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-menu
        default-active="/gedanDetail"
        class="el-menu-demo"
        mode="horizontal"
        router="true"
      >
        <el-menu-item index="/gedanDetail">
          <!-- <router-link to="/gedanDetail">  -->
          歌曲列表
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="/gedanDetail/pinglun">评论</el-menu-item>
        <el-menu-item index="/gedanDetail/likeuser">收藏者</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
</el-scrollbar>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

//
import { useRouter } from "vue-router";
import store from "@/store/index";
import request from "../../http/api";

export default {
  setup() {
    const router = useRouter();
    let musicId = ref("");
    let userName = ref("");
    let time = ref("");
    let gedanList = reactive({
      // 当前歌单的数据：name、id等等
      thatGeDanDetail: {},
      // 歌曲的tackids。详情看接口文档‘获取歌单项请’
      tackids: [],
      //
    });
    musicId.value = router.currentRoute.value.query.id;
    // console.log(musicId.value);

    // 发起网络请求获取歌单全部数据，这里在登陆后获取，不然歌单不完整
    request("/playlist/detail", {
      id: musicId.value,
    })
      .then((res) => {
        // 获取歌单的teackIds，然后用这个数组里面全部的数据请求一次son/detail接口即可拿到本歌单的所有歌曲用于渲染界面
        // console.log(res.data.playlist.trackIds);
        gedanList.thatGeDanDetail = res.data.playlist;
        // console.log(gedanList.thatGeDanDetail.userId);
        gedanList.tackids = res.data.playlist.trackIds;
        // console.log(gedanList.tackids);
        store.commit("getSonDetail", gedanList.tackids);

        // 初始化后端返回的时间
        const times = new Date(res.data.playlist.createTime);
        // console.log(times.getMonth()+1);
        // console.log(times.getFullYear());
        // console.log(times.getDate());
        time.value =
          times.getFullYear() +
          "-" +
          times.getMonth() +
          1 +
          "-" +
          times.getDate();
        // console.log(time.value);
      })
      //紧接着在返回的proims继续调用接口获取用户的name'
      .then(() => {
        // console.log(res);
        request("/user/detail", {
          uid: gedanList.thatGeDanDetail.userId,
        }).then((res) => {
          // console.log(res.data.profile.nickname);
          userName.value = res.data.profile.nickname;
        });
      })
      .then(() => {
        // console.log(gedanList.tackids);
      });

    // const Time = new Date(gedanList.thatGeDanDetail.createTime)

    // 将获取到的trackIds 传入新接口获取歌单的详细信息
    return {
      musicId,
      gedanList,
      userName,
      time,
    };
  },
};
</script>

<style scoped>
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.gedanDetail {
  float: left;
  width: 83%;
  height: 580px;
  padding-top: 20px;
  box-sizing: border-box;
}
.gedanImg {
  margin-top: 10px;
  margin-left: 15px;
  float: left;
  width: 17%;
}
.gedanImg img {
  border-radius: 5px;
}
.gedan-item {
  width: 200px;
  width: 78%;
  margin-top: 15px;
  float: left;
}
.item-top {
}
.gedanTag {
  border: 1px solid red;
  border-radius: 3px;
  color: #ee4141;
  width: 40px;
  height: 18px;
  line-height: 18px;
  font-size: 14px;
  text-align: center;
  float: left;
  margin-top: 7px;
}
.item-top h3 {
  float: left;
  margin-left: 8px;
  font-size: 25px;
}
.item-center {
  width: 78%;
  margin-top: 10px;
}
.item-center > a {
  color: #507daf;
  font-size: 13px;
  text-decoration: none;
  float: left;
}
.creatTime {
  float: left;
  font-size: 13px;
  color: gray;
}
.listenMusic {
  height: 50px;
  width: 100%;
}
.listenmore {
  height: 32px;
  width: 155px;
  border-radius: 15px;
  text-align: center;
  line-height: 32px;
  margin-top: 10px;
  color: white;
  background: red;
  font-size: 13px;
  float: left;
  cursor: pointer;
}
.like,
.share,
.xiazai {
  width: 100px;
  height: 30px;
  border: 1px solid grey;
  border-radius: 15px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  color: #373737;
  float: left;
  cursor: pointer;
}
.bootom {
  font-size: 12px;
  margin-top: 13px;
  color: #616161;
}
.bootom a {
  color: #507daf;
  text-decoration: none;
}
.item-bottom {
  margin-top: 5px;
}
.songnumber {
  float: left;
}
.listCount {
  float: left;
  margin-left: 10px;
}
.textdetail {
  margin-top: 5px;
}
.textdel{
  width: 230px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.el-icon-caret-bottom{
  float: right;
  margin-top: -40px;
}
</style>
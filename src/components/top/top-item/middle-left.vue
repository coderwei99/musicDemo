<template>
  <div id="indexs">
    <input
      @focus="messages"
      @blur="blues"
      type="text"
      v-model="calue"
      @keyup.enter="handleAddBook"
    />
    <i class="el-icon-search" @click="getInputValue"></i>
    <div class="jianyi" v-show="flags">
      <el-scrollbar height="400px">
        <p class="hotSouBang">热搜榜</p>
        <div
          class="item-list"
          v-for="(item, index) in state.htoSou"
          v-bind:key="item.searchWord"
        >
          <ul>
            <router-link @mousedown="nmsl(item)" to="/serch">
              <p class="fn">{{ index + 1 }}</p>
              <p class="itemTitle">{{ item.searchWord }}</p>
              <p class="itemContent">{{ item.content }}</p>
            </router-link>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";

import { useRouter } from "vue-router";
// import getInputValue from '../../../http/requests';
import request from "../../../http/api";

// import { getValueSonDetail } from "../../../http/requests";
export default {
  setup() {
    const router = useRouter();

    let calue = ref("");
    let state = reactive({
      htoSou: [],
    });
    let flags = ref(false);
    
    console.log(state)
    const nmsl = function (item) {
      calue.value = item.searchWord;
      router.push({
        path: "/serch",
        query: {
          keywords: item.searchWord,
        },
      });
      mins();
      // console.log(item.searchWord);
    };

    //  console.log(getInputValue());
    const messages = function () {
      flags.value = true;
    };
    const mins = function () {
      flags.value = false;
      console.log(111);
    };
    const blues = function () {
      flags.value = false;
      console.log(flags.value);
    };
    onMounted(() => {
      request("/search/default").then((res) => {
        // console.log(res.data.data.realkeyword);
        calue.value = res.data.data.realkeyword;
      }),
        request("/search/hot/detail").then((res) => {
          // console.log(res.data.data);
          state.htoSou = res.data.data;
        });
    });
    const getInputValue = function () {
      console.log(calue.value);
      router.push({
        path: "/serch",
        query: {
          keywords: calue.value,
        },
      });

      // getValueSonDetail(calue.value).then((res) => {
      //   console.log(res);
      //   router.push({
      //     path: "/serch",
      //     query: {
      //       type: calue.value,
      //     },
      //   });
      // });
    };
    const handleAddBook = function () {
      getInputValue()
      mins()
    };
    return {
      calue,
      messages,
      state,
      flags,
      mins,
      nmsl,
      getInputValue,
      blues,
      handleAddBook,
    };
  },
};
</script>

<style scoped>
#indexs {
  margin-left: 200px;
  float: left;
  display: block;
  margin-top: 25px;
  position: relative;
}
#indexs input {
  height: 31px;
  width: 201px;
  border-radius: 20px;
  border: 0;
  outline: none;
  font-size: 13px;
  padding-left: 15px;
}
.jianyi {
  width: 400px;
  height: 500px;
  background: white;
  position: absolute;
  z-index: 999;
  top: 31px;
  left: -50px;
  border-radius: 5px;
}
.hotSouBang {
  font-size: 13px;
  color: grey;
  margin-top: 30px;
  margin-left: 15px;
}
.item-list {
  width: 300px;
  height: 60px;
  margin-top: 10px;
}
.fn {
  width: 50px;
  height: 60px;
  float: left;
  color: red;
  text-align: center;
  line-height: 60px;
}
.itemTitle {
  padding-top: 15px;
  font-size: 13px;
  font-weight: bold;
}
.itemContent {
  color: #9f9f9f;
  margin-top: 5px;
  font-size: 12px;
}
a {
  text-decoration: none;
}
.el-icon-search {
  position: absolute;
  top: 8px;
  left: 190px;
}
</style>
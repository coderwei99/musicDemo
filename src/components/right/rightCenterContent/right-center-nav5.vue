<template>
  <div id="index">
    <div class="item">
      <div class="lang">
        语种：
        <ul class="lang-son" @click="btnclick">
          <li data-index="-1">全部</li>
          <li data-index="7">华语</li>
          <li data-index="96">欧美</li>
          <li data-index="8">日本</li>
          <li data-index="16">韩国</li>
          <li data-index="0">其他</li>
        </ul>
      </div>
      <div class="types">
        分类：
        <ul class="types-son" @click ='btnclick2'>
          <li data-type = '-1'>全部</li>
          <li data-type = '1'>男歌手</li>
          <li data-type = '2'>女歌手</li>
          <li data-type = '3'>乐队组合</li>
        </ul>
      </div>
      <div class="list-title">
       <p> 筛选：</p>
        <li class="list-z">热门</li>
        <ul class="listaz" @click="btnclick3">
            <li v-for="item in AZ.AZList" :key="item" :data-sub ='item' >{{ item }}</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { getGinnerList } from '../../../http/requests'
import {useRouter} from 'vue-router'
export default {
  setup() {
    let router = useRouter()
    const AZ = reactive({
      AZList: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T", "U","V","W","X","Y","Z"],
    });
    const first =  ref('-1')
    const second =  ref('-1')
    const three =  ref('')
    const btnclick = function (e) {
      let a = e.target;
      let index = a.getAttribute("data-index");
      // console.log(index);
      first.value = index
      getGinnerList(index,second.value).then(res =>{
      console.log(res);

      // 跳转路由
      router.push({path:'/findMusic/right-center-nav5/singerList',
        query:{
          area:index,
          type:second.value
        }
      })
    })
    };

    const btnclick2 = function(e){
      let a = e.target;
      let type = a.getAttribute("data-type");
      // console.log(type);
      second.value = type
      getGinnerList(first.value,type).then(res =>{
      console.log(res);

      
      // 跳转路由
      router.push({path:'/findMusic/right-center-nav5/singerList',
        query:{
          area:first.value,
          type,
        }
      })
    })
    }

    const btnclick3 =function(e){
      let a = e.target
      let sub = a.getAttribute('data-sub')
      console.log(sub);
    }

    getGinnerList(second.value,first.value).then(res =>{
      console.log(res);
    })
    return {
      AZ,
      btnclick,
      btnclick2,
      btnclick3,
      first,
      second,
      three
    };
  },
};
</script>

<style scoped>
.item {
  font-size: 13px;
  color: #676767;
  font-weight: 200;
}
.lang {
  display: flex;
}
.lang-son{
  display: flex;
  cursor: pointer;
}
.lang-son li {
  padding-left: 35px;
  padding-right: 35px;
  text-align: center;
}

.types {
  margin-top: 10px;
  display: flex;
}
.types li {
  padding-left: 35px;
  padding-right: 35px;
  text-align: center;
}
.types-son{
  display: flex;
  cursor: pointer;
}
.listaz {
  display: flex;
  flex-wrap: wrap;
}
.listaz li {
  padding-left: 35px;
  padding-right: 35px;
  text-align: center;
  display: flex;
}
.list-title {
  display: flex;
  margin-top: 10px;
  cursor: pointer;
}
.list-title p{
  width: 90px;
}
.list-a-z {
  flex-grow: 5;
  display: flex;
  flex-wrap: wrap;
}
.list-z{
  width: 70px;
  padding-left: 25px;
  padding-right: 35px;
}
</style>
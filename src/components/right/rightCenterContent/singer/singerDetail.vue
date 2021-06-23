<template>
  <div>{{singerid}}
    1111
    <div>{{thisSingerDetail.thisDetail.videoCount}}</div>
    <div>{{thissingerde.miaoshu.name}}</div>
    <div>{{thissingerde.miaoshu.musicSize}}</div>
    <div>{{thissingerde.miaoshu.albumSize}}</div>
  </div>
</template>

<script>
import { reactive, ref,watch } from 'vue'
import { useRouter } from "vue-router";
import {getSingerDetails} from '../../../../http/requests'
export default {
    setup(){
        let router = useRouter();
        let singerid = ref('')
        let thisSingerDetail = reactive({
          thisDetail:{}
        })
        let thissingerde=reactive({
          miaoshu:{}
        })
        singerid.value = router.currentRoute.value.query.id
        console.log(singerid.value)


    getSingerDetails(singerid.value).then(res=>{
      console.log(res.data.data)
      thisSingerDetail.thisDetail = res.data.data
      thissingerde.miaoshu = res.data.data.artist
    })
  watch(
      () => router.currentRoute.value.query,
      function () {
        singerid.value = router.currentRoute.value.query.id;
        console.log(singerid.value)
      }
    );
        return{
            singerid,
            thisSingerDetail,
            thissingerde
        }
    }
}
</script>

<style scoped>

</style>
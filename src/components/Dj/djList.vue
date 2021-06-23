<template>
    <div>
        {{DjTypeId}}
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router'

import {getDjTypeList} from '../../http/requests'
export default {
    setup(){
        let router = useRouter()
        let DjTypeId = ref('')
        let DjDetail = reactive({
            type:[]
        })
         DjTypeId.value= router.currentRoute.value.query.type;
        
        getDjTypeList(DjTypeId.value).then(res =>{
            console.log(res.data.djRadios);
        })


         return{
             DjTypeId,
             DjDetail
         }
    }
}
</script>

<style scoped>

</style>
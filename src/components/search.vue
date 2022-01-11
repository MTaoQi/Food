<template>

<form action="/" >
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    @search="onSearch"
     shape="round"
    background="#ccc"
  >
  <template #left >
    <!-- <div @click="go">返回</div> -->
   <van-icon name="arrow-left"  @click="go">返回</van-icon>
  </template>
  </van-search>
</form>

  <div class="box1">
    <div v-for="(v,i) in list" :key="i">
        <div class="b1">
      <img :src="img+v.pic" alt="">
           <div class="b2">
        <span>{{ v.foodname}}</span>
        <span>￥:{{v.price}}</span> 
           </div>
       </div>
    </div>
  </div>
</template>
<script>
import { useRoute,useRouter } from "vue-router";
import {ref,} from "vue";
import { Search,Toast,Icon, } from 'vant';
export default {
    
  name: "搜索页面",
  components: {
    [Search.name]:Search,
    [Icon.name]:Icon,
  },
  setup() {
     const value = ref('');
    const onSearch = (val) => Toast(val);
     const go=()=>{
       router.push("/Main");
     };
  const img = ref("/api");
   const list =ref([]);
   const route = useRoute();
    const router = useRouter();
    const content = route.params.content;
    const axios = require('axios');
    // 向给定ID的用户发起请求
    //表 13 搜索菜谱/口味接口
    axios.get("/api/getFoodBySearch.do?search="+content)
    .then(function (response) {
        // 处理成功情况
        console.log(response);
        list.value=response.data;
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })
    .then(function () {
        // 总是会执行
    });
    return {
        list,
        img,
         value,
      onSearch,
      go,
    
    };
  },
};
</script>
<style scoped>
.b1{
  display: flex;
  margin: 30px;
}
.b1 img{
  width: 10rem;
  height: 8rem;
  border-radius:2rem;
}
.b2{
  display: flex;
  margin: 0px auto;
    flex-direction: column;
    justify-content: space-around;
    align-content: flex-end;
    align-items: center;
}


</style>
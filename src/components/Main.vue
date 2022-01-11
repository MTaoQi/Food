<template>
<!-- 搜索栏 -->
  <div class="d1">
  <!-- <form action="/">
  <van-search
    show-action
    placeholder="请输入搜索关键词"
  />
</form> -->
<form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>

  </div>
  <!-- 轮播图 -->
  <div class="d2">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <!-- <div v-for="(v, i) in list" :key="i">
        <van-swipe-item><img :src="img + v.pic" alt="" /></van-swipe-item>
      </div> -->
      <div v-for="(v, i) in caresouls" :key="i">
        <van-swipe-item><img :src="img + v.src" alt="" /></van-swipe-item>
      </div>
    </van-swipe>
  </div>
  <!-- TAB选项卡 -->
  <div class="d3">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
  <!-- 上图下文 -->
  <div class="d4">
    <ul>
      <li v-for="(v, i) in shops" :key="i">
   <img :src="img + v.pic" @click="editor(v.shop_id)" />
        <h4>{{ v.shopname }}</h4>
        <p>{{ v.intro }}<van-rate v-model="v.level" /></p>
      </li>    
    </ul>
  </div>
  <!-- 下导航 -->
  <div class="d5">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="Main">首页</van-tabbar-item>
       <!-- <router-link to="/Collection"> -->
      <van-tabbar-item icon="star-o" dot to="Collection">收藏</van-tabbar-item>
      <!-- </router-link> -->
        <van-tabbar-item icon="shopping-cart" badge="5" to="shopping" >购物车</van-tabbar-item>

      <van-tabbar-item icon="user-o" dot to="My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import bnav from "./bnav.vue"
import { ref } from "vue";
import { Search,Swipe, SwipeItem,DropdownMenu, DropdownItem,Tabbar, TabbarItem,Rate,Toast} from 'vant';
// import router from "../router/index.js";
import {useRouter} from "vue-router";
export default {
  name: "店铺列表",
  components: {
    [Search.name]:Search,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem,
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [Rate.name]:Rate,
  },

  // methods: { editor(row){
      
  //     this.$router.push("/detail/"+ row);
  //   },
  
  //   },
  setup() {
    
     const value = ref('');
    const onSearch = (val) => {
    router.push("/search/"+val);
        
    };
    const onCancel = () => Toast('取消');

     const router = useRouter();
     const editor = (row) => {
        var str2=row;
        sessionStorage.setItem('k2', str2);
      router.push("/detail/"+ row);
    };
    const shops = ref([]);
    const caresouls=ref([]);
    const img = ref("/api/");
    const axios = require("axios");
   
    // 店铺列表 向给定ID的用户发起请求  表3
    const getAllShops = () => {
      return axios.get(
        "/api/getAllShops.do"
      );
    };
    const getCarousels = () => {
      // 店铺轮播图 表26
      return axios.get(
        "/api/getCarousels.do"
      );
    };
    axios
      // .get("/api/getAllShops.do")
       .all([getAllShops(), getCarousels()])
      .then(function (response) {
        // 处理成功情况
        
        shops.value = response[0].data;
        caresouls.value=response[1].data;
        console.log(response);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
      
    return {
    
      img,
      shops,
      caresouls,
      value1: 0,
      value2: "a",
      option1: [
        { text: "综合排序", value: 0 },
        { text: "销量优先", value: 1 },
        { text: "好评优先", value: 2 },
      ],
      option2: [
        { text: "外卖", value: "a" },
        { text: "打包带走", value: "b" },
      ],
      editor,
       value,
      onSearch,
      onCancel,
    };
  },
};
</script>

<style scoped>

.d2 img {
  width: 100%;
  border-radius: 2rem;
  transform:rotate(7deg);
-ms-transform:rotate(7deg); 	/* IE 9 */
-moz-transform:rotate(7deg); 	/* Firefox */
-webkit-transform:rotate(7deg); /* Safari 和 Chrome */
-o-transform:rotate(7deg); 	/* Opera */
}
.d3{
  margin-top: -30px;
}

ul {
  display: flex;
  flex-wrap: wrap; /* 换行 */
  padding: 8px;
}
li {
  width: 30%;
  flex-grow: 1; /* 填满 */
  margin-left: 8px;
}
.d4 img {
  width: 100%;
  border-radius: 1rem;
}
.d4 {
margin-bottom: 100px;
  
}
.d4 ul{
  background-color: #ccc;
}
.d4 li{
  background-color: white;
  border-radius: 1rem;
}
h4 {
  font-size: 14px;
  color: #039;
  /* line-height: 33px; */
  line-height: 18px;
  text-align: center;
}
p {
  font-style: 14px;
  color: #999;
  line-height: 18px;
}
</style>
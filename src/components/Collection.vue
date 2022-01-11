<template>
  <div class="box1">
    <van-nav-bar
      title="收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="box2">
    <van-tabs v-model:active="active">
      <van-tab title="店铺">
        <div v-for="(v, i) in dlist" :key="i">
          <div class="box3">
            <div class="box4"><img :src="img + v.pic" alt="" /></div>
            <div class="box5">
              <span>{{ v.shopname }}</span>
              <span>{{ v.address }}</span>
            </div>
            <div class="box5">
              <van-button type="primary" @click="dpdetail(v.shop_id)"
                >进入</van-button
              >
              <van-button type="primary" @click="getuserCollectShop(v.shop_id)">
                取消</van-button
              >
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="菜谱">
        <div v-for="(v, i) in clist" :key="i">
          <div class="box3">
            <div class="box4"><img :src="img + v.pic" alt="" /></div>
            <div class="box5">
              <span>{{ v.foodname }}</span>
              <span>{{ v.price }}元</span>
            </div>
            <div class="box5">
              <van-button type="primary" @click="cpdetail(v.food_id)"
                >进入</van-button
              >
              <van-button type="primary" @click="getuserCollectFood(v.food_id)"
                >取消</van-button
              >
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="d5">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="Main">首页</van-tabbar-item>
        <!-- <router-link to="/Collection"> -->
        <van-tabbar-item icon="star-o" dot to="Collection"
          >收藏</van-tabbar-item
        >
        <!-- </router-link> -->
        <van-tabbar-item icon="shopping-cart" badge="5" to="shopping">购物车</van-tabbar-item>

        <van-tabbar-item icon="user-o" dot to="My">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Tab, Tabs, Button, Tabbar, TabbarItem } from "vant";
export default {
  name: "收藏列表",
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const active = ref(0);
    const userid = ref(sessionStorage.getItem("k"));
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/Main");
    };
    const axios = require("axios");
    const dlist = ref([]);
    const clist = ref([]);
    const img = ref("/api");
    //进入 店铺详情进入
    const dpdetail = (dpid) => {
      router.push("/detail/" + dpid);
    };
    //进入 菜谱详情进入
    const cpdetail = (cpid) => {
      router.push("/Recipedetails/" + cpid);
    };
    //表10  店铺取消用户收藏
    const getuserCollectShop = (dpid) => {
      axios
        .get(
          "/api/userCollectShop.do?user_id=" +
            userid.value +
            "&shop_id=" +
            dpid
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          getAllUserCollection();
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    };
    /* /api/userCollectFood.do?user_id=1&food_id=1 */
    //表11  菜谱取消用户收藏
    const getuserCollectFood = (cpid) => {
      axios
        .get(
          "/api/userCollectFood.do?user_id=" +
            userid.value +
            "&food_id=" +
            cpid
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          getAllUserCollection();
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    };
    // 向给定ID的用户发起请求
    //表9  0店
    const getAllUserCollection1 = () => {
      return axios.get(
        "/api/getAllUserCollection.do?user_id=" +
          userid.value +
          "&flag=0"
      );
    };
    //表9 1菜
    const getAllUserCollection2 = () => {
      return axios.get(
        "/api/getAllUserCollection.do?user_id=" +
          userid.value +
          "&flag=1"
      );
    };

    const getAllUserCollection = onMounted(() => {
      axios
        .all([getAllUserCollection1(), getAllUserCollection2()])
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          dlist.value = response[0].data;
          clist.value = response[1].data;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    });

    return {
      onClickLeft,
      active,
      dlist,
      clist,
      img,
      getuserCollectShop,
      getAllUserCollection,
      dpdetail,
      cpdetail,
      getuserCollectFood,
    };
  },
};
</script>
<style scoped>
.d5{
  margin-top: 100px;
}
.box3 {
  display: flex;
  justify-content: space-around;
}
.box4 {
  /* width: 100px; */
  margin-bottom: 12px;
}
.box4 img {
  display: flex;
  width: 130px;
  height: 100px;
  border-radius: 2rem;
  border: 1px solid black;
}
.box5 {
  display: flex;
  flex-flow: column;
  margin-left: 20px;
  justify-content: space-around;
}
/* .box7{
    display: flex;
    flex-flow: column;
    justify-content: space-around;
} */
</style>
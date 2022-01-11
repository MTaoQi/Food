<template>
  <div class="box1">
    <van-nav-bar
      title="我的"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="box23">
    <div class="box2">
      <van-row gutter="60">
        <van-col span="8" class="b1">
          <img src="../assets/2.jpg" alt="" />
        </van-col>
        <van-col span="16" class="b2">
          <span>{{ info.username }}</span>
          <span>手机号:{{ info.mobilenum }}</span>
        </van-col>
      </van-row>
    </div>
    <div class="box3">
      <van-row gutter="50">
        <van-col span="24" class="p1" @click="update()">
          <van-icon name="user-o" color="#FF7F00" size="25" />
          <span>修改个人信息</span>
          <van-icon name="arrow" />
        </van-col>
        <van-col span="24" class="p1" @click="shoucang()">
          <van-icon name="like" color="#FF0000" size="25" />
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </van-col>
        <van-col span="24" class="p1" @click="pinglun()">
          <van-icon name="chat" color="#00FF00" size="25" />
          <span>我的评论</span>
          <van-icon name="arrow" />
        </van-col>
        <van-col span="24" class="p1" @click="dingdang()">
          <van-icon name="balance-list" color="#1E90FF" size="25" />
          <span>我的订单</span>
          <van-icon name="arrow" />
        </van-col>
      </van-row>
    </div>
  </div>
  <div class="d5">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="Main">首页</van-tabbar-item>
      <!-- <router-link to="/Collection"> -->
      <van-tabbar-item icon="star-o" dot to="Collection">收藏</van-tabbar-item>
      <!-- </router-link> -->
      <van-tabbar-item icon="shopping-cart" badge="5" to="shopping">购物车</van-tabbar-item>

      <van-tabbar-item icon="user-o" dot to="My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { NavBar, Col, Row, Icon, ContactEdit, Tabbar, TabbarItem } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "个人中心",
  components: {
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [ContactEdit.name]: ContactEdit,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const info = ref({});
    const userid = ref(sessionStorage.getItem("k"));
    const router = useRouter();
    const update = () => {
      router.push("/updatemy");
    };
    const shoucang = () => {
      router.push("/Collection");
    };
    const dingdang = () =>{
      router.push("/Orders");
    };
    const pinglun = () =>{
      router.push("/Comments");
    };
    const onClickLeft = () => {
      router.push("/Main");
    };
    const axios = require("axios");

    // 向给定ID的用户发起请求
    axios
      //表20 获取用户信息
      .get(
        "/api/getUserById.do?user_id=" +
          userid.value
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        info.value = response.data;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });

    return {
      onClickLeft,
      info,
      update,
      shoucang,
      dingdang,
      pinglun,
    };
  },
};
</script>
<style scoped>
.b1 img {
  width: 70%;
  border-radius: 10rem;
}
.b2 {
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  /* flex-flow: column; */
 
}
.p1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  font-size: 18px;
}
.box23 {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ccc;
  border: 1px solid #ccc;
}
.box2 {
  border-radius: 1rem;
  background-color: #fff;
  border: 1px solid #fff;
  display: flex;
  padding: 25px;
  margin: 15px 5px 0px ;
}
.box3 {
  background-color: #fff;
  border: 1px solid #fff;
  margin: 10px 5px;
  border-radius: 1rem;
  padding-bottom: 100px;
}
</style>
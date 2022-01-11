<template>
  <div class="box1">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
 
  <div class="box2">
    <div v-for="(v, i) in list" :key="i">
      <div class="box3">
        <div class="b1"><img :src="img + v.pic" alt="" /></div>
        <div class="b2">
          <span>{{ v.foodname }}</span>
          <span>￥:{{ v.price }}</span>
        </div>
        <div class="b3">
          <van-button plain type="primary" @click="buy(v.item_id)">购买</van-button>
          <van-button plain type="primary" @click="del(v.item_id)">删除</van-button>
          <van-stepper
            v-model="v.num"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
    </div>
  </div>
 
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
   {{car}}
 
</template>
<script>
import { NavBar, Button, Stepper , Tabbar, TabbarItem, Toast , } from "vant";
import { useRouter } from "vue-router";
import { onMounted,  ref } from "vue";
export default {
  name: "购物车",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const img = ref("/api");
    const userid = ref(sessionStorage.getItem("k"));
    const list = ref({});
    const addlist=ref([]);
    const car= ref([]);
    const buysuccess =ref();
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/Main");
    };
    const shoppdel=ref();
    const axios = require("axios");
     
    //表 24 购物车中选择下单
    const buy = (itemid)=>{
    // 向给定ID的用户发起请求
    axios.get("/api/getItemsFromCart.do?items="+itemid)
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        car.value=response.data;
        console.log(car.value[0].price * car.value[0].num);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
                //表30 获取当前用户所有地址
        axios.get(
           " /api/getAddressesByUser.do?user_id=" +
            userid.value
        )
        .then(function (response) {
            // 处理成功情况
             addlist.value = response.data;
             console.log(response);
           })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
            })
            .then(function () {
              // 总是会执行
                  // 从购物车选择下单 表25 
              axios.get("/api/insertOrder2.do?user_id="+userid.value+
              "&address_id="+ addlist.value[0].address_id+"&sum="+car.value[0].price * car.value[0].num+
              "&suggesttime=9:00--12:00&items="+itemid)
                .then(function (response) {
                  // 处理成功情况
                  console.log(response);
                  buysuccess.value=response.data.success;
                  if  (buysuccess.value != 0){
                      Toast("成功购买");
                  }
                  
                })
                .catch(function (error) {
                  // 处理错误情况
                  console.log(error);
                })
                .then(function () {
                  // 总是会执行
                });
           });

      });
    };
    //删除购买项目 表23
    const del = (itemid) => {
      // 向给定ID的用户发起请求
      axios
        .get("/api/deleteCartItem.do?item_id="+itemid)
        .then(function (response) {
          // 处理成功情况
          shoppdel.value=response.data.success;
          if(shoppdel.value==1){
            gowuche();
          }
          console.log(response);
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    };
    const gowuche = onMounted(() => {
      //获取当前购物车内容 表22
      // 向给定ID的用户发起请求
      axios
        .get(
          "/api/getMyCartByUser.do?user_id=" +
            userid.value
        )
        .then(function (response) {
          // 处理成功情况
          list.value = response.data;
          // for (let i = 0; i <= list.value.length; i++) {
          //    a.value.push(response.data.item_id);
          // }
          console.log(response);
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
      gowuche,
      list,
      img,
      del,
      shoppdel,
       buy,
        car,
        
    };
  },
};
</script>
<style scoped>
.box2{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ccc;
  border:1px solid #ccc;
}
.box3 {
  height: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  margin: 1rem;
  border-radius: 1rem;
}
.b1 img {
  width: 120px;
  height: 120px;
  margin: 20px;
  border-radius: 1rem;
}
.b2 :nth-child(2) {
  color: red;
}
.b2,
.b3 {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
</style>
<template>
  <div class="box1">
    <span class="iconfont icon-arrow-fine-up-copy" @click="recp()">&nbsp;确认下单</span>
  </div>
  <div class="box">
    <div class="box2">
      <span>购买人:{{ uinfo.username }}</span>
      <span>配送地址:{{ list[0].address }}</span>
      <van-divider></van-divider>
    </div>
    <div class="box3">
      <span>送达时间</span>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="box4">
      <span class="iconfont icon-dianpu">&nbsp;&nbsp;{{ dinfo }}</span>
      <van-divider></van-divider>
    </div>
    <div class="box5">
      
      <span>{{ cinfo.foodname }}</span>
      <span>￥{{ cinfo.price }}</span>
      <van-divider></van-divider>
    </div>
    <div class="box6">
     
      <van-stepper v-model="value" />
      <span>{{ value }}份</span>
    </div>
    <div class="box7">
       <span>总计:￥{{ getsum() }}</span>
     </div>
       <div class="box77">
       <span>下单时间:{{ gettime() }}</span>
       </div>
   
    <div class="box8">
      <span>￥{{ getsum() }}</span>
      <button @click="buy()" >提交订单</button>
    </div>
  </div>
</template>   
<script>
import "../assets/font/iconfont.css";
import { DropdownMenu, DropdownItem, Stepper, Toast, Divider } from "vant";
import { useRoute } from "vue-router";
import { ref } from "vue";
import router from '../router';
export default {
  name: "buy",
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Stepper.name]: Stepper,
    [Divider.name]: Divider,
  },
    watch: {
    $route(to, from) {
      // 对路由变化作出响应
      if (to != from) {
        window.location.reload();
      }
    },
  },
  setup() {
    const value = ref(1);
    const userid = ref(sessionStorage.getItem("k"));
    const uinfo = ref();
    const cinfo = ref();
    const dinfo = ref();
    const list = ref([]);
    const goshop = ref();
    const route = useRoute();
    const id = route.params.id;
    const getsum = () => {
      return cinfo.value.price * value.value;
    };
    const recp =()=>{
      router.push("/Recipedetails/"+id);
    };
    const gettime = () => {
      return (
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
      );
    };
    const axios = require("axios");
    //直接购买 表5
    const buy = () => {
      axios
        .get(
          "/api/insertOrder.do?user_id=" +
            userid.value +
            "&food_id=" +
            id +
            "&num=" +
            value.value +
            "&sum=" +
            getsum() +
            "&suggesttime=11:00-11:30&address_id=" +
            list.value[0].address_id
        )

        .then(function (response) {
          // 处理成功情况
          console.log(response);
          goshop.value = response.data.success;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
          if (goshop.value == 1) {
            Toast("购买成功");
          }
        });
    };

    // 获取用户信息 表20
    const getUserById = () => {
      return axios.get(
        "/api/getUserById.do?user_id=" +
          userid.value
      );
    };
    //表30 获取当前用户所有地址
    const getAddressesByUser = () => {
      return axios.get(
        " /api/getAddressesByUser.do?user_id=" +
          userid.value
      );
    };
    //c菜谱详情 表7
    const getFoodById = () => {
      return axios.get(
        "/api/getFoodById.do?food_id=" + id
      );
    };

    // 向给定ID的用户发起请求
    axios
      .all([getUserById(), getAddressesByUser(), getFoodById()])
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        uinfo.value = response[0].data;
        list.value = response[1].data;
        cinfo.value = response[2].data;
        
        // 向给定ID的用户发起请求
        axios
          //店铺详情 表6
          .get(
            "/api/getShopById.do?shop_id=" +
              cinfo.value.shop_id
          )
          .then(function (response) {
            // 处理成功情况
            console.log(response);
            dinfo.value = response.data.shopname;
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error);
          })
          .then(function () {
            // 总是会执行
          });
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });

    return {
      uinfo,
      cinfo,
      list,
      value1: 0,
      option1: [
        { text: "10:30", value: 0 },
        { text: "11:30", value: 1 },
        { text: "12:30", value: 2 },
        { text: "17:30", value: 3 },
        { text: "18:30", value: 4 },
      ],
      value,
      getsum,
      gettime,
      buy,
      dinfo,
      recp,
    };
  },
};
</script> 
<style scoped>
.box1 span {
  width: 100%;
  line-height: 60px;
  position: fixed;
  z-index: 9;
  background-color: #1e90ff;
  font-size: 20px;
  padding-left: 10px;
  color: #fff;
}
.box2 {
  display: flex;
  flex-flow: column;
  background-color: #fff;
  border: 1px solid #fff;
  margin: 80px 0px 0px 0px;
}
.box2 span {
  line-height: 50px;
  font-size: 18px;
  padding-left: 30px;
}
.box3 {
  align-items: center;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border: 1px solid #fff;
  margin: 0px 0px 30px 0px;
}

.box {
  background-color: #ccc;
  border: 1px solid #ccc;
}

.box4 {
  padding-top: 25px;
  padding-left: 30px;
  background-color: #fff;
  border: 1px solid #fff;
}
.box4 span {
  line-height: 20px;
  font-size: 18px;
}
.icon-dianpu:before {
  color: #1e90ff;
  font-size: 25px;
}
.box5 {
  display: flex;
  justify-content:space-around;
  background-color: #fff;
  border: 1px solid #fff;
  font-size: 18px;
 padding:10px 0px;
}
.box6 {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border: 1px solid #fff;
  padding:20px 0px;
}
.box7{
  /* display: flex;
  flex-flow: column; */
  font-size: 18px;
  padding-left: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px 0px 20px 30px;
}
.box77{
  font-size: 18px;
  margin: 15px 0px;
  padding: 20px 0px;
  background-color: #fff;
  border: 1px solid #fff;
  padding-left: 30px;
}
.box8{
 font-size: 25px;
 padding: 15px;
 margin: 10px 0px 0px 0px;
  background-color: #fff;
  border: 1px solid #1e90ff;
  display: flex;
  justify-content:space-around;
}
button{
  border-color: #1e90ff;
}

</style>
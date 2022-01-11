<template>
  <div class="box1">
    <span class="iconfont icon-zuojiantou" @click="reshow()">商品详情</span>
    <img :src="img + info.pic" alt="" />
  </div>
  <div class="sum23">
    <div class="box2">
      <div class="b1">
        <span>{{ info.foodname }}</span>
        <div class="b2">
          <span>￥{{ info.price }}</span>
        </div>
      </div>
    </div>
    <div class="box3">
      <span
        class="iconfont icon-shoucang"
        :style="style"
        @click="cisshoucang131()"
        >收藏菜品</span
      >
      <van-icon name="add" color="#00BFFF" size="25" @click="showPopup" />
    </div>
  </div>
  <div class="ssum45">
    <div class="sum45">
      <div class="box4"><span>商品简介</span></div>
      <div class="box5">
        <span>商品编号：{{ info.shop_id }}</span>
        <span>主要原料：{{ info.intro }}</span>
        <span>种类编号：{{ info.type_id }}</span>
      </div>
    </div>
  </div>

  <div class="box10">
    <div class="box6">
      <div class="box4">商品评价</div>
      <div v-for="(v, i) in list" :key="i">
        <div class="box9">
          <div class="box7">
            <span>{{ v.username }}</span>
            <span>{{ v.content }}</span>
          </div>
          <div class="box8">
            <span>{{ v.comment_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-submit-bar
    :price="info.price * 100"
    button-text="去结算"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checked">全选</van-checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
    </template>
  </van-submit-bar>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
    <div class="car">
      <div class="car1">
        <img :src="img + info.pic" alt="" />
      </div>
      <div class="car2">
        <span>价格:￥{{ info.price }}</span>
        <span>购买数量:<van-stepper v-model="value" /></span>
      </div>
    </div>
    <van-button type="primary" block class="add" @click="shopping" >
     确定</van-button >
   
  </van-popup>
</template>
<script>
import "../assets/font/iconfont.css";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  NavBar,
  Icon,
  Toast,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Popup,
  Stepper,
  Button,
} from "vant";
export default {
  name: "菜品详情",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [Stepper.name]: Stepper,
    [Button.name]: Button,
  },
  //路由参数更新页面不刷新
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      if (to != from) {
        window.location.reload();
      }
    },
  },
  setup() {
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const gowu = ref();
    //表21 加入购物车
    const shopping = () => {
      // 向给定ID的用户发起请求
      axios
        .get("/api/addCart.do?user_id="+userid.value+"&food_id="+id+"&num="+value.value)
        .then(function (response) {
         gowu.value=response.data.success;
         if(gowu.value==1){
            Toast("成功加入购物车");
         }
          // 处理成功情况
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
    const value = ref(1);
    const dpid = ref(sessionStorage.getItem("k2"));
    const router = useRouter();
    const reshow = () => {
      router.push("/detail/" + dpid.value);
    };
    const checked = ref(true);
    const isCollected = ref(0); //未收藏
    const style = reactive({ color: "Green" });
    const userid = ref(sessionStorage.getItem("k"));
    const shoucang = ref();
    const cpisshoucang = ref();
    const route = useRoute();
    const id = route.params.id;
    const info = ref();
    const list = ref([]);
    const onSubmit = () => {
      router.push("/buy/" + id);
    };
    const onClickLink = () => Toast("修改地址");
    const axios = require("axios");
    const img = ref("/api");
    //c菜谱详情 表7
    const getFoodById = () => {
      return axios.get(
        "/api/getFoodById.do?food_id=" + id
      );
    };
    //菜谱评论列表 表8
    const getAllCommentsByFood = () => {
      return axios.get(
        " /api/getAllCommentsByFood.do?food_id=" +
          id
      );
    };
    //判断菜谱是否收藏 表12
    const getisCollected = () => {
      return axios.get(
        " /api/isCollected.do?user_id=" +
          userid.value +
          "&shop_food_id=" +
          id +
          "&flag=1"
      );
    };
    // 向给定ID的用户发起请求
    axios
      .all([getFoodById(), getAllCommentsByFood(), getisCollected()])
      // .get("/api/getFoodById.do?food_id=" + id)

      .then(function (response) {
        // 处理成功情况
        console.log(response);
        info.value = response[0].data;
        list.value = response[1].data;
        shoucang.value = response[2].data;
        console.log(shoucang.value);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
        if (shoucang.value == "1") {
          style.color = "red";
        } else {
          style.color = "";
        }
      });
    //表11 收藏菜谱接口
    const cisshoucang131 = () => {
      // 向给定ID的用户发起请求
      axios
        .get(
          "/api/userCollectFood.do?user_id=" +
            userid.value +
            "&food_id=" +
            id
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          cpisshoucang.value = response.data.success;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
          if (cpisshoucang.value == 1) {
            if (isCollected.value == 0) {
              Toast("收藏成功");
              style.color = "red";
              isCollected.value = 1;
            } else if (isCollected.value == 1) {
              Toast("取消收藏");
              style.color = "";
              isCollected.value = 0;
            }
          }
        });
    };

    return {
      img,
      info,
      list,
      cisshoucang131,
      style,
      onSubmit,
      onClickLink,
      checked,
      reshow,
      dpid,
      show,
      showPopup,
      value,
      shopping,
      shoucang,
      gowu,
   /*    userid, */
    };
  },
};
</script>
<style scoped>
.box1 span {
  font-size: 20px;
  position: fixed;
  z-index: 9;
  font-weight: bold;
}
.box1 img {
  width: 100%;
}
.b1 {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.b1 :nth-child(1) {
  font-size: 18px;
  font-weight: bold;
}
.b2 {
  display: flex;
  font-size: 18px;
  color: red;
}
.b1 span {
  line-height: 40px;
}
.b2 span {
  line-height: 40px;
}
.sum23 {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.box3 {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  /* justify-content: flex-end; */
}
.box4 {
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
}
.box5 {
  display: flex;
  flex-flow: column;
  margin-left: 20px;
}
.sum45 {
  background-color: #fff;
  margin: 20px 0px;
}
.ssum45 {
  background-color: #ccc;
  border: 1px solid #ccc;
}
.box7 {
  display: flex;
  flex-flow: column;
}
.box9 {
  display: flex;
  justify-content: space-around;
  margin: 10px 10px;
}
.box6 {
  margin: 20px 0px 80px 0px;
  background-color: #fff;
}
.box10 {
  background-color: #ccc;
  border: 1px solid #ccc;
}
.car {
  display: flex;
  justify-content: space-around;
}
.car1 img {
  width: 150px;
}
.car2 {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.add {
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>
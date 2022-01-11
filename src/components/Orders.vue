<template>
  <div class="box1">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="page">
    <div v-for="(v,i) in list" :key="i" >
      <div class="page1">
      <div class="box2">
      <div class="png"><img :src="img + v.pic" alt="" /></div>
        <div class="b1">
          <div class="c1">
        <span>{{v.shopname}}</span>
        <span>{{ v.order_time }}</span>
        </div>
        <div class="c2">
        <span>{{v.foodname}}</span>
       <span>{{v.num}}件</span>
       </div>
        </div> 
        <div class="b2">
       <span>￥:{{ v.price * v.num}}</span>
       </div>
       </div>
       <div class="box3">
        <van-button round  type="default" @click="showPopup(v.item_id)">
         评价
       </van-button> 
       </div>
       </div>
    </div>
    </div>
      <van-popup
        v-model:show="show"
        closeable
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-cell-group inset>
        <van-field
          v-model="value"
          rows="2"
          autosize
          label="评价"
          type="textarea"
          maxlength="30"
          placeholder="请输入评价"
          show-word-limit
        />
       </van-cell-group>
        <van-button type="primary" color="#ccc" round block @click="success" class="queren">确认</van-button>
        <!-- <button @click="success">确认</button> -->
      </van-popup>
  
</template>
<script>
import { NavBar, Col, Row, Button, Popup, Field, CellGroup, Toast, } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "我的订单",
  components: {
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,

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
    const userid = ref(sessionStorage.getItem("k"));
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/My");
    };
    const list = ref([]);
    /*  const plist = ref([]); */
    const img = ref("/api");
    const show = ref(false);
    const pj = ref();
    const varitemid = ref();
    const showPopup = (itemid) => {
      show.value = true;
      varitemid.value = itemid;
    };
    const success = () => {
      // 向给定ID的用户发起请求
      //表17增加评论信息
      axios
        .get(
          "/api/insertComment.do?item_id=" +
            varitemid.value +
            "&content=" +
            value.value
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          pj.value = response.data.success;
          if (pj.value == 1) {
            Toast("评价成功");
          }
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    };
     const value = ref(""); 
    const axios = require("axios");

    // 向给定ID的用户发起请求
    //表15获取当前用户所有订单
    axios
      .get(
        "/api/getAllOrdersByUser.do?user_id=" +
          userid.value
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        list.value = response.data;
        /*   //表7 菜谱详情
        for (let i = 0; i <= list.value.length; i++) {
          axios
            .get(
              "/api/getFoodById.do?food_id=" +
                list.value[i].food_id
            )

            .then(function (response) {
              // 处理成功情况
              console.log(response);
              // plist.value = response.data.pic;
              plist.value.push(response.data.pic);
            })
            .catch(function (error) {
              // 处理错误情况
              console.log(error);
            })
            .then(function () {
              // 总是会执行
            });
        } */

        // 向给定ID的用户发起请求
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
      list,
      img,
      /*    plist, */
      show,
      showPopup,
      value,
      success,
    };
  },
};
</script>
<style scoped>
.box2{
  display: flex;
 
}
.png {
  width: 28%;
}
.png img{
  width: 100%;
  border-radius: 2rem;
}
.c1{
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
}
.c1 :nth-child(1){
  font-size: 18px;
  font-weight: bold;
}
.c1 :nth-child(2){
  color:#ccc;
}
.c2{
  display: flex;
  justify-content:space-around;
  margin: 2rem 0;
}
.b2{
  display: flex;
  flex-direction:column;
  justify-content: center;
  margin: 2rem;
}
.box3{
  display: flex;
  justify-content:flex-end;
   padding: 1rem;
  
}

.page{
  background-color: #ccc;
}
.page1{
  background-color: #fff;
  border-radius: 2rem;
  margin: .625rem;
}
</style>
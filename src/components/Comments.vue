<template>
  <div class="box1">
    <van-nav-bar
      title="我的评论"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div v-for="(v, i) in list" :key="i">
    <div class="box2">
      <div class="box34">
        <div class="box3">
          <span>店铺名称:{{ v.shopname }}</span>
          <span>菜品名称:{{ v.foodname }}</span>
          <span>订单号:{{ v.order_id }}</span>
        </div>
        <div class="box4">
          <span>{{ v.comment_time }}</span>
        </div>
      </div>
      <div class="box5">
        <span>{{ v.content }}</span>
      </div>
      <div class="box6">
        <van-button
          color="#BEBEBE"
          round
          type="primary"
          @click="update(v.item_id)"
        >
          修改评论</van-button
        >
        <van-button
          color="#00EE76"
          round
          type="primary"
          @click="del(v.item_id)"
        >
          删除评论</van-button
        >
      </div>
    </div> 
  </div>
  <van-popup v-model:show="show" closeable position="bottom" :style="{ height: '30%' }">
    <!-- <van-cell-group inset>
      <van-field v-model="val" label="评论" placeholder="请输入评论" />
    </van-cell-group> -->
  <van-cell-group inset>
    <van-field
      v-model="val"
      rows="2"
      autosize
      label="评论"
      type="textarea"
      maxlength="30"
      placeholder="请输入评论"
      show-word-limit
    />
  </van-cell-group>
    <van-button @click="success"  round color="#ccc" type="primary"  block>确认</van-button>
  </van-popup>
</template>
<script>
import { NavBar, Button, Popup, Field, CellGroup, Toast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "我的评论",
  components: {
    [NavBar.name]: NavBar,
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
    const varitemid = ref();
    const val = ref("");
    const userid = ref(sessionStorage.getItem("k"));
    const list = ref([]);
    const ucount = ref();
    const dcount = ref();
    const axios = require("axios");
    const show = ref(false);
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/My");
    };
    const update = (itemid) => {
      show.value = true;

      varitemid.value = itemid;
    };
    const del = (itemid) => {
      // 向给定ID的用户发起请求
      axios
        .get("/api/deleteComment.do?item_id="+itemid)
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          dcount.value=response.data.success;
           if(dcount.value==1){ 
              console.log(dcount.value); 
              Toast("删除成功");
               getpinglun();
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

    //修改评论 表18
    const success = () => {
      axios
        .get(
          "/api/updateComment.do?item_id=" +
            varitemid.value +
            "&content=" +
            val.value
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          ucount.value = response.data.success;

          if (ucount.value == 1) {
            Toast("修改成功");
            getpinglun();
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
    //获取当前用户评论  表16
    const getpinglun = onMounted(() => {
      axios
        .get(
          "/api/getAllCommentsByUser.do?user_id=" +
            userid.value
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          list.value = response.data;
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
      list,
      update,
      getpinglun,
      ucount,
      show,
      val,
      success,
      onClickLeft,
      del,
      dcount,
    };
  },
};
</script>
<style scoped>
.box5 span {
  line-height: 30px;
  text-align: center;
}
.box3 {
  display: flex;
  flex-flow: column;
}
.box3 :nth-child(1) {
  font-size: 18px;
  color: black;
  font-weight: bold;
}
.box34 {
  display: flex;
  justify-content: space-around;
  margin: 30px;
  color: #bebebe;
}
.box2 {
  border: 1px solid black;
  border-radius: 2rem;
  margin-bottom: 10px;
}
.box5 {
  display: flex;
  padding-left: 40px;
}
.box6 {
  display: flex;
  justify-content: flex-end;
}
/* .plbutton{
  position:absolute;
  left: 0;
  bottom: 0px;
} */
</style>
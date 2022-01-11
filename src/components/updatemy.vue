<template>
  <div class="box1">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="box23">
    <div class="box2">
      <van-cell-group inset>
        <!-- 输入任意文本 -->
        <van-field v-model="state.username" label="用户名字" />
        <!-- 输入密码 -->
        <van-field v-model="state.password" type="password" label="密码" />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="state.tel" type="tel" label="手机号" />
        <!-- 输入任意文本 -->
        <van-field v-model="state.text1" label="地址" />
      </van-cell-group>
    </div>
    <div class="box3">
      <van-button type="primary" @click="alter()">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { NavBar, Field, CellGroup, Toast, Button, } from "vant";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
export default {
  name: "修改个人信息",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  setup() {
    const userid = ref(sessionStorage.getItem("k"));
    const nub = ref();
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/My");
    };
    const state = reactive({
      username: "",
      password: "",
      tel: "",
      text1: "",
    });
    const alter = () => {
      const axios = require("axios");

      // 向给定ID的用户发起请求
      axios
        //表14
        .get(
          "/api/updateUserById.do?user_id=" +
            userid.value +
            "&username=" +
            state.username +
            "&userpass=" +
            state.password +
            "&mobilenum=" +
            state.tel +
            "&address=" +
            state.text1
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          nub.value = response.data.success;
          if (nub.value == 1) {
            Toast("修改成功");
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
    return {
      onClickLeft,
      state,
      alter,
    };
  },
};
</script>
<style scoped>
.box2{
  margin-top: 15px;
}
.box3 {
  margin-top: 30px;
  text-align: center;
}
.box23 {
  background-color: #ccc;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

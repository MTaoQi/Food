<template>
  <div class="box1">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft()"
    />
  </div>
   {{Text}}
  <div class="box2"></div>
  <div class="box3">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
        left-icon="manager-o"
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
         left-icon="bag-o"
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
         left-icon="phone-o"
          v-model="state.iphone"
          type="iphone"
          name="电话"
          label="电话"
          placeholder="请输入电话"
          :rules="[{ required: true, message: '请填写电话' }]"
        />
        <van-field
          left-icon="location"
          v-model="state.arr"
          type="arr"
          name="地址"
          label="地址"
          placeholder="请输入地址"
          :rules="[{ required: true, message: '地址' }]"
        />
        <van-field
         left-icon="records"
          v-model="state.text"
          type="text"
          name="备注"
          label="备注"
          placeholder="请输入备注"
          :rules="[{ required: true, message: '请填写备注' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          @click="reg(state)"
        >
          立即注册
        </van-button>
      </div>
    </van-form>
     
  </div>
</template>

<script>
import { NavBar, Form, Field, CellGroup, Button } from "vant";
import { reactive } from "vue";
import { ref } from "vue";
import router from "../router/index.js";
export default {
  name: "注册",

  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },

  setup() {
     const Text = ref("注册");
    const axios = require("axios");
    const u = ref("/api/");
    const info=ref();
    const onClickLeft = () => {
      router.push("/Login");
    };
    const state = reactive({
      username: "",
      password: "",
      iphone: "",
      arr:"",
      text:"",


    });
    const onSubmit = (values) => {
      console.log("submit", values);
    };
    const reg = (state) => {
      // 向给定ID的用户发起请求
      axios
        .post(
          u.value +
            "userRegister.do?username=" +
            state.username +
            "&userpass=" +
            state.password+
            "&mobilenum="+state.iphone+
            "&address="+state.arr+
            "&comment=" +
            state.text

        )
        .then(function (response) {
          // 处理成功情况
          info.value = response.data.success;
          console.log(response);

          if (info.value == 1) {
            router.push("/Login");
          } else {
            Text.value = "用户名已存在，请重新设置";
          }
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // // 总是会执行
          //   if (info.value == 1) {
          //   router.push("/Main");
          // } else {
          //  Text.value="用户名密码错误";
          // }
        });
    };
    return {
      onClickLeft,
      reg,
      state,
      onSubmit,
      Text,
      
    };
  },
};
</script>

<style scoped>
.box2 {
  background-image: url("../assets/1.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
}
</style>
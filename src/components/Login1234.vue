<template>
  <div class="box1">
    {{ info }}
    <van-nav-bar title="Login" right-text="按钮" />
  </div>

  <div class="box2">
    <div class="b1">
      <span
        ><van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="30"
      /></span>
      <van-cell-group inset>
        <van-field v-model="user" label="用户名" placeholder="请输入用户名" />
      </van-cell-group>
    </div>

    <div class="b1">
      <span><van-icon name="bag-o" size="30" /></span>
      <van-cell-group inset>
        <van-field v-model="password" label="密码" placeholder="请输入密码" />
      </van-cell-group>
    </div>
    <div class="b2">
      <span @click="login">登录</span>
    </div>
    <div class="box3"><span>立即注册</span></div>
  </div>
</template>

<script>
import { NavBar, Icon, Toast, Field, CellGroup } from "vant";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      user: "",
      password: "",
      u: "http://172.24.10.130:8080/foodService/",
      info: {},
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
  methods: {
    login() {

      // 向给定ID的用户发起请求
      axios
        .get(
          this.u +
            "/userLogin.do?username=" +
            this.user +
            "&userpass=" +
            this.password
        )
        .then((response)=>{
          // 处理成功情况
           
          this.info = response.data;
          console.log(response);
         
          if (this.info.userid <= 0) {
            Toast("登录失败！！");
          } else {
            Toast("登录成功！！");
            this.$router.push("/Main");
          }
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b1 {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 15px;
  border-radius: 2rem;
  margin-top: 3rem;
  padding-left: 8px;
}
.b2 {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 10px;
  background-color: #00bfff;
  text-align: center;
  border-radius: 1rem;
  margin-top: 6rem;
}
.b2 span {
  line-height: 50px;
}

.box2 {
  background-image: url("../assets/1.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
}
.box3 {
  text-align: center;
}
</style>

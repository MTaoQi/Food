<template>
  <div>
      <van-nav-bar title="Login" />
    <div class="box1">
      {{ info }}
      {{ Text }}
      
    </div>
    <div class="box2sum">
      <div class="box2">
        <div class="b1">
          <!-- <span
          ><van-icon
            name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            size="30"
        /></span> -->
          <van-cell-group inset>
            <van-field
              v-model="state.user"
              left-icon="manager-o"
              label="用户名"
              placeholder="请输入用户名"
            />
          </van-cell-group>
        </div>
         <div class="b1">
          <!-- <span><van-icon name="bag-o" size="30" v-model="password" /></span> -->
          <van-cell-group inset>
            <van-field
              v-model="state.password"
              left-icon="bag-o"
              label="密码"
              placeholder="请输入密码"
              type="password"
            />
          </van-cell-group>
         </div>

        <div class="b2" @click="login">
          <span>登录</span>
        </div>
      </div>
      <router-link to="/Reg"><div class="box3"><span>立即注册</span></div></router-link>
    </div>
  </div>
</template>
<script>
import { NavBar, Icon, Field, CellGroup } from "vant";
import { ref,reactive} from "vue";
import { useRouter} from "vue-router";

export default {
  name: "登录",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    
  },

  setup() {
     const state = reactive({
      user:'',
      password: '',
    });
   /*  const user = ref("");
    const password = ref(""); */
    const u = ref("/api/");
    const info = ref();
    
    const router = useRouter();
    const Text = ref("登录");
    const axios = require("axios");
    
    const login = () => {
      // 向给定ID的用户发起请求
      axios
        .get(
          u.value+
            "userLogin.do?username=" +
            state.user +
            "&userpass=" +
            state.password
        )
        .then(function (response) {
          // 处理成功情况
          info.value = response.data.userid;
          
          console.log(response);

          if (info.value !=0) {
          var str=info.value;
           sessionStorage.setItem('k', str);
           router.push("/Main");
           
          } else {
            Text.value = "用户名密码错误";
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

    return { info, login, Text,state, };
  },
};
</script>
<style scoped>
.b1 {
  width: 100%;
  border: 1px solid #00bfff;;
  margin-bottom: 15px;
  border-radius: 1rem;
  margin-top: 2rem;
  padding-left: 8px;
}
.b2 {
  width: 100%;
  /* border: 1px solid black; */
  margin-bottom: 10px;
  background-color: #00bfff;
  text-align: center;
  border-radius: 1rem;
  margin-top: 3rem;
}
.b2 span {
  line-height: 50px;
}

.box2sum {
  background-image: url("../assets/1.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
}
.box3 {
  text-align: center;
}
.box1{
  text-align: center;
}
</style>
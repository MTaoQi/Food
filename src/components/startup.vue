<template>
 <div id="sp"></div>
  <div id="box1"><span>Hello,</span><span>这里是不将就校园</span></div>
</template>
<script>
export default {
  name: "启动页",
  components: {},
  setup() {
       onload=function(){ 
        setInterval(go, 1000); 
        }; 
        var x=3; //利用了全局变量来执行 
        function go(){ 
        x--; 
        if(x>0){ 
        document.getElementById("sp").innerHTML=x; //每次设置的x的值都不一样了。 
        }else{ 
        location.href='Login'; 
        } 
    } 
    return {};
  },
};
</script>
<style scoped>
#box1{
  background-image: url("../assets/3.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-flow: column; 
}
</style>
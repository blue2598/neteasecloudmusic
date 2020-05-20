<template>
  <div class="header">
      <ul>
          <li><router-link to="/login"><i class="iconfont icon-gengduo2" /></router-link></li>
          <li><router-link to="/Personal">我的</router-link></li>
          <li><router-link to="/home">发现</router-link></li>
          <li><router-link to="/home">云村</router-link></li>
          <li><router-link to="/search">视频</router-link></li>
          <li><router-link to="/search"><i class="iconfont icon-search" /></router-link></li>
      </ul>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
export default {
  name: "Header",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    getWangyi() {
      axios({
        url: "/playlist/hot" /*热门歌单接口地址*/,
        method: "post"
      })
        .then(res => {
          console.log("我拿到的数据：", res.data.tags);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.header{
    background-color: #b72712;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 46px;
    position:fixed;
    top:0;
    z-index: 20;
}
.header ul{
    margin: 0;
    height: 100%;
    width: 100%;
}

.header ul li{
    width:13%;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
.header ul li a{
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 46px;
    text-align: center;
    color: #fff;
}

.header ul li:nth-child(1){  
  width: 20%;
}
.header ul li:nth-child(6){
  width: 16%;
}
.header ul li:nth-child(1) a{
  text-align: left;
  text-indent: 15px;
}
.header ul li:nth-child(1) a i{
  font-size: 30px;
}
.header ul li:nth-child(6) a{
  text-align: right;
  padding-right: 15px;
}
.header ul li:nth-child(6) a i{
  font-size: 22px;
}
</style>

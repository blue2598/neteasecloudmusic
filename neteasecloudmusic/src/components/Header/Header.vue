<template>
  <div class="header">
      <ul>
          <li><router-link to="/Playsongs"><i class="iconfont icon-xianline21" /></router-link></li>
          <li><router-link to="/home"><i class="iconfont icon-music" /></router-link></li>
          <li><router-link to="/home"><i class="iconfont icon-yinle" /></router-link></li>
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
    width:24%;
    display: inline-block;
    height: 100%;

}
.header ul li a{
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 46px;
    text-align: center;
    color: #fff;
}
.header ul li a i{
    font-size: 26px;
}
</style>

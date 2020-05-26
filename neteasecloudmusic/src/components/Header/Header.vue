<template>
  <div class="header">
    <ul>
      <li>
        <a href="javascript:void(0)" @click="show">
          <i class="iconfont icon-gengduo2" />
        </a>
      </li>
      <li>
        <router-link to="/Personal">我的</router-link>
      </li>
      <li>
        <router-link to="/Find">发现</router-link>
      </li>
      <li>
        <router-link to="/home">云村</router-link>
      </li>
      <li>
        <router-link to="/search">视频</router-link>
      </li>
      <li>
        <router-link to="/search">
          <i class="iconfont icon-search" />
        </router-link>
      </li>
    </ul>
    <van-popup
      class="popleft"
      v-model="showLeft"
      position="left"
      :style="{ height: '100%',width:'80%' }"
    >
      <div class="body_wrapper">
        <div class="top">
          <div class="top_wrapper"></div>
        </div>
        <div class="center">
          <div class="avator" @click="goUserinfo">
            <img :src="avator" />
            <span>{{nickname}}</span>
          </div>
          <div class="btn_list">
            <ul>
              <li>
                <p>
                  <i class="iconfont icon-xiaoxi"></i>
                </p>
                <p>我的消息</p>
              </li>
              <li>
                <p>
                  <i class="iconfont icon-haoyou"></i>
                </p>
                <p>我的好友</p>
              </li>
              <li>
                <p>
                  <i class="iconfont icon-zhuye"></i>
                </p>
                <p>个人主页</p>
              </li>
              <li>
                <p>
                  <i class="iconfont icon-yifu"></i>
                </p>
                <p>个性装扮</p>
              </li>
            </ul>
          </div>
          <div class="btn_list2">
            <ul>
              <li v-for="(item,index) in 10" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom" >
        <ul>
          <li>
            <i class="iconfont icon-z"></i>
            夜间模式
          </li>
          <li>
            <i class="iconfont icon-shezhi"></i>
            设置
          </li>
          <li @click="logOut">
            <i class="iconfont icon-iconfront-1"></i>
            退出
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import { Toast } from 'vant';
export default {
  name: "Header",
  data() {
    return {
      showLeft: false,
      avator: "",
      nickname:'网易云'
    };
  },
  created(){
    this.getUserinfo()
  },
  methods: {
    show() {
      this.showLeft = true;
    },
    getUserinfo(){
      var id=localStorage.getItem('id')
      axios({
        url:"/user/detail?uid="+id,
        methods:'get'
      }).then(res=>{
        this.avator = res.data.profile.avatarUrl;
        this.nickname = res.data.profile.nickname
      }).catch(err=>{
        console.log(err)
      })
    },
    logOut(){
      axios({
        url:"logout",
        methods:'get'
      }).then(res=>{
        if(res.data.code='200'){
          Toast('退出成功')
          localStorage.clear();
          this.$router.push('/login')
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    goUserinfo() {
      var idval = localStorage.getItem("id");
      if (idval) this.$router.push({ name: "Userinfo", params: { id: idval } });
      else Toast("请求失败，请稍后重试");
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #b72712;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 46px;
  position: fixed;
  top: 0;
  z-index: 20;
}
.header ul {
  margin: 0;
  height: 100%;
  width: 100%;
}

.header ul li {
  width: 13%;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.header ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 46px;
  text-align: center;
  color: #fff;
}

.header ul li:nth-child(1) {
  width: 20%;
}
.header ul li:nth-child(6) {
  width: 16%;
}
.header ul li:nth-child(1) a {
  text-align: left;
  text-indent: 15px;
}
.header ul li:nth-child(1) a i {
  font-size: 30px;
}
.header ul li:nth-child(6) a {
  text-align: right;
  padding-right: 15px;
}
.header ul li:nth-child(6) a i {
  font-size: 22px;
}
.popleft {
  background-color: rgba(36, 36, 36, 0.8);
  color: #111;
  overflow: hidden;
  overflow-y: scroll;
}
.body_wrapper{
  overflow: hidden;
  overflow-y: scroll;
}
.top {
  width: 100%;
  height: 150px;
  padding: 10px 0;
}
.top_wrapper {
  width: 90%;
  height: 150px;
  margin: auto;
  background-color: rgba(104, 104, 104, 0.5);
  border-radius: 10px;
}
.center {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -10px;
}
.center .avator {
  padding: 10px;
}
.center .avator img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.center .avator span {
  color: #000;
  font-weight: 700;
  font-size: 16px;
}
.btn_list ul li {
  width: 23% !important;
  text-align: center;
  vertical-align: top;
}
.btn_list ul li i {
  font-size: 30px;
  color: #b72712;
}
.btn_list2 {
  /* margin-bottom: 50px; */
}
.btn_list2 ul li {
  display: block;
  text-align: center;
  padding: 10px 0;
  width: 100% !important ;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  background-color: #fff;
  border-top: 1px solid #ccc;
}
.popleft .bottom ul li{
  width: 32%;
  text-align: center;
  line-height: 45px;
}
.popleft .bottom ul li i{
  font-size: 20px;
  vertical-align: middle;
}


</style>

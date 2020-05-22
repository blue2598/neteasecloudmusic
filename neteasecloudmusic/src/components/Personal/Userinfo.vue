<template>
  <div>
    <div class="bg" :style="{background:'url('+backgroundUrl+')'}"></div>
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="share">
        <i class="iconfont icon-fenxiang"></i>
      </span>
    </div>
    <div class="avator">
      <div class="infobox">
        <div class="imgbox">
          <img :src="avatorimg" />
        </div>
        <div class="info">
          <span class="nickname">{{nickname}}</span>
          <p class="infobox">
            <span>关注 {{follows}}</span>
            <span>粉丝 {{followeds}}</span>
          </p>
          <p>
            <span class="sexandage">
              <i style="color:#fb0" v-if="sex">♀</i>
              <i style="color:#fb0" v-else>♂</i>
              {{age}}年
            </span>
            <span class="level">Lv{{level}}</span>
          </p>
        </div>
      </div>
    </div>

    <van-sticky :offset-top="42">
      <div class="contentbox">
        <van-tabs v-model="active">
          <van-tab title="主页">
            <div class="wrapp">
              <ul>
                <li>
                  <a>
                    <div class="imgbox">
                      <img :src="1" />
                    </div>
                    <div class="content">
                      <span class="van-multi-ellipsis--l2">听歌排行</span>
                      <span>累计听歌{{listenSongs}}首</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <div class="imgbox">
                      <img :src="myfav[0].coverImgUrl" />
                    </div>
                    <div class="content">
                      <span class="van-multi-ellipsis--l2">我 喜欢的音乐</span>
                      <span>{{myfav[0].trackCount}}首</span>
                    </div>
                  </a>
                </li>
              </ul>
              <span class="title">创建的歌单</span>
              <span class="titlespan">({{userplaylist.length}}个,被收藏{{1}}次)</span>
              <ul>
                <li
                  v-for="(item,index) in userplaylist"
                  :key="index"
                  @click="showPlaylist(item.id)"
                >
                  <a>
                    <div class="imgbox">
                      <img :src="item.coverImgUrl" />
                    </div>
                    <div class="content">
                      <span class="van-multi-ellipsis--l2">{{item.name}}</span>
                      <span>{{item.trackCount}}首</span>
                    </div>
                  </a>
                </li>
              </ul>
              <span class="title">基本信息</span>
              <span class="titlespan van-multi-ellipsis--l1">(信息展示可在隐私设置中设置)</span>
              <p class="item">
                <span>村龄：</span>
                <span>{{parseInt(createDays/365)}}年 ({{createTime.substr(0,4)}}年{{createTime.substr(5,2)}}月注册)</span>
              </p>
              <p class="item">
                <span>年龄：</span>
                <span>{{age}}年 双子座</span>
              </p>
              <p class="item">
                <span>地区：</span>
                <span>安徽省 合肥市</span>
              </p>
            </div>
          </van-tab>
          <van-tab title="动态">内容 2</van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <Bottom></Bottom>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Header from "@/components/Header/Header";
import Bottom from "@/components/Bottom/bottom";
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      avatorimg: "",
      nickname: "网易云",
      level: "0",
      backgroundUrl: "",
      userplaylist: [],
      myfav: [],
      active: "",
      follows: 0,
      followeds: 0,
      age: 0,
      sex: "0",
      createTime: "",
      createDays: "",
      listenSongs: 0
    };
  },
  components: {
    Header,
    Bottom
  },
  created() {
    this.getUserinfo();
    this.getUserPlaylist();
  },
  methods: {
    getUserinfo() {
      var idval = localStorage.getItem("id");
      var id = this.$route.params.id || idval;
      axios({
        url: "/user/detail?uid=" + id /*热搜全部*/,
        method: "get"
      })
        .then(res => {
          // console.log(res.data.result)
          if (res.data.code == "200") {
            this.userinfo = res.data;
            this.avatorimg = res.data.profile.avatarUrl;
            this.nickname = res.data.profile.nickname;
            this.level = res.data.level;
            this.backgroundUrl = res.data.profile.backgroundUrl;
            this.follows = res.data.profile.follows;
            this.followeds = res.data.profile.followeds;
            this.age = this.formateTime(res.data.profile.birthday);
            this.age = this.age.substr(2, 2);
            this.createTime = this.formateTime(res.data.createTime);
            this.createDays = res.data.createDays;
            this.listenSongs = res.data.listenSongs;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserPlaylist() {
      var idval = localStorage.getItem("id");
      var id = this.$route.params.id || idval;
      axios({
        url: "/user/playlist?uid=" + id /*热搜全部*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.userplaylist = res.data.playlist;
            this.myfav = this.userplaylist.splice(0, 1);
            console.log(this.myfav);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showPlaylist(idVal) {
      if (idVal) {
        this.$router.push({ name: "Playlistdetails", params: { id: idVal } });
      } else {
        Toast.fail("出错了,请稍后再试");
      }
    },
    formateTime(val) {
      var timestr = new Date(parseInt(val));
      var year = timestr.getFullYear();
      var month = timestr.getMonth() + 1;
      var date = timestr.getDate();
      var hour = timestr.getHours();
      var minute = timestr.getMinutes();
      var second = timestr.getSeconds();
      var datetime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return datetime;
    },

    filters: {}
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  z-index: 9999;
  padding: 10px;
  color: #fff;
  position: fixed;
  top: 0;
}
.header span {
  cursor: pointer;
}
.header .share {
  font-size: 16px;
  color: #fff;
  padding: 0 15px;
  float: right;
  margin-right: 10px;
}
.avator {
  margin-top: 46px;
}
.avator .infobox {
  width: 100%;
  /* height: 100px; */
  position: relative;
}
.avator .infobox div.imgbox {
  padding-left: 10px;
}
.avator .infobox div img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  left: 20px;
  margin: auto;
}
.avator .infobox div.info {
  padding-top: 5px;
  padding-left: 10px;
}
.avator .infobox div.info span.nickname {
  font-size: 16px;
  display: block;
  padding: 5px 0;
  height: 25px;
  color: #fff;
}
.avator .infobox div.info p span {
  color: #fff;
  font-weight: 100;
}
.avator .infobox div.info p.infobox span {
  color: #fff;
  font-weight: 100;
}
.avator .infobox div.info span.level {
  display: inline-block;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0 10px;
  border-radius: 10px;
  color: #fff;
}
.avator .infobox div.info span.sexandage {
  display: inline-block;
  font-size: 12px;
  background-color: rgba(153, 113, 113, 0.3);
  padding: 0 10px;
  border-radius: 10px;
  color: #fff;
  margin: 10px 0px;
}
.contentbox {
  height: 667px;
  background-color: #fff;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
span.title {
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
  padding: 10px 20px;
}
span.titlespan {
  color: #999;
}
.contentbox ul {
  overflow: hidden;
  overflow-x: none;
}
.contentbox ul li {
  width: 100%;
}
.contentbox ul li a {
  display: inline-block;
  padding: 5px 20px;
  width: 100%;
  height: 100%;
  text-align: left;
}
.contentbox .imgbox {
  width: 13%;
  display: inline-block;
  vertical-align: top;
}
.contentbox .imgbox img {
  width: 45px;
  display: inline-block;
  border-radius: 5px;
}
.contentbox .content {
  width: 70%;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  font-size: 12px;
}
.contentbox .content span {
  display: inline-block;
  width: 90%;
  color: #666;
  text-align: left;
  padding-left: 5px;
}
.contentbox .content span:nth-child(2) {
  font-size: 10px;
  color: #999;
}
p.item {
  padding: 5px 20px;
}
p.item span {
  color: #999;
}
.wrapp {
  height: 500px;
  overflow-y: scroll;
  padding-bottom: 70px;
}
</style>

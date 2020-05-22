<template>
  <div>
    <Header></Header>
    <div class="bg" :style="{background:'url('+backgroundUrl+')'}"></div>
    <div class="avator">
      <div class="infobox" @click="goUserinfo()">
        <img :src="avatorimg" />
        <p class="info">
          <span class="nickname">{{nickname}}</span>
          <span class="level">Lv{{level}}</span>
        </p>
      </div>
    </div>

    <van-sticky :offset-top="42">
      <div class="contentbox">
        <h3>我的音乐</h3>
        <ul class="mysong">
          <li>
            <a>
              <div class="imgbox">
                <img :src="coverimg" />
                <span>
                  <i class="iconfont icon-aixin" style="color:#f45d5d"></i>
                </span>
                <span class="van-multi-ellipsis--l2">我喜欢的音乐</span>
              </div>
            </a>
          </li>
          <li>
            <a>
              <div class="imgbox">
                <img :src="coverimg" />
                <span>
                  <i class="iconfont icon-diantaizhibo"></i>
                </span>
                <span class="van-multi-ellipsis--l2">私人FM</span>
              </div>
            </a>
          </li>
        </ul>
        <h3>创建歌单{{userplaylist.length}}</h3>
        <ul>
          <li v-for="(item,index) in userplaylist" :key="index" @click="showPlaylist(item.id)">
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
      coverimg:''
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
        url: "/user/detail?uid=" + id ,
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
            this.coverimg = res.data.playlist[0].coverImgUrl
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
    goUserinfo() {
      var idval = localStorage.getItem("id");
      if (idval) this.$router.push({ name: "Userinfo", params: { id: idval } });
      else Toast("请求失败，请稍后重试");
    }
  },
};
</script>

<style scoped>
.avator {
  margin-top: 46px;
}
.avator .infobox {
  width: 100%;
  height: 100px;
  position: relative;
}
.avator .infobox img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  margin: auto;
}
.avator .infobox p.info {
  margin-left: 100px;
  padding-top: 20px;
}
.avator .infobox p.info span.nickname {
  font-size: 16px;
  display: block;
  padding: 5px 0;
  height: 25px;
  color: #fff;
}
.avator .infobox p.info span.level {
  display: inline-block;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0 10px;
  border-radius: 10px;
  color: #fff;
}
.contentbox {
  min-height: 100px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-bottom: 60px;
}
h3 {
  padding: 10px 20px;
}
.contentbox ul {
  overflow: hidden;
  overflow-x: none;
}
.contentbox ul li {
  width: 49%;
  display: inline-block;
}
.contentbox ul li a {
  display: inline-block;
  padding: 5px 5px;
  width: 100%;
  height: 100%;
  text-align: center;
}
.contentbox .imgbox {
  width: 25%;
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
.mysong .imgbox {
  width: 120px;
  height: 150px;
  position: relative;
}
.mysong .imgbox span{
  position: absolute;
  color: #fff;
  top:50px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: inline-block;
  height: 25px;
  font-weight: 100;
}
.mysong .imgbox span:nth-child(2){
  top:-20px;
}
.mysong .imgbox span i{
  font-size: 34px;
}
.mysong .imgbox img {
  width: 120px;
  height: 150px;
}
</style>

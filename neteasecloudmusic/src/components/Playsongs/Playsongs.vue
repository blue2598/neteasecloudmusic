<template>
  <div class="playsongs">
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <p>
        <span class="songname">{{songname}}</span>
        <span class="artname">{{artname}}</span>
        <span class="share">
          <i class="iconfont icon-fenxiang"></i>
        </span>
      </p>
    </div>
    <div class="bodybox">
      <img :src="songimg" />
    </div>
    <div class="bottombox">
      <div class="btns_1">
        <span @click="addCollection()">
          <i v-if="!isFav" class="iconfont icon-xihuan"></i>
          <i v-if="isFav" class="iconfont icon-aixin"></i>
        </span>
        <span>
          <i class="iconfont icon-xiazai"></i>
        </span>
        <span>
          <i class="iconfont icon-icon--"></i>
        </span>
        <span>
          <i class="iconfont icon-pinglun"></i>
        </span>
        <span>
          <i class="iconfont icon-gengduo1"></i>
        </span>
      </div>
      <div class="progress_box">
        <span class="length">3:40</span>
        <p class="progress">
          <span class="progress__portion" :style="{width:portion}"></span>
        </p>
        <span class="length1">{{songlength}}</span>
      </div>
      <div class="btns_2">
        <span>
          <i class="iconfont icon-danquxunhuan"></i>
        </span>
        <span>
          <i class="iconfont icon-047caozuo_shangyishou"></i>
        </span>
        <span>
          <i class="iconfont icon-bofang"></i>
        </span>
        <span>
          <i class="iconfont icon-048caozuo_xiayishou"></i>
        </span>
        <span>
          <i class="iconfont icon-gengduo2"></i>
        </span>
      </div>
    </div>
    <audio id="audio" :src="songsUrl"></audio>
    <div class="songbg"  :style="{background:'url('+songimg+')'}"></div>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import eventBus from "../eventBus.js";
export default {
  name: "App",
  data() {
    return {
      songs: "",
      songsUrl: "",
      portion: "30%",
      isFav: false,
      id: "",
      songimg:
        "https://p1.music.126.net/kIbkkVLoqnlNZ4tb4Ga-Gg==/109951164929061760.jpg",
      songname: "夏天的风",
      artname: "汪苏泷",
      songlength: "3:40"
    };
  },
  created() {
    eventBus.$on("id", args => {
      this.id = args;
      console.log(this.id);
      this.getSongs();
      this.getSongDetails();
    });
  },
  methods: {
    addCollection() {
      this.isFav = !this.isFav;
    },
    getSongs() {
      axios({
        url: "/song/url?id=" + this.id /*热搜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.songs = res.data.data;
            this.songsUrl = res.data.data[0].url;
            console.log(this.songsUrl);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSongDetails() {
      axios({
        url: "/song/detail?ids=" + this.id /*热搜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            // this.songs = res.data.data;
            this.id = res.data.songs[0].id;
            this.songimg = res.data.songs[0].al.picUrl;
            console.log(res.data.songs[0].al.picUrl);
            this.songname = res.data.songs[0].name;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style>
.playsongs {
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  overflow: hidden;
}
.header {
  width: 100%;
  z-index: 9999;
  padding: 10px;
  color: #fff;
  position: fixed;
  top: 0;
  height: 5%;
}
.header span {
  cursor: pointer;
}
.header p {
  height: 100%;
  width: 90%;
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.header p span {
  width: 90%;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #fff;
  margin-left: 8px;
}

.header p span:nth-child(2) {
  color: #ccc;
  font-size: 14px;
}
.header p span.share {
  width: 25px;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.header p span.share i {
  font-size: 20px;
}
.header .name {
  font-size: 16px;
  color: #fff;
  padding: 0 15px;
}
.bodybox {
  width: 100%;
  text-align: center;
  position: relative;
  height: 100%;
}
.bodybox::after {
  position: absolute;
  content: "";
  width: 280px;
  height: 280px;
  border: 1px dashed #fff;
  border-radius: 50%;
  top: 135px;
  left: 0;
  right: 0;
  margin: auto;
}
.bodybox img {
  width: 250px;
  height: 250px;
  top: 150px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  border-radius: 50%;
}
.bottombox {
  width: 100%;
  height: 180px;
  position: absolute;
  bottom: 0;
}
.bottombox div {
  padding: 15px 0;
}
.bottombox div.btns_1,
.bottombox div.btns_2 {
  height: 50px;
  line-height: 50px;
}
.bottombox div.progress_box {
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  text-align: center;
}
.bottombox div.progress_box .length,
.bottombox div.progress_box .length1 {
  color: #fff;
  width: 30px;
  position: absolute;
}
.bottombox div.progress_box .length {
  left: 20px;
  vertical-align: middle;
}
.bottombox div.progress_box .length1 {
  right: 20px;
}
.bottombox div.progress_box p.progress {
  display: inline-block;
  width: 68%;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  vertical-align: middle;
  text-align: left;
  line-height: 0px;
}
.bottombox div.progress_box p.progress .progress__portion {
  width: 10%;
  background-color: rgba(255, 255, 255, 0.7);
  height: 100%;
  border-radius: 10px;
  position: relative;
}
.bottombox div.progress_box p.progress .progress__portion::after {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
}
.bottombox div span {
  display: inline-block;
  width: 19%;
  text-align: center;
}
.bottombox div span i {
  font-size: 30px;
  color: #fff;
  vertical-align: middle;
}

.icon-aixin {
  color: #f00 !important;
}
.bottombox div.btns_2 span:nth-child(3) i {
  font-size: 56px;
}
.songbg{
    position: absolute;
    left: -30%;
    top: -30%;
    width: 200%;
    height: 200%;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(70px) brightness(70%);
}
</style>

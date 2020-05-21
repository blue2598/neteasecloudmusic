<template>
  <transition name="van-slide-up">
    <div class="playsongs" :class="{show:showPlayer}">
      <div class="header">
        <span @click="closePlayer()">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <p>
          <span
            class="songname"
            v-if="JSON.stringify(curPlayMusic) !== '{}'"
          >{{curPlayMusic.detail.name}}</span>
          <span v-else class="songname">暂未播放</span>
          <span v-if="JSON.stringify(curPlayMusic) !== '{}'">
            <span
              class="artname"
              v-for="(item,index) in curPlayMusic.detail.ar"
              :key="index"
            >{{item.name}}</span>
          </span>
          <span v-else class="artname">暂未播放</span>
          <span class="share">
            <i class="iconfont icon-fenxiang"></i>
          </span>
        </p>
      </div>
      <div class="bodybox">
        <img v-if="JSON.stringify(curPlayMusic)!== '{}'" :src="curPlayMusic.detail.al.picUrl" />
        <img v-else :src="songimg" />
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
          <span class="length">{{currentTime |timeFormat}}</span>
          <p class="progress">
            <span class="progress__portion" :style="{width:portion+'%'}"></span>
          </p>
          <span class="length1">{{songlength | timeFormat}}</span>
        </div>
        <div class="btns_2">
          <span>
            <i class="iconfont icon-danquxunhuan"></i>
          </span>
          <span>
            <i class="iconfont icon-047caozuo_shangyishou"></i>
          </span>
          <span>
            <i v-if="this.$store.state.isPlay" @click="pause" class="iconfont icon-zanting"></i>
            <i v-else class="iconfont icon-bofang" @click="start"></i>
          </span>
          <span>
            <i class="iconfont icon-048caozuo_xiayishou"></i>
          </span>
          <span>
            <i class="iconfont icon-gengduo2"></i>
          </span>
        </div>
      </div>
      <audio
        id="audio"
        ref="audio"
        @canplay="getDuration"
        @timeupdate="updateTime"
        @play="startPlay"
        @endup="endPlay"
        :src="curPlayMusic.url"
        autoplay
      ></audio>
      <div
        class="songbg"
        v-if="JSON.stringify(curPlayMusic)!== '{}'"
        :style="{background:'url('+curPlayMusic.detail.al.picUrl+')'}"
      ></div>
      <div class="songbg" v-else :style="{background:'url('+songimg+')'}"></div>
    </div>
  </transition>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      songs: "",
      songsUrl: "",
      isFav: false,
      id: "",
      songimg:
        "https://p1.music.126.net/kIbkkVLoqnlNZ4tb4Ga-Gg==/109951164929061760.jpg",
      songname: "夏天的风",
      artname: "汪苏泷",
      portion: "0",
      currentTime: "0",
      songlength: "0",
      show: true
    };
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showPlayer,
      curPlayMusic: state => state.curPlayMusic
    })
  },
  watch: {},
  created() {
    // this.getSongs();
    // this.getSongDetails();
    // this.getDuration();
  },
  watched() {},
  methods: {
    addCollection() {
      this.isFav = !this.isFav;
    },
    closePlayer() {
      this.$store.state.showPlayer = false;
    },
    getDuration() {
      this.songlength = this.$refs.audio.duration;
    },
    updateTime() {
      var audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
      var alltime = audio.duration;
      this.portion = (this.currentTime / alltime) * 100;
    },
    startPlay() {
      this.$store.dispatch("switchStatus", true);
      this.$refs.audio.play();
    },
    endPlay() {},
    // 开始播放按钮
    start() {
      this.$store.dispatch("switchStatus", true);
      this.$refs.audio.play();
    },
    // 暂停播放按钮
    pause() {
      this.$store.dispatch("switchStatus", false);
      this.$refs.audio.pause();
    }
  },
  filters: {
    timeFormat(value) {
      let min = parseInt(value / 60);
      let sec = parseInt(value % 60);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return min + ":" + sec;
    }
  },
  components: {}
};
</script>

<style>
.playsongs {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1001;
  position: fixed;
  bottom: -2000px;
  right: 0;
}
.show {
  top: 0;
  bottom: 0;
}
.header {
  width: 100%;
  z-index: 1000;
  padding: 10px;
  color: #fff;
  /* position: fixed; */
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

.header p span.artname {
  width: auto;
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
  left: 8px;
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
.songbg {
  position: relative;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: blur(100px) brightness(80%);
}
</style>

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
        <div class="coverbox" @click="showLyric" v-show="isShowCover">
          <img v-if="JSON.stringify(curPlayMusic)!== '{}'" :src="curPlayMusic.detail.al.picUrl" />
          <img v-else :src="songimg" />
        </div>
      </div>
      <div class="lyricbox" v-show="isShowLyric">
        <ul>
          <li v-if="curPlayMusic.lrc">{{curPlayMusic.lrc.lyric}}</li>
        </ul>
      </div>
      <div class="bottombox">
        <div class="btns_1">
          <span @click="addCollection(curPlayMusic.detail.id)">
            <i v-if="isFav" class="iconfont icon-aixin"></i>
            <i v-else class="iconfont icon-xihuan"></i>
          </span>
          <span>
            <i class="iconfont icon-xiazai"></i>
          </span>
          <span>
            <i class="iconfont icon-icon--"></i>
          </span>
          <span style="position:relative">
            <i class="iconfont icon-pinglun"></i>
            <i class="comment">{{commentNum}}</i>
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
          <span @click="showPlaylist">
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
      <!-- 播放列表 -->
      <van-popup v-model="isShowPlaylist" round position="bottom" :style="{ height: '60%' }">
        <ul class="dqlist">
          <li v-for="(item,index) in PlayList" :key="index" @click="playThis(item.id,index)">
            <div class="info">
              <p class="van-ellipsis" v-if="curMusicIndex ==index">
                <span style="color:#b72712" class="songname">{{item.name}} -</span>
                <span style="color:#b72712" class="artistname" v-if="item.ar">
                  <span v-for="(e,i) in item.ar" :key="i">{{e.name}}</span>
                </span>
                <span
                  style="color:#b72712"
                  class="artistname"
                  v-else
                  v-for="(e,i) in item.song.artists"
                  :key="i"
                >{{e.name | singerFormat}}</span>
              </p>
              <p class="van-ellipsis" v-else>
                <span class="songname">{{item.name}} -</span>
                <span class="artistname" v-if="item.ar">
                  <span v-for="(e,i) in item.ar" :key="i">{{e.name}}</span>
                </span>
                <span
                  class="artistname"
                  v-else
                  v-for="(e,i) in item.song.artists"
                  :key="i"
                >{{e.name}}</span>
              </p>
            </div>
            <span class="clear">
              <i class="iconfont">X</i>
            </span>
          </li>
        </ul>
      </van-popup>
    </div>
  </transition>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import { mapState, mapGetters, mapActions } from "vuex";
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {
      songs: "",
      songsUrl: "",
      id: "",
      songimg:
        "https://p1.music.126.net/kIbkkVLoqnlNZ4tb4Ga-Gg==/109951164929061760.jpg",
      portion: "0", //进度条
      currentTime: "0", //当前播放进度
      songlength: "0", //歌曲总长度
      show: true,
      commentNum: 0,
      musicId: "",
      isFav: false,
      comments: [],
      hotComments: [],
      isShowPlaylist: false,
      isShowCover: true,
      isShowLyric: false
    };
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showPlayer,
      curPlayMusic: state => state.curPlayMusic,
      PlayList: state => state.PlayList,
      curMusicIndex: state => state.curMusicIndex
    })
  },
  watch: {},
  created() {
    this.getComment();
    this.isFavFn();
  },
  watched() {},
  methods: {
    // 喜欢音乐
    addCollection(idVal) {
      if (idVal && this.isFav == false) {
        axios({
          url: "/like?id=" + idVal /*喜欢音乐*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              this.isFav = !this.isFav;
            } else {
              Toast("请求失败，请稍后重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (idVal && this.isFav == true) {
        axios({
          url: "/like?like=false&id=" + idVal /*取消喜欢音乐*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              this.isFav = !this.isFav;
            } else {
              Toast("请求失败，请稍后重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    closePlayer() {
      this.$store.state.showPlayer = false;
    },
    // 获取歌曲总时长
    getDuration() {
      this.songlength = this.$refs.audio.duration;
    },
    // 获取当前播放进度
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
    },
    //获取歌曲评论
    getComment() {
      if (this.$store.state.curPlayMusic != "") {
        this.musicId = this.$store.getters.getCurPlayMusicId;
        axios({
          url: "/comment/music?id=" + this.musicId /*歌曲评论*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              this.comments = res.data.comments;
              this.hotComments = res.data.hotComments;
              this.commentNum = res.data.total;
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 显示播放列表
    showPlaylist() {
      this.isShowPlaylist = true;
    },
    playThis(idVal, index) {
      function getUrl() {
        return axios.get(`/song/url?id=${idVal}`);
      }

      function getDetail() {
        return axios.get(`/song/detail?ids=${idVal}`);
      }

      function getLyric() {
        return axios.get(`/lyric?id=${idVal}`);
      }
      axios.all([getUrl(), getDetail(), getLyric()]).then(
        axios.spread((res1, res2, res3) => {
          const arr = [res1, res2, res3];
          console.log(arr);
          this.$store.dispatch("changePlayMusic", arr);
          this.$store.dispatch("curMusicIndex", index);
        })
      );
    },
    //判断当前播放的音乐id是否在用户的喜欢列表
    isFavFn(id) {
      var idval = localStorage.getItem("id");
      axios({
        url: "/likelist?uid=" + idval /*用户喜欢的列表*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            var songid = res.data.ids;
            var curid = id;
            return songid.includes(curid);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //显示歌词面板
    showLyric() {
      this.isShowCover = false;
      this.isShowLyric = true;
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

.coverbox {
  width: 250px;
  height: 250px;
  margin: auto;
  top: 150px;
  position: relative;
}
.bodybox .coverbox img {
  width: 250px;
  height: 250px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  border-radius: 50%;
}
.lyricbox {
  width: 100%;
  height: 65%;
  overflow: hidden;
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
.comment {
  position: absolute;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  transform: scale(0.4);
  left: 13px;
  top: -13px;
}
/* 播放列表 */
.dqlist {
  overflow: hidden;
  overflow-y: scroll;
}
.dqlist li {
  padding: 8px 25px;
  position: relative;
}

.dqlist li span.clear {
  position: absolute;
  height: 20px;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #999;
}
.dqlist li span.more i {
  font-size: 24px;
  color: #ccc;
}
.info p {
  width: 85%;
}
.dqlist li div.info p + p span {
  font-size: 12px;
}
.info p span.songname {
  color: #333;
  display: inline-block;
  padding: 10px;
}
.info p span.songname {
  color: #333;
  display: inline-block;
  padding: 5px 10px;
}

.info p span.artistname {
  display: inline-block;
  color: #999;
  padding: 5px 0px;
  font-size: 12px;
}
.info p span.artistname {
  padding: 5px 10px;
}
</style>

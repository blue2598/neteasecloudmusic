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
              v-if="curPlayMusic.detail.ar"
              v-for="(item,index) in curPlayMusic.detail.ar"
              :key="index"
            >{{item.name}}</span>
            <span class="artistname" v-else v-for="(e,i) in item.song.artists" :key="i">{{e.name}}</span>
          </span>
          <span v-else class="artname">暂未播放</span>
          <span class="share">
            <i class="iconfont icon-fenxiang"></i>
          </span>
        </p>
      </div>
      <div class="bodybox">
        <transition name="van-fade">
          <div class="coverbox" v-show="!isShowLyric" @click.stop="switchShow">
            <img
              v-if="JSON.stringify(curPlayMusic)!== '{}'"
              :src="curPlayMusic.detail.al.picUrl"
              :style="{transform:'rotate('+retateDeg+'deg)'}"
            />
            <img v-else :src="songimg" />
          </div>
        </transition>
      </div>
      <transition name="van-fade">
        <div class="lyricbox" v-show="isShowLyric" @click.stop="switchShow">
          <ul v-if="lyric">
            <li v-for="(item,index) in lyric" :key="index">{{item}}</li>
          </ul>
        </div>
      </transition>
      <div class="bottombox">
        <!-- 按钮组 -->
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
          <span style="position:relative" @click="showComment">
            <i class="iconfont icon-pinglun"></i>
            <i class="comment">{{commentNum | commentFormat}}</i>
          </span>
          <span>
            <i class="iconfont icon-gengduo1"></i>
          </span>
        </div>
        <!-- 进度条 -->
        <div class="progress_box">
          <span class="length">{{currentTime |timeFormat}}</span>
          <p class="progress">
            <span class="progress__portion" :style="{width:portion+'%'}"></span>
          </p>
          <span class="length1">{{songlength | timeFormat}}</span>
        </div>
        <!-- 底部按钮 -->
        <div class="btns_2">
          <span @click="changePlaymode">
            <i
              class="iconfont"
              :class="{'icon-xunhuan': playMode === 0,'icon-danquxunhuan': playMode === 1,'icon-xunhuan1': playMode === 2}"
            ></i>
          </span>
          <span>
            <i class="iconfont icon-047caozuo_shangyishou" @click="preMusicFn"></i>
          </span>
          <span>
            <i v-if="this.$store.state.isPlay" @click="pause" class="iconfont icon-pause"></i>
            <i v-else class="iconfont icon-bofang" @click="start"></i>
          </span>
          <span>
            <i class="iconfont icon-048caozuo_xiayishou" @click="nextMusicFn"></i>
          </span>
          <span @click="showPlaylist">
            <i class="iconfont icon-gengduo2"></i>
          </span>
        </div>
      </div>
      <transition class="van-slide-up">
        <div class="commentPanel" v-show="isShowComment">
          <div class="closePanel">
            <div class="closeCommentPanel">
              <i class="iconfont icon-fanhui" @click="closeCommentPanel"></i>
              <span>评论({{commentNum}})</span>
              <span class="share">
                <i class="iconfont icon-fenxiang"></i>
              </span>
            </div>
            <div class="comments">
              <div class="title">热门评论</div>
              <ul>
                <li v-for="(item,index) in hotComments" :key="index">
                  <div class="avator">
                    <img :src="item.user.avatarUrl" />
                  </div>
                  <div class="info">
                    <p class="nickname">{{item.user.nickname}}</p>
                    <p class="time">{{item.time}}</p>
                    <p class="content">{{item.content}}</p>
                    <span class="likedCount" v-if="item.likedCount">
                      {{item.likedCount}}
                      <i
                        v-if="item.liked"
                        style="color：#b72712"
                        class="iconfont icon-dianzan"
                        @click="likedComment(0,item.commentId,curMusicId)"
                      ></i>
                      <i
                        v-else
                        class="iconfont icon-dianzan"
                        @click="likedComment(1,item.commentId,curMusicId)"
                      ></i>
                    </span>

                    <span class="likedCount" v-else>
                      <i class="iconfont icon-dianzan"></i>
                    </span>
                  </div>
                </li>
              </ul>
              <div class="title">全部评论</div>
              <ul>
                <li v-for="(item,index) in comments" :key="index">
                  <div class="avator">
                    <img :src="item.user.avatarUrl" />
                  </div>
                  <div class="info">
                    <p class="nickname">{{item.user.nickname}}</p>
                    <p class="time">{{item.time}}</p>
                    <p class="content">{{item.content}}</p>
                    <span class="likedCount" v-if="item.likedCount">
                      {{item.likedCount}}
                      <i class="iconfont icon-dianzan"></i>
                    </span>
                    <span class="likedCount" v-else>
                      <i class="iconfont icon-dianzan"></i>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <audio
        id="audio"
        ref="audio"
        @canplay="getDuration"
        @timeupdate="updateTime"
        @play="startPlay"
        @ended="endPlay"
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
      playMode: 0, //播放模式，0列表循环，1单曲循环，2随机播放
      show: true,
      commentNum: 0,
      musicId: "",
      isFav: false,
      comments: [],
      hotComments: [],
      isShowLyric: true,
      isShowComment: false,
      retateDeg: 0, //图片旋转角度
      timer: null,
      timerNum: 1
    };
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showPlayer,
      curPlayMusic: state => state.curPlayMusic,
      PlayList: state => state.PlayList,
      curMusicIndex: state => state.curMusicIndex,
      curMusicId: state => state.curMusicId
    }),
    lyric() {
      if (this.curPlayMusic.lrc !== undefined) {
        return this.parseLrc(this.curPlayMusic.lrc.lyric) || null;
      } else {
        return false;
      }
    }
  },
  created() {
    this.getComment();
    this.rotate();
    // this.isFavFn();
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
      this.isShowLyric = false;
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
      this.portion = (this.currentTime / audio.duration) * 100;
    },
    // 出发开始播放
    startPlay() {
      this.getComment();
      this.rotate();
    },
    // 触发结束播放
    endPlay() {
      this.nextMusicFn();
      this.clearTimer()
    },
    // 开始播放按钮
    start() {
      this.$store.dispatch("switchStatus", true);
      this.$refs.audio.play();
      this.timerNum = 1;
    },
    // 暂停播放按钮
    pause() {
      this.$store.dispatch("switchStatus", false);
      this.$refs.audio.pause();
      this.timerNum = 0;
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
      this.$store.state.isShowPlayList = true;
    },
    // 上一首按钮
    preMusicFn() {
      var nextindex;
      if (this.playMode === 2) nextindex = this.randomIndex();
      else
        nextindex =
          this.curMusicIndex > 1
            ? this.curMusicIndex - 1
            : this.PlayList.length - 1;
      var idVal = this.PlayList[nextindex].id;
      this.playThis(idVal, nextindex);
    },
    // 下一首按钮
    nextMusicFn() {
      console.log(this.PlayList);
      var nextindex;
      if (this.playMode === 2) nextindex = this.randomIndex();
      else
        nextindex =
          this.curMusicIndex < this.PlayList.length - 1
            ? this.curMusicIndex + 1
            : 0;
      var idVal = this.PlayList[nextindex].id;
      this.playThis(idVal, nextindex);
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
          this.$store.dispatch("changePlayMusic", arr);
          this.$store.dispatch("curMusicIndex", index);
        })
      );
    },
    randomIndex() {
      // 随机播放
      let length = this.PlayList.length;
      let index;
      do {
        index = Math.round(Math.random() * length);
      } while (index === this.curMusicIndex);
      return index;
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
    switchShow() {
      this.isShowLyric = !this.isShowLyric;
    },
    changePlaymode() {
      this.playMode < 2 ? this.playMode++ : (this.playMode = 0);
      var tip = ["列表循环", "单曲循环", "随机播放"];
      Toast({
        message: tip[this.playMode],
        position: "bottom"
      });
    },
    //解析歌词
    parseLrc(lrc) {
      var lyrics = lrc.split("\n");
      var lrcObj = {};
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, "");
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
      return lrcObj;
    },
    // 展示评论
    showComment() {
      this.isShowComment = true;
    },
    // 关闭评论面板
    closeCommentPanel() {
      this.isShowComment = false;
    },
    // 点赞
    likedComment(num, cid, id) {
      if (num === 0) {
        axios({
          url: "/comment/like?type=0&t=0&id=" + id + "&cid=" + cid /*取消点赞*/,
          method: "get"
        }).catch(err => {
          console.log(err);
        });
      } else {
        axios({
          url: "/comment/like?type=0&t=1&id=" + id + "&cid=" + cid /*点赞*/,
          method: "get"
        }).catch(err => {
          console.log(err);
        });
      }
    },
    rotate() {
      this.timer = setInterval(() => {
        if (this.timerNum === 0) {
          // 设置的定时器时间为0后执行的操作
          this.timer && this.clearTimer(); // 关闭定时器
        } else {
          this.loading();
        }
      }, 20);
    },
    loading() {
      // 启动定时器
      this.timerNum += 1; // 定时器加一
      this.retateDeg += 0.1;
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  filters: {
    timeFormat(value) {
      let min = parseInt(value / 60);
      let sec = parseInt(value % 60);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      return min + ":" + sec;
    },
    commentFormat(value) {
      if (value > 9999) return "1W+";
      if (value > 999) return "999+";
      return value;
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
}
.header p span.artname + span.artname {
  margin-left: 8px !important;
}
.header p span.artname {
  width: auto;
  color: #fff;
  font-size: 14px;
}
.share {
  width: 25px !important;
  height: 25px;
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
  height: 100%;
}
.coverbox {
  width: 250px;
  height: 250px;
  margin: auto;
  top: 150px;
  position: relative;
}
.coverbox::after {
  position: absolute;
  content: "";
  width: 280px;
  height: 280px;
  border: 1px dashed #fff;
  border-radius: 50%;
  top: 0px;
  left: -16px;
  bottom: 0;
  margin: auto;
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
  /* transition: all linear 2.5s; */
}
.lyricbox {
  width: 100%;
  height: 55%;
  overflow: hidden;
  position: fixed;
  top: 105px;
  left: 0;
  right: 0;
}
.lyricbox ul {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.lyricbox ul li {
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  color: #ccc;
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
  right: -5px;
  top: -13px;
  text-align: right;
}
.commentPanel {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
/* 评论 */
.closeCommentPanel {
  position: relative;
  padding: 15px;
  background-color: #b72712;
  color: #fff;
}
.title {
  padding: 15px;
  color: #000;
  font-size: 16px;
}
.comments {
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: scroll;
}
.comments ul li {
  padding: 10px 10px 0;
  position: relative;
}
.comments .avator {
  width: 50px;
  display: inline-block;
  vertical-align: top;
}
.comments .avator img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comments .info {
  display: inline-block;
  max-width: 90%;
  padding-left: 15px;
}
.comments .info .nickname {
  color: #666;
  padding: 3px 0;
}
.comments .info .time {
  color: #ccc;
  padding: 3px 0;
  font-size: 12px;
}
.comments .info .content {
  color: #111;
  padding: 3px 0;
  max-width: 266px;
  min-width: 200px;
}
.likedCount {
  position: absolute;
  top: 25px;
  right: 25px;
  color: #999;
}
</style>

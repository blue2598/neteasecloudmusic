<template>
  <transition name="van-slide-up">
    <div class="recommend">
      <div class="header">
        <span @click="$router.go(-1)">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <span class="name">歌单</span>
      </div>
      <div class="body">
        <div class="desbox">
          <p class="cover">
            <img :src="coverimg" />
          </p>
          <div>
            <p class="des van-multi-ellipsis--l2">{{playlistName}}</p>
            <p class="userinfo">
              <span class="avator">
                <img :src="usercover" width="25px" height="25px" />
              </span>
              <span class="username">{{username}}></span>
            </p>
            <p class="description van-multi-ellipsis--l2">{{description}}</p>
          </div>
        </div>
        <div class="operatebox">
          <ul>
            <li>
              <i class="iconfont icon-pinglun"></i>
              <span>评论</span>
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <span>分享</span>
            </li>
            <li>
              <i class="iconfont icon-xiazai"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="iconfont icon-xuanze-duoxuan-tianchong"></i>
              <span>多选</span>
            </li>
          </ul>
        </div>
        <van-sticky :offset-top="42">
          <div class="songsbox">
            <div class="headbox">
              <i class="iconfont icon-bofang"></i>
              <span>播放全部</span>
              <span class="count">(共{{playlist.length}}首)</span>
              <p class="shoucang">+收藏({{subscribedCount}})</p>
            </div>
            <ul class="dqlist">
              <li v-for="(item,index) in playlist" :key="index" @click="playThis(item.id)">
                <span class="listnum">{{index+1}}</span>
                <div class="info">
                  <p class="van-ellipsis">
                    <span class="songname">{{item.name}}</span>
                  </p>
                  <p class="van-ellipsis">
                    <span class="artistname">{{item.ar[0].name}}</span>
                    <span class="ablums">- {{item.al.name}}</span>
                  </p>
                  <p class="van-ellipsis">
                    <span v-if="item.alias">
                      <span v-for="alia in item.alias" :key="alia" class="ycname">{{alia}}</span>
                    </span>
                  </p>
                </div>
                <span class="more" @click="showFn">
                  <i class="iconfont icon-gengduo"></i>
                </span>
              </li>
            </ul>
          </div>
        </van-sticky>
      </div>
      <van-popup
        v-model="show"
        position="bottom"
        round
        close-on-click-overlay
        :style="{ height: '75%'}"
      >
        <div class="popupheader">
          <p>
            <img :src="coverimg" width="20px" height="20px" />
          </p>
          <p>歌曲：{{1}}</p>
        </div>
      </van-popup>
      <div class="bg" :style="{background:'url('+coverimg+')'}"></div>
      <Bottom></Bottom>
    </div>
  </transition>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Bottom from "@/components/Bottom/bottom";
export default {
  name: "Home",
  data() {
    return {
      playlist: [],
      coverimg: "",
      playlistName: "",
      description: "",
      userId: "",
      username: "",
      subscribedCount: 0,
      usercover: "",
      show: false
    };
  },
  components: {
    Bottom
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    getPlaylist() {
      var id = this.$route.params.id;
      if (id) {
        axios({
          url: "/playlist/detail?id=" + id /*轮播图*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              this.playlist = res.data.playlist.tracks;
              this.coverimg = res.data.playlist.coverImgUrl;
              this.description = res.data.playlist.description;
              this.playlistName = res.data.playlist.name;
              this.userId = res.data.playlist.userId;
              this.subscribedCount = res.data.playlist.subscribedCount;
              this.getUserinfo();
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getUserinfo() {
      axios({
        url: "/user/detail?uid=" + this.userId /*轮播图*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.username = res.data.profile.nickname;
            this.usercover = res.data.profile.avatarUrl;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    playThis(idVal){
     function getUrl() {
          return axios.get(`/song/url?id=${idVal}`)
        }

        function getDetail() {
          return axios.get(`/song/detail?ids=${idVal}`)
        }

        function getLyric() {
          return axios.get(`/lyric?id=${idVal}`)
        }
        axios.all([getUrl(), getDetail(), getLyric()])
          .then(axios.spread((res1, res2, res3) => {
            const arr = [res1, res2, res3]
            console.log(arr)
            this.$store.dispatch('changePlayMusic', arr)
            // this.$store.state.showPlayer = true
          }))

    },
    showFn() {
      this.show = true;
    }
  }
};
</script>

<style scoped>
.recommend {
  width: 100%;
  height: 100vh;
}
.header {
  width: 100%;
  z-index: 9999;
  opacity: 0.8;
  padding: 10px;
  color: #fff;
  position: fixed;
  top: 0;
}
.header span {
  cursor: pointer;
}
.header .name {
  font-size: 16px;
  color: #fff;
  padding: 0 15px;
}
.body {
  position: absolute;
  z-index: 999;
  width: 100%;
  top: 39px;
  overflow: hidden;
}
.desbox {
  width: 100%;
  position: relative;
}

.desbox .cover {
  display: inline-block;
  height: 100px;
  width: 100px;
  text-align: center;
  padding: 10px;
}
.desbox .cover img {
  width: 100%;
  height: 100%;
}
.desbox div {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
}
.desbox .des {
  color: #fff;
}
.desbox div p {
  width: 220px;
  line-height: 20px;
}
.desbox div p.userinfo {
  color: #999;
}
.desbox div p.description {
  color: #999;
}
.avator img {
  vertical-align: middle;
  border-radius: 50%;
}
.operatebox ul {
  padding: 10px 0;
}
.operatebox ul li {
  display: inline-block;
  width: 24%;
  text-align: center;
}
.operatebox ul li i {
  font-size: 18px;
  color: #fff;
}
.operatebox ul li span {
  display: block;
  color: #999;
}
.songsbox {
  min-height: 100px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.songsbox div.headbox {
  padding: 15px 10px 5px;
  position: relative;
}
.songsbox .headbox i {
  font-size: 18px;
  color: #111;
  vertical-align: middle;
}
.songsbox .headbox span {
  vertical-align: middle;
}
.songsbox .headbox span.count {
  color: #999;
}
.songsbox .shoucang {
  position: absolute;
  right: 10px;
  bottom: -5px;
  margin: 0;
  background-color: rgb(211, 80, 60);
  height: 25px;
  line-height: 25px;
  border-radius: 50px;
  padding: 5px 10px;
  color: #fff;
  font-weight: 100;
}
.dqlist {
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
.dqlist li {
  padding: 8px 25px;
  position: relative;
}
.dqlist li div.info span {
  font-size: 16px;
}

.dqlist li span.more {
  position: absolute;
  height: 20px;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
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
.info p span.songalias {
  display: inline-block;
  color: #999;
}

.info p span.artistname,
.info p span.ablums {
  display: inline-block;
  color: #999;
  padding: 5px 0px;
}
.info p span.artistname {
  padding: 5px 10px;
}
.info p span.ycname {
  display: inline-block;
  color: #999;
  padding: 5px 10px;
}
.listnum {
  color: #999;
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 20px;
}
.bg {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: blur(100px) brightness(80%);
}
</style>

<template>
  <div>
    <Header></Header>
    <!-- tab -->
    <van-tabs v-model="activeName" sticky offset-top="46" animated>
      <van-tab title="个性推荐" name="recommend">
        <!-- 轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in banners" :key="index">
            <a :href="item.url">
              <img :src="item.imageUrl" />
            </a>
          </van-swipe-item>
        </van-swipe>
        <div class="btn_list">
          <ul>
            <li class="item">
              <router-link to="/EverydayRecommend">
                <i class="iconfont icon-iconset0277"></i>
                <span>私人FM</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/EverydayRecommend">
                <i class="iconfont icon-rili"></i>
                <span>每日歌曲推荐</span>
              </router-link>
            </li>
            <li class="item">
              <a href="ranking_list">
                <i class="iconfont icon-paixingbang"></i>
                <span>云音乐热歌榜</span>
              </a>
            </li>
          </ul>
        </div>
        <h3>
          推荐歌单
          <a class="right more" href>查看更多</a>
        </h3>
        <div class="recommend_list">
          <ul>
            <li v-for="(item,index) in recommend_songs" :key="index" @click="showPlaylist(item.id)">
              <a>
                <img :src="item.coverImgUrl" />
                <span class="describe_title">{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="title">
          <span class="item" :class="actived" @click="changeSong()">新歌</span>
          <span>|</span>
          <span class="item" @click="changeAblum()">新碟</span>
          <span id="moresong" class="right more" v-show="isShowmore">更多新歌</span>
          <span id="moreablum" class="right more" v-show="!isShowmore">更多新碟</span>
        </div>
        <div class="new_recommend newsong" v-show="isSong">
          <ul>
            <li v-for="(item,index) in newsongs" :key="index">
              <a>
                <div class="imgbox">
                  <img :src="item.picUrl" />
                </div>
                <div class="content">
                  <span class>{{item.name}}</span>
                  <span v-if="item.song.alias!=''">{{item.song.alias[0]}}</span>
                  <p v-else>
                    <span class>
                      <span>{{item.song.artists[0].name}}</span>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="new_recommend newablum" v-show="isAblum">
          <ul>
            <li v-for="(item,index) in newalbums" :key="index">
              <a>
                <div class="imgbox">
                  <img :src="item.blurPicUrl" />
                </div>
                <div class="content">
                  <span class>{{item.name}}</span>
                  <span></span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="歌单" name="songSheet">歌单</van-tab>
      <van-tab title="排行榜" name="rankList">
        <div class="rankList">
          <div class="rank1">
            <h3>网易原创歌曲榜</h3>
            <div class="picbox">
              <img :src="ycimgSrc" />
              <span class="updatedes">每周四更新</span>
            </div>
            <ul>
              <li
                v-for="(item,index) in ycrankList"
                :key="index"
              >{{index+1}}.{{item.name}} - {{item.ar[0].name}}</li>
            </ul>
          </div>
          <div class="rank1">
            <h3>官方榜</h3>
            <div class="picbox">
              <img :src="bsimgSrc" />
              <span class="updatedes">每天更新</span>
            </div>
            <ul>
              <li
                v-for="(item,index) in bsrankList"
                :key="index"
              >{{index+1}}.{{item.name}} - {{item.ar[0].name}}</li>
            </ul>
            <div class="picbox">
              <img :src="rgimgSrc" />
              <span class="updatedes">每天更新</span>
            </div>
            <ul>
              <li
                v-for="(item,index) in rgrankList"
                :key="index"
              >{{index+1}}.{{item.name}} - {{item.ar[0].name}}</li>
            </ul>
            <div class="picbox">
              <img :src="xgimgSrc" />
              <span class="updatedes">每天更新</span>
            </div>
            <ul>
              <li
                v-for="(item,index) in xgrankList"
                :key="index"
              >{{index+1}}.{{item.name}} - {{item.ar[0].name}}</li>
            </ul>
          </div>
          <div class="rank2">
            <h3>推荐榜</h3>
            <ul>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/y8zyTt4HwXbJqB31aQKz1A==/109951164353220919.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">云音乐说唱榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">云音乐电音榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/Zb8AL5xdl9-_7WIyAhRLbw==/109951164091690485.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">云音乐欧美新歌榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/oUxnXXvM33OUHxxukYnUjQ==/109951164174523461.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">抖音排行榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">云音乐ACG音乐榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p1.music.126.net/BzSxoj6O1LQPlFceDn-LKw==/18681802069355169.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">云音乐古典音乐榜</p>
              </li>
            </ul>
          </div>
          <div class="rank2">
            <h3>全球榜</h3>
            <ul>
              <li>
                <p>
                  <img
                    src="http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">美国Billboard榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">UK排行榜 周榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p1.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">Beatport全球电子舞曲榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">日本Oricon周榜</p>
              </li>
              <li>
                <p>
                  <img :src="bsimgSrc" />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">iTunes榜</p>
              </li>
              <li>
                <p>
                  <img
                    src="http://p2.music.126.net/0_6_Efe9m0D0NtghOxinUg==/109951163089272193.jpg?param=150y150"
                  />
                </p>
                <span class="updatedes">每周五更新</span>
                <p class="name">美国Q杂志中文版周榜</p>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <Bottom></Bottom>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Header from "@/components/Header/Header";
import Bottom from "@/components/Bottom/bottom";
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      activeName: "recommend",
      banners: [],
      recommend_songs: [],
      isShowmore: true,
      actived: "actived",
      newsongs: [],
      newalbums: [],
      songalias: "",
      songartist: "",
      isSong: true,
      isAblum: false,
      ycimgSrc: "",
      bsimgSrc: "",
      xgimgSrc: "",
      rgimgSrc: "",
      rgimgSrc: "",
      cximgSrc: "",
      ycrankList: [], //原创音乐榜
      bsrankList: [], //飙升榜
      xgrankList: [], //新歌榜
      rgrankList: [] //热歌榜
    };
  },
  components: {
    Header,
    Bottom
  },
  created() {
    this.getBanner();
    this.getRecommendSongs();
    this.getNewsong();
    this.getNewablums();
    this.getRanklist();
  },
  methods: {
    getRecommendSongs() {
      axios({
        url:
          "top/playlist/highquality?before=1503639064232&limit=6" /*热门歌单接口地址*/,
        method: "post"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.recommend_songs = res.data.playlists;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBanner() {
      axios({
        url: "/banner/type=2" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          this.banners = res.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeSong() {
      if (!this.isSong) {
        this.isSong = !this.isSong;
        this.isAblum = !this.isAblum;
      }
    },
    changeAblum() {
      if (!this.isAblum) {
        this.isAblum = !this.isAblum;
        this.isSong = !this.isSong;
      }
    },
    getNewsong() {
      axios({
        url: "/personalized/newsong" /*新歌*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.newsongs = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNewablums() {
      axios({
        url: "/top/album?limit=3" /*新碟*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.newalbums = res.data.albums;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRanklist() {
      axios({
        url: "/top/list?idx=2" /* 网易原创歌曲榜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.ycrankList = res.data.playlist.tracks;
            this.ycimgSrc = res.data.playlist.coverImgUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "/top/list?idx=3" /* 飙升榜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.bsrankList = res.data.playlist.tracks;
            this.bsimgSrc = res.data.playlist.coverImgUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "/top/list?idx=0" /* 新歌榜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.xgrankList = res.data.playlist.tracks;
            this.xgimgSrc = res.data.playlist.coverImgUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "/top/list?idx=1" /* 热歌榜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.rgrankList = res.data.playlist.tracks;
            this.rgimgSrc = res.data.playlist.coverImgUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showPlaylist(idVal) {
      if (idVal) {
        this.$router.push({ name: "Playlist", params: { id: idVal } });
      } else {
        Toast.fail("出错了,请稍后再试");
      }
    }
  }
};
</script>

<style scoped>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #b72712;
  color: #b72712;
  margin-bottom: -3px;
}

.van-tabs {
  top: 46px;
}
.my-swipe a {
  display: inline-block;
  width: 100%;
}
.my-swipe a img {
  width: 100%;
  height: 100%;
}
.btn_list .item {
  display: inline-block;
  width: 32%;
  padding: 10px 0;
  position: relative;
  cursor: pointer;
}
.btn_list .item a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
}
.btn_list .item::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #b72712;
  left: 0;
  right: 0;
  top: 5px;
  margin: auto;
}
.btn_list .item a i {
  font-size: 32px;
  display: block;
  color: #b72712;
}
.btn_list .item a span {
  color: #111;
  font-size: 14px;
  display: inline-block;
  margin-top: 20px;
}
h3,
.title {
  padding: 10px 20px;
  position: relative;
}
h3::before,
.title::before {
  position: absolute;
  content: "";
  width: 5px;
  height: 65%;
  background-color: #b72712;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0px;
}
h3 .right,
.title .more {
  height: 20px;
  line-height: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  position: absolute;
  font-size: 16px;
  color: #333;
  text-align: center;
  border-radius: 10px;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.recommend_list ul li {
  width: 33%;
  text-align: center;
  display: inline-block;
}
.recommend_list ul li a {
  display: inline-block;
}
.recommend_list ul li img {
  width: 90%;
  transform: translate(0, 0);
}
.recommend_list ul li span.describe_title {
  display: block;
  text-align: left;
  height: 33px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  padding: 5px;
  border-radius: 5px;
}
.title .item {
  margin-right: 5px;
  color: #666;
}
.title .item.actived {
  color: #000;
}
.new_recommend ul {
  overflow: hidden;
  overflow-x: none;
}
.new_recommend ul li {
  width: 100%;
  display: inline-block;
  padding: 10px 10px;
}
.new_recommend ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.new_recommend .imgbox {
  width: 25%;
  display: inline-block;
  vertical-align: top;
}
.new_recommend .imgbox img {
  width: 90px;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 5px solid transparent;
}
.new_recommend .content {
  width: 70%;
  display: inline-block;
  height: 100px;
  vertical-align: top;
}
.new_recommend .content span {
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #666;
}
.picbox {
  display: inline-block;
  width: 24%;
  height: 80px;
  padding: 10px;
  position: relative;
}
.rankList img {
  width: 90px;
  height: 90px;
  border-radius: 5px;
}
.rankList ul {
  display: inline-block;
  vertical-align: top;
  height: 80px;
  padding: 10px 0;
  width: 66%;
  overflow: hidden;
}
.rankList ul li {
  color: #999;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rankList span.updatedes {
  position: absolute;
  z-index: 99;
  color: #fff;
  bottom: 2px;
  left: 15px;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 100;
}
.rank2 ul {
  width: 100%;
  height: auto;
  vertical-align: top;
  padding: 10px 0;
  overflow: hidden;
}
.rank2 ul li {
  display: inline-block;
  width: 32%;
  color: #999;
  height: 100%;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  vertical-align: top;
}
.rank2 ul li p {
  text-align: center;
}
.rank2 ul li p img {
  width: 90px;
  height: 90px;
}
.rank2 span.updatedes {
  position: absolute;
  z-index: 999;
  color: #fff;
  top: 73px;
  left: 22px;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 100;
  height: 25px;
}
.rank2 ul li p.name {
  padding: 10px 13px;
  color: #333;
  text-align: left;
  line-height: 18px;
}
</style>

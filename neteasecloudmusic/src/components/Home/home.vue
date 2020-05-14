<template>
  <div>
    <Header></Header>
    <!-- tab -->
    <van-tabs v-model="activeName" sticky offset-top="46" animated>
      <van-tab title="个性推荐" name="recommend" >
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
              <a href="personal_fm">
                <i class="iconfont icon-iconset0277"></i>
                <span>私人FM</span>
              </a>
            </li>
            <li class="item">
              <a href="recommend_every">
                <i class="iconfont icon-rili"></i>
                <span>每日歌曲推荐</span>
              </a>
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
            <li v-for="(item,index) in recommend_songs" :key="index">
              <a>
                <img :src="item.coverImgUrl" />
                <span class="describe_title">{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="title">
          <span class="item" :class="actived"  @click="changeSong()">新歌</span>
          <span>|</span>
          <span class="item"  @click="changeAblum()">新碟</span>
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
      <van-tab title="排行榜" name="rankList"> <div class="rankList">
          <div class="rank1">
            <h3>硬地原创音乐榜</h3>
            <div class="picbox">
              <img :src="1">
            </div>
            <ul><li>1.河流-蛙池WaChi</li></ul>
          </div>
        </div>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Header from "@/components/Header/Header";
export default {
  name: "Home",
  data() {
    return {
      activeName: "recommend",
      banners: [],
      recommend_songs: [],
      isShowmore: true,
      actived:'actived',
      newsongs: [],
      newalbums: [],
      songalias: "",
      songartist: "",
      isSong:true,
      isAblum:false,
    };
  },
  components: {
    Header
  },
  created() {
    this.getBanner();
    this.getRecommendSongs();
    this.getNewsong();
    this.getNewablums();
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
    changeSong(){
      if(!this.isSong){
        this.isSong=!this.isSong;
        this.isAblum=!this.isAblum;
      }
    },
    changeAblum(){
      if(!this.isAblum){
        this.isAblum = !this.isAblum;
        this.isSong=!this.isSong;
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
          console.log(res.data);
          if (res.data.code == "200") {
            this.newalbums = res.data.albums;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
.new_recommend ul{
  overflow: hidden;
  overflow-x:none;
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
</style>

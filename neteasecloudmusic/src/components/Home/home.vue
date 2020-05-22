<template>
  <div>
    <Header></Header>
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
            <i class="iconfont icon-rili"></i>
            <span>每日推荐</span>
          </router-link>
        </li>
        <li class="item">
          <router-link to="/Playlist">
            <i class="iconfont icon-iconset0277"></i>
            <span>歌单</span>
          </router-link>
        </li>
        <li class="item">
          <router-link to="/Ranklist">
            <i class="iconfont icon-paixingbang"></i>
            <span>排行榜</span>
          </router-link>
        </li>
        <li class="item">
          <router-link to="/EverydayRecommend">
            <i class="iconfont icon-rili"></i>
            <span>电台</span>
          </router-link>
        </li>
        <li class="item">
          <a href="ranking_list">
            <i class="iconfont icon-paixingbang"></i>
            <span>直播</span>
          </a>
        </li>
      </ul>
    </div>
    <h3>推荐歌单
      <a class="right more" @click="moreFn('playlists')">查看更多</a>
    </h3>
    <div class="recommend_list">
      <ul>
        <li v-for="(item,index) in recommend_playlists" :key="index" @click="showPlaylist(item.id)">
          <a>
            <img :src="item.picUrl" />
            <span class="describe_title">{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="title">
      <span class="item" :class="actived" @click="changeSong()">新歌</span>
      <span>|</span>
      <span class="item" @click="changeAblum()">新碟</span>
      <span id="moresong" class="right more" v-show="isShowmore" @click="moreFn('songs')">更多新歌</span>
      <span id="moreablum" class="right more" v-show="!isShowmore" @click="moreFn('albums')">更多新碟</span>
    </div>
    <div class="new_recommend newsong" v-show="isSong">
      <ul>
        <li v-for="(item,index) in newsongs" :key="index" @click="playThis(item.id,index)">
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
    <Bottom></Bottom>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Header from "@/components/Header/Header";
import Bottom from "@/components/Bottom/bottom";
import { Toast } from "vant";
import {mapState,mapAction,mapGetters} from 'vuex'
export default {
  name: "Home",
  data() {
    return {
      activeName: "recommend",
      banners: [],
      recommend_playlists: [],
      isShowmore: true,
      actived: "actived",
      newsongs: [],
      newalbums: [],
      songalias: "",
      songartist: "",
      isSong: true,
      isAblum: false,
    };
  },
  components: {
    Header,
    Bottom
  },
  computed:{
    ...mapState({
      // count1:state=>state.count
    })
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
          "/personalized?limit=6" /*热门歌单接口地址*/,
        method: "post"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.recommend_playlists = res.data.result;
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
            var arr=[];
            for(var e of res.data.result)
            arr.push(e.id)
            console.log(arr)
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
    showPlaylist(idVal) {
      if (idVal) {
        this.$router.push({ name: "Playlistdetails", params: { id: idVal } });
      } else {
        Toast.fail("出错了,请稍后再试");
      }
    },
    playThis(idVal,index) {
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
            this.$store.dispatch('changePlayMusic', arr)
            this.$store.dispatch('PlayList', this.newsongs)
            this.$store.dispatch('curMusicIndex', index)
          }))
    },
    moreFn(item) {
      switch (item) {
        case "playlists":
          this.$router.push({ name: "Playlist" });
      }
    }
  }
};
</script>

<style scoped>
.my-swipe {
  margin-top:46px;
}
.my-swipe a {
  display: inline-block;
  width: 100%;
}
.my-swipe a img {
  width: 100%;
  height: 100%;
}
 .van-swipe {
    text-align: center;
    background-color: white;
    transform: translateZ(0);
}
.btn_list {
  padding: 10px 0;
}
.btn_list .item {
  display: inline-block;
  width: 19%;
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
  background-color: #b72712;
  left: 0;
  right: 0;
  top: 3px;
  margin: auto;
  z-index: -1;
}
.btn_list .item a i {
  font-size: 26px;
  display: block;
  color: #fff;
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
  margin-bottom: 50px;
}
.new_recommend ul li {
  width: 100%;
  display: inline-block;
  padding: 5px 10px;
}
.new_recommend ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.new_recommend .imgbox {
  width: 20%;
  display: inline-block;
  vertical-align: top;
}
.new_recommend .imgbox img {
  width: 60px;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 5px;
}
.new_recommend .content {
  width: 75%;
  display: inline-block;
  height: 65px;
  vertical-align: top;
}
.new_recommend .content span {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #666;
}
.picbox {
  display: inline-block;
  width: 24%;
  height: 80px;
  padding: 10px;
  position: relative;
}

</style>

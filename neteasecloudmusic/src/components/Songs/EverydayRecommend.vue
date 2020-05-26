<template>
  <div class="recommend">
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="name">每日推荐</span>
    </div>
    <div class="body">
      <div class="img_wrapper"></div>
      <van-sticky :offset-top="42">
        <div class="songs_wrapper">
          <div class="lists">
            <ul>
              <li v-for="(item,index) in songList" :key="index" @click="playThis(item.id,index)">
                <a>
                  <div class="imgbox">
                    <img :src="item.album.picUrl" />
                  </div>
                  <div class="content">
                    <span  class="van-ellipsis">{{item.name}}</span>
                    <p>
                      <span  class="van-ellipsis">
                        <span  v-for="(e,i) in item.artists" :key="i">{{e.name}}</span>
                      </span>
                    </p>
                  </div>
                  <p class="bofang">
                    <i
                      class="iconfont icon-bofang"
                    ></i>
                  </p>
                  <p class="more">
                    <i class="iconfont icon-gengduo"></i>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </van-sticky>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Bottom from "@/components/Bottom/bottom";
import { Toast } from "vant";
export default {
  name: "Playlist",
  data() {
    return {
      songList: []
    };
  },
  components: {
    Bottom
  },
  created() {
    this.getEverydayRecommend();
  },
  methods: {
    getEverydayRecommend() {
      axios({
        url: "/recommend/songs",
        methods: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.songList = res.data.recommend;
          } else {
            Toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    playThis(idVal,index) {
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
          this.$store.dispatch("PlayList", this.songList);
          this.$store.dispatch("curMusicIndex", index);
          // this.$store.state.showPlayer = true
        })
      );
    },
  }
};
</script>

<style scoped>
.body {
  background-color: rgba(0, 0, 0, 0);
}
.header {
  width: 100%;
  z-index: 999;
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
.img_wrapper {
  width: 100%;
  height: 250px;
  background: url("../../assets/images/foryou.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.songs_wrapper {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 600px;
  overflow: hidden;
  overflow-y: scroll;
  padding-top: 25px;
  background-color: #fff;
}
.songs_wrapper ul {
  overflow: hidden;
  overflow-x: none;
  margin-bottom: 50px;
}
.songs_wrapper ul li {
  width: 100%;
  display: inline-block;
  padding: 5px 10px;
  position: relative;
}
.songs_wrapper ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.songs_wrapper .imgbox {
  width: 20%;
  display: inline-block;
  vertical-align: top;
}
.songs_wrapper .imgbox img {
  width: 60px;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 5px;
}
.songs_wrapper .content {
  width: 75%;
  display: inline-block;
  height: 65px;
  vertical-align: top;
}
.songs_wrapper .content span {
  display: inline-block;
  width: 77%;
  height: 30px;
  line-height: 30px;
  color: #666;
}
.songs_wrapper .content span span {
  width: auto;
  margin-left: 5px;
}
.picbox {
  display: inline-block;
  width: 24%;
  height: 80px;
  padding: 10px;
  position: relative;
}
.songs_wrapper .bofang,
.songs_wrapper .more{
  position: absolute;
  top:0;
  bottom: 0;
  line-height: 50px;
}
.songs_wrapper .bofang i,
.songs_wrapper .more i{
  font-size: 24px;
}
.songs_wrapper .bofang {
  right: 60px;
}
.songs_wrapper .more {
  right: 28px;
}
</style>

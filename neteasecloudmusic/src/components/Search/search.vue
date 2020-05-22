<template>
  <div class="search">
    <div class="search_input">
      <div class="goback" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="input">
        <input
          type="text"
          placeholder="搜索音乐、歌手、歌词、用户"
          v-model="searchword"
          @click="showDefaultword"
        />
        <span v-show="isShowWord" class="defaultWord" @click="defaultToinput()">{{defaultWord}}</span>
        <span class="clear" v-show="isShowClose" @click="clear()">X</span>
      </div>
      <div class="sousuo" @click="searchFn()">
        <i class="iconfont icon-iconfront-"></i>
      </div>
    </div>
    <div class="hot_search" v-show="isShowHotsearch">
      <span>热搜榜</span>
      <div style="padding-top: 10px;">
        <ul>
          <li v-for="(item,index) in searchList" :key="index" @click="handleFn(item.searchWord)">
            <span class="list_num">{{index+1}}</span>
            <div class="content_box">
              <span class="searchWord">
                {{item.searchWord}}
                <img :src="item.iconUrl" />
              </span>
              <span class="content">{{item.content}}</span>
              <span class="score">{{item.score}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <van-tabs
      class="search_list"
      v-show="isShowSearchlist"
      v-model="active"
      animated
      sticky
      offset-top="50"
      @click="changeTab"
    >
      <van-tab title="单曲">
        <keep-alive>
          <lazy-component>
            <ul class="dqlist">
              <li v-for="(item,index) in songResults" :key="index" @click="playThis(item.id)">
                <div class="info">
                  <p class="van-ellipsis">
                    <span class="songname" v-html="searchwordHighLight(item.name)"></span>
                    <span v-if="item.alias">
                      <span
                        v-for="alia in item.alias"
                        :key="alia"
                        class="songalias"
                        v-html="'('+searchwordHighLight(item.name)+')'"
                      ></span>
                    </span>
                  </p>
                  <p class="van-ellipsis">
                    <span class="artistname" v-html="searchwordHighLight(item.artists[0].name)"></span>-
                    <span
                      class="ablums van-multi-ellipsis--l2"
                      v-html="searchwordHighLight(item.album.name)"
                    ></span>
                  </p>
                  <p class="van-ellipsis">
                    <span v-if="item.alias">
                      <span v-for="alia in item.alias" :key="alia" class="ycname">{{alia}}</span>
                    </span>
                  </p>
                </div>
                <span class="play">
                  <i class="iconfont icon-bofangshu"></i>
                </span>
              </li>
            </ul>
            <div class="moretext">{{this.songResults.moreText}}>></div>
          </lazy-component>
        </keep-alive>
      </van-tab>
      <van-tab title="歌手">
        <keep-alive>
          <ul class="singerList">
            <li v-for="(item,index) in singerResults" :key="index">
              <p class="imgbox">
                <img :src="item.img1v1Url" />
              </p>
              <p class="text" v-html="searchwordHighLight(item.name)"></p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
      <van-tab title="视频">
        <keep-alive>
          <ul class="videoList">
            <li v-for="(item,index) in viedoResults" :key="index">
              <p class="imgbox">
                <img :src="item.coverUrl" />
              </p>
              <p class="text">
                <span class="title van-multi-ellipsis--l2" v-html="searchwordHighLight(item.title)"></span>
                <span class="playtime">{{item.playtime}}</span>
                <span class="creator" v-html="'by '+searchwordHighLight(item.creator[0].userName)"></span>
              </p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
      <van-tab title="专辑">
        <keep-alive>
          <ul class="ablumList">
            <li v-for="(item,index) in ablumResults" :key="index">
              <p class="imgbox">
                <img :src="item.picUrl" />
              </p>
              <p class="text">
                <span class="ablumname" v-html="searchwordHighLight(item.name)"></span>
                <span class="artisrtname" v-html="searchwordHighLight(item.artist.name)"></span>
                <span class="danqu" v-if="item.containedSong">
                  包含单曲:
                  <span class="danquname">{{item.containedSong}}</span>
                </span>
              </p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
      <van-tab title="歌单">
        <keep-alive>
          <ul class="playList">
            <li
              v-for="(item,index) in songsheetResults"
              :key="index"
              @click="showPlaylist(item.id)"
            >
              <p class="imgbox">
                <img :src="item.coverImgUrl" />
              </p>
              <p class="text">
                <span class="name" v-html="searchwordHighLight(item.name)"></span>
                <span class="songsnum">{{item.trackCount}}首</span>
                <span class="creatorname" v-html="'by '+searchwordHighLight(item.creator.nickname)"></span>
                <span
                  class="danqu"
                >播放: {{numberFormat(item.playCount).value}}{{numberFormat(item.playCount).unit}}</span>
              </p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
      <van-tab title="电台">
        <keep-alive>
          <ul class="DJList">
            <li v-for="(item,index) in radiostationResults" :key="index">
              <p class="imgbox">
                <img :src="item.picUrl" />
              </p>
              <p class="text">
                <span class="name" v-html="searchwordHighLight(item.name)">{{item.name}}</span>
                <span
                  class="nickname van-ellipsis"
                  v-html="searchwordHighLight(item.dj.nickname)"
                >{{item.dj.nickname}}</span>
              </p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
      <van-tab title="用户">
        <keep-alive>
          <ul class="userList">
            <li v-for="(item,index) in userResults" :key="index">
              <p class="imgbox">
                <img :src="item.avatarUrl" />
              </p>
              <p class="text">
                <span class="nickname" v-html="searchwordHighLight(item.nickname)">{{item.nickname}}</span>
                <span class="signature van-ellipsis" v-if="item.authStatus">网易云音乐人</span>
                <span
                  class="signature van-ellipsis"
                  v-else
                  v-html="searchwordHighLight(item.signature)"
                >{{item.signature}}</span>
                <span class="follow" v-if="!item.followed">+关注</span>
              </p>
            </li>
          </ul>
        </keep-alive>
      </van-tab>
    </van-tabs>
    <Bottom></Bottom>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Bottom from "@/components/Bottom/bottom";
import { Toast } from "vant";

export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      searchword: "",
      isShowClose: false,
      defaultWord: "",
      realkeyword: "",
      isShowWord: false,
      isShowHotsearch: true,
      isShowSearchlist: false,
      active: "",
      allResults: [], //全部
      songResults: [], //单曲
      singerResults: [], //歌手
      viedoResults: [], //视频
      ablumResults: [], //专辑
      songsheetResults: [], //歌单
      radiostationResults: [], //电台
      userResults: [], //用户
      portrait: ""
    };
  },
  created() {
    this.getHotsearch();
    this.getDefaultWord();
  },
  watch: {
    searchword: function(val) {
      if (this.searchword) return (this.isShowClose = true);
      else this.isShowClose = false;
    }
  },
  components: {
    Bottom
  },
  methods: {
    playThis(idVal) {
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
          this.$store.state.showPlayer = true;
        })
      );
    },
    showPlaylist(idVal) {
      if (idVal) {
        this.$router.push({ name: "Playlistdetails", params: { id: idVal } });
      } else {
        Toast.fail("出错了,请稍后再试");
      }
    },
    numberFormat(value) {
      var param = {};
      var k = 10000,
        sizes = ["", "万次", "亿次", "万亿次"],
        i;
      if (value < k) {
        param.value = value;
        param.unit = "次";
      } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = (value / Math.pow(k, i)).toFixed(2);
        param.unit = sizes[i];
      }
      return param;
    },
    getDefaultWord() {
      axios({
        url: "/search/default" /*热搜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.defaultWord = res.data.data.showKeyword;
            this.realkeyword = res.data.data.realkeyword;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showDefaultword() {
      if (this.searchword == "") {
        this.isShowWord = true;
      } else {
        this.isShowWord = false;
      }
    },
    defaultToinput() {
      this.searchword = this.realkeyword;
      this.searchFn();
      this.isShowWord = false;
    },
    getHotsearch() {
      axios({
        url: "/search/hot/detail" /*热搜*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            this.searchList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleFn(str) {
      if (str) {
        this.searchword = str;
        this.searchFn();
      }
    },
    clear() {
      this.searchword = "";
    },
    changeTab(name, title) {
      console.log(title);
      var keyword = this.searchword;
      if (title == "歌手") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=100&keywords=" + keyword /*歌手*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.singerResults = res.data.result.artists;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (title == "视频") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=1014&keywords=" + keyword /*视频*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.viedoResults = res.data.result.videos;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (title == "专辑") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=10&keywords=" + keyword /*专辑*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.ablumResults = res.data.result.albums;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (title == "歌单") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=1000&keywords=" + keyword /*歌单*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.songsheetResults = res.data.result.playlists;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (title == "用户") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=1002&keywords=" + keyword /*用户*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.userResults = res.data.result.userprofiles;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (title == "电台") {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        axios({
          url: "/search?type=1009&keywords=" + keyword /*电台*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.radiostationResults = res.data.result.djRadios;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    searchFn() {
      this.isShowWord = false;
      var keyword = this.searchword;
      if (keyword) {
        this.isShowHotsearch = false;
        this.isShowSearchlist = true;
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        // 默认先展示单曲的结果，点击Tab再切换
        axios({
          url: "/search?keywords=" + keyword /*热搜单曲*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              Toast.clear();
              this.songResults = res.data.result.songs;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    searchwordHighLight(value) {
      // 搜索词蓝色
      let word = this.searchword;
      if (word!="") {
        value = value.split(word);
        var result = value.join(
          '<span style="color:#489fff;">' + word + "</span> "
        );
        return result;
      }else{
        return value
      }
    }
  },
  filters: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .van-tabs__wrap {
  background-color: #fff;
}
/deep/ .van-tabs__content {
  margin-bottom: 50px;
}
.search_input {
  width: 100%;
  height: 50px;
  background: #d32f2f;
  position: fixed;
  top: 0;
  z-index: 999;
}
.search_input div {
  display: inline-block;
  color: #fff;
  height: 100%;
  line-height: 50px;
  text-align: center;
}
.search_input div.goback {
  padding-left: 10px;
  position: absolute;
  height: 30px;
}

.search_input .input {
  width: 100%;
  line-height: 50px;
}
.search_input .input input {
  background-color: transparent;
  outline: none;
  border: none;
  width: 70%;
  height: 35px;
  line-height: 35px;
  color: #fff;
  border-bottom: 1px solid #fff;
  position: relative;
}
.search_input .input input::placeholder {
  color: #fcfcfc;
}
.search_input .sousuo {
  position: absolute;
  right: 15px;
}
.search_input .sousuo i {
  font-size: 20px;
}
.search_input .clear {
  position: absolute;
  right: 55px;
}
.search_input .defaultWord {
  position: absolute;
  left: 55px;
  top: 43px;
  width: 70%;
  height: 35px;
  background-color: #fcfcfc;
  color: #111;
  text-align: left;
  font-size: 16px;
  text-indent: 10px;
}
.hot_search {
  padding: 60px 10px;
}
.hot_search ul li {
  padding: 10px 0;
}
.list_num {
  width: 10%;
  color: #111;
  font-style: italic;
  /* height: 80px; */
  display: inline-block;
  padding-top: 5px;
}
li:nth-child(1) .list_num {
  color: tomato;
}
li:nth-child(2) .list_num {
  color: tomato;
}
li:nth-child(3) .list_num {
  color: tomato;
}
.content_box {
  display: inline-block;
  width: 85%;
  position: relative;
  vertical-align: top;
  /* height: 80px; */
}

.content_box span.searchWord,
.content_box span.content {
  display: inline-block;
  width: 100%;
}
.content_box span.searchWord {
  font-weight: 700;
  color: #333;
}
.content_box span.searchWord img {
  height: 12px;
}
.content_box span.content {
  color: #999;
  font-size: 14px;
}
.score {
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #ccc;
  font-size: 14px;
}
.search_list {
  top: 50px;
  width: 100%;
}
/* 单曲 */
.dqlist li {
  padding: 8px 10px;
  position: relative;
}
.dqlist li div.info span {
  font-size: 16px;
}

.dqlist li span.play {
  position: absolute;
  height: 20px;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.dqlist li span.play i {
  font-size: 30px;
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
  vertical-align: middle;
}
.info p span.artistname {
  padding: 5px 10px;
}
.info p span.ycname {
  display: inline-block;
  color: #999;
  padding: 5px 10px;
}
.moretext {
  color: #999;
  cursor: pointer;
  text-align: center;
}
/* 歌手 */
.singerList li {
  padding: 10px 5px;
  padding-left: 10px;
}
p.imgbox {
  width: 50px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
}
p.imgbox img {
  width: 50px;
  height: 100%;
}
.singerList p.imgbox img {
  border-radius: 50%;
}
.singerList p.text {
  width: 80%;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  vertical-align: top;
  color: #666;
  text-indent: 10px;
}
/* 专辑 */
.ablumList li {
  padding: 10px 5px;
  padding-left: 10px;
}
.ablumList p.imgbox {
  width: 50px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
}
.ablumList p.imgbox img {
  border-radius: 10%;
}
p.text {
  width: 75%;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  color: #666;
}
.ablumList p.text .ablumname {
  display: inline-block;
  width: 100%;
  padding: 0 5px;
  color: #111;
}
.ablumList p.text .artisrtname {
  display: inline-block;
  padding: 5px 5px;
  font-size: 12px;
}
.ablumList p.text .danqu .danquname {
  color: rgb(113, 152, 223);
  overflow: hidden;
  margin-left: 6px;
}
/* 歌单 */
.playList li {
  padding: 10px 5px;
  padding-left: 10px;
}
.playList p.imgbox {
  width: 50px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
}
.playList p.imgbox img {
  border-radius: 10%;
}

.playList p.text .name {
  display: inline-block;
  width: 100%;
  color: #333;
}
.playList p.text span {
  color: #999;
  font-size: 12px;
  height: 23px;
  line-height: 23px;
}
.playList p.text span + span {
  margin-right: 5px;
}
/* 用户 */
.userList li {
  padding: 10px 5px;
  padding-left: 10px;
  position: relative;
}
.userList li .imgbox {
  display: inline-block;
  width: 50px;
}

.userList li .imgbox img {
  border-radius: 50%;
}
.userList li p.text .nickname {
  display: inline-block;
  width: 100%;
  height: 25px;
  line-height: 25px;
}
.userList li p.text .signature {
  display: inline-block;
  width: 88%;
  height: 25px;
  line-height: 25px;
  color: #999;
  font-size: 12px;
}
.userList li p.text .follow {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 25px;
  line-height: 25px;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 30px;
  text-align: center;
  letter-spacing: 3px;
  font-size: 14px;
}
/* 电台 */
.DJList li {
  padding: 10px 5px;
  padding-left: 10px;
  position: relative;
}
.DJList .imgbox img {
  border-radius: 10%;
}
.DJList p.text .nickname {
  color: #999;
  font-size: 12px;
  display: inline-block;
  width: 100%;
  height: 25px;
  line-height: 25px;
}
.videoList li {
  padding: 10px 5px;
  padding-left: 10px;
}
.videoList .imgbox {
  width: 120px;
  height: 70px;
}
.videoList .imgbox img {
  width: 120px;
  height: 68px;
  border-radius: 10%;
}
.videoList p.text {
  width: 57%;
}
.videoList p.text .title {
  color: #333;
  font-size: 14px;
}
.videoList p.text .creator {
  color: #999;
  font-size: 12px;
}
</style>

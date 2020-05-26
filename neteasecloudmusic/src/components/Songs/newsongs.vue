<template>
  <div class="recommend">
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="name">最新音乐</span>
    </div>
    <div class="body">
      <van-tabs v-model="active" offset-top="42" sticky @click="changeFn">
        <van-tab title="华语">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in hysongList" :key="index" @click="playThis(item.id,index,hysongList)">
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
          </lazy-component>
        </van-tab>
        <van-tab title="欧美">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in omsongList" :key="index" @click="playThis(item.id,index,omsongList)">
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
          </lazy-component>
        </van-tab>
        <van-tab title="韩国">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in hgsongList" :key="index" @click="playThis(item.id,index,hgsongList)">
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
          </lazy-component>
        </van-tab>
        <van-tab title="日本">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in rbsongList" :key="index" @click="playThis(item.id,index,rbsongList)">
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
          </lazy-component>
        </van-tab>
      </van-tabs>
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
      active: "",
      hysongList: "",
      omsongList: "",
      hgsongList: "",
      rbsongList: ""
    };
  },
  components: {
    Bottom
  },
  created() {
    this.gethysongList();
  },
  methods: {
    changeFn(name, title) {
      switch (title) {
        case "华语":
          this.hysongList ? "" : this.gethysongList();
          return;
        case "欧美":
          this.omsongList ? "" : this.getomsongList();
          return;
        case "韩国":
          this.hgsongList ? "" : this.gethgsongList();
          return;
        case "日本":
          this.rbsongList ? "" : this.getrbsongList();
          return;
      }
    },
    gethysongList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/song?type=7", //华语
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.hysongList = res.data.data;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getomsongList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/song?type=96" /*欧美*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.omsongList = res.data.data;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gethgsongList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/song?type=16" /*韩国*/,
        method: "get"
      })
        .then(res => {
          Toast.clear();
          if (res.data.code == "200") {
            this.hgsongList = res.data.data;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getrbsongList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/song?type=8" /*日本*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.rbsongList = res.data.data;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
     playThis(idVal,index,lists) {
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
          this.$store.dispatch("PlayList",lists);
          this.$store.dispatch("curMusicIndex", index);
          // this.$store.state.showPlayer = true
        })
      );
    },
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  z-index: 1000;
  padding: 10px;
  color: #111;
  background-color: #fff;
  position: fixed;
  top: 0;
}
.header span {
  cursor: pointer;
}
.header .name {
  font-size: 16px;
  color: #111;
  padding: 0 15px;
}
.body {
  position: absolute;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  top: 39px;
}
.body ul {
  overflow: hidden;
  overflow-x: none;
  margin-bottom: 50px;
}
.body ul li {
  width: 100%;
  display: inline-block;
  padding: 5px 10px;
  position: relative;
}
.body ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.body .imgbox {
  width: 20%;
  display: inline-block;
  vertical-align: top;
}
.body .imgbox img {
  width: 60px;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 5px;
}
.body .content {
  width: 75%;
  display: inline-block;
  height: 65px;
  vertical-align: top;
}
.body .content span {
  display: inline-block;
  width: 77%;
  height: 30px;
  line-height: 30px;
  color: #666;
}
.body .content span span {
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
.body .bofang,
.body .more{
  position: absolute;
  top:0;
  bottom: 0;
  line-height: 50px;
}
.body .bofang i,
.body .more i{
  font-size: 24px;
}
.body .bofang {
  right: 60px;
}
.body .more {
  right: 28px;
}
</style>

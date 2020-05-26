<template>
  <div class="recommend">
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="name">歌单广场</span>
    </div>
    <div class="body">
      <van-tabs v-model="active" offset-top="42" sticky @click="changeFn">
        <van-tab title="轻音乐">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in qyyPlaylist" :key="index" @click="showPlaylist(item.id)">
                <a>
                  <img :src="item.coverImgUrl" />
                  <span class="describe_title">{{item.name}}</span>
                  <span class="bfl">
                    <i class="iconfont icon-bofangsanjiaoxing"></i>
                    {{numberFormat(item.playCount).value}}{{numberFormat(item.playCount).unit}}
                  </span>
                </a>
              </li>
            </ul>
          </lazy-component>
        </van-tab>
        <van-tab title="流行">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in lxPlaylist" :key="index" @click="showPlaylist(item.id)">
                <a>
                  <img :src="item.coverImgUrl" />
                  <span class="describe_title">{{item.name}}</span>
                  <span class="bfl">
                    <i class="iconfont icon-bofangsanjiaoxing"></i>
                    {{numberFormat(item.playCount).value}}{{numberFormat(item.playCount).unit}}
                  </span>
                </a>
              </li>
            </ul>
          </lazy-component>
        </van-tab>
        <van-tab title="民谣">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in myPlaylist" :key="index" @click="showPlaylist(item.id)">
                <a>
                  <img :src="item.coverImgUrl" />
                  <span class="describe_title">{{item.name}}</span>
                  <span class="bfl">
                    <i class="iconfont icon-bofangsanjiaoxing"></i>
                    {{numberFormat(item.playCount).value}}{{numberFormat(item.playCount).unit}}
                  </span>
                </a>
              </li>
            </ul>
          </lazy-component>
        </van-tab>
        <van-tab title="华语">
          <lazy-component>
            <ul>
              <li v-for="(item,index) in hyPlaylist" :key="index" @click="showPlaylist(item.id)">
                <a>
                  <img :src="item.coverImgUrl" />
                  <span class="describe_title">{{item.name}}</span>
                  <span class="bfl">
                    <i class="iconfont icon-bofangsanjiaoxing"></i>
                    {{numberFormat(item.playCount).value}}{{numberFormat(item.playCount).unit}}
                  </span>
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
      qyyPlaylist: "",
      lxPlaylist: "",
      myPlaylist: "",
      hyPlaylist: ""
    };
  },
  components: {
    Bottom
  },
  created() {
    this.getqyyPlaylist();
  },
  methods: {
    numberFormat(value) {
      var param = {};
      var k = 10000,
        sizes = ["", "万", "亿", "万亿"],
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
    showPlaylist(idVal) {
      if (idVal) {
        this.$router.push({ name: "Playlistdetails", params: { id: idVal } });
      } else {
        Toast.fail("出错了,请稍后再试");
      }
    },
    changeFn(name, title) {
      switch (title) {
        case "轻音乐":
          this.qyyPlaylist ? "" : this.getqyyPlaylist();
          return;
        case "流行":
          this.lxPlaylist ? "" : this.getlxPlaylist();
          return;
        case "民谣":
          this.myPlaylist ? "" : this.getmyPlaylist();
          return;
        case "华语":
          this.hyPlaylist ? "" : this.gethyPlaylist();
          return;
      }
    },
    getqyyPlaylist() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/playlist/highquality?cat=轻音乐" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.qyyPlaylist = res.data.playlists;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlxPlaylist() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/playlist/highquality?cat=流行" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.lxPlaylist = res.data.playlists;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getmyPlaylist() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/playlist/highquality?cat=民谣" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          Toast.clear();
          if (res.data.code == "200") {
            this.myPlaylist = res.data.playlists;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gethyPlaylist() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      axios({
        url: "/top/playlist/highquality?cat=华语" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          if (res.data.code == "200") {
            Toast.clear();
            this.hyPlaylist = res.data.playlists;
          } else {
            Toast.clear();
            Toast("请求失败，请 重试");
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
.header {
  width: 100%;
  z-index: 9999;
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
  width: 100%;
  background-color: #ccc;
  top: 39px;
}
.body ul {
  background-color: #fff;
  padding: 20px 0px 50px;
}
.body ul li {
  width: 33%;
  text-align: center;
  display: inline-block;
  padding: 10px 0;
  position: relative;
}
.body ul li a {
  color: #999;
  display: inline-block;
}
.body ul li img {
  width: 90%;
  border-radius: 10px;
}
.body ul li span.describe_title {
  display: block;
  text-align: left;
  height: 33px;
  font-size: 14px;
  color: #999;
  overflow: hidden;
  padding: 5px;
  border-radius: 5px;
}
.body ul li span.bfl {
  color: #fff;
  position: absolute;
  top: 13px;
  right: 8px;
  width: 90%;
  text-align: right;
}
</style>

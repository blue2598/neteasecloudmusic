<template>
  <div class="rankList">
    <div class="header">
      <span @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="name">排行榜</span>
    </div>
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
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import eventBus from "../eventBus.js";
import Bottom from "@/components/Bottom/bottom";
export default {
  name: "App",
  data() {
    return {
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
  created() {
    this.getRanklist();
  },
  methods: {
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
    }
  },
  components: {
    Bottom
  }
};
</script>

<style>
.header {
  width: 100%;
  z-index: 9999;
  padding: 10px;
  color: #111;
  position: fixed;
  top:0;
  background-color: #fff;
}
.header span {
  cursor: pointer;
}
.header .name{
  font-size: 16px;
  color: #111;
  padding: 0 15px;
}
h3 {
  padding: 10px 20px;
  position: relative;
  margin-top: 55px;
}
h3::before {
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
.picbox {
  display: inline-block;
  width: 24%;
  height: 80px;
  padding: 10px;
  position: relative;
}
</style>

<template>
  <div class="recommend">
    <div class="header">
      <span>
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span>歌单</span>
    </div>
    <div class="body">
      <div class="desbox">
        <p class="cover">
          <img :src="coverimg" />
        </p>
        <div>
          <p class="des">[珍藏]</p>
          <p class="userinfo">
            <span class="avator"></span>
            <span class="username">辞雀></span>
          </p>
          <p>此歌单从事务部世界著名肌肤的肌肤骄傲睡觉哦当接收到广播</p>
        </div>
      </div>
      <div class="operatebox">
        <ul>
          <li>
            <i class="iconfont icon-download"></i>评论
          </li>
          <li>
            <i class="iconfont icon-download"></i>分享
          </li>
          <li>
            <i class="iconfont icon-download"></i>下载
          </li>
          <li>
            <i class="iconfont icon-download"></i>多选
          </li>
        </ul>
      </div>
      <div class="songsbox"></div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
export default {
  name: "Home",
  data() {
    return {
      playlist: [],
      coverimg: ""
    };
  },
  components: {},
  created() {
    this.getPlaylist();
  },
  methods: {
    getPlaylist() {
      var id = this.$route.params.id;
      console.log(id);
      if (id) {
        axios({
          url: "/playlist/detail?id=" + id /*轮播图*/,
          method: "get"
        })
          .then(res => {
            if (res.data.code == "200") {
              this.playlist = res.data.playlist;
              this.coverimg = res.data.playlist.coverImgUrl;
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>

.header {
  padding: 10px;
  color: #fff;
}
header span {
  cursor: pointer;
}
.body{
    position: absolute;
    z-index: 999;
}
.desbox {
  width: 100%;
  height: 200px;
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
</style>

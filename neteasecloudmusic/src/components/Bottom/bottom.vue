<template>
  <div class="footer" @click="showPlayer()" v-show="JSON.stringify(curPlayMusic) !== '{}'">
    <p class="cover">
      <img
        v-if="JSON.stringify(curPlayMusic) !== '{}'"
        :src="curPlayMusic.detail.al.picUrl+'?param=500y500'"
      />
      <img v-else :src="coverimg+'?param=40y40'" />
    </p>
    <p class="play">
      <span v-if="JSON.stringify(curPlayMusic) !== '{}'">{{curPlayMusic.detail.name}}</span>
      <span v-else>暂未播放</span>
      <span v-if="JSON.stringify(curPlayMusic) !== '{}'">
        <span
          class="artname"
          v-for="(item,index) in curPlayMusic.detail.ar"
          :key="index"
        >{{item.name}}</span>
      </span>
      <span class="artname" v-else>暂未播放</span>
    </p>
    <p class="bofang">
      <i v-if="this.$store.state.isPlay" @click.stop="pause" class="iconfont icon-zanting"></i>
      <i v-else class="iconfont icon-bofang" @click.stop="start"></i>
    </p>
    <p class="more" @click.stop="showPlaylist">
      <i class="iconfont icon-xianline21"></i>
    </p>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import { mapState } from "vuex";
export default {
  name: "Bottom",
  data() {
    return {
      coverimg:
        "https://p1.music.126.net/kIbkkVLoqnlNZ4tb4Ga-Gg==/109951164929061760.jpg?param=40y40"
    };
  },
  computed: {
    ...mapState({
      curPlayMusic: state => state.curPlayMusic
    })
  },
  created() {},
  methods: {
    showPlayer() {
      this.$store.state.showPlayer = true;
    },
    start() {
      this.$store.dispatch("switchStatus", true);
      document.getElementById("audio").play();
      this.$store.state.isRotate = true;
    },
    // 暂停播放按钮
    pause() {
      this.$store.dispatch("switchStatus", false);
      document.getElementById("audio").pause();
      this.$store.state.isRotate = false;
    },
    // 显示播放列表
    showPlaylist() {
      this.$store.state.isShowPlayList = true;
    }
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: -1px;
  z-index: 9;
  width: 100%;
  height: 50px;
  background-color: #fff;
}
.footer p {
  display: inline-block;
}
.footer p.cover {
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
.footer p img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.footer .play {
  height: 100%;
  margin-left: 45px;
}
.footer .play span {
  display: block;
  color: #333;
  height: 25px;
  line-height: 25px;
}
.footer i {
  font-size: 24px;
  color: #999;
}
.footer .bofang {
  position: absolute;
  right: 40px;
  line-height: 50px;
}
.footer .more {
  position: absolute;
  right: 10px;
  line-height: 50px;
}
</style>

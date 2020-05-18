<template>
  <div class="footer" @click="showPlaylist()">
    <p class="cover">
      <img :src="coverimg" />
    </p>
    <p class="play">
      <span>给你给我</span>
      <span>毛不易</span>
    </p>
    <p class="bofang">
      <i class="iconfont icon-bofang"></i>
    </p>
    <p class="more">
      <i class="iconfont icon-xianline21"></i>
    </p>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import eventBus from "../eventBus.js";
export default {
  name: "Bottom",
  data() {
    return {
      coverimg: ""
    };
  },
  created() {
    eventBus.$on("id", args => {
      this.id = args;
      console.log(this.id);
    });
  },
  methods: {
    showPlaylist() {
      eventBus.$emit("id", this.id);
      this.$router.push({ name: "Playsongs" });
    }
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  background-color: #fff;
}
.footer p {
  display: inline-block;
}
.footer p.cover {
  width: 40px;
}
.footer p img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.footer .play {
  height: 100%;
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

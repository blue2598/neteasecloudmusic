<template>
  <transition name="van-slide-up">
    <!-- 播放列表 -->
    <div class="shade" v-show="isShowPlayList">
      <div class="closeshade" @click="closePlaylist"></div>
      <div class="playlist">
        <ul class="dqlist">
          <li v-for="(item,index) in PlayList" :key="index" @click="playThis(item.id,index)">
            <div class="info">
              <p class="van-ellipsis" v-if="curMusicIndex ==index">
                <span style="color:#b72712" class="songname">{{item.name}} -</span>
                <span style="color:#b72712" class="artistname" v-if="item.ar">
                  <span v-for="(e,i) in item.ar" :key="i">{{e.name}}</span>
                </span>
                <span
                  style="color:#b72712"
                  class="artistname"
                  v-else
                  v-for="(e,i) in item.song.artists"
                  :key="i"
                >{{e.name | singerFormat}}</span>
              </p>
              <p class="van-ellipsis" v-else>
                <span class="songname">{{item.name}} -</span>
                <span class="artistname" v-if="item.ar">
                  <span v-for="(e,i) in item.ar" :key="i">{{e.name}}</span>
                </span>
                <span
                  class="artistname"
                  v-else
                  v-for="(e,i) in item.song.artists"
                  :key="i"
                >{{e.name}}</span>
              </p>
            </div>
            <span class="clear" @click.stop="remove(index)">
              <i class="iconfont">X</i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import { mapState, mapGetters, mapActions } from "vuex";
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showPlayer,
      curPlayMusic: state => state.curPlayMusic,
      PlayList: state => state.PlayList,
      curMusicIndex: state => state.curMusicIndex,
      isShowPlayList: state => state.isShowPlayList
    })
  },
  watch: {},
  created() {},
  watched() {},
  methods: {
    closePlaylist() {
      this.$store.state.isShowPlayList = false;
    },
    
    playThis(idVal, index) {
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
          this.$store.dispatch("curMusicIndex", index);
        })
      );
    },
    remove(index){
        this.$store.state.PlayList.splice(index,1)
    }
  },

  components: {}
};
</script>

<style scoped>
.shade {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0);
}
.closeshade{
    width: 100vw;
  height: 40vh;
  position: fixed;
  top: 0;
  left: 0;
}

.playlist {
  height: 60%;
  width: 100%;
  /* z-index: 10000; */
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
  overflow-y: scroll;
}
/* 播放列表 */
.dqlist {
  overflow: hidden;
  overflow-y: scroll;
}
.dqlist li {
  padding: 8px 25px;
  position: relative;
}

.dqlist li span.clear {
  position: absolute;
  height: 20px;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #999;
  font-weight: 100;
}
.dqlist li span.more i {
  font-size: 24px;
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

.info p span.artistname {
  display: inline-block;
  color: #999;
  padding: 5px 0px;
  font-size: 12px;
}
.info p span.artistname {
  padding: 5px 10px;
}
</style>

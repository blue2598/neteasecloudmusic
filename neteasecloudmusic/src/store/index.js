import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showPlayer: false,
        curPlayMusic: {}, //当前播放的音乐
        curMusicLyric: [], //当前播放音乐的歌词
        isPlay: true, //播放状态
        PlayList: [], //播放列表
        curMusicIndex: 0 //当前播放音乐的索引
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
})

export default store
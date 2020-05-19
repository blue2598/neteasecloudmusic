import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    curPlaymusic: {},
    curMusicIndex: 0,
    curLyric: '',
}
export default new Vuex.Store({
    state
})
export default {
    getCurPlayMusicId(state) {
        return state.curPlayMusic.detail ? state.curPlayMusic.detail.id : null
    }
}
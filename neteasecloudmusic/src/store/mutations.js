export default {
    curPlayMusic(state, arr) {
        const obj = {
            url: arr[0].data.data[0].url,
            detail: arr[1].data.songs[0],
            lrc: arr[2].data.lrc
        }
        state.curPlayMusic = obj //将获取到的liststate中的“curPlayMusic”
    },
    switchStatus(state, status) {
        state.isPlay = status
    }
}
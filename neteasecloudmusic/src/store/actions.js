export default {
    // 点击播放当前音乐
    changePlayMusic(context, arr) { //接收一个与store实例具有相同方法的属性context对象
        context.commit("curPlayMusic", arr) //"curPlayMusic"是mutation里面的方法，list是组件中传过来参数
    },
    switchStatus(context, status) {
        context.commit("switchStatus", status)
    },
    PlayList(context, list) {
        context.commit("PlayList", list)
    },
    curMusicIndex(context, num) {
        context.commit("curMusicIndex", num)
    }
}
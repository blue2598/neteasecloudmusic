import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import Search from '@/components/Search/search'
import EverydayRecommend from '@/components/EverydayRecommend/EverydayRecommend'
import Playlist from '@/components/playlist/playlist'
import Playsongs from '@/components/Playsongs/playsongs'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Home',
            redirect: '/'
        },
        {
            path: '/Search',
            name: 'Search',
            component: Search
        },
        {
            path: '/EverydayRecommend',
            name: 'EverydayRecommend',
            component: EverydayRecommend
        },
        {
            path: '/Playlist',
            name: 'Playlist',
            component: Playlist
        },
        {
            path: '/Playsongs',
            name: 'Playsongs',
            component: Playsongs
        }
    ]
})
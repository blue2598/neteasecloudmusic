import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import Search from '@/components/Search/search'
import EverydayRecommend from '@/components/EverydayRecommend/EverydayRecommend'
import Playlistdetails from '@/components/Playlist/playlistdetails'
import Playlist from '@/components/Playlist/playlist'
import Ranklist from '@/components/Songs/ranklist'
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
            path: '/Ranklist',
            name: 'Ranklist',
            component: Ranklist
        },
        {
            path: '/Playlistdetails',
            name: 'Playlistdetails',
            component: Playlistdetails
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
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import Search from '@/components/Search/search'
import Login from '@/components/Login'

import Personal from '@/components/Personal/Personal'
import Userinfo from '@/components/Personal/Userinfo'

import EverydayRecommend from '@/components/EverydayRecommend/EverydayRecommend'

import Playlistdetails from '@/components/Playlist/playlistdetails'
import Playlist from '@/components/Playlist/playlist'

import Ranklist from '@/components/Songs/ranklist'
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
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Personal',
            name: 'Personal',
            component: Personal
        },
        {
            path: '/Userinfo',
            name: 'Userinfo',
            component: Userinfo
        },
        {
            path: '/Search',
            name: 'Search',
            component: Search,
            // children: {
            //     path: '/Song',
            //     name: 'Search',
            //     component: Search,
            // }
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
    ]
})
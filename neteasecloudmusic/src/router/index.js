import Vue from 'vue'
import Router from 'vue-router'
import Find from '@/components/Find/Find'
import Search from '@/components/Search/search'
import Login from '@/components/Login'

import Personal from '@/components/Personal/Personal'
import Userinfo from '@/components/Personal/Userinfo'


import Playlistdetails from '@/components/Playlist/playlistdetails'
import Playlist from '@/components/Playlist/playlist'

import Ranklist from '@/components/Songs/ranklist'
import EverydayRecommend from '@/components/Songs/EverydayRecommend'
import Newsongs from '@/components/Songs/newsongs'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Find',
            component: Find
        },
        {
            path: '/Find',
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
            path: '/Newsongs',
            name: 'Newsongs',
            component: Newsongs
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
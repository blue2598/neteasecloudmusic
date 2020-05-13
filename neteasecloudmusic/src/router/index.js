import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import Search from '@/components/Search/search'
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
        }
    ]
})
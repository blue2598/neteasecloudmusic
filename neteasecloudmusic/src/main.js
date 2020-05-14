// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import { Lazyload } from 'vant';
// import { Toast } from 'vant';
import 'vant/lib/index.css'
import './assets/font/iconfont.css'
import './assets/css/base.css'
// import './assets/css/common.css'
Vue.config.productionTip = false


import Api from './api/index.js'
Vue.prototype.$api = Api;

Vue.use(Vant)
    // Vue.use(Toast)
Vue.use(Lazyload, {
    lazyComponent: true,
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
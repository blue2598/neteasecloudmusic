// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import router from './router'
import Vant from 'vant'
import { Lazyload } from 'vant';
import { Sticky } from "vant";
import 'vant/lib/index.css'
import './assets/font/iconfont.css'
import './assets/css/base.css'
import './assets/css/common.css'
Vue.config.productionTip = false

// const debug = process.env.NODE_ENV !== 'production'

import Api from './api/index.js'
Vue.prototype.$api = Api;
Vue.use(Vant)
Vue.use(Sticky);
// Vue.use(Toast)
Vue.use(Lazyload, {
    lazyComponent: true,
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // strict: debug,
    // plugins: debug ? [createLogger()] : [],
    components: { App },
    template: '<App/>'
})
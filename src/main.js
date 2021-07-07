import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/global.css'
import './assets/css/iconfont.css'
import axios from 'axios'
import ZKTable from 'vue-table-with-tree-grid'
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.component('tree-table', ZKTable)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
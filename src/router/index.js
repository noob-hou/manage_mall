import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ('@/components/Login.vue');
const Home = () =>
    import ('@/components/Home.vue')
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    redirect: '/home/welcome',
    component: Home,
    children: [{
        path: 'welcome',
        component: () =>
            import ('../components/HomeWelcome.vue')
    }, {
        path: 'users',
        component: () =>
            import ('../components/users/HomeUsers.vue')
    }, {
        path: 'rights',
        component: () =>
            import ('../components/power/PowerHome.vue')
    }, {
        path: 'roles',
        component: () =>
            import ('../components/power/Part.vue')
    }, {
        path: 'categories',
        component: () =>
            import ('../components/shop/ShopCategory.vue')
    }, {
        path: 'params',
        component: () =>
            import ('../components/shop/ShopParams.vue')
    }, {
        path: 'goods',
        component: () =>
            import ('../components/shop/shoplist/ShopList.vue')
    }, {
        path: '/home/goods/add',
        component: () =>
            import ('../components/shop/shoplist/AddShop.vue')
    }, {
        path: 'orders',
        component: () =>
            import ('../components/orders/OrderList.vue')
    }, {
        path: 'reports',
        component: () =>
            import ('../components/dataView/DataView.vue')
    }]
}]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/login');
    next()
})
export default router
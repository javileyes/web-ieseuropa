import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/AdminView.vue')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router

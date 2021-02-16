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
    },
    {
        path: '/secretaria',
        name: 'Secretary',
        component: () => import('../views/SecretaryView.vue')
    },
    {
        path: '/departamentos',
        name: 'Departments',
        component: () => import('../views/DepartmentsView.vue')
    },
    {
        path: '/departamento/:id',
        name: 'Department',
        component: () => import('../views/DepartmentView.vue')
    },
    {
        path: '/noticias',
        name: 'Blogs',
        component: () => import('../views/BlogsView.vue')
    },
    {
        path: '/noticia/:id',
        name: 'Blog',
        component: () => import('../views/BlogView.vue')
    },
    {
        path: '/equipo-directivo',
        name: 'Team',
        component: () => import('../views/ManagementTeamView.vue')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from "../views/main-layout.vue";
import Login from "../views/Login";
import Usuarios from "../views/Usuarios";
import Produtos from "../views/ProductosPage";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Layout,
        meta: {
            Auth: true
        },
        children: [
            {
                path: '',
                name: 'home',
                component: HomeView,
                meta: {
                    Auth: true
                },
            },
            {
                path: '/usuarios',
                component: Usuarios,
                name: 'usuarios',
                meta: {
                    Auth: true
                },
            },
            {
                path: '/productos',
                component: Produtos,
                name: 'productos',
                meta: {
                    Auth: true
                },
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(value => value.meta.Auth)) {

        if (localStorage.getItem('UserKeyToken') == null || localStorage.getItem('UserKeyToken') === '') {
            next({
                name: 'login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.Guest)) {
        if (localStorage.getItem('UserKeyToken') == null || localStorage.getItem('UserKeyToken') === '') {
            next()
        } else {
            next({
                path: '/',
                params: {nextUrl: to.fullPath}
            })
        }
    } else {
        next()
    }
})

export default router

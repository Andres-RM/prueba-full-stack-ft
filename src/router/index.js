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
        children: [
            {
                path: '',
                name: 'home',
                component: HomeView
            },
            {
                path: '/usuarios',
                component: Usuarios,
                name: 'usuarios'
            },
            {
                path: '/productos',
                component: Produtos,
                name: 'productos'
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

export default router

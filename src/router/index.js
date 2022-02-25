import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from "../views/main-layout.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [      {
        path: '',
        name: 'home',
        component: HomeView
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

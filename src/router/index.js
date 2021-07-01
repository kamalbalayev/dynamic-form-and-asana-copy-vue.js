import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/tasks',
        name: 'Asana',
        component: () => import(/* webpackChunkName: "task-board" */ '../views/asana/Board.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import(/* webpackChunkName: "blog-list" */ '../views/blog/List.vue'),
    },
    {
        path: '/blog/add',
        name: 'BlogFormAdd',
        component: () => import(/* webpackChunkName: "blog-form" */ '../views/blog/Form.vue')
    },
    {
        path: '/blog/:id',
        name: 'BlogFormEdit',
        component: () => import(/* webpackChunkName: "blog-form" */ '../views/blog/Form.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

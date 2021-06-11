import { createRouter, createWebHistory } from "vue-router";
import Home from '@/view/home'

const routes = [
    { path: '/:pathMatch(.*)', redirect: "/home" },
    { path: "/", redirect: "/home" },
    { path: '/home', component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default (app) => {
    app.use(router)
}
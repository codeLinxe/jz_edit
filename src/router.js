import { createRouter, createWebHistory } from "vue-router";
import Home from '@views/home'
import Login from '@views/login'
import Register from '@views/register'
import { getStore } from './store/index'
import {getUserData} from "@apis/home";

const routes = [
    { path: '/:pathMatch(.*)', redirect: "/home" },
    { path: "/", redirect: "/home" },
    { path: "/login", name: 'login', component: Login },
    { path: "/register", name: 'register', component: Register },
    { path: '/home', name: 'home', component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let $store = getStore()
    const token = $store.state.token
    const sessionToken = window.sessionStorage.getItem('token')
    const isLogin = !!token || !!sessionToken
    if (to.name !== 'login' && to.name !== 'register' && !isLogin) {
        next({ name: 'login' })
    } else {
        if(isLogin) {
            let { data } = await getUserData()
            $store.commit('setUserData', data)
        }
        if((to.name === 'login' || to.name === 'register') && isLogin) {
            next({ name: 'home' })
        } else {
            next()
        }

    }
})

export function getRouter() {
    return router
}

export default (app) => {
    app.use(router)
}
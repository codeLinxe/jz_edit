import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 创建一个新的 store 实例
const store = createStore({
    plugins: [createPersistedState()],
    state () {
        return {
            staticPath: process.env.STATIC_PATH,
            userData: {},
            defaultUserAvatar: '/common/nopic.png',
            token: ''
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data
        },
        setToken(state, data) {
            state.token = data
        }
    }
})

export function getStore() {
    return store
}

export default (app) => {
    app.use(store)
}
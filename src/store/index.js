import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            staticPath: process.env.STATIC_PATH,
            userData: {},
            defaultUserAvatar: '/common/nopic.png'
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data
        }
    }
})

export default (app) => {
    app.use(store)
}
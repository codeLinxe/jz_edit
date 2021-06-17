export default {
    computed: {
        staticPath() {
            return this.$store.state.staticPath
        },
        defaultAvatar() {
          return this.staticPath + this.$store.state.defaultUserAvatar
        },
        userAvatar() {
            return (this.$store.state.userData && this.$store.state.userData.avatar) || this.defaultAvatar
        },
        userName() {
            return   (this.$store.state.userData && this.$store.state.userData.name) || ''
        },
        userId() {
            return (this.$store.state.userData && this.$store.state.userData.id) || '0'
        },
        token() {
            return this.$store.state.token || ''
        },
        isLogin() {
            return !!this.token
        }
    },
    methods: {
        clearData() {
            this.$store.commit('setUserData', {})
            this.$store.commit('setToken', '')
            window.sessionStorage.setItem('token', '')
        }
    }
}
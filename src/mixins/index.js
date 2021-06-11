export default {
    computed: {
        staticPath() {
            return this.$store.state.staticPath
        },
        userAvatar() {
            return (this.$store.state.userData && this.$store.state.userData.upic) || (this.staticPath + this.$store.state.defaultUserAvatar)
        }
    }
}
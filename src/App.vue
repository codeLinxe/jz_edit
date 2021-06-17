<template>
    <router-view></router-view>
</template>

<script>

export default {
    name: 'App'
}
</script>

<style lang="scss">
@import "./assets/common/base.css";
@import "~normalize.css";
@import "https://s1.hdslb.com/bfs/static/studio/static/cc-iconfont-2.14.0/iconfont.css";
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    height: 100%;
    min-height: 100%;
    background: #fafafa;
}
</style>

<template>
    <router-view></router-view>
</template>

<script>
import { login } from '@apis/home.js'

export default {
    name: 'App',
    created() {
        login()
    }
}
</script>

<style>
@import "~normalize.css";
@import "assets/common/base.css";

* {
    box-sizing: border-box;
}

#app {
    height: 100%;
    min-height: 100%;
    background: #fafafa;
}
</style>
